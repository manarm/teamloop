import { useStore } from 'react-redux';
import styles from './DemoHacks.module.scss';
import Button from '../common/Button';

  // Add hacks to login screen.
  // For front-end demo only.
export default function DemoHacks () {
  const store = useStore();

  /*
  const handleDumpStore = () => {
    console.log(JSON.stringify(store.getState()));
  }
  */

  const handleLoadData = () => {
    console.log('Loading demo data...');
    fetch('http://localhost:3001/items')
    .then(response => response.json())
    .then(data => {
      const parsedItems = data.map(item => {
        item.date_created = new Date(item.date_created);
        if(item.date_completed) {
          item.date_completed = new Date(item.date_completed);
        }
        return item;
      })
      console.log('parsed items ' + parsedItems);
      store.dispatch({
        type: 'SET_ITEMS',
        items: parsedItems
      })
    }).catch(e => console.log(e));
  }

  fetch('http://localhost:3001/users')
  .then(response => response.json())
  .then(data => {
    store.dispatch({
      type: 'SET_USERS',
      users: data
    });
  }).catch(e => console.log(e));

  return(<>
    <p className={styles.warning}>DEMO MODE</p>
    <Button onClick={handleLoadData}>Load demo data</Button>
    { /*<Button onClick={handleDumpStore}>Dump state</Button> */}
  </>);
}