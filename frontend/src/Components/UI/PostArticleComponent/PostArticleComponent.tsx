/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useMutation } from '@apollo/client';

import { Button, Grid, IconButton, SpeedDial, SpeedDialAction } from '@mui/material';

import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import NoneClick from '../../UI/NoneClickableField/NoneClick';

import defImg from '../../../assets/img/ImageProject.png';

import BucketIcon from '../../../assets/icons/bucket.svg';
import AddSectionIcon from '../../../assets/icons/add.svg';
import TextIcon from '../../../assets/icons/text.svg';
import ImageIcon from '../../../assets/icons/image.svg';
import VideoIcon from '../../../assets/icons/video.svg';

import useStyles from './Styles';

import {
  CREATE_ARTICLE_MUTATION,
  UPDATE_ARTICLE_MUTATION,
  DELETE_ARTICLE_MUTATION,
  CREATE_PROJECT_DESCRIPTION_MUTATION,
  UPDATE_PROJECT_DESCRIPTION_MUTATION,
  DELETE_PROJECT_DESCRIPTION_MUTATION,
  CREATE_CROWDFUNDING_ARTICLE_MUTATION,
  UPDATE_CROWDFUNDING_ARTICLE_MUTATION,
  DELETE_CROWDFUNDING_ARTICLE_MUTATION,
  UploadMediaMutation,
} from './graphql/mutations';
import { ArticleProps, Section } from './graphql/typings';

