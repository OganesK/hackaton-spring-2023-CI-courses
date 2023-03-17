import React from 'react';
import Grid from '@material-ui/core/Grid';

import { useHistory } from 'react-router-dom';

import ComponentTextHeader from '../ComponentTextHeader/ComponentTextHeader';
import MyCard from '../../UI/Card/Card';

import Invests from '../../../assets/img/Invests.svg';
import Partners from '../../../assets/img/Partners.svg';
import Projects from '../../../assets/img/Projects.svg';

import { useWindowSize } from '../../../rules/index';

import { AboutUsProps } from './typing';

import useStyles from './Styles';

const AboutUs: (props: AboutUsProps) => JSX.Element = (props: AboutUsProps) => {
  const history = useHistory();
  const [width] = useWindowSize();

  const onClickHandlerPartners: () => void = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScoJn_WI2LwFpKzIdTQKl8V359VhtjFm4YYNyMQ2at0ARXGMA/viewform');
  };

  const onClickHandlerInvestors: () => void = () => {
    history.push('/projects');
  };

  const onClickHandlerResidents: () => void = () => {
    history.push('/signup');
  };

  const classes = useStyles();

  return (
    <Grid container xs={12} className={classes.aboutUsContainer}>
      <Grid
        container
        justifyContent="space-between"
        direction={width < 961 ? 'row' : 'row'}
        className={classes.tagline}
      >
        <Grid container xs={width < 961 ? 12 : 5}>
          <ComponentTextHeader text={props.platformTagline} />
        </Grid>
        <Grid container xs={width < 961 ? 12 : 6} className={classes.taglineTitle}>
          {props.platformShortDescription}
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        justifyContent={width < 961 ? 'center' : 'space-between'}
        style={{ gap: width < 600 ? 10 : 60 }}
      >
        <Grid item xl lg md={5} sm={7} xs={12}>
          <MyCard
            avatar={Projects}
            header="Стартапы"
            title1="Проекты"
            title2="Компании"
            number1={`${props.totalProjectCount ? props.totalProjectCount.toString() : ' totalProjectCount'}`}
            number2={`${props.totalCompanyCount ? props.totalCompanyCount.toString() : ' totalCompanyCount'}`}
            link="Стать резидентом"
            goTo={onClickHandlerResidents}
          />
        </Grid>

        <Grid item xl lg md={5} sm={7} xs={12}>
          <MyCard
            avatar={Invests}
            header="Инвестиции"
            title1="Бюдж."
            title2="Внебюдж."
            number1={`${
              props.totalBudgetInvestment ? props.totalBudgetInvestment.toString() : 'totalBudgetInvestment'
            } млн `}
            number2={`${
              props.totalExtraBudgetInvestment
                ? props.totalExtraBudgetInvestment.toString()
                : 'totalExtraBudgetInvestment'
            } млн `}
            link="Инвесторам"
            goTo={onClickHandlerInvestors}
          />
        </Grid>
        <Grid item xl lg md={5} sm={7} xs={12}>
          <MyCard
            avatar={Partners}
            header="Партнеры"
            title1="Хотите вырастить свой стартап? Добро пожаловать!"
            link="Стать партнером"
            title2=""
            number1=""
            number2=""
            goTo={onClickHandlerPartners}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AboutUs;
