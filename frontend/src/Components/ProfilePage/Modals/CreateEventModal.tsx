/* eslint-disable @typescript-eslint/ban-ts-comment*/

import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Grid, OutlinedInput, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

//@ts-ignore
import DateTimePicker from 'react-datetime-picker';
import { CreateEventMutation, GetUrlToUploadEventPoster } from '../graphql/mutations';
import Button from '../../UI/Buttons/OutlinedButton/Button';
import NoneClick from '../../UI/NoneClickableField/NoneClick';
import SnackbarOnChange from '../../UI/Snackbar/Snackbar';

import imgModalDefault from '../../../assets/img/imgModal.svg';
import useStyles from '../../UI/Styles/TS/Components/createModalStyles/index';
import { ModalImage, ModalImageContainer } from '../../UI/Styles/TS/Style';
import '../../UI/Styles/CSS/Components/style.css';

import { EventCreateModalProps } from './typings';

import { categoriesArray } from '../../../helpers/constants/categories';
import { useTranslate } from '../../../helpers/hooks/useTranslateCategories';

const CreateEventModal: (props: EventCreateModalProps) => JSX.Element = (props: EventCreateModalProps) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });
  const getUrlToUploadEventPosterHandler = GetUrlToUploadEventPoster();
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
  const [bodyValue, setBodyValue] = useState('');
  const [dateValue, setDateValue] = useState(new Date());
  const [catValue, setCatValue] = useState('business');
  const [organizerValue, setOrganizerValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [themeValue, setThemeValue] = useState('');
  const [eventFormatValue, setEventFormatValue] = useState('');
  const [imgModal, setImgModal] = useState(imgModalDefault);

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const createEventHandler = CreateEventMutation();

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCatValue(event.target.value);
  };

  const onClickHandler: () => Promise<void> = async () => {
    if (
      nameValue &&
      catValue &&
      bodyValue &&
      descriptionValue &&
      dateValue &&
      organizerValue &&
      addressValue &&
      themeValue
    ) {
      setOpenNoneClick(true);
      const newEventData = {
        name: nameValue,
        category: catValue,
        description: bodyValue,
        shortDescription: descriptionValue,
        date: dateValue,
        organizer: organizerValue,
        address: addressValue,
        theme: themeValue,
        ...(eventFormatValue && { format: eventFormatValue }),
      };

      const eventId = await createEventHandler(newEventData);
      if (posterValue.size !== 0) {
        const PosterData = {
          entityType: 'eventPoster',
          entityId: eventId?.data?.createOneEvent?.id,
          fileType: posterValue.type,
        };
        const uploadUrl = (await getUrlToUploadEventPosterHandler(PosterData)).data;
        await fetch(uploadUrl!.createMedia?.signedURL, {
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
      await props.refetch();

      setNameValue('');
      setDescriptionValue('');
      setPosterValue({
        name: '',
        type: '',
        size: 0,
      });
      setBodyValue('');
      setDateValue(new Date());
      setOrganizerValue('');
      setAddressValue('');
      setThemeValue('');
      setEventFormatValue('');
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

  const styles = useStyles();

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
            Создание Мероприятия
          </Grid>
          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Заголовок
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={nameValue}
                value={nameValue}
                placeholder={isTabletOrMobile ? '*' : 'Заголовок мероприятия *'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setNameValue(e.target.value)}
                inputProps={{
                  maxLength: 96,
                }}
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Краткое описание
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={descriptionValue}
                value={descriptionValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescriptionValue(e.target.value)}
                placeholder={isTabletOrMobile ? '*' : 'Краткое описание мероприятия *'}
                inputProps={{
                  maxLength: 128,
                }}
                required
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Дата
            </Grid>
            <Grid container md={5} xs={12}>
              <DateTimePicker onChange={setDateValue} value={dateValue} className={styles.dateTime} />
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Категория*
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
              {isTabletOrMobile ? null : <Grid>Выберете изображение для обложки мероприятия</Grid>}
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
                  <br />
                  930x385px
                </Grid>
              </Grid>
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
              Описание
            </Grid>
            <Grid item xs>
              <OutlinedInput
                fullWidth
                defaultValue={bodyValue}
                value={bodyValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setBodyValue(e.target.value)}
                placeholder={isTabletOrMobile ? '*' : 'Описание мероприятия *'}
                multiline
                maxRows={7}
                color="primary"
                inputProps={{
                  maxLength: 8128,
                  overflow: 'auto',
                }}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Организатор
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={organizerValue}
                value={organizerValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setOrganizerValue(e.target.value)}
                placeholder={isTabletOrMobile ? '*' : 'Организатор мероприятия *'}
                inputProps={{
                  maxLength: 56,
                }}
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Тематика
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={themeValue}
                value={themeValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setThemeValue(e.target.value)}
                placeholder={isTabletOrMobile ? '*' : 'Тематика мероприятия *'}
                inputProps={{
                  maxLength: 62,
                }}
                size="small"
              />
            </Grid>
          </Grid>
          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Адрес проведения
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={addressValue}
                value={addressValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setAddressValue(e.target.value)}
                placeholder={isTabletOrMobile ? '*' : 'Адрес мероприятия *'}
                inputProps={{
                  maxLength: 96,
                }}
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Формат
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={eventFormatValue}
                value={eventFormatValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEventFormatValue(e.target.value)}
                placeholder={isTabletOrMobile ? '' : 'Формат мероприятия'}
                inputProps={{
                  maxLength: 36,
                }}
                size="small"
              />
            </Grid>
          </Grid>
          {isTabletOrMobile ? (
            <Grid container direction="column" style={{ marginTop: 30, gap: 20 }}>
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
                style={{ marginTop: 20 }}
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
    </div>
  );
};

export default CreateEventModal;
