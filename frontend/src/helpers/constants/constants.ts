// media queries
import { useMediaQuery } from 'react-responsive';

export function TabletOrMobile() {
  const tablet = useMediaQuery({ query: '(max-width: 960px)' });
  return tablet;
}

export function Mobile() {
  const mobile = useMediaQuery({ query: '(max-width: 600px)' });
  return mobile;
}
