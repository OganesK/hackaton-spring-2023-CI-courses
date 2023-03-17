/* eslint-disable @typescript-eslint/ban-ts-comment*/
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, OutlinedInput } from '@mui/material';

import DateTimePicker from 'react-datetime-picker';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { useQuery } from '@apollo/client';

import NoneClick from '../../../UI/NoneClickableField/NoneClick';
import Button from '../../../UI/Buttons/OutlinedButton/Button';
import SnackbarOnChange from '../../../UI/Snackbar/Snackbar';
import useStyles from '../../../UI/Styles/TS/Components/createModalStyles/index';

import { GET_CROWDFUNDING_QUERY } from './graphql/query';
import { CrowdfundingTypes, CrowdfundingEditModalProps } from './graphql/typings';
import { UpdateCrowdMutation } from './graphql/mutation';

const CrowdfundingEditModal: (props: CrowdfundingEditModalProps) => JSX.Element = (
  props: CrowdfundingEditModalProps,
) => {
  const styles = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });

  const { data, loading, refetch } = useQuery<{ crowdFunding: CrowdfundingTypes }>(GET_CROWDFUNDING_QUERY, {
    variables: { id: Number(props.crowdId) },
  });

  const updateCrowdHandler = UpdateCrowdMutation();

  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [startDateValue, setStartDateValue] = useState<Date>(new Date());
  const [endDateValue, setEndDateValue] = useState<Date>(new Date());
  const [goalSumValue, setGoalSumValue] = useState<number | string>(0);

  const [openSnack, setOpenSnack] = useState(false);
  const [openNoneClick, setOpenNoneClick] = useState(false);

  useEffect(() => {
    if (!loading && data) {
      setNameValue(data.crowdFunding.title);
      setDescriptionValue(data.crowdFunding.shortDescription);
      setStartDateValue(new Date(data.crowdFunding.start));
      setEndDateValue(new Date(data.crowdFunding.end));
      setGoalSumValue(data.crowdFunding.goalSum);
    }
  }, [loading]);

  const onClickHandler: () => Promise<void> = async () => {
    if (nameValue && descriptionValue && startDateValue && endDateValue && goalSumValue) {
      setOpenNoneClick(true);

      const newCrowdfundingData = {
        title: nameValue,
        shortDescription: descriptionValue,
        start: startDateValue,
        end: endDateValue,
        goalSum: parseFloat(Number(goalSumValue).toFixed(2)),
        crowdFundingId: props.crowdId,
      };
      await updateCrowdHandler(newCrowdfundingData);
      props.handleOpenClose();
      await refetch();
      setOpenNoneClick(false);
    } else {
      setOpenSnack(true);
      setTimeout(() => setOpenSnack(false), 4000);
    }
  };

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
            Редактирование краудфандинга
          </Grid>
          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Изменить название
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
              Изменить краткое описание
            </Grid>
            <Grid container xs>
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
                  // calendarIcon={<img src={calendar} />}
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
              Изменить сумму сбора
            </Grid>
            <Grid container xs>
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
    </div>
  );
};

export default CrowdfundingEditModal;
