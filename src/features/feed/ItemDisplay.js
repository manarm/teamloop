// import styles from './ItemDisplay.module.scss'
import { useState } from 'react';
import ItemDisplayLine from './ItemDisplayLine';
import ItemDisplayBlock from './ItemDisplayBlock';


export default function ItemDisplay ({item, currentUser, setItemStatus, deleteItem, answerQuestion}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return isExpanded ?
  <ItemDisplayBlock onClose={ () => setIsExpanded(false) }/> :  
  <ItemDisplayLine 
    item={item} 
    currentUser={currentUser} 
    setItemStatus={setItemStatus} 
    deleteItem={deleteItem} 
    answerQuestion={answerQuestion}
    onExpand={() => setIsExpanded(true)} 
  />
}