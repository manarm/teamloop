import styles from './FilterSelect.module.scss';
import Button from '../common/Button';

export default function FilterSelect({itemFilter, setFilter}){
  const filters = [
    {
      display: 'All',
      filter: 'ALL'
    },
    {
      display: 'My Notes',
      filter: 'CURRENT_AUTHOR'
    },
    {
      display: 'Assigned to me',
      filter: 'CURRENT_ASSIGNED'
    }
  ]


  return (
  <div className={styles.filter}>
    <p>Display:</p>
    {filters.map(f => {
      const standOut = f.filter === itemFilter;
      return <Button key={f.display} standOut={standOut} onClick={() => setFilter(f.filter)}>{f.display}</Button> 
    })} 
  </div>
)}