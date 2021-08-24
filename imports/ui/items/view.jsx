import React, {
  useMemo,
  useEffect
} from 'react';
import moment from 'moment';
import {
  useSelector
} from 'react-redux';

import {
  ImagesCollection
} from '/imports/api/imagesCollection';

import AddressesList from '/imports/ui/addresses/list';

import {
  PencilIcon,
  BackIcon
} from "/imports/other/styles/icons";
import {
  Form,
  TitleInput,
  ViewInput,
  FloatingButton,
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";
import {
  addImagesToText
} from '../../other/helperFunctions';

export default function ItemView( props ) {

  const {
    match,
    history
  } = props;

  const userId = Meteor.userId();
  const users = useSelector( ( state ) => state.users.value );

  const itemID = match.params.itemID;
  const items = useSelector( ( state ) => state.items.value );
  const item = useMemo( () => {
    if ( items.length > 0 ) {
      return items.find( item => item._id === itemID );
    }
    return {};
  }, [ items, itemID ] );

  const companyID = match.params.companyID;
  const companies = useSelector( ( state ) => state.companies.value );
  const company = useMemo( () => {
    if ( companies.length > 0 && item ) {
      return companies.find( company => company._id === item.company );
    }
    return null;
  }, [ companies, item ] );

  useEffect(() => {
    if (companyID !== "all-companies" && company){
      const userCannotViewItem = !company.users.find(user => user._id === userId);
      if (userCannotViewItem){
        history.push(getGoToLink());
      }
    }
    if (!company){
      history.push(getGoToLink());
    }
  }, [company, companyID, userId]);

  const categoryID = match.params.categoryID;
  const categories = useSelector( ( state ) => state.categories.value );
  const category = useMemo( () => {
    if ( categories.length > 0 && item ) {
      return categories.find( category => category._id === item.category );
    }
    return {};
  }, [ categories, item ] );

  const userCanEditItem = company?.users.find(user => user._id === userId).level <= 1;

  return (
    <Form>

      <section className="row">
        <div>
          <div>
            <TitleInput
              type="text"
              id="name"
              name="name"
              disabled={true}
              value={item.name ? item.name : "Untitled"}
              />
          </div>
          <div className="dates">
            <span>{`Created by ${users.length > 0 ? users.find(user => user._id === item.createdBy).label : "Unknown"} at ${moment.unix(item.createdDate).format("D.M.YYYY HH:mm:ss")}`}</span>
            <span>{`Updated by ${users.length > 0 ? users.find(user => user._id === item.updatedBy).label : "Unknown"} at ${moment.unix(item.updatedDate).format("D.M.YYYY HH:mm:ss")}`}</span>
          </div>
        </div>
        <hr />
      </section>

      <section>
        <label htmlFor="category">Category</label>
        <ViewInput
          id="category"
          name="category"
          type="text"
          disabled={true}
          value={category ? category.name : "NO"}
          />
      </section>

      <section>
        <label htmlFor="company">Company</label>
        <ViewInput
          id="company"
          name="company"
          type="text"
          disabled={true}
          value={company ? company.name : "No company"}
          />
      </section>

      <section>
        <AddressesList {...props}/>
      </section>

      <section  className="row-notes">
        <label htmlFor="description">Description</label>
        <div className="text">
          <div
            className="main"
            dangerouslySetInnerHTML={{
              __html: item.description ? addImagesToText(item.description) : "No description",
          }}
          >
          </div>
          <div className="note">
            {category.descriptionNote ? category.descriptionNote : "No description noe"}
          </div>
        </div>
      </section>

      <section  className="row-notes">
        <label >Backup tasks description</label>
        <div className="text">
          <div
            className="main"
          dangerouslySetInnerHTML={{
            __html: item.backupDescription ? addImagesToText(item.backupDescription) : "No backup description",
        }}
        >
          </div>
          <div className="note">
            {category.backupNote ? category.backupNote : "No backup note"}
          </div>
        </div>
      </section>

      <section  className="row-notes">
        <label htmlFor="description">Monitoring  description</label>
        <div className="text">
          <div
            className="main"
        dangerouslySetInnerHTML={{
          __html: item.monitoringDescription ? addImagesToText(item.monitoringDescription) : "No monitoring description",
      }}
      >
          </div>
          <div className="note">
            {category.monitoringNote ? category.monitoringNote : "No monitoring note"}
          </div>
        </div>
      </section>

      <FloatingButton
        left
        onClick={(e) => {e.preventDefault(); history.push(getGoToLink("listItemsInCategory", {companyID, categoryID}));}}
        >
        <img
          style={{marginRight: "2px"}}
          src={BackIcon}
          alt=""
          className="icon"
          />
      </FloatingButton>

      {
        userCanEditItem &&
      <FloatingButton
        onClick={(e) => {e.preventDefault(); history.push(getGoToLink("editItem", {companyID: item.company, categoryID: item.category, itemID}));}}
        >
        <img
          src={PencilIcon}
          alt=""
          className="icon"
          />
      </FloatingButton>
    }

    </Form>
  );
};
