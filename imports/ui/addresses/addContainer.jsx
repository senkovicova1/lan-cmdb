import React, {
  useMemo,
  useEffect
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  AddressesCollection
} from '/imports/api/addressesCollection';

import AddressForm from './form';

import {
  getGoToLink,
} from "/imports/other/navigationLinks";

const NO_CHANGE = 0;
const ADDED = 1;
const EDITED = 2;
const DELETED = 3;

export default function AddAddressContainer( props ) {
  const {
    match,
    history,
    closeSelf,
    addresses,
    setAddresses,
  } = props;

  const userId = Meteor.userId();

  const itemID = match.params.itemID;

  const addNew = ( nic, ip, mask, gateway, dns, vlan, note ) => {
    setAddresses([...addresses, {nic, ip, mask, gateway, dns, vlan, note, item: itemID, change: ADDED}]);
    closeSelf();
  }

  const close = () => {
    closeSelf();
  }

  return (
    <AddressForm {...props} title={"Add address"} onSubmit={addNew} onCancel={close}/>
  );
};
