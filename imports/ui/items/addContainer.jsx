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

export default function AddItemContainer( props ) {
  const {
    match,
    history,
  } = props;

  const userId = Meteor.userId();

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
    const userCannotAddItems = company.users.find(user => user._id === userId).level > 1;
    if (userCannotAddItems){
      history.push(getGoToLink());
    }
  }
  if (!company){
    history.push(getGoToLink());
  }
}, [company, companyID, userId]);

  const addNew = ( name, description, backupDescription, monitoringDescription, updatedDate, updatedBy, category, company, createdDate, createdBy ) => {
    ItemsCollection.insert( {
      name,
      description,
      backupDescription,
      monitoringDescription,
      updatedDate,
      updatedBy,
      category,
      company,
      createdDate,
      createdBy
    }, ( error, _id ) => {
      if ( error ) {
        console.log( error );
      } else {
        history.push( getGoToLink( "viewItem", {
          companyID,
          categoryID,
          itemID: _id
        } ) );
      }
    } );
  }

  const close = () => {
    history.goBack();
  }

  return (
    <ItemForm {...props} title={"Add item"} onSubmit={addNew} onCancel={close}/>
  );
};
