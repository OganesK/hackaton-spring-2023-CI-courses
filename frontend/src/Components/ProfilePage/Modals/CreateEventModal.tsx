/* eslint-disable @typescript-eslint/ban-ts-comment*/

import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { Grid, OutlinedInput, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

//@ts-ignore
import DateTimePicker from 'react-datetime-picker';
import { CreateEventMutation, GetUrlToUploadEventPoster, createTest } from '../graphql/mutations';
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
  const [questionsCount, setQuestionsCount] = useState(10)

  const createTestHandler = createTest();

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const createEventHandler = CreateEventMutation();

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setCatValue(event.target.value);
  };

  const onClickHandler: () => Promise<void> = async () => {
    if (
      nameValue &&
      bodyValue
    ) {
      setOpenNoneClick(true);

      const dataJ = await createTestHandler({
        name: nameValue
      })

      console.log(dataJ)

      const testParams = {
        n: questionsCount,
        text: bodyValue
      }

      const data = await axios.post(`https://nikko-develop.space/neuro/questions?n=${questionsCount}&text=${bodyValue}`, {})
      data.data.questions.map(async (que)=> {
        const data = {
          question: que.question,
          rightAnswer: String(que.answer),
          answers: {
            set: que.options
          },
          test:{
            connect: {
              id: dataJ.data.createOneTest.id
            }
          }
        }
        

        await getUrlToUploadEventPosterHandler(data)
      })

      // data: {
      //   question: "Лучший язык программирования?",
      //   rightAnswer: "TypeScript",
      //   answers: {
      //     set: [
      //       "Фреймворк для создания серверов",
      //       "Фреймворк для создания клиентских приложений",
      //       "Фреймворк для создания баз данных",
      //       "Фреймворк для разработки игр"
      //     ]
      //   },
      //   test: {
      //     connect: {
      //       id: 1
      //     }
      //   }
      // }

      // const eventId = await createEventHandler(newEventData);
      // if (posterValue.size !== 0) {
      //   const PosterData = {
      //     entityType: 'eventPoster',
      //     entityId: eventId?.data?.createOneEvent?.id,
      //     fileType: posterValue.type,
      //   };~[]
      //   const uploadUrl = (await getUrlToUploadEventPosterHandler(PosterData)).data;
      //   await fetch(uploadUrl!.createMedia?.signedURL, {
      //     method: 'PUT', // *GET, POST, PUT, DELETE, etc.
      //     credentials: 'include', // include, *same-origin, omit
      //     headers: {
      //       'Content-Type': posterValue.type,
      //     },
      //     //@ts-ignore
      //     body: posterValue, // body data type must match "Content-Type" header
      //   });
      // }
      // props.handleOpenClose();
      // await props.refetch();

      // setNameValue('');
      // setDescriptionValue('');
      // setPosterValue({
      //   name: '',~[]
      //   type: '',
      //   size: 0,
      // });
      // setBodyValue('');
      // setDateValue(new Date());
      // setOrganizerValue('');
      // setAddressValue('');
      // setThemeValue('');
      // setEventFormatValue('');
      // setImgModal(imgModalDefault);
      // setCatValue('business');

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
            Создание 
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
                placeholder={isTabletOrMobile ? '*' : 'Заголовок теста *'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setNameValue(e.target.value)}
                inputProps={{
                  maxLength: 96,
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
              Описание
            </Grid>
            <Grid item xs>
              <OutlinedInput
                fullWidth
                defaultValue={bodyValue}
                value={bodyValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setBodyValue(e.target.value)}
                placeholder={isTabletOrMobile ? '*' : 'Основной тематический текст теста *'}
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
            <Grid
              container
              md={3}
              xs={12}
              style={{ paddingTop: isTabletOrMobile ? 0 : 10 }}
              className={styles.modalHeaderText}
            >
              Количество вопросов
            </Grid>
            <Grid item xs>
              <OutlinedInput
                fullWidth
                defaultValue={questionsCount}
                value={questionsCount}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setQuestionsCount(Number(e.target.value))}
                placeholder={isTabletOrMobile ? '*' : 'Количество вопросов *'}
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
