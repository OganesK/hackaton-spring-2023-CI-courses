import { Button, Grid, IconButton } from '@mui/material';
import styled from 'styled-components';

export const MenuToggleBtn = styled(IconButton)<{ $isMenuOpen: boolean }>`
  @media (min-width: 768px) {
    display: none;
  }
  position: absolute;
  top: 15px;
  left: ${({ $isMenuOpen }) => ($isMenuOpen ? '0' : '100%')};
  width: 50px;
  height: 50px;
  transition: all 0.25s ease;
  z-index: 251;
`;

export const GroupsSidebar = styled(Grid)<{ $isMenuOpen: boolean }>`
  position: relative;
  display: grid;
  grid-template-rows: fit-content(100%) fit-content(100%) 1fr;
  grid-gap: 20px;
  width: 340px;
  height: 100%;
  padding-top: 40px;
  @media (max-width: 767px) {
    padding-top: 20px;
  }
  border-top: 1px solid #ebebeb;
  border-right: 1px solid #ebebeb;
  transition: all 0.3s ease;
  background-color: #fff;

  .MuiPaper-rounded {
    border-radius: 0;
  }

  @media (max-width: 767px) {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 250;
    transform: ${({ $isMenuOpen }) => ($isMenuOpen ? '' : 'translateX(-100%)')};
  }
  @media (max-width: 570px) {
    width: 100%;
  } ;
`;
