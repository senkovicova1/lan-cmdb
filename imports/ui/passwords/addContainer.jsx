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

export default function AddPasswordContainer( props ) {
  const {
    match,
    history,
    closeSelf,
    passwords,
    setPasswords,
  } = props;

  const userId = Meteor.userId();

  const itemID = match.params.itemID;

  const addNew = (title, login, password, ipUrl, note ) => {
    setPasswords([...passwords, {title, login, password, ipUrl, note, item: itemID, change: ADDED}]);
    closeSelf();
  }

  const close = () => {
    closeSelf();
  }

  return (
    <PasswordForm {...props} formTitle={"Add password"} onSubmit={addNew} onCancel={close}/>
  );
};
