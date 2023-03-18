/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment*/
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, OutlinedInput, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { useQuery } from '@apollo/client';

import NoneClick from '../../UI/NoneClickableField/NoneClick';
import Button from '../../UI/Buttons/OutlinedButton/Button';
import SnackbarOnChange from '../../UI/Snackbar/Snackbar';
import useStyles from '../../UI/Styles/TS/Components/createModalStyles/index';
import { ModalImage, ModalImageContainer } from '../../UI/Styles/TS/Style';

import imgModalDefault from '../../../assets/img/imgModal.svg';

import {
  projectIndustrialDirections,
  projectTypes,
  projectStages,
  projectMarkets,
  projectTechTypes,
  projectInvestmentsStages,
  projectSalesTypes,
  projectBusinessModels,
  projectMainGoals,
} from '../../../helpers/constants/projectEnums';

import {
  useTranslateIndustrialDirections,
  useTranslateTypes,
  useTranslateStages,
  useTranslateTechTypes,
  useTranslateInvestmentsStages,
  useTranslateSalesTypes,
  useTranslateMainGoals,
} from '../../../helpers/hooks/useTranslateProjectProps';

import { GET_PROJECT_QUERY } from './graphql/query';
import { ProjectEditTypes, ProjectEditModalProps } from './graphql/typing';
import { UpdateProjectMutation, GetUrlToUploadProjectPoster } from './graphql/mutations';

import { categoriesArray } from '../../../helpers/constants/categories';
import { useTranslate } from '../../../helpers/hooks/useTranslateCategories';

