import React, {
  useMemo
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  CompaniesCollection
} from '/imports/api/companiesCollection';
import {
  ItemsCollection
} from '/imports/api/itemsCollection';

import CompanyForm from './form';

import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function EditCompanyContainer( props ) {

  const {
    match,
    history,
    closeSelf
  } = props;

  const userId = Meteor.userId();

  const items = useSelector( ( state ) => state.items.value );

  const companyID = match.params.companyID;
  const companies = useSelector( ( state ) => state.companies.value );
  const company = useMemo( () => {
    return companies.find( company => company._id === companyID );
  }, [ companies, companyID ] );

  const editCompany = ( name, DPH, ICO, DIC, IC_DPH, country, city, street, ZIP, email, phone, description, users ) => {
    let data = {
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
    };
    CompaniesCollection.update( companyID, {
      $set: {
        ...data
      }
    } );
    cancel();
  };

  const removeCompany = () => {
    if ( window.confirm( "Are you sure you want to remove this company?" ) ) {
      CompaniesCollection.remove( {
        _id: companyID
      } );

      const itemToRemove = items.filter( item => item.company === companyID );
      itemToRemove.forEach( ( item, i ) => {
        ItemsCollection.remove( {
          _id: item._id
        } );
      } );
      closeSelf();
      props.history.push( getGoToLink() );
    }
  }

  const cancel = () => {
    closeSelf();
  }

  return (
    <CompanyForm {...company} onSubmit={editCompany} onCancel={cancel} onRemove={removeCompany}/>
  );
};
