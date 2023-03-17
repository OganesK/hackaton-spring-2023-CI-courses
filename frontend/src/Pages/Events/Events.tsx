import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';
import { useQuery } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';
import { userContext } from '../../Context/context';
import { TabletOrMobile } from '../../helpers/constants/constants';

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
  const { loading, data: eventData, error, refetch } = useQuery<{ events: EventTypes[] }>(GET_EVENTS_QUERY);
  const context = useContext(userContext);
  const [filter, setFilter] = useState<string>('Все');
  const [filteredData, setFilteredData] = useState<EventTypes[]>([]);
  const styles = useStyles();

  if (error) {
    console.error(error);
  }
  useEffect(() => {
    if (filter !== 'Все' && eventData) {
      const filtered = eventData.events.filter(event => event.category === filter);
      setFilteredData(filtered);
    } else if (eventData && filter === 'Все') {
      setFilteredData(eventData.events);
    }
  }, [filter]);

  useEffect(() => {
    if (!loading && eventData) {
      setFilteredData(eventData.events);
    }
  }, [loading]);

  return (
    <Grid container xs={12} spacing={0}>
      <NavBar text="qwe" />
      <Grid container xs={10} style={{ margin: 'auto', gap: 0 }} spacing={0}>
        <Grid className={styles.sloganText}>Мероприятия</Grid>
        <FilterLine selectedCategory={filter} setSelectedCategory={setFilter} isEventsPage />
        <Line marginTop={10} marginBottom={70} />
        {loading ? (
          <SkeletonEvents />
        ) : (
          <>
            {filteredData?.map((event: EventTypes) => (
              <EventPoster
                id={event.id}
                key={event.id}
                name={event.name}
                poster={event.poster}
                description={event.description}
                shortDescription={event.shortDescription}
                date={event.date}
                organizer={event.organizer}
                theme={event.theme}
                format={event.format}
                address={event.address}
                stream={event.stream}
                user={context.user}
                refetch={refetch}
              />
            ))}
          </>
        )}
      </Grid>
      <Footer footerMobileTopIdent={120} footerTopIdent={200} />
    </Grid>
  );
};

export default Events;
