import React, {
  useState,
  useMemo,
  useEffect
} from 'react';
import moment from 'moment';
import {
  useSelector
} from 'react-redux';
import {
  Modal,
  ModalBody
} from 'reactstrap';

import {
  PencilIcon,
  BackIcon
} from "/imports/other/styles/icons";
import {
  Form,
  LinkButton,
  FloatingButton,
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";
import {
  uint8ArrayToImg,
  addImagesToText
} from '/imports/other/helperFunctions';

export default function schemeView( props ) {

  const {
    match,
    history
  } = props;

  const userId = Meteor.userId();

  const [ enlargeScheme, setEnlargeScheme ] = useState( false );
  const enlargeSchemeToggle = () => {
    setEnlargeScheme(!enlargeScheme);
  }

  const [ historyView, setHistoryView ] = useState( false );
  const historyViewToggle = () => {
    setHistoryView(!historyView);
  }

  const companyID = match.params.companyID;
  const companies = useSelector( ( state ) => state.companies.value );
  const company = useMemo( () => {
    if ( companies.length > 0 && companyID ) {
      return companies.find( company => company._id === companyID );
    }
    return null;
  }, [ companies, companyID ] );

  useEffect(() => {
    if (companyID !== "all-companies" && company){
      const userCannotView = !company.users.find(user => user._id === userId);
      if (userCannotView){
        history.push(getGoToLink());
      }
    } else {
      history.push(getGoToLink());
    }
  }, [company, companyID, userId]);


  if (!company){
    return (<div></div>)
  }

  const scheme = company.scheme ? uint8ArrayToImg(company.scheme.picture) : null;
  const userCanEdit = company.users.find(user => user._id === userId).level === 0;

  return (
    <Form>

      <div style={{display: "flex", justifyContent: "space-between"}}>
      <h1>
        Scheme
      </h1>
      <LinkButton
        style={{alignSelf: "flex-end"}}
        onClick={(e) => {e.preventDefault(); historyViewToggle();}}
        >
        History
      </LinkButton>
    </div>

        {
          scheme &&
          <section>
            <img className="scheme" src={scheme} alt="scheme" onClick={() => enlargeSchemeToggle()}/>
          </section>
        }
        {
          !scheme &&
          <section>
            <div>
              No scheme
          </div>
        </section>
        }


        <LinkButton
          onClick={(e) => {e.preventDefault(); history.push(getGoToLink("schemeDraw", {companyID}));}}
          >
          <span>
            Create scheme
          </span>
        </LinkButton>

        <Modal className="scheme" isOpen={enlargeScheme} toggle={enlargeSchemeToggle}>
          <ModalBody>
            <img className="enlarged-scheme" width="100%" src={scheme} alt="scheme"/>
          </ModalBody>
        </Modal>

        {
          historyView &&
          <div
            style={{
              position: "absolute",
              right: "0px",
              top: 0,
              height: "-webkit-fill-available",
              width: "250px",
              minHeight: "100px",
              backgroundColor: "red",
            }}
            >

          </div>
        }

      <section>
        <label htmlFor="description">Description</label>
          <div
            dangerouslySetInnerHTML={{
              __html: company.scheme?.description ? addImagesToText(company.scheme.description) : "No description",
          }}
          >
        </div>
      </section>


      <FloatingButton
        left
        onClick={(e) => {e.preventDefault(); history.push(getGoToLink("listItemsInCategory", {companyID, categoryID: "all-categories"}));}}
        >
        <img
          style={{marginRight: "2px"}}
          src={BackIcon}
          alt=""
          className="icon"
          />
      </FloatingButton>

      {
        userCanEdit &&
      <FloatingButton
        onClick={(e) => {e.preventDefault(); history.push(getGoToLink("schemeEdit", {companyID}));}}
        >
        <img
          src={PencilIcon}
          alt=""
          className="icon"
          />
      </FloatingButton>
    }

    </Form>
  );
};
