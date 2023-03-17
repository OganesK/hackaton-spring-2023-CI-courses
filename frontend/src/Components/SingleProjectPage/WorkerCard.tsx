import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Grid, Avatar, Button, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { useHistory } from 'react-router-dom';

import Line from '../UI/Line/Line';
import MyButton from '../../Components/UI/Buttons/OutlinedButton/Button';
import { useWindowSize } from '../../rules/index';

import SendM from '../../assets/icons/SendM.svg';
import DeleteM from '../../assets/icons/DeleteM.svg';

import { WorkerCardTypes, SwitchToChatTypes } from './typings';
import { DeleteOneWorkerMutation, SwitchToChat } from './graphql/mutations';

import useStyles from './Styles';

export default function WorkerCard(props: WorkerCardTypes): JSX.Element {
  const history = useHistory();
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });
  const [width] = useWindowSize();

  const [hover, setHover] = useState(false);

  const deleteWorkerMutationHandler = DeleteOneWorkerMutation();
  const switchToChatHandler = SwitchToChat();

  const handleProfileClick: () => void = () => {
    history.push(`/profile/${props.userId}`);
  };

  const workerDeletionHandler: () => void = async () => {
    await deleteWorkerMutationHandler(props.workerId);
    await props.refetch();
  };

  const messageButtonHandler: () => Promise<void> = async () => {
    const res: SwitchToChatTypes = await switchToChatHandler({
      senderId: props.userInfo && Number(props.userInfo),
      recipientId: Number(props.userId),
    });
    history.push(`/messages/${res?.data!.switchToMessager.id}`);
  };

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ gap: isTabletOrMobile ? 30 : 40, backgroundColor: hover ? '#f9f9fa' : '', transition: 'all .5s ease' }}
        onMouseOver={(): void => setHover(true)}
        onMouseOut={(): void => setHover(false)}
      >
        <Grid
          container
          xs
          style={{
            gap: isTabletOrMobile ? 30 : 40,
            cursor: 'pointer',
          }}
          alignItems="center"
          onClick={handleProfileClick}
        >
          <Grid item>
            <Avatar
              sx={{
                width: width < 600 ? 'clamp(3.75rem, 0.3750rem + 15.0000vw, 6rem)' : 96,
                height: width < 600 ? 'clamp(3.75rem, 0.3750rem + 15.0000vw, 6rem)' : 96,
              }}
              src={props.avatar}
              aria-label="avatar"
            />
          </Grid>
          <Grid item xs direction="column" style={{ gap: 6 }}>
            <Grid item className={classes.workerName}>
              {props.lastName + ' ' + props.firstName}
            </Grid>
            <Grid item className={classes.positionText}>
              {props.position}
            </Grid>
          </Grid>
        </Grid>

        {props.userId === props.userInfo ? null : (
          <Grid item className={classes.titleParticipantsList}>
            {props.isOwner ? (
              <>
                <>
                  {isTabletOrMobile ? (
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="menu"
                      onClick={workerDeletionHandler}
                    >
                      <img src={DeleteM} />
                    </IconButton>
                  ) : (
                    <Button
                      onClick={workerDeletionHandler}
                      variant="text"
                      // color="inherit"
                      startIcon={<ClearIcon />}
                      sx={{
                        color: '#AAADB2',
                        fontWeight: 500,
                        fontSize: 18,
                        lineHeight: '100%',
                      }}
                    >
                      Удалить
                    </Button>
                  )}
                </>
              </>
            ) : (
              <>
                {isTabletOrMobile ? (
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={workerDeletionHandler}
                  >
                    <img src={SendM} />
                  </IconButton>
                ) : (
                  <MyButton
                    onClick={messageButtonHandler}
                    isDisable={props.userInfo ? false : true}
                    text="к диалогу"
                    className={classes.messageButton}
                    isWhite={props.userInfo ? true : false}
                    isEdit={props.userInfo ? true : false}
                  />
                )}
              </>
            )}
          </Grid>
        )}
      </Grid>
      <Line marginTop={22} marginBottom={22} />
    </>
  );
}
