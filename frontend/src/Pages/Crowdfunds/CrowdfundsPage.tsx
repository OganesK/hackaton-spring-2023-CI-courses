import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';

import { Grid, Tooltip, Menu, MenuItem, List, ListItemButton, ListItemIcon } from '@mui/material';

import { useQuery } from '@apollo/client';
import { TabletOrMobile } from '../../helpers/constants/constants';

import NavBar from '../../Components/UI/NavBar/NavBar';
import SkeletonResources from '../../Components/UI/SkeletonBlocks/SkeletonResources/SkeletonResources';
import FilterLine from '../../Components/UI/FilterLine/FilterLine';
import useStyles from '../../Components/UI/Styles/TS/TextStyles/style';

import filterIcon from '../../assets/icons/filter.svg';

import Footer from '../../Components/Home/Footer/Footer';
import CrowdfundingCard from '../../Components/CrowdsPage/CrowdfundingCard/CrowdfundingCard';
import Line from '../../Components/UI/Line/Line';

import { GET_CROWDFUNDS_QUERY } from '../../Queries';
import { CrowdfundsTypes } from './typings';

const CrowdfundsPage: () => JSX.Element = () => {
  const classes = useStyles();

  const { data, loading, refetch } = useQuery<{ crowdFundings: CrowdfundsTypes[] }>(GET_CROWDFUNDS_QUERY);
  const [filter, setFilter] = useState('Все');
  const [filteredData, setFilteredData] = useState<CrowdfundsTypes[]>([]);

  const options = ['Все', 'Активные', 'Завершенные'];

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };
  const handleClose: () => void = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (filter !== 'Все' && data) {
      const filtered = data.crowdFundings.filter(crowd => crowd.project.category === filter);
      setFilteredData(filtered);
    } else if (data && filter === 'Все') {
      setFilteredData(data.crowdFundings);
    }
  }, [filter]);

  useEffect(() => {
    if (!loading && data) {
      setFilteredData(data.crowdFundings);
    }
  }, [loading]);

  return (
    <Grid container xs={12} spacing={0}>
      <NavBar text="qwe" />
      <Grid container xs={10} style={{ margin: 'auto', gap: 0 }} spacing={0}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid container xs className={classes.sloganText}>
            Краудфандинг
          </Grid>
          {isTabletOrMobile ? (
            <Grid item>
              <Tooltip title={'Отображение краудфандингов'} arrow placement="top">
                <List component="nav" aria-label="Device settings" sx={{ bgcolor: 'background.paper' }}>
                  <ListItemButton aria-expanded={open ? 'true' : undefined} onClick={handleClickListItem}>
                    <ListItemIcon sx={{ minWidth: 0 }}>
                      <img src={filterIcon} />
                    </ListItemIcon>
                  </ListItemButton>
                </List>
              </Tooltip>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
                }}
              >
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={index === selectedIndex}
                    onClick={event => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          ) : null}
        </Grid>
        <Grid container direction="row">
          <Grid container xs>
            <FilterLine setSelectedCategory={setFilter} selectedCategory={filter} isResourcesPage />
          </Grid>
          {isTabletOrMobile ? null : (
            <Grid item>
              <Tooltip title={'Отображение краудфандингов'} arrow placement="top">
                <List component="nav" aria-label="Device settings" sx={{ bgcolor: 'background.paper' }}>
                  <ListItemButton aria-expanded={open ? 'true' : undefined} onClick={handleClickListItem}>
                    <ListItemIcon sx={{ minWidth: 0 }}>
                      <img src={filterIcon} />
                    </ListItemIcon>
                  </ListItemButton>
                </List>
              </Tooltip>
              <Menu
                id="lock-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'lock-button',
                  role: 'listbox',
                }}
              >
                {options.map((option, index) => (
                  <MenuItem
                    key={option}
                    selected={index === selectedIndex}
                    onClick={event => handleMenuItemClick(event, index)}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Grid>
          )}
        </Grid>
        <Line marginTop={10} marginBottom={70} />
        {loading ? (
          <SkeletonResources />
        ) : (
          <Grid container justifyContent="space-between" columnSpacing={6}>
            {filteredData &&
              filteredData.map((crowd: CrowdfundsTypes) => (
                <>
                  {(selectedIndex === 1 && crowd.activeCheck) ||
                  (selectedIndex === 2 && crowd.activeCheck === false) ||
                  selectedIndex === 0 ? (
                    <Grid
                      key={crowd.id}
                      item
                      container
                      justifyContent="space-between"
                      xs={isTabletOrMobile ? 12 : 6}
                      style={{
                        marginBottom: isTabletOrMobile ? 40 : 60,
                      }}
                    >
                      <CrowdfundingCard
                        key={crowd.id}
                        id={crowd.id}
                        title={crowd.title}
                        shortDescription={crowd.shortDescription}
                        projectProps={crowd.project}
                        goalSum={crowd.goalSum}
                        nowSum={crowd.nowSum}
                        activeCheck={crowd.activeCheck}
                      />
                    </Grid>
                  ) : null}
                </>
              ))}
          </Grid>
        )}
      </Grid>
      <Footer footerMobileTopIdent={100} footerTopIdent={200} />
    </Grid>
  );
};

export default CrowdfundsPage;
