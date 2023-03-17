import React from 'react';
import Grid from '@mui/material/Grid';

import { useHistory } from 'react-router-dom';

import ArrowButton from '../../UI/Buttons/ArrowButton/ArrowButton';

import ComponentTextHeader from '../ComponentTextHeader/ComponentTextHeader';
import OfferCard from '../../ProfilePage/ProfileOfferBlock/ProfileOfferBlock';

import { useWindowSize } from '../../../rules/index';

import { OffersProps, OffersTypes } from './typing';
import useStyles from './Styles';

const OffersBlock: (props: OffersProps) => JSX.Element = (props: OffersProps) => {
  const [width] = useWindowSize();
  const history = useHistory();
  const classes = useStyles();

  const onClickHandler: () => void = () => {
    history.push('/ads');
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      style={{ gap: width < 600 ? 20 : width < 961 ? 30 : width < 1536 ? 60 : 0 }}
    >
      <Grid container xs={12} xl={4}>
        <ComponentTextHeader text="Объявления" />
      </Grid>
      <Grid container xs={12} xl={8} justifyContent="flex-start">
        {props.offersOnLanding &&
          props.offersOnLanding.map((offer: OffersTypes) => (
            <Grid key={offer.id} item>
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
                isOffer={true}
                isResource={false}
                isNews={false}
                isOwner={false}
                isApproved={true}
                refetch={props.refetch}
              />
            </Grid>
          ))}
        <Grid container xs justifyContent={width < 1536 ? 'center' : 'flex-start'}>
          <ArrowButton onClick={onClickHandler} text="Смотреть все объявления" className={classes.colorLink} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OffersBlock;
