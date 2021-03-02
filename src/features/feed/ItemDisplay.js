import styles from './ItemDisplay.module.scss'
import { getNextStatus } from './itemsSlice';
import Button from '../common/Button'

export default function ItemDisplay ({item, setItemStatus, deleteItem}) {
  const next = getNextStatus(item);

  return (
  <>
  {item.title}
  <span>
    {next !== null && (
      <Button onClick={() => setItemStatus(item.id, next.nextStatus)}>{next.verb}</Button>
    )}
    <Button onClick={() => deleteItem(item.id)}>x</Button>
  </span>
  </>
  );
}