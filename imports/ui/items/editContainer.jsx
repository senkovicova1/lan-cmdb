import React, {
  useMemo,
} from 'react';

import {
  useSelector
} from 'react-redux';

import {
  ItemsCollection
} from '/imports/api/itemsCollection';

import ItemForm from './form';

import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function EditItemContainer( props ) {

  const {
    match,
    history,
    revealPassword
  } = props;

  const itemID = match.params.itemID;
  const companyID = match.params.companyID;
  const categoryID = match.params.categoryID;

  const items = useSelector( ( state ) => state.items.value );
  const item = useMemo( () => {
    if ( items.length > 0 ) {
      return items.find( item => item._id === itemID );
    }
    return {};
  }, [ items, itemID ] );

  const editItem = ( name, description, backupDescription, monitoringDescription, updatedDate, updatedBy ) => {
    ItemsCollection.update( itemID, {
      $set: {
        name,
        description,
        backupDescription,
        monitoringDescription,
        updatedDate,
        updatedBy
      }
    }, ( error, _id ) => {
      if ( error ) {
        console.log( error );
      } else {
        history.push( getGoToLink( "viewItem", {
          companyID,
          categoryID,
          itemID
        } ) );
      }
    } );
  }

  const close = () => {
    history.goBack();
  }


  return (
    <ItemForm {...props} {...item} onSubmit={editItem} onCancel={close} />
  );
};
