import React, {
  useMemo,
  useState,
  useEffect
} from 'react';
import moment from 'moment';

import {
  ItemsCollection
} from '/imports/api/itemsCollection';
import {
  PreviousItemsCollection
} from '/imports/api/previousItemsCollection';

import {
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

  const restorePreviousVersion = (version) => {
    if ( window.confirm( "Are you sure you want to restore this version?" ) ) {

        let oldItem = {...currentlyUsedItem};
        delete oldItem._id;

        console.log(currentlyUsedItem, version);
        PreviousItemsCollection.insert( {
          ...oldItem,
          originalItem: currentlyUsedItem.originalItem ? currentlyUsedItem.originalItem : currentlyUsedItem._id ,
        }, ( error, _id ) => {
          if ( error ) {
            console.log( error );
          }
        } );

        ItemsCollection.remove( {
          _id: currentlyUsedItem._id
        } );

        let newItem = {...version};
        delete version._id;

        ItemsCollection.insert( {
          ...version,
          updatedDate: moment().unix(),
          updatedBy: userId,
          createdDate: moment().unix(),
          createdBy: userId,
          originalItem: version.originalItem ? version.originalItem : version._id,
        }, ( error, _id ) => {
          if ( error ) {
            console.log( error );
          }  else {
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
    <div className="scheme-sidebar">
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
    </div>
  );
};
