import React, {
  useMemo,
  useEffect
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  PasswordsCollection
} from '/imports/api/passwordsCollection';

import PasswordForm from './form';

import {
  getGoToLink,
} from "/imports/other/navigationLinks";

const NO_CHANGE = 0;
const ADDED = 1;
const EDITED = 2;
const DELETED = 3;

export default function EditPasswordContainer( props ) {

  const {
    match,
    history,
    closeSelf,
    password,
    passwords,
    setPasswords,
  } = props;

    const userId = Meteor.userId();

    const itemID = match.params.itemID;

    const editItem = (title, login, passwordCode, ipUrl, note, _id ) => {
      const newPasswords = passwords.map(pass => {
        if (pass._id && pass._id === password._id){
          return ({...pass, title, login, passwordCode, ipUrl, note, change: EDITED});
        }
        if (!pass._id && JSON.stringify(pass) === JSON.stringify(password)){
          return  ({...pass, title, login, passwordCode, ipUrl, note, change: ADDED});
        }
        return pass;
      });
      setPasswords(newPasswords);
      closeSelf();
    }

    const close = () => {
      closeSelf();
    }

  const removeItem = () => {
    const newPasswords = passwords.map(pass => {
      if (pass._id && pass._id === password._id){
        return ({...pass, change: DELETED});
      }
      if (!pass._id && JSON.stringify(pass) === JSON.stringify(password)){
        return null;
      }
      return pass;
    });
    setPasswords(newPasswords.filter(pass => pass));
    closeSelf();
  };

  return (
    <PasswordForm {...props} {...password} formTitle={"Edit password"} onSubmit={editItem} onRemove={removeItem} onCancel={close} />
  );
};
