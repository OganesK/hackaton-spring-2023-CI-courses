import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useQuery } from '@apollo/client';

import { useWindowSize } from '../../rules/index';

import NavBar from '../../Components/UI/NavBar/NavBar';
import useStyles from '../../Components/UI/Styles/TS/TextStyles/style';
import FilterLine from '../../Components/UI/FilterLine/FilterLine';
import SkeletonProjects from '../../Components/UI/SkeletonBlocks/SkeletonProjects/SkeletonProjects';

import Footer from '../../Components/Home/Footer/Footer';
import NewsCard from '../../Components/ProfilePage/ProfileNewsBlock/ProfileNewsBlock';
import Line from '../../Components/UI/Line/Line';

import { GET_NEWS_QUERY } from '../../Queries';
import { NewsTypes } from './typings';
import { TabletOrMobile } from '../../helpers/constants/constants';

const NewsPage: () => JSX.Element = () => {
  const styles = useStyles();
  const [filter, setFilter] = useState('Все');
  const [filteredData, setFilteredData] = useState<NewsTypes[]>([]);

  const [width] = useWindowSize();

  const { data, loading, refetch } = useQuery<{ posts: NewsTypes[] }>(GET_NEWS_QUERY);

  useEffect(() => {
  }, [loading]);

  useEffect(() => {
    
  }, [filter]);

  return (
    <Grid container xs={12} spacing={0}>
      <NavBar text="qwe" />
      <Grid container xs={10} style={{ margin: 'auto', gap: 0 }} spacing={0}>
        <Grid className={styles.sloganText}>Уроки</Grid>
        <Line marginTop={10} marginBottom={70} />

        {loading ? (
          <SkeletonProjects />
        ) : (
          <Grid container direction="row" justifyContent="flex-start" columnSpacing={6}>
            {filteredData &&
              filteredData.map((news: NewsTypes) => (
                <Grid
                  key={news.id}
                  item
                  xl={4}
                  lg={4}
                  md={6}
                  sm={6}
                  xs={12}
                  style={{
                    marginBottom: width < 600 ? 40 : 60,
                  }}
                >
                  <NewsCard
                    key={news.id}
                    id={news.id}
                    contentId={news.id}
                    ownerId={0}
                    workerId={news.author.worker.id}
                    firstname={news.author.worker.firstname}
                    lastname={news.author.worker.lastname}
                    newsOwnerId={news.author.worker.id}
                    ownerAvatar={news.author.worker.avatar.link}
                    publicDate={news.createdAt}
                    title={news.title}
                    shortDescription={news.description}
                    img={news.poster?.link}
                    article={news.article}
                    isOffer={news.isOffer ? news.isOffer : false}
                    isResource={news.isResource ? news.isResource : false}
                    isNews={news.isNews}
                    isOwner={false}
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

export default NewsPage;
