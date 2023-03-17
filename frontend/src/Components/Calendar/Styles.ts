import { makeStyles } from '@material-ui/core/styles';
import { styled as styledMUI } from '@mui/material/styles';

import { FS18, FS24, FS48 } from '../../rules/index';

export const DescriptionResourceText = styledMUI('div')`
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  overflow: auto;
  transition: all .5s ease;
  padding: 15px 20px;
`;

export const ArrowIconWrapper = styledMUI('div')`
  position: absolute;
  right: 25px;
  bottom: 25px;
`;

const useStyles = makeStyles(() => ({
  eventsBox: {
    gap: 60,
  },
  eventsContainer: {
    // marginTop: 50,
    gap: 60,
  },

  //____________________ Event.ts

  //для глобал стайла

  eventCard: {
    backgroundColor: '#CFD1DC',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginBottom: 20,
    cursor: 'pointer',
  },

  posterTextBlock: {
    height: '100%',
    maxHeight: 'calc(100% - 55px)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: FS24,
  },

  dateText: {
    fontSize: FS18,
    lineHeight: '130%',
    color: '#fff',
    transition: 'all .3s ease',
    background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 48.32%, rgba(0, 0, 0, 0) 100%)',
    display: 'grid',
    justifyContent: 'space-between',
    gap: 20,
  },

  streamActiveText: {
    gap: 15,
    color: '#FF5631',
    '@media (max-width: 600px)': {
      gap: 5,
    },
  },

  titleText: {
    color: '#fff',
    fontSize: FS24,
    fontWeight: 500,
    lineHeight: '120%',
    textTransform: 'uppercase',
    background: 'linear-gradient(360deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.2) 48.32%, rgba(0, 0, 0, 0) 100%)',
  },

  topText: {
    fontSize: FS18,
    lineHeight: '130%',
    color: '#fff',
    textShadow: '1px 1px 2px #000',
    padding: '3px 7px',
    background: 'rgba(0,0,0,0.62)',
    borderRadius: '2px',
    transition: 'all .3s ease',
    position: 'absolute',
    left: 0,
    top: 0,
  },

  topTextRight: {
    fontSize: FS18,
    lineHeight: '130%',
    color: '#fff',
    textShadow: '1px 1px 2px #000',
    padding: '3px 7px',
    background: 'rgba(0,0,0,0.62)',
    borderRadius: '2px',
    transition: 'all .3s ease',
    position: 'absolute',
    right: 0,
    top: 0,
  },

  bottomText: {
    fontSize: FS24,
    lineHeight: '120%',
    color: '#fff',
    textTransform: 'uppercase',
    textShadow: '1px 1px 2px #000',
    padding: '3px 7px',
    background: 'rgba(0,0,0,0.62)',
    borderRadius: '2px',
    transition: 'all .3s ease',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },

  headerText: {
    fontSize: FS24,
    lineHeight: '120%',
    color: '#fff',
    textTransform: 'uppercase',
    textShadow: '1px 1px 2px #000',
    padding: '3px 7px',
    background: 'rgba(0,0,0,0.62)',
    borderRadius: '2px',
    transition: 'all .3s ease',
    position: 'absolute',
    left: 0,
    bottom: 0,
  },

  //______________________ Calendar

  calendarContainer: {
    maxHeight: 600,
    gap: 100,
  },
  calendar: {},

  //____________________

  eventInfoBox: {
    height: 200,
  },

  eventInfoContainer: {
    gap: 15,
  },

  eventInfoHeader: {
    fontSize: FS18,
    lineHeight: '100%',
    color: '#252525',
    textTransform: 'uppercase',
    fontWeight: 500,
  },

  eventInfoTitle: {
    fontSize: FS18,
    lineHeight: '130%',
    color: '#252525',
  },

  eventInfoMailBox: {
    gap: 20,
    marginTop: 10,
    // maxHeight: 50,
  },
  eventInfoButton: {
    width: '100%',
    height: '100%',
  },

  //_________________ EmptyEvents.ts

  emptyText: {
    color: '#252525',
    fontSize: FS24,
    lineHeight: '120%',
    fontWeight: 500,
  },

  //________Modal on Event

  fullModalHeader: {
    color: '#252525',
    fontSize: FS48,
    lineHeight: '116%',
    fontWeight: 500,
    textTransform: 'uppercase',
    // paddingBottom: 40,
  },

  fullModalDate: {
    color: '#AAADB2',
    fontSize: 16,
    lineHeight: '125%',
    fontWeight: 300,
    marginBottom: 40,
  },

  fullModalArticle: {
    color: '#252525',
    fontSize: 18,
    lineHeight: '130%',
    marginBottom: 20,
    wordBreak: 'break-word',
  },

  fullModalInfo: {
    fontSize: 20,
    lineHeight: '130%',
    marginBottom: 4,
    fontWeight: 500,
  },

  organizerText: {
    color: '#ff5631',
    fontSize: FS24,
    lineHeight: '100%',
    fontWeight: 500,
  },

  modalArticleHeader: {
    textTransform: 'uppercase',
    fontSize: FS18,
    color: '#252525',
    fontWeight: 500,
  },

  eventInfoText: {
    color: '#252525',
    fontSize: FS18,
    lineHeight: '120%',
    fontWeight: 500,
    // maxWidth: 300,
  },
}));

export default useStyles;
