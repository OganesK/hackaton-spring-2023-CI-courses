import { Avatar, Card, CardActionArea, Grid } from '@material-ui/core';
import GroupsIcon from '@mui/icons-material/Groups';
import React, { useContext } from 'react';
import { userContext } from '../../../Context/context';
import { MessagesPageContext } from '../../../Pages/Messages/context';
import { GroupItemProps, IGroupMember } from '../typings';
import * as S from './style';

export const getInterlocutorAvatarLink = (members: IGroupMember[], userId: number): string | undefined => {
  for (const member of members) {
    if (member.id !== userId) {
      return member.avatar?.link;
    }
  }
};

export const getInterlocutorFullName = (members: IGroupMember[], userId: number): string | undefined => {
  for (const member of members) {
    if (member.id !== userId) {
      return `${member.firstname} ${member.lastname}`;
    }
  }
};

const GroupItem: React.FC<GroupItemProps> = ({ group }) => {
  const Context = useContext(userContext);
  const { activeGroupId, setActiveGroupId } = useContext(MessagesPageContext);

  const handleGroupChange = (): void => {
    setActiveGroupId(group.id);
  };

  return (
    <Card
      onClick={handleGroupChange}
      style={{
        boxShadow: 'none',
        borderRadius: 'none',
        backgroundColor: activeGroupId === group.id ? '#f9f9f9' : '',
      }}
    >
      <CardActionArea disabled={activeGroupId === group.id ? true : false}>
        <S.CardBody container alignItems="center" wrap="nowrap">
          <S.AvatarWrapper item>
            {group.type === 'private' && (
              <Avatar
                src={getInterlocutorAvatarLink(group.members, Context.user.id)}
                style={{ width: 50, height: 50 }}
              />
            )}
            {group.type === 'public' &&
              (group.avatar?.link ? (
                <Avatar src={group.avatar.link} style={{ width: 50, height: 50 }} />
              ) : (
                <Avatar style={{ width: 50, height: 50 }}>
                  <GroupsIcon />
                </Avatar>
              ))}
          </S.AvatarWrapper>
          <S.GroupData>
            <S.GroupTitle>
              {group.type === 'private' && getInterlocutorFullName(group.members, Context.user.id)}
              {group.type === 'public' && group.title}
              <Grid item style={{ fontSize: 14, color: '#AAADB2', whiteSpace: 'nowrap', fontWeight: 400 }}>
                {group.messages.length > 0
                  ? group.messages[group.messages.length - 1].sender.id === Context.user.id
                    ? `Вы: ${group.messages[group.messages.length - 1].text}`
                    : group.messages[group.messages.length - 1].text
                  : null}
              </Grid>
            </S.GroupTitle>
            {/* how to get last message time? Apollo cache? Another query? Or specialized query? */}
          </S.GroupData>
        </S.CardBody>
      </CardActionArea>
    </Card>
  );
};
export default GroupItem;
