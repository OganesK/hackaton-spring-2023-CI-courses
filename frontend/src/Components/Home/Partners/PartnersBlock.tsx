import React from 'react';

import PartnerContainer from '../../UI/PartnerContainer/PartnerContainer';

import { Partners } from './Styles';
import { IPartner } from './typings';

export default function PartnersBlock(): JSX.Element {
  const partnersData: IPartner[] = [
    { img: 'dstu.webp', link: 'https://donstu.ru/' },
    { img: 'logo-tpp.webp', link: 'https://tpprf.ru/ru/' },
    { img: 'mediapark.webp', link: 'http://mediapark.pro/' },
    { img: 'magika.webp', link: 'http://magicamedia.com/' },
    { img: 'itpark.webp', link: 'https://south-itpark.ru/' },
    { img: 'ITHUB_game.webp', link: 'https://ithub.games/' },
  ];

  return (
    <Partners container xs direction="row" justifyContent="center">
      {partnersData.map((partner, index) => (
        <PartnerContainer key={index} img={partner.img} link={partner.link} />
      ))}
    </Partners>
  );
}
