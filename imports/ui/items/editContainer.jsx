import React, {
  useMemo,
  useEffect
} from 'react';
import {
  useSelector
} from 'react-redux';
import moment from 'moment';

import {
  ItemsCollection
} from '/imports/api/itemsCollection';
import {
  PreviousItemsCollection
} from '/imports/api/previousItemsCollection';

import {addNewAddress, editAddress, removeAddress} from '../addresses/addressesHandlers';
import {addNewPassword, editPassword, removePassword} from '../passwords/passwordsHandlers';

import ItemForm from './form';

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
  } = props;

  const userId = Meteor.userId();

  const {itemID, companyID, categoryID} = match.params;

  const companies = useSelector( ( state ) => state.companies.value );

  const items = useSelector( ( state ) => state.items.value );
  const {item, company, category} = useMemo( () => {
    let item = null;
    let company = null;
    if ( items.length > 0 ) {
      item = items.find( item => item._id === itemID );
    }
    if ( companies.length > 0 && item ) {
      company = companies.find( company => company._id === item.company );
    }
    return {item, company};
  }, [ items, itemID, companies ] );

  useEffect(() => {
    if (company){
      const userCannotEditItem = company.users.find(user => user._id === userId).level > 1;
      if (userCannotEditItem){
        history.push(getGoToLink());
      }
    }
  }, [company, userId]);

  const addresses = useSelector( ( state ) => state.addresses.value );
  const addressesInItem = useMemo( () => {
    return addresses.filter(address => address.item === itemID).map(address => ({...address, change: NO_CHANGE}));
  }, [ addresses, itemID ] );

  const passwords = useSelector( ( state ) => state.passwords.value );
  const passwordsInItem = useMemo( () => {
    return passwords.filter(password => password.item === itemID).map(password => ({...password, change: NO_CHANGE}));
  }, [ passwords, itemID ] );

  const editItem = ( name, status, company, placement, installationDate, expirationDate, description, backupDescription, monitoringDescription, updatedDate, updatedBy, originalItemId, addresses, passwords ) => {

    let oldItem = {...item};
    delete oldItem._id;

    PreviousItemsCollection.insert( {
      ...oldItem,
      originalItem: originalItemId,
      addresses: addressesInItem,
      passwords: passwordsInItem,
    }, ( error, _id ) => {
      if ( error ) {
        console.log( error );
      }
    } );

    addressesInItem.forEach((addr, i) => {
      AddressesCollection.remove( {
        _id: addr._id,
      });
    });

    passwordsInItem.forEach((pass, i) => {
      PasswordsCollection.remove( {
        _id: pass._id,
      });
    });

    ItemsCollection.insert( {
      name,
      status,
      company,
      placement,
      installationDate,
      expirationDate,
      description,
      backupDescription,
      monitoringDescription,
      updatedDate,
      updatedBy,
      category: item.category,
      createdDate: moment().unix(),
      createdBy: userId,
      originalItem: originalItemId,
    }, ( error, _id ) => {
      if ( error ) {
        console.log( error );
      }  else {
        addresses.forEach((address, i) => {
          addNewAddress(address.nic, address.ip, address.mask, address.gateway, address.dns, address.vlan, address.note, _id );
        });

        passwords.forEach((password, i) => {
          addNewPassword(password.title, password.login, password.password, password.ipUrl, password.note, _id );
        });

        history.push( getGoToLink( "viewItem", {
          companyID,
          categoryID,
          itemID: _id
        } ) );
      }
    } );

        ItemsCollection.remove( {
          _id: itemID
        } );
  }


  const removeItem = () => {
    if ( window.confirm( "Are you sure you want to remove this item?" ) ) {
      ItemsCollection.remove( {
        _id: itemID
      } );
      history.push( getGoToLink( "listItemsInCategory", {
        companyID: company._id,
        categoryID: item.category._id,
      } ) );
    }
  };

  const close = () => {
    history.goBack();
  }

  if (!item || !company){
    return <div></div>
  }

  return (
    <ItemForm {...props} companyID={item.company} categoryID={item.category} {...item} addresses={addressesInItem} passwords={passwordsInItem} onSubmit={editItem} onRemove={removeItem} onCancel={close} />
  );
};
