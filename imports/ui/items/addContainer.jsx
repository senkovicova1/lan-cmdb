import React, {
  useState,
  useMemo,
  useEffect
} from 'react';
import { useSelector } from 'react-redux';

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

  const companyID = match.params.companyID;
  const categoryID = match.params.categoryID;

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
    }, (error, _id) => {
      if (error) {
        console.log(error);
      } else {
        history.push(getGoToLink("viewItem", {companyID, categoryID, itemID: _id}));
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
