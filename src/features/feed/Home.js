import { connect } from 'react-redux';
import styles from './Home.module.scss';
import {addTask, deleteItem, setItemStatus} from './itemsSlice';
import AddItem from './AddItem';
import ItemDisplay from './ItemDisplay';
import Header from '../common/Header'

function Home({items, addTask, deleteItem, setItemStatus}) {
  const newItems = items.filter(item => item.status === 'NEW');
  const inProgressItems = items.filter(item => item.status === 'IN_PROGRESS');
  const completedItems = items.filter(item => item.status === 'COMPLETE');

  return (
    <div className={styles.card}>
      <Header />
      <AddItem addTask={addTask} />
      {newItems.length > 0 && (
        <div className={styles.newItems}>
          <ItemDisplay 
            items={newItems} 
            nextText='Accept' 
            nextStatus='IN_PROGRESS' 
            setItemStatus={setItemStatus} 
            deleteItem={deleteItem}
            title='new' />
        </div>
      )}
      {inProgressItems.length > 0 && (
        <ItemDisplay 
        items={inProgressItems} 
        nextText='Complete' 
        nextStatus='COMPLETE' 
        setItemStatus={setItemStatus} 
        deleteItem={deleteItem}
        title='in progress' />
      )}
      {completedItems.length > 0 && (
        <ItemDisplay 
        items={completedItems} 
        nextText='Re-open' 
        nextStatus='IN_PROGRESS' 
        setItemStatus={setItemStatus} 
        deleteItem={deleteItem}
        title='completed' />
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
  }
}
const actionCreators = {addTask, deleteItem, setItemStatus};
export default connect(mapStateToProps, actionCreators)(Home);
