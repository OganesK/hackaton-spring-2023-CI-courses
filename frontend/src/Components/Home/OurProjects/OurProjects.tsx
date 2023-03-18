import React from 'react';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

import ArrowButton from '../../UI/Buttons/ArrowButton/ArrowButton';
import ProjectPoster from '../../UI/ProjectPoster/ProjectPoster';

import ComponentTextHeader from '../ComponentTextHeader/ComponentTextHeader';
import ProjectCard from '../../ProjectsPage/ProjectCard';
import Line from '../../UI/Line/Line';

import { useWindowSize } from '../../../rules/index';

import { OurProjectsProps, ProjectTypes } from './typing';

import useStyles from './Styles';

const OurProjects: (props: OurProjectsProps) => JSX.Element = (props: OurProjectsProps) => {
  const history = useHistory();

  const onClickHandler: () => void = () => {
    history.push('/projects');
  };

  const [width] = useWindowSize();

  const classes = useStyles();

  return (
    <Grid container direction="column" justifyContent="center">
      <ComponentTextHeader text="Решения акселератора" />
      {width < 600 ? (
        <Grid style={{ marginTop: 40, marginBottom: 10 }}>
          {props.projectsShownOnLanding &&
            props.projectsShownOnLanding.map((project: ProjectTypes) => (
              <Grid
                key={project.id}
                item
                xs={12}
                style={{
                  marginBottom: 20,
                }}
              >
                <ProjectCard
                  category={project.category}
                  title={project.shortDescription}
                  shortContent={project.shortDescription}
                  projectId={project.id}
                  img={project.poster?.link}
                  key={project.name}
                />
              </Grid>
            ))}
        </Grid>
      ) : (
        <>
          <Line marginTop={40} />

          {props.projectsShownOnLanding &&
            props.projectsShownOnLanding.map((project: ProjectTypes) => (
              <>
                <ProjectPoster
                  id={project.id}
                  header={project.name}
                  title={project.shortDescription}
                  authors={project.workers}
                  img={project.poster?.link}
                  key={project.name}
                />
                <Line />
              </>
            ))}
        </>
      )}
      <Grid container xs justifyContent="center">
        <ArrowButton onClick={onClickHandler} text="Смотреть Другие курсы" className={classes.colorLink} />
      </Grid>
    </Grid>
  );
};

export default OurProjects;
