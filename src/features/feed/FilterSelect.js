import styles from './FilterSelect.module.scss';
import Button from '../common/Button';

export default function FilterSelect({itemFilter, setFilter, currentUser}){
  const filters = [
    {
      display: 'All',
      filter: 'ALL'
    },
    {
      display: 'assigned to: ' + currentUser,
      filter: 'CURRENT_ASSIGNED'
    },
    {
      display: 'author: ' + currentUser,
      filter: 'CURRENT_AUTHOR'
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