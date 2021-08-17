import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import { useSelector } from 'react-redux';

import {
  CategoriesCollection
} from '/imports/api/categoriesCollection';

import CategoryForm from './form';
import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function EditCategoryContainer( props ) {

  const {
    match,
    history
  } = props;

  const categoryID = match.params.categoryID;
  const categories = useSelector((state) => state.categories.value);
  const category = useMemo(() => {
    return  categories.find(category => category._id === categoryID);
  }, [categories, categoryID]);

  const userId = Meteor.userId();

  const editCategory = ( name, descriptionNote, backupNote, monitoringNote ) => {
    let data = {
      name, descriptionNote, backupNote, monitoringNote
    };
    CategoriesCollection.update( categoryID, {
      $set: {
        ...data
      }
    }, (error) => {
      if (error){
        console.log(console.error());
          history.goBack();
      } else {
        history.push(getGoToLink("listItemsInCategory", {categoryID, companyID: "all-companies"}));
      }
    } );
    cancel();
  };

  const removeCategory = ( ) => {
    if ( window.confirm( "Are you sure you want to remove this category?" ) ) {
      CategoriesCollection.remove( {
        _id: categoryID
      });
      history.push(getGoToLink("listItemsInCategory", {categoryID: "all-categories", companyID: "all-companies"}));
    }
  }

  const cancel = () => {
    history.goBack();
  }

  return (
      <CategoryForm {...category} title={"Edit item category"} onSubmit={editCategory} onCancel={cancel} onRemove={removeCategory}/>
  );
};
