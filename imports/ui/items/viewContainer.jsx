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

  const itemID = match.params.itemID; // currently used item
  const items = useSelector( ( state ) => state.items.value );
  const currentlyUsedItem = useMemo( () => {
    if ( items.length > 0 ) {
        return items.find(item => item._id === itemID);
    }
    return {};
  }, [ items, itemID ] );

  let originalItemId = null;
  if (currentlyUsedItem) {
    originalItemId = currentlyUsedItem.originalItem ? currentlyUsedItem.originalItem : currentlyUsedItem._id;
  }

  const previousVersions = useTracker( () => PreviousItemsCollection.find( { originalItem: originalItemId } ).fetch() );
  const displayedItem = useMemo( () => {
    if (!displayedItemId || displayedItemId === itemID){
      return currentlyUsedItem;
    }
    if ( previousVersions.length > 0 ) {
        return previousVersions.find(item => item._id === displayedItemId);
    }
    return currentlyUsedItem;
  }, [ currentlyUsedItem, previousVersions, displayedItemId ] );

  const companyID = match.params.companyID;
  const companies = useSelector( ( state ) => state.companies.value );
  const company = useMemo( () => {
    if ( companies.length > 0 && displayedItem ) {
      return companies.find( company => company._id === displayedItem.company );
    }
    return null;
  }, [ companies, displayedItem ] );


  useEffect(() => {
    if (companyID !== "all-companies" && company){
      const userCannotViewItem = !company.users.find(user => user._id === userId);
      if (userCannotViewItem){
        history.push(getGoToLink());
      }
    }
  }, [company, companyID, userId]);

  useEffect(() => {
    setDisplayedItemId(itemID);
  }, [itemID]);

  const categoryID = match.params.categoryID;
  const categories = useSelector( ( state ) => state.categories.value );
  const category = useMemo( () => {
    if ( categories.length > 0 && displayedItem ) {
      return categories.find( category => category._id === displayedItem.category );
    }
    return {};
  }, [ categories, displayedItem ] );

  if (!displayedItem){
    return <Loader />
  }

  return (
    <Form>
    <div className="scheme-content">
      {
        <ItemView
          {...props}
          item={displayedItem}
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
