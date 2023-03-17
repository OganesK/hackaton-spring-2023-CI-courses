import { Grid } from '@material-ui/core';
import styled from 'styled-components';
import { FS18 } from '../../../rules';

export const CardBody = styled(Grid)`
  padding: 15px 30px 15px 30px;
`;

export const AvatarWrapper = styled(Grid)`
  position: relative;
  margin-right: 20px;
`;

export const GroupTitle = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: ${FS18};
  line-height: 1.33;
  font-weight: 600;
`;

export const GroupData = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr fit-content(100%);
  grid-gap: 10px;
  align-items: baseline;
`;
