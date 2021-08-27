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

export default function AddAddressContainer( props ) {
  const {
    match,
    history,
    closeSelf,
    addedAddresses,
    setAddedAddresses
  } = props;

  const userId = Meteor.userId();

  const itemID = match.params.itemID;

  const addNew = ( _id, nic, ip, mask, gateway, dns, vlan, note ) => {
    setAddedAddresses([...addedAddresses, {nic, ip, mask, gateway, dns, vlan, note, item: itemID}]);
    closeSelf();
  }

  const close = () => {
    closeSelf();
  }

  return (
    <AddressForm {...props} title={"Add address"} onSubmit={addNew} onCancel={close}/>
  );
};
