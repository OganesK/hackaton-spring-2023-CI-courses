import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { useMediaQuery } from 'react-responsive';

import { Snackbar, Button as MuiButton } from '@material-ui/core';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import CallIcon from '@mui/icons-material/Call';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';

import CopyIcon from '../../../assets/icons/chat/copy.svg';
import DeleteGroupIcon from '../../../assets/icons/chat/deletegroup.svg';
import LeaveGroupIcon from '../../../assets/icons/chat/leavegroup.svg';
import SaveIcon from '../../../assets/icons/chat/savechanges.svg';
import activeChatIndicator from '../../../assets/icons/visualConference/activeChatIndicator.svg';

import WifiCalling3OutlinedIcon from '@mui/icons-material/WifiCalling3Outlined';
import { Alert, Avatar, Grid, IconButton, TextField, Tooltip, Typography } from '@mui/material';

import Modal from 'react-responsive-modal';

import { userContext } from '../../../Context/context';
import { MessagesPageContext } from '../../../Pages/Messages/context';
import { FS14, FS18, useWindowSize } from '../../../rules';
import Line from '../../UI/Line/Line';
import Button from '../../UI/Buttons/OutlinedButton/Button';
import useStyles from '../../UI/Styles/TS/Components/createModalStyles/index';

import {
  ADD_MEMBERS_TO_GROUP_MUTATION,
  CREATE_MEDIA_MUTATION,
  DELETE_GROUP_MUTATION,
  LEAVE_FROM_GROUP_MUTATION,
  REMOVE_GROUP_ADMIN_MUTATION,
  REMOVE_MEMBERS_FROM_GROUP_MUTATION,
  SET_GROUP_ADMIN_MUTATION,
  UPDATE_GROUP_MUTATION,
} from '../graphql/mutation';
import { GET_MY_GROUPS, GET_USERS_WHICH_CAN_ADD_TO_GROUP } from '../graphql/query';
import { getInterlocutorAvatarLink, getInterlocutorFullName } from '../GroupItem/GroupItem';
import { GroupInfoProps, IGroupMember, IMyGroup } from '../typings';
import UsersAddToGroupInput from '../UsersAddToGroupInput';
import { GroupInfoModalButton, useStylesGroupModal } from './Style';

function getLexicalMembersWord(n: number): string {
  if (n >= 11 && n <= 14) return 'участников';
  else if (n % 10 == 1) return 'участник';
  else if (n % 10 <= 4) return 'участника';
  else return 'участников';
}

function isMemberAdmin(group: IMyGroup, userId: number): boolean {
  return group.admins.map(adm => adm.id).includes(userId);
}

