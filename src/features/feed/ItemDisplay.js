import styles from './ItemDisplay.module.scss';
import Button from '../common/Button';

export default function ItemDisplay({title, items, nextText, nextStatus, setItemStatus, deleteItem}) {
  return (
  <div className={styles.itemsDisplay}> 
    <h2>{title}</h2>
     <dl>
      {items.map(item => {
      console.log(item);
      return (
        <dt key={item.id}>
          {item.title}
          <span>
            <Button onClick={() => setItemStatus(item.id, nextStatus)}>{nextText}</Button>
            <Button onClick={() => deleteItem(item.id)}>x</Button>
          </span>
        </dt>
      )})}
    </dl>
  </div>
  );
}