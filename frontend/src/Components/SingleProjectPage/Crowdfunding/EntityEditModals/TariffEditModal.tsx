/* eslint-disable @typescript-eslint/ban-ts-comment*/
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, OutlinedInput } from '@mui/material';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import { useQuery } from '@apollo/client';

import NoneClick from '../../../UI/NoneClickableField/NoneClick';
import Button from '../../../UI/Buttons/OutlinedButton/Button';
import SnackbarOnChange from '../../../UI/Snackbar/Snackbar';
import useStyles from '../../../UI/Styles/TS/Components/createModalStyles/index';

import { GET_TARIFF_QUERY } from './graphql/query';
import { TariffTypes, TariffEditModalProps } from './graphql/typings';
import { UpdateTariffMutation } from './graphql/mutation';

const TariffEditModal: (props: TariffEditModalProps) => JSX.Element = (props: TariffEditModalProps) => {
  const styles = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });

  const { data, loading, refetch } = useQuery<{ crowdFunding: TariffTypes }>(GET_TARIFF_QUERY, {
    variables: { id: Number(props.crowdId) },
  });

  const updateTariffHandler = UpdateTariffMutation();

  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [priceValue, setPriceValue] = useState<number | string>(0);

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    if (!loading && data) {
      setNameValue(props.title);
      setDescriptionValue(props.description);
      setPriceValue(props.price);
    }
  }, [loading]);

  const onClickHandler: () => Promise<void> = async () => {
    if (nameValue && descriptionValue && priceValue) {
      setOpenNoneClick(true);

      const newTariffData = {
        title: nameValue,
        description: descriptionValue,
        price: parseFloat(Number(priceValue).toFixed(2)),
        tariffId: props.tariffId,
      };
      await updateTariffHandler(newTariffData);

      props.handleOpenClose();
      await refetch();
      setOpenNoneClick(false);
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
            Редактирование тарифа
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
                placeholder={isTabletOrMobile ? '*' : 'Название тарифа *'}
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
              Изменить описание
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={descriptionValue}
                value={descriptionValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setDescriptionValue(e.target.value)}
                placeholder={isTabletOrMobile ? '*' : 'Описание тарифа *'}
                inputProps={{
                  maxLength: 128,
                }}
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Изменить цену
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={priceValue}
                value={priceValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPriceValue(e.target.value)}
                placeholder={isTabletOrMobile ? '*' : 'Цена тарифа *'}
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

export default TariffEditModal;
