import React, { useEffect, useState, useContext } from 'react';
import Grid from '@mui/material/Grid';
import { useMediaQuery } from 'react-responsive';

import { useQuery } from '@apollo/client';

import { useWindowSize } from '../../rules/index';

import NavBar from '../../Components/UI/NavBar/NavBar';
import SkeletonProjects from '../../Components/UI/SkeletonBlocks/SkeletonProjects/SkeletonProjects';
import FilterLine from '../../Components/UI/FilterLine/FilterLine';
import useStyles from '../../Components/UI/Styles/TS/TextStyles/style';

import Footer from '../../Components/Home/Footer/Footer';

import ProjectCard from '../../Components/ProjectsPage/ProjectCard';

import { GET_PROJECTS_QUERY } from '../../Queries';
import { ProjectsTypes } from './typings';

function FormRow(props: { data: ProjectsTypes[] | undefined; loading: boolean }): JSX.Element {
  const [width] = useWindowSize();
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });

  if (props.loading) {
    return <SkeletonProjects />;
  }

  return (
    <Grid container direction="row" justifyContent="flex-start" columnSpacing={6}>
      {props.data &&
        props.data.map((project: ProjectsTypes) => (
          <Grid
            key={project.id}
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
            <ProjectCard
              img={project.poster?.link}
              title={project.name}
              shortContent={'Description'}
              courseId={project.id}
            />
          </Grid>
        ))}
    </Grid>
  );
}

const Projects: () => JSX.Element = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState('Все');
  const [filteredData, setFilteredData] = useState<ProjectsTypes[]>();
  const { data, loading } = useQuery<{ courses: ProjectsTypes[] }>(GET_PROJECTS_QUERY);

  useEffect(() => {
    if (data && !loading) {
      setFilteredData(data.courses)
      console.log(filteredData)
    }
  }, [loading, data]);

  return (
    <Grid container xs={12}>
      <NavBar text="qwe" />
      <Grid container xs={10} style={{ margin: 'auto' }}>
      <Grid className={classes.sloganText}>Представленные курсы</Grid>
              <FormRow  data={filteredData} loading={loading}/>
      </Grid>
      <Footer footerMobileTopIdent={100} footerTopIdent={200} />
    </Grid>
  );
};

export default Projects;
