import React, {
  useMemo,
  useEffect
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  PlusIcon
} from "/imports/other/styles/icons";
import {
  List,
  LinkButton,
  ManualInfo
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function ManualsList( props ) {

  const {
    match,
    history,
    setAddManual,
    editedManual,
    setEditedManual,
    setShowDetail
  } = props;

  const userId = Meteor.userId();
  const {
    companyID
  } = match.params;

  const companies = useSelector( ( state ) => state.companies.value );
  const company = useMemo( () => {
    if ( companies.length > 0 ) {
      return companies.find( company => company._id === companyID );
    }
    return null;
  }, [ companies, companyID ] );

  const manuals = useSelector( ( state ) => state.manuals.value );

  useEffect( () => {
    if ( companyID !== "all-companies" && company ) {
      const userCannotView = !company.users.find( user => user._id === userId );
      if ( userCannotView ) {
        history.push( getGoToLink() );
      }
    }
  }, [ company, companyID, userId ] );

  const userCanAddItems = true;

  return (
    <List style={{padding: "0px"}}>
      {
        userCanAddItems &&
        <LinkButton
          style={{padding: "0px 15px"}}
          onClick={() => {
            setAddManual(true);
            setEditedManual(null);
          }}
          >
          <img
            className="icon"
            src={PlusIcon}
            alt="Plus icon not found"
            />
          <span>
            Manual
          </span>
        </LinkButton>
      }

      {
        manuals.length === 0 &&
        <span className="message" style={{paddingLeft: "15px"}}>This company has no manuals.</span>
      }

      {
        manuals.length > 0 &&
        manuals.map(manual => (
          <ManualInfo
            key={manual._id}
            active={editedManual === manual._id}
            onClick={() => {
              setEditedManual(manual._id);
              setAddManual(false);
              setShowDetail(true);
            }}
            >
            <span className="title">{manual.title ? manual.title : "Untitled"}</span>
            <div className="info">
              <span>{`Created by ${manual.createdBy} on ${manual.dateCreated}`}</span>
              <span>{`Last updated by ${manual.updatedBy} on ${manual.dateUpdated}`}</span>
            </div>
          </ManualInfo>
        ))
      }

    </List>
  );
};
