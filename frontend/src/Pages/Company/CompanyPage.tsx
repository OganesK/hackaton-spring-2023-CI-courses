import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import ShowMoreText from 'react-show-more-text';

import { Grid, Tooltip, Avatar, Skeleton, Button } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

import { useQuery } from '@apollo/client';

import { useWindowSize } from '../../rules/index';

import NoneClick from '../../Components/UI/NoneClickableField/NoneClick';
import NavBar from '../../Components/UI/NavBar/NavBar';
import FilterLine from '../../Components/UI/FilterLine/FilterLine';
import MyButton from '../../Components/UI/Buttons/OutlinedButton/Button';

import Line from '../../Components/UI/Line/Line';
import ProfileProjectsBlock from '../../Components/ProfilePage/ProfileProjectBlock/ProfileProjectsBlock';
import ContactsBlock from '../../Components/CompanyPage/Contacts';
import ProjectCreationModal from '../../Components/ProfilePage/Modals/ProjectCreationModal';
import ContactCreationModal from '../../Components/CompanyPage/Modals/ContactCreationModal';
import EditContactsModal from '../../Components/CompanyPage/Modals/EditContactsModal';
import CompanyEditModal from './EntityEditModals/CompanyEditModal';

import diagonalLink from '../../assets/icons/diagonalLink.svg';

import { userContext } from '../../Context/context';
import { MatchProps, CompanyTypes } from './graphql/typings';
import { GET_COMPANY_QUERY } from './graphql/query';

import { useTranslate } from '../../helpers/hooks/useTranslateCategories';

import useStyles from './Style';
import Footer from '../../Components/Home/Footer/Footer';

