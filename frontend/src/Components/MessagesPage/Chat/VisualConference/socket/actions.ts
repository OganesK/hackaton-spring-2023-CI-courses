const JOIN: 'join' = 'join' as const;
const LEAVE: 'leave' = 'leave' as const;
const SHARE_ROOMS: 'share-rooms' = 'share-rooms' as const;
const ADD_PEER: 'add-peer' = 'add-peer' as const;
const REMOVE_PEER: 'remove-peer' = 'remove-peer' as const;
const RELAY_SDP: 'relay-sdp' = 'relay-sdp' as const;
const RELAY_ICE: 'relay-ice' = 'relay-ice' as const;
const ICE_CANDIDATE: 'ice-candidate' = 'ice-candidate' as const;
const SESSION_DESCRIPTION: 'session-description' = 'session-description' as const;
const TOGGLE_VIDEO: 'toggle-video' = 'toggle-video' as const;
const TOGGLE_AUDIO: 'toggle-audio' = 'toggle-audio' as const;

export const ACTIONS = {
  JOIN: JOIN,
  LEAVE: LEAVE,
  SHARE_ROOMS: SHARE_ROOMS,
  ADD_PEER: ADD_PEER,
  REMOVE_PEER: REMOVE_PEER,
  RELAY_SDP: RELAY_SDP,
  RELAY_ICE: RELAY_ICE,
  ICE_CANDIDATE: ICE_CANDIDATE,
  SESSION_DESCRIPTION: SESSION_DESCRIPTION,
  TOGGLE_VIDEO: TOGGLE_VIDEO,
  TOGGLE_AUDIO: TOGGLE_AUDIO,
};
