import React, { useState } from 'react';

import { useMutation } from '@apollo/client';

import { OutlinedInput, Grid } from '@mui/material';

import Modal from 'react-responsive-modal';
import { useMediaQuery } from 'react-responsive';

import Button from '../../../UI/Buttons/OutlinedButton/Button';
import useStyles from '../../../UI/Styles/TS/Components/createModalStyles/index';

import { CREATE_GROUP } from '../../graphql/mutation';
import { GET_MY_GROUPS, GET_USERS } from '../../graphql/query';
import { IGroupMember, IMyGroup } from '../../typings';
import UsersAddToGroupInput from '../../UsersAddToGroupInput';

import addGroupIcon from '../../../../assets/icons/chat/addgroup.svg';
import useClasses from './style';

const CreateGroup: React.FC = () => {
  const [users, setUsers] = useState<IGroupMember[]>([]);
  const [groupName, setGroupName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const styles = useStyles();
  const classes = useClasses();
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 899px)' });

  const handleModalOpen = (): void => {
    setIsModalOpen(true);
  };

  const handleModalClose = (): void => {
    setUsers([]);
    setGroupName('');
    setIsModalOpen(false);
  };

  const handleGroupNameInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setGroupName(e.target.value);
  };

  const [createGroup, { loading: loadingCreateGroup }] = useMutation<IMyGroup>(CREATE_GROUP, {
    variables: { data: { title: groupName, membersIds: users.map(user => user.id) } },
    refetchQueries: [{ query: GET_MY_GROUPS }],
  });
  const handleCreateGroup = async (): Promise<void> => {
    await createGroup();
    handleModalClose();
  };

  return (
    <Grid container justifyContent="center">
      <Button
        onClick={handleModalOpen}
        isDisable={isModalOpen}
        isOrange
        isOrangeBorder
        isHoverBorder
        isEdit
        isTextTransformNone
        isStartIcon
        isHoverTextWhite
        icon={addGroupIcon}
        text="Создать группу"
        className={classes.createGroupButton}
      />
      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        center
        styles={{ modal: { width: isTabletOrMobile ? '' : 800 } }}
      >
        <Grid container direction="column" className={styles.modalContainer}>
          <Grid item className={styles.modalHeader}>
            Создание группы
          </Grid>
          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Название
            </Grid>
            <Grid container xs>
              <OutlinedInput
                fullWidth={true}
                defaultValue={groupName}
                value={groupName}
                placeholder={isTabletOrMobile ? '*' : 'Название группы *'}
                onChange={handleGroupNameInput}
                inputProps={{
                  maxLength: 128,
                }}
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container direction="row" className={styles.inputContainerGap}>
            <Grid container md={3} xs={12} alignItems="center" className={styles.modalHeaderText}>
              Список пользователей
            </Grid>
            <Grid container xs>
              <UsersAddToGroupInput users={users} setUsers={setUsers} QUERY={GET_USERS} />
            </Grid>
          </Grid>

          {isTabletOrMobile ? (
            <Grid container direction="column" style={{ marginTop: 30, gap: 20 }}>
              <Button onClick={handleCreateGroup} text="Создать" className={styles.modalButton} />
              <Button onClick={handleModalClose} isCancel={true} text="Отменить" className={styles.modalButton} />
            </Grid>
          ) : (
            <Grid container justifyContent="flex-end">
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                xs={9}
                className={styles.modalButtonContainer}
              >
                <Grid container xs>
                  <Button onClick={handleModalClose} isCancel={true} text="Отменить" className={styles.modalButton} />
                </Grid>
                <Grid container xs>
                  <Button onClick={handleCreateGroup} text="Создать" className={styles.modalButton} />
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Modal>
    </Grid>
  );
};
export default CreateGroup;
