import React, { useState, useContext, useEffect } from 'react';

import { Grid, Avatar, Skeleton, Button } from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import { useQuery } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';
import ShowMoreText from 'react-show-more-text';

import { useWindowSize } from '../../rules/index';
import { userContext } from '../../Context/context';

import NavBar from '../../Components/UI/NavBar/NavBar';
import SkeletonProjects from '../../Components/UI/SkeletonBlocks/SkeletonProjects/SkeletonProjects';
import SkeletonResources from '../../Components/UI/SkeletonBlocks/SkeletonResources/SkeletonResources';
import SkeletonOffers from '../../Components/UI/SkeletonBlocks/SkeletonOffers/SkeletonOffers';
import SkeletonEvents from '../../Components/UI/SkeletonBlocks/SkeletonEvents/SkeletonEvents';
import SkeletonCompanyCards from '../../Components/UI/SkeletonBlocks/SkeletonCompanyCards/SkeletonCompanyCards';
import MyButton from '../../Components/UI/Buttons/OutlinedButton/Button';
import FilterLine from '../../Components/UI/FilterLine/FilterLine';

import Footer from '../../Components/Home/Footer/Footer';

import Line from '../../Components/UI/Line/Line';

import ProfileNewsBlock from '../../Components/ProfilePage/ProfileNewsBlock/ProfileNewsBlock';

import ProfileProjectsBlock from '../../Components/ProfilePage/ProfileProjectBlock/ProfileProjectsBlock';
import ProfileEvent from '../../Components/ProfilePage/ProfileEvent/ProfileEvent';

import CreatePostModal from '../../Components/ProfilePage/Modals/CreatePostModal';
import CreateEventModal from '../../Components/ProfilePage/Modals/CreateEventModal';

import ProfileEditModal from '../../Components/ProfilePage/EntityEditModals/ProfileEditModal';

import { useHistory } from 'react-router-dom';

import { MatchProps, UserDataTypes, ProjectTypes, PostTypes, EventTypes, SwitchToChatTypes } from './graphql/typings';
import { SwitchToChat } from './graphql/mutations';
import { GET_USER_QUERY } from '../../Queries';

import useStyles from './Style';

