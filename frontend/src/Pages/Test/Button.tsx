import React from 'react';
import Button from '@mui/material/Button';

import { useTranslate } from '../../helpers/hooks/useTranslateCategories';

interface MyButtonProps {
  value: string;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
}

const MyButton: (props: MyButtonProps) => JSX.Element = (props: MyButtonProps) => {
  const onClickHandler: () => void = () => {
    props.setSelectedFilter(props.value);
  };

  return (
    <div style={{ color: props.selectedFilter === props.value ? '#252525' : '#AAADB2' }}>
      <Button
        onClick={(): void => onClickHandler()}
        color="inherit"
        style={{
          fontWeight: props.selectedFilter === props.value ? 'bold' : 'normal',
        }}
      >
        {useTranslate(props.value)}
      </Button>
    </div>
  );
};

export default MyButton;
