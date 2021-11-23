import React from 'react';

import {
  CategoriesCollection
} from '/imports/api/categoriesCollection';

import CategoryForm from './form';

import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function AddCategoryContainer( props ) {

  const {
    history
  } = props;

  const addNew = ( name, descriptionNote, backupNote, monitoringNote ) => {
    CategoriesCollection.insert( {
      name,
      descriptionNote,
      backupNote,
      monitoringNote
    }, ( error, _id ) => {
      if ( error ) {
        console.log( console.error() );
        cancel();
      } else {
        history.push( getGoToLink( "listItemsInCategory", {
          categoryID: _id,
          companyID: "all-companies"
        } ) );
      }
    } );
  }

  const cancel = () => {
    history.push( getGoToLink() );
  }

  return (
    <CategoryForm title={"Add category"} onSubmit={addNew} onCancel={cancel}/>
  );
};
