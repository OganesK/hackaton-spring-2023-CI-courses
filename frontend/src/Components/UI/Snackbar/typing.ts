export interface SnackbarType {
  openSnack: boolean;
  setOpenSnack: React.Dispatch<React.SetStateAction<boolean>>;
  textInSnack: string;
  isError?: boolean;
}
