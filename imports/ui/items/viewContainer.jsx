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
  useTracker
} from 'meteor/react-meteor-data';

import {
  PreviousItemsCollection
} from '/imports/api/previousItemsCollection';

import {
  ImagesCollection
} from '/imports/api/imagesCollection';

import ItemHistory from '/imports/ui/items/historyView';
import ItemView from '/imports/ui/items/view';
import Loader from '/imports/ui/other/loadingScreen';

import {
  Form,
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";

const NO_CHANGE = 0;
const ADDED = 1;
const EDITED = 2;
const DELETED = 3;

export default function ItemViewContainer( props ) {

  const {
    match,
    history
  } = props;

  const [ displayedItemId, setDisplayedItemId] = useState(null);

  const [ historyView, setHistoryView ] = useState( false );
  const historyViewToggle = () => {
    setHistoryView(!historyView);
  }

  const userId = Meteor.userId();
  const users = useSelector( ( state ) => state.users.value );

  const {itemID} = match.params;
  const items = useSelector( ( state ) => state.items.value );
  const companies = useSelector( ( state ) => state.companies.value );
  const categories = useSelector( ( state ) => state.categories.value );

  const currentlyUsedItem = useMemo( () => {
    if ( items.length > 0 ) {
        return items.find(item => item._id === itemID);
    }
    return null;
  }, [ items, itemID ] );

  let originalItemId = null;
  if (currentlyUsedItem) {
    originalItemId = currentlyUsedItem.originalItem ? currentlyUsedItem.originalItem : currentlyUsedItem._id;
  }

  const previousVersions = useTracker( () => PreviousItemsCollection.find( { originalItem: originalItemId } ).fetch() );
  const {displayedItem, company, category} = useMemo( () => {
    let displayedItem = null;
    let company = null;
    let category = null;
    if (!displayedItemId || displayedItemId === itemID){
      displayedItem = currentlyUsedItem;
    }
    if ( previousVersions.length > 0 ) {
      const maybeDisplayedItem = previousVersions.find(item => item._id === displayedItemId);
      if (maybeDisplayedItem){
        displayedItem = maybeDisplayedItem;
      }
    }
    if ( companies.length > 0 && displayedItem ) {
      company = companies.find( company => company._id === displayedItem.company );
    }
    if ( categories.length > 0 && displayedItem ) {
      category = categories.find( category => category._id === displayedItem.category );
    }
    return {displayedItem, company, category};
  }, [ currentlyUsedItem, previousVersions, displayedItemId, companies, categories ] );

  useEffect(() => {
    if (company){
      const userCannotViewItem = !company.users.find(user => user._id === userId);
      if (userCannotViewItem){
        history.push(getGoToLink());
      }
    }
  }, [company, userId]);

  useEffect(() => {
    setDisplayedItemId(itemID);
  }, [itemID]);

  const dbAddresses = useSelector( ( state ) => state.addresses.value );
  const addresses = useMemo(() => {
    return dbAddresses.filter(address => address.item === itemID);
  }, [dbAddresses, itemID]);

  const dbPasswords = useSelector( ( state ) => state.passwords.value );
  const passwords = useMemo(() => {
    return dbPasswords.filter(password => password.item === itemID);
  }, [dbPasswords, itemID]);


  if (!displayedItem || !category || !company){
    return <Loader />
  }

  return (
    <Form scrollable={true}>
    <div style={{display: "flex"}}>
      {
        <ItemView
          {...props}
          item={displayedItem}
          addresses={addresses}
          passwords={passwords}
          company={company}
          category={category}
          historyOpen={historyView}
          toggleHistory={historyViewToggle}
          />
      }
      {
        historyView &&
        <ItemHistory
          {...props}
          displayedItemId={displayedItemId}
          previousVersions={previousVersions}
          setDisplayedItemId={setDisplayedItemId}
          currentlyUsedItem={currentlyUsedItem}
          />
      }
    </div>
    </Form>
  );
};
