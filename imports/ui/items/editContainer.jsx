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
import {
  AddressesCollection
} from '/imports/api/addressesCollection';

import {addNewAddress, editAddress, removeAddress} from '../addresses/addressesHandlers';

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

  const itemID = match.params.itemID;
  const categoryID = match.params.categoryID;

  const companyID = match.params.companyID;
  const companies = useSelector( ( state ) => state.companies.value );
  const company = useMemo( () => {
    if ( companies.length > 0 ) {
      return companies.find( company => company._id === companyID );
    }
    return null;
  }, [ companies, companyID ] );

useEffect(() => {
  if (companyID !== "all-companies" && company){
    const userCannotEditItem = company.users.find(user => user._id === userId).level > 1;
    if (userCannotEditItem){
      history.push(getGoToLink());
    }
  }
}, [company, companyID, userId]);

  const items = useSelector( ( state ) => state.items.value );
  const item = useMemo( () => {
    if ( items.length > 0 ) {
      return items.find( item => item._id === itemID );
    }
    return {};
  }, [ items, itemID ] );

  const addresses = useSelector( ( state ) => state.addresses.value );
  const addressesInItem = useMemo( () => {
    return addresses.filter(address => address.item === itemID).map(address => ({...address, change: NO_CHANGE}));
  }, [ addresses, itemID ] );

  const editItem = ( name, status, placement, installationDate, expirationDate, description, backupDescription, monitoringDescription, updatedDate, updatedBy, originalItemId, addresses ) => {

    let oldItem = {...item};
    delete oldItem._id;

    PreviousItemsCollection.insert( {
      ...oldItem,
      originalItem: originalItemId,
      addresses: addressesInItem,
    }, ( error, _id ) => {
      if ( error ) {
        console.log( error );
      }
    } );

    ItemsCollection.insert( {
      name,
      status,
      placement,
      installationDate,
      expirationDate,
      description,
      backupDescription,
      monitoringDescription,
      updatedDate,
      updatedBy,
      category: categoryID,
      company: companyID,
      createdDate: moment().unix(),
      createdBy: userId,
      originalItem: originalItemId,
    }, ( error, _id ) => {
      if ( error ) {
        console.log( error );
      }  else {
        console.log(_id);
        console.log(addresses);
        addresses.forEach((address, i) => {
          switch (address.change) {
            case NO_CHANGE:
              editAddress(address._id, address.nic, address.ip, address.mask, address.gateway, address.dns, address.vlan, address.note, _id );
              break;
            case ADDED:
              addNewAddress(address.nic, address.ip, address.mask, address.gateway, address.dns, address.vlan, address.note, _id );
              break;
            case EDITED:
              editAddress(address._id, address.nic, address.ip, address.mask, address.gateway, address.dns, address.vlan, address.note, _id );
              break;
            case DELETED:
              removeAddress(address._id);
              break;
            default:
              editAddress(address._id, address.nic, address.ip, address.mask, address.gateway, address.dns, address.vlan, address.note, _id );
          }
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
        companyID,
        categoryID,
      } ) );
    }
  };

  const close = () => {
    history.goBack();
  }

  return (
    <ItemForm {...props} companyID={companyID} categoryID={categoryID} {...item} addresses={addressesInItem} onSubmit={editItem} onRemove={removeItem} onCancel={close} />
  );
};
