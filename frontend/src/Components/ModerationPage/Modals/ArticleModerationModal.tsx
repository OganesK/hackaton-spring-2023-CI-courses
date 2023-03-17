/* eslint-disable @typescript-eslint/ban-ts-comment*/
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Grid from '@mui/material/Grid';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
// @ts-ignore
import a11yEmoji from '@fec/remark-a11y-emoji';
import style from '../../../Pages/SingleProjectPage/markdown-styles.module.css';

import { ModalFrameProps } from './typing';

import useStyles from './Styles';

const ArticleModerationModal: (props: ModalFrameProps) => JSX.Element = (props: ModalFrameProps) => {
  const classes = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleOpenClose}
        center
        styles={{ modal: { width: isTabletOrMobile ? '' : 800 } }}
      >
        <Grid container direction="column" style={{ gap: 20, padding: 20 }}>
          {/* <Grid item className={classes.modalHeader}>
              {props.title}
            </Grid> */}
          <Grid container direction="row" style={{ gap: 30 }}>
            {props.article?.includes('----changed') ? (
              <h3 style={{ color: '#24B95C' }}>Описание ниже было изменено</h3>
            ) : (
              <></>
            )}
            {props.isProject || props.isPostNews || props.isPostResource || props.isCrowd ? (
              <Grid container style={{ gap: 40 }}>
                {props.articleWithSections?.sections &&
                  props.articleWithSections?.sections.map(section => (
                    <>
                      {section.type === 'image' ? (
                        <Grid container>
                          <img src={section.media?.link} className={classes.articleImg} />
                        </Grid>
                      ) : section.type === 'video' ? (
                        <Grid container>
                          <video
                            className={classes.articleVideo}
                            style={{ maxHeight: 650 }}
                            controls
                            autoPlay={false}
                            loop={false}
                            preload={'auto'}
                            src={section.media?.link}
                          />
                        </Grid>
                      ) : (
                        <Grid container key={section.text}>
                          <ReactMarkdown plugins={[gfm, a11yEmoji]} className={style.reactMarkDown}>
                            {section.text ? section.text : 'Заполните секцию'}
                          </ReactMarkdown>
                        </Grid>
                      )}
                    </>
                  ))}
              </Grid>
            ) : (
              <ReactMarkdown key={props.article} plugins={[gfm, a11yEmoji]}>
                {props.article && props.article.replace('----changed', '')}
              </ReactMarkdown>
            )}
            {/* <img
                src={props.media}
                style={{ width: 100, height: 100, filter: props.media ? 'drop-shadow(6px 6px 10px #24B95C)' : 'none' }}
              /> */}
          </Grid>
        </Grid>
      </Modal>
    </div>
  );
};

export default ArticleModerationModal;
