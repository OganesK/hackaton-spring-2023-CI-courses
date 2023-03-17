export interface ModerationPostContactBlockPropsTypes {
  id: number;
  title: string;
  type: string;
  poster: string;
  shortDescription: string;
}

export interface TypeRadioGroupProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
