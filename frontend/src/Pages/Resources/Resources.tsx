import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

import { useQuery } from '@apollo/client';

import { TabletOrMobile } from '../../helpers/constants/constants';
import { useWindowSize } from '../../rules/index';

import NavBar from '../../Components/UI/NavBar/NavBar';
import SkeletonResources from '../../Components/UI/SkeletonBlocks/SkeletonResources/SkeletonResources';
import FilterLine from '../../Components/UI/FilterLine/FilterLine';
import useStyles from '../../Components/UI/Styles/TS/TextStyles/style';

import Footer from '../../Components/Home/Footer/Footer';
import ResourceCard from '../../Components/ProfilePage/ProfileResourceBlock/ProfileResourceBlock';
import Line from '../../Components/UI/Line/Line';

import { GET_RESOURCES_QUERY } from '../../Queries';
import { ResourceTypes } from './typings';

const Resources: () => JSX.Element = () => {
  const classes = useStyles();

  const { data, loading, refetch } = useQuery<{ posts: ResourceTypes[] }>(GET_RESOURCES_QUERY);
  const [filter, setFilter] = useState('Все');
  const [filteredData, setFilteredData] = useState<ResourceTypes[]>([]);

  const [width] = useWindowSize();

  useEffect(() => {
    if (filter !== 'Все' && data) {
      const filtered = data.posts.filter(post => post.category === filter && post.isResource);
      setFilteredData(filtered);
    } else if (data && filter === 'Все') {
      setFilteredData(data.posts.filter((post: ResourceTypes) => post.isResource === true));
    }
  }, [filter]);

  useEffect(() => {
    if (!loading && data) {
      setFilteredData(data.posts.filter((post: ResourceTypes) => post.isResource === true));
    }
  }, [loading]);

  return (
    <Grid container xs={12} spacing={0}>
      <NavBar text="qwe" />
      <Grid container xs={10} style={{ margin: 'auto', gap: 0 }} spacing={0}>
        <Grid className={classes.sloganText}>Ресурсы</Grid>
        <FilterLine setSelectedCategory={setFilter} selectedCategory={filter} isResourcesPage />
        <Line marginTop={10} marginBottom={70} />
        {loading ? (
          <SkeletonResources />
        ) : (
          <Grid container justifyContent="space-between" columnSpacing={6}>
            {filteredData &&
              filteredData.map((resourse: ResourceTypes) => (
                <Grid
                  key={resourse.id}
                  item
                  container
                  justifyContent="space-between"
                  xl={6}
                  lg={6}
                  md={6}
                  sm={6}
                  xs={12}
                  style={{
                    marginBottom: width < 600 ? 40 : 60,
                  }}
                >
                  <ResourceCard
                    key={resourse.id}
                    id={resourse.id}
                    publicDate={resourse.createdAt}
                    category={resourse.category}
                    title={resourse.title}
                    workerId={resourse.author.worker.id}
                    firstname={resourse.author.worker.firstname}
                    lastname={resourse.author.worker.lastname}
                    ownerAvatar={resourse.author.worker.avatar.link}
                    resourceOwnerId={resourse.author.worker.id}
                    shortDescription={resourse.description}
                    article={resourse.article}
                    img={resourse.poster?.link}
                    contentId={resourse.id}
                    isOffer={resourse.isOffer ? resourse.isOffer : false}
                    isResource={resourse.isResource}
                    isNews={resourse.isNews ? resourse.isNews : false}
                    isOwner={false}
                    ownerId={0}
                    isApproved={true}
                    refetch={refetch}
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </Grid>
      <Footer footerMobileTopIdent={100} footerTopIdent={200} />
    </Grid>
  );
};

export default Resources;
