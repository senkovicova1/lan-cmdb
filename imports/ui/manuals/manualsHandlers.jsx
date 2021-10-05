import React from 'react';

import {
  ManualsCollection
} from '/imports/api/manualsCollection';

export const addNewManual = ( title, body, company, updatedBy, dateUpdated, createdBy, dateCreated, onFailure, onSuccess ) => {
  ManualsCollection.insert( {
    title,
    body,
    company,
    createdBy,
    updatedBy,
    dateCreated,
    dateUpdated
  }, ( error, _id ) => {
    if ( error ) {
      onFailure( error );
    } else {
      onSuccess( _id );
    }
  } );
};

export const editManual = ( manualId, title, body, updatedBy, dateUpdated, onFailure ) => {
  let data = {
    title,
    body,
    updatedBy,
    dateUpdated
  };
  ManualsCollection.update( manualId, {
    $set: {
      ...data
    }
  }, ( error ) => {
    if ( error ) {
      onFailure( error );
    }
  } )
};

export const removeManual = ( manualId ) => {
  ManualsCollection.remove( {
    _id: manualId
  } );
}
