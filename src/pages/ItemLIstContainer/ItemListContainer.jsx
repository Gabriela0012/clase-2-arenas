import React, { useEffect, useState } from 'react';
import './ItemListContainer.css';
import ItemList from '../../components/ItemList/ItemList';
import {useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import db from '../../services/firebase'


function getProducts(category){
 
    const itemCollection = collection(db, 'items');

    const q = category && query(
      itemCollection,
      where('category', '==', category)
    );
    
  return getDocs(q || itemCollection)

}



function ItemListContainer () {

  const [products, setProducts] = useState([]);
  const {categoryId } = useParams();
 

  useEffect(() => {
  
    getProducts(categoryId)
     .then (snapshot => {
       setProducts(snapshot.docs.map(doc => { 
            return {...doc.data(), id: doc.id}
          }));;
    })
  },[categoryId]);
  
  return (
   <>
   
   <ItemList items={products}/>
   
   </>
     
      
     
   

  )
}

export default ItemListContainer;