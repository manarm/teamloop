import styles from './ItemDisplayLine.module.scss'
import Button from '../common/Button';
import Badge from '../common/Badge';
import AdvanceItemButton from './AdvanceItemButton';

export default function ItemDisplayLine({item, currentUser, setItemStatus, answerQuestion, onExpand}) {
  const displayTitle = item.title.length > 30 ?
    item.title.substring(0,30) + '...' :
    item.title;

  const toShortDate = (date) => {
    return((date.getMonth() + 1) + '/' 
           + date.getDate() + '/' 
           + String(date.getFullYear()).substring(2,4));
  } 
  const getDateString = () => {
    if(item.status === 'COMPLETE') {
      return 'complete: ' + toShortDate(item.date_completed);
    } else {
      return 'created: ' + toShortDate(item.date_created);
    }
  }

  return (
  <div className={styles.wrapper}>
    <button onClick={onExpand} className={styles.titleButton}>
      <Badge type={item.item_type} />
      <span className={styles.title}>
        {displayTitle}
      </span>
    </button>
    <span className={styles.user}>{`to: ${item.assigned_to}`}</span>
    <span className={styles.user}>{`fr: ${item.author}`}</span>
    <span className={styles.date}>{getDateString()}</span>
    <span className={styles.controls}>
      {item.item_type !== 'QUESTION' && <AdvanceItemButton item={item} setItemStatus={setItemStatus} currentUser={currentUser}/>}
      <Button onClick={onExpand}>▾</Button>
    </span>
  </div>
  );
}