/* eslint-disable @typescript-eslint/ban-ts-comment*/
import React, { useState } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Grid, OutlinedInput } from '@mui/material';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import DateTimePicker from 'react-datetime-picker';

import { CreateCrowdfundingMutation } from '../graphql/mutations';
import Button from '../../UI/Buttons/OutlinedButton/Button';
import NoneClick from '../../UI/NoneClickableField/NoneClick';
import SnackbarOnChange from '../../UI/Snackbar/Snackbar';
import useStyles from '../../UI/Styles/TS/Components/createModalStyles/index';

import { CrowdfundingCreateModalProps } from './graphql/typing';

const CreateCrowdfundingModal: (props: CrowdfundingCreateModalProps) => JSX.Element = (
  props: CrowdfundingCreateModalProps,
) => {
  const styles = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });

  const CrowdfundingCreationHandler = CreateCrowdfundingMutation();
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [startDateValue, setStartDateValue] = useState(new Date());
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 3);
  const [endDateValue, setEndDateValue] = useState(endDate);

  const [goalSumValue, setGoalSumValue] = useState('');

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const onClickHandler: () => Promise<void> = async () => {
    if (nameValue && descriptionValue && startDateValue && endDateValue && goalSumValue) {
      setOpenNoneClick(true);
      const newCrowdfundingData = {
        title: nameValue,
        shortDescription: descriptionValue,
        start: startDateValue,
        end: endDateValue,
        goalSum: parseFloat(Number(goalSumValue).toFixed(2)),
        projectId: props.projectId,
      };
      await CrowdfundingCreationHandler(newCrowdfundingData);
      props.handleOpenClose();

      await props.refetch();

      setNameValue('');
      setDescriptionValue('');
      setStartDateValue(new Date());
      setEndDateValue(endDate);
      setGoalSumValue('');

      setOpenNoneClick(false);
    } else {
      setOpenSnack(true);
      setTimeout(() => setOpenSnack(false), 4000);
    }
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
          Создание краудфандинга
        </Grid>
        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Название
          </Grid>
          <Grid container xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={nameValue}
              value={nameValue}
              placeholder={isTabletOrMobile ? '*' : 'Название краудфандинга *'}
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
          <Grid item xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={descriptionValue}
              value={descriptionValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescriptionValue(e.target.value)}
              placeholder={isTabletOrMobile ? '*' : 'Краткое описание краудфандинга *'}
              inputProps={{
                maxLength: 128,
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Дата начала
          </Grid>
          <Grid container xs>
            <Grid container md={7} xs={12}>
              <DateTimePicker
                onChange={setStartDateValue}
                value={startDateValue}
                className={styles.dateTime}
                disableClock
                format="dd.MM.y"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Дата окончания
          </Grid>
          <Grid container xs>
            <Grid container md={7} xs={12}>
              <DateTimePicker
                onChange={setEndDateValue}
                value={endDateValue}
                className={styles.dateTime}
                disableClock
                format="dd.MM.y"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Планируемая сумма сбора
          </Grid>
          <Grid item xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={goalSumValue}
              value={goalSumValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setGoalSumValue(e.target.value)}
              placeholder={isTabletOrMobile ? '*' : 'Сумма сбора средств *'}
              type="number"
              inputProps={{
                inputMode: 'numeric',
                pattern: '[0-9]*',
                step: '0.01',
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap} style={{ marginTop: 30 }}>
          <Grid container xs={12} alignItems="center" className={styles.modalHeaderText}>
            Полное описание добавляется отдельно после создания. Вы сможете прикрепить все необходимые медиа-файлы.
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
  );
};

export default CreateCrowdfundingModal;
