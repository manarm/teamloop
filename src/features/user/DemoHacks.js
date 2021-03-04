import { useStore } from 'react-redux';
import styles from './DemoHacks.module.scss';
import Button from '../common/Button';
import { data } from './demodata.js';

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
    store.dispatch({
      type: 'SET_USERS',
      users: data.users.users
    });
    store.dispatch({
      type: 'SET_ITEMS',
      items: data.feed.items
    })
  }

  return(<>
    <p className={styles.warning}>DEMO MODE</p>
    <Button onClick={handleLoadData}>Load demo data</Button>
    { /*<Button onClick={handleDumpStore}>Dump state</Button> */}
  </>);
}