import React from 'react';

import {
  CompaniesCollection
} from '/imports/api/companiesCollection';

import CompanyForm from './companyForm';

import {
  getGoToLink
} from "/imports/other/navigationLinks";

export default function AddCompanyContainer( props ) {

  const { closeSelf } = props;

  const addNew = ( name,  DPH,  ICO,  DIC,  IC_DPH,  country,  city,  street,  ZIP,  email,  phone,  description,  users) => {
    CompaniesCollection.insert( {
      name,
      DPH,
      ICO,
      DIC,
      IC_DPH,
      country,
      city,
      street,
      ZIP,
      email,
      phone,
      description,
      users
    }, (error, _id) => {
      if (error){
        console.log(console.error());
      } else {
        props.history.push(getGoToLink("listItemsInCategory", {companyID: _id, categoryID: "all-categories"}));
      }
    } );
    closeSelf();
  }

  const cancel = () => {
    closeSelf();
  }

  return (
        <CompanyForm title={"Add company"} onSubmit={addNew} onCancel={cancel}/>
  );
};
