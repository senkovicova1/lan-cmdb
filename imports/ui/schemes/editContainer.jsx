import React, {
  useMemo,
  useEffect
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  CompaniesCollection
} from '/imports/api/companiesCollection';

import SchemeForm from './form';

import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function EditSchemeContainer( props ) {

  const {
    match,
    history,
  } = props;

  const userId = Meteor.userId();

  const companyID = match.params.companyID;
  const companies = useSelector( ( state ) => state.companies.value );
  const company = useMemo( () => {
    if ( companies.length > 0 ) {
      return companies.find( company => company._id === companyID );
    }
    return null;
  }, [ companies, companyID ] );

useEffect(() => {
  if (company){
    const userCannotEdit = company.users.find(user => user._id === userId).level > 0;
    if (userCannotEdit){
      history.push(getGoToLink());
    }
  }
  if (!company){
    history.push(getGoToLink());
  }
}, [company, userId]);


  const editCompany = ( picture, description ) => {
    let data = {
      picture,
      description
    };
    CompaniesCollection.update( companyID, {
      $set: {
        scheme: {
          ...data
        }
      }
    } );
      history.goBack();
  };

  const close = () => {
    history.goBack();
  }

  if (!company){
    return (<div></div>)
  }

  return (
    <SchemeForm {...props} title={"Edit scheme"} {...company.scheme} onSubmit={editCompany} onCancel={close} />
  );
};
