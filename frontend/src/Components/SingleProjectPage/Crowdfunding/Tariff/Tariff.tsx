/* eslint-disable @typescript-eslint/ban-ts-comment*/

import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';

import ShowMoreText from 'react-show-more-text';

import { Grid, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

import MyButton from '../../../../Components/UI/Buttons/OutlinedButton/Button';

import TariffEditModal from '../EntityEditModals/TariffEditModal';
import TariffPayModal from '../Tariff/Modals/PayTariffModal';

import { DELETE_TARIFF_MUTATION } from '../graphql/mutations';
import { TariffTypes } from './typing';

import diagonalTariffLinkIcon from '../../../../assets/icons/diagonalTariffLink.svg';

import useStyles from './Styles';

const Tariff: (props: TariffTypes) => JSX.Element = (props: TariffTypes) => {
  const classes = useStyles();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });
  const [isExpanded, setIsExpanded] = useState(false);
  const [hover, setHover] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [openEdit, setOpenEdit] = useState(false);
  const [openPayment, setOpenPayment] = useState(false);

  const handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose: () => void = () => {
    setAnchorEl(null);
  };

  const editButtonHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openEdit) {
      setOpenEdit(!openEdit);
      setAnchorEl(null);
    } else {
      setOpenEdit(!openEdit);
      setAnchorEl(null);
    }
  };

  const buyButtonHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openPayment) {
      setOpenPayment(!openPayment);
      setAnchorEl(null);
    } else {
      setOpenPayment(!openPayment);
      setAnchorEl(null);
    }
  };

  const [deleteTariffHandler] = useMutation(DELETE_TARIFF_MUTATION);

  return (
    <Grid
      container
      alignContent="space-between"
      className={classes.tariffContainer}
      style={{ height: isTabletOrMobile ? '100%' : isExpanded ? '100%' : 380 }}
    >
      <Grid container style={{ gap: 15 }}>
        <Grid container alignItems="center" justifyContent="space-between">
          {isTabletOrMobile ? (
            <Grid container xs className={classes.tariffHeader}>
              {props.title}
            </Grid>
          ) : (
            <Grid
              container
              xs
              className={classes.tariffHeader}
              style={{
                overflow: isExpanded ? 'auto' : 'hidden',
                textOverflow: isExpanded ? 'unset' : 'ellipsis',
                height: isExpanded ? 'auto' : 25,
              }}
            >
              {props.title}
            </Grid>
          )}

          {props.isOwner ? (
            <Grid item alignSelf="flex-start" style={{ color: '#252525' }}>
              <IconButton size="large" edge="end" color="inherit" aria-label="menu" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
                sx={{ zIndex: 1 }}
              >
                <MenuItem onClick={(e: React.MouseEvent) => editButtonHandler(e)}>
                  <Grid container alignItems="center" style={{ gap: 15, color: '#AAADB2' }}>
                    <EditIcon />
                    <div style={{ fontSize: 18, fontWeight: 300, lineHeight: '120%' }}>Редактировать</div>
                  </Grid>
                </MenuItem>
                <Divider variant="middle" />

                <MenuItem
                  onClick={async () => {
                    const tariffId = {
                      tariffId: props.id,
                    };
                    await deleteTariffHandler({
                      variables: {
                        data: tariffId,
                      },
                    });
                    await props.refetch();
                  }}
                >
                  <Grid container alignItems="center" style={{ gap: 15, color: '#AAADB2' }}>
                    <CloseIcon />
                    <div style={{ fontSize: 18, fontWeight: 300, lineHeight: '120%' }}>Удалить</div>
                  </Grid>
                </MenuItem>
              </Menu>
              <TariffEditModal
                crowdId={props.crowdId}
                tariffId={props.id}
                title={props.title}
                description={props.description}
                price={props.price}
                open={openEdit}
                handleOpenClose={() => setOpenEdit(!openEdit)}
              />
            </Grid>
          ) : null}
        </Grid>
        <Grid container alignItems="center" className={classes.tariffPrice}>
          {props.price}
          <CurrencyRubleIcon
            sx={{
              fontWeight: 500,
              fontSize: 24,
              lineHeight: '120%',
              color: '#252525',
            }}
          />
        </Grid>
        <Grid container className={classes.tariffDesc} style={{ display: isTabletOrMobile ? 'none' : '' }}>
          <ShowMoreText
            lines={2}
            more="Подробнее"
            less="Скрыть описание"
            className={classes.collapseCrowdfundingDesc}
            anchorClass={classes.collapseAnchor}
            onClick={(): void => setIsExpanded(!isExpanded)}
            expanded={isExpanded}
            truncatedEndingComponent={'... '}
          >
            {props.description}
          </ShowMoreText>
        </Grid>
      </Grid>
      <Grid
        container
        style={{ gap: 30, cursor: isTabletOrMobile ? 'pointer' : 'default' }}
        onClick={isTabletOrMobile ? (e: React.MouseEvent) => buyButtonHandler(e) : () => console.log()}
      >
        <Grid container className={classes.tariffMobileDesc} style={{ display: isTabletOrMobile ? '' : 'none' }}>
          {props.description}
        </Grid>
        <Grid container justifyContent="space-between" alignItems="flex-end" className={classes.tariffBuyers}>
          <Grid>Купили: {props.buyerCount}</Grid>
          <img src={diagonalTariffLinkIcon} style={{ display: isTabletOrMobile ? '' : 'none' }} />
        </Grid>
        <Grid container xs style={{ display: isTabletOrMobile ? 'none' : '' }}>
          <MyButton
            onClickEvent={(e: React.MouseEvent) => buyButtonHandler(e)}
            isTextTransformNone
            text="Купить"
            className={classes.buyButton}
          />
        </Grid>
      </Grid>
      <TariffPayModal
        tariffId={props.id}
        open={openPayment}
        handleOpenClose={() => setOpenPayment(!openPayment)}
        refetch={props.refetch}
      />
    </Grid>
  );
};

export default Tariff;
