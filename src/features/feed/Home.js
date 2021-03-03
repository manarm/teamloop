import { connect } from 'react-redux';
import styles from './Home.module.scss';
import {addTask, addThought, addQuestion, answerQuestion, deleteItem, setItemStatus, setFilter} from './feedSlice';
import {logout} from '../user/userSlice'
import AddItem from './AddItem';
import ItemList from './ItemList';
import Header from '../common/Header'
import FilterSelect from './FilterSelect'

function Home(props) {
  const {
    items, 
    itemFilter,
    addTask, 
    addThought, 
    addQuestion, 
    answerQuestion, 
    deleteItem, 
    setItemStatus,
    setFilter,
    currentUser, 
    logout
  } =  props;

  // This will change when we have a real backend. For now, all tasks in-memory.
  const userItems = items.filter(item => {
    const authorItem = itemFilter === 'CURRENT_AUTHOR' && item.author === currentUser;
    const assignedItem = itemFilter === 'CURRENT_ASSIGNED' && item.assigned_to === currentUser;
    return itemFilter === 'ALL' || authorItem || assignedItem;
  });

  const newItems = userItems.filter(item => item.status === 'NEW');
  const inProgressItems = userItems.filter(item => item.status === 'IN_PROGRESS');
  const completedItems = userItems.filter(item => item.status === 'COMPLETE');

  return (
    <div className={styles.card}>
      <Header currentUser={currentUser} logout={logout} />
      <AddItem addTask={addTask} addThought={addThought} addQuestion={addQuestion} />
      <FilterSelect itemFilter={itemFilter} setFilter={setFilter}/>
      {newItems.length > 0 && (
        <div className={styles.newItems}>
          <ItemList 
            items={newItems} 
            nextText='Accept' 
            nextStatus='IN_PROGRESS' 
            setItemStatus={setItemStatus} 
            deleteItem={deleteItem}
            answerQuestion={answerQuestion}
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
    items: state.feed.items,
    itemFilter: state.feed.itemFilter,
    currentUser: state.users.currentUser
  }
}
const actionCreators = {addTask, addThought, addQuestion, answerQuestion, deleteItem, setItemStatus, setFilter, logout};
export default connect(mapStateToProps, actionCreators)(Home);
