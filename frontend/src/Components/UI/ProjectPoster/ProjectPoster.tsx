import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import { useWindowSize } from '../../../rules/index';

import { ProjectPosterProps } from './typing';

import useStyles from './Styles';

const ProjectPoster: (props: ProjectPosterProps) => JSX.Element = (props: ProjectPosterProps) => {
  const classes = useStyles();

  const [width] = useWindowSize();
  const firstDefaultBlockHeight = width / 3.5;
  const secondDefaultBlockHeight = width / 2.2;

  const [hover, setHover] = useState(false);
  const history = useHistory();

  return (
    <Grid container direction="row" justifyContent="space-between" className={classes.project}>
      <Grid container xl={8} lg={7} md={7} sm={12} xs={12}>
        <Grid
          className={classes.projectImage}
          style={{
            backgroundImage: `url(${props.img})`,
            height: width > 960 ? firstDefaultBlockHeight : secondDefaultBlockHeight,
            transform: hover ? 'scale(1.01)' : 'scale(1.0)',
            boxShadow: hover ? '0px 4px 8px rgba(0,0,0,0.25)' : '0px 0px 0px rgba(0,0,0,0.25)',
            transition: 'all 0.5s ease',
            cursor: 'pointer',
          }}
          onMouseOver={(): void => setHover(true)}
          onMouseOut={(): void => setHover(false)}
          onClick={(): void => history.push(`/projects/project/${props.id}`)}
        />
      </Grid>
      <Grid container direction="column" justifyContent="space-between" xl lg md sm={12} xs={12}>
        <Grid container direction="column" style={{ gap: 30 }}>
          <Grid className={classes.projectDescriptionHeader}>{props.header}</Grid>
          <Grid className={classes.projectDescriptionTitle}>{props.title}</Grid>
        </Grid>

        <Grid className={classes.projectDescriptionLinkContainer}>
          {props.authors.map(author => (
            <Grid
              key={author.worker.firstname}
              className={classes.projectDescriptionLink}
              onClick={(): void => history.push(`/profile/${author.worker.id}`)}
            >
              {`${author.worker.firstname} ${author.worker.lastname}`}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ProjectPoster;
