import React, { useState, useRef } from 'react';

import {
  Grid,
  IconButton,
  Button,
  //  Divider,
  Menu,
  MenuItem,
} from '@mui/material';

import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
// import AutorenewIcon from '@mui/icons-material/Autorenew';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Navigation } from 'swiper';
import 'swiper/swiper-bundle.min.css';

import SnackbarOnChange from '../UI/Snackbar/Snackbar';
import NoneClick from '../UI/NoneClickableField/NoneClick';
import { ModalImage, ModalImageContainer } from '../UI/Styles/TS/Style';

import imgModalDefault from '../../assets/img/imgModal.svg';

import { GetUrlToUploadMediaMutation, GetUrlToUploadPosterMutation, DeleteMediaMutation } from './graphql/mutations';
import { ImageSliderProps } from './typings';
import useStyles from './Styles';

const ImageSlider = (props: ImageSliderProps): JSX.Element => {
  const classes = useStyles();
  const [hover, setHover] = useState(false);

  const GetPosterUploadUrl = GetUrlToUploadPosterMutation();
  const GetUrlToUploadHandler = GetUrlToUploadMediaMutation();

  const sliderMaxHeight = '82vh';
  const [index, setIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const hiddenPosterInput = useRef<HTMLInputElement>(null);

  const [openSnack, setOpenSnack] = useState(false);
  const [openNoneClick, setOpenNoneClick] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose: () => void = () => {
    setAnchorEl(null);
  };

  const deleteMedia = DeleteMediaMutation();
  const deleteMediaHandler: () => Promise<void> = async () => {
    const deleteData = {
      mediaUrl: props.images[index].link,
    };
    await deleteMedia(deleteData);
    await props.refetch();
  };

  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperBodyRef = useRef<HTMLDivElement>(null);

  const setFinishedIndex: (i: number) => void = (i: number) => {
    setIndex(i);
  };

  const handlePosterUploadClick: () => void = () => {
    hiddenPosterInput?.current!.click();
  };

  const handleClick: () => void = () => {
    hiddenFileInput?.current!.click();
  };

  const posterUploadHandler: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void> = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleMenuClose();
    setOpenNoneClick(true);
    const newPosterUploaded = event.target.files![0];
    const newPosterData = {
      entityType: 'projectPoster',
      fileType: newPosterUploaded.type,
      entityId: Number(props.projectId),
    };
    const urlForFetch = (await GetPosterUploadUrl(newPosterData)).data;
    const fixedUrl = decodeURIComponent(urlForFetch!.createMedia?.signedURL);
    await fetch(fixedUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {},
      body: newPosterUploaded,
    });
    // await props.refetch();
    setOpenSnack(true);
    setOpenNoneClick(false);
    setTimeout(() => setOpenSnack(false), 4000);
  };

  const handleChange: (event: React.ChangeEvent<HTMLInputElement>) => Promise<void> = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setOpenNoneClick(true);
    const fileUploaded = event.target.files![0];
    const projectMediaData = {
      entityType: 'projectMedia',
      entityId: Number(props.projectId),
      fileType: fileUploaded.type,
    };
    const uploadUrl = (await GetUrlToUploadHandler(projectMediaData)).data;
    const fixedUrl = decodeURIComponent(uploadUrl!.createMedia?.signedURL);
    await fetch(fixedUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {},
      body: fileUploaded,
    });
    await props.refetch();
    setOpenNoneClick(false);
  };

  return (
    <Grid container direction="row" xs={12}>
      <Grid ref={swiperBodyRef} item style={{ width: '100%', minWidth: 0 }}>
        {props.images.length === 0 ? (
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            className={classes.sliderNoSlidesThumb}
          >
            <Grid className={classes.textEmptyBlock}>
              Загрузите фото или видео <br /> вашего продукта
            </Grid>
            <Grid
              container
              className={classes.imgContainerNoSlides}
              style={{
                backgroundColor: hover ? '#f4f5fa' : '',
                transition: 'all .5s ease',
              }}
              justifyContent="center"
              alignItems="center"
              onClick={handleClick}
              onMouseOver={(): void => setHover(true)}
              onMouseOut={(): void => setHover(false)}
            >
              <img src={imgModalDefault} className={classes.imgNoSlides} />
              <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
            </Grid>
          </Grid>
        ) : (
          <Grid container style={{ gap: 30 }}>
            {openNoneClick ? <NoneClick /> : null}
            {props.editableFields === false ? (
              <Grid container xs={12}>
                <Grid container xs={10} justifyContent="flex-end" style={{ margin: 'auto' }}>
                  <Button
                    onClick={handleMenuClick}
                    variant="text"
                    startIcon={<VideoSettingsIcon />}
                    sx={{
                      color: '#AAADB2',
                      fontWeight: 500,
                      fontSize: 'clamp(0.813rem, 0.6258rem + 0.8320vw, 1.125rem)',
                      lineHeight: '100%',
                    }}
                  >
                    Управление слайдером
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                    sx={{ zIndex: 1 }}
                  >
                    {/* <MenuItem onClick={handlePosterUploadClick}>
                    <Grid container alignItems="center" style={{ gap: 15, color: '#AAADB2' }}>
                      <AutorenewIcon />
                      <div style={{ fontSize: 18, fontWeight: 300, lineHeight: '120%' }}>Изменить обложку</div>
                    </Grid>
                    <input type="file" ref={hiddenPosterInput} onChange={posterUploadHandler} style={{ display: 'none' }} />
                  </MenuItem>
                  <Divider variant="middle" /> */}

                    <MenuItem onClick={handleClick}>
                      <Grid container alignItems="center" style={{ gap: 15, color: '#AAADB2' }}>
                        <AddIcon />
                        <div style={{ fontSize: 18, fontWeight: 300, lineHeight: '120%' }}>Добавить слайд</div>
                      </Grid>
                      <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: 'none' }} />
                    </MenuItem>
                    {props.images.length === 0 ? null : (
                      <MenuItem onClick={deleteMediaHandler}>
                        <Grid container alignItems="center" style={{ gap: 15, color: '#AAADB2' }}>
                          <CloseIcon />
                          <div style={{ fontSize: 18, fontWeight: 300, lineHeight: '120%' }}>Удалить слайд</div>
                        </Grid>
                      </MenuItem>
                    )}
                  </Menu>
                </Grid>
              </Grid>
            ) : null}
            <Swiper
              style={{ position: 'relative', height: '100%' }}
              modules={[Navigation]}
              autoHeight={true}
              simulateTouch={true}
              slidesPerView={1}
              spaceBetween={40}
              speed={500}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onSlideChange={swiper => {
                setFinishedIndex(swiper.realIndex);
              }}
            >
              {props.images.map((image: { link: string; type: string }, index: number) => {
                return (
                  <SwiperSlide key={image.link}>
                    {image.type === 'video' ? (
                      <Grid
                        xs
                        container
                        justifyContent="center"
                        style={{
                          backgroundColor: '#f4f5fa',
                          cursor: 'pointer',
                          filter:
                            props.notApprovedImage && props.editableFields === false
                              ? 'drop-shadow(6px 6px 10px #24B95C)'
                              : 'none',
                        }}
                      >
                        <video
                          style={{
                            objectFit: 'contain',
                            maxWidth: '100%',
                            height: sliderMaxHeight,
                          }}
                          controls
                          muted={isMuted}
                          autoPlay={true}
                          loop={false}
                          preload={'auto'}
                          src={image.link}
                        />
                      </Grid>
                    ) : (
                      <Grid
                        xs
                        container
                        justifyContent="center"
                        style={{
                          backgroundColor: '#f4f5fa',
                          cursor: 'pointer',
                          filter:
                            props.notApprovedImage && props.editableFields === false
                              ? 'drop-shadow(6px 6px 10px #24B95C)'
                              : 'none',
                        }}
                      >
                        <img
                          key={image.link}
                          src={image.link}
                          style={{
                            objectFit: 'contain',
                            maxWidth: '100%',
                            height: sliderMaxHeight,
                          }}
                        />
                      </Grid>
                    )}
                  </SwiperSlide>
                );
              })}
              {props.images.length > 1 ? (
                <div>
                  <IconButton
                    style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', zIndex: 100 }}
                    ref={navigationPrevRef}
                    disabled={index === 0 ? true : false}
                  >
                    <KeyboardArrowLeftRoundedIcon
                      sx={{
                        fontSize: 'clamp(70px, 8vw, 8vw)',
                        color: '#1976d2',
                        transition: '.5s all ease',
                        opacity: index === 0 ? 0 : 1,
                      }}
                    />
                  </IconButton>
                  <IconButton
                    style={{
                      position: 'absolute',
                      left: '100%',
                      top: '50%',
                      transform: 'translate(-100%, -50%)',
                      zIndex: 100,
                    }}
                    ref={navigationNextRef}
                    disabled={index === props.images.length - 1 ? true : false}
                  >
                    <KeyboardArrowRightRoundedIcon
                      sx={{
                        fontSize: 'clamp(70px, 8vw, 8vw)',
                        color: '#1976d2',
                        transition: '.5s all ease',
                        opacity: index === props.images.length - 1 ? 0 : 1,
                      }}
                    />
                  </IconButton>
                </div>
              ) : null}
            </Swiper>
          </Grid>
        )}
      </Grid>
      <SnackbarOnChange openSnack={openSnack} setOpenSnack={setOpenSnack} textInSnack="Обложка проекта обновлена" />
    </Grid>
  );
};

export default ImageSlider;
