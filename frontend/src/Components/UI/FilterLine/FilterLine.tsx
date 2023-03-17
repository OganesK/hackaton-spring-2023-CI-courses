import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { AppBar, Grid, IconButton, styled } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { categoriesArray } from '../../../helpers/constants/categories';

import MyButton from './Button';

import { FilterLineProps } from './typing';

import '../Styles/CSS/Components/style.css';

const StyledAppBar = styled(AppBar)(() => ({
  boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 0%), 0px 4px 5px 0px rgb(0 0 0 / 0%), 0px 1px 10px 0px rgb(0 0 0 / 0%);',
}));

export default function FilterLine(props: FilterLineProps): JSX.Element {
  const filters = props.isCompanyPage
    ? ['Проекты', 'Контакты']
    : props.isProfilePage
    ? ['Компании', 'Проекты', 'Мероприятия', 'Ресурсы', 'Объявления', 'Новости']
    : props.isModerationPage
    ? ['Публикации', 'Проекты', 'Краудфандинги', 'Компании', 'Мероприятия', 'Контакты']
    : categoriesArray;

  const onClickLeft: () => void = () => {
    document.getElementById('container')!.scrollLeft -= 100;
  };

  const onClickRight: () => void = () => {
    document.getElementById('container')!.scrollLeft += 100;
  };

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });

  return (
    <Grid container direction="row">
      <Grid
        container
        xs={1}
        // style={{
        //   display: isTabletOrMobile ? '' : 'none',
        // }}
        style={{
          display: props.isCalendar ? '' : isTabletOrMobile ? '' : 'none',
        }}
      >
        <IconButton size="large" color="inherit" onClick={onClickLeft}>
          <ChevronLeftIcon />
        </IconButton>
      </Grid>
      <Grid container alignItems="center" xs={props.isCalendar || isTabletOrMobile ? 10 : 12}>
        {/* <StyledAppBar position="static" color="inherit" defaultValue="Все"> */}
        <div
          className={props.isCalendar || isTabletOrMobile ? 'scroller__items__noneScrollbar' : 'scroller__items'}
          id="container"
        >
          {/* <div className={isTabletOrMobile ? 'scroller__items__noneScrollbar' : 'scroller__items'}> */}
          {filters.map(filter => (
            <MyButton
              key={filter}
              value={filter}
              selectedFilter={props.selectedCategory}
              setSelectedFilter={props.setSelectedCategory}
            />
          ))}
        </div>
      </Grid>
      <Grid
        container
        xs={1}
        justifyContent="flex-end"
        // style={{
        //   display: isTabletOrMobile ? '' : 'none',
        // }}
        style={{
          display: props.isCalendar ? '' : isTabletOrMobile ? '' : 'none',
        }}
      >
        <IconButton size="large" color="inherit" onClick={onClickRight}>
          <ChevronRightIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
