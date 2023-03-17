export interface ButtonProps {
  text: string;
  className?: string;
  isDisable?: boolean;
  isCancel?: boolean;
  onImage?: boolean;
  isWhite?: boolean;
  isHoverWhite?: boolean;
  isHoverBlack?: boolean;
  isOrange?: boolean;
  isEdit?: boolean;
  isNoneBorder?: boolean;
  isBorder?: boolean;
  isOrangeBorder?: boolean;
  isHoverBorder?: boolean;
  isTextTransformNone?: boolean;
  isHoverTextWhite?: boolean;
  isStartIcon?: boolean;
  icon?: string;
  value?: string;
  onClick?: () => void;
  onClickEvent?: (e: React.MouseEvent) => void;
}
