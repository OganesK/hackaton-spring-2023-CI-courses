import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useQuery } from '@apollo/client';

import NavBar from '../../Components/UI/NavBar/NavBar';
import useStyles from '../../Components/UI/Styles/TS/TextStyles/style';
import SkeletonOffers from '../../Components/UI/SkeletonBlocks/SkeletonOffers/SkeletonOffers';
import FilterLine from '../../Components/UI/FilterLine/FilterLine';

import Footer from '../../Components/Home/Footer/Footer';

import OfferCard from '../../Components/ProfilePage/ProfileOfferBlock/ProfileOfferBlock';
import Line from '../../Components/UI/Line/Line';

import { GET_OFFERS_QUERY } from '../../Queries';
import { OfferTypes } from './typings';
import { TabletOrMobile } from '../../helpers/constants/constants';

const OffersPage: () => JSX.Element = () => {
  const classes = useStyles();

  const { data, loading, refetch } = useQuery<{ posts: OfferTypes[] }>(GET_OFFERS_QUERY);

  const [filter, setFilter] = useState('Все');
  const [filteredData, setFilteredData] = useState<OfferTypes[]>([]);

  useEffect(() => {
    if (!loading) {
      setFilteredData(data!.posts.filter((post: OfferTypes) => post.isOffer));
    }
  }, [loading]);

  useEffect(() => {
    if (filter !== 'Все' && data) {
      const filtered = data.posts.filter(post => post.category === filter && post.isOffer);
      setFilteredData(filtered);
    } else if (data && filter === 'Все') {
      setFilteredData(data.posts.filter((post: OfferTypes) => post.isOffer));
    }
  }, [filter]);

  return (
    <Grid container xs={12} spacing={0}>
      <NavBar text="qwe" />
      <Grid container xs={10} style={{ margin: 'auto', gap: 0 }} spacing={0}>
        <Grid className={classes.sloganText}>Объявления</Grid>
        <FilterLine selectedCategory={filter} setSelectedCategory={setFilter} isOffersPage />
        <Line marginTop={10} marginBottom={70} />
        {loading ? (
          <SkeletonOffers />
        ) : (
          <Grid container direction="row" justifyContent="flex-start">
            {filteredData &&
              filteredData.map((offer: OfferTypes) => (
                <Grid key={offer.id} item xs={12} xl={8}>
                  <OfferCard
                    key={offer.id}
                    id={offer.id}
                    contentId={offer.id}
                    ownerId={0}
                    publicDate={offer.createdAt}
                    title={offer.title}
                    shortDescription={offer.description}
                    offerOwnerId={offer.author.worker.id}
                    firstname={offer.author.worker.firstname}
                    lastname={offer.author.worker.lastname}
                    ownerAvatar={offer.author.worker.avatar.link}
                    img={offer.poster?.link}
                    isOffer={offer.isOffer}
                    isResource={offer.isResource ? offer.isResource : false}
                    isNews={offer.isNews ? offer.isNews : false}
                    isOwner={false}
                    isApproved={true}
                    refetch={refetch}
                  />
                </Grid>
              ))}
          </Grid>
        )}
      </Grid>
      <Footer footerMobileTopIdent={120} footerTopIdent={200} />
    </Grid>
  );
};

export default OffersPage;