const GroupInfo: React.FC<GroupInfoProps> = ({
  group,
  refetchGroupData,
  isChatStarted,
  isChatActive,
  handleJoinRoom,
  handleLeaveRoom,
}) => {
  const Context = useContext(userContext);
  const { setActiveGroupId } = useContext(MessagesPageContext);

  const [newAvatar, setNewAvatar] = useState<{ file: File | null; link: string }>({
    file: null,
    link: '',
  });
  const [newGroupTitle, setNewGroupTitle] = useState(group.title);
  const [usersToAdd, setUsersToAdd] = useState<IGroupMember[]>([]);
  const [usersToRemoveIds, setUsersToRemoveIds] = useState<number[]>([]);
  const [adminsToAddIds, setAdminsToAddIds] = useState<number[]>([]);
  const [adminsToRemoveIds, setAdminsToRemoveIds] = useState<number[]>([]);

  const [isDisabledUpdateBtn, setIsDisabledUpdateBtn] = useState(true);
  const [isGroupUpdating, setIsGroupUpdating] = useState(false);
  useEffect(() => {
    if (
      newGroupTitle === group.title &&
      !newAvatar.file &&
      usersToAdd.length === 0 &&
      usersToRemoveIds.length === 0 &&
      adminsToAddIds.length === 0 &&
      adminsToRemoveIds.length === 0
    )
      return;
    setIsDisabledUpdateBtn(false);
  }, [newGroupTitle, newAvatar, group, usersToAdd, usersToRemoveIds, adminsToAddIds, adminsToRemoveIds]);

  const [createMedia] = useMutation<{ createMedia: { signedURL: string } }>(CREATE_MEDIA_MUTATION);

  const [updateGroup] = useMutation<{ updateGroup: IMyGroup }>(UPDATE_GROUP_MUTATION, {
    variables: {
      data: {
        groupId: group.id,
        title: newGroupTitle,
      },
    },
  });

  const [addMembersToGroup] = useMutation(ADD_MEMBERS_TO_GROUP_MUTATION, {
    variables: {
      data: {
        groupId: group.id,
        membersIds: usersToAdd.map(user => user.id),
      },
    },
  });

  const [removeMembersFromGroup] = useMutation(REMOVE_MEMBERS_FROM_GROUP_MUTATION, {
    variables: {
      data: {
        groupId: group.id,
        membersIds: usersToRemoveIds,
      },
    },
  });

  const [setGroupAdmin] = useMutation(SET_GROUP_ADMIN_MUTATION, {
    variables: {
      data: {
        groupId: group.id,
        membersIds: adminsToAddIds,
      },
    },
  });

  const [removeGroupAdmin] = useMutation(REMOVE_GROUP_ADMIN_MUTATION, {
    variables: {
      data: {
        groupId: group.id,
        membersIds: adminsToRemoveIds,
      },
    },
  });

  const handleUpdateGroup = async (): Promise<void> => {
    const updateAvatar = async (): Promise<void> => {
      if (!newAvatar.file) return;
      const uploadURL = await createMedia({
        variables: {
          data: {
            fileType: newAvatar.file.type,
            entityId: group.id,
            entityType: 'groupAvatar',
          },
        },
      });
      await fetch(uploadURL.data!.createMedia.signedURL, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        credentials: 'include', // include, *same-origin, omit
        headers: {
          'Content-Type': newAvatar.file.type,
        },
        body: newAvatar.file, // body data type must match "Content-Type" header
      });
    };
    setIsGroupUpdating(true);
    await Promise.all([
      updateAvatar(),
      removeMembersFromGroup(),
      addMembersToGroup(),
      setGroupAdmin(),
      removeGroupAdmin(),
    ]);
    await updateGroup();
    await refetchGroupData();
    setIsGroupUpdating(false);
    handleLeaveRoom();
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalToggle = (): void => {
    if (isModalOpen) {
      setNewAvatar({ file: null, link: '' });
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleGroupTitleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setNewGroupTitle(e.target.value);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (!e.target.files) return;
    setNewAvatar({
      file: e.target.files[0],
      link: URL.createObjectURL(e.target.files[0]),
    });
  };

  const handleRemoveMember = (member: IGroupMember): void => {
    setUsersToRemoveIds(
      usersToRemoveIds.includes(member.id)
        ? [...usersToRemoveIds].filter(id => id != member.id)
        : [...usersToRemoveIds, member.id],
    );
  };

  const handleAddAdmin = (member: IGroupMember): void => {
    setAdminsToAddIds(
      adminsToAddIds.includes(member.id)
        ? [...adminsToAddIds].filter(id => id != member.id)
        : [...adminsToAddIds, member.id],
    );
  };

  const handleRemoveAdmin = (member: IGroupMember): void => {
    setAdminsToRemoveIds(
      adminsToRemoveIds.includes(member.id)
        ? [...adminsToRemoveIds].filter(id => id != member.id)
        : [...adminsToRemoveIds, member.id],
    );
  };

  const [deleteGroup] = useMutation(DELETE_GROUP_MUTATION, {
    variables: {
      data: {
        groupId: group.id,
      },
    },
    refetchQueries: [{ query: GET_MY_GROUPS }],
  });

  const handleDeleteGroup = async (): Promise<void> => {
    await deleteGroup();
    setIsModalOpen(false);
  };

  const [leaveFromGroup] = useMutation(LEAVE_FROM_GROUP_MUTATION, {
    variables: {
      data: {
        groupId: group.id,
      },
    },
    refetchQueries: [{ query: GET_MY_GROUPS }],
  });

  const handleLeaveGroup = async (): Promise<void> => {
    await leaveFromGroup();
    // -1 represents default ID for "no group chosen" status
    setActiveGroupId(-1);
    setIsModalOpen(false);
  };

  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const handleCopyInviteLink = (link: string): void => {
    setIsLinkCopied(true);
    navigator.clipboard.writeText(link).catch(err => console.log(err));
  };
  const handleCloseCopyLink = (): void => {
    setIsLinkCopied(false);
  };

  const history = useHistory();
  const windowSize = useWindowSize();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });
  const styles = useStyles();
  const classesModal = useStylesGroupModal();

  return (
    <Grid style={{ background: !isChatActive ? '#fff' : isChatStarted ? '#252525' : '#FF5631', padding: '25px 30px' }}>
      <Grid container spacing={3}>
        <Grid item>
          {group.type === 'private' && (
            <Avatar src={getInterlocutorAvatarLink(group.members, Context.user.id)} style={{ width: 50, height: 50 }} />
          )}
          {group.type === 'public' &&
            (group.avatar?.link ? (
              <Avatar src={group.avatar.link} style={{ width: 50, height: 50 }} />
            ) : (
              <Avatar style={{ width: 50, height: 50 }}>
                <GroupsIcon />
              </Avatar>
            ))}
        </Grid>
        <Grid item style={{ margin: 'auto 0' }}>
          <Grid container spacing={1} fontSize={FS18} fontWeight={500}>
            {group.type === 'private' ? (
              <Grid container xs={12} style={{ color: isChatActive ? '#fff' : undefined }}>
                {getInterlocutorFullName(group.members, Context.user.id)}
              </Grid>
            ) : group.type === 'public' ? (
              <>
                <Grid item container xs={12} style={{ color: isChatActive ? '#fff' : undefined }}>
                  {group.title}
                  {isChatActive && <img src={activeChatIndicator} style={{ marginLeft: 10 }} />}
                </Grid>
                <Grid item xs={12}>
                  {
                    <GroupInfoModalButton
                      onClick={handleModalToggle}
                      color="#AAADB2"
                      fontSize={FS14}
                      style={{ color: isChatActive && !isChatStarted ? '#fff' : undefined }}
                    >
                      {`${group.members.length} ${getLexicalMembersWord(group.members.length)}`}
                    </GroupInfoModalButton>
                  }
                </Grid>
              </>
            ) : null}
          </Grid>
        </Grid>
        <Grid item style={{ margin: 'auto 0 auto auto' }}>
          {(() => {
            if (!isChatStarted) {
              if (isChatActive) {
                return (
                  <MuiButton
                    variant="outlined"
                    onClick={handleJoinRoom}
                    style={{
                      borderRadius: 60,
                      padding: '3px 15px',
                      border: '1px solid #fff',
                    }}
                  >
                    {windowSize[0] < 991 ? (
                      <CallIcon style={{ color: '#fff' }} />
                    ) : (
                      <Typography color="#fff" fontSize={17} textTransform="none">
                        Присоединиться к звонку
                      </Typography>
                    )}
                  </MuiButton>
                );
              } else {
                return (
                  <IconButton onClick={handleJoinRoom} style={{ padding: 5, borderRadius: '50%' }}>
                    <WifiCalling3OutlinedIcon />
                  </IconButton>
                );
              }
            }
          })()}
        </Grid>
      </Grid>
      {group.type === 'public' && (
        <>
          <Modal
            open={isModalOpen}
            onClose={handleModalToggle}
            center
            styles={{ modal: { width: isTabletOrMobile ? '' : 800 } }}
          >
            <Grid container direction="column" className={styles.modalContainer}>
              <Grid container justifyContent="center" className={styles.modalHeader}>
                Настройки группы
              </Grid>
              {isMemberAdmin(group, Context.user.id) && (
                <>
                  <Grid container justifyContent="flex-end" className={classesModal.partHeader}>
                    Информация о группе
                  </Grid>
                  <Grid container direction="row" alignItems="center" style={{ gap: 20 }}>
                    <Grid item>
                      <Tooltip title="Изменить обложку" arrow placement="top">
                        <label htmlFor="icon-button-file" style={{ display: 'block', cursor: 'pointer' }}>
                          <input
                            onChange={handleAvatarChange}
                            accept="image/jpeg, image/png"
                            id="icon-button-file"
                            type="file"
                            style={{ display: 'none' }}
                          />
                          {newAvatar.link ? (
                            <Avatar src={newAvatar.link} style={{ width: 150, height: 150 }} variant="square" />
                          ) : group.avatar?.link ? (
                            <Avatar src={group.avatar.link} style={{ width: 150, height: 150 }} variant="square" />
                          ) : (
                            <Avatar style={{ width: 150, height: 150 }} variant="square">
                              <GroupsIcon fontSize="large" />
                            </Avatar>
                          )}
                        </label>
                      </Tooltip>
                    </Grid>
                    <Grid item container xs style={{ gap: 20 }}>
                      <TextField
                        fullWidth
                        value={newGroupTitle}
                        onChange={handleGroupTitleChange}
                        label="Название группы"
                        size="small"
                      />
                      <Grid container justifyContent="space-between" style={{ gap: 10 }}>
                        <Grid item>
                          <Button
                            onClick={() => handleCopyInviteLink(group.inviteURL)}
                            isOrange
                            isOrangeBorder
                            isHoverBorder
                            isEdit
                            isTextTransformNone
                            isStartIcon
                            isHoverTextWhite
                            icon={CopyIcon}
                            text="Пригласить по ссылке"
                            className={classesModal.modalGroupButton}
                          />
                          <Snackbar
                            open={isLinkCopied}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                            autoHideDuration={700}
                            onClose={handleCloseCopyLink}
                          >
                            <Alert elevation={6} variant="filled" onClose={handleCloseCopyLink}>
                              Ссылка скопирована
                            </Alert>
                          </Snackbar>
                        </Grid>
                        <Grid item>
                          <Button
                            onClick={handleDeleteGroup}
                            isTextTransformNone
                            isStartIcon
                            icon={DeleteGroupIcon}
                            text="Удалить группу"
                            className={classesModal.modalGroupButton}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}

              <Grid container justifyContent="flex-end" className={classesModal.partHeader}>
                Участники
              </Grid>

              <Grid container>
                {isMemberAdmin(group, Context.user.id) && (
                  <Grid container style={{ marginBottom: 15 }}>
                    <UsersAddToGroupInput
                      users={usersToAdd}
                      setUsers={setUsersToAdd}
                      QUERY={GET_USERS_WHICH_CAN_ADD_TO_GROUP}
                      QUERY_OPTIONS={{ variables: { groupId: group.id } }}
                    />
                  </Grid>
                )}
                {group.members.map(member => {
                  const isAdmin = isMemberAdmin(group, member.id);

                  return (
                    <Grid item key={member.id} xs={12}>
                      <Grid container alignItems="center" style={{ gap: 15 }}>
                        <Tooltip arrow placement="right" title="Перейти к профилю">
                          <Grid
                            item
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              history.push(`/profile/${member.id}`);
                            }}
                          >
                            {member.avatar?.link ? (
                              <Avatar src={member.avatar.link} style={{ width: 45, height: 45 }} />
                            ) : (
                              <Avatar style={{ width: 45, height: 45 }}>
                                <PersonIcon />
                              </Avatar>
                            )}
                          </Grid>
                        </Tooltip>
                        <Grid item xs>
                          <Grid container direction="column" justifyContent="center">
                            <Grid item className={classesModal.participantName}>
                              {`${member.firstname} ${member.lastname}`}
                            </Grid>
                            {isAdmin && (
                              <Grid item className={classesModal.adminText}>
                                Администратор
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                        {isMemberAdmin(group, Context.user.id) && member.id !== Context.user.id && (
                          <>
                            <Grid item>
                              <Tooltip
                                title={usersToRemoveIds.includes(member.id) ? 'Отменить действие' : 'Удалить участника'}
                              >
                                <IconButton
                                  onClick={(): void => handleRemoveMember(member)}
                                  style={{ borderRadius: '50%', padding: 10 }}
                                >
                                  {usersToRemoveIds.includes(member.id) ? (
                                    <CancelPresentationIcon />
                                  ) : (
                                    <PersonRemoveIcon />
                                  )}
                                </IconButton>
                              </Tooltip>
                            </Grid>

                            {isAdmin && (
                              <Grid item>
                                <Tooltip
                                  title={
                                    adminsToRemoveIds.includes(member.id)
                                      ? 'Отменить действие'
                                      : 'Удалить права администратора'
                                  }
                                >
                                  <IconButton
                                    onClick={(): void => handleRemoveAdmin(member)}
                                    style={{ borderRadius: '50%', padding: 10 }}
                                  >
                                    {adminsToRemoveIds.includes(member.id) ? (
                                      <CancelPresentationIcon />
                                    ) : (
                                      <RemoveModeratorIcon />
                                    )}
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                            )}

                            {!isAdmin && (
                              <Grid item>
                                <Tooltip
                                  title={
                                    adminsToAddIds.includes(member.id)
                                      ? 'Отменить действие'
                                      : 'Назначить администратором'
                                  }
                                >
                                  <IconButton
                                    onClick={(): void => handleAddAdmin(member)}
                                    style={{ borderRadius: '50%', padding: 10 }}
                                  >
                                    {adminsToAddIds.includes(member.id) ? (
                                      <CancelPresentationIcon />
                                    ) : (
                                      <AddModeratorIcon />
                                    )}
                                  </IconButton>
                                </Tooltip>
                              </Grid>
                            )}
                          </>
                        )}
                      </Grid>
                      <Line marginTop={15} marginBottom={15} />
                    </Grid>
                  );
                })}
              </Grid>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Button
                    onClick={handleLeaveGroup}
                    isTextTransformNone
                    isStartIcon
                    icon={LeaveGroupIcon}
                    text="Выйти из группы"
                    className={classesModal.modalGroupButton}
                  />
                </Grid>
                {isMemberAdmin(group, Context.user.id) && (
                  <Grid item>
                    <Button
                      onClick={handleUpdateGroup}
                      isOrange
                      isOrangeBorder={isDisabledUpdateBtn || isGroupUpdating ? false : true}
                      isHoverBorder={isDisabledUpdateBtn || isGroupUpdating ? false : true}
                      isEdit
                      isTextTransformNone
                      isStartIcon
                      isHoverTextWhite
                      isDisable={isDisabledUpdateBtn || isGroupUpdating}
                      icon={SaveIcon}
                      text="Сохранить изменения"
                      className={classesModal.modalGroupButton}
                    />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Modal>
        </>
      )}
    </Grid>
  );
};
export default GroupInfo;
