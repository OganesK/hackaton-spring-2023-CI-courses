/* eslint-disable @typescript-eslint/ban-ts-comment*/

import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Grid, OutlinedInput } from '@mui/material';

import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';

import NoneClick from '../../../../UI/NoneClickableField/NoneClick';
import Button from '../../../../UI/Buttons/OutlinedButton/Button';
import SnackbarOnChange from '../../../../UI/Snackbar/Snackbar';
import useStyles from '../../../../UI/Styles/TS/Components/createModalStyles/index';

import cards from '../../../../../assets/img/acquiring/cards.jpg';

import { TariffPayModalProps } from '../typing';
import { PayTariffMutation } from '../../graphql/mutations';

const TariffEditModal: (props: TariffPayModalProps) => JSX.Element = (props: TariffPayModalProps) => {
  const styles = useStyles();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });

  const payTariffHandler = PayTariffMutation();

  const [firstNameValue, setFirstNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [fatherNameValue, setFatherNameValue] = useState('');
  const [addressValue, setAddressValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  const [openNoneClick, setOpenNoneClick] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);

  const onClickHandler: () => Promise<void> = async () => {
    if (firstNameValue && lastNameValue && fatherNameValue && addressValue && emailValue) {
      setOpenNoneClick(true);

      const newTariffData = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        fatherName: fatherNameValue,
        address: addressValue,
        email: emailValue,
        tariffId: props.tariffId,
      };
      await payTariffHandler(newTariffData);

      props.handleOpenClose();
      await props.refetch();
      setOpenNoneClick(false);
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
          Оплата тарифа
        </Grid>
        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Имя
          </Grid>
          <Grid container xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={firstNameValue}
              value={firstNameValue}
              placeholder={isTabletOrMobile ? '*' : 'Введите имя *'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFirstNameValue(e.target.value)}
              inputProps={{
                maxLength: 128,
              }}
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Фамилия
          </Grid>
          <Grid container xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={lastNameValue}
              value={lastNameValue}
              placeholder={isTabletOrMobile ? '*' : 'Введите фамилию *'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setLastNameValue(e.target.value)}
              inputProps={{
                maxLength: 128,
              }}
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Отчество
          </Grid>
          <Grid container xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={fatherNameValue}
              value={fatherNameValue}
              placeholder={isTabletOrMobile ? '*' : 'Введите отчество *'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setFatherNameValue(e.target.value)}
              inputProps={{
                maxLength: 128,
              }}
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Адрес проживания
          </Grid>
          <Grid item xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={addressValue}
              value={addressValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setAddressValue(e.target.value)}
              placeholder={isTabletOrMobile ? '*' : 'Введите ваш адрес *'}
              inputProps={{
                maxLength: 128,
              }}
              size="small"
            />
          </Grid>
        </Grid>

        <Grid container direction="row" className={styles.inputContainerGap}>
          <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
            Электронная почта
          </Grid>
          <Grid item xs>
            <OutlinedInput
              fullWidth={true}
              defaultValue={emailValue}
              value={emailValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>): void => setEmailValue(e.target.value)}
              placeholder={isTabletOrMobile ? '*' : 'Укажите адрес эл. почты *'}
              inputProps={{
                maxLength: 128,
              }}
              size="small"
            />
          </Grid>
        </Grid>
        <Grid container justifyContent="end" style={{ gap: 20 }}>
          <img src={cards} alt="Карты" style={{ width: '70%' }} />
        </Grid>
        <Grid item className={styles.modalAcquiringText}>
          При оплате заказа банковской картой, обработка платежа (включая ввод номера карты) происходит на защищенной
          странице процессинговой системы, которая прошла международную сертификацию. Это значит, что Ваши
          конфиденциальные данные (реквизиты карты, регистрационные данные и др.) не поступают в интернет-магазин, их
          обработка полностью защищена и никто, в том числе наш интернет-магазин, не может получить персональные и
          банковские данные клиента. При работе с карточными данными применяется стандарт защиты информации,
          разработанный международными платёжными системами Visa и Mastercard - Payment Card Industry Data Security
          Standard (PCI DSS), что обеспечивает безопасную обработку реквизитов Банковской карты Держателя. Применяемая
          технология передачи данных гарантирует безопасность по сделкам с Банковскими картами путем использования
          протоколов Transport Layer Security (TLS), Visa Secure, Secure Code, и закрытых банковских сетей, имеющих
          высшую степень защиты. В случае возврата, денежные средства возвращаются на ту же карту, с которой
          производилась оплата.
        </Grid>

        <Grid item className={styles.modalAcquiringText}>
          Внимание! Уважаемые клиенты, информируем Вас о том, что при запросе возврата денежных средств при отказе от
          покупки, возврат производится исключительно на ту же банковскую карту, с которой была произведена оплата!
        </Grid>

        <Grid item className={styles.modalAcquiringText}>
          Оператор по переводу денежных средств - ПАО РОСБАНК (ИНН 7730060164), тел. 8 800 200 5434. Генеральная
          лицензия Банка России №2272 от 28.01.2015. Платежный агрегатор (банковский платежный агент) оператора - АО
          &quot;КОКК&quot; (ИНН 7710060991), тел. 8 800 250 3556 на основании Соглашения от 29.12.2007 и Дополнительного
          соглашения от 31.12.2019.
        </Grid>

        {isTabletOrMobile ? (
          <Grid container direction="column" style={{ marginTop: 30, gap: 20 }}>
            <Button onClick={onClickHandler} text="Оплатить" className={styles.modalButton} />
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
                <Button onClick={onClickHandler} text="Оплатить" className={styles.modalButton} />
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

export default TariffEditModal;
