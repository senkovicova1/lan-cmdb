import React, {
  useMemo,
  useEffect,
  useState
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  editManual,
  removeManual
} from './manualsHandlers';

import Form from './form';
import Loader from '/imports/ui/other/loadingScreen';

export default function EditManualContainer( props ) {

  const {
    match,
    setShowDetail,
    editedManual,
    setEditedManual,
    setAddManual,
  } = props;

  const userId = Meteor.userId();

  const {
    companyID
  } = match.params;

  const manuals = useSelector( ( state ) => state.manuals.value );
  const manual = useMemo( () => {
    if ( manuals.length > 0 ) {
      return manuals.find( manual => manual._id === editedManual );
    }
    return null;
  }, [ editedManual, manuals ] );

  const edit = ( title, body, updatedBy, dateUpdated ) => {
    editManual( editedManual, title, body, updatedBy, dateUpdated, ( error ) => console.log( error ) );
    setShowDetail(true);
  }

  const remove = () => {
    if ( window.confirm( "Are you sure you want to remove this manual?" ) ) {
      removeManual( editedManual );
      setEditedManual( null );
    }
  }

  const cancel = () => {
    setShowDetail( true );
  }

  if ( !manual ) {
    return <Loader />;
  }

  return (
    <Form
      {...props}
      {...manual}
      companyID={companyID}
      onSubmit={edit}
      onRemove={remove}
      onCancel={cancel}
      />
  );
};
