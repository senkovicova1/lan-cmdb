import React, {
  useMemo,
  useEffect,
  useState
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  addNewManual
} from './manualsHandlers';

import Form from './form';

export default function AddManualContainer( props ) {
  const {
    match,
    setEditedManual,
    setAddManual,
  } = props;

  const userId = Meteor.userId();

  const { companyID } = match.params;

  const addNew = (  title, body, updatedBy, dateUpdated, createdBy, dateCreated ) => {
    addNewManual( title, body, companyID, updatedBy, dateUpdated, createdBy, dateCreated, (error) => console.log(error), (_id) => {setAddManual(false); setEditedManual(_id);} );
  }

  return (
    <Form
      {...props}
      companyID={companyID}
      onSubmit={addNew}
      />
  );
};
