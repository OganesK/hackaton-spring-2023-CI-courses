import { Button } from '@material-ui/core';
import { Avatar, Box, Grid, IconButton, styled, Typography } from '@mui/material';
import React, { useContext } from 'react';
import videoOff from '../../../../assets/icons/visualConference/cameraOff.svg';
import videoOn from '../../../../assets/icons/visualConference/cameraOn.svg';
import micOff from '../../../../assets/icons/visualConference/micOff.svg';
import micOn from '../../../../assets/icons/visualConference/micOn.svg';
import noAvatarIcon from '../../../../assets/img/SadCalendar.svg';
import { userContext } from '../../../../Context/context';
import { IGroupMember } from '../../typings';
import { LOCAL_VIDEO, useWebRTC } from './hooks/useWebRTC';

const Wrapper = styled(Grid)(({ theme }) => ({
  '::-webkit-scrollbar': {
    width: '3px',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: '#2b2b2b',
    borderRadius: '100px',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: '#424242',
    borderRadius: '100px',
  },
}));

interface VisualConferenceRoomProps {
  roomID: string;
  handleLeaveRoom: () => void;
  members: IGroupMember[];
}

const VisualConferenceRoom: React.FC<VisualConferenceRoomProps> = ({ roomID, handleLeaveRoom, members }) => {
  const Context = useContext(userContext);

  const {
    isVideoOn,
    isAudioOn,
    handleToggleVideo,
    handleToggleAudio,
    clients,
    provideMediaRef,
    mutedPeers,
    mapClientIdToUserId,
  } = useWebRTC(roomID, Context.user.id.toString());

  return (
    <Wrapper container direction="column" style={{ background: '#252525', overflow: 'auto' }} wrap="nowrap">
      <Grid item xs>
        <Box
          display="grid"
          gridAutoFlow="row"
          gridTemplateColumns="repeat(auto-fit, minmax(300px, 400px))"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          {clients.map((clientID: string, index: number) => {
            return (
              <div
                key={clientID}
                id={clientID}
                style={{
                  position: 'relative',
                  height: '215px',
                  maxWidth: '400px',
                  borderRadius: 8,
                  margin: 10,
                  overflow: 'hidden',
                }}
              >
                <video
                  style={{ display: 'block', width: '100%', height: '100%' }}
                  ref={instance => {
                    if (!instance) return;
                    provideMediaRef(clientID, instance);
                  }}
                  autoPlay
                  playsInline
                  muted={clientID === LOCAL_VIDEO}
                />

                {(() => {
                  const member = members.find(m => m.id.toString() === mapClientIdToUserId[clientID])!;

                  return (
                    <>
                      {mutedPeers[clientID] && (
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          position="absolute"
                          bgcolor="#343333"
                          width="100%"
                          height="100%"
                          left={0}
                          top={0}
                          zIndex={100}
                        >
                          <Avatar
                            src={member.avatar ? member.avatar.link : noAvatarIcon}
                            style={{ background: 'grey', padding: 10, width: 95, height: 95 }}
                          />
                          <Typography
                            color="#fff"
                            position="absolute"
                            left={20}
                            bottom={10}
                            fontSize={18}
                          >{`${member.firstname} ${member.lastname}`}</Typography>
                        </Box>
                      )}
                    </>
                  );
                })()}
              </div>
            );
          })}
        </Box>
      </Grid>

      <Box
        display="grid"
        gridTemplateColumns="repeat(3, fit-content(100%))"
        columnGap={2}
        justifyContent="center"
        paddingTop={2}
        paddingBottom={2}
        position="absolute"
        left={0}
        bottom={0}
        margin="0 auto"
        width="100%"
        bgcolor="#252525"
      >
        <Grid item>
          {/* <button onClick={show}>show</button> */}
          <IconButton onClick={handleToggleVideo} style={{ borderRadius: '50%' }}>
            <img src={isVideoOn ? videoOn : videoOff} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton onClick={handleToggleAudio} style={{ borderRadius: '50%' }}>
            <img src={isAudioOn ? micOn : micOff} />
          </IconButton>
        </Grid>
        <Grid item>
          <Button
            onClick={handleLeaveRoom}
            variant="contained"
            style={{ borderRadius: 30, padding: '6px 30px', backgroundColor: '#FF5631' }}
          >
            <Typography color="#fff" textTransform="none">
              Выйти
            </Typography>
          </Button>
        </Grid>
      </Box>
    </Wrapper>
  );
};

export default VisualConferenceRoom;
