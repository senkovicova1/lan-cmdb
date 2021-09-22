import React from 'react';

import {
  AddressesCollection
} from '/imports/api/addressesCollection';

export const NO_CHANGE = 0;
export const ADDED = 1;
export const EDITED = 2;
export const DELETED = 3;

export const addNewAddress = ( nic, ip, mask, gateway, dns, vlan, note, item ) => {
  AddressesCollection.insert( {
    nic,
    ip,
    mask,
    gateway,
    dns,
    vlan,
    note,
    item
  } );
};

export const editAddress = ( addressId, nic, ip, mask, gateway, dns, vlan, note, item ) => {
  let data = { nic, ip, mask, gateway, dns, vlan, note, item };
  AddressesCollection.update( addressId, {
    $set: {
      ...data
    }
  } )
};

export const removeAddress = (addressId) => {
  AddressesCollection.remove( {
    _id: addressId
  } );
}
