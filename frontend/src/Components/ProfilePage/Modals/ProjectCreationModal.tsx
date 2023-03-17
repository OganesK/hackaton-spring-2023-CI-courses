/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/ban-ts-comment*/
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, OutlinedInput, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import Button from '../../UI/Buttons/OutlinedButton/Button';
import AutoCompleteSearchFieldForCompany from '../../UI/AutoCompleteSearchFields/AutoCompleteSearchFieldForCompany';
import NoneClick from '../../UI/NoneClickableField/NoneClick';
import SnackbarOnChange from '../../UI/Snackbar/Snackbar';
import { ModalImage, ModalImageContainer } from '../../UI/Styles/TS/Style';
import useStyles from '../../UI/Styles/TS/Components/createModalStyles/index';

import imgModalDefault from '../../../assets/img/imgModal.svg';

import { CreateProjectMutation, GetUrlToUploadMedia } from '../graphql/mutations';
import { GET_COMPANIES_QUERY } from '../graphql/query';
import { CompaniesDataQueryTypes } from '../graphql/typing';
import { ProjectCreateModalProps } from './typings';

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

import { useQuery } from '@apollo/client';

import { categoriesArray } from '../../../helpers/constants/categories';
import { useTranslate } from '../../../helpers/hooks/useTranslateCategories';

const ProjectCreationModal: (props: ProjectCreateModalProps) => JSX.Element = (props: ProjectCreateModalProps) => {
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

  const [companyIdValue, setCompanyIdValue] = useState<string | null>('');

  const [imgModal, setImgModal] = useState(imgModalDefault);

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const { data: companyData } = useQuery<CompaniesDataQueryTypes>(GET_COMPANIES_QUERY);

  const createProjectHandler = CreateProjectMutation();
  const GetUrlToUploadProjectPoster = GetUrlToUploadMedia();

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
      activityTypeValue &&
      (props.ownerId === 0 ? companyIdValue : props.ownerId) &&
      projectIndustrialDirectionsValue &&
      projectTypesValue &&
      projectStagesValue
    ) {
      setOpenNoneClick(true);
      const newProjectData = {
        name: nameValue,
        shortDescription: shortDescriptionValue,
        category: activityTypeValue,
        ownerCompany:
          props.ownerId === 0
            ? Number(companyData?.companies.filter(company => company.name === companyIdValue)[0].id)
            : props.ownerId,
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
      const projectId = await createProjectHandler(newProjectData);
      if (posterValue.size !== 0) {
        const PosterData = {
          entityType: 'projectPoster',
          entityId: projectId?.data?.createOneProject?.id,
          fileType: posterValue.type,
        };
        const uploadUrl = (await GetUrlToUploadProjectPoster(PosterData)).data;
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

      if (props.isProfilePage) {
        await props.refetchOnProfilePage!();
      } else {
        await props.refetchOnCompanyPage!();
      }

      setNameValue('');
      setShortDescriptionValue('');
      setPosterValue({
        name: '',
        type: '',
        size: 0,
      });
      setImgModal(imgModalDefault);
      setActivityTypeValue('business');

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

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });
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
            Создание проекта
          </Grid>
          {props.ownerId === 0 ? (
            <Grid container direction="row" className={styles.inputContainerGap}>
              <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
                Прикрепите компанию
              </Grid>
              <Grid container xs>
                <AutoCompleteSearchFieldForCompany
                  projectId="100500"
                  value={companyIdValue}
                  setValue={setCompanyIdValue}
                />
              </Grid>
            </Grid>
          ) : null}
          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Название проекта
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={nameValue}
                value={nameValue}
                placeholder={isTabletOrMobile ? '*' : 'Название проекта *'}
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
              Краткое описание
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={shortDescriptionValue}
                value={shortDescriptionValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setShortDescriptionValue(e.target.value)}
                placeholder={isTabletOrMobile ? '*' : 'Краткое описание проекта *'}
                inputProps={{
                  maxLength: 128,
                }}
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Категория проекта*
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
              Индустриальное направление проекта*
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
              Тип проекта*
            </Grid>
            <Grid container md={5} xs={12}>
              <Select value={projectTypesValue} onChange={handleChangeProjectType} fullWidth size="small">
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
              Стадия проекта*
            </Grid>
            <Grid container md={5} xs={12}>
              <Select value={projectStagesValue} onChange={handleChangeProjectStage} fullWidth size="small">
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
              Рынки проекта
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
              Сквозные технологии
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
              Стадия инвестирования
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
              Уровень продаж
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
              Бизнес-модель
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
              Задачи проекта
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
                placeholder={isTabletOrMobile ? '' : 'Ссылка на сайт проекта (если есть)'}
                inputProps={{
                  maxLength: 512,
                }}
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} className={styles.modalHeaderText}>
              Обложка проекта
            </Grid>
            <Grid container xs direction="column" style={{ gap: 15 }}>
              {isTabletOrMobile ? null : <Grid>Выберете изображение для постера вашего проекта</Grid>}
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
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap} style={{ marginTop: 30 }}>
            <Grid container xs={12} alignItems="center" className={styles.imgConditionText}>
              Полное описание добавляется отдельно после создания. Вы сможете прикрепить все необходимые медиа-файлы.
              <br />
              Поля, отмеченные звездочкой (*), обязательны к заполнению.
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

export default ProjectCreationModal;
