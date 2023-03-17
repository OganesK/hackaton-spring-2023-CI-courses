import { TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import useDebounce from '../../../helpers/hooks/useDebounce';
import { IMyGroup } from '../typings';

interface GroupSearchProps {
  groups: IMyGroup[] | undefined;
  setFilteredGroups: React.Dispatch<React.SetStateAction<IMyGroup[] | undefined>>;
}

const GroupSearch: React.FC<GroupSearchProps> = ({ groups, setFilteredGroups }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const debouncedSearchQuery = useDebounce<string>(searchQuery, 175);

  useEffect(() => {
    if (!groups) return;
    setFilteredGroups(
      groups.filter(group => group.title.toLocaleLowerCase().includes(debouncedSearchQuery.toLocaleLowerCase())),
    );
  }, [groups, setFilteredGroups, debouncedSearchQuery]);

  const searchQueryHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(event.target.value);
  };

  return (
    <TextField
      value={searchQuery}
      onChange={searchQueryHandler}
      id="outlined-basic"
      placeholder="Поиск"
      variant="outlined"
      size="small"
      fullWidth
    />
  );
};
export default GroupSearch;
