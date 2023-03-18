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
  const [projectTypesValue, setProjectTypesValue] = useState('notDefined');


  const [imgModal, setImgModal] = useState(imgModalDefault);

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const { data: companyData } = useQuery<CompaniesDataQueryTypes>(GET_COMPANIES_QUERY);

  const createProjectHandler = CreateProjectMutation();
  const GetUrlToUploadProjectPoster = GetUrlToUploadMedia();

  const handleChangeCategory = (event: SelectChangeEvent) => {
    setActivityTypeValue(event.target.value);
  };

  const handleChangeProjectType = (event: SelectChangeEvent) => {
    setProjectTypesValue(event.target.value);
  };


  const onClickHandler: () => Promise<void> = async () => {
    const data = {
      name: nameValue,
      shortDescription: shortDescriptionValue,
      category: activityTypeValue,
      courseType: projectTypesValue,
      ownerID: 1
    }

    await createProjectHandler(data)
    props.handleOpenClose()
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
            Создание курса
          </Grid>
          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Название курса
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
              Краткое описание
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
              Категория курса*
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
              Тип курса*
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
            <Grid container md={3} xs={12} className={styles.modalHeaderText}>
              Обложка курса
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
