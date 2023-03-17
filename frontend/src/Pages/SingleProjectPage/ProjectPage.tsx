/* eslint-disable react-hooks/rules-of-hooks */

import React, { useState, useContext, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { Grid, Tooltip, Button, IconButton } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import StickyBox from 'react-sticky-box';

import { MatchProps, ProjectTypes, WorkerTypes, CrowdfundingTypes, PostTypes } from './graphql/typings';
import { userContext } from '../../Context/context';

import NavBar from '../../Components/UI/NavBar/NavBar';
import NoneClick from '../../Components/UI/NoneClickableField/NoneClick';
import SnackbarOnChange from '../../Components/UI/Snackbar/Snackbar';
import Loading from '../../Components/UI/Loading/Loading';
import PostArticleComponent from '../../Components/UI/PostArticleComponent/PostArticleComponent';
import MyButton from '../../Components/UI/Buttons/OutlinedButton/Button';

import Line from '../../Components/UI/Line/Line';
import ContentBlock from '../../Components/SingleProjectPage/ContentBlock';

import BidProject from '../../Components/Home/BidProject/BidProjectOnSProjectPage';
import Footer from '../../Components/Home/Footer/Footer';

import SideBarNavigation from '../../Components/SingleProjectPage/sideBarNavigation';
import AutoCompleteSearchField from '../../Components/SingleProjectPage/AutoCompleteSearchField';
import ImageSlider from '../../Components/SingleProjectPage/ImageSlider';

import CreatePostModal from '../../Components/ProfilePage/Modals/CreatePostModal';
import ProjectEditModal from '../../Components/SingleProjectPage/Modals/ProjectEditModal';


import useStyles from './Style';

import diagonalLink from '../../assets/icons/diagonalLink.svg';

import { GET_PROJECT_QUERY } from '../../Queries';
import {
  useTranslateIndustrialDirections,
  useTranslateTypes,
  useTranslateStages,
  useTranslateTechTypes,
  useTranslateInvestmentsStages,
  useTranslateSalesTypes,
  useTranslateMainGoals,
} from '../../helpers/hooks/useTranslateProjectProps';
import { useTranslate } from '../../helpers/hooks/useTranslateCategories';
import ProgressComponent from '../../Components/SingleProjectPage/ProgressComp/ProgressComponent';
import DataTextComponent from '../../Components/SingleProjectPage/ProjectDataTextComp/DataTextComponent';

const ProjectPage: (props: MatchProps) => JSX.Element = (props: MatchProps) => {
  const projectId = props.match.params.projectId;
  const userContextInfo = useContext(userContext);
  const {
    loading,
    data: projectData,
    refetch,
  } = useQuery<{ project: ProjectTypes }>(GET_PROJECT_QUERY, {
    variables: {
      id: Number(projectId),
    },
  });
  const history = useHistory();

  const [shownPosts, setShownPosts] = useState<Array<PostTypes>>([]);

  const [openEdit, setOpenEdit] = useState(false);
  const editButtonHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openEdit) {
      setOpenEdit(!openEdit);
    } else {
      setOpenEdit(!openEdit);
    }
  };

  const [projectCatValue, setProjectCatValue] = useState('');
  const [projectIndustrialDirectionsValue, setProjectIndustrialDirectionsValue] = useState('');
  const [projectTypesValue, setProjectTypesValue] = useState('');
  const [projectStagesValue, setProjectStagesValue] = useState('');
  const [projectSiteValue, setProjectSiteValue] = useState('');
  const [projectMarketsValue, setProjectMarketsValue] = useState('');
  const [projectTechTypesValue, setProjectTechTypesValue] = useState('');
  const [projectInvestmentsStagesValue, setProjectInvestmentsStagesValue] = useState('');
  const [projectSalesTypesValue, setProjectSalesTypesValue] = useState('');
  const [projectBusinessModelsValue, setProjectBusinessModelsValue] = useState('');
  const [projectMainGoalsValue, setProjectMainGoalsValue] = useState('');

  const [filteredShownPosts, setFilteredShownPosts] = useState<Array<PostTypes>>([]);

  const [selectedPostCategory, setSelectedPostCategory] = useState<string>('Все');

  const [openModalCrowd, setOpenModalCrowd] = useState(false);
  const [openModalOffer, setOpenModalOffer] = useState(false);
  const [openModalNews, setOpenModalNews] = useState(false);
  const [openModalResource, setOpenModalResource] = useState(false);

  const [openSnack, setOpenSnack] = useState(false);
  const [openNoneClick, setOpenNoneClick] = useState(false);

  const crowdsActiveCheck = projectData?.project.crowdFunding.every(crowdFunding => crowdFunding.activeCheck === false);

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  const projects =
    userContextInfo.user &&
    userContextInfo.user.ownerCompanies.reduce((acc: ProjectTypes[], company) => {
      company.projects.map(project => {
        acc.push(project);
      });
      return acc;
    }, []);
  const notEditableFields =
    projects && projects.filter(project => project.id === Number(props.match.params.projectId)).length === 0;

  const isOwner = !(notEditableFields || notEditableFields === null);

  const classes = useStyles();

  useEffect(() => {
    if (notEditableFields !== null && notEditableFields && !loading && projectData) {
      const filteredPosts = projectData.project.publishedPosts.reduce((acc: PostTypes[], post: PostTypes) => {
        if (post.isApproved) {
          acc.push(post);
        }
        return acc;
      }, []);
      setShownPosts(filteredPosts);
    }
    if (notEditableFields !== null && !notEditableFields && !loading && projectData) {
      setShownPosts(projectData && projectData.project.publishedPosts);
    }
  }, [projectData]);

  useEffect(() => {
    if (projectData && !loading) {
      setProjectIndustrialDirectionsValue(projectData.project.industrialDirections);
      setProjectCatValue(projectData.project.category);
      setProjectTypesValue(projectData.project.projectType);
      setProjectStagesValue(projectData.project.projectStage);
      setProjectSiteValue(projectData.project.projectSite);
      setProjectMarketsValue(projectData.project.projectMarket);
      setProjectTechTypesValue(projectData.project.technologyType);
      setProjectInvestmentsStagesValue(projectData.project.investmentStage);
      setProjectSalesTypesValue(projectData.project.salesType);
      setProjectBusinessModelsValue(projectData.project.businessModel);
      setProjectMainGoalsValue(projectData.project.mainGoal);
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      setFilteredShownPosts(projectData!.project.publishedPosts);
    }
    switch (selectedPostCategory) {
      case 'Новости': {
        const filteredByCategoryPosts = shownPosts.filter((post: PostTypes) => post.isNews === true);
        setFilteredShownPosts(filteredByCategoryPosts);
        break;
      }
      case 'Ресурсы': {
        const filteredByCategoryPosts = shownPosts.filter((post: PostTypes) => post.isResource === true);
        setFilteredShownPosts(filteredByCategoryPosts);
        break;
      }
      case 'Объявления': {
        const filteredByCategoryPosts = shownPosts.filter((post: PostTypes) => post.isOffer === true);
        setFilteredShownPosts(filteredByCategoryPosts);
        break;
      }
    }
  }, [selectedPostCategory, projectData]);

  const handleCrowdOpenClose: () => void = () => {
    setOpenModalCrowd(!openModalCrowd);
  };

  const handleOfferOpenClose: () => void = () => {
    setOpenModalOffer(!openModalOffer);
  };

  const handleNewsOpenClose: () => void = () => {
    setOpenModalNews(!openModalNews);
  };

  const handleResourceOpenClose: () => void = () => {
    setOpenModalResource(!openModalResource);
  };

  const handleOnCompanyClick: () => void = () => {
    history.push(`/company/${projectData!.project.ownerCompany.id}`);
  };

  const handleProjectSiteClick: () => void = () => {
    window.open(`${projectSiteValue}`);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container xs={12} style={{ gap: isTabletOrMobile ? 80 : 200, position: 'relative' }}>
      {openNoneClick ? <NoneClick /> : null}
      <SnackbarOnChange
        openSnack={openSnack}
        setOpenSnack={setOpenSnack}
        textInSnack="Пожалуйста, дождитесь загрузки медиа"
      />
      <Grid container style={{ gap: isTabletOrMobile ? 0 : 50 }}>
        <NavBar text="qwe" />
        <Grid container xs={12} direction={isTabletOrMobile ? 'column-reverse' : 'column'}>
          <Grid container>
            <Grid container xs={10} direction="column" className={classes.projectHeader}>
              {isTabletOrMobile ? null : (
                <Grid container justifyContent="flex-end">
                  {isOwner ? (
                    <>
                      <ProjectEditModal
                        projectId={Number(projectId)}
                        open={openEdit}
                        handleOpenClose={() => setOpenEdit(!openEdit)}
                      />
                      <Button
                        onClick={editButtonHandler}
                        variant="text"
                        startIcon={<EditIcon />}
                        sx={{
                          color: '#AAADB2',
                          fontWeight: 500,
                          fontSize: 18,
                          lineHeight: '100%',
                        }}
                      >
                        Редактировать данные проекта
                      </Button>
                    </>
                  ) : null}
                </Grid>
              )}
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid
                  item
                  xs
                  className={classes.textHeader}
                  style={{
                    color: projectData?.project.updatedVariable?.name && isOwner ? '#24B95C' : 'inherit',
                  }}
                >
                  {projectData?.project.name}
                </Grid>
                {isTabletOrMobile ? (
                  <>
                    {isOwner ? (
                      <Grid item style={{ color: '#AAADB2', gap: 20 }}>
                        <ProjectEditModal
                          projectId={Number(projectId)}
                          open={openEdit}
                          handleOpenClose={() => setOpenEdit(!openEdit)}
                        />
                        <IconButton size="large" color="inherit" aria-label="menu" onClick={editButtonHandler}>
                          <EditIcon />
                        </IconButton>
                      </Grid>
                    ) : null}
                  </>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid
              container
              xs={10}
              direction="row"
              justifyContent="space-between"
              style={{ margin: '30px auto 40px auto' }}
            >
              <Grid item alignItems="center" className={classes.textNameCompany} onClick={handleOnCompanyClick}>
                {projectData && projectData.project.ownerCompany.name}
                <img src={diagonalLink} style={{ marginLeft: 6 }} />
              </Grid>
            </Grid>
          </Grid>
          {/* {isOwner ? ( */}
          <Grid container>
            <ImageSlider
              projectId={Number(projectId)}
              images={
                projectData!.project.updatedVariable?.presentationMedia
                  ? isOwner
                    ? projectData!.project.updatedVariable?.presentationMedia.concat(
                        projectData!.project.presentationMedia,
                      )
                    : projectData!.project.presentationMedia
                  : projectData!.project.presentationMedia
              }
              editableFields={notEditableFields}
              notApprovedImage={projectData!.project.updatedVariable?.presentationMedia ? true : false}
              refetch={refetch}
            />
          </Grid>
          {/* ) : null} */}
        </Grid>
      </Grid>
      <Grid container xs={12} style={{ gap: 190 }}>
        <Grid container xs={isTabletOrMobile ? 12 : 10} style={{ margin: 'auto' }}>
          {isTabletOrMobile ? null : (
            <StickyBox offsetTop={150} style={{ width: '100%', zIndex: 2 }}>
              <SideBarNavigation
              
                isDescription={projectData?.project.description ? true : false}
                // isWorkers={projectData?.project.workers.length > 0 ? true : false}
                isCrowd={projectData?.project.crowdFunding.some(el => el.isApproved) ? true : false}
                isResources={
                  projectData?.project.publishedPosts.some(el => el.isResource && el.isApproved) ? true : false
                }
                isNews={projectData?.project.publishedPosts.some(el => el.isNews && el.isApproved) ? true : false}
                isOwner={isOwner}
              />
            </StickyBox>
          )}
          <Grid container xs={isTabletOrMobile ? 10 : 12} style={{ margin: 'auto' }}>
            <Grid container xs={12} direction="row" justifyContent={isTabletOrMobile ? 'center' : 'flex-end'}>
              <Grid
                container
                xs={isTabletOrMobile ? 12 : 9}
                direction="row"
                style={{ gap: isTabletOrMobile ? 100 : 150 }}
              >
                <Grid container justifyContent="space-between" id="projectData" style={{ gap: 20 }}>
                  {isTabletOrMobile ? (
                    <Grid container alignItems="center" className={classes.navigationProjectHeader}>
                      Данные проекта
                    </Grid>
                  ) : null}
                  <Grid container style={{ gap: 40, marginBottom: 60 }}>
                    {projectSiteValue && (
                      <Grid container>
                        <Grid
                          item
                          alignItems="center"
                          className={classes.textNameCompany}
                          style={{ fontStyle: 'italic' }}
                          onClick={handleProjectSiteClick}
                        >
                          Сайт проекта
                          <img src={diagonalLink} style={{ marginLeft: 6 }} />
                        </Grid>
                      </Grid>
                    )}

                    <Grid className={classes.dataProjectHeader}>Прогресс</Grid>
                    <Grid container columnSpacing={2.5} rowSpacing={4}>
                      <Grid item xl={4} sm={6} xs={12}>
                        <ProgressComponent projectStagesValue={projectStagesValue} />
                      </Grid>
                      {projectInvestmentsStagesValue && (
                        <Grid item xl={4} sm={6} xs={12}>
                          <ProgressComponent projectInvestmentsStagesValue={projectInvestmentsStagesValue} />
                        </Grid>
                      )}
                      {projectSalesTypesValue && (
                        <Grid item xl={4} sm={6} xs={12}>
                          <ProgressComponent projectSalesTypesValue={projectSalesTypesValue} />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                  <Grid container style={{ gap: 40 }}>
                    <Grid className={classes.dataProjectHeader}>Описание</Grid>
                    <Grid container columnSpacing={2.5} rowSpacing={5}>
                      <Grid item sm={4} xs={6}>
                        <DataTextComponent projectIndustrialDirectionsValue={projectIndustrialDirectionsValue} />
                      </Grid>
                      <Grid item sm={4} xs={6}>
                        <DataTextComponent projectTypesValue={projectTypesValue} />
                      </Grid>

                      {projectMarketsValue && (
                        <Grid item sm={4} xs={6}>
                          <DataTextComponent projectMarketsValue={projectMarketsValue} />
                        </Grid>
                      )}

                      {projectTechTypesValue && (
                        <Grid item sm={4} xs={6}>
                          <DataTextComponent projectTechTypesValue={projectTechTypesValue} />
                        </Grid>
                      )}
                      {projectBusinessModelsValue && (
                        <Grid item sm={4} xs={6}>
                          <DataTextComponent projectBusinessModelsValue={projectBusinessModelsValue} />
                        </Grid>
                      )}
                      {projectMainGoalsValue && (
                        <Grid item sm={4} xs={6}>
                          <DataTextComponent projectMainGoalsValue={projectMainGoalsValue} />
                        </Grid>
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  id="howItWorks"
                  justifyContent="flex-end"
                  style={{
                    display: isOwner || projectData?.project.description ? '' : 'none',
                  }}
                >
                  {isTabletOrMobile ? (
                    <Grid container alignItems="center" className={classes.navigationProjectHeader}>
                      Как это работает?
                    </Grid>
                  ) : null}
                  <PostArticleComponent
                    article={projectData!.project.description}
                    postId={projectData!.project.id}
                    isOwner={isOwner}
                    isProject={true}
                  />
                </Grid>

              
                {/* <Grid
                  container
                  direction="column"
                  id="crowdfunding"
                  style={{
                    gap: 30,
                    display: isOwner || projectData?.project.crowdFunding.some(el => el.isApproved) ? '' : 'none',
                  }}
                >
                  <>
                    <Grid
                      container
                      alignItems="center"
                      justifyContent="space-between"
                      className={classes.navigationProjectHeader}
                      style={{ display: isTabletOrMobile ? '' : isOwner && crowdsActiveCheck ? '' : 'none' }}
                    >
                      <Grid item>{isTabletOrMobile ? 'Краудфандинг' : null}</Grid>
                      <Grid item>
                        {isOwner && crowdsActiveCheck ? (
                          <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            className={classes.projectHeaders}
                          >
                            <CreateCrowdfundingModal
                              projectId={Number(projectId)}
                              open={openModalCrowd}
                              handleOpenClose={handleCrowdOpenClose}
                              refetch={refetch}
                            />
                            <Tooltip title="Новый краудфандинг" placement="left">
                              <Button
                                onClick={handleCrowdOpenClose}
                                variant="text"
                                startIcon={<AddIcon />}
                                sx={{
                                  color: isTabletOrMobile ? '#252525' : '#AAADB2',
                                  fontWeight: 500,
                                  fontSize: isTabletOrMobile ? 'clamp(0.813rem, 0.6258rem + 0.8320vw, 1.125rem)' : 18,
                                  lineHeight: '100%',
                                }}
                              >
                                Добавить
                              </Button>
                            </Tooltip>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Grid>
                  </>
                  {isOwner && projectData?.project.crowdFunding.length === 0 ? (
                    <CreateCrowdBlock projectId={Number(projectId)} refetch={refetch} />
                  ) : (
                    <Grid container style={{ gap: 150 }}>
                      {projectData?.project.crowdFunding.map((crowdFunding: CrowdfundingTypes) => (
                        <>
                          {crowdFunding.isApproved || isOwner ? (
                            <Crowdfunding
                              key={crowdFunding.id}
                              id={crowdFunding.id}
                              createdAt={crowdFunding.createdAt}
                              title={crowdFunding.title}
                              shortDescription={crowdFunding.shortDescription}
                              poster={crowdFunding.poster}
                              start={crowdFunding.start}
                              end={crowdFunding.end}
                              goalSum={crowdFunding.goalSum}
                              nowSum={crowdFunding.nowSum}
                              isApproved={crowdFunding.isApproved}
                              activeCheck={crowdFunding.activeCheck}
                              story={crowdFunding.story}
                              tariffs={crowdFunding.tariffs}
                              isOwner={notEditableFields === null || notEditableFields ? false : true}
                              refetch={refetch}
                            />
                          ) : null}
                        </>
                      ))}
                    </Grid>
                  )}
                </Grid> */}

                {isOwner ? null : (
                  <Grid container id="forInvestors" style={{ gap: 30 }}>
                    {isTabletOrMobile ? (
                      <Grid container alignItems="center" className={classes.navigationProjectHeader}>
                        Инвесторам
                      </Grid>
                    ) : null}
                    <BidProject />
                  </Grid>
                )}
                <Grid
                  container
                  id="resources"
                  style={{
                    gap: 30,
                    marginBottom: -60,
                    display:
                      isOwner || projectData?.project.publishedPosts.some(el => el.isResource && el.isApproved)
                        ? ''
                        : 'none',
                  }}
                >
                  {projectData?.project.publishedPosts.some(el => el.isResource) ? (
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      className={classes.navigationProjectHeader}
                    >
                      <Grid item>{isTabletOrMobile ? 'Ресурсы' : null}</Grid>
                      <Grid item>
                        {isOwner ? (
                          <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            className={classes.projectHeaders}
                          >
                            <CreatePostModal
                              projectId={Number(projectId)}
                              open={openModalResource}
                              handleOpenClose={handleResourceOpenClose}
                              isOfferFilter={false}
                              isResourceFilter={true}
                              isNewsFilter={false}
                              isProjectPage
                              refetchOnProjectPage={refetch}
                            />
                            <Tooltip title="Новый ресурс" placement="left">
                              <Button
                                onClick={handleResourceOpenClose}
                                variant="text"
                                startIcon={<AddIcon />}
                                sx={{
                                  color: isTabletOrMobile ? '#252525' : '#AAADB2',
                                  fontWeight: 500,
                                  fontSize: isTabletOrMobile ? 'clamp(0.813rem, 0.6258rem + 0.8320vw, 1.125rem)' : 18,
                                  lineHeight: '100%',
                                }}
                              >
                                Добавить
                              </Button>
                            </Tooltip>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Grid>
                  ) : (
                    <>
                      {isOwner ? (
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          className={classes.postNoPostsBox}
                        >
                          <Grid className={classes.textEmptyBlock}>
                            Сейчас у вас нет публикаций <br /> в разделе &quot;Ресурсы&quot;
                          </Grid>
                          <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            className={classes.projectHeaders}
                          >
                            <CreatePostModal
                              projectId={Number(projectId)}
                              open={openModalResource}
                              handleOpenClose={handleResourceOpenClose}
                              isOfferFilter={false}
                              isResourceFilter={true}
                              isNewsFilter={false}
                              isProjectPage
                              refetchOnProjectPage={refetch}
                            />
                            <MyButton
                              value="Submit"
                              isWhite={true}
                              onClick={handleResourceOpenClose}
                              text="Создать"
                              className={classes.emptyButton}
                            />
                          </Grid>
                        </Grid>
                      ) : null}
                    </>
                  )}

                  <ContentBlock
                    refetch={refetch}
                    selectedPostCategory={selectedPostCategory}
                    setSelectedPostCategory={setSelectedPostCategory}
                    isOwner={notEditableFields === null || notEditableFields ? false : true}
                    contentValues={filteredShownPosts}
                    isNoPostAtUser={projectData?.project.publishedPosts.length === 0}
                    value={'Ресурсы'}
                    ownerId={userContextInfo?.user?.id !== undefined ? userContextInfo.user.id : 0}
                  />
                </Grid>

                <Grid
                  container

                  style={{
                    gap: 30,
                    marginBottom: -40,
                    display:
                      isOwner || projectData?.project.publishedPosts.some(el => el.isOffer && el.isApproved)
                        ? ''
                        : 'none',
                  }}
                >
                  {projectData?.project.publishedPosts.some(el => el.isOffer) ? (
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      className={classes.navigationProjectHeader}
                    >
                      <Grid item>{isTabletOrMobile ? 'Объявления' : null}</Grid>
                      <Grid item>
                        {isOwner ? (
                          <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            className={classes.projectHeaders}
                          >
                            <CreatePostModal
                              projectId={Number(projectId)}
                              open={openModalOffer}
                              handleOpenClose={handleOfferOpenClose}
                              isOfferFilter={true}
                              isResourceFilter={false}
                              isNewsFilter={false}
                              isProjectPage
                              refetchOnProjectPage={refetch}
                            />
                            <Tooltip title="Новое объявление" placement="left">
                              <Button
                                onClick={handleOfferOpenClose}
                                variant="text"
                                startIcon={<AddIcon />}
                                sx={{
                                  color: isTabletOrMobile ? '#252525' : '#AAADB2',
                                  fontWeight: 500,
                                  fontSize: isTabletOrMobile ? 'clamp(0.813rem, 0.6258rem + 0.8320vw, 1.125rem)' : 18,
                                  lineHeight: '100%',
                                }}
                              >
                                Добавить
                              </Button>
                            </Tooltip>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Grid>
                  ) : (
                    <>
                      {isOwner ? (
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          className={classes.postNoPostsBox}
                        >
                          <Grid className={classes.textEmptyBlock}>
                            Сейчас у вас нет публикаций <br /> в разделе &quot;Объявления&quot;
                          </Grid>
                          <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            className={classes.projectHeaders}
                          >
                            <CreatePostModal
                              projectId={Number(projectId)}
                              open={openModalOffer}
                              handleOpenClose={handleOfferOpenClose}
                              isOfferFilter={true}
                              isResourceFilter={false}
                              isNewsFilter={false}
                              isProjectPage
                              refetchOnProjectPage={refetch}
                            />
                            <MyButton
                              value="Submit"
                              isWhite={true}
                              onClick={handleOfferOpenClose}
                              text="Создать"
                              className={classes.emptyButton}
                            />
                          </Grid>
                        </Grid>
                      ) : null}
                    </>
                  )}

                  <ContentBlock
                    refetch={refetch}
                    selectedPostCategory={selectedPostCategory}
                    setSelectedPostCategory={setSelectedPostCategory}
                    isOwner={notEditableFields === null || notEditableFields ? false : true}
                    contentValues={filteredShownPosts}
                    isNoPostAtUser={projectData?.project.publishedPosts.length === 0}
                    value={'Объявления'}
                    ownerId={userContextInfo?.user?.id !== undefined ? userContextInfo.user.id : 0}
                  />
                </Grid>

                <Grid
                  container
                  id="news"
                  style={{
                    gap: 30,
                    marginBottom: -60,
                    display:
                      isOwner || projectData?.project.publishedPosts.some(el => el.isNews && el.isApproved)
                        ? ''
                        : 'none',
                  }}
                >
                  {projectData?.project.publishedPosts.some(el => el.isNews) ? (
                    <Grid
                      container
                      justifyContent="space-between"
                      alignItems="center"
                      className={classes.navigationProjectHeader}
                    >
                      <Grid item>{isTabletOrMobile ? 'Новости' : null}</Grid>

                      <Grid item>
                        {isOwner ? (
                          <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            className={classes.projectHeaders}
                          >
                            <CreatePostModal
                              projectId={Number(projectId)}
                              open={openModalNews}
                              handleOpenClose={handleNewsOpenClose}
                              isOfferFilter={false}
                              isResourceFilter={false}
                              isNewsFilter={true}
                              isProjectPage
                              refetchOnProjectPage={refetch}
                            />
                            <Tooltip title="Новость" placement="left">
                              <Button
                                onClick={handleNewsOpenClose}
                                variant="text"
                                startIcon={<AddIcon />}
                                sx={{
                                  color: isTabletOrMobile ? '#252525' : '#AAADB2',
                                  fontWeight: 500,
                                  fontSize: isTabletOrMobile ? 'clamp(0.813rem, 0.6258rem + 0.8320vw, 1.125rem)' : 18,
                                  lineHeight: '100%',
                                }}
                              >
                                Добавить
                              </Button>
                            </Tooltip>
                          </Grid>
                        ) : null}
                      </Grid>
                    </Grid>
                  ) : (
                    <>
                      {isOwner ? (
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          className={classes.postNoPostsBox}
                        >
                          <Grid className={classes.textEmptyBlock}>
                            Сейчас у вас нет публикаций <br /> в разделе &quot;Новости&quot;
                          </Grid>
                          <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            className={classes.projectHeaders}
                          >
                            <CreatePostModal
                              projectId={Number(projectId)}
                              open={openModalNews}
                              handleOpenClose={handleNewsOpenClose}
                              isOfferFilter={false}
                              isResourceFilter={false}
                              isNewsFilter={true}
                              isProjectPage
                              refetchOnProjectPage={refetch}
                            />
                            <MyButton
                              value="Submit"
                              isWhite={true}
                              onClick={handleNewsOpenClose}
                              text="Создать"
                              className={classes.emptyButton}
                            />
                          </Grid>
                        </Grid>
                      ) : null}
                    </>
                  )}

                  <ContentBlock
                    refetch={refetch}
                    selectedPostCategory={selectedPostCategory}
                    setSelectedPostCategory={setSelectedPostCategory}
                    isOwner={notEditableFields === null || notEditableFields ? false : true}
                    contentValues={filteredShownPosts}
                    isNoPostAtUser={projectData?.project.publishedPosts.length === 0}
                    value={'Новости'}
                    ownerId={userContextInfo?.user?.id !== undefined ? userContextInfo.user.id : 0}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Footer footerMobileTopIdent={70} />
    </Grid>
  );
};

export default ProjectPage;
