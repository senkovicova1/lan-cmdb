import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import { useSelector } from 'react-redux';

import CompanyForm from './companyForm';
import {
  CompaniesCollection
} from '/imports/api/companiesCollection';
import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function EditCompanyContainer( props ) {

  const {
    match,
    history,
    closeSelf
  } = props;

  const companyID = match.params.companyID;
  const companies = useSelector((state) => state.companies.value);
  const company = useMemo(() => {
    return  companies.find(company => company._id === companyID);
  }, [companies, companyID]);

  const userId = Meteor.userId();

  const editCompany = ( name,  DPH,  ICO,  DIC,  IC_DPH,  country,  city,  street,  ZIP,  email,  phone,  description,  users ) => {
    let data = {
      name,  DPH,  ICO,  DIC,  IC_DPH,  country,  city,  street,  ZIP,  email,  phone,  description,  users
    };
    CompaniesCollection.update( companyID, {
      $set: {
        ...data
      }
    } );
    cancel();
  };

  const removeCompany = ( companyId ) => {
    if ( window.confirm( "Are you sure you want to remove this company? Note: Company will be moved to the \"Deleted fodlers\" section." ) ) {
      let data = {
        deletedDate: moment().unix(),
      };
      CompanyCollection.update( companyID, {
        $set: {
          ...data
        }
      } );
      props.history.push(getGoToLink());
    }
  }

  const cancel = () => {
    closeSelf();
  }

  return (
      <CompanyForm {...company} onSubmit={editCompany} onCancel={cancel} onRemove={removeCompany}/>
  );
};
