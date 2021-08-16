import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import { useSelector } from 'react-redux';

import {
  ItemCategoriesCollection
} from '/imports/api/itemCategoriesCollection';

import ItemCategoryForm from './itemCategoryForm';
import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function EditItemCategoryContainer( props ) {

  const {
    match,
    history
  } = props;

  const itemCategoryID = match.params.itemCategoryID;
  const itemCategories = useSelector((state) => state.itemCategories.value);
  const itemCategory = useMemo(() => {
    return  itemCategories.find(itemCategory => itemCategory._id === itemCategoryID);
  }, [itemCategories, itemCategoryID]);

  const userId = Meteor.userId();

  const editItemCategory = ( name, descriptionNote, backupNote, monitoringNote ) => {
    let data = {
      name, descriptionNote, backupNote, monitoringNote
    };
    ItemCategoriesCollection.update( itemCategoryID, {
      $set: {
        ...data
      }
    }, (error) => {
      if (error){
        console.log(console.error());
        cancel();
      } else {
        history.push(getGoToLink("listItemsInCategory", {itemCategoryID, companyID: "all-companies"}));
      }
    } );
    cancel();
  };

  const removeItemCategory = ( itemCategoryId ) => {
    if ( window.confirm( "Are you sure you want to remove this itemCategory? Note: ItemCategory will be moved to the \"Deleted fodlers\" section." ) ) {
      let data = {
        deletedDate: moment().unix(),
      };
      ItemCategoryCollection.update( itemCategoryID, {
        $set: {
          ...data
        }
      } );
        history.push(getGoToLink("listItemsInCategory", {itemCategoryID: "all-categories", companyID: "all-companies"}));
    }
  }

  const cancel = () => {
    history.goBack();
  }

  return (
      <ItemCategoryForm {...itemCategory} title={"Edit item category"} onSubmit={editItemCategory} onCancel={cancel} onRemove={removeItemCategory}/>
  );
};
