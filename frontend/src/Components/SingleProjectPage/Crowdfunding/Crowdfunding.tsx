/*eslint-disable  @typescript-eslint/ban-ts-comment*/
import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { Grid, Button, Tooltip, IconButton, Menu, MenuItem, Divider } from '@mui/material';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { useMediaQuery } from 'react-responsive';

import PostArticleComponent from '../../UI/PostArticleComponent/PostArticleComponent';

import CrowdfundingEditModal from './EntityEditModals/CrowdfundingEditModal';
import CreateTariffModal from './Tariff/Modals/CreateTariffModal';
import Tariff from './Tariff/Tariff';

import { DELETE_CROWDFUNDING_MUTATION } from './graphql/mutations';
import { CrowdfundingTypes, TariffTypes } from './graphql/typings';

import useStyles from './Styles';

const Crowdfunding: (props: CrowdfundingTypes) => JSX.Element = (props: CrowdfundingTypes) => {
  const classes = useStyles();

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });
  const [hover, setHover] = useState(false);

  const percentSum = (props.nowSum * 100) / props.goalSum;

  const [showTariffs, setShowTariffs] = useState(false);
  const [tariffsNumber, setTariffsNumber] = useState(3);

  const [deleteCrowdfundingHandler] = useMutation(DELETE_CROWDFUNDING_MUTATION);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const [openEdit, setOpenEdit] = useState(false);
  const [openModalTariff, setOpenModalTariff] = useState(false);

  const handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose: () => void = () => {
    setAnchorEl(null);
  };

  const handleTariffOpenClose = (e: React.MouseEvent) => {
    e.preventDefault();
    if (openModalTariff) {
      setOpenModalTariff(!openModalTariff);
      setAnchorEl(null);
    } else {
      setOpenModalTariff(!openModalTariff);
      setAnchorEl(null);
    }
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

  const handleShowTariffs: () => void = () => {
    setShowTariffs(!showTariffs);
  };

  useEffect(() => {
    if (!showTariffs) {
      setTariffsNumber(3);
    } else {
      setTariffsNumber(props.tariffs.length);
    }
  }, [showTariffs]);
  //@ts-ignore
  const time = Date.parse(props.end) - Date.parse(new Date());
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  return (
    <>
      <Tooltip
        title={
          props.isApproved === false && openEdit === false && openModalTariff === false
            ? 'Данный краудфандинг проходит модерацию, только вы видите его.'
            : ''
        }
      >
        <Grid container style={{ gap: 30, filter: hover ? (props.isApproved ? 'none' : 'opacity(0.9)') : 'none' }}>
          <Grid container style={{ gap: 12 }}>
            <Grid container justifyContent="space-between" alignItems="flex-start">
              <Grid container direction="column" xs style={{ gap: 12 }}>
                <Grid className={classes.crowdHeader} style={{ display: isTabletOrMobile ? 'none' : '' }}>
                  {props.activeCheck ? 'Сбор средств на:' : 'Завершен сбор средств на:'}
                </Grid>
                <Grid className={classes.crowdTitle}>{props.title}</Grid>
              </Grid>
              {props.isOwner ? (
                <Grid item style={{ color: '#252525' }}>
                  <IconButton size="large" color="inherit" aria-label="menu" onClick={handleMenuClick}>
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
                    <MenuItem disabled={!props.activeCheck} onClick={(e: React.MouseEvent) => handleTariffOpenClose(e)}>
                      <Grid container alignItems="center" style={{ gap: 15, color: '#AAADB2' }}>
                        <AddIcon />
                        <div style={{ fontSize: 18, fontWeight: 300, lineHeight: '120%' }}>Создать тариф</div>
                      </Grid>
                    </MenuItem>
                    <Divider variant="middle" />

                    <MenuItem disabled={props.isApproved} onClick={(e: React.MouseEvent) => editButtonHandler(e)}>
                      <Grid container alignItems="center" style={{ gap: 15, color: '#AAADB2' }}>
                        <EditIcon />
                        <div style={{ fontSize: 18, fontWeight: 300, lineHeight: '120%' }}>Редактировать</div>
                      </Grid>
                    </MenuItem>

                    <MenuItem
                      disabled={props.isApproved}
                      onClick={async () => {
                        const crowdfundingId = {
                          crowdFundingId: props.id,
                        };
                        await deleteCrowdfundingHandler({
                          variables: {
                            data: crowdfundingId,
                          },
                        });
                        await props.refetch();
                      }}
                    >
                      <Tooltip title={props.isApproved ? 'Вы не можете удалить начавшийся краудфандинг' : ''}>
                        <Grid container alignItems="center" style={{ gap: 15, color: '#AAADB2' }}>
                          <CloseIcon />
                          <div style={{ fontSize: 18, fontWeight: 300, lineHeight: '120%' }}>Удалить</div>
                        </Grid>
                      </Tooltip>
                    </MenuItem>
                  </Menu>
                  <CrowdfundingEditModal
                    crowdId={props.id}
                    open={openEdit}
                    handleOpenClose={() => setOpenEdit(!openEdit)}
                  />
                  <CreateTariffModal
                    crowdId={Number(props.id)}
                    open={openModalTariff}
                    handleOpenClose={() => setOpenModalTariff(!openModalTariff)}
                    refetch={props.refetch}
                  />
                </Grid>
              ) : null}
            </Grid>
          </Grid>
          <Grid container style={{ gap: 20 }}>
            <div className={classes.glass}>
              <div
                className={classes.progress}
                style={{ width: `${percentSum}%`, backgroundColor: props.activeCheck ? '#252525' : '#AAADB3' }}
              >
                <Grid
                  className={classes.progressPercent}
                  style={{
                    mixBlendMode: percentSum < 2 ? 'difference' : 'normal',
                  }}
                >
                  {percentSum.toFixed()}%
                </Grid>
              </div>
            </div>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Grid container direction="column" style={{ gap: 5 }}>
                  <Grid item container alignItems="center" className={classes.sumHeader}>
                    {props.nowSum.toLocaleString()}
                    <CurrencyRubleIcon
                      sx={{
                        fontWeight: 500,
                        fontSize: 24,
                        lineHeight: '120%',
                        color: '#252525',
                      }}
                    />
                  </Grid>
                  <Grid item className={classes.sumText}>
                    Собрано
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" style={{ gap: 5 }}>
                  <Grid item container alignItems="center" className={classes.sumHeader}>
                    {props.goalSum.toLocaleString()}
                    <CurrencyRubleIcon
                      sx={{
                        fontWeight: 500,
                        fontSize: 24,
                        lineHeight: '120%',
                        color: '#252525',
                      }}
                    />
                  </Grid>
                  <Grid item className={classes.sumText} style={{ textAlign: 'end' }}>
                    Цель
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {props.activeCheck ? (
            <Grid container style={{ gap: 5 }}>
              <Grid item>До окончания краудфандинга:</Grid>
              <Grid item style={{ fontWeight: 500 }}>{`${days} дн.`}</Grid>
              {/* <Grid item>{moment.preciseDiff(moment(new Date()), moment(props.end))}</Grid> */}
            </Grid>
          ) : null}
          <Grid container style={{ marginTop: 10 }}>
            <PostArticleComponent
              article={props.story}
              postId={props.id}
              isOwner={props.isOwner}
              isCrowdfunding={true}
            />
          </Grid>
          {props.tariffs.length > 0 && props.activeCheck ? (
            <Grid container direction="row" justifyContent="flex-start" columnSpacing={2} style={{ marginTop: 50 }}>
              {props.tariffs.map((tariff: TariffTypes, index) => (
                <>
                  {index < tariffsNumber ? (
                    <Grid
                      key={tariff.id}
                      item
                      xs={isTabletOrMobile ? 12 : 4}
                      style={{
                        marginBottom: isTabletOrMobile ? 30 : 15,
                      }}
                    >
                      <Tariff
                        id={tariff.id}
                        title={tariff.title}
                        price={tariff.price}
                        buyerCount={tariff.buyerCount}
                        description={tariff.description}
                        isOwner={props.isOwner}
                        crowdId={props.id}
                        refetch={props.refetch}
                      />
                    </Grid>
                  ) : null}
                </>
              ))}
              {props.tariffs.length > 3 ? (
                <Grid container justifyContent="center">
                  <Button
                    variant="text"
                    sx={{ color: '#AAADB2', fontSize: 18, lineHeight: '100%' }}
                    onClick={handleShowTariffs}
                  >
                    {showTariffs ? 'Скрыть' : 'Смотреть все тарифы'}
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          ) : null}
        </Grid>
      </Tooltip>
    </>
  );
};

export default Crowdfunding;
