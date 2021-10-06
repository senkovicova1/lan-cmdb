import React from 'react';

import {
  AddressesCollection
} from '/imports/api/addressesCollection';

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
