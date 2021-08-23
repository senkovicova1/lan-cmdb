import React, {
  useMemo,
  useEffect
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
  } = props;

  const userId = Meteor.userId();

  const itemID = match.params.itemID;
  const categoryID = match.params.categoryID;

  const companyID = match.params.companyID;
  const companies = useSelector( ( state ) => state.companies.value );
  const company = useMemo( () => {
    if ( companies.length > 0 ) {
      return companies.find( company => company._id === companyID );
    }
    return null;
  }, [ companies, companyID ] );

useEffect(() => {
  if (companyID !== "all-companies" && company){
    const userCannotEditItem = company.users.find(user => user._id === userId).level > 1;
    if (userCannotEditItem){
      history.push(getGoToLink());
    }
  }
  if (!company){
    history.push(getGoToLink());
  }
}, [company, companyID, userId]);

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

  const removeItem = () => {
    if ( window.confirm( "Are you sure you want to remove this item?" ) ) {
      ItemsCollection.remove( {
        _id: itemID
      } );
      history.push( getGoToLink( "listItemsInCategory", {
        companyID,
        categoryID,
      } ) );
    }
  };

  const close = () => {
    history.goBack();
  }

  return (
    <ItemForm {...props} {...item} onSubmit={editItem} onRemove={removeItem} onCancel={close} />
  );
};
