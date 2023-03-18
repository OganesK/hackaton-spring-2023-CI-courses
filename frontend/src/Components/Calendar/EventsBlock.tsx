import React, { useState, useEffect, useContext } from 'react';
import Grid from '@mui/material/Grid';

import Calendar, { CalendarTileProperties } from 'react-calendar';
import { differenceInCalendarDays } from 'date-fns';
import { useQuery } from '@apollo/client';

import { userContext } from '../../Context/context';

import EventCard from './Event';
import EventInfo from './EventInfo';
import EmptyEvents from './EmptyEvents';

import ComponentTextHeader from '../Home/ComponentTextHeader/ComponentTextHeader';
import FilterLine from '../UI/FilterLine/FilterLine';
import Loading from '../UI/Loading/Loading';

import { useWindowSize } from '../../rules/index';

import useStyles from './Styles';
import { EventTypes, StateType } from './graphql/typings';
import { GET_EVENTS_QUERY } from '../../Queries';

export default function EventsBlock(): JSX.Element {
  const [value, setValue] = useState(new Date());
  const { loading, data, refetch } = useQuery<{ events: EventTypes[] }>(GET_EVENTS_QUERY);
  const [filteredData, setFilteredData] = useState<Array<StateType | undefined>>([]);
  const context = useContext(userContext);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [datesToAddContentTo, setDatesToAddContentTo] = useState(
    data ? data.events.map((d: EventTypes) => new Date(d.date)) : [],
  );

  const [width] = useWindowSize();
  const firstDefaultBlockWidth = width - width / 10;

  function onChange(nextValue: Date): void {
    setValue(nextValue);
  }

  function isSameDay(a: Date, b: Date): boolean {
    return differenceInCalendarDays(a, b) === 0;
  }
  useEffect(() => {
    const newFilter: Array<StateType | undefined> = data
      ? data.events.reduce((acc: Array<StateType>, d: EventTypes) => {
          if (selectedCategory === 'Все') {
            if (isSameDay(new Date(d.date), value)) {
              acc.push(d);
            }
          } else {
            if (isSameDay(new Date(d.date), value) && d.category === selectedCategory) {
              acc.push(d);
            }
          }
          return acc;
        }, [])
      : [];
    setFilteredData(newFilter);
    const newDates = data
      ? data.events.reduce((acc: Array<string>, d: EventTypes) => {
          if (selectedCategory === 'Все') {
            acc.push(d.date.toString());
          } else {
            if (d.category === selectedCategory) {
              acc.push(d.date.toString());
            }
          }
          return acc;
        }, [])
      : [];
    setDatesToAddContentTo(newDates.map((d: any) => new Date(d)));
  }, [selectedCategory, value, data]);

  function tileContent(props: CalendarTileProperties): JSX.Element | null {
    if (props.view === 'month') {
      if (datesToAddContentTo.find((dDate: any) => isSameDay(dDate, props.date))) {
        return (
          <div
            style={{
              borderTop: '1px solid',
              width: '55%',
              height: '100%',
              margin: '1px auto',
            }}
          />
        );
      }
      return null;
    }
    return null;
  }

  const classes = useStyles();

  if (loading) {
    return <Loading />;
  }

  return (
    <Grid container className={classes.eventsBox} xs={12}>
      <Grid item>
        <ComponentTextHeader text="Ожидаемые Трансляции" />
      </Grid>

      {width > 1200 ? (
        <Grid container direction="row" justifyContent="space-between" className={classes.eventsContainer}>
          <Grid container xs={7} direction="column" justifyContent="flex-start" style={{ gap: 30 }}>
            <FilterLine
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              isCalendar={true}
            />
            <Grid container xs direction="column">
              {filteredData.length !== 0 ? (
                filteredData.map(event => {
                  if (event) {
                    return (
                      <EventCard
                        key={event.id}
                        id={event.id}
                        img={event.poster}
                        title={event.name}
                        content={event.description}
                        shortContent={event.shortDescription}
                        date={event.date}
                        address={event.address}
                        format={event.format}
                        theme={event.theme}
                        organizer={event.organizer}
                        stream={event.stream}
                        user={context.user}
                        refetch={refetch}
                      />
                    );
                  }
                })
              ) : (
                <EmptyEvents />
              )}
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="start" xs className={classes.calendarContainer}>
            <Grid xs={12} style={{ height: 300 }}>
              <Calendar
                onChange={onChange}
                value={value}
                tileContent={tileContent}
                className={classes.calendar}
                minDetail="year"
                next2Label={null}
                prev2Label={null}
              />
            </Grid>
            <Grid container className={classes.eventInfoBox} xs={12}>
              <EventInfo />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="row" justifyContent="space-between" className={classes.eventsContainer}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="start"
            xs={12}
            className={classes.calendarContainer}
            style={{ gap: 40 }}
          >
            <Grid style={{ width: firstDefaultBlockWidth }}>
              <FilterLine selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </Grid>
            <Grid container justifyContent="center">
              <Grid item md={6} sm={8} xs={12}>
                <Calendar
                  onChange={onChange}
                  value={value}
                  tileContent={tileContent}
                  className={classes.calendar}
                  minDetail="year"
                  next2Label={null}
                  prev2Label={null}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container xs={12}>
            <Grid item xs={12} direction="column">
              {filteredData.length !== 0 ? (
                filteredData.map(event => {
                  if (event) {
                    return (
                      <EventCard
                        key={event.id}
                        id={event.id}
                        img={event.poster}
                        title={event.name}
                        content={event.description}
                        shortContent={event.shortDescription}
                        date={event.date}
                        address={event.address}
                        format={event.format}
                        theme={event.theme}
                        organizer={event.organizer}
                        stream={event.stream}
                        user={context.user}
                        refetch={refetch}
                      />
                    );
                  }
                })
              ) : (
                <EmptyEvents />
              )}
            </Grid>
          </Grid>
          <Grid container className={classes.eventInfoBox} xs={12}>
            <EventInfo />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
