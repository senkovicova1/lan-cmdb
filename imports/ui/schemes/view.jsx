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
  SchemesCollection
} from '/imports/api/schemesCollection';

import {
  PencilIcon,
  RestoreIcon,
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

  const [version, setVersion] = useState(0);

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

  const schemes = useSelector( ( state ) => state.schemes.value ).filter(scheme => scheme.company === companyID).sort((s1, s2) => s1.version > s2.version ? 1 : -1);

  const currentScheme = useMemo( () => {
    if ( schemes.length > 0 ) {
      return schemes.find(scheme => scheme.version === version);
    }
    return null;
  }, [ schemes, version ] );

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


  const restorePreviousVersion = (scheme) => {
    if ( window.confirm( "Are you sure you want to restore this version?" ) ) {

        SchemesCollection.insert( {
          diagram: scheme.diagram,
          description: scheme.description,
          version: 0,
          company: scheme.company,
          createdDate: moment().unix(),
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

        setVersion(0);
      }
  }

  if (!company){
    return (<div></div>)
  }

  const diagram = currentScheme ? uint8ArrayToImg(currentScheme.diagram) : null;
  const userCanEdit = company.users.find(user => user._id === userId).level === 0;

  return (
    <Form>

      <div className="heading">
      <h1>
        Scheme
      </h1>
      {
        schemes.length > 0 &&
      <LinkButton
        style={{alignSelf: "flex-end"}}
        onClick={(e) => {e.preventDefault(); historyViewToggle();}}
        >
        History
      </LinkButton>
    }
    </div>

    <div className="scheme-content">
      <div style={historyView ? { width: "calc(100% - 300px)"} : {}}>
        {
          diagram &&
          <section>
            <img className="scheme" src={diagram} alt="scheme" onClick={() => enlargeSchemeToggle()}/>
          </section>
        }
        {
          !diagram &&
          <section>
            <div>
              No scheme
          </div>
        </section>
        }

        <Modal className="scheme" isOpen={enlargeScheme} toggle={enlargeSchemeToggle}>
          <ModalBody>
            <img className="enlarged-scheme" width="100%" src={diagram} alt="scheme"/>
          </ModalBody>
        </Modal>

      <section>
        <label htmlFor="description">Description</label>
          <div
            dangerouslySetInnerHTML={{
              __html: currentScheme?.description ? addImagesToText(currentScheme.description) : "No description",
          }}
          >
        </div>
      </section>

    </div>

        {
          historyView &&
          <div className="scheme-sidebar">
            <h2>Previous versions</h2>
            {
              schemes.map(scheme => (
                <div>
                    {
                      scheme.version > 0 &&
                      <span
                        style={version === scheme.version ? {color: "#0078d4"} : {}}
                        onClick={(e) => {e.preventDefault(); setVersion(scheme.version);}}
                        >
                      {`Version ${moment.unix(scheme.createdDate).format("D.M.YYYY HH:mm:ss")}`}
                    </span>
                    }
                    {
                      scheme.version === 0 &&
                      <span
                        style={version === scheme.version ? {color: "#0078d4"} : {}}
                        onClick={(e) => {e.preventDefault(); setVersion(scheme.version);}}
                        >
                      {`Current version made ${moment.unix(scheme.createdDate).format("D.M.YYYY HH:mm:ss")}`}
                    </span>
                    }
                  {
                    scheme.version > 0 &&
                    <LinkButton
                      onClick={(e) => {e.preventDefault(); restorePreviousVersion(scheme)}}
                      >
                      <img
                        src={RestoreIcon}
                        alt=""
                        className="icon"
                        />
                    </LinkButton>
                  }
                </div>
              ))
            }
          </div>
      }

    </div>

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
        version === 0 &&
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
