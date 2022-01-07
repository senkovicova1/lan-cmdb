import React, {
  useMemo,
  useState,
  useEffect
} from 'react';
import moment from 'moment';
import {
  useSelector
} from 'react-redux';

import {
  ItemsCollection
} from '/imports/api/itemsCollection';
import {
  PreviousItemsCollection
} from '/imports/api/previousItemsCollection';
import {
  AddressesCollection
} from '/imports/api/addressesCollection';
import {
  PasswordsCollection
} from '/imports/api/passwordsCollection';

import {
  Card,
  LinkButton,
} from "/imports/other/styles/styledComponents";

import {
  RestoreIcon,
} from "/imports/other/styles/icons";

import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function ItemHistory( props ) {

  const {
    match,
    history,
    displayedItemId,
    previousVersions,
    setDisplayedItemId,
    currentlyUsedItem,
  } = props;

    const userId = Meteor.userId();

    const companyID = match.params.companyID;
    const categoryID = match.params.categoryID;

    const addresses = useSelector( ( state ) => state.addresses.value );
    const addressesInCurrentlyUsedItem = useMemo( () => {
      return addresses.filter(address => address.item === currentlyUsedItem._id);
    }, [ addresses, currentlyUsedItem ] );

    const passwords = useSelector( ( state ) => state.passwords.value );
    const passwordsInCurrentlyUsedItem = useMemo( () => {
      return passwords.filter(password => password.item === currentlyUsedItem._id);
    }, [ passwords, currentlyUsedItem ] );

  const restorePreviousVersion = (version) => {
    if ( window.confirm( "Are you sure you want to restore this version?" ) ) {

        const originalItem = currentlyUsedItem.originalItem ? currentlyUsedItem.originalItem : version.originalItem;

        let oldItem = {...currentlyUsedItem};
        delete oldItem._id;

        PreviousItemsCollection.insert( {
          ...oldItem,
          originalItem: originalItem,
          addresses: [...addressesInCurrentlyUsedItem],
          passwords: [...passwordsInCurrentlyUsedItem],
        }, ( error, _id ) => {
          if ( error ) {
            console.log( error );
          }
        } );

        ItemsCollection.remove( {
          _id: currentlyUsedItem._id
        } );

        addressesInCurrentlyUsedItem.forEach((addr, i) => {
          AddressesCollection.remove( {
            _id: addr._id,
          });
        });

        passwordsInCurrentlyUsedItem.forEach((pass, i) => {
          PasswordsCollection.remove( {
            _id: pass._id,
          });
        });

        let newItem = {...version};
        const addressesInNewItem = [...version.addresses];
        const passwordsInNewItem = [...version.passwords];
        delete newItem._id;
        delete newItem.addresses;
        delete newItem.passwords;

        ItemsCollection.insert( {
          ...newItem,
          updatedDate: moment().unix(),
          updatedBy: userId,
          createdDate: moment().unix(),
          createdBy: userId,
          originalItem: originalItem,
        }, ( error, _id ) => {
          if ( error ) {
            console.log( error );
          }  else {

            addressesInNewItem.forEach((addr, i) => {
              let addrToWrite = {...addr};
              delete addrToWrite._id;
              AddressesCollection.insert( {
                ...addrToWrite,
                item: _id,
              });
            });

            passwordsInNewItem.forEach((pass, i) => {
              let passToWrite = {...pass};
              delete passToWrite._id;
              PasswordsCollection.insert( {
                ...passToWrite,
                item: _id,
              });
            });

            history.push( getGoToLink( "viewItem", {
              companyID,
              categoryID,
              itemID: _id
            } ) );
          }
        } );
      }
  }

  return (
    <div className="scheme-sidebar" style={{paddingTop: "63.5px"}}>
      <Card>
      <h2>Previous versions</h2>
        <div>
              <span
                style={displayedItemId === currentlyUsedItem._id ? {color: "#0078d4"} : {}}
                onClick={(e) => {e.preventDefault(); setDisplayedItemId(currentlyUsedItem._id);}}
                >
              {`Current version made ${moment.unix(currentlyUsedItem.createdDate).format("D.M.YYYY HH:mm:ss")}`}
            </span>
        </div>
      {
        previousVersions.sort((v1, v2) => v1.createdDate < v2.createdDate ? 1 : -1).map(previousVersion => (
          <div key={previousVersion._id}>
                <span
                  style={displayedItemId === previousVersion._id ? {color: "#0078d4"} : {}}
                  onClick={(e) => {e.preventDefault(); setDisplayedItemId(previousVersion._id)}}
                  >
                {`Version ${moment.unix(previousVersion.createdDate).format("D.M.YYYY HH:mm:ss")}`}
              </span>
              <LinkButton
                onClick={(e) => {e.preventDefault(); restorePreviousVersion(previousVersion)}}
                >
                <img
                  src={RestoreIcon}
                  alt=""
                  className="icon"
                  />
              </LinkButton>
          </div>
        ))
      }
    </Card>
    </div>
  );
};
