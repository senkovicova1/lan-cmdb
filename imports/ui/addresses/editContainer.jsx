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

export default function EditItemContainer( props ) {

  const {
    match,
    history,
    closeSelf,
    address,
    addresses,
    setAddresses,
  } = props;

    const userId = Meteor.userId();

    const itemID = match.params.itemID;

    const editItem = (nic, ip, mask, gateway, dns, vlan, note, _id ) => {
      const newAddresses = addresses.map(addr => {
        if (addr._id && addr._id === address._id){
          return ({...addr, nic, ip, mask, gateway, dns, vlan, note, change: EDITED});
        }
        if (!addr._id && JSON.stringify(addr) === JSON.stringify(address)){
          return  ({...addr, nic, ip, mask, gateway, dns, vlan, note, change: ADDED});
        }
        return addr;
      });
      setAddresses(newAddresses);
      closeSelf();
    }

    const close = () => {
      closeSelf();
    }

  const removeItem = () => {
    const newAddresses = addresses.map(addr => {
      if (addr._id && addr._id === address._id){
        return ({...addr, change: DELETED});
      }
      if (!addr._id && JSON.stringify(addr) === JSON.stringify(address)){
        return null;
      }
      return addr;
    });
    setAddresses(newAddresses.filter(addr => addr));
    closeSelf();
  };

  return (
    <AddressForm {...props} {...address} title={"Edit address"} onSubmit={editItem} onRemove={removeItem} onCancel={close} />
  );
};
