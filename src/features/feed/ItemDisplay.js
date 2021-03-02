import clsx from 'clsx';
import styles from './ItemDisplay.module.scss';
import Button from '../common/Button';

export default function ItemDisplay({items, listIsComplete, setItemStatus, deleteItem}) {
  const itemStyle = clsx(listIsComplete && styles.completed);
  const nextStatus = listIsComplete ? 'IN_PROGRESS' : 'COMPLETE';

  if (!items || items.length === 0) {
    return null;
  }

  return (
  <div className={styles.itemsDisplay}>
    <dl>
      {items.map(item => (
        <dt key={item.id}>
          <span>
            <input type="checkbox" checked={listIsComplete} onChange={() => setItemStatus(item.id, nextStatus)}/>
            <span className={itemStyle}>
              {item.item}
            </span>
          </span>
          <Button onClick={() => deleteItem(item.id)}>x</Button>
        </dt>
      ))}
    </dl>
  </div>
  );
}