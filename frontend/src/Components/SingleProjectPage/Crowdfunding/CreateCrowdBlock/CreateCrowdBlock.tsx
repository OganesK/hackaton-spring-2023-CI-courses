/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import CreateCrowdfundingModal from '../../../SingleProjectPage/Modals/CreateCrowdfundingModal';

import { CrowdProps } from './typing';

import useStyles from './Styles';
import Button from '../../../UI/Buttons/OutlinedButton/Button';
import '../../../UI/Styles/CSS/Components/style.css';

const CreateCrowdBlock: (props: CrowdProps) => JSX.Element = (props: CrowdProps) => {
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  const [openModalCrowd, setOpenModalCrowd] = useState(false);

  const handleCrowdOpenClose: () => void = () => {
    setOpenModalCrowd(!openModalCrowd);
  };

  const history = useHistory();

  const onClickHandler: () => void = () => {
    history.push('/crowdfunds');
  };

  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="flex-start"
      className={classes.insideProjectBidBox}
      style={{ gap: isTabletOrMobile ? 20 : 35 }}
    >
      <Grid item className={classes.header}>
        Хотите продвинуть свой проект?
      </Grid>
      <Grid container className={classes.article}>
        Вы можете запустить сбор средств на любую цель, связанную с реализацией или продвижением вашего проекта. Блок от
        вашего проекта также появится на странице
        <Grid
          onClick={onClickHandler}
          style={{ color: '#FF5631', cursor: 'pointer', display: 'inline', width: 'auto' }}
        >
          Краудфандинги
        </Grid>
      </Grid>
      {isTabletOrMobile ? (
        <Grid container style={{ marginTop: 30 }}>
          <Button
            onClick={handleCrowdOpenClose}
            text={isMobile ? 'Создать' : 'Создать краудфандинг'}
            isOrange={true}
            className={classes.bidButtonOnProject}
          />
        </Grid>
      ) : (
        <Grid item>
          <Button
            onClick={handleCrowdOpenClose}
            text={'Создать краудфандинг'}
            isWhite={true}
            className={classes.bidButtonOnProject}
          />
        </Grid>
      )}
      <CreateCrowdfundingModal
        projectId={props.projectId}
        open={openModalCrowd}
        handleOpenClose={handleCrowdOpenClose}
        refetch={props.refetch}
      />
    </Grid>
  );
};

export default CreateCrowdBlock;
