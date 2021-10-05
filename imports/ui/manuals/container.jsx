import React, {
  useState,
  useMemo,
  useEffect
} from 'react';
import {
  useSelector
} from 'react-redux';

import List from "./list";
import AddManual from "./addContainer";
import EditManual from "./editContainer";
import ManualDetail from "./detail";
import Loader from '/imports/ui/other/loadingScreen';

import {
  PlusIcon,
} from "/imports/other/styles/icons";
import {
  ColumnContainer,
} from "/imports/other/styles/styledComponents";

export default function ManualsContainer( props ) {

  const {
    match
  } = props;

  const userId = Meteor.userId();
  const companyID = match.params.companyID !== "undefined" ? match.params.companyID : "all-companies";
  const company = useSelector( ( state ) => state.companies.value ).find( company => company._id === companyID );

  const [ addManual, setAddManual ] = useState( false );
  const [ editedManual, setEditedManual ] = useState( null );
  const [ showDetail, setShowDetail ] = useState( true );

  if (!company){
    return <Loader />;
  }

  return (
    <ColumnContainer>
      <div className="left-section">
        <List
          {...props}
          setAddManual={setAddManual}
          editedManual={editedManual}
          setEditedManual={setEditedManual}
          setShowDetail={setShowDetail}
          />
      </div>
      <div className="right-section">
        {
          addManual &&
          <AddManual
            {...props}
            setAddManual={setAddManual}
            setEditedManual={setEditedManual}
            setShowDetail={setShowDetail}
            />
        }
        {
          editedManual &&
          !showDetail &&
          <EditManual
            {...props}
            setAddManual={setAddManual}
            editedManual={editedManual}
            setEditedManual={setEditedManual}
            setShowDetail={setShowDetail}
            />
        }
        {
          editedManual &&
          showDetail &&
          <ManualDetail
            {...props}
            editedManual={editedManual}
            setShowDetail={setShowDetail}
            />
        }
        {
          !addManual && !editedManual &&
          <p style={{padding: "15px", textAlign: "center"}}>No chosen manual</p>
        }
      </div>
    </ColumnContainer>
  );
};
