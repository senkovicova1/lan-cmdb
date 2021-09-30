import React from 'react';

import {
  PasswordsCollection
} from '/imports/api/passwordsCollection';

export const NO_CHANGE = 0;
export const ADDED = 1;
export const EDITED = 2;
export const DELETED = 3;

export const addNewPassword = ( title, login, password, ipUrl, note, item ) => {
  console.log(title, login, password, ipUrl, note, item);
  PasswordsCollection.insert( {
    title,
    login,
    password,
    ipUrl,
    note,
    item
  }, (error) => {
    console.log(error);
  } );
};

export const editPassword = ( passwordId, title, login, password, ipUrl, note, item ) => {
  let data = {
    title,
    login,
    password,
    ipUrl,
    note,
    item
  };
  PasswordsCollection.update( passwordId, {
    $set: {
      ...data
    }
  } )
};

export const removePassword = ( passwordId ) => {
  PasswordsCollection.remove( {
    _id: passwordId
  } );
}