const CompanyPage: (props: MatchProps) => JSX.Element = (props: MatchProps) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });
  const [isExpanded, setIsExpanded] = useState(false);
  const [activityKind, setActivityKind] = useState('');

  const companyId = props.match.params.companyId;
  const { data, loading, refetch } = useQuery<{ company: CompanyTypes }>(GET_COMPANY_QUERY, {
    variables: { companyId: Number(companyId) },
  });
  if (data) {
    console.debug(data);
  }
  const contextUserData = useContext(userContext);
  const isOwner = contextUserData.user?.ownerCompanies.filter(company => company.id === Number(companyId)).length === 1;
  const companyData: CompanyTypes | undefined = data && data.company;
  const [selectedSection, setSelectedSection] = useState('Проекты');

  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [editContactModalOpen, setEditContactModalOpen] = useState(false);

  const [openNoneClick, setOpenNoneClick] = useState(false);

  const [width] = useWindowSize();
  const secondDefaultBlockHeight = width / 5.5;

  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [dateToShow, setDateToShow] = useState('');
  const [contactId, setContactId] = useState<number>(0);

  const history = useHistory();
  const classes = useStyles();

  useEffect(() => {
    if (data && !loading) {
      const formattedDate = new Date(companyData!.createdAt).toLocaleString().slice(0, -3);
      setDateToShow(formattedDate.slice(6, 10));
      setActivityKind(companyData!.activityKind);
    }
  }, [loading]);

  const translateCategory = useTranslate(activityKind);

  useEffect(() => {
    if (data && data.company.contact && !loading) {
      const contactId = data.company.contact.id;
      setContactId(contactId);
    }
  }, [loading, data && data.company.contact]);

  const handleOpenClose: () => void = () => {
    setOpenModal(!openModal);
  };

  const handleOnProfileClick: () => void = () => {
    history.push(`/profile/${companyData!.owner.id}`);
  };

  const projects = companyData && companyData.projects;

  const editButtonHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openEdit) {
      setOpenEdit(!openEdit);
    } else {
      setOpenEdit(!openEdit);
    }
  };

  const messageButtonHandler = () => {
    console.log('click');
  };

  return (
    <Grid container xs={12} style={{ gap: 80, position: 'relative' }}>
      {openNoneClick ? <NoneClick /> : null}
      <NavBar text="qwe" />
      <Grid container xs={10} style={{ margin: 'auto', gap: 0 }}>
        {isTabletOrMobile ? (
          <Grid item container xs direction="column" alignItems="center" style={{ gap: 30 }}>
            <Grid
              item
              direction="row"
              justifyContent="center"
              alignItems="center"
              style={{ border: '0px solid', gap: 60 }}
            >
              <Avatar
                alt="user"
                sx={{
                  width: secondDefaultBlockHeight,
                  height: secondDefaultBlockHeight,
                  maxWidth: 160,
                  maxHeight: 160,
                }}
                src={data && data.company?.avatar?.link}
              />
            </Grid>
            <Grid item container xs direction="column" justifyContent="space-around">
              <Grid item container direction="column" style={{ gap: 10, textAlign: 'center' }}>
                {loading ? (
                  <Skeleton animation="wave" height={35} width="40%" style={{ margin: 'auto' }} />
                ) : (
                  <Grid
                    item
                    className={classes.fullName}
                    style={{
                      color: isOwner && companyData?.updatedVariable?.name ? '#24B95C' : 'inherit',
                      wordBreak: 'break-word',
                    }}
                  >
                    {isOwner
                      ? companyData?.updatedVariable?.name
                        ? companyData?.updatedVariable.name
                        : companyData?.name
                      : companyData?.name}
                  </Grid>
                )}

                <Grid container justifyContent="center" style={{ marginBottom: 10 }}>
                  {loading ? (
                    <Skeleton animation="wave" height={15} width="30%" />
                  ) : (
                    <Grid item className={classes.onPlatform}>
                      На сайте с {dateToShow} года
                    </Grid>
                  )}
                </Grid>
                <Grid item className={classes.activity}>
                  {translateCategory}
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction="column" style={{ gap: 20 }}>
              {loading ? (
                <>
                  <Skeleton animation="wave" height={15} width="90%" />
                  <Skeleton animation="wave" height={15} width="70%" />
                  <Skeleton animation="wave" height={15} width="90%" />
                  <Skeleton animation="wave" height={15} width="70%" />
                </>
              ) : companyData?.description || companyData?.updatedVariable?.description ? (
                <div>
                  <Grid item className={classes.bio} style={{ border: '0px solid', wordBreak: 'break-word' }}>
                    <ShowMoreText
                      lines={6}
                      more="Показать еще"
                      less="Скрыть описание"
                      className={classes.collapseReactMarkdown}
                      anchorClass={classes.collapseAnchor}
                      onClick={(): void => setIsExpanded(!isExpanded)}
                      expanded={isExpanded}
                      // width={280}
                      truncatedEndingComponent={'... '}
                    >
                      {isOwner
                        ? companyData?.updatedVariable?.description
                          ? companyData?.updatedVariable?.description
                          : companyData?.description
                        : companyData?.description}
                    </ShowMoreText>
                  </Grid>
                </div>
              ) : isOwner ? (
                <div>
                  <Grid item className={classes.bio} style={{ border: '0px solid' }}>
                    Вы можете заполнить описание своей компании, кликнув по кнопке &quot;Редактировать&quot;
                  </Grid>
                </div>
              ) : null}
            </Grid>
            {isOwner ? (
              <Grid container>
                <CompanyEditModal
                  companyId={Number(companyId)}
                  open={openEdit}
                  handleOpenClose={() => setOpenEdit(!openEdit)}
                />
                <MyButton
                  onClickEvent={(e: React.MouseEvent) => editButtonHandler(e)}
                  isWhite
                  isEdit
                  text="Редактировать"
                  className={classes.editButton}
                />
              </Grid>
            ) : (
              <Grid container>
                <MyButton
                  onClick={messageButtonHandler}
                  isDisable={contextUserData.user ? false : true}
                  text="Связаться"
                  className={classes.editButton}
                />
              </Grid>
            )}
          </Grid>
        ) : (
          <Grid item container xs direction="row" style={{ gap: 60 }}>
            <Grid item container xs direction="row" style={{ gap: 60 }}>
              <Grid
                item
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ border: '0px solid', gap: 60 }}
              >
                <Avatar
                  alt="company"
                  sx={{
                    width: secondDefaultBlockHeight,
                    height: secondDefaultBlockHeight,
                    maxWidth: 150,
                    maxHeight: 150,
                  }}
                  src={data && data.company?.avatar?.link}
                />
              </Grid>
              <Grid item container xs direction="column" justifyContent="space-around">
                <Grid item container direction="column" style={{ gap: 10 }}>
                  {loading ? (
                    <Skeleton animation="wave" height={25} width="60%" />
                  ) : (
                    <Grid
                      item
                      className={classes.fullName}
                      style={{
                        color: isOwner && companyData?.updatedVariable?.name ? '#24B95C' : 'inherit',
                        wordBreak: 'break-word',
                      }}
                    >
                      {isOwner
                        ? companyData?.updatedVariable?.name
                          ? companyData?.updatedVariable.name
                          : companyData?.name
                        : companyData?.name}
                    </Grid>
                  )}

                  {loading ? (
                    <Skeleton animation="wave" height={15} width="30%" />
                  ) : (
                    <Grid item className={classes.onPlatform}>
                      На сайте с {dateToShow} года
                    </Grid>
                  )}
                </Grid>
                <Grid item className={classes.activity}>
                  {translateCategory}
                </Grid>
              </Grid>
            </Grid>
            {isOwner ? (
              <Grid>
                <CompanyEditModal
                  companyId={Number(companyId)}
                  open={openEdit}
                  handleOpenClose={() => setOpenEdit(!openEdit)}
                />
                <MyButton
                  onClickEvent={(e: React.MouseEvent) => editButtonHandler(e)}
                  isWhite
                  isEdit
                  text="Редактировать"
                  className={classes.editButton}
                />
              </Grid>
            ) : null}
          </Grid>
        )}
        <Line marginTop={60} marginBottom={isOwner ? 10 : 60} display={isTabletOrMobile ? 'none' : 'block'} />
        {isTabletOrMobile ? null : (
          <Grid container xs={12} style={{ gap: 20 }} direction="row" justifyContent="space-between">
            {isOwner ? (
              <Grid container justifyContent="flex-end">
                {data && data.company.contact ? (
                  <>
                    <EditContactsModal
                      open={editContactModalOpen}
                      handleOpenClose={(): void => setEditContactModalOpen(!editContactModalOpen)}
                      contactId={contactId}
                      refetch={refetch}
                    />
                    <Button
                      onClick={(): void => setEditContactModalOpen(!editContactModalOpen)}
                      variant="text"
                      startIcon={<EditIcon />}
                      sx={{
                        color: '#AAADB2',
                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      Изменить контакты
                    </Button>
                  </>
                ) : (
                  <>
                    <ContactCreationModal
                      open={contactModalOpen}
                      handleOpenClose={(): void => setContactModalOpen(!contactModalOpen)}
                      ownerId={Number(companyId)}
                      refetch={refetch}
                    />
                    <Tooltip title="Добавьте контактную информацию о компании" placement="left">
                      <Button
                        onClick={(): void => setContactModalOpen(!contactModalOpen)}
                        variant="text"
                        startIcon={<AddIcon />}
                        sx={{
                          color: '#AAADB2',
                          fontWeight: 500,
                          fontSize: 18,
                        }}
                      >
                        Заполнить контакты
                      </Button>
                    </Tooltip>
                  </>
                )}
              </Grid>
            ) : null}
            <Grid container xs={7} style={{ gap: 50 }}>
              <Grid container direction="column" style={{ gap: 20 }}>
                <Grid container className={classes.companyHeaders}>
                  О Компании
                </Grid>

                {loading ? (
                  <>
                    <Skeleton animation="wave" height={15} width="90%" />
                    <Skeleton animation="wave" height={15} width="70%" />
                    <Skeleton animation="wave" height={15} width="90%" />
                    <Skeleton animation="wave" height={15} width="70%" />
                  </>
                ) : companyData?.description || companyData?.updatedVariable?.description ? (
                  <Grid container style={{ gap: 30 }}>
                    <Grid
                      container
                      className={classes.bio}
                      style={{
                        border: '0px solid',
                        color: isOwner && companyData?.updatedVariable?.description ? '#24B95C' : 'inherit',
                        wordBreak: 'break-word',
                      }}
                    >
                      {isOwner
                        ? companyData?.updatedVariable?.description
                          ? companyData?.updatedVariable?.description
                          : companyData?.description
                        : companyData?.description}
                    </Grid>
                    {companyData?.inn && (
                      <Grid container style={{ gap: 20 }}>
                        <Grid container className={classes.companyHeaders}>
                          ИНН
                        </Grid>
                        <Grid>{companyData?.inn}</Grid>
                      </Grid>
                    )}
                    <Grid container style={{ gap: 20 }}>
                      <Grid container className={classes.companyHeaders}>
                        Регион компании
                      </Grid>
                      <Grid>{companyData?.mainRegion}</Grid>
                    </Grid>
                  </Grid>
                ) : isOwner ? (
                  <div>
                    <Grid item className={classes.bio} style={{ border: '0px solid' }}>
                      Вы можете заполнить описание своей компании, кликнув по кнопке &quot;Редактировать&quot;
                    </Grid>
                  </div>
                ) : null}
              </Grid>
              <Grid container direction="column" style={{ gap: 20 }}>
                <Grid container className={classes.companyHeaders}>
                  Владелец компании
                </Grid>
                <Grid container className={classes.ownerText} style={{ gap: 5 }} onClick={handleOnProfileClick}>
                  <div>{companyData?.owner.lastname}</div>
                  <div>{companyData?.owner.firstname}</div>
                  <img src={diagonalLink} />
                </Grid>
              </Grid>
            </Grid>
            {(isOwner && companyData?.contact) || (companyData?.contact && companyData?.contact.isApproved) ? (
              <Grid container xs={4}>
                <ContactsBlock
                  isOwner={isOwner}
                  addresses={companyData && companyData.contact.adresses}
                  phones={companyData && companyData.contact.phones}
                  emails={companyData && companyData.contact.emails}
                  isApproved={companyData && companyData.contact.isApproved}
                />
              </Grid>
            ) : null}
          </Grid>
        )}
        <Line marginTop={60} marginBottom={50} display={isTabletOrMobile ? 'none' : 'block'} />
        <Grid container style={{ gap: 10 }}>
          {isTabletOrMobile ? (
            <>
              <Grid container xs={10} style={{ margin: isTabletOrMobile ? '60px 0 40px 0' : 0 }}>
                <FilterLine isCompanyPage selectedCategory={selectedSection} setSelectedCategory={setSelectedSection} />
              </Grid>

              {selectedSection === 'Проекты' ? (
                <Grid container style={{ gap: 30 }} id="Проекты">
                  <Grid container direction="row" justifyContent="center" alignItems="center">
                    {isOwner ? (
                      <Button
                        onClick={handleOpenClose}
                        variant="text"
                        // color="inherit"
                        startIcon={<AddIcon />}
                        sx={{
                          color: '#252525',
                          fontWeight: 500,
                          fontSize: 18,
                        }}
                      >
                        Добавить
                      </Button>
                    ) : null}
                    <ProjectCreationModal
                      ownerId={Number(companyId)}
                      open={openModal}
                      handleOpenClose={handleOpenClose}
                      refetchOnCompanyPage={refetch}
                    />
                  </Grid>
                  <ProfileProjectsBlock isOwner={isOwner} workActivity={projects ? projects : []} refetch={refetch} />
                </Grid>
              ) : (
                <Grid container id="Контакты" style={{ gap: 30 }}>
                  <Grid container direction="row" justifyContent="center" alignItems="center">
                    {isOwner ? (
                      <Grid container justifyContent="center">
                        {companyData?.contact ? (
                          <>
                            <EditContactsModal
                              open={editContactModalOpen}
                              handleOpenClose={(): void => setEditContactModalOpen(!editContactModalOpen)}
                              contactId={contactId}
                              refetch={refetch}
                            />
                            <Button
                              onClick={(): void => setEditContactModalOpen(!editContactModalOpen)}
                              variant="text"
                              startIcon={<EditIcon />}
                              sx={{
                                color: '#252525',
                                fontWeight: 500,
                                fontSize: 18,
                              }}
                            >
                              Изменить контакты
                            </Button>
                          </>
                        ) : (
                          <>
                            <ContactCreationModal
                              open={contactModalOpen}
                              handleOpenClose={(): void => setContactModalOpen(!contactModalOpen)}
                              ownerId={Number(companyId)}
                              refetch={refetch}
                            />
                            <Button
                              onClick={(): void => setContactModalOpen(!contactModalOpen)}
                              variant="text"
                              startIcon={<AddIcon />}
                              sx={{
                                color: '#252525',
                                fontWeight: 500,
                                fontSize: 18,
                              }}
                            >
                              Заполнить контакты
                            </Button>
                          </>
                        )}
                      </Grid>
                    ) : null}
                  </Grid>
                  <Grid container direction="column" style={{ gap: 15, marginBottom: 60 }}>
                    <Grid container justifyContent="center" className={classes.companyContactsMobileHeader}>
                      Владелец компании
                    </Grid>
                    <Grid
                      container
                      justifyContent="center"
                      className={classes.ownerText}
                      style={{ gap: 5 }}
                      onClick={handleOnProfileClick}
                    >
                      <div>{companyData?.owner.lastname}</div>
                      <div>{companyData?.owner.firstname}</div>
                      <img src={diagonalLink} />
                    </Grid>
                  </Grid>
                  <Grid container>
                    {(isOwner && companyData?.contact) || (companyData?.contact && companyData?.contact.isApproved) ? (
                      <Grid container>
                        <ContactsBlock
                          isOwner={isOwner}
                          addresses={companyData && companyData.contact.adresses}
                          phones={companyData && companyData.contact.phones}
                          emails={companyData && companyData.contact.emails}
                          isApproved={companyData && companyData.contact.isApproved}
                        />
                      </Grid>
                    ) : null}
                  </Grid>
                </Grid>
              )}
            </>
          ) : (
            <Grid container style={{ gap: 50 }}>
              <Grid container justifyContent="space-between" alignItems="center" className={classes.companyHeaders}>
                <Grid item>Проекты</Grid>
                <Grid item>
                  {isOwner ? (
                    <Button
                      onClick={handleOpenClose}
                      variant="text"
                      // color="inherit"
                      startIcon={<AddIcon />}
                      sx={{
                        color: '#AAADB2',
                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      Добавить
                    </Button>
                  ) : null}
                  <ProjectCreationModal
                    ownerId={Number(companyId)}
                    open={openModal}
                    handleOpenClose={handleOpenClose}
                    refetchOnCompanyPage={refetch}
                  />
                </Grid>
              </Grid>
              <Grid container>
                <ProfileProjectsBlock isOwner={isOwner} workActivity={projects ? projects : []} refetch={refetch} />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Footer footerTopIdent={100} />
    </Grid>
  );
};

export default CompanyPage;
