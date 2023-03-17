import React, { useState } from 'react';

import { Grid } from '@mui/material';

import Chat from '../../Components/MessagesPage/Chat/Chat';
import GroupSidebar from '../../Components/MessagesPage/GroupsSidebar/GroupsSidebar';

import Navbar from '../../Components/UI/NavBar/NavBar';

import { FS24 } from '../../rules/index';
import { MessagesPageContext } from './context';
import { GridChat } from './Style';
import { MatchProps } from './typing';

const MessagesPage = (props: MatchProps): JSX.Element => {
  const [activeGroupId, setActiveGroupId] = useState<number>(
    props.match.params.groupId ? parseInt(props.match.params.groupId) : -1,
  );

  return (
    <MessagesPageContext.Provider value={{ activeGroupId, setActiveGroupId }}>
      <Grid container>
        <Navbar text="qwe" />
        <GridChat item container wrap="nowrap">
          <GroupSidebar />
          <Grid item xs style={{ zIndex: 210, position: 'relative' }}>
            {activeGroupId === -1 ? (
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ height: '100%', fontSize: FS24, borderTop: '1px solid #EBEBEB' }}
              >
                Выберите диалог
              </Grid>
            ) : (
              <Chat />
            )}
          </Grid>
        </GridChat>
      </Grid>
    </MessagesPageContext.Provider>
  );
};

export default MessagesPage;
