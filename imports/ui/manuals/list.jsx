import React, {
  useMemo,
  useEffect
} from 'react';
import {
  useSelector
} from 'react-redux';
import moment from 'moment';

import Breadcrumbs from '/imports/ui/breadcrumbs';

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

  useEffect( () => {
    if ( companyID && companyID !== "all-companies" && company ) {
      const userCannotView = !company.users.find( user => user._id === userId );
      if ( userCannotView ) {
        history.push( getGoToLink() );
      }
    }
  }, [ company, companyID, userId ] );

  const manuals = useSelector( ( state ) => state.manuals.value ).filter(manual => manual.company === companyID);
  const users = useSelector( ( state ) => state.users.value );

  const assignedManuals = useMemo(() => {
    if (manuals.length === 0 || users.length === 0){
      return [];
    }
    return manuals.map(manual => ({
      ...manual,
      createdBy: users.find(user => user._id === manual.createdBy),
      updatedBy: users.find(user => user._id === manual.updatedBy),
    }))
  }, [manuals, users]);

  const userCanAddItems = true;

  return (
    <List style={{padding: "0px"}}>
      <Breadcrumbs {...props} />
      {
        userCanAddItems &&
        <LinkButton
          style={{height: "fit-content", padding: "0px 24.9px 24.9px 24.9px"}}
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
        assignedManuals.length === 0 &&
        <span className="message" style={{paddingLeft: "24.9px"}}>This company has no manuals.</span>
      }

      {
        assignedManuals.length > 0 &&
        assignedManuals.map(manual => (
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
              <span>{`Created by ${manual.createdBy.label} on ${moment.unix(manual.dateCreated).format("D.M.YYYY HH:mm:ss")}`}</span>
              <span>{`Last updated by ${manual.updatedBy.label} on ${moment.unix(manual.dateUpdated).format("D.M.YYYY HH:mm:ss")}`}</span>
            </div>
          </ManualInfo>
        ))
      }

    </List>
  );
};
