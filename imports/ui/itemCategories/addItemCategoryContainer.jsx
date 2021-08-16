import React from 'react';

import {
  ItemCategoriesCollection
} from '/imports/api/itemCategoriesCollection';

import ItemCategoryForm from './itemCategoryForm';

import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function AddItemCategoryContainer( props ) {

  const {history} = props;

  const addNew = ( name,  descriptionNote, backupNote, monitoringNote) => {
    ItemCategoriesCollection.insert( {
      name,
      descriptionNote,
      backupNote,
      monitoringNote
    }, (error, _id) => {
      if (error){
        console.log(console.error());
        cancel();
      } else {
        history.push(getGoToLink("listItemsInCategory", {itemCategoryID: _id, companyID: "all-companies"}));
      }
    } );
  }

  const cancel = () => {
    history.push(getGoToLink())
  }

  return (
        <ItemCategoryForm title={"Add item category"} onSubmit={addNew} onCancel={cancel}/>
  );
};
