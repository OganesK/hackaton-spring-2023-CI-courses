/*eslint-disable  @typescript-eslint/no-unsafe-assignment*/

import React, { useContext, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useQuery } from '@apollo/client';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

import { userContext } from '../../../Context/context';
import { useWindowSize } from '../../../rules/index';

import ProfileProjectPoster from './ProfileProjectPoster';

import SkeletonProjects from '../../UI/SkeletonBlocks/SkeletonProjects/SkeletonProjects';
import ProjectCreationModal from '../Modals/ProjectCreationModal';

import { GET_PROJECTS_QUERY } from '../../../Queries';
import { ProfileProjectProps } from './typing';

const ProfileProjectsBlock: (props: ProfileProjectProps) => JSX.Element = (props: ProfileProjectProps) => {
  const { loading } = useQuery(GET_PROJECTS_QUERY);
  const [width] = useWindowSize();

  const contextUserData = useContext(userContext);

  const [openModal, setOpenModal] = useState(false);

  const handleOpenClose: () => void = () => {
    setOpenModal(!openModal);
  };

  return (
    <Grid container justifyContent="center" style={{ gap: 30 }}>
      {contextUserData.user && contextUserData.user.id === props.userid ? (
        <Grid container direction="row" justifyContent={width < 961 ? 'center' : 'flex-end'} alignItems="center">
          <ProjectCreationModal
            ownerId={0}
            open={openModal}
            handleOpenClose={handleOpenClose}
            refetchOnProfilePage={props.refetch}
            isProfilePage
          />
          <Button
            onClick={handleOpenClose}
            variant="text"
            startIcon={<AddIcon />}
            sx={{
              color: width < 961 ? '#252525' : '#AAADB2',
              fontWeight: 500,
              fontSize: 18,
            }}
          >
            Добавить
          </Button>
        </Grid>
      ) : null}

      <Grid container direction="row" justifyContent="flex-start" columnSpacing={6}>
        {loading ? (
          <SkeletonProjects />
        ) : (
          <>
            {props.workActivity &&
              props.workActivity.map(work => (
                <>
                  {props.isOwner ||
                  (contextUserData.user && contextUserData.user.id === props.userid) ||
                  work. ? (
                    <Grid
                      key={work.id}
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
                      <ProfileProjectPoster
                        isOwner={
                          props.isOwner || (contextUserData?.user?.id && props.userid === contextUserData.user.id)
                            ? true
                            : false
                        }
                        projectId={work.id}
                        header={
                          work.updatedVariable?.name
                            ? props.isOwner === true ||
                              (contextUserData?.user?.id && props.userid === contextUserData.user.id)
                              ? work.updatedVariable.name
                              : work.name
                            : work.name
                        }
                        shortDescription={
                          work.updatedVariable?.shortDescription
                            ? props.isOwner === true ||
                              (contextUserData?.user?.id && props.userid === contextUserData.user.id)
                              ? work.updatedVariable.shortDescription
                              : work.shortDescription
                            : work.shortDescription
                        }
                        img={
                          work.updatedVariable?.poster?.link
                            ? props.isOwner === true ||
                              (contextUserData?.user?.id && props.userid === contextUserData.user.id)
                              ? work.updatedVariable?.poster?.link
                              : work.poster?.link
                            : work.poster?.link
                        }
                        ={work.}
                        updatedVariable={work.updatedVariable}
                        category={work.category}
                      />
                    </Grid>
                  ) : null}
                </>
              ))}
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default ProfileProjectsBlock;
