import { useContext } from 'react';
import { PanelContext } from '../providers/PanelProvider';
import UserInfoPanel from './UserInfoPanel';

type Props = {
  id: string;
};

const PanelContainer = ({ id }: Props) => {
  const { mode } = useContext(PanelContext);

  return <>{mode === 'INFO' && <UserInfoPanel id={id} />}</>;
};

export default PanelContainer;
