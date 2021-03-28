import { useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './Home.module.scss';
import { 
  itemFetch, 
  addItem, 
  answerQuestion, 
  deleteItem, 
  setItemStatus, 
  setFilter, 
  setSort
} from './feedSlice';
import {logout} from '../user/userSlice'
import AddItem from './AddItem';
import ItemList from './ItemList';
import Header from '../common/Header'
import Footer from '../common/Footer'
import FilterSelect from './FilterSelect'
import NoContent from '../common/NoContent';

function Home(props) {
  const {
    items, 
    itemFilter,
    itemSort,
    itemFetch,
    itemFetchLoading,
    itemFetchError,
    addItem,  
    answerQuestion, 
    deleteItem, 
    setItemStatus,
    setFilter,
    setSort,
    users,
    currentUser, 
    logout
  } =  props;  
  
  useEffect(() => {
    itemFetch('http://localhost:3001/items');
  }, [itemFetch]);

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
  displayItems.sort((a,b) => (
    a[itemSort] > b[itemSort] ? 1 : -1
  ))


  const getItemLists = () => {
    if (!displayItems.length) {
      return null;
    }

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
    } else {
      return (<ItemList 
        items={displayItems} 
        setItemStatus={setItemStatus} 
        deleteItem={deleteItem}        
        title='archive'
        currentUser={currentUser} />
      );
    }
  }
  const itemLists = getItemLists();

  const handleLogout = () => {
    setFilter('INBOX');
    logout();
  }

  return (
    <div className={styles.card}>
      <Header currentUser={currentUser} onLogout={handleLogout} />
      <div className={styles.content}>
        <AddItem users={users} currentUser={currentUser} addItem={addItem} />
        <FilterSelect itemFilter={itemFilter} setFilter={setFilter} setSort={setSort}/>
        {itemFetchLoading && <p>Loading...</p>}
        {itemFetchError && <p>Error contacting server.</p>}
        {(!itemFetchLoading && !itemFetchError) && (
          <div className={styles.itemLists}>
            {itemLists ? itemLists : <NoContent />}
          </div>
        )}
      </div>
      <Footer/>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.feed.items,
    itemFilter: state.feed.itemFilter,
    itemSort: state.feed.itemSort,
    itemFetchLoading: state.feed.itemFetchLoading,
    itemFetchError: state.feed.itemFetchError,
    users: state.users.users,
    currentUser: state.users.currentUser,
  }
}
const actionCreators = {
  itemFetch,
  addItem, 
  answerQuestion, 
  deleteItem, 
  setItemStatus, 
  setFilter, 
  setSort, 
  logout
};
export default connect(mapStateToProps, actionCreators)(Home);
