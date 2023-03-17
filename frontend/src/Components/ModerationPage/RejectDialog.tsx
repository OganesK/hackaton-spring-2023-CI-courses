import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import CancelIcon from '@mui/icons-material/Cancel';

import * as mutations from '../../Pages/ModerationPage/graphql/mutation';

export default function RejectDialog(props: { entityId: number; entityType: string }): JSX.Element {
  const [open, setOpen] = React.useState(false);
  const [rejectMessage, setRejectMessage] = React.useState('');
  // const verificatePostHandler = mutations.VerificatePostMutation();
  // const verificateCompanyHandler = mutations.VerificateCompanyMutation();
  // const verificateContactHandler = mutations.VerificateContactMutation();
  // const verificateProjectHandler = mutations.VerificateProjectMutation();
  // const verificateEventHandler = mutations.VerificateEventMutation();
  const verificateAllHandler = mutations.VerificateMutation();

  const handleClickOpen: () => void = () => {
    setOpen(true);
  };

  const handleClose: () => void = () => {
    setOpen(false);
  };

  const rejectButtonHandler: () => Promise<void> = async () => {
    if (rejectMessage.length !== 0) {
      const newRejectData = {
        entityId: props.entityId,
        verdict: false,
        entityType:
          props.entityType === 'Публикация'
            ? 'post'
            : props.entityType === 'Проект'
            ? 'project'
            : props.entityType === 'Компания'
            ? 'company'
            : props.entityType === 'Мероприятие'
            ? 'event'
            : 'contact',
        rejectMessage: rejectMessage,
      };
      await verificateAllHandler(newRejectData);
    } else {
      alert('Check reject message');
    }
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen} startIcon={<CancelIcon />}>
        Не публиковать
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText>Комментарий</DialogContentText>
          <TextField
            value={rejectMessage}
            onChange={(event: React.ChangeEvent<HTMLInputElement>): void => setRejectMessage(event.currentTarget.value)}
            autoFocus
            margin="dense"
            id="name"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Отмена</Button>
          <Button onClick={rejectButtonHandler}>Отклонить</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
