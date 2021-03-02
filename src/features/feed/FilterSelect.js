import styles from './FilterSelect.module.scss';
import Button from '../common/Button';

export default function FilterSelect({itemFilter, setFilter}){
  return (
  <div className={styles.filter}>
    <p>Display:</p>
    {['all', 'in_progress', 'complete'].map(name => {
      const standOut = name.toUpperCase() === itemFilter;
      return <Button key={name} standOut={standOut} onClick={() => setFilter(name.toUpperCase())}>{name}</Button> 
    })} 
  </div>
)}