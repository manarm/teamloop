import styles from './ItemDisplayLine.module.scss'
import Button from '../common/Button';
import Badge from '../common/Badge';
import AdvanceItemButton from './AdvanceItemButton';

export default function ItemDisplayLine({item, currentUser, setItemStatus, answerQuestion, onExpand}) {
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
      {item.item_type !== 'QUESTION' && <AdvanceItemButton item={item} setItemStatus={setItemStatus} currentUser={currentUser}/>}
      <Button onClick={onExpand}>Expand</Button>
    </span>
  </div>
  );
}