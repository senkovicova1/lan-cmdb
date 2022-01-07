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
  BackIcon,
  HourglassIcon
} from "/imports/other/styles/icons";
import {
  Form,
  Card,
  LinkButton,
  BorderedLinkButton,
} from "/imports/other/styles/styledComponents";
import {
  getGoToLink
} from "/imports/other/navigationLinks";
import {
  uint8ArrayToImg,
  addImagesToText,
  handleMedia
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
            console.log(error);
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
      <h2>Scheme</h2>

        <span style={{display: "flex", padding: "0px",  marginBottom: "1em"}}>
          {
            userCanEdit &&
            <BorderedLinkButton
              fit={true}
              onClick={(e) => {e.preventDefault(); history.push(getGoToLink("schemeEdit", {companyID}));}}
              >
              <img
                src={PencilIcon}
                style={{marginRight: "0.6em"}}
                alt=""
                className="icon"
                />
              Edit
            </BorderedLinkButton>
          }
          {
            schemes.length > 0 &&
            <BorderedLinkButton
              fit={true}
              onClick={(e) => {e.preventDefault(); historyViewToggle();}}
              >
              <img
                src={HourglassIcon}
                style={{marginRight: "0.6em"}}
                alt=""
                className="icon"
                />
              History
            </BorderedLinkButton>
          }
        </span>


    <div className="scheme-content">
      <div style={historyView ? { width: "calc(100% - 300px)"} : {width: "100%"}}>
      <Card>
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

      </Card>
    </div>

  <Modal className="scheme" isOpen={enlargeScheme} toggle={enlargeSchemeToggle}>
    <ModalBody>
      <img className="enlarged-scheme" width="auto" src={diagram} alt="scheme"/>
    </ModalBody>
  </Modal>
  {
    historyView &&
    <div className="scheme-sidebar">
  <Card>
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
        </Card>
      </div>
      }

    </div>
    </Form>
  );
};
