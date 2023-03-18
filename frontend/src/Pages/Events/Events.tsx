import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import { useQuery } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';
import { userContext } from '../../Context/context';
import { TabletOrMobile } from '../../helpers/constants/constants';
import { ReactFlvPlayer } from 'react-flv-player';
import { STREAM_URL } from '../../config';


import NavBar from '../../Components/UI/NavBar/NavBar';
import SkeletonEvents from '../../Components/UI/SkeletonBlocks/SkeletonEvents/SkeletonEvents';
import useStyles from '../../Components/UI/Styles/TS/TextStyles/style';
import FilterLine from '../../Components/UI/FilterLine/FilterLine';

import Footer from '../../Components/Home/Footer/Footer';
import EventPoster from '../../Components/EventsPage/EventPoster/EventPoster';
import Line from '../../Components/UI/Line/Line';

import { GET_EVENTS_QUERY } from '../../Queries';
import { EventTypes } from './typings';

const Events: () => JSX.Element = () => {
  const { loading, data: eventData, error, refetch } = useQuery<{ streams: EventTypes[] }>(GET_EVENTS_QUERY);
  const context = useContext(userContext);
  const [filter, setFilter] = useState<string>('Все');
  const [filteredData, setFilteredData] = useState<EventTypes[]>([]);
  const styles = useStyles();

  if (error) {
    console.error(error);
  }

  useEffect(() => {
    if (!loading && eventData) {
      setFilteredData(eventData.streams);
    }
    console.log(eventData)
  }, [loading]);

  return (
    <Grid container xs={12} spacing={0}>
      <NavBar text="qwe" />
      <Grid container xs={10} style={{ margin: 'auto', gap: 0 }} spacing={0}>
        <Grid className={styles.sloganText}>Трансляции</Grid>
        <Line marginTop={10} marginBottom={70} />
        {loading ? (
          <SkeletonEvents />
        ) : (
          <>
            {filteredData?.map((event: EventTypes) => (
              <Grid item xs={12}>
                <Grid className={styles.sloganText}>{event.name}</Grid>
                <ReactFlvPlayer
                  url={`${STREAM_URL}${event.streamKey}.flv`}
                  width="100%"
                  height="100%"
                  isMuted={true}
                  style={{
                    border: '2px solid',
                  }}
                />
              </Grid>
            ))}
          </>
        )}
      </Grid>
      <Footer footerMobileTopIdent={120} footerTopIdent={200} />
    </Grid>
  );
};

export default Events;
