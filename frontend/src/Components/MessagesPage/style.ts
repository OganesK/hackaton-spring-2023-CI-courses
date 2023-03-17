import styled from 'styled-components';

export const DivMessagePageScrollbar = styled.div(({ theme }) => ({
  '::-webkit-scrollbar': {
    width: '6px',
  },
  '::-webkit-scrollbar-track': {
    backgroundColor: '#e8e8e8',
    borderRadius: '100px',
  },
  '::-webkit-scrollbar-thumb': {
    backgroundColor: '#d6d6d6',
    borderRadius: '100px',
  },
}));
