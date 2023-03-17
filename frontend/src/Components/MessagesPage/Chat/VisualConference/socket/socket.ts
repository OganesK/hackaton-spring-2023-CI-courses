/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/
import { ACTIONS } from './actions';
import { io, Socket } from 'socket.io-client';
import { VCS_URL } from '../../../../../config';

// const options: Partial<ManagerOptions & SocketOptions> = {
const options = {
  'force new connection': true,
  reconnectionAttempts: Infinity, // avoid having user reconnect manually in order to prevent dead clients after a server restart
  timeout: 10000, // before connect_error and connect_timeout are emitted.
  transports: ['websocket'],
};

interface ServerToClientEvents {
  [ACTIONS.SHARE_ROOMS]: () => void;
  [ACTIONS.ADD_PEER]: ({
    peerID,
    createOffer,
    peerUserID,
  }: {
    peerID: string;
    createOffer: boolean;
    peerUserID: string;
  }) => Promise<void>;
  [ACTIONS.SESSION_DESCRIPTION]: ({
    peerID,
    sessionDescription: remoteDescription,
  }: {
    peerID: string;
    sessionDescription: any;
  }) => Promise<void>;
  [ACTIONS.ICE_CANDIDATE]: ({ peerID, iceCandidate }: { peerID: any; iceCandidate: any }) => void;
  [ACTIONS.REMOVE_PEER]: ({ peerID }: { peerID: string }) => void;
  [ACTIONS.TOGGLE_VIDEO]: (peerID: string, setTo: boolean) => void;
}

interface ClientToServerEvents {
  [ACTIONS.RELAY_ICE]: (arg: any) => void;
  [ACTIONS.RELAY_SDP]: (arg: any) => void;
  [ACTIONS.JOIN]: ({ room }: { room: string; userID: string }) => void;
  [ACTIONS.LEAVE]: () => void;
  [ACTIONS.SHARE_ROOMS]: () => void;
  [ACTIONS.TOGGLE_VIDEO]: (setTo: boolean) => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(VCS_URL, options);

export default socket;
