import React, {
  useMemo,
  useEffect
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  DescriptionsCollection
} from '/imports/api/descriptionsCollection';

import Form from './form';

import {
  getGoToLink,
} from "/imports/other/navigationLinks";

export default function EditDescriptionContainer( props ) {

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

  const currentDescription = useSelector( ( state ) => state.descriptions.value ).find(description => description.company === companyID);

  useEffect(() => {
    if (company && company._id){
      const userCannotEdit = company.users.find(user => user._id === userId).level > 0;
      if (userCannotEdit){
        history.push(getGoToLink());
      }
    }
    if (!company){
      history.push(getGoToLink());
    }
  }, [company, userId]);

  const editDescription = ( description, createdDate ) => {
    if (currentDescription){
      DescriptionsCollection.update( currentDescription._id, {
        $set: {
          description
        }
      } );
    } else {
      DescriptionsCollection.insert( {
        description,
        company: companyID,
        createdDate,
      }, (error, _id) => {
        if (error){
          console.log(console.error());
        }
      });
    }
    history.goBack();
  };

  const close = () => {
    history.goBack();
  }

  return (
    <Form {...props} title={"Edit description"} {...currentDescription} onSubmit={editDescription} onCancel={close} />
  );
};
