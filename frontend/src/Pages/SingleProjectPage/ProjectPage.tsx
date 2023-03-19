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
  } = useQuery<{ course: ProjectTypes }>(GET_PROJECT_QUERY, {
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


  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  const [courses, setCourses] = useState([]) 


  const classes = useStyles();



  useEffect(() => {
    switch (selectedPostCategory) {
      case 'Уроки': {
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
                  {true ? (
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
                        Редактировать данные курса
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
                    color: '#24B95C',
                  }}
                >
                  {projectData?.course.name}
                </Grid>
                {isTabletOrMobile ? (
                  <>
                    {true ? (
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
                <img src={diagonalLink} style={{ marginLeft: 6 }} />
              </Grid>
            </Grid>
          </Grid>
          {/* {isOwner ? ( */}
          <Grid container>
            <ImageSlider
              projectId={Number(projectId)}
              images={[]}
              editableFields={false}
              notApprovedImage={false}
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
              
                isDescription={false}
                // isWorkers={projectData?.project.workers.length > 0 ? true : false}
                isCrowd={false}
                isResources={true}
                isNews={false}
                isOwner={true}
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
                      Данные курса
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
                          Сайт курса
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
                    display:'',
                  }}
                >
                  {isTabletOrMobile ? (
                    <Grid container alignItems="center" className={classes.navigationProjectHeader}>
                      Как это работает?
                    </Grid>
                  ) : null}
                  <PostArticleComponent
                    article={projectData!.course.description}
                    postId={projectData!.course.id}
                    isOwner={true}
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

                {true ? null : (
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
                    display: ''
                  }}
                >
                  
                    <>
                      {true ? (
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

                  <ContentBlock
                    selectedPostCategory={selectedPostCategory}
                    setSelectedPostCategory={setSelectedPostCategory}
                    isOwner={true}
                    contentValues={filteredShownPosts}
                    isNoPostAtUser={true}
                    value={'Ресурсы'}
                    ownerId={userContextInfo?.user?.id !== undefined ? userContextInfo.user.id : 0}
                  />
                </Grid>

                <Grid
                  container

                  style={{
                    gap: 30,
                    marginBottom: -40,
                    display:''
                  }}
                >
                  
                    <>
                      {true ? (
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

                  <ContentBlock
                    selectedPostCategory={selectedPostCategory}
                    setSelectedPostCategory={setSelectedPostCategory}
                    isOwner={true}
                    contentValues={filteredShownPosts}
                    isNoPostAtUser={true}
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
                    display:''
                  }}
                >
                  
                    <>
                      {true ? (
                        <Grid
                          container
                          direction="column"
                          justifyContent="center"
                          alignItems="center"
                          className={classes.postNoPostsBox}
                        >
                          <Grid className={classes.textEmptyBlock}>
                            Сейчас у вас нет публикаций <br /> в разделе &quot;уроки&quot;
                          </Grid>
                          <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                            className={classes.projectHeaders}
                          >
                          
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

                  <ContentBlock
                    selectedPostCategory={selectedPostCategory}
                    setSelectedPostCategory={setSelectedPostCategory}
                    isOwner={true}
                    contentValues={filteredShownPosts}
                    isNoPostAtUser={true}
                    value={'Уроки'}
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
