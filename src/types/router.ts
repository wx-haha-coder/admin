import { ConnectProps } from 'umi';
// eslint-disable-next-line import/no-extraneous-dependencies
import H from 'history';

// 由于最新的react-router 已经不包含query
interface Location extends H.Location {
  query: { [key: string]: string };
}

export interface ConnectFixProps extends ConnectProps {
  location: Location;
}
