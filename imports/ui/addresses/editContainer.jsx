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

export default function EditItemContainer( props ) {

  const {
    match,
    history,
    closeSelf,
    address,
    addedAddresses,
    setAddedAddresses,
    editedAddresses,
    setEditedAddresses,
    deletedAddresses,
    setDeletedAddresses
  } = props;

    const userId = Meteor.userId();

    const itemID = match.params.itemID;

    const editItem = (_id, nic, ip, mask, gateway, dns, vlan, note ) => {
      setEditedAddresses([...editedAddresses, {_id, nic, ip, mask, gateway, dns, vlan, note, item: itemID}]);
      closeSelf();
    }

    const close = () => {
      closeSelf();
    }


  const removeItem = () => {
    if (!address._id){
      setAddedAddresses(addedAddresses.filter(addr => addr.toString() !== address.toString()));
    } else {
      setDeletedAddresses([...deletedAddresses, address]);
    }
    closeSelf();
  };

  return (
    <AddressForm {...props} {...address} title={"Edit address"} onSubmit={editItem} onRemove={removeItem} onCancel={close} />
  );
};
