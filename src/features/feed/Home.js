import { connect } from 'react-redux';
import styles from './Home.module.scss';
import {addItem, deleteItem, setItemStatus, setFilter} from './itemsSlice';
import AddItem from './AddItem';
import FilterSelect from './FilterSelect';
import ItemDisplay from './ItemDisplay';
import Header from '../common/Header'

function Home({items, itemFilter, setFilter, addItem, deleteItem, setItemStatus}) {
  const availableItems = items.filter(item => {
    return itemFilter === 'ALL' || itemFilter === item.status
  })
  const completedItems = availableItems.filter(item => item.status === 'COMPLETE');
  const uncompletedItems = availableItems.filter(item => item.status === 'IN_PROGRESS');

  return (
    <div className={styles.card}>
      <Header />
      <AddItem addItem={addItem} />
      <FilterSelect itemFilter={itemFilter} setFilter={setFilter} />
      <ItemDisplay items={uncompletedItems} listIsComplete={false} setItemStatus={setItemStatus} deleteItem={deleteItem} />
      <ItemDisplay items={completedItems} listIsComplete={true} setItemStatus={setItemStatus} deleteItem={deleteItem}  />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    itemFilter: state.itemFilter
  }
}
const actionCreators = {addItem, deleteItem, setItemStatus, setFilter};
export default connect(mapStateToProps, actionCreators)(Home);
