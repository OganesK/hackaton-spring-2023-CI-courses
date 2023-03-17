import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import { Grid } from '@mui/material';

import Loading from '../../UI/Loading/Loading';
import { MessagesPageContext } from '../../../Pages/Messages/context';
import GroupItem from '../GroupItem/GroupItem';
import GroupSearch from '../GroupSearch/GroupSearch';
import CreateGroup from './CreateGroupModal/CreateGroup';

import { GET_MY_GROUPS } from '../graphql/query';
import { IMyGroup } from '../typings';

import { GroupsSidebar, MenuToggleBtn } from './style';
import { DivMessagePageScrollbar } from '../style';

const GroupSidebar: React.FC = () => {
  const { activeGroupId } = useContext(MessagesPageContext);

  const { data, loading } = useQuery<{ getMyGroups: IMyGroup[] }>(GET_MY_GROUPS);
  const [filteredGroups, setFilteredGroups] = useState<IMyGroup[] | undefined>(data?.getMyGroups);

  useEffect(() => {
    if (!data) return;
    setFilteredGroups(data.getMyGroups);
  }, [data]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuToggle = (): void => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    handleMenuToggle();
  }, [activeGroupId]);

  return (
    <GroupsSidebar item $isMenuOpen={isMenuOpen}>
      <MenuToggleBtn onClick={handleMenuToggle} $isMenuOpen={isMenuOpen}>
        {isMenuOpen ? <CloseIcon /> : <ChatIcon />}
      </MenuToggleBtn>
      <Grid container style={{ padding: '0 30px', gap: 20 }}>
        <GroupSearch groups={data?.getMyGroups} setFilteredGroups={setFilteredGroups} />
        <CreateGroup />
      </Grid>
      <DivMessagePageScrollbar style={{ overflowY: 'auto', height: '100%' }}>
        {loading ? (
          // Докинуть сюда скелетонов
          <Loading />
        ) : (
          filteredGroups?.map(group => {
            return <GroupItem key={group.id} group={group} />;
          })
        )}
      </DivMessagePageScrollbar>
    </GroupsSidebar>
  );
};
export default GroupSidebar;
