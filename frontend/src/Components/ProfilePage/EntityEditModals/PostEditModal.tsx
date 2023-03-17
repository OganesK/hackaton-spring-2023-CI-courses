/* eslint-disable @typescript-eslint/ban-ts-comment*/
/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/

import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, OutlinedInput, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import { useQuery } from '@apollo/client';

import { GetUrlToUploadPostPoster } from '../graphql/mutations';

import NoneClick from '../../UI/NoneClickableField/NoneClick';
import Button from '../../UI/Buttons/OutlinedButton/Button';
import SnackbarOnChange from '../../UI/Snackbar/Snackbar';
import { ModalImage, ModalImageContainer } from '../../UI/Styles/TS/Style';
import useStyles from '../../UI/Styles/TS/Components/createModalStyles/index';

import imgModalDefault from '../../../assets/img/imgModal.svg';

import { GET_POST_QUERY } from './graphql/query';
import { UpdatePostMutation } from './graphql/mutation';
import { PostEditModalProps } from './graphql/typings';
import { categoriesArray } from '../../../helpers/constants/categories';
import { useTranslate } from '../../../helpers/hooks/useTranslateCategories';

const PostEditModal: (props: PostEditModalProps) => JSX.Element = (props: PostEditModalProps) => {
  const styles = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });

  const { data, loading, refetch } = useQuery<{ post: OfferTypes }>(GET_POST_QUERY, {
    variables: { id: Number(props.postid) },
  });

  const updatePostHandler = UpdatePostMutation();

  const UrlToUploadPosterHandler = GetUrlToUploadPostPoster();
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [posterValue, setPosterValue] = useState<{
    name: string;
    size: number;
    type: string;
  }>({
    name: '',
    type: '',
    size: 0,
  });
  const [imgModal, setImgModal] = useState(imgModalDefault);
  const [catValue, setCatValue] = useState('');

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCatValue(event.target.value);
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  useEffect(() => {
    if (!loading && data) {
      setCatValue(data.post.category);
      setNameValue(data.post.title);
      setDescriptionValue(data.post.description);
      setImgModal(data.post.poster.link);
      const contentState = stateFromHTML(data.post.description);
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [loading]);

  let content: any;

  const onClickHandler: () => Promise<void> = async () => {
    if (props.isOfferFilter) {
      content = stateToHTML(editorState.getCurrentContent());
    }
    if (nameValue && descriptionValue && catValue) {
      setOpenNoneClick(true);
      const newPostData = {
        title: nameValue,
        description: props.isOfferFilter ? content : descriptionValue,
        category: catValue,
        postId: props.postid,
      };
      await updatePostHandler(newPostData);
      if (posterValue.size !== 0) {
        const PosterData = {
          entityType: 'postPoster',
          entityId: props.postid,
          fileType: posterValue.type,
        };
        const uploadUrl = await UrlToUploadPosterHandler(PosterData);
        await fetch(uploadUrl.data!.createMedia?.signedURL, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          credentials: 'include', // include, *same-origin, omit
          headers: {
            'Content-Type': posterValue.type,
          },
          //@ts-ignore
          body: posterValue, // body data type must match "Content-Type" header
        });
      }
      props.handleOpenClose();
      await refetch();
      setOpenNoneClick(false);
    } else {
      setOpenSnack(true);
      setTimeout(() => setOpenSnack(false), 4000);
    }
  };

  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  const handleClick: () => void = () => {
    // @ts-ignore
    hiddenFileInput.current.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const fileUploaded = event.target.files![0];
    setImgModal(URL.createObjectURL(fileUploaded));
    setPosterValue(fileUploaded);
  };

  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleOpenClose}
        center
        styles={{ modal: { width: isTabletOrMobile ? '' : 800 } }}
      >
        <Grid container direction="column" className={styles.modalContainer}>
          {openNoneClick ? <NoneClick /> : null}

          <Grid item className={styles.modalHeader}>
            Редактирование {props.isNewsFilter ? 'новости' : props.isResourceFilter ? 'ресурса' : 'объявления'}
          </Grid>
          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Изменить название
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={nameValue}
                value={nameValue}
                placeholder={isTabletOrMobile ? '*' : 'Название'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setNameValue(e.target.value)}
                inputProps={{
                  maxLength: 128,
                }}
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid
              container
              md={3}
              xs={12}
              className={styles.modalHeaderText}
              style={{ paddingTop: isTabletOrMobile ? 0 : 10 }}
            >
              {props.isOfferFilter ? 'Изменить описание статьи' : 'Изменить краткое описание'}
            </Grid>
            {props.isOfferFilter ? (
              <Grid item xs>
                <Editor
                  editorState={editorState}
                  wrapperClassName="rich-editor demo-wrapper"
                  editorClassName="demo-editor"
                  toolbarClassName="toolbar-class"
                  editorStyle={{ border: '1px solid #c4c4c4', borderRadius: 4, padding: '0 14px 0 14px' }}
                  toolbarStyle={{
                    border: '1px solid #c4c4c4',
                    borderRadius: 4,
                  }}
                  onEditorStateChange={onEditorStateChange}
                  placeholder="Заполните описание..."
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
                    history: { inDropdown: true },
                  }}
                />
              </Grid>
            ) : (
              <Grid item xs>
                <OutlinedInput
                  fullWidth={true}
                  defaultValue={descriptionValue}
                  value={descriptionValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescriptionValue(e.target.value)}
                  placeholder={isTabletOrMobile ? '*' : 'Краткое описание *'}
                  inputProps={{
                    maxLength: 128,
                  }}
                  size="small"
                  multiline
                />
              </Grid>
            )}
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Изменить категорию публикации
            </Grid>
            <Grid container md={5} xs={12}>
              <Select value={catValue} onChange={handleChangeCategory} fullWidth size="small">
                {categoriesArray
                  .filter(cat => {
                    if (cat.split(',').pop() === 'Все') {
                      return false;
                    }
                    return true;
                  })
                  .map(cat => (
                    <MenuItem key={cat} value={cat}>
                      {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
                      {useTranslate(cat)}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} className={styles.modalHeaderText}>
              Изменить обложку
            </Grid>
            <Grid container xs direction="column" style={{ gap: 15 }}>
              {isTabletOrMobile ? null : <Grid>Выберете изображение для обложки публикации</Grid>}
              <Grid container direction="row" style={{ gap: 20 }}>
                <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
                <ModalImageContainer
                  container
                  justifyContent="center"
                  alignItems="center"
                  onClick={handleClick}
                  md={7}
                  xs={5}
                  isDefault={imgModal === imgModalDefault}
                >
                  <ModalImage src={imgModal} isDefault={imgModal === imgModalDefault} />
                </ModalImageContainer>
                <Grid container xs alignItems="center" className={styles.imgConditionText}>
                  JPEG или PNG
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {isTabletOrMobile ? (
            <Grid container direction="column" style={{ marginTop: 30, gap: 20 }}>
              <Button onClick={onClickHandler} text="Сохранить" className={styles.modalButton} />
              <Button onClick={props.handleOpenClose} isCancel={true} text="Отменить" className={styles.modalButton} />
            </Grid>
          ) : (
            <Grid container justifyContent="flex-end">
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                xs={9}
                className={styles.modalButtonContainer}
              >
                <Grid container xs>
                  <Button
                    onClick={props.handleOpenClose}
                    isCancel={true}
                    text="Отменить"
                    className={styles.modalButton}
                  />
                </Grid>
                <Grid container xs>
                  <Button onClick={onClickHandler} text="Сохранить" className={styles.modalButton} />
                </Grid>
              </Grid>
            </Grid>
          )}
          <SnackbarOnChange
            openSnack={openSnack}
            setOpenSnack={setOpenSnack}
            isError
            textInSnack="Проверьте обязательные поля (*) на заполненность"
          />
        </Grid>
      </Modal>
    </div>
  );
};

export default PostEditModal;
