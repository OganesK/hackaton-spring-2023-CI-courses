/* eslint-disable @typescript-eslint/ban-ts-comment*/
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, OutlinedInput, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { useQuery } from '@apollo/client';

import NoneClick from '../../../Components/UI/NoneClickableField/NoneClick';
import Button from '../../../Components/UI/Buttons/OutlinedButton/Button';
import SnackbarOnChange from '../../../Components/UI/Snackbar/Snackbar';
import useStyles from '../../../Components/UI/Styles/TS/Components/createModalStyles/index';
import { ModalImage, ModalImageContainer } from '../../../Components/UI/Styles/TS/Style';

import imgModalDefault from '../../../assets/img/imgModal.svg';

import { categoriesArray } from '../../../helpers/constants/categories';
import { useTranslate } from '../../../helpers/hooks/useTranslateCategories';

import { GET_COMPANY_QUERY } from './graphql/query';
import { CompanyTypes, CompanyEditModalProps } from './graphql/typings';
import { UpdateMyCompanyMutation, GetUrlToUploadCompanyAvatar } from './graphql/mutation';

const CompanyEditModal: (props: CompanyEditModalProps) => JSX.Element = (props: CompanyEditModalProps) => {
  const styles = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });

  const { data, loading, refetch } = useQuery<{ company: CompanyTypes }>(GET_COMPANY_QUERY, {
    variables: { companyId: Number(props.companyId) },
  });

  const updateCompanyHandler = UpdateMyCompanyMutation();
  const UrlToUploadAvatarHandler = GetUrlToUploadCompanyAvatar();

  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [shortDescriptionValue, setShortDescriptionValue] = useState('');
  const [innValue, setInnValue] = useState('');
  const [mainRegionValue, setMainRegionValue] = useState('');
  const [mainContactValue, setMainContactValue] = useState('');
  const [catValue, setCatValue] = useState('');

  const [avatarValue, setAvatarValue] = useState<{
    name: string;
    size: number;
    type: string;
  }>({
    name: '',
    type: '',
    size: 0,
  });
  const [imgModal, setImgModal] = useState(imgModalDefault);

  const [openSnack, setOpenSnack] = useState(false);
  const [openNoneClick, setOpenNoneClick] = useState(false);

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCatValue(event.target.value);
  };

  useEffect(() => {
    if (!loading && data) {
      setCatValue(data.company.activityKind);
      setNameValue(data.company.name);
      setShortDescriptionValue(data.company.shortDescription);
      setDescriptionValue(data.company.description);
      setInnValue(data.company.inn);
      setMainRegionValue(data.company.mainRegion);
      setMainContactValue(data.company.mainContact);
      setImgModal(data.company.avatar.link);
    }
  }, [loading]);

  const onClickHandler: () => Promise<void> = async () => {
    if (nameValue && shortDescriptionValue && descriptionValue && catValue && mainRegionValue && mainContactValue) {
      setOpenNoneClick(true);

      const newCompanyData = {
        name: nameValue,
        shortDescription: shortDescriptionValue,
        description: descriptionValue,
        activityKind: catValue,
        companyId: props.companyId,
        mainRegion: mainRegionValue,
        mainContact: mainContactValue,
        ...(innValue && { inn: innValue }),
      };
      await updateCompanyHandler(newCompanyData);
      if (avatarValue.size !== 0) {
        const AvatarData = {
          entityType: 'companyAvatar',
          entityId: props.companyId,
          fileType: avatarValue.type,
        };
        const uploadUrl = await UrlToUploadAvatarHandler(AvatarData);
        await fetch(uploadUrl.data!.createMedia?.signedURL, {
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          credentials: 'include', // include, *same-origin, omit
          headers: {
            'Content-Type': avatarValue.type,
          },
          //@ts-ignore
          body: avatarValue, // body data type must match "Content-Type" header
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
    setAvatarValue(fileUploaded);
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
            Редактирование компании
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
              Изменить краткое описание
            </Grid>
            <Grid container xs>
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
            <Grid container md={3} xs={12} className={styles.modalHeaderText}>
              Изменить описание
            </Grid>
            <Grid item xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={descriptionValue}
                value={descriptionValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescriptionValue(e.target.value)}
                placeholder={isTabletOrMobile ? '*' : 'Описание компании *'}
                inputProps={{
                  maxLength: 2048,
                }}
                size="small"
                multiline
              />
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Изменить ИНН
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
              Изменить регион
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
              Изменить контактную информацию
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
              Изменить категорию компании
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
              {isTabletOrMobile ? null : <Grid>Выберете изображение для обложки компании</Grid>}
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

export default CompanyEditModal;
