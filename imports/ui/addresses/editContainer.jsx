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
    addressId
  } = props;

    const userId = Meteor.userId();

    const itemID = match.params.itemID;

    const addresses = useSelector( ( state ) => state.addresses.value );
    const address = useMemo( () => {
      if ( addresses.length > 0 ) {
        return addresses.find( address => address._id === addressId );
      }
      return {};
    }, [ addresses, addressId ] );

    const editItem = ( nic, ip, mask, gateway, dns, vlan, note ) => {
    AddressesCollection.update( addressId, {
      $set: {
        nic,
        ip,
        mask,
        gateway,
        dns,
        vlan,
        note,
        item: itemID
      }
    }, ( error ) => {
      if ( error ) {
        console.log( error );
      } else {
        closeSelf();
      }
    } );
    }

    const close = () => {
      closeSelf();
    }


  const removeItem = () => {
    if ( window.confirm( "Are you sure you want to remove this address?" ) ) {
      AddressesCollection.remove( {
        _id: addressId
      } );
    closeSelf();
    }
  };

  return (
    <AddressForm {...props} {...address} title={"Edit address"} onSubmit={editItem} onRemove={removeItem} onCancel={close} />
  );
};
