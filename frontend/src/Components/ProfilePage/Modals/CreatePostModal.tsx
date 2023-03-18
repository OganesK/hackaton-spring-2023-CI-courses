/* eslint-disable @typescript-eslint/no-unsafe-member-access*/
/* eslint-disable @typescript-eslint/ban-ts-comment*/
/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/
/* eslint-disable @typescript-eslint/no-unsafe-call*/
import React, { useState, useEffect, useRef } from 'react';

import { useMediaQuery } from 'react-responsive';

import { Grid, OutlinedInput, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { stateToHTML } from 'draft-js-export-html';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import { useQuery } from '@apollo/client';

import { CreateOfferMutation, GetUrlToUploadPostPoster } from '../graphql/mutations';
// import { GET_PROJECTS_QUERY } from '../graphql/query';
import { ProjectsDataQueryTypes } from '../graphql/typing';
import { PostCreateModalProps } from './typings';

import useStyles from '../../UI/Styles/TS/Components/createModalStyles/index';
import Button from '../../UI/Buttons/OutlinedButton/Button';
import NoneClick from '../../UI/NoneClickableField/NoneClick';
import SnackbarOnChange from '../../UI/Snackbar/Snackbar';

import AutoCompleteSearchFieldForProject from '../../UI/AutoCompleteSearchFields/AutoCompleteSearchFieldForProject';
import { ModalImage, ModalImageContainer } from '../../UI/Styles/TS/Style';

import imgModalDefault from '../../../assets/img/imgModal.svg';

import { categoriesArray } from '../../../helpers/constants/categories';
import { useTranslate } from '../../../helpers/hooks/useTranslateCategories';
import { GET_PROJECTS_QUERY } from '../../../Queries';

const CreatePostModal: (props: PostCreateModalProps) => JSX.Element = (props: PostCreateModalProps) => {
  const styles = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  const PostCreationHandler = CreateOfferMutation();
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
  const [catValue, setCatValue] = useState('business');
  const [projectIdValue, setProjectIdValue] = useState<string | null>('');

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: any) => {
    setEditorState(editorState);
  };

  const { data: projectData } = useQuery<ProjectsDataQueryTypes>(GET_PROJECTS_QUERY);

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCatValue(event.target.value);
  };

  let content: any;

  useEffect(() => {
    if (props.isProjectPage) {
      setProjectIdValue(props.projectId.toLocaleString());
    }
  }, []);

  const onClickHandler: () => Promise<void> = async () => {
    if (props.isOfferFilter) {
      // content = getInnerHtml(id);
      // content = createMarkup(convertedContent).__html;
      content = stateToHTML(editorState.getCurrentContent());
      // content = getHtml(editorState);
    } else {
      content = '';
    }
    if (nameValue && (descriptionValue || content) && catValue && projectIdValue) {
      setOpenNoneClick(true);
      console.log(descriptionValue, content);
      const newPostData = {
        isOffer: props.isOfferFilter,
        isResource: props.isResourceFilter,
        isNews: props.isNewsFilter,
        title: nameValue,
        description: props.isOfferFilter ? content : descriptionValue,
        category: catValue,
        tags: ['123'],
        projectId: props.isProjectPage
          ? props.projectId
          : Number(projectData?.projects.filter(project => project.name === projectIdValue)[0].id),
      };
      const postId = await PostCreationHandler(newPostData);
      if (posterValue.size !== 0) {
        const PosterData = {
          entityType: 'postPoster',
          entityId: postId?.data?.postCreateMutation?.id,
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
      if (props.isProjectPage) {
        await props.refetchOnProjectPage!();
      } else {
        await props.refetchOnProfilePage!();
      }

      setNameValue('');
      setDescriptionValue('');
      setPosterValue({
        name: '',
        type: '',
        size: 0,
      });
      setImgModal(imgModalDefault);
      setCatValue('business');

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
            Создание {props.isNewsFilter ? 'уроки' : props.isResourceFilter ? 'ресурса' : 'объявления'}
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Название
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={nameValue}
                value={nameValue}
                placeholder={isTabletOrMobile ? '*' : 'Название *'}
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
              style={{ paddingTop: isTabletOrMobile ? 0 : 10 }}
              className={styles.modalHeaderText}
            >
              {props.isOfferFilter ? 'Описание статьи' : 'Краткое описание'}
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
                  fullWidth
                  defaultValue={descriptionValue}
                  value={descriptionValue}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescriptionValue(e.target.value)}
                  placeholder={isTabletOrMobile ? '*' : 'Краткое описание публикации *'}
                  inputProps={{
                    maxLength: props.isOfferFilter ? 1600 : 128,
                  }}
                  size="small"
                  multiline
                />
              </Grid>
            )}
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Категория публикации*
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
              Обложка
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
                  md={5}
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

          <Grid
            container
            direction="row"
            className={styles.inputContainerGap}
            style={{ display: props.isProjectPage ? 'none' : '' }}
          >
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Прикрепите курс (обязательно)
            </Grid>
            <Grid container xs>
              <Grid container md={7} xs={12}>
                <AutoCompleteSearchFieldForProject
                  projectId="100500"
                  value={projectIdValue}
                  setValue={setProjectIdValue}
                />
              </Grid>
            </Grid>
          </Grid>

          {props.isOfferFilter ? null : (
            <Grid container direction="row" className={styles.inputContainerGap} style={{ marginTop: 30 }}>
              <Grid container xs={12} alignItems="center" className={styles.modalHeaderText}>
                Полное описание добавляется отдельно после создания. Вы сможете прикрепить все необходимые медиа-файлы.
              </Grid>
            </Grid>
          )}
          {isTabletOrMobile ? (
            <Grid container direction="column" className={styles.modalMobileButtonContainer}>
              <Button onClick={onClickHandler} text="Создать" className={styles.modalButton} />
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
                  <Button value="Submit" onClick={onClickHandler} text="Создать" className={styles.modalButton} />
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

export default CreatePostModal;
