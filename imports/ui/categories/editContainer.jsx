import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  CategoriesCollection
} from '/imports/api/categoriesCollection';
import {
  ItemsCollection
} from '/imports/api/itemsCollection';

import CategoryForm from './form';

import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function EditCategoryContainer( props ) {

  const {
    match,
    history
  } = props;

  const items = useSelector( ( state ) => state.items.value );

  const categoryID = match.params.categoryID;
  const categories = useSelector( ( state ) => state.categories.value );
  const category = useMemo( () => {
    return categories.find( category => category._id === categoryID );
  }, [ categories, categoryID ] );

  const userId = Meteor.userId();

  const editCategory = ( name, descriptionNote, backupNote, monitoringNote ) => {
    let data = {
      name,
      descriptionNote,
      backupNote,
      monitoringNote
    };
    CategoriesCollection.update( categoryID, {
      $set: {
        ...data
      }
    }, ( error ) => {
      if ( error ) {
        console.log( console.error() );
        history.goBack();
      } else {
        history.push( getGoToLink( "listItemsInCategory", {
          categoryID,
          companyID: "all-companies"
        } ) );
      }
    } );
    cancel();
  };

  const removeCategory = () => {
    if ( window.confirm( "Are you sure you want to remove this category along with all items in it?" ) ) {
      CategoriesCollection.remove( {
        _id: categoryID
      } );

      const itemToRemove = items.filter( item => item.category === categoryID );
      itemToRemove.forEach( ( item, i ) => {
        ItemsCollection.remove( {
          _id: item._id
        } );
      } );

      history.push( getGoToLink( "listItemsInCategory", {
        categoryID: "all-categories",
        companyID: "all-companies"
      } ) );
    }
  }

  const cancel = () => {
    history.goBack();
  }

  return (
    <CategoryForm {...category} title={"Edit category"} onSubmit={editCategory} onCancel={cancel} onRemove={removeCategory}/>
  );
};
