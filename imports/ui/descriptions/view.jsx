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
  FullButton,
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

  const descriptions = useSelector( ( state ) => state.descriptions.value ).filter(description => description.company === companyID);

  const currentDescription = useMemo( () => {
    if ( descriptions.length > 0 ) {
      return descriptions.find(description => description.version === 0);
    }
    return null;
  }, [ descriptions ] );

  useEffect(() => {
    if (companyID !== "all-companies" && company){
      const userCannotView = !company.users.find(user => user._id === userId);
      if (userCannotView){
        history.push(getGoToLink());
      }
    } else {
      history.push(getGoToLink());
    }
  }, [company, companyID, userId]);


  if (!company){
    return (<div></div>)
  }

  const userCanEdit = company.users.find(user => user._id === userId).level === 0;

  return (
    <Form>

    <div className="scheme-content">
      <div>

      <section className="description">
        <label htmlFor="description">Description</label>
          <div
            dangerouslySetInnerHTML={{
              __html: currentDescription?.description ? addImagesToText(handleMedia(currentDescription.description)) : "No description",
          }}
          >
        </div>
      </section>

    </div>
    {
      userCanEdit &&
      <FullButton
        onClick={(e) => {e.preventDefault(); history.push(getGoToLink("descriptionEdit", {companyID}));}}
          style={{marginLeft: "auto", width: "150px"}}
        >
        <img
          src={PencilIcon}
          alt=""
          className="icon"
          />
        Edit
      </FullButton>
    }

    </div>


    </Form>
  );
};
