import styles from './ItemDisplayLine.module.scss'
import { getNextStatus } from './feedSlice';
import Button from '../common/Button';
import Badge from '../common/Badge';

export default function ItemDisplayLine({item, currentUser, setItemStatus, deleteItem, answerQuestion, onExpand}) {
  const isAssignedToMe = item.assigned_to === currentUser;
  const next = getNextStatus(item);

  const handleNextClick = () => {
    setItemStatus(item.id, next.nextStatus);
  }
  const displayNextControl = next !== null && isAssignedToMe;

  const displayTitle = item.title.length > 30 ?
    item.title.substring(0,30) + '...' :
    item.title;

  return (
  <div className={styles.wrapper}>
    <button onClick={onExpand} className={styles.titleButton}>
      <Badge type={item.item_type} />
      <span className={styles.title}>
        {displayTitle}
      </span>
    </button>
    <span className={styles.user}>{`to: ${item.assigned_to}`}</span>
    <span className={styles.user}>{`from: ${item.author}`}</span>
    <span className={styles.controls}>
      {displayNextControl && (
        <Button onClick={handleNextClick}>{next.verb}</Button>
      )}
      <Button onClick={onExpand}>Expand</Button>
    </span>
  </div>
  );
}