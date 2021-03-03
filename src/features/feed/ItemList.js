import styles from './ItemList.module.scss';
import ItemDisplay from './ItemDisplay';

export default function ItemList({title, items, setItemStatus, deleteItem, answerQuestion}) {
  return (
  <div className={styles.itemList}> 
    <h2>{title}</h2>
     <dl>
      {items.map(item => (
        <dt key={item.id}>
          <ItemDisplay item={item} setItemStatus={setItemStatus} deleteItem={deleteItem} answerQuestion={answerQuestion} />
        </dt>
      ))}
    </dl>
  </div>
  );
}