/* eslint-disable @typescript-eslint/ban-ts-comment*/
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, OutlinedInput } from '@mui/material';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { useQuery } from '@apollo/client';

import NoneClick from '../../UI/NoneClickableField/NoneClick';
import Button from '../../UI/Buttons/OutlinedButton/Button';
import SnackbarOnChange from '../../UI/Snackbar/Snackbar';
import useStyles from '../../UI/Styles/TS/Components/createModalStyles/index';
import { ModalImage, ModalImageContainer } from '../../UI/Styles/TS/Style';

import imgModalDefault from '../../../assets/img/imgModal.svg';

import { GET_PROFILE_QUERY } from './graphql/query';
import { ProfileTypes, ProfileEditModalProps } from './graphql/typings';
import { UpdateUserDataMutation, GetUrlToUploadProfileAvatar } from './graphql/mutation';

const ProfileEditModal: (props: ProfileEditModalProps) => JSX.Element = (props: ProfileEditModalProps) => {
  const styles = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });

  const { data, loading, refetch } = useQuery<{ user: ProfileTypes }>(GET_PROFILE_QUERY, {
    variables: { id: props.userId },
  });

  const updateProfileHandler = UpdateUserDataMutation();
  const UrlToUploadAvatarHandler = GetUrlToUploadProfileAvatar();

  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [bioValue, setBioValue] = useState('');
  const [shortDescriptionValue, setShortDescriptionValue] = useState('');
  const [cityValue, setCityValue] = useState('');

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

  useEffect(() => {
    if (!loading && data) {
      setFirstNameValue(data.user.firstname);
      setLastNameValue(data.user.lastname);
      setShortDescriptionValue(data.user.shortDescription);
      setBioValue(data.user.bio);
      setCityValue(data.user.city);
      setImgModal(data.user.avatar.link);
    }
  }, [loading]);

  const onClickHandler: () => Promise<void> = async () => {
    if (firstNameValue && lastNameValue) {
      setOpenNoneClick(true);

      const newProfileData = {
        firstname: firstNameValue,
        lastname: lastNameValue,
        shortDescription: shortDescriptionValue,
        bio: bioValue,
        city: cityValue,
        userId: props.userId,
      };
      await updateProfileHandler(newProfileData);
      if (avatarValue.size !== 0) {
        const AvatarData = {
          entityType: 'userAvatar',
          entityId: props.userId,
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
    <Modal
      open={props.open}
      onClose={props.handleOpenClose}
      center
      styles={{ modal: { width: isTabletOrMobile ? '' : 800 } }}
    >
      <Grid container direction="column" className={styles.modalContainer}>
        {openNoneClick ? <NoneClick /> : null}

        <Grid item className={styles.modalHeader}>
          Редактирование профиля
        </Grid>
        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать имя
          </Grid>
          <Grid container xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={firstNameValue}
              value={firstNameValue}
              placeholder={isTabletOrMobile ? '*' : 'Ваше имя *'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFirstNameValue(e.target.value)}
              inputProps={{
                maxLength: 128,
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать фамилию
          </Grid>
          <Grid container xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={lastNameValue}
              value={lastNameValue}
              placeholder={isTabletOrMobile ? '*' : 'Ваша фамилия *'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLastNameValue(e.target.value)}
              inputProps={{
                maxLength: 128,
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать специализацию
          </Grid>
          <Grid container xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={shortDescriptionValue}
              value={shortDescriptionValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setShortDescriptionValue(e.target.value)}
              placeholder={isTabletOrMobile ? '' : 'Ваша специализация'}
              inputProps={{
                maxLength: 128,
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} className={styles.modalHeaderText}>
            Редактировать биографию
          </Grid>
          <Grid item xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={bioValue}
              value={bioValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setBioValue(e.target.value)}
              placeholder={isTabletOrMobile ? '' : 'Ваша биография'}
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
            Редактировать город
          </Grid>
          <Grid container xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={cityValue}
              value={cityValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setCityValue(e.target.value)}
              placeholder={isTabletOrMobile ? '' : 'Город проживания'}
              inputProps={{
                maxLength: 128,
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} className={styles.modalHeaderText}>
            Изменить фотографию
          </Grid>
          <Grid container xs direction="column" style={{ gap: 15 }}>
            {isTabletOrMobile ? null : <Grid>Выберете фотографию</Grid>}
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
  );
};

export default ProfileEditModal;
