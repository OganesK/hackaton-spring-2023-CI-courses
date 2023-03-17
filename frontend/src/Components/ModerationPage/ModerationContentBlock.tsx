/* eslint-disable @typescript-eslint/restrict-plus-operands*/
/*eslint-disable  @typescript-eslint/restrict-template-expressions*/
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import CallMissedOutgoingIcon from '@mui/icons-material/CallMissedOutgoing';

import { Link } from 'react-router-dom';

import RejectDialog from './RejectDialog';

import { useWindowSize } from '../../rules/index';
import Line from '../UI/Line/Line';

import * as mutations from '../../Pages/ModerationPage/graphql/mutation';
import { ModerationContentTypes } from '../../Pages/ModerationPage/typings';

import ArticleModerationModal from './Modals/ArticleModerationModal';
import useStyles from './styles';

const ModerationContentBlock: (props: ModerationContentTypes) => JSX.Element = (props: ModerationContentTypes) => {
  const classes = useStyles();
  const history = useHistory();
  const [hover, setHover] = useState(false);

  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 2;
  const secondDefaultBlockHeight = width / 2.6;
  const thirdDefaultBlockHeight = width / 3;
  const fourthDefaultBlockHeight = width / 5.6;
  const fifthDefaultBlockHeight = width / 7;

  const formattedDate = new Date(props.createdAt!).toLocaleString().slice(0, -3);
  const formattedDateLetters = new Date(props.createdAt!)
    .toLocaleString('ru', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toLocaleString()
    .slice(0, -8);
  const timeToShow: string = formattedDate.slice(12, formattedDate.length);

  const [openModalArticleProject, setOpenModalArticleProject] = useState(false);

  const checkIsChanged = (value: string) => {
    if (value) {
      const regexResult = value.match(/^(.*?(\b----changed\b)[^$]*)$/g);
      return regexResult !== null ? true : false;
    }
    return false;
  };

  const handleOpenClose: () => void = () => {
    setOpenModalArticleProject(!openModalArticleProject);
  };

  // const verificateCompanyHandler = mutations.VerificateCompanyMutation();
  // const verificateProjectHandler = mutations.VerificateProjectMutation();
  // const verificateEventHandler = mutations.VerificateEventMutation();
  // const verificateSolutionHandler = mutations.VerificateSolutionMutation();
  // const verificateContactHandler = mutations.VerificateContactMutation();
  // const verificatePostHandler = mutations.VerificatePostMutation();

  const verificateAllHandler = mutations.VerificateMutation();

  const verificateUpdatedCompanyHandler = mutations.VerificateUpdatedCompanyMutation();
  const verificateUpdatedProjectHandler = mutations.VerificateUpdatedProjectMutation();
  const verificateUpdatedEventHandler = mutations.VerificateUpdatedEventMutation();
  const verificateUpdatedSolutionHandler = mutations.VerificateUpdatedSolutionMutation();
  const verificateUpdatedContactHandler = mutations.VerificateUpdatedContactMutation();
  const verificateUpdatedPostHandler = mutations.VerificateUpdatedPostMutation();

  const showButtonHandler = () => {
    switch (props.type) {
      case 'Проект':
        history.push(`/projects/project/${props.id}`);
        break;
      case 'Краудфандинг':
        history.push(`/projects/project/${props.id}`);
        break;
      case 'Компания':
        history.push(`company/${props.id}`);
        break;
      case 'Контакты':
        history.push(`company/${props.ownerCompanyId}`);
    }
  };

  const verificateButtonHandler: () => Promise<void> = async () => {
    const verificateData = {
      entityId: props.id,
      verdict: true,
      entityType:
        props.type === 'Публикация'
          ? 'post'
          : props.type === 'Проект'
          ? 'project'
          : props.type === 'Компания'
          ? 'company'
          : props.type === 'Мероприятие'
          ? 'event'
          : props.type === 'Краудфандинг'
          ? 'crowdFunding'
          : 'contact',
      rejectMessage: 'Approved',
    };

    switch (props.type) {
      case 'Публикация':
        props.isNew ? await verificateAllHandler(verificateData) : await verificateUpdatedPostHandler(verificateData);
        await props.postsRefetch();
        break;
      case 'Контакты':
        props.isNew
          ? await verificateAllHandler(verificateData)
          : await verificateUpdatedContactHandler(verificateData);
        await props.contactsRefetch();
        break;
      case 'Компания':
        props.isNew
          ? await verificateAllHandler(verificateData)
          : await verificateUpdatedCompanyHandler(verificateData);
        await props.companiesRefetch();
        break;
      case 'Проект':
        props.isNew
          ? await verificateAllHandler(verificateData)
          : await verificateUpdatedProjectHandler(verificateData);
        await props.projectRefetch();
        break;
      case 'Мероприятие':
        props.isNew ? await verificateAllHandler(verificateData) : await verificateUpdatedEventHandler(verificateData);
        await props.eventsRefetch();
        break;
      case 'Краудфандинг':
        props.isNew ? await verificateAllHandler(verificateData) : await verificateUpdatedEventHandler(verificateData);
        await props.crowdsRefetch();
        break;
    }
  };

  return (
    <>
      <Grid container direction="row" justifyContent="space-between" className={classes.containerModerationInfo}>
        <Grid container xl={4} lg={12} md={12} sm={12} xs={12}>
          <Grid
            className={classes.containerModerationImage}
            style={{
              backgroundImage: `url(${props.poster})`,
              height:
                width < 600
                  ? firstDefaultBlockHeight
                  : width < 900
                  ? secondDefaultBlockHeight
                  : width < 1280
                  ? thirdDefaultBlockHeight
                  : width < 1920
                  ? fourthDefaultBlockHeight
                  : fifthDefaultBlockHeight,
              filter: props.poster ? 'drop-shadow(6px 6px 10px #24B95C)' : 'none',
            }}
          />
        </Grid>
        <Grid container direction="column" justifyContent="space-between" xl lg={12} md={12} sm={12} xs={12}>
          <Grid className={classes.containerModerationDescriptionHeader}>
            <Link
              to={`${
                props.type === 'Проект' ? '/projects/project/' : props.type === 'Компания' ? '/company/' : '/home'
              } ${props.id}`}
              onMouseOver={(): void => setHover(true)}
              onMouseOut={(): void => setHover(false)}
              style={{
                transition: 'all 0.5s ease',
                textDecoration: hover ? 'underline' : 'none',
                color: props.title?.includes('----changed') ? '#24B95C' : 'inherit',
              }}
            >
              {props.title?.replace('----changed', '')}
            </Link>
            {props.isContact ? (
              <>
                {props.isContact && props.isContactPhones ? (
                  <Grid container className={classes.containerModerationCreationInfo} style={{ gap: 10 }}>
                    <Grid item>Телефоны:</Grid>
                    <Grid
                      item
                      style={{ color: props.isContactPhones?.includes('----changed') ? '#24B95C' : 'inherit' }}
                    >
                      {props.isContactPhones ? props.isContactPhones?.replace('----changed', '') : null}
                    </Grid>
                  </Grid>
                ) : null}
                {props.isContact && props.isContactAddresses ? (
                  <Grid container className={classes.containerModerationCreationInfo} style={{ gap: 10 }}>
                    <Grid item>Адреса:</Grid>
                    <Grid
                      item
                      style={{ color: props.isContactAddresses?.includes('----changed') ? '#24B95C' : 'inherit' }}
                    >
                      {props.isContactAddresses ? props.isContactAddresses?.replace('----changed', '') : null}
                    </Grid>
                  </Grid>
                ) : null}
                {props.isContact && props.isContactEmails ? (
                  <Grid container className={classes.containerModerationCreationInfo} style={{ gap: 10 }}>
                    <Grid item>Электронные адреса:</Grid>
                    <Grid
                      item
                      style={{ color: props.isContactEmails?.includes('----changed') ? '#24B95C' : 'inherit' }}
                    >
                      {props.isContactEmails ? props.isContactEmails?.replace('----changed', '') : null}
                    </Grid>
                  </Grid>
                ) : null}
              </>
            ) : (
              <>
                <Grid
                  className={classes.containerModerationDescriptionTitle}
                  style={{ color: props.shortDescription?.includes('----changed') ? '#24B95C' : 'inherit' }}
                >
                  {props.shortDescription && props.shortDescription?.replace('----changed', '')}
                </Grid>
                <Grid style={{ margin: '10px 0' }}>
                  {props.isNew ? (
                    <Grid className={classes.dateContainer}>
                      Создано:{' '}
                      {props.createdAt ? (
                        <>
                          {formattedDateLetters}&emsp;
                          {timeToShow}
                        </>
                      ) : null}
                    </Grid>
                  ) : (
                    <Grid className={classes.dateContainer}>
                      Изменено:{' '}
                      {props.createdAt ? String(new Date(props.createdAt)).split(' ').slice(0, 4).join(' ') : null}
                    </Grid>
                  )}
                  {props.isNew ? (
                    <Grid className={classes.containerModerationCreationInfo}>
                      Создатель: {props.isEvent ? props.user!.firstname + ' ' + props.user!.lastname : props.owner}
                    </Grid>
                  ) : (
                    <Grid className={classes.containerModerationCreationInfo}>Кем изменено: {props.owner}</Grid>
                  )}
                  <Grid className={classes.containerModerationCreationInfo}>
                    {props.isProject
                      ? 'Категория проекта: '
                      : props.isPost
                      ? 'Категория публикации: '
                      : props.isCompany
                      ? 'Категория компании: '
                      : props.isEvent
                      ? 'Категория мероприятия:'
                      : null}
                    {props.categoryOfObject}
                    {props.isPost ? (props.isPostOffer ? 'Объявление ' : null) : null}
                    {props.isPost ? (props.isPostResource ? 'Ресурс ' : null) : null}
                    {props.isPost ? (props.isPostNews ? 'Новость' : null) : null}
                  </Grid>
                  <Grid className={classes.containerModerationCreationInfo}>
                    {props.isEvent ? (props.organizer ? `Организатор мероприятия: ${props.organizer}` : null) : null}
                  </Grid>
                  <Grid className={classes.containerModerationCreationInfo}>
                    {props.isEvent ? (props.address ? `Адрес мероприятия: ${props.address}` : null) : null}
                  </Grid>
                  <Grid className={classes.containerModerationCreationInfo}>
                    {props.isEvent ? (props.theme ? `Тема мероприятия: ${props.theme}` : null) : null}
                  </Grid>
                  <Grid className={classes.containerModerationCreationInfo}>
                    {props.isEvent ? (props.format ? `Формат мероприятия: ${props.format}` : null) : null}
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
          {width < 1280 ? (
            <Grid container direction="column" style={{ gap: 20 }}>
              <Grid container justifyContent="center" style={{ marginTop: 20 }}>
                {props.isContact ? null : (
                  <Button
                    variant="outlined"
                    style={{ width: '100%' }}
                    onClick={handleOpenClose}
                    startIcon={<MenuOpenIcon />}
                  >
                    Открыть содержание
                  </Button>
                )}
                {props.isPost || props.isEvent ? null : (
                  <Button onClick={() => showButtonHandler()} startIcon={<CallMissedOutgoingIcon />}>
                    Посмотреть на странице
                  </Button>
                )}
              </Grid>
              <Grid container direction="row" justifyContent="flex-end" style={{ gap: 20 }}>
                <Button variant="contained" color="success" onClick={verificateButtonHandler} startIcon={<CheckIcon />}>
                  Опубликовать
                </Button>
                <RejectDialog entityId={props.id} entityType={props.type} />
              </Grid>
            </Grid>
          ) : (
            <Grid container direction="row" justifyContent="space-between">
              <Grid item>
                {props.isContact ? null : (
                  <Button variant="outlined" onClick={handleOpenClose} startIcon={<MenuOpenIcon />}>
                    Открыть содержание
                  </Button>
                )}
                {props.isPost || props.isEvent ? null : (
                  <Button onClick={() => showButtonHandler()} startIcon={<CallMissedOutgoingIcon />}>
                    Посмотреть на странице
                  </Button>
                )}
              </Grid>
              <Grid item>
                <Grid container direction="row" style={{ gap: 20 }}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={verificateButtonHandler}
                    startIcon={<CheckIcon />}
                  >
                    Опубликовать
                  </Button>
                  <RejectDialog entityId={props.id} entityType={props.type} />
                </Grid>
              </Grid>
            </Grid>
          )}
          <ArticleModerationModal
            open={openModalArticleProject}
            handleOpenClose={handleOpenClose}
            title={props.title}
            article={props.description}
            articleWithSections={props.article}
            media={props.presentationMedia}
            isChanged={checkIsChanged(props.description)}
            isProject={props.isProject}
            isPostNews={props.isPostNews}
            isPostResource={props.isPostResource}
            isCrowd={props.isCrowd}
          />
        </Grid>
      </Grid>
      <Line />
    </>
  );
};

export default ModerationContentBlock;
