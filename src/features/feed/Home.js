import { connect } from 'react-redux';
import styles from './Home.module.scss';
import {addTask, addThought, addQuestion, deleteItem, setItemStatus} from './itemsSlice';
import AddItem from './AddItem';
import ItemList from './ItemList';
import Header from '../common/Header'

function Home({items, addTask, addThought, addQuestion, deleteItem, setItemStatus}) {
  const newItems = items.filter(item => item.status === 'NEW');
  const inProgressItems = items.filter(item => item.status === 'IN_PROGRESS');
  const completedItems = items.filter(item => item.status === 'COMPLETE');

  return (
    <div className={styles.card}>
      <Header />
      <AddItem addTask={addTask} addThought={addThought} addQuestion={addQuestion}/>
      {newItems.length > 0 && (
        <div className={styles.newItems}>
          <ItemList 
            items={newItems} 
            nextText='Accept' 
            nextStatus='IN_PROGRESS' 
            setItemStatus={setItemStatus} 
            deleteItem={deleteItem}
            title='new' />
        </div>
      )}
      {inProgressItems.length > 0 && (
        <ItemList 
        items={inProgressItems} 
        nextText='Complete' 
        nextStatus='COMPLETE' 
        setItemStatus={setItemStatus} 
        deleteItem={deleteItem}
        title='in progress' />
      )}
      {completedItems.length > 0 && (
        <ItemList 
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
const actionCreators = {addTask, addThought, addQuestion, deleteItem, setItemStatus};
export default connect(mapStateToProps, actionCreators)(Home);