const ProfilePage: (props: MatchProps) => JSX.Element = (props: MatchProps) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });
  const [isExpanded, setIsExpanded] = useState(false);

  const history = useHistory();
  const userId = props.match.params.profileId;
  const { data, loading, refetch } = useQuery<{ user: UserDataTypes }>(GET_USER_QUERY, {
    variables: { id: Number(userId) },
  });
  const switchToChatHandler = SwitchToChat();
  const contextUserData = useContext(userContext);
  const userData: UserDataTypes | undefined = data && data.user;
  const [selectedSection, setSelectedSection] = useState('');

  const [width] = useWindowSize();
  const secondDefaultBlockHeight = width / 5.5;

  const [openEdit, setOpenEdit] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [openModalOffer, setOpenModalOffer] = useState(false);
  const [openModalEvent, setOpenModalEvent] = useState(false);

  const classes = useStyles();

  const editButtonHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openEdit) {
      setOpenEdit(!openEdit);
    } else {
      setOpenEdit(!openEdit);
    }
  };

  const handleOpenClose: () => void = () => {
    setOpenModal(!openModal);
  };

  const handleOpenClosePostModal: () => void = () => {
    setOpenModalOffer(!openModalOffer);
  };

  const handleOpenCloseEvent: () => void = () => {
    setOpenModalEvent(!openModalEvent);
  };

  const postToShow = []

  const projects = [];

  const filteredArr = projects?.reduce((acc: ProjectTypes[], current) => {
    const x = acc.find(item => item.id === current.id);
    if (!x) {
      return acc.concat([current]);
    } else {
      return acc;
    }
  }, []);

  const messageButtonHandler: () => Promise<void> = async () => {
    const res: SwitchToChatTypes = await switchToChatHandler({
      senderId: contextUserData && Number(contextUserData.user.id),
      recipientId: Number(userId),
    });
    history.push(`/messages/${res?.data!.switchToMessager.id}`);
  };

  useEffect(() => {
    // if (data && !loading) {
    setSelectedSection(data?.user.ownerCompanies.length === 0 ? 'Компании' : 'курсы');
    // }
  }, []);

  return (
    <Grid container xs={12}>
      <NavBar text="qwe" />

      <Grid container xs={10} style={{ margin: 'auto', gap: 0, marginTop: 60 }}>
        <Grid container xs={12} direction="row" justifyContent="space-between">
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
                  src={data && data.user?.avatar?.link}
                />
              </Grid>
              <Grid item container xs direction="column" justifyContent="space-around">
                <Grid item container direction="column" style={{ gap: 10, textAlign: 'center' }}>
                  {loading ? (
                    <Skeleton animation="wave" height={35} width="40%" style={{ margin: 'auto' }} />
                  ) : (
                    <Grid item className={classes.fullName}>
                      {userData && userData.firstname} &nbsp;
                      {userData && userData.lastname}
                    </Grid>
                  )}

                  <Grid item>
                    {loading ? (
                      <>
                        <Skeleton animation="wave" height={15} width="25%" style={{ margin: 'auto' }} />
                        <Skeleton animation="wave" height={25} width="60%" style={{ margin: 'auto' }} />
                      </>
                    ) : (
                      <Grid container direction="column" style={{ gap: 20 }}>
                        <Grid item className={classes.bio}>
                          {userData && userData.city}
                        </Grid>
                        <Grid item className={classes.shortDescText}>
                          {userData && userData.shortDescription}
                        </Grid>
                      </Grid>
                    )}
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
                ) : userData?.bio ? (
                  <div>
                    <Grid item className={classes.bio} style={{ border: '0px solid' }}>
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
                        {userData && userData.bio}
                      </ShowMoreText>
                    </Grid>
                  </div>
                ) : contextUserData.user && contextUserData.user.id === Number(userId) ? (
                  <div>
                    <Grid item className={classes.bio} style={{ border: '0px solid' }}>
                      Вы можете заполнить свою биографию, кликнув по кнопке &quot;Редактировать&quot;
                    </Grid>
                  </div>
                ) : null}
              </Grid>
              {contextUserData.user && contextUserData.user.id === Number(userId) ? (
                <Grid container>
                  <ProfileEditModal
                    userId={Number(userId)}
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
                    text="Перейти к диалогу"
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
                    alt="user"
                    sx={{
                      width: secondDefaultBlockHeight,
                      height: secondDefaultBlockHeight,
                      maxWidth: 150,
                      maxHeight: 150,
                    }}
                    src={data && data.user?.avatar?.link}
                  />
                </Grid>
                <Grid item container xs direction="column" justifyContent="space-around">
                  <Grid item container direction="column" style={{ gap: 10 }}>
                    {loading ? (
                      <Skeleton animation="wave" height={35} width="40%" />
                    ) : (
                      <Grid item className={classes.fullName}>
                        {userData && userData.firstname} &nbsp;
                        {userData && userData.lastname}
                      </Grid>
                    )}

                    <Grid item>
                      {loading ? (
                        <>
                          <Skeleton animation="wave" height={15} width="25%" />
                          <Skeleton animation="wave" height={25} width="60%" />
                        </>
                      ) : (
                        <Grid container direction="column" style={{ gap: 30 }}>
                          <Grid item className={classes.bio}>
                            {userData && userData.city}
                          </Grid>
                          <Grid item className={classes.shortDescText}>
                            {userData && userData.shortDescription}
                          </Grid>
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {contextUserData.user && contextUserData.user.id === Number(userId) ? (
                <Grid>
                  <ProfileEditModal
                    userId={Number(userId)}
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
                <Grid>
                  <MyButton
                    onClick={messageButtonHandler}
                    isDisable={contextUserData.user ? false : true}
                    text="Перейти к диалогу"
                    className={classes.editButton}
                  />
                </Grid>
              )}
            </Grid>
          )}
        </Grid>
        <Line marginTop={40} marginBottom={40} display={isTabletOrMobile ? 'none' : 'block'} />

        {isTabletOrMobile ? null : (
          <Grid container direction="column" style={{ gap: 20, marginBottom: 60 }}>
            <Grid container className={classes.profileHeaders}>
              БИО
            </Grid>
            {loading ? (
              <>
                <Skeleton animation="wave" height={15} width="90%" />
                <Skeleton animation="wave" height={15} width="70%" />
                <Skeleton animation="wave" height={15} width="90%" />
                <Skeleton animation="wave" height={15} width="70%" />
              </>
            ) : userData?.bio ? (
              <div>
                <Grid item className={classes.bio} style={{ border: '0px solid' }}>
                  {userData && userData.bio}
                </Grid>
              </div>
            ) : contextUserData.user && contextUserData.user.id === Number(userId) ? (
              <div>
                <Grid item className={classes.bio} style={{ border: '0px solid' }}>
                  Вы можете заполнить свою биографию, кликнув по кнопке &quot;Редактировать&quot;
                </Grid>
              </div>
            ) : null}
          </Grid>
        )}
        <Grid container justifyContent="center">
          <Grid container style={{ margin: isTabletOrMobile ? '60px 0 40px 0' : 0 }}>
            <FilterLine isProfilePage selectedCategory={selectedSection} setSelectedCategory={setSelectedSection} />
            <Line marginTop={10} display={isTabletOrMobile ? 'none' : 'block'} />
          </Grid>
          {
            console.log(selectedSection)
          }
          {selectedSection === 'Курсы' ? (
            <Grid container id="Курсы">
              <ProfileProjectsBlock
                userid={Number(userId)}
                workActivity={filteredArr ? filteredArr : []}
                companiesOwner={userData && userData.ownerCompanies ? userData.ownerCompanies : []}
                refetch={refetch}
              />
            </Grid>
          ) : selectedSection === 'Уроки' ? (
            <Grid container id="Уроки" style={{ gap: 30 }}>
              <Grid
                container
                direction="row"
                justifyContent={isTabletOrMobile ? 'center' : 'flex-end'}
                alignItems="center"
              >
                {contextUserData.user && contextUserData.user.id === Number(userId) ? (
                  <>
                    <CreatePostModal
                      projectId={0}
                      open={openModalOffer}
                      handleOpenClose={handleOpenClosePostModal}
                      isOfferFilter={false}
                      isResourceFilter={false}
                      isNewsFilter={true}
                      refetchOnProfilePage={refetch}
                    />
                    <Button
                      onClick={handleOpenClosePostModal}
                      variant="text"
                      // color="inherit"
                      startIcon={<AddIcon />}
                      sx={{
                        color: isTabletOrMobile ? '#252525' : '#AAADB2',

                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      Добавить
                    </Button>
                  </>
                ) : null}
              </Grid>
              <Grid container direction="row" justifyContent="flex-start" columnSpacing={6}>
                {loading ? (
                  <SkeletonProjects />
                ) : (
                  <>
                    {postToShow &&
                      postToShow.map(post => (
                        <>
                          {(contextUserData.user && Number(userId) === contextUserData.user.id && post.isNews) ||
                          (post.isApproved && post.isNews) ? (
                            <Grid
                              item
                              xl={4}
                              lg={4}
                              md={6}
                              sm={6}
                              xs={12}
                              style={{
                                marginBottom: width < 600 ? 50 : 60,
                              }}
                            >
                              <ProfileNewsBlock
                                ownerId={Number(userId)}
                                key={post.id}
                                id={post.id}
                                publicDate={post.createdAt}
                                title={post.title}
                                workerId={post.author.worker.id}
                                firstname={post.author.worker.firstname}
                                lastname={post.author.worker.lastname}
                                ownerAvatar={post.author.worker.avatar.link}
                                newsOwnerId={post.author.worker.id}
                                shortDescription={post.description}
                                article={post.article}
                                img={post.poster?.link}
                                contentId={post.id}
                                isOffer={post.isOffer}
                                isResource={post.isResource}
                                isNews={post.isNews}
                                isApproved={post.isApproved}
                                isOwner={contextUserData.user && contextUserData.user.id === Number(userId)}
                                isProfilePage={true}
                                refetch={refetch}
                              />
                            </Grid>
                          ) : null}
                        </>
                      ))}
                  </>
                )}
              </Grid>
            </Grid>
          ) : (
            <Grid container id="Трансляции" style={{ gap: 30 }}>
              <Grid
                container
                direction="row"
                justifyContent={isTabletOrMobile ? 'center' : 'flex-end'}
                alignItems="center"
              >
                {contextUserData.user && contextUserData.user.id === Number(userId) ? (
                  <>
                    <CreateEventModal
                      userId={Number(contextUserData.user.id)}
                      open={openModalEvent}
                      handleOpenClose={handleOpenCloseEvent}
                      refetch={refetch}
                    />
                    <Button
                      onClick={handleOpenCloseEvent}
                      variant="text"
                      // color="inherit"
                      startIcon={<AddIcon />}
                      sx={{
                        color: isTabletOrMobile ? '#252525' : '#AAADB2',

                        fontWeight: 500,
                        fontSize: 18,
                      }}
                    >
                      Добавить
                    </Button>
                  </>
                ) : null}
              </Grid>
              <Grid container style={{ gap: 70 }}>
                {loading ? (
                  <SkeletonEvents />
                ) : (
                  <>
                    {data?.user.publishedEvent &&
                      data?.user.publishedEvent.map((event: EventTypes) => (
                        <>
                          {(contextUserData.user && Number(userId) === contextUserData.user.id) || event.isApproved ? (
                            <ProfileEvent
                              key={event.id}
                              id={event.id}
                              poster={event.poster?.link}
                              description={event.description}
                              shortDescription={event.shortDescription}
                              name={event.name}
                              date={event.date}
                              address={event.address}
                              organizer={event.organizer}
                              theme={event.theme}
                              format={event.format}
                              isOwner={contextUserData.user && contextUserData.user.id === Number(userId)}
                              stream={event.stream}
                              refetch={refetch}
                            />
                          ) : null}
                        </>
                      ))}
                  </>
                )}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Footer footerMobileTopIdent={100} footerTopIdent={200} />
    </Grid>
  );
};

export default ProfilePage;
