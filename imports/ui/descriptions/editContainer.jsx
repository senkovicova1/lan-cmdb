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

  const descriptions = useSelector( ( state ) => state.descriptions.value ).filter(description => description.company === companyID);
  const currentDescription = useMemo( () => {
    if ( descriptions.length > 0 ) {
      return descriptions.find(description => description.version === 0 );
    }
    return null;
  }, [ descriptions ] );

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

    DescriptionsCollection.insert( {
      description,
      version: 0,
      company: companyID,
      createdDate,
    }, (error, _id) => {
      if (error){
        console.log(console.error());
      }
    });

    const descriptionsToUpdate = descriptions;

    descriptionsToUpdate.forEach((description, index) => {
      if (description.version >= 20){
        DescriptionsCollection.remove( {
       _id: description._id
       } );
      } else {
          DescriptionsCollection.update( description._id, { $inc: { version: 1 } } );
        }
    });

      history.goBack();
  };

  const close = () => {
    history.goBack();
  }

  return (
    <Form {...props} title={"Edit description"} {...currentDescription} onSubmit={editDescription} onCancel={close} />
  );
};
