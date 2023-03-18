import React from 'react';

import Grid from '@material-ui/core/Grid';
import { useQuery } from '@apollo/client';

import { useWindowSize } from '../../rules/index';
import Header from '../../Components/Home/Header/Header';
import Footer from '../../Components/Home/Footer/Footer';
import LastNews from '../../Components/Home/LastNews/LastNewsBlock';

import AboutUs from '../../Components/Home/AboutUs/AboutUs';
import OurProjects from '../../Components/Home/OurProjects/OurProjects';
import Partners from '../../Components/Home/Partners/Partners';
import BidProject from '../../Components/Home/BidProject/BidProject';
import EventsBlock from '../../Components/Calendar/EventsBlock';


import Loading from '../../Components/UI/Loading/Loading';
import useStyles from './Styles';

import { GET_CONFIG_QUERY } from '../../Queries';
import { ConfigTypes } from './typings';

const Home: () => JSX.Element = () => {
  const { loading, data, error, refetch } =
    useQuery<{ loading: boolean; getPlatformConfig: ConfigTypes }>(GET_CONFIG_QUERY);
  const [width] = useWindowSize();

  const classes = useStyles();

  if (error) {
    console.error(error);
  }

  if (loading) {
    return (
      <div style={{ paddingTop: '40%' }}>
        <Loading />
      </div>
    );
  }
  return (
    <Grid container className={classes.root}>
      <Header
        platformTitle={data?.getPlatformConfig?.platformTitle}
        platformDescription={data?.getPlatformConfig?.platformDescription}
      />
      <Grid container xs={10} className={classes.articleBox}>

        <AboutUs
          platformTagline={data ? data?.getPlatformConfig?.platformTagline : 'CL Courses'}
          totalBudgetInvestment={data && data.getPlatformConfig ? data.getPlatformConfig.totalBudgetInvestment : 0}
          totalProjectCount={data && data.getPlatformConfig ? data.getPlatformConfig.totalProjectCount : 0}
          totalCompanyCount={data && data.getPlatformConfig ? data.getPlatformConfig.totalCompanyCount : 0}
          totalExtraBudgetInvestment={
            data && data.getPlatformConfig ? data.getPlatformConfig.totalExtraBudgetInvestment : 0
          }
        />

        {data?.getPlatformConfig?.projectsShownOnLanding && data.getPlatformConfig.projectsShownOnLanding.length > 0 ? (
          <OurProjects projectsShownOnLanding={data?.getPlatformConfig?.projectsShownOnLanding} />
        ) : null}
        {/* {data?.getPlatformConfig?.crowdFundingsShownOnLanding &&
        data.getPlatformConfig.crowdFundingsShownOnLanding.length > 0 ? (
          <CrowdsBlock crowdsOnLanding={data?.getPlatformConfig?.crowdFundingsShownOnLanding} />
        ) : null} */}

        

      </Grid>
      {width < 600 ? (
        <Grid container style={{ marginTop: 100 }}>
        </Grid>
      ) : null}
      <Footer footerMobileTopIdent={40} footerTopIdent={140} />
    </Grid>
  );
};

export default Home;
