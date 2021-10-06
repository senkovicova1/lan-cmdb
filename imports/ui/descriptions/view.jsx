import React, {
  useState,
  useMemo,
  useEffect
} from 'react';
import moment from 'moment';
import {
  useSelector
} from 'react-redux';
import {
  Modal,
  ModalBody
} from 'reactstrap';

import {
  DescriptionsCollection
} from '/imports/api/descriptionsCollection';

import {
  PencilIcon,
  RestoreIcon,
  BackIcon
} from "/imports/other/styles/icons";
import {
  Form,
  LinkButton,
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";
import {
  uint8ArrayToImg,
  addImagesToText,
  handleMedia
} from '/imports/other/helperFunctions';

export default function DescriptionView( props ) {

  const {
    match,
    history
  } = props;

  const userId = Meteor.userId();

  const companyID = match.params.companyID;
  const companies = useSelector( ( state ) => state.companies.value );
  const company = useMemo( () => {
    if ( companies.length > 0 && companyID ) {
      return companies.find( company => company._id === companyID );
    }
    return null;
  }, [ companies, companyID ] );

  const description = useSelector( ( state ) => state.descriptions.value ).find(description => description.company === companyID);

  useEffect(() => {
    if (companyID !== "all-companies" && company){
      const userCannotView = !company.users.find(user => user._id === userId);
      if (userCannotView){
        history.push(getGoToLink());
      }
    }
  }, [company, companyID, userId]);


  if (!company){
    return (<div></div>)
  }

  const userCanEdit = company.users.find(user => user._id === userId).level === 0;

  return (
    <Form>
      <div className="heading">
        <div style={{ display: "flex", alignItems: "center"}}>
          {
            userCanEdit &&
            <LinkButton
              fit={true}
              onClick={(e) => {e.preventDefault(); history.push(getGoToLink("descriptionEdit", {companyID}));}}
              style={{marginLeft: "auto", width: "80px"}}
              >
              <img
                src={PencilIcon}
                style={{marginRight: "0.6em"}}
                alt=""
                className="icon"
                />
              Edit
            </LinkButton>
          }
        </div>
      </div>

    <div className="scheme-content">
      <div>

      <section className="description">
          <div
            dangerouslySetInnerHTML={{
              __html: description?.description ? addImagesToText(handleMedia(description.description)) : "No description",
          }}
          >
        </div>
      </section>

    </div>


    </div>


    </Form>
  );
};
