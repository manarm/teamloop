import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInbox, faPaperPlane, faCheck} from '@fortawesome/free-solid-svg-icons'
import styles from './FilterSelect.module.scss';
import Button from '../common/Button';

export default function FilterSelect({itemFilter, setFilter, setSort}){
  const [ sortSelected, setSortSelected ] = useState('title');

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

  const onSortChange = e => {
    const sort = e.target.value;
    setSortSelected(sort);
    setSort(sort);
  }

  const getSortByDateString = () => {
    if (itemFilter === 'COMPLETE') {
      return 'date: completed';
    } else {
      return 'date: created';
    }
  }

  return (<div className={styles.container}>
    <div className={styles.filter}>
      {filters.map(f => {
        const standOut = f.filter === itemFilter;
        return <Button key={f.filter} standOut={standOut} onClick={() => setFilter(f.filter)}>{f.display}</Button> 
      })} 
    </div>
    <div>
      <label htmlFor="sort">Sort by: </label>
      <select name="sort" id="sort" value={sortSelected} onChange={onSortChange}>
        <option key='title' value="TITLE">title</option>
        <option key='to' value="TO">user: to</option>
        <option key='from' value="FROM">user: from</option>
        <option key='date' value="DATE">{getSortByDateString()}</option>
      </select>
    </div>
  </div>
)}