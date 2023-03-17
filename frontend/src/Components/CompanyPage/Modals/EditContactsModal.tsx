import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, OutlinedInput } from '@mui/material';

import { useQuery } from '@apollo/client';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import NoneClick from '../../UI/NoneClickableField/NoneClick';
import SnackbarOnChange from '../../UI/Snackbar/Snackbar';
import Button from '../../UI/Buttons/OutlinedButton/Button';

import { UpdateContactsMutation } from '../mutation';
import { EditContactsModalProps, ContactTypes } from './graphql/typing';
import { GET_CONTACTS_QUERY } from './graphql/query';

import useStyles from '../../UI/Styles/TS/Components/createModalStyles/index';

const EditContactsModal: (props: EditContactsModalProps) => JSX.Element = (props: EditContactsModalProps) => {
  const { data, loading } = useQuery<{ contact: ContactTypes }>(GET_CONTACTS_QUERY, {
    variables: { id: Number(props.contactId) },
  });

  const [phoneValue, setPhoneValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const updateContactsHandler = UpdateContactsMutation();

  useEffect(() => {
    if (!loading && data) {
      setPhoneValue(data.contact.phones.join(' | '));
      setAddressValue(data.contact.adresses.join(' | '));
      setEmailValue(data.contact.emails.join(' | '));
    }
  }, [loading]);

  const onClickHandler: () => Promise<void> = async () => {
    if (emailValue && addressValue && phoneValue) {
      setOpenNoneClick(true);
      const newContactData = {
        emails: emailValue.split('|'),
        adresses: addressValue.split('|'),
        phones: phoneValue.split('|'),
        contactId: props.contactId,
      };
      await updateContactsHandler(newContactData)
        .then(() => {
          props.handleOpenClose();
        })
        .catch(err => {
          console.error(err);
        });
      await props.refetch();
      setOpenNoneClick(false);
    } else {
      setOpenSnack(true);
      setTimeout(() => setOpenSnack(false), 4000);
    }
  };

  const styles = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });

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
            Редактирование контактов
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid
              container
              md={3}
              xs={12}
              className={styles.modalHeaderText}
              style={{ paddingTop: isTabletOrMobile ? 0 : 10 }}
            >
              Номера телефонов через знак &quot; | &quot;
            </Grid>
            <Grid item xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={phoneValue}
                value={phoneValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setPhoneValue(e.target.value)}
                placeholder={isTabletOrMobile ? '*' : 'Номера *'}
                size="small"
                multiline
                maxRows={7}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid
              container
              md={3}
              xs={12}
              className={styles.modalHeaderText}
              style={{ paddingTop: isTabletOrMobile ? 0 : 10 }}
            >
              Электронные адреса через знак &quot; | &quot;
            </Grid>
            <Grid item xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={emailValue}
                value={emailValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmailValue(e.target.value)}
                placeholder={isTabletOrMobile ? '*' : 'Почта *'}
                size="small"
                multiline
                maxRows={7}
              />
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid
              container
              md={3}
              xs={12}
              className={styles.modalHeaderText}
              style={{ paddingTop: isTabletOrMobile ? 0 : 10 }}
            >
              Адреса через знак &quot; | &quot;
            </Grid>
            <Grid item xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={addressValue}
                value={addressValue}
                placeholder={isTabletOrMobile ? '*' : 'Адреса *'}
                onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setAddressValue(e.target.value)}
                size="small"
                multiline
                maxRows={7}
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

export default EditContactsModal;
