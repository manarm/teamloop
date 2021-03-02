import styles from './FilterSelect.module.scss';
import Button from '../common/Button';

export default function FilterSelect({taskFilter, setFilter}){
  return (
  <div className={styles.filter}>
    <p>Display:</p>
    {['all', 'pending', 'complete'].map(name => {
      const standOut = name.toUpperCase() === taskFilter;
      return <Button key={name} standOut={standOut} onClick={() => setFilter(name.toUpperCase())}>{name}</Button> 
    })} 
  </div>
)}