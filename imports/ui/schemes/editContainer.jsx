import React, {
  useMemo,
  useEffect
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  SchemesCollection
} from '/imports/api/schemesCollection';

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

  const schemes = useSelector( ( state ) => state.schemes.value ).filter(scheme => scheme.company === companyID);
  const currentScheme = useMemo( () => {
    if ( schemes.length > 0 ) {
      return schemes.find(scheme => scheme.version === 0 );
    }
    return null;
  }, [ schemes ] );

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

  const editScheme = ( diagram, createdDate ) => {

    SchemesCollection.insert( {
      diagram,
      version: 0,
      company: companyID,
      createdDate,
    }, (error, _id) => {
      if (error){
        console.log(console.error());
      }
    });

    const schemesToUpdate = schemes;

    schemesToUpdate.forEach((scheme, index) => {
      if (scheme.version >= 20){
        SchemesCollection.remove( {
       _id: scheme._id
       } );
      } else {
          SchemesCollection.update( scheme._id, { $inc: { version: 1 } } );
        }
    });

      history.goBack();
  };

  const close = () => {
    history.goBack();
  }

  return (
    <SchemeForm {...props} {...currentScheme} onSubmit={editScheme} onCancel={close} />
  );
};
