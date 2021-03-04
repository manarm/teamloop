import { connect } from 'react-redux';
import styles from './Home.module.scss';
import {addTask, addThought, addQuestion, answerQuestion, deleteItem, setItemStatus, setFilter} from './feedSlice';
import {logout} from '../user/userSlice'
import AddItem from './AddItem';
import ItemList from './ItemList';
import Header from '../common/Header'
import Footer from '../common/Footer'
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
    users,
    currentUser, 
    logout
  } =  props;  
  
  const displayItems = items.filter(item => {
    switch (itemFilter) {
      case 'INBOX':
        return item.assigned_to === currentUser && item.status !== 'COMPLETE'
      case 'OUTBOX':
        return item.author === currentUser && item.status !== 'COMPLETE'
      case 'ARCHIVE':
        return (item.assigned_to === currentUser || item.author === currentUser) && item.status === 'COMPLETE';
      default:
        return false;
    }
  });

  const getItemLists = () => {
    if (['INBOX', 'OUTBOX'].includes(itemFilter)) {
      const newItems = displayItems.filter(item => item.status === 'NEW');
      const inProgressItems = displayItems.filter(item => item.status === 'IN_PROGRESS');
      return (<>
      {newItems.length > 0 && (
        <ItemList 
          items={newItems} 
          setItemStatus={setItemStatus} 
          deleteItem={deleteItem}
          answerQuestion={answerQuestion}
          title='new'
          currentUser={currentUser} />
      )}
      {inProgressItems.length > 0 && (
        <ItemList 
        items={inProgressItems} 
        setItemStatus={setItemStatus} 
        deleteItem={deleteItem}        
        title='in progress'
        currentUser={currentUser} />
      )}
      </>);
    } else if (displayItems.length > 0) {
      return (<ItemList 
        items={displayItems} 
        setItemStatus={setItemStatus} 
        deleteItem={deleteItem}        
        title='archive'
        currentUser={currentUser} />
      );
    }

    return null;
  }


  const handleLogout = () => {
    setFilter('INBOX');
    logout();
  }

  return (
    <div className={styles.card}>
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <AddItem users={users} currentUser={currentUser} addTask={addTask} addThought={addThought} addQuestion={addQuestion} />
      <FilterSelect itemFilter={itemFilter} setFilter={setFilter}/>
      {getItemLists()}
      <Footer/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.feed.items,
    itemFilter: state.feed.itemFilter,
    users: state.users.users,
    currentUser: state.users.currentUser
  }
}
const actionCreators = {addTask, addThought, addQuestion, answerQuestion, deleteItem, setItemStatus, setFilter, logout};
export default connect(mapStateToProps, actionCreators)(Home);
