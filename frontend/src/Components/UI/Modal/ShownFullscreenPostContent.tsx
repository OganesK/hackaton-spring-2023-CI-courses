/*eslint-disable  @typescript-eslint/restrict-template-expressions*/
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Avatar, Backdrop, Box, Fade, Grid, Modal } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { MdClose } from 'react-icons/md';
import styled from 'styled-components';

import { useWindowSize } from '../../../rules/index';
import useStyles from './fullscreenPostStyle';
import PostArticleComponent from '../../UI/PostArticleComponent/PostArticleComponent';
import { ModalProps } from './graphql/typings';

export default function ShownFullscreenPostContent(props: ModalProps): JSX.Element {
  const classes = useStyles();

  const [width] = useWindowSize();
  const history = useHistory();

  const toProfileHandler: () => void = () => {
    history.push(`/profile/${props.ownerId}`);
  };

  const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    top: 60px;
    right: 80px;
    width: 48px;
    height: 48px;
    padding: 0;
    z-index: 10;
    color: #aaadb2;
    :hover {
      transition: all 0.5s ease;
      color: #ff5631;
    }
  `;

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.open}
      onClose={props.handleOpenClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={props.open}>
        <Box
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            bgcolor: 'background.paper',
            color: '#252525',
            overflow: 'auto',
          }}
        >
          {width < 961 ? (
            <Grid container style={{ gap: 32, padding: 40 }}>
              <Grid container>
                <ArrowBackIcon
                  style={{ color: '#252525', fontSize: 46, cursor: 'pointer' }}
                  onClick={props.handleOpenClose}
                />
              </Grid>
              <Grid container direction="column" xs={12} style={{ gap: 30, margin: 'auto' }}>
                <Grid container>
                  <Grid item style={{ cursor: 'pointer' }} onClick={toProfileHandler}>
                    <Grid container direction="row" style={{ gap: 20 }}>
                      <Avatar
                        alt="user"
                        sx={{
                          width: 48,
                          height: 48,
                        }}
                        src={props.ownerAvatar}
                      />
                      <Grid item>
                        <Grid container direction="column" justifyContent="center" style={{ gap: 6 }}>
                          <Grid item className={classes.nameText}>
                            {props.firstname}&nbsp;{props.lastname}
                          </Grid>
                          <Grid item className={classes.fullModalDate}>
                            {props.date}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  className={classes.fullModalHeader}
                  style={{ textTransform: 'uppercase', margin: 'auto', fontWeight: 400 }}
                >
                  {props.title}
                </Grid>
                <Grid container style={{ marginTop: 30 }}>
                  <PostArticleComponent
                    article={props.article}
                    postId={props.id}
                    isOwner={props.isOwner}
                    // loading={props.loading}
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid
                container
                direction="column"
                xs={8}
                style={{ gap: 20, margin: 'auto', border: '0px solid', marginTop: 60, position: 'relative' }}
              >
                <Grid container style={{ marginBottom: 60 }}>
                  <Grid item style={{ cursor: 'pointer' }} onClick={toProfileHandler}>
                    <Grid container direction="row" style={{ gap: 20 }}>
                      <Avatar
                        alt="user"
                        sx={{
                          width: 48,
                          height: 48,
                        }}
                        src={props.ownerAvatar}
                      />
                      <Grid item>
                        <Grid container direction="column" justifyContent="center" style={{ gap: 6 }}>
                          <Grid item className={classes.nameText}>
                            {props.firstname}&nbsp;{props.lastname}
                          </Grid>
                          <Grid item className={classes.fullModalDate}>
                            {props.date}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  className={classes.fullModalHeader}
                  style={{ textTransform: 'uppercase', margin: 'auto' }}
                >
                  {props.title}
                </Grid>
                <Grid container style={{ marginTop: 30 }}>
                  <PostArticleComponent article={props.article} postId={props.id} isOwner={props.isOwner} />
                </Grid>
              </Grid>
              <CloseModalButton aria-label="Close modal" onClick={props.handleOpenClose} />
            </>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
