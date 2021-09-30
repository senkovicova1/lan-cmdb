import React, {
  useMemo,
  useState,
  useEffect
} from 'react';
import moment from 'moment';
import {
  useSelector
} from 'react-redux';
import CKEditorWithFileUpload from '/imports/ui/other/ckeditorWithFileUpload';

import {
  ImagesCollection
} from '/imports/api/imagesCollection';

import AddressesList from '/imports/ui/addresses/list';
import PasswordsList from '/imports/ui/passwords/list';
import ItemHistory from '/imports/ui/items/historyView';

import {
  PencilIcon,
  BackIcon
} from "/imports/other/styles/icons";
import {
  Form,
  TitleInputView,
  ViewInput,
  LinkButton,
  FloatingButton,
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";
import {
  addImagesToText,
  handleMedia
} from '../../other/helperFunctions';

export default function ItemView( props ) {

  const {
    match,
    history,
    historyOpen,
    toggleHistory,
    item,
    addresses,
    passwords,
    company,
    category,
  } = props;

  const {companyID, categoryID, itemID} = match.params;

  const userId = Meteor.userId();
  const users = useSelector( ( state ) => state.users.value );
  const statuses = [{label: "Active", value: 0}, {label: "Inactive", value: 1}];

  const userCanEditItem = company?.users.find(user => user._id === userId).level <= 1;

  return (
    <div style={historyOpen ? { width: "calc(100% - 300px)"} : {width: "100%"}}>
      <section className="row">
        <div>
          <div>
            <TitleInputView
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
            <span>
              <LinkButton
                style={{alignSelf: "flex-end", marginLeft: "auto"}}
                onClick={(e) => {e.preventDefault(); toggleHistory();}}
                >
                History
              </LinkButton>
            </span>

          </div>
        </div>
        <hr />
      </section>

      <section className="input-row">
        <div>
        <label htmlFor="category">Category</label>
        <ViewInput
          id="category"
          name="category"
          type="text"
          disabled={true}
          value={category ? category.name : "NO"}
          />
      </div>
      <div>
        <label htmlFor="company">Company</label>
        <ViewInput
          id="company"
          name="company"
          type="text"
          disabled={true}
          value={company ? company.name : "No company"}
          />
      </div>
      </section>

      <section className="input-row">
        <div>
        <label htmlFor="status">Status</label>
        <ViewInput
          id="status"
          name="status"
          type="text"
          disabled={true}
          value={item.status ? statuses.find(s => s.value === item.status).label : "Active"}
          />
      </div>
      <div>
        <label htmlFor="placement">Placement</label>
        <ViewInput
          id="placement"
          name="placement"
          type="text"
          disabled={true}
          value={item.placement ? item.placement : "Not placed"}
          />
      </div>
      </section>

      <section className="input-row">
        <div>
        <label htmlFor="installation-date">Installation date</label>
          {
            item.installationDate &&
        <ViewInput
            disabled={true}
            type="datetime-local"
            id="installation-date"
            name="installation-date"
            value={item.installationDate ? moment.unix(item.installationDate).add((new Date).getTimezoneOffset(), 'minutes').format("yyyy-MM-DD hh:mm").replace(" ", "T") : ""}
            />
        }
            {
              !item.expirationDate &&
              <ViewInput
                id="installation-date"
                name="installation-date"
                type="text"
                disabled={true}
                value={"No expiration date"}
                />
            }
      </div>
      <div>
        <label htmlFor="expiration-date">Expiration date</label>
        {
          item.expirationDate &&
          <ViewInput
            disabled={true}
            type="datetime-local"
            id="expiration-date"
            name="expiration-date"
            value={item.expirationDate ? moment.unix(item.expirationDate).add((new Date).getTimezoneOffset(), 'minutes').format("yyyy-MM-DD hh:mm").replace(" ", "T") : ""}
            />
        }
        {
          !item.expirationDate &&
          <ViewInput
            id="expiration-date"
            name="expiration-date"
            type="text"
            disabled={true}
            value={"No installation date"}
            />
        }
      </div>
      </section>

      <section>
        <AddressesList {...props} addresses={addresses} itemID={item._id} edit={false}/>
      </section>

      <section>
        <PasswordsList {...props} passwords={passwords} itemID={item._id} edit={false}/>
      </section>

      <section className="row-notes description">
        <label htmlFor="description">Description</label>
        <div className="text">
          <div
            className="main"
            dangerouslySetInnerHTML={{
              __html: item.description ? addImagesToText(handleMedia(item.description)) : "No description",
          }}
          >
          </div>
          <div className="note">
            {category.descriptionNote ? category.descriptionNote : "No description noe"}
          </div>
        </div>
      </section>

      <section className="row-notes description">
        <label >Backup tasks description</label>
        <div className="text">
          <div
            className="main"
          dangerouslySetInnerHTML={{
            __html: item.backupDescription ? addImagesToText(handleMedia(item.backupDescription)) : "No backup description",
        }}
        >
          </div>
          <div className="note">
            {category.backupNote ? category.backupNote : "No backup note"}
          </div>
        </div>
      </section>

      <section className="row-notes description">
        <label htmlFor="description">Monitoring  description</label>
        <div className="text">
          <div
            className="main"
        dangerouslySetInnerHTML={{
          __html: item.monitoringDescription ? addImagesToText(handleMedia(item.monitoringDescription)) : "No monitoring description",
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
        itemID === item._id &&
      <FloatingButton
        onClick={(e) => {e.preventDefault(); history.push(getGoToLink("editItem", {companyID: item.company, categoryID: item.category, itemID: item._id}));}}
        >
        <img
          src={PencilIcon}
          alt=""
          className="icon"
          />
      </FloatingButton>
    }

    </div>
  );
};
