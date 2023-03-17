/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/
/* eslint-disable  @typescript-eslint/ban-types */
import freeice from 'freeice';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ACTIONS } from '../socket/actions';
import socket from '../socket/socket';
import getMediaStream from './utils';
import useStateWithCallback from './useStateWithCallback';

export const LOCAL_VIDEO = 'local-video';

export function useWebRTC(roomID: string, userID: string) {
  const { state: clients, updateState: updateClients } = useStateWithCallback<string[]>([]);

  const addNewClient = useCallback(
    (newClient: string, cb: () => void) => {
      updateClients(list => (list.includes(newClient) ? list : [...list, newClient]), cb);
    },
    [updateClients],
  );

  const peerConnections = useRef<Record<string, RTCPeerConnection>>({});
  const localMediaStream = useRef<MediaStream | null>(null);
  const peerMediaElements = useRef<Record<string, HTMLVideoElement>>({});

  const [mapClientIdToUserId, setMapClientIdToUserId] = useState<Record<string, string>>({ 'local-video': userID });
  const [mutedPeers, setMutedPeers] = useState<Record<string, boolean>>({ 'local-video': false });

  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);

  const updatePeerTrack = (kind: 'video' | 'audio'): void => {
    for (const peer of Object.values(peerConnections.current)) {
      const sender = peer.getSenders().find(s => s.track && s.track.kind === kind);
      if (!sender || !sender.track) continue;
      sender.track.enabled = !isVideoOn;
    }
  };

  const handleToggleVideo = (): void => {
    updatePeerTrack('video');
    socket.emit(ACTIONS.TOGGLE_VIDEO, isVideoOn);
    setIsVideoOn(!isVideoOn);
    setMutedPeers(peers => ({ ...peers, 'local-video': isVideoOn }));
  };

  const handleToggleAudio = (): void => {
    updatePeerTrack('audio');
    setIsAudioOn(!isAudioOn);
  };

  // listen to video disable
  useEffect(() => {
    socket.on(ACTIONS.TOGGLE_VIDEO, (peerID, setTo) => {
      setMutedPeers(peers => ({ ...peers, [peerID]: setTo }));
    });

    return () => {
      socket.off(ACTIONS.TOGGLE_VIDEO);
    };
  }, [mutedPeers]);

  // add peers
  useEffect(() => {
    interface Props {
      peerID: string;
      createOffer: boolean;
      peerUserID: string;
    }
    // eslint-disable-next-line consistent-return
    async function handleNewPeer({ peerID, createOffer, peerUserID }: Props): Promise<void> {
      if (peerID in peerConnections.current) {
        return console.warn(`Already connected to peer ${peerID}`);
      }

      // tell new user to disable my video
      if (!createOffer) socket.emit(ACTIONS.TOGGLE_VIDEO, !isVideoOn);

      peerConnections.current[peerID] = new RTCPeerConnection({
        iceServers: freeice(),
      });

      // console.log('peerUserID', peerUserID);
      setMapClientIdToUserId(x => ({ ...x, [peerID]: peerUserID }));

      peerConnections.current[peerID].onicecandidate = (event: RTCPeerConnectionIceEvent): void => {
        if (event.candidate) {
          socket.emit(ACTIONS.RELAY_ICE, {
            peerID,
            iceCandidate: event.candidate,
          });
        }
      };

      peerConnections.current[peerID].ontrack = (peerConnection): void => {
        const remoteStream: MediaStream = peerConnection.streams[0];
        addNewClient(peerID, () => {
          if (peerMediaElements.current[peerID]) {
            peerMediaElements.current[peerID].srcObject = remoteStream;
          } else {
            // FIX LONG RENDER IN CASE OF MANY CLIENTS
            let settled = false;
            const watcher = setInterval(() => {
              if (peerMediaElements.current[peerID]) {
                peerMediaElements.current[peerID].srcObject = remoteStream;
                settled = true;
              }

              if (settled) clearInterval(watcher);
            }, 1000);
          }
        });
      };

      // eslint-disable-next-line consistent-return
      if (!localMediaStream.current) return;
      localMediaStream.current.getVideoTracks().forEach(track => {
        if (!localMediaStream.current) return;
        peerConnections.current[peerID].addTrack(track, localMediaStream.current);
      });

      if (isAudioOn) {
        localMediaStream.current.getAudioTracks().forEach(track => {
          if (!localMediaStream.current) return;
          peerConnections.current[peerID].addTrack(track, localMediaStream.current);
        });
      }

      // disable video & audio only for new user
      if (!createOffer) {
        const senders = peerConnections.current[peerID].getSenders();
        // console.log('senders', senders);
        if (!isVideoOn) {
          const videoSender = senders.find(s => s.track && s.track.kind === 'video');
          // console.log(videoSender);
          if (videoSender && videoSender.track) videoSender.track.enabled = false;
        }

        if (!isAudioOn) {
          const audioSender = senders.find(s => s.track && s.track.kind === 'audio');
          // console.log(audioSender);
          if (audioSender && audioSender.track) audioSender.track.enabled = false;
        }
      }

      if (createOffer) {
        const offer = await peerConnections.current[peerID].createOffer();
        await peerConnections.current[peerID].setLocalDescription(offer);

        socket.emit(ACTIONS.RELAY_SDP, {
          peerID,
          sessionDescription: offer,
        });
      }
    }

    socket.on(ACTIONS.ADD_PEER, handleNewPeer);

    return () => {
      socket.off(ACTIONS.ADD_PEER);
    };
  }, [isVideoOn, isAudioOn, addNewClient, mapClientIdToUserId]);

  // remote media listener
  useEffect(() => {
    interface Props {
      peerID: string;
      sessionDescription: RTCSessionDescriptionInit;
    }
    async function setRemoteMedia({ peerID, sessionDescription: remoteDescription }: Props): Promise<void> {
      await peerConnections.current[peerID]?.setRemoteDescription(new RTCSessionDescription(remoteDescription));

      if (remoteDescription.type === 'offer') {
        const answer = await peerConnections.current[peerID].createAnswer();

        await peerConnections.current[peerID].setLocalDescription(answer);

        socket.emit(ACTIONS.RELAY_SDP, {
          peerID,
          sessionDescription: answer,
        });
      }
    }

    socket.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);

    return (): void => {
      socket.off(ACTIONS.SESSION_DESCRIPTION);
    };
  }, []);

  // ice listener
  useEffect(() => {
    socket.on(
      ACTIONS.ICE_CANDIDATE,
      ({ peerID, iceCandidate }: { peerID: string; iceCandidate: RTCIceCandidateInit }) => {
        peerConnections.current[peerID]?.addIceCandidate(new RTCIceCandidate(iceCandidate));
      },
    );

    return (): void => {
      socket.off(ACTIONS.ICE_CANDIDATE);
    };
  }, []);

  // removing peers
  useEffect(() => {
    const handleRemovePeer = ({ peerID }: { peerID: string }): void => {
      if (peerConnections.current[peerID]) peerConnections.current[peerID].close();

      delete peerConnections.current[peerID];
      delete peerMediaElements.current[peerID];

      updateClients(list => list.filter(c => c !== peerID));
    };

    socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);

    return (): void => {
      socket.off(ACTIONS.REMOVE_PEER);
    };
  }, []);

  // catch local stream
  useEffect(() => {
    async function startCapture(): Promise<void> {
      const { stream, error } = await getMediaStream();
      if (error) {
        console.error('error getting local stream');
        return;
      }
      localMediaStream.current = stream;

      addNewClient(LOCAL_VIDEO, () => {
        const localVideoElement = peerMediaElements.current[LOCAL_VIDEO] as unknown as HTMLVideoElement;

        if (localVideoElement) {
          localVideoElement.volume = 0;
          localVideoElement.srcObject = localMediaStream.current;
        }
      });
    }

    startCapture()
      .then(() => socket.emit(ACTIONS.JOIN, { room: roomID, userID }))
      .catch(e => console.error('Error getting userMedia:', e));

    return (): void => {
      if (!localMediaStream.current) return;
      localMediaStream.current.getTracks().forEach(track => track.stop());

      socket.emit(ACTIONS.LEAVE);
    };
  }, [roomID, userID, addNewClient]);

  const provideMediaRef = useCallback((id: string, node: HTMLVideoElement) => {
    peerMediaElements.current[id] = node;
  }, []);

  return {
    clients,
    isVideoOn,
    isAudioOn,
    mutedPeers,
    handleToggleVideo,
    handleToggleAudio,
    provideMediaRef,
    mapClientIdToUserId,
  };
}
