import React from 'react';
import { useMediaQuery } from 'react-responsive';
import Grid from '@mui/material/Grid';

import { useWindowSize } from '../../rules/index';

import ProfileNewsBlock from '../../Components/ProfilePage/ProfileNewsBlock/ProfileNewsBlock';


import { SingleProjectsContentProps } from './typings';

import '../UI/Styles/CSS/TextStyles/style.css';

const ContentBlock: (props: SingleProjectsContentProps) => JSX.Element = (props: SingleProjectsContentProps) => {
  const [width] = useWindowSize();

  const firstDefaultBlockHeight = width / 5.2;
  const secondDefaultBlockHeight = width / 4.4;
  const thirdDefaultBlockHeight = width / 2;

  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 960px)' });

  return (
    <Grid container>
      {/* {props.isNoPostAtUser === false ? (
        <>
          <Grid container justifyContent="space-between" columnSpacing={6}>
            {props.contentValues.map(contentValues => (
              <>
                {props.value === 'Ресурсы' &&
                contentValues.isResource &&
                (props.isOwner || contentValues.isApproved) ? (
                  <Grid
                    key={contentValues.id}
                    item
                    container
                    justifyContent="space-between"
                    xs={isTabletOrMobile ? 12 : 8}
                    style={{
                      marginBottom: width < 600 ? 40 : 60,
                    }}
                  >
                    <ProfileResourceBlock
                      key={contentValues.id}
                      id={contentValues.id}
                      publicDate={contentValues.createdAt}
                      category={contentValues.category}
                      title={contentValues.title}
                      workerId={contentValues.author.worker.id}
                      firstname={contentValues.author.worker.firstname}
                      lastname={contentValues.author.worker.lastname}
                      resourceOwnerId={contentValues.author.worker.id}
                      ownerAvatar={contentValues.author.worker.avatar.link}
                      ownerId={props.ownerId}
                      isOwner={props.isOwner}
                      contentId={contentValues.id}
                      shortDescription={contentValues.description}
                      article={contentValues.article}
                      img={contentValues.poster?.link}
                    
                      isResource={contentValues.isResource ? contentValues.isResource : false}
                      isNews={contentValues.isNews ? contentValues.isNews : false}
                      isApproved={contentValues.isApproved}
                      refetch={props.refetch}
                      customFirstDefaultHeight={isTabletOrMobile ? width / 2 : (width - width / 4.5) / 3.2}
                    />
                  </Grid>
                ) : props.value === 'Объявления' &&
                  contentValues.isOffer &&
                  (props.isOwner || contentValues.isApproved) ? (
                  <Grid key={contentValues.id} item xs={12} xl={8}>
                    <ProfileOfferBlock
                      key={contentValues.id}
                      id={contentValues.id}
                      isOwner={props.isOwner}
                      contentId={contentValues.id}
                      offerOwnerId={contentValues.author.worker.id}
                      firstname={contentValues.author.worker.firstname}
                      lastname={contentValues.author.worker.lastname}
                      ownerAvatar={contentValues.author.worker.avatar.link}
                      ownerId={props.ownerId}
                      shortDescription={contentValues.description}
                      title={contentValues.title}
                      img={contentValues.poster?.link}
                      publicDate={contentValues.createdAt}
                      isOffer={contentValues.isOffer ? contentValues.isOffer : false}
                      isResource={contentValues.isResource ? contentValues.isResource : false}
                      isNews={contentValues.isNews ? contentValues.isNews : false}
                      isApproved={contentValues.isApproved}
                      refetch={props.refetch}
                    />
                  </Grid>
                ) : props.value === 'Новости' && contentValues.isNews && (props.isOwner || contentValues.isApproved) ? (
                  <Grid
                    key={contentValues.id}
                    item
                    xs={width < 601 ? 12 : 6}
                    style={{
                      marginBottom: width < 600 ? 40 : 60,
                    }}
                  >
                    <ProfileNewsBlock
                      key={contentValues.id}
                      id={contentValues.id}
                      isOwner={props.isOwner}
                      contentId={contentValues.id}
                      ownerId={props.ownerId}
                      shortDescription={contentValues.description}
                      article={contentValues.article}
                      title={contentValues.title}
                      img={contentValues.poster?.link}
                      workerId={contentValues.author.worker.id}
                      firstname={contentValues.author.worker.firstname}
                      lastname={contentValues.author.worker.lastname}
                      newsOwnerId={contentValues.author.worker.id}
                      ownerAvatar={contentValues.author.worker.avatar.link}
                      publicDate={contentValues.createdAt}
                      isOffer={contentValues.isOffer ? contentValues.isOffer : false}
                      isResource={contentValues.isResource ? contentValues.isResource : false}
                      isNews={contentValues.isNews ? contentValues.isNews : false}
                      isApproved={contentValues.isApproved}
                      heightTwoElementInGrid={
                        width < 601
                          ? thirdDefaultBlockHeight
                          : width > 600 && width < 961
                          ? secondDefaultBlockHeight
                          : firstDefaultBlockHeight
                      }
                      refetch={props.refetch}
                    />
                  </Grid>
                ) : null}
              </>
            ))}
          </Grid>
        </>
      ) : null} */}
    </Grid>
  );
};

export default ContentBlock;
