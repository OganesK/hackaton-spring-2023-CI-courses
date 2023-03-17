/* eslint-disable @typescript-eslint/ban-ts-comment*/

import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Grid, OutlinedInput, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import Button from '../../UI/Buttons/OutlinedButton/Button';
import NoneClick from '../../UI/NoneClickableField/NoneClick';
import SnackbarOnChange from '../../UI/Snackbar/Snackbar';
import useStyles from '../../UI/Styles/TS/Components/createModalStyles/index';
import { ModalImage, ModalImageContainer } from '../../UI/Styles/TS/Style';

import imgModalDefault from '../../../assets/img/imgModal.svg';

import { CreateCompanyMutation, GetUrlToUploadMedia } from '../graphql/mutations';
import { CompanyCreateModalProps } from './typings';
import { categoriesArray } from '../../../helpers/constants/categories';
import { useTranslate } from '../../../helpers/hooks/useTranslateCategories';
const CreateCompanyModal: (props: CompanyCreateModalProps) => JSX.Element = (props: CompanyCreateModalProps) => {
  const UrlToUploadPosterHandler = GetUrlToUploadMedia();

  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [shortDescriptionValue, setShortDescriptionValue] = useState('');
  const [activityTypeValue, setActivityTypeValue] = useState('business');
  const [innValue, setInnValue] = useState('');
  const [mainRegionValue, setMainRegionValue] = useState('');
  const [mainContactValue, setMainContactValue] = useState('');
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

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const createCompanyHandler = CreateCompanyMutation();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });
  const styles = useStyles();

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setActivityTypeValue(event.target.value);
  };

  const onClickHandler: () => Promise<void> = async () => {
    if (
      nameValue &&
      descriptionValue &&
      shortDescriptionValue &&
      activityTypeValue &&
      mainRegionValue &&
      mainContactValue
    ) {
      setOpenNoneClick(true);
      const newCompanyData = {
        name: nameValue,
        description: descriptionValue,
        shortDescription: shortDescriptionValue,
        activityKind: activityTypeValue,
        mainRegion: mainRegionValue,
        mainContact: mainContactValue,
        ...(innValue && { inn: innValue }),
      };
      const companyId = await createCompanyHandler(newCompanyData);
      if (posterValue.size !== 0) {
        const PosterData = {
          entityType: 'companyAvatar',
          entityId: companyId?.data?.createCompany?.id,
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
      window.location.reload();
      // await props.refetch();

      // setNameValue('');
      // setDescriptionValue('');
      // setShortDescriptionValue('');
      // setPosterValue({
      //   name: '',
      //   type: '',
      //   size: 0,
      // });
      // setImgModal(imgModalDefault);
      // setActivityTypeValue('business');

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
    <Modal
      open={props.open}
      onClose={props.handleOpenClose}
      center
      styles={{ modal: { width: isTabletOrMobile ? '' : 800 } }}
    >
      <Grid container direction="column" className={styles.modalContainer}>
        {openNoneClick ? <NoneClick /> : null}
        <Grid item className={styles.modalHeader}>
          Создание курса
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
              placeholder={isTabletOrMobile ? '*' : 'Название компании *'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setNameValue(e.target.value)}
              inputProps={{
                maxLength: 128,
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Краткое описание
          </Grid>
          <Grid item xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={shortDescriptionValue}
              value={shortDescriptionValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setShortDescriptionValue(e.target.value)}
              placeholder={isTabletOrMobile ? '*' : 'Краткое описание компании *'}
              inputProps={{
                maxLength: 78,
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
            Описание
          </Grid>
          <Grid item xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={descriptionValue}
              value={descriptionValue}
              multiline
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescriptionValue(e.target.value)}
              placeholder={isTabletOrMobile ? '*' : 'Описание компании *'}
              inputProps={{
                maxLength: 2048,
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            ИНН
          </Grid>
          <Grid item xs>
            <OutlinedInput
              type="number"
              fullWidth={true}
              defaultValue={innValue}
              value={innValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setInnValue(e.target.value)}
              placeholder={isTabletOrMobile ? '' : 'ИНН компании'}
              inputProps={{
                maxLength: 20,
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Регион
          </Grid>
          <Grid item xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={mainRegionValue}
              value={mainRegionValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setMainRegionValue(e.target.value)}
              placeholder={isTabletOrMobile ? '*' : 'Регион компании *'}
              inputProps={{
                maxLength: 128,
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Контактная информация
          </Grid>
          <Grid item xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={mainContactValue}
              value={mainContactValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setMainContactValue(e.target.value)}
              placeholder={isTabletOrMobile ? '*' : 'Информация для связи (соц.сеть, tg, телефон) *'}
              inputProps={{
                maxLength: 512,
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Категория компании*
          </Grid>
          <Grid container md={5} xs={12}>
            <Select value={activityTypeValue} onChange={handleChangeCategory} fullWidth size="small">
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
            {isTabletOrMobile ? null : <Grid>Выберете изображение для обложки вашей компании</Grid>}
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
                <Button onClick={onClickHandler} text="Создать" className={styles.modalButton} />
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
  );
};

export default CreateCompanyModal;
