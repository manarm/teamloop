import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox, faPaperPlane, faCheck} from '@fortawesome/free-solid-svg-icons'
import styles from './FilterSelect.module.scss';
import Button from '../common/Button';

export default function FilterSelect({itemFilter, setFilter}){
  const filters = [
    {
      display: <><FontAwesomeIcon icon={faInbox} /> inbox</>,
      filter: 'INBOX'
    },
    {
      display: <><FontAwesomeIcon icon={faPaperPlane} /> outbox</>,
      filter: 'OUTBOX'
    },
    {
      display: <><FontAwesomeIcon icon={faCheck} /> complete</>,
      filter: 'ARCHIVE'
    }
  ]

  return (
  <div className={styles.filter}>
    {filters.map(f => {
      const standOut = f.filter === itemFilter;
      return <Button key={f.filter} standOut={standOut} onClick={() => setFilter(f.filter)}>{f.display}</Button> 
    })} 
  </div>
)}