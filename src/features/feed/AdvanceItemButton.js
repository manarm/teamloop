import { getNextStatus } from './feedSlice';
import Button from '../common/Button';

export default function AdvanceItemButton(props) {
  const {
    item, 
    verifyAndAnswer = () => true, 
    setItemStatus, 
    currentUser
  } = props;
  const isAssignedToMe = item.assigned_to === currentUser;
  const next = getNextStatus(item);

  const handleClick = () => {
    if(verifyAndAnswer()) {
      setItemStatus(item.id, next.nextStatus);
    }
  }
  
  const shouldDisplay = next !== null && isAssignedToMe;

  return ( shouldDisplay ? 
    <Button onClick={handleClick}>{next.verb}</Button> :
    null
  )
}