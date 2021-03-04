import styles from './ItemDisplayBlock.module.scss';
import Badge from '../common/Badge'
import Button from '../common/Button';
import AdvanceItemButton from './AdvanceItemButton';
import DeleteButton from './DeleteButton';

export default function ItemDisplayBlock({item, setItemStatus, deleteItem, currentUser, onClose}) {
  return <div className={styles.block}>
    <div className={styles.badge}><Badge type={item.item_type} /></div>
    <div className={styles.title}><h3>{item.title}</h3></div>
    <div className={styles.close}><Button onClick={onClose}>Close</Button></div>
    <div className={styles.meta}><ul>
      <li>from: {item.author}</li>  
      <li>to: {item.assigned_to}</li>  
      <li>status: {item.status.toLowerCase().replace('_', ' ')}</li>  
    </ul></div>
    <div className={styles.content}>Description here.</div>
    <div className={styles.controls}>
      <AdvanceItemButton item={item} setItemStatus={setItemStatus} currentUser={currentUser}/>
      <DeleteButton item={item} deleteItem={deleteItem}>Delete</DeleteButton>
    </div>
  </div>;
}