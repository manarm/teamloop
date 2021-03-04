import styles from './FilterSelect.module.scss';
import Button from '../common/Button';

export default function FilterSelect({itemFilter, setFilter}){
  const filters = [
    {
      display: 'inbox',
      filter: 'INBOX'
    },
    {
      display: 'outbox',
      filter: 'OUTBOX'
    },
    {
      display: 'complete',
      filter: 'ARCHIVE'
    }
  ]


  return (
  <div className={styles.filter}>
    {filters.map(f => {
      const standOut = f.filter === itemFilter;
      return <Button key={f.display} standOut={standOut} onClick={() => setFilter(f.filter)}>{f.display}</Button> 
    })} 
  </div>
)}