const ProjectEditModal: (props: ProjectEditModalProps) => JSX.Element = (props: ProjectEditModalProps) => {
  const styles = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });

  const { data, loading, refetch } = useQuery<{ project: ProjectEditTypes }>(GET_PROJECT_QUERY, {
    variables: { id: props.projectId },
  });

  const updateProjectHandler = UpdateProjectMutation();
  const UrlToUploadPosterHandler = GetUrlToUploadProjectPoster();

  const [nameValue, setNameValue] = useState('');
  const [posterValue, setPosterValue] = useState<{
    name: string;
    size: number;
    type: string;
  }>({
    name: '',
    type: '',
    size: 0,
  });
  const [shortDescriptionValue, setShortDescriptionValue] = useState('');
  const [activityTypeValue, setActivityTypeValue] = useState('business');
  const [projectIndustrialDirectionsValue, setProjectIndustrialDirectionsValue] = useState('');
  const [projectTypesValue, setProjectTypesValue] = useState('notDefined');
  const [projectStagesValue, setProjectStagesValue] = useState('');
  const [projectSiteValue, setProjectSiteValue] = useState('');
  const [projectMarketsValue, setProjectMarketsValue] = useState('');
  const [projectTechTypesValue, setProjectTechTypesValue] = useState('');
  const [projectInvestmentsStagesValue, setProjectInvestmentsStagesValue] = useState('');
  const [projectSalesTypesValue, setProjectSalesTypesValue] = useState('');
  const [projectBusinessModelsValue, setProjectBusinessModelsValue] = useState('');
  const [projectMainGoalsValue, setProjectMainGoalsValue] = useState('');

  const [imgModal, setImgModal] = useState(imgModalDefault);

  const [openSnack, setOpenSnack] = useState(false);
  const [openNoneClick, setOpenNoneClick] = useState(false);

  useEffect(() => {
    if (!loading && data) {
      console.log(data.project);
      setNameValue(data.project.name);
      setShortDescriptionValue(data.project.shortDescription);
      setActivityTypeValue(data.project.category);
      setProjectIndustrialDirectionsValue(data.project.industrialDirections);
      setProjectTypesValue(data.project.projectType);
      setProjectStagesValue(data.project.projectStage);
      setProjectSiteValue(data.project.projectSite);
      setProjectMarketsValue(data.project.projectMarket);
      setProjectTechTypesValue(data.project.technologyType);
      setProjectInvestmentsStagesValue(data.project.investmentStage);
      setProjectSalesTypesValue(data.project.salesType);
      setProjectBusinessModelsValue(data.project.businessModel);
      setProjectMainGoalsValue(data.project.mainGoal);

      setImgModal(data.project.poster.link);
    }
  }, [loading]);

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setActivityTypeValue(event.target.value);
  };

  const handleChangeProjectIndustry = (event: SelectChangeEvent) => {
    setProjectIndustrialDirectionsValue(event.target.value);
  };

  const handleChangeProjectType = (event: SelectChangeEvent) => {
    setProjectTypesValue(event.target.value);
  };

  const handleChangeProjectStage = (event: SelectChangeEvent) => {
    setProjectStagesValue(event.target.value);
  };

  const handleChangeProjectMarket = (event: SelectChangeEvent) => {
    setProjectMarketsValue(event.target.value);
  };

  const handleChangeProjectTechType = (event: SelectChangeEvent) => {
    setProjectTechTypesValue(event.target.value);
  };

  const handleChangeProjectInvestments = (event: SelectChangeEvent) => {
    setProjectInvestmentsStagesValue(event.target.value);
  };

  const handleChangeProjectSalesType = (event: SelectChangeEvent) => {
    setProjectSalesTypesValue(event.target.value);
  };

  const handleChangeProjectBM = (event: SelectChangeEvent) => {
    setProjectBusinessModelsValue(event.target.value);
  };

  const handleChangeProjectMainGoal = (event: SelectChangeEvent) => {
    setProjectMainGoalsValue(event.target.value);
  };

  const onClickHandler: () => Promise<void> = async () => {
    if (
      nameValue &&
      shortDescriptionValue &&
      projectIndustrialDirectionsValue &&
      projectTypesValue &&
      projectStagesValue
    ) {
      setOpenNoneClick(true);

      const newProjectData = {
        name: nameValue,
        shortDescription: shortDescriptionValue,
        category: activityTypeValue,
        projectId: props.projectId,
        industrialDirections: projectIndustrialDirectionsValue,
        projectType: projectTypesValue,
        projectStage: projectStagesValue,
        ...(projectSiteValue && { projectSite: projectSiteValue }),
        ...(projectMarketsValue && { projectMarket: projectMarketsValue }),
        ...(projectTechTypesValue && { technologyType: projectTechTypesValue }),
        ...(projectInvestmentsStagesValue && { investmentStage: projectInvestmentsStagesValue }),
        ...(projectSalesTypesValue && { salesType: projectSalesTypesValue }),
        ...(projectBusinessModelsValue && { businessModel: projectBusinessModelsValue }),
        ...(projectMainGoalsValue && { mainGoal: projectMainGoalsValue }),
      };
      await updateProjectHandler(newProjectData);
      if (posterValue.size !== 0) {
        const PosterData = {
          entityType: 'projectPoster',
          entityId: props.projectId,
          fileType: posterValue.type,
        };
        const uploadUrl = await UrlToUploadPosterHandler(PosterData);
        await fetch(uploadUrl.data!.createMedia?.signedURL, {
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
    setPosterValue(fileUploaded);
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
          Редактирование курса
        </Grid>
        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать название
          </Grid>
          <Grid container xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={nameValue}
              value={nameValue}
              placeholder={isTabletOrMobile ? '*' : 'Название курса *'}
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
            Редактировать краткое описание
          </Grid>
          <Grid container xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={shortDescriptionValue}
              value={shortDescriptionValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setShortDescriptionValue(e.target.value)}
              placeholder={isTabletOrMobile ? '*' : 'Краткое описание курса *'}
              inputProps={{
                maxLength: 128,
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать категорию курса
          </Grid>
          <Grid container md={5} xs={12}>
            <Select value={activityTypeValue} onChange={handleChangeCategory} fullWidth size="small">
              {categoriesArray
                .filter(cat => {
                  if (cat.split(',').pop() === 'Все') {
                    return false;
                  }
                  return true;
                })
                .map(cat => (
                  <MenuItem key={cat} value={cat}>
                    {useTranslate(cat)}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать индустриальное направление
          </Grid>
          <Grid container md={5} xs={12}>
            <Select
              value={projectIndustrialDirectionsValue}
              onChange={handleChangeProjectIndustry}
              fullWidth
              size="small"
            >
              {projectIndustrialDirections.map(industry => (
                <MenuItem key={industry} value={industry}>
                  {useTranslateIndustrialDirections(industry)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать тип курса
          </Grid>
          <Grid container md={5} xs={12}>
            <Select value={projectTypesValue} onChange={handleChangeProjectType} fullWidth size="small">
              <MenuItem value="" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                Отменить выбор
              </MenuItem>
              {projectTypes.map(type => (
                <MenuItem key={type} value={type}>
                  {useTranslateTypes(type)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать стадию курса
          </Grid>
          <Grid container md={5} xs={12}>
            <Select value={projectStagesValue} onChange={handleChangeProjectStage} fullWidth size="small">
              <MenuItem value="" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                Отменить выбор
              </MenuItem>
              {projectStages.map(stage => (
                <MenuItem key={stage} value={stage}>
                  {useTranslateStages(stage)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать рынки курса
          </Grid>
          <Grid container md={5} xs={12}>
            <Select value={projectMarketsValue} onChange={handleChangeProjectMarket} fullWidth size="small">
              <MenuItem value="" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                Отменить выбор
              </MenuItem>
              {projectMarkets.map(market => (
                <MenuItem key={market} value={market}>
                  {market}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать сквозные технологии
          </Grid>
          <Grid container md={5} xs={12}>
            <Select value={projectTechTypesValue} onChange={handleChangeProjectTechType} fullWidth size="small">
              <MenuItem value="" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                Отменить выбор
              </MenuItem>
              {projectTechTypes.map(tech => (
                <MenuItem key={tech} value={tech}>
                  {useTranslateTechTypes(tech)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать стадию инвестирования
          </Grid>
          <Grid container md={5} xs={12}>
            <Select
              value={projectInvestmentsStagesValue}
              onChange={handleChangeProjectInvestments}
              fullWidth
              size="small"
            >
              <MenuItem value="" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                Отменить выбор
              </MenuItem>
              {projectInvestmentsStages.map(investments => (
                <MenuItem key={investments} value={investments}>
                  {useTranslateInvestmentsStages(investments)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать уровень продаж
          </Grid>
          <Grid container md={5} xs={12}>
            <Select value={projectSalesTypesValue} onChange={handleChangeProjectSalesType} fullWidth size="small">
              <MenuItem value="" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                Отменить выбор
              </MenuItem>
              {projectSalesTypes.map(sales => (
                <MenuItem key={sales} value={sales}>
                  {useTranslateSalesTypes(sales)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать бизнес-модель
          </Grid>
          <Grid container md={5} xs={12}>
            <Select value={projectBusinessModelsValue} onChange={handleChangeProjectBM} fullWidth size="small">
              <MenuItem value="" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                Отменить выбор
              </MenuItem>
              {projectBusinessModels.map(business => (
                <MenuItem key={business} value={business}>
                  {business}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Редактировать задачи курса
          </Grid>
          <Grid container md={5} xs={12}>
            <Select value={projectMainGoalsValue} onChange={handleChangeProjectMainGoal} fullWidth size="small">
              <MenuItem value="" style={{ fontWeight: 'bold', fontStyle: 'italic' }}>
                Отменить выбор
              </MenuItem>
              {projectMainGoals.map(goal => (
                <MenuItem key={goal} value={goal}>
                  {useTranslateMainGoals(goal)}
                </MenuItem>
              ))}
            </Select>
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Ссылка на сайт
          </Grid>
          <Grid container xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={projectSiteValue}
              value={projectSiteValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setProjectSiteValue(e.target.value)}
              placeholder={isTabletOrMobile ? '' : 'Ссылка на сайт курса (если есть)'}
              inputProps={{
                maxLength: 512,
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} className={styles.modalHeaderText}>
            Редактировать обложку курса
          </Grid>
          <Grid container xs direction="column" style={{ gap: 15 }}>
            {isTabletOrMobile ? null : <Grid>Выберете изображение для постера вашего курса</Grid>}
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

export default ProjectEditModal;
