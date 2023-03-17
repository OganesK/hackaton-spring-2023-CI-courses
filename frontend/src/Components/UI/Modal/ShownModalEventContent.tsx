/* eslint-disable @typescript-eslint/ban-ts-comment*/

import React, { useState, useEffect } from 'react';
import { HttpLink, useMutation, useQuery } from '@apollo/client';

import {
  Backdrop,
  Box,
  Fade,
  Grid,
  OutlinedInput,
  Modal,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// @ts-ignore
import { ReactFlvPlayer } from 'react-flv-player';
import Countdown from 'react-countdown';
import { MdClose } from 'react-icons/md';

import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
// @ts-ignore
import a11yEmoji from '@fec/remark-a11y-emoji';
import styled from 'styled-components';

import ClipboardJS from 'clipboard';

import circleStream from '../../../assets/icons/circleStream.svg';
import stopStream from '../../../assets/icons/stopStream.svg';
import startStream from '../../../assets/icons/startStream.svg';
import copy from '../../../assets/icons/copy.svg';
import refresh from '../../../assets/icons/refresh.svg';
import defaultStreamImg from '../../../assets/img/defaultStreamImg.webp';
import style from '../../../Pages/SingleProjectPage/markdown-styles.module.css';
import { useWindowSize } from '../../../rules/index';

import Button from '../../UI/Buttons/OutlinedButton/Button';
import NoneClick from '../../UI/NoneClickableField/NoneClick';
import SnackbarOnChange from '../../UI/Snackbar/Snackbar';

import StreamChat from './StreamChat/StreamChat';

import { STREAM_URL } from '../../../config';

import useStyles from './style';
import {
  REGISTER_FOR_EVENT_MUTATION,
  CreateStreamMutation,
  UpdateStreamMutation,
  UpdateStreamActivityMutation,
} from './graphql/mutation';
import { ShownModalEventContentProps } from './typings';
import { GET_EVENTS_QUERY } from '../../../Queries';

new ClipboardJS('.button');

export default function ShownModalEventContent(props: ShownModalEventContentProps): JSX.Element {
  const classes = useStyles();
  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 2;

  const { data, loading, refetch } = useQuery<{ event: ShownModalEventContentProps }>(GET_EVENTS_QUERY);

  const [registerForEventHandler] = useMutation(REGISTER_FOR_EVENT_MUTATION);
  const createStreamHandler = CreateStreamMutation();
  const updateStreamHandler = UpdateStreamMutation();
  const changeStreamActivityHandler = UpdateStreamActivityMutation();

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const [openSnackSuccess, setOpenSnackSuccess] = useState(false);

  const [edit, setEdit] = useState(false);
  const [registerOnEvent, setRegisterOnEvent] = useState(false);
  const [startOfEvent, setStartOfEvent] = useState(false);
  const [articleValue, setArticleValue] = useState(props.article);
  const [addressValue, setAddressValue] = useState(props.eventAddress);

  const [goValue, setGoValue] = useState('yes');
  const [nameValue, setNameValue] = useState(props.user ? props.user.firstname : '');
  const [surnameValue, setSurnameValue] = useState(props.user ? props.user.lastname : '');
  const [emailValue, setEmailValue] = useState(props.user ? props.user.email : '');
  const [streamKeyValue, setStreamKeyValue] = useState(props.stream ? props.stream.streamKey : '');
  const [streamActive, setStreamActive] = useState(props.stream && props.stream.active ? true : false);

  const [isStream, setIsStream] = useState(props.stream ? true : false);

  const formattedDateLetters = new Date(props.date)
    .toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toLocaleString();

  const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    position: absolute;
    right: 0;
    width: clamp(1.25rem, 0.2rem + 4.6667vw, 3rem);
    height: clamp(1.25rem, 0.2rem + 4.6667vw, 3rem);
    padding: 0;
    z-index: 10;
    color: #fff;
    :hover {
      transition: all 0.5s ease;
      color: #ff5631;
    }
  `;

  const onClickHandler: () => void = () => {
    setRegisterOnEvent(!registerOnEvent);
  };

  const onClickStartStream: () => void = () => {
    setStartOfEvent(!startOfEvent);
  };

  const onClickOpenStartStreamForm: () => void = () => {
    setStartOfEvent(true);
  };

  const onClickOpenRegisterForm: () => void = () => {
    setRegisterOnEvent(true);
  };

  const handleChangeGoValue = (event: SelectChangeEvent) => {
    setGoValue(event.target.value);
  };

  const onClickSetActive: () => Promise<void> = async () => {
    const newStreamActivityData = {
      streamId: props.stream?.id,
    };
    await changeStreamActivityHandler(newStreamActivityData);
    await props.refetch();
  };

  const onClickCreateStreamKey: (e: React.MouseEvent) => Promise<void> = async (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenNoneClick(true);
    const newStreamData = {
      eventId: props.id,
    };
    const postId = await createStreamHandler(newStreamData);
    const generatedStreamKey = postId?.data?.createStream?.streamKey;
    setStreamKeyValue(generatedStreamKey!);
    await props.refetch();
    setOpenNoneClick(false);
  };

  const onClickUpdateStreamKey: (e: React.MouseEvent) => Promise<void> = async (e: React.MouseEvent) => {
    e.preventDefault();
    setOpenNoneClick(true);
    const newStreamData = {
      eventId: props.id,
    };
    const postId = await updateStreamHandler(newStreamData);
    const generatedStreamKey = postId?.data?.updateStream?.streamKey;
    setStreamKeyValue(generatedStreamKey!);
    await props.refetch();
    setOpenNoneClick(false);
  };

  const onClickRegistrationHandler: () => Promise<void> = async () => {
    if (nameValue && surnameValue && emailValue && goValue) {
      const newRegisterData = {
        eventId: props.id,
        name: nameValue,
        surname: surnameValue,
        email: emailValue,
        verdict: goValue,
      };
      await registerForEventHandler({
        variables: {
          data: newRegisterData,
        },
      })
        .then(() => {
          onClickHandler();
          setOpenSnackSuccess(true);
          setTimeout(() => setOpenSnackSuccess(false), 4000);
        })
        .catch(err => {
          console.error(err);
        });
      // await props.refetch();
    } else {
      setOpenSnack(true);
      setTimeout(() => setOpenSnack(false), 4000);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (props.stream && isStream === false) {
        setIsStream(!isStream);
      }
    }
  }, [loading]);

  const formattedDate = Date.now() + new Date(props.date).valueOf() - Date.now().valueOf();
  const difDates = Date.now().valueOf() - new Date(props.date).valueOf() > 86443175;

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
          <Grid
            container
            direction="column"
            alignItems="center"
            style={{ gap: width < 961 ? 20 : 100, margin: 'auto', paddingBottom: 60 }}
            xs={12}
          >
            {openNoneClick ? <NoneClick /> : null}

            <Grid
              container
              xs={12}
              justifyContent="center"
              style={{
                backgroundImage: `url(${props.img})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                minHeight: firstDefaultBlockHeight,
              }}
            >
              <Grid
                container
                justifyContent="center"
                xs={12}
                style={{ background: 'rgba(0,0,0,0.2)', padding: width < 961 ? '40px 0' : '100px 0' }}
              >
                <Grid
                  container
                  xs={width < 961 ? 11 : 9}
                  direction="row"
                  alignItems="flex-start"
                  style={{ position: 'relative' }}
                >
                  <Grid
                    container
                    xs={8}
                    direction="row"
                    alignItems="flex-start"
                    justifyContent={width < 961 ? 'space-between' : 'flex-start'}
                    style={{ gap: 50 }}
                  >
                    <Grid
                      container
                      direction="column"
                      style={{ gap: 12, paddingBottom: 40 }}
                      className={width < 961 ? classes.eventHeaderInfoTitle : classes.eventHeaderDate}
                    >
                      {width < 961 ? (
                        <>{props.eventTheme}</>
                      ) : (
                        <>
                          <Grid>{formattedDateLetters.slice(0, -8)}</Grid>
                          <Grid>{props.time}</Grid>
                        </>
                      )}
                    </Grid>
                    {width < 961 ? (
                      <Grid container style={{ gap: 30 }}>
                        <Grid container className={classes.eventHeader}>
                          {props.header}
                        </Grid>
                        <Grid container className={classes.eventHeaderInfoTitle}>
                          {props.eventFormat ? props.eventFormat : null}
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid container style={{ gap: 30 }}>
                        <Grid container className={classes.eventHeaderInfoTitle}>
                          {props.eventTheme}
                        </Grid>
                        <Grid container className={classes.eventHeader} style={{ textTransform: 'uppercase' }}>
                          {props.header}
                        </Grid>
                      </Grid>
                    )}
                    {width < 961 ? null : (
                      <Grid item>
                        {props.isOwner ? (
                          <a href="#start">
                            <Button
                              onClick={onClickOpenStartStreamForm}
                              text="Настройки трансляции"
                              isOrange={true}
                              isNoneBorder={true}
                              className={classes.eventRegButtonOwner}
                            />
                          </a>
                        ) : (
                          <>
                            {new Date() < new Date(props.date) ? (
                              <a href="#register">
                                <Button
                                  onClick={onClickOpenRegisterForm}
                                  text="Хочу пойти"
                                  isWhite={true}
                                  isNoneBorder={true}
                                  className={classes.eventRegButtonUser}
                                />
                              </a>
                            ) : null}
                          </>
                        )}
                      </Grid>
                    )}
                  </Grid>
                  <CloseModalButton aria-label="Close modal" onClick={props.handleOpenClose} />
                </Grid>
              </Grid>
            </Grid>
            <Grid container xs={width < 961 ? 11 : 9} justifyContent="center">
              <Grid container justifyContent="space-between" style={{ gap: width < 961 ? 80 : 0 }}>
                {width < 961 ? (
                  <Grid container direction="column" xs={12} style={{ gap: 40 }}>
                    <Grid container>
                      {props.isOwner ? (
                        <a href="#start" style={{ width: '100%' }}>
                          <Button
                            onClick={onClickOpenStartStreamForm}
                            text="Настройки трансляции"
                            className={classes.eventRegButtonOwner}
                          />
                        </a>
                      ) : (
                        <>
                          {new Date() < new Date(props.date) ? (
                            <a href="#register" style={{ width: '100%' }}>
                              <Button
                                onClick={onClickOpenRegisterForm}
                                text="Хочу пойти"
                                className={classes.eventRegButtonUser}
                              />
                            </a>
                          ) : null}
                        </>
                      )}
                    </Grid>
                    <Grid container direction="row" style={{ gap: 10 }}>
                      <Grid container xs={12} className={classes.eventInfoTitle}>
                        Когда
                      </Grid>
                      <Grid container xs={12} className={classes.eventInfoText}>
                        {formattedDateLetters.slice(0, -8)}, {props.time}
                      </Grid>
                    </Grid>
                    <Grid container direction="row" style={{ gap: 10 }}>
                      <Grid container xs={12} className={classes.eventInfoTitle}>
                        Тема
                      </Grid>
                      <Grid container xs={12} className={classes.eventInfoText}>
                        {props.eventTheme}
                      </Grid>
                    </Grid>

                    {props.eventFormat ? (
                      <Grid container direction="row" style={{ gap: 10 }}>
                        <Grid container xs={12} className={classes.eventInfoTitle}>
                          Формат
                        </Grid>

                        <Grid container xs={12} className={classes.eventInfoText}>
                          {props.eventFormat}
                        </Grid>
                      </Grid>
                    ) : null}
                    <Grid container direction="row" style={{ gap: 10 }}>
                      <Grid container xs={12} className={classes.eventInfoTitle}>
                        Организатор
                      </Grid>
                      <Grid container xs={12} className={classes.eventInfoText}>
                        {props.eventOrganizer}
                      </Grid>
                    </Grid>
                  </Grid>
                ) : null}
                <Grid
                  container
                  className={classes.fullModalArticle}
                  direction="row"
                  alignItems="flex-start"
                  xs={width < 961 ? 12 : 7}
                  style={{ gap: width < 961 ? 80 : 60 }}
                >
                  <Grid container style={{ gap: width < 961 ? 30 : 20 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item className={classes.modalArticleHeader}>
                        Прямая трансляция
                      </Grid>
                      {props.stream && streamActive ? (
                        <Grid item>
                          <Grid container alignItems="center" style={{ gap: 10 }}>
                            <img src={circleStream} />
                            <Grid className={classes.organizerText}>Сейчас идет</Grid>
                          </Grid>
                        </Grid>
                      ) : null}
                    </Grid>
                    {props.stream && streamActive ? (
                      <Grid container>
                        <Grid item xs={12}>
                          <ReactFlvPlayer
                            url={`${STREAM_URL}${props.stream.streamKey}.flv`}
                            width="100%"
                            height="100%"
                            isMuted={true}
                            style={{
                              border: '2px solid',
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Accordion sx={{ marginTop: -1 }}>
                            <AccordionSummary
                              expandIcon={
                                <ExpandMoreIcon
                                  sx={{
                                    color: '#fff',
                                  }}
                                />
                              }
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                              sx={{
                                backgroundColor: '#252525',
                              }}
                            >
                              <Grid className={classes.liveChatText}>Live-чат</Grid>
                            </AccordionSummary>
                            <AccordionDetails
                              sx={{
                                padding: 0,
                              }}
                            >
                              <Grid container>
                                <StreamChat streamId={props.stream.id} />
                              </Grid>
                            </AccordionDetails>
                          </Accordion>
                        </Grid>
                      </Grid>
                    ) : (
                      <Grid
                        container
                        style={{
                          backgroundImage: `url(${defaultStreamImg})`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          height: width > 371 ? 200 : 200 - (370 - width),
                          width: width > 371 ? 360 : 360 - (370 - width),
                        }}
                      >
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', gap: 10 }}
                        >
                          {difDates ? (
                            <div className={classes.timerText}>Мероприятие завершилось</div>
                          ) : (
                            <>
                              <Grid className={classes.timerText}>Начнется через:</Grid>
                              <Countdown className={classes.date} date={formattedDate} />
                            </>
                          )}
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                  <Grid container style={{ gap: 20 }}>
                    <Grid container className={classes.modalArticleHeader}>
                      О мероприятии
                    </Grid>
                    {edit && props.isOwner ? (
                      <OutlinedInput
                        fullWidth={true}
                        value={articleValue}
                        onChange={e => setArticleValue(e.target.value)}
                        placeholder="Описание"
                        color="primary"
                        multiline
                        inputProps={{
                          maxLength: 8128,
                        }}
                        size="small"
                      />
                    ) : (
                      <Grid container className={classes.markdownText}>
                        <ReactMarkdown key={props.article} plugins={[gfm, a11yEmoji]} className={style.reactMarkDown}>
                          {props.article}
                        </ReactMarkdown>
                      </Grid>
                    )}
                  </Grid>
                  <Grid container>
                    {props.eventAddress ? (
                      <Grid className={classes.fullModalArticle} container direction="row" style={{ gap: 20 }}>
                        <Grid container className={classes.modalArticleHeader}>
                          Место проведения
                        </Grid>
                        {edit && props.isOwner ? (
                          <OutlinedInput
                            fullWidth={true}
                            value={addressValue}
                            onChange={e => setAddressValue(e.target.value)}
                            placeholder="Адрес"
                            color="primary"
                            inputProps={{
                              maxLength: 96,
                            }}
                            size="small"
                          />
                        ) : (
                          <Grid container className={classes.markdownText}>
                            <ReactMarkdown
                              key={props.eventAddress}
                              plugins={[gfm, a11yEmoji]}
                              className={style.reactMarkDown}
                            >
                              {props.eventAddress}
                            </ReactMarkdown>
                          </Grid>
                        )}
                      </Grid>
                    ) : null}
                  </Grid>
                  {props.isOwner ? (
                    <>
                      {startOfEvent ? (
                        <Grid container id="start" style={{ gap: 20 }}>
                          <Grid container className={classes.modalArticleHeader}>
                            Информация о трансляции
                          </Grid>
                          <Grid container style={{ gap: 20 }}>
                            <Grid container className={classes.eventInfoTitle}>
                              Ключ трансляции
                            </Grid>
                            {streamKeyValue ? (
                              <>
                                <Grid container xs={width < 961 ? true : 7}>
                                  <OutlinedInput
                                    id="streamKey"
                                    fullWidth={true}
                                    defaultValue={streamKeyValue}
                                    value={streamKeyValue}
                                    placeholder="Здесь будет ключ трансляции"
                                    inputProps={{
                                      maxLength: 64,
                                    }}
                                    size="small"
                                  />
                                </Grid>
                                <Grid item style={{ margin: width < 961 ? 'auto' : 'auto 0' }}>
                                  <Grid container xs style={{ gap: 20 }}>
                                    <Tooltip title="Перегенерировать ключ" arrow placement="top">
                                      <img
                                        src={refresh}
                                        style={{ cursor: 'pointer', maxWidth: width < 961 ? 23 : 'inherit' }}
                                        onClick={(e: React.MouseEvent) => onClickUpdateStreamKey(e)}
                                      />
                                    </Tooltip>
                                    <Tooltip title="Скопировать" arrow placement="top">
                                      <img
                                        src={copy}
                                        style={{ cursor: 'pointer', maxWidth: width < 961 ? 20 : 'inherit' }}
                                        className="button"
                                        data-clipboard-action="copy"
                                        data-clipboard-target="#streamKey"
                                      />
                                    </Tooltip>
                                  </Grid>
                                </Grid>
                                <Grid container direction="column" style={{ gap: 20 }}>
                                  {props.stream?.active ? (
                                    <Grid item>
                                      <Button
                                        onClick={onClickSetActive}
                                        isOrange
                                        isOrangeBorder
                                        isHoverBorder
                                        isEdit
                                        isTextTransformNone
                                        isStartIcon
                                        isHoverTextWhite
                                        icon={stopStream}
                                        text="Остановить трансляцию"
                                        className={classes.eventStreamButtonOwner}
                                      />
                                    </Grid>
                                  ) : (
                                    <Grid item>
                                      <Button
                                        onClick={onClickSetActive}
                                        isOrange
                                        isOrangeBorder
                                        isHoverBorder
                                        isEdit
                                        isTextTransformNone
                                        isStartIcon
                                        isHoverTextWhite
                                        icon={startStream}
                                        text="Запустить трансляцию"
                                        className={classes.eventStreamButtonOwner}
                                      />
                                    </Grid>
                                  )}
                                </Grid>
                              </>
                            ) : (
                              <Grid container>
                                <Button
                                  isTextTransformNone={width < 961 ? false : true}
                                  isWhite={width < 961 ? true : false}
                                  onClickEvent={(e: React.MouseEvent) => onClickCreateStreamKey(e)}
                                  text={width < 961 ? 'Сгенерировать' : 'Сгенерировать ключ'}
                                  className={classes.eventStreamGenerateButtonOwner}
                                />
                              </Grid>
                            )}
                          </Grid>
                          <Grid container xs style={{ marginTop: 40 }}>
                            <Button
                              onClick={onClickStartStream}
                              text="Свернуть настройки"
                              className={classes.eventRegButtonOwner}
                            />
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid container>
                          <Button
                            onClick={onClickStartStream}
                            text="Настройки трансляции"
                            className={classes.eventRegButtonOwner}
                          />
                        </Grid>
                      )}
                    </>
                  ) : (
                    <>
                      {registerOnEvent ? (
                        <Grid container id="register" style={{ gap: 20 }}>
                          <Grid container className={classes.modalArticleHeader}>
                            Хотите посетить мероприятие?
                          </Grid>
                          <Grid container xs={6} style={{ paddingRight: 15, gap: 15 }}>
                            <Grid container>
                              <Select
                                value={goValue}
                                onChange={handleChangeGoValue}
                                fullWidth
                                sx={{ zIndex: 1601 }}
                                size="small"
                              >
                                <MenuItem sx={{ zIndex: 1601 }} value={'yes'}>
                                  Пойду
                                </MenuItem>
                                <MenuItem sx={{ zIndex: 1601 }} value={'maybe'}>
                                  Возможно пойду
                                </MenuItem>
                              </Select>
                            </Grid>
                            {props.user ? null : (
                              <Grid container style={{ gap: 15 }}>
                                <Grid container>
                                  <OutlinedInput
                                    fullWidth={true}
                                    defaultValue={nameValue}
                                    value={nameValue}
                                    placeholder="Ваше имя"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                      setNameValue(e.target.value)
                                    }
                                    inputProps={{
                                      maxLength: 64,
                                    }}
                                    size="small"
                                  />
                                </Grid>
                                <Grid container>
                                  <OutlinedInput
                                    fullWidth={true}
                                    defaultValue={surnameValue}
                                    value={surnameValue}
                                    placeholder="Ваша фамилия"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                      setSurnameValue(e.target.value)
                                    }
                                    inputProps={{
                                      maxLength: 64,
                                    }}
                                    size="small"
                                  />
                                </Grid>
                                <Grid container>
                                  <OutlinedInput
                                    fullWidth={true}
                                    defaultValue={emailValue}
                                    value={emailValue}
                                    placeholder="Почта"
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
                                      setEmailValue(e.target.value)
                                    }
                                    inputProps={{
                                      maxLength: 96,
                                    }}
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            )}
                          </Grid>

                          <Grid container direction="row" style={{ gap: 30, marginTop: 20 }}>
                            <Grid container xs>
                              <Button
                                onClick={onClickRegistrationHandler}
                                text="Подтвердить"
                                className={classes.eventApproveButtonUser}
                              />
                            </Grid>
                            <Grid container xs>
                              <Button
                                onClick={onClickHandler}
                                isWhite={true}
                                text="Отменить"
                                className={classes.eventApproveButtonUser}
                              />
                            </Grid>
                            <SnackbarOnChange
                              openSnack={openSnack}
                              setOpenSnack={setOpenSnack}
                              isError
                              textInSnack="Проверьте обязательные поля (*) на заполненность"
                            />
                          </Grid>
                        </Grid>
                      ) : (
                        <Grid container>
                          {new Date() < new Date(props.date) ? (
                            <Button
                              onClick={onClickHandler}
                              text="Я хочу пойти!"
                              className={classes.eventRegButtonUser}
                            />
                          ) : (
                            <Button
                              onClick={() => console.log('мероприятие началось или прошло')}
                              text="Регистрация завершилась"
                              isDisable
                              className={classes.eventRegButtonUser}
                            />
                          )}
                          <SnackbarOnChange
                            openSnack={openSnackSuccess}
                            setOpenSnack={setOpenSnackSuccess}
                            textInSnack={
                              goValue === 'yes'
                                ? 'Теперь вы записаны на мероприятие!'
                                : 'Мы прибережем для вас местечко!'
                            }
                          />
                        </Grid>
                      )}
                    </>
                  )}
                </Grid>
                {width < 961 ? null : (
                  <Grid container direction="column" xs={4} style={{ gap: 15 }}>
                    <Grid container direction="row" style={{ gap: 5 }}>
                      <Grid container xs={6} className={classes.eventInfoTitle}>
                        Дата
                      </Grid>
                      <Grid container xs className={classes.eventInfoText}>
                        {formattedDateLetters}
                      </Grid>
                    </Grid>
                    <Grid container direction="row" style={{ gap: 5 }}>
                      <Grid container xs={6} className={classes.eventInfoTitle}>
                        Время
                      </Grid>
                      <Grid container xs className={classes.eventInfoText}>
                        {props.time}
                      </Grid>
                    </Grid>
                    <Grid container direction="row" style={{ gap: 5 }}>
                      <Grid container xs={6} className={classes.eventInfoTitle}>
                        Тема
                      </Grid>
                      <Grid container xs className={classes.eventInfoText}>
                        {props.eventTheme}
                      </Grid>
                    </Grid>

                    {props.eventFormat ? (
                      <Grid container direction="row" style={{ gap: 5 }}>
                        <Grid container xs={6} className={classes.eventInfoTitle}>
                          Формат
                        </Grid>

                        <Grid container xs className={classes.eventInfoText}>
                          {props.eventFormat}
                        </Grid>
                      </Grid>
                    ) : null}
                    <Grid container direction="row" style={{ gap: 5 }}>
                      <Grid container xs={6} className={classes.eventInfoTitle}>
                        Организатор
                      </Grid>
                      <Grid container xs className={classes.organizerText}>
                        {props.eventOrganizer}
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Modal>
  );
}