const PostArticleComponent: (props: ArticleProps) => JSX.Element = (props: ArticleProps) => {
  const [edit, setEdit] = useState(false);
  const [sectionValue, setSectionValue] = useState<Section[]>([]);

  const [showSections, setShowSections] = useState(false);
  const [sectionsNumber, setSectionsNumber] = useState(2);

  const handleShowSections: () => void = () => {
    setShowSections(!showSections);
  };

  const [postIdValue, setPostIdValue] = useState<number | null>(props.postId);
  const [numberCounter, setNumberCounter] = useState(props.article ? props.article.sections.length : 0);
  let newArticleData: { projectId?: number; sections?: Section[]; crowdFundingId?: number; postId?: number } = {};
  let updateArticleData: {
    sections?: { number: number; type: string; text?: string | null; mediaURL?: string | null }[];
    descriptionId?: number;
    articleId?: number;
    storyId?: number;
  } = {};

  let articleId: { descriptionId?: number; storyId?: number; articleId?: number } = {};

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [createArticleHandler] = useMutation(
    props.isProject
      ? CREATE_PROJECT_DESCRIPTION_MUTATION
      : props.isCrowdfunding
      ? CREATE_CROWDFUNDING_ARTICLE_MUTATION
      : CREATE_ARTICLE_MUTATION,
  );
  const [updateArticleHandler] = useMutation(
    props.isProject
      ? UPDATE_PROJECT_DESCRIPTION_MUTATION
      : props.isCrowdfunding
      ? UPDATE_CROWDFUNDING_ARTICLE_MUTATION
      : UPDATE_ARTICLE_MUTATION,
  );
  const [deleteArticleHandler] = useMutation(
    props.isProject
      ? DELETE_PROJECT_DESCRIPTION_MUTATION
      : props.isCrowdfunding
      ? DELETE_CROWDFUNDING_ARTICLE_MUTATION
      : DELETE_ARTICLE_MUTATION,
  );
  const uploadMediaHandler = UploadMediaMutation();

  const classes = useStyles();

  const [hoverIcon, setHoverIcon] = useState(false);
  const [hover, setHover] = useState<boolean[]>([false]);

  const handleIncrement = () => {
    setNumberCounter(prevCount => prevCount + 1);
  };

  useEffect(() => {
    if (props.article) {
      setSectionValue(props.article?.sections);
    }
  }, []);

  useEffect(() => {
    if (!showSections) {
      setSectionsNumber(2);
    } else {
      setSectionsNumber(props.article!.sections.length);
    }
  }, [showSections]);

  const hiddenFileInputImage = React.useRef<HTMLInputElement>(null);
  const hiddenFileInputVideo = React.useRef<HTMLInputElement>(null);

  const handleClickAddImage: () => void = () => {
    hiddenFileInputImage?.current!.click();
  };

  const handleClickAddVideo: () => void = () => {
    hiddenFileInputVideo?.current!.click();
  };

  const handleChangeImage: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void> = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fileUploaded = event.target.files![0];
    const userImageData = {
      entityType: props.isProject ? 'projectDescription' : props.isCrowdfunding ? 'crowdfundingStory' : 'postMedia',
      entityId: props.postId,
      fileType: fileUploaded.type,
    };
    setOpenNoneClick(true);
    try {
      const uploadUrl = (await uploadMediaHandler(userImageData)).data;
      const articleMediaLink = uploadUrl!.createMedia.mediaURL;
      await fetch(uploadUrl!.createMedia?.signedURL, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, *same-origin, omit
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: fileUploaded, // body data type must match "Content-Type" header
      });
      setSectionValue([...sectionValue, { number: numberCounter, type: 'image', mediaURL: articleMediaLink }]);
      handleIncrement();
      setOpenNoneClick(false);
    } catch (e) {
      console.error('FILE_UPLOAD_ERROR', e);
    }
    setOpenNoneClick(false);
  };

  const handleChangeVideo: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void> = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const fileUploaded = event.target.files![0];
    const userVideoData = {
      entityType: props.isProject ? 'projectDescription' : props.isCrowdfunding ? 'crowdfundingStory' : 'postMedia',
      entityId: props.postId,
      fileType: fileUploaded.type,
    };
    setOpenNoneClick(true);
    try {
      const uploadUrl = (await uploadMediaHandler(userVideoData)).data;
      const articleMediaLink = uploadUrl?.createMedia.mediaURL;
      await fetch(uploadUrl!.createMedia?.signedURL, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, *same-origin, omit
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: fileUploaded, // body data type must match "Content-Type" header
      });
      setSectionValue([...sectionValue, { number: numberCounter, type: 'video', mediaURL: articleMediaLink }]);
      handleIncrement();
      setOpenNoneClick(false);
    } catch (e) {
      console.error('FILE_UPLOAD_ERROR', e);
    }
    setOpenNoneClick(false);
  };

  const handleCreateArticle: () => Promise<void> = async () => {
    if (edit) {
      if (sectionValue && postIdValue) {
        setOpenNoneClick(true);
        sectionValue.map((item, index) => {
          item.number = index;
        });
        if (props.isProject) {
          newArticleData = {
            projectId: postIdValue,
            sections: sectionValue,
          };
        } else if (props.isCrowdfunding) {
          newArticleData = {
            crowdFundingId: postIdValue,
            sections: sectionValue,
          };
        } else {
          newArticleData = {
            postId: postIdValue,
            sections: sectionValue,
          };
        }

        await createArticleHandler({
          variables: {
            data: newArticleData,
          },
        })
          .then(() => {
            console.log('create');
          })
          .catch(err => {
            console.error(err);
          });
        window.location.reload();
        setEdit(!edit);
        setOpenNoneClick(false);
      } else {
        alert('Проверьте обязательные поля (*) на заполненность');
      }
    } else {
      setEdit(!edit);
    }
  };

  const handleUpdateArticle: () => Promise<void> = async () => {
    if (edit) {
      const newSectionValue: {
        number: number;
        type: string;
        text?: string | null;
        mediaURL?: string | null;
      }[] = [];
      sectionValue.forEach(item => {
        const section = {
          number: item.number,
          type: item.type,
          text: item.text ? item.text : null,
          mediaURL: item.media ? item.media.link : item.mediaURL ? item.mediaURL : null,
        };

        try {
          newSectionValue.push(section);
        } catch (e) {
          console.log(e);
        }
      });
      if (newSectionValue) {
        setOpenNoneClick(true);
        newSectionValue.map((item, index) => {
          item.number = index;
        });

        if (props.isProject) {
          updateArticleData = {
            descriptionId: props.article!.id,
            sections: newSectionValue,
          };
        } else if (props.isCrowdfunding) {
          updateArticleData = {
            storyId: props.article!.id,
            sections: newSectionValue,
          };
        } else {
          updateArticleData = {
            articleId: props.article!.id,
            sections: newSectionValue,
          };
        }
        await updateArticleHandler({
          variables: {
            data: updateArticleData,
          },
        })
          .then(() => {
            console.log('update');
          })
          .catch(err => {
            console.error(err);
          });
        window.location.reload();
        setEdit(!edit);
        setOpenNoneClick(false);
      } else {
        alert('Проверьте обязательные поля (*) на заполненность');
      }
    } else {
      setEdit(!edit);
    }
  };

  const handleRemoveClick = (index: any) => {
    const newOne = [...sectionValue];
    newOne.splice(index, 1);
    setSectionValue(newOne);
  };

  const handleAddTextClick = () => {
    handleIncrement();
    setSectionValue([...sectionValue, { number: numberCounter, type: 'text', text: '' }]);
  };

  const actions = [
    { icon: <img src={TextIcon} />, name: 'Текст', handler: handleAddTextClick },
    { icon: <img src={ImageIcon} />, name: 'Картинка', handler: handleClickAddImage },
    { icon: <img src={VideoIcon} />, name: 'Видео', handler: handleClickAddVideo },
  ];

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });

  return (
    <Grid
      container
      style={{ gap: isTabletOrMobile ? 20 : 40, marginBottom: props.isProject || props.isCrowdfunding ? 0 : 60 }}
    >
      {openNoneClick ? <NoneClick /> : null}
      {props.isOwner ? (
        <Grid
          container
          justifyContent={isTabletOrMobile ? 'space-between' : 'flex-end'}
          className={edit ? classes.navigationArticleHeader : ''}
          style={{ gap: isTabletOrMobile ? 0 : 40 }}
          id={props.isCrowdfunding ? 'beginning' : ''}
        >
          <Button
            onClick={props.article ? handleUpdateArticle : handleCreateArticle}
            variant="text"
            startIcon={edit ? <CheckIcon /> : <EditIcon />}
            sx={{
              color: '#AAADB2',
              fontWeight: 500,
            }}
          >
            {props.article
              ? edit
                ? 'Сохранить'
                : props.isCrowdfunding || props.isProject
                ? isTabletOrMobile
                  ? 'Редактировать'
                  : 'Редактировать описание'
                : isTabletOrMobile
                ? 'Редактировать'
                : 'Редактировать статью'
              : edit
              ? 'Сохранить'
              : props.isCrowdfunding || props.isProject
              ? isTabletOrMobile
                ? 'Создать'
                : 'Создать описание'
              : isTabletOrMobile
              ? 'Создать'
              : 'Создать статью'}
          </Button>
          {edit ? (
            <Button
              onClick={() => {
                setEdit(!edit);
              }}
              variant="text"
              startIcon={<CloseIcon />}
              sx={{
                color: '#AAADB2',
                fontWeight: 500,
              }}
            >
              Отменить
            </Button>
          ) : (
            <>
              {props.article ? (
                <Button
                  onClick={async () => {
                    if (props.isProject) {
                      articleId = {
                        descriptionId: props.article!.id,
                      };
                    } else if (props.isCrowdfunding) {
                      articleId = {
                        storyId: props.article!.id,
                      };
                    } else {
                      articleId = {
                        articleId: props.article!.id,
                      };
                    }
                    await deleteArticleHandler({
                      variables: {
                        data: articleId,
                      },
                    });
                    window.location.reload();
                  }}
                  variant="text"
                  startIcon={<CloseIcon />}
                  sx={{
                    color: '#AAADB2',
                    fontWeight: 500,
                  }}
                >
                  {props.isCrowdfunding || props.isProject
                    ? isTabletOrMobile
                      ? 'Удалить'
                      : 'Удалить описание'
                    : isTabletOrMobile
                    ? 'Удалить'
                    : 'Удалить статью'}
                </Button>
              ) : null}
            </>
          )}
        </Grid>
      ) : null}
      <Grid container>
        {edit ? (
          <>
            {sectionValue.map((section, i) => {
              return (
                <Grid
                  container
                  justifyContent="center"
                  key={section.number}
                  style={{ marginBottom: 35, gap: 20 }}
                  onMouseOver={(): void => {
                    hover[i] = true;
                    setHover([...hover]);
                  }}
                  onMouseOut={(): void => {
                    hover[i] = false;
                    setHover([...hover]);
                  }}
                >
                  {section.type === 'text' ? (
                    <Grid container xs={10}>
                      <Editor
                        defaultEditorState={EditorState.createWithContent(stateFromHTML(sectionValue[i].text!))}
                        // editorState={EditorState.createWithContent(stateFromHTML(sectionValue[i].text!))}
                        onEditorStateChange={(editorState: any): void => {
                          // setEditorStateArray(editorState);
                          setSectionValue(oldSectionValue => {
                            const newSectionValue = [...oldSectionValue];
                            newSectionValue[i] = {
                              ...oldSectionValue[i],
                              text: stateToHTML(editorState.getCurrentContent()),
                            };
                            return newSectionValue;
                          });
                        }}
                        wrapperClassName="rich-editor demo-wrapper"
                        editorClassName="demo-editor"
                        toolbarClassName="toolbar-class"
                        wrapperStyle={{
                          width: '100%',
                        }}
                        editorStyle={{
                          border: '1px solid #c4c4c4',
                          borderRadius: 4,
                          height: 'auto',
                          padding: '0 14px 0 14px',
                        }}
                        toolbarStyle={{
                          border: '1px solid #c4c4c4',
                          borderRadius: 4,
                        }}
                        placeholder="Напишите что-нибудь..."
                        toolbarOnFocus
                        toolbar={{
                          options: [
                            'inline',
                            'blockType',
                            // 'fontSize',
                            'list',
                            //  'textAlign',
                            'link',
                            'history',
                          ],
                          inline: {
                            inDropdown: true,
                            options: ['bold', 'italic', 'underline', 'strikethrough'],
                          },
                          blockType: {
                            inDropdown: true,
                            options: ['Normal', 'H1', 'H2', 'H3', 'H4'],
                          },
                          // fontSize: {
                          //   options: [10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60],
                          // },
                          list: {
                            inDropdown: true,
                          },
                          // textAlign: { inDropdown: true },
                          link: { inDropdown: true },
                          // history: { inDropdown: true },
                        }}
                      />
                    </Grid>
                  ) : section.type === 'image' ? (
                    <Grid container xs={10}>
                      <img
                        src={section.media ? section.media.link : section.mediaURL ? section.mediaURL : defImg}
                        className={classes.articleImg}
                      />
                    </Grid>
                  ) : (
                    <Grid container xs={10}>
                      <video
                        className={classes.articleVideo}
                        loop={false}
                        preload={'auto'}
                        src={section.media ? section.media.link : section.mediaURL ? section.mediaURL : defImg}
                      />
                    </Grid>
                  )}
                  <Grid
                    item
                    style={{
                      position: props.isProject || props.isCrowdfunding ? 'relative' : 'absolute',
                      right: 0,
                      color: '#AAADB2',
                      opacity: hover[i] ? 1 : 0,
                    }}
                  >
                    <IconButton size="large" edge="start" color="inherit" onClick={() => handleRemoveClick(i)}>
                      <img src={BucketIcon} />
                    </IconButton>
                  </Grid>
                </Grid>
              );
            })}
            <Grid container>
              <SpeedDial
                ariaLabel="Add section"
                direction="right"
                icon={
                  <img
                    src={AddSectionIcon}
                    style={{ transition: 'all 0.3s ease', transform: hoverIcon ? 'rotate(45deg)' : 'none' }}
                  />
                }
                onMouseOver={(): void => setHoverIcon(true)}
                onMouseOut={(): void => setHoverIcon(false)}
              >
                {actions.map(action => (
                  <SpeedDialAction
                    key={action.name}
                    icon={action.icon}
                    tooltipTitle={action.name}
                    sx={{ backgroundColor: '#252525' }}
                    onClick={action.handler}
                  />
                ))}
              </SpeedDial>
              <input type="file" ref={hiddenFileInputImage} onChange={handleChangeImage} style={{ display: 'none' }} />
              <input type="file" ref={hiddenFileInputVideo} onChange={handleChangeVideo} style={{ display: 'none' }} />
            </Grid>
          </>
        ) : (
          <Grid container>
            {props.article ? (
              <Grid container style={{ gap: props.isProject ? 30 : 40 }}>
                {props.article?.sections &&
                  props.article?.sections.map((section, index) => (
                    <>
                      {props.isCrowdfunding || props.isProject ? (
                        index < sectionsNumber ? (
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
                                {section.text ? (
                                  <div
                                    style={{ wordWrap: 'break-word', width: '100%', lineHeight: '150%' }}
                                    dangerouslySetInnerHTML={{ __html: section.text }}
                                  />
                                ) : null}
                              </Grid>
                            )}
                          </>
                        ) : null
                      ) : (
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
                              {section.text ? (
                                <div
                                  style={{ wordWrap: 'break-word', width: '100%' }}
                                  dangerouslySetInnerHTML={{ __html: section.text }}
                                />
                              ) : null}
                            </Grid>
                          )}
                        </>
                      )}
                    </>
                  ))}
                {(props.isCrowdfunding || props.isProject) && props.article.sections.length > 3 ? (
                  <Grid container justifyContent="center">
                    <Button
                      variant="text"
                      sx={{
                        color: '#252525',
                        fontSize: 18,
                        lineHeight: '120%',
                        fontWeight: 600,
                        textTransform: 'none',
                      }}
                      onClick={handleShowSections}
                    >
                      {showSections ? 'Свернуть' : 'Читать полностью'}
                    </Button>
                  </Grid>
                ) : null}
              </Grid>
            ) : (
              //   )}
              // </>
              <>
                {props.isOwner ? (
                  <Grid>
                    {props.isCrowdfunding
                      ? 'Заполните описание краудфандинга, кликнув по кнопке "Создать описание"'
                      : props.isProject
                      ? 'Заполните описание курса, кликнув по кнопке "Создать описание"'
                      : 'Заполните статью публикации, кликнув по кнопке "Создать статью"'}
                  </Grid>
                ) : null}
              </>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default PostArticleComponent;
