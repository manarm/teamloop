import styles from './ItemDisplayBlock.module.scss';
import Badge from '../common/Badge'
import Button from '../common/Button';

export default function ItemDisplayBlock({item, onClose}) {
  return <div className={styles.block}>
    <div className={styles.badge}><Badge type={item.item_type} /></div>
    <div className={styles.title}><h3>{item.title}</h3></div>
    <div className={styles.close}><Button onClick={onClose}>Close</Button></div>
    <div className={styles.meta}><ul>
      <li>userinfo</li>  
      <li>etc</li>  
    </ul></div>
    <div className={styles.content}>MAIN CONTENT</div>
    <div className={styles.controls}>controls</div>
  </div>;
}