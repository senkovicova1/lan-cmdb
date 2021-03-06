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
import Breadcrumbs from '/imports/ui/breadcrumbs';

import {
  PencilIcon,
  BackIcon,
  HourglassIcon
} from "/imports/other/styles/icons";
import {
  Form,
  Card,
  TitleInputView,
  ViewInput,
  LinkButton,
  BorderedLinkButton
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

const {
  companyID,
  categoryID,
  itemID
} = match.params;

const userId = Meteor.userId();
const users = useSelector( ( state ) => state.users.value );
const statuses = [ {
  label: "Active",
  value: 0
}, {
  label: "Inactive",
  value: 1
} ];

const userCanEditItem = company?.users.find( user => user._id === userId ).level <= 1;

  return (
    <div style={historyOpen ? { width: "calc(100% - 300px)", paddingTop: "1em"} : {width: "100%", paddingTop: "1em"}}>

      <span style={{display: "flex", padding: "0px", marginTop: "0.0em", marginBottom: "1em"}}>
        <BorderedLinkButton
          fit={true}
          onClick={(e) => {
            e.preventDefault();
            history.push(getGoToLink("listItemsInCategory", {companyID, categoryID}));
          }}
          >
          <img
            src={BackIcon}
            alt=""
            className="icon"
            />
          Back
        </BorderedLinkButton>

        {
          userCanEditItem &&
          itemID === item._id &&
          <BorderedLinkButton
            fit={true}
            onClick={(e) => {e.preventDefault(); history.push(getGoToLink("editItem", {companyID, categoryID, itemID: item._id}));}}
            >
            <img
              src={PencilIcon}
              alt=""
              className="icon"
              style={{marginRight: "0.6em", width: "20px"}}
              />
            Edit
          </BorderedLinkButton>
        }

        <BorderedLinkButton
          fit={true}
          onClick={(e) => {e.preventDefault(); toggleHistory();}}
          >
          <img
            src={HourglassIcon}
            style={{marginRight: "0.0em"}}
            alt=""
            className="icon"
            />
          History
        </BorderedLinkButton>
      </span>

      <Card>

      <section className="row">
  <div>
    <h2>{item.name}</h2>

          <div className="dates">
            <span>{`Created by ${users.length > 0 ? users.find(user => user._id === item.createdBy).label : "Unknown"} at ${moment.unix(item.createdDate).format("D.M.YYYY HH:mm:ss")}`}</span>
            <span>{`Updated by ${users.length > 0 ? users.find(user => user._id === item.updatedBy).label : "Unknown"} at ${moment.unix(item.updatedDate).format("D.M.YYYY HH:mm:ss")}`}</span>

          </div>
        </div>
      </section>

      <section className="input-row-triple">
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
      </section>

      <section className="input-row-triple">
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
    </Card>

    </div>
  );
};
