import React, {
  useState,
  useEffect,
  useMemo,
  useRef
} from 'react';
import moment from 'moment';
import {
  useSelector
} from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Select from 'react-select';

import CKEditorWithFileUpload from '/imports/ui/other/ckeditorWithFileUpload';

import AddressesList from '/imports/ui/addresses/list';
import PasswordsList from '/imports/ui/passwords/list';
import Loader from '/imports/ui/other/loadingScreen';
import {
  Form,
  Input,
  Textarea,
  ButtonRow,
  FullButton,
} from "/imports/other/styles/styledComponents";
import {
  selectStyle
} from '/imports/other/styles/selectStyles';
import {
  addImagesToText
} from '/imports/other/helperFunctions';

export default function ItemForm( props ) {

  const {
    companyID,
    categoryID,
    _id: itemId,
    originalItem: itemOriginalItemId,
    name: itemName,
    status: itemStatus,
    company: itemCompany,
    placement: itemPlacement,
    installationDate: itemInstallationDate,
    expirationDate: itemExpirationDate,
    description: itemDescription,
    backupDescription: itemBackupDescription,
    monitoringDescription: itemMonitoringDescription,
    addresses: itemAddresses,
    passwords: itemPasswords,
    match,
    onSubmit,
    onRemove,
    onCancel,
  } = props;

  const userId = Meteor.userId();

  const companies = useSelector( ( state ) => state.companies.value );
  const categories = useSelector( ( state ) => state.categories.value );
  const category = useMemo( () => {
    if ( categories.length > 0 ) {
      return categories.find( category => category._id === categoryID );
    }
    return {};
  }, [ categories, categoryID ] );

  const [ name, setName ] = useState( "" );
  const [ status, setStatus ] = useState( null );
  const [ company, setCompany ] = useState( null );
  const [ placement, setPlacement ] = useState( "" );
  const [ installationDate, setInstallationDate ] = useState( "" );
  const [ expirationDate, setExpirationDate ] = useState( "" );
  const [ description, setDescription ] = useState( "" );
  const [ backupDescription, setBackupDescription ] = useState( "" );
  const [ monitoringDescription, setMonitoringDescription ] = useState( "" );

  const [ addresses, setAddresses ] = useState([]);
  const [ passwords, setPasswords ] = useState([]);

  const statuses = [{label: "Active", value: 0}, {label: "Inactive", value: 1}];

  useEffect( () => {
    if ( itemName ) {
      setName( itemName );
    } else {
      setName( "" );
    }
      if ( itemCompany && companies.length > 1 ) {
        setCompany( companies.find(company => company._id === itemCompany) );
      } else if ( companies.length > 1 ) {
        setCompany( companies.find(company => company._id === companyID) );
      } else {
        setCompany( null );
      }
    if ( itemStatus ) {
      setStatus( statuses.find(st => st.value === itemStatus) );
    } else {
      setStatus( {label: "Active", value: 0} );
    }
    if ( itemPlacement ) {
      setPlacement( itemPlacement );
    } else {
      setPlacement( "" );
    }
    if ( itemInstallationDate ) {
      setInstallationDate( itemInstallationDate );
    } else {
      setInstallationDate( "" );
    }
    if ( itemExpirationDate ) {
      setExpirationDate( itemExpirationDate );
    } else {
      setExpirationDate( "" );
    }
    if ( itemDescription ) {
      setDescription( addImagesToText(itemDescription) );
    } else {
      setDescription( "" );
    }
    if ( itemBackupDescription ) {
      setBackupDescription( addImagesToText(itemBackupDescription) );
    } else {
      setBackupDescription( "" );
    }
    if ( itemMonitoringDescription ) {
      setMonitoringDescription( addImagesToText(itemMonitoringDescription) );
    } else {
      setMonitoringDescription( "" );
    }
    if ( itemAddresses ) {
      setAddresses( itemAddresses );
    } else {
      setAddresses( [] );
    }
    if ( itemPasswords ) {
      setPasswords( itemPasswords );
    } else {
      setPasswords( [] );
    }
  }, [ itemName, itemId, itemOriginalItemId, itemName, itemStatus, itemCompany, itemPlacement, itemInstallationDate, itemExpirationDate, itemDescription, itemBackupDescription, itemMonitoringDescription, itemAddresses, itemPasswords, companies, companyID ] );

if (itemId &&
  ((itemDescription.length > 0 && description.length === 0) ||
  !company ||
  (itemMonitoringDescription.length > 0 && monitoringDescription.length === 0) || (itemBackupDescription.length > 0 && backupDescription.length === 0))){
  return <Loader />
}

  return (
    <Form scrollable={true}>

      <section>
        <label htmlFor="name">Name</label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
      </section>

      <section className="input-row-triple">
        <div>
          <label htmlFor="status">Status</label>
            <Select
              id="status"
              styles={selectStyle}
              value={status}
              onChange={(e) => {
                setStatus(e);
              }}
              options={statuses}
              />
        </div>
        <div>
          <label htmlFor="placement">Placement</label>
          <Input
            id="placement"
            name="placement"
            type="text"
            placeholder="Enter placement"
            value={placement}
            onChange={(e) => setPlacement(e.target.value)}
            />
        </div>
        <div>
          <label htmlFor="company">Company</label>
            <Select
              id="company"
              styles={selectStyle}
              value={company}
              onChange={(e) => {
                setCompany(e);
              }}
              options={companies}
              />
        </div>
      </section>

      <section className="input-row">
        <div>
          <label htmlFor="installation-date">Installation date</label>
            <Input
              type="datetime-local"
              id="installation-date"
              name="installation-date"
              value={installationDate ? moment.unix(installationDate).add((new Date).getTimezoneOffset(), 'minutes').format("yyyy-MM-DD hh:mm").replace(" ", "T") : ""}
              onChange={(e) => setInstallationDate(e.target.valueAsNumber/1000)}
              />
        </div>
        <div>
          <label htmlFor="expiration-date">Expiration date</label>
            <Input
              type="datetime-local"
              id="expiration-date"
              name="expiration-date"
              value={expirationDate ? moment.unix(expirationDate).add((new Date).getTimezoneOffset(), 'minutes').format("yyyy-MM-DD hh:mm").replace(" ", "T") : ""}
              onChange={(e) => setExpirationDate(e.target.valueAsNumber/1000)}
              />
        </div>
      </section>

      <section>
        <AddressesList
          {...props}
          itemID={itemId}
          edit={true}
          addresses={addresses}
          setAddresses={setAddresses}
          />
      </section>

        <section>
          <PasswordsList
            {...props}
            itemID={itemId}
            edit={true}
            passwords={passwords}
            setPasswords={setPasswords}
            />
        </section>

      <CKEditorWithFileUpload
        title={"Description"}
        text={description}
        setText={setDescription}
        note={category.descriptionNote ? category.descriptionNote : "No description note"}
        buttonId={"ckeditor-file-upload-button-0"}
        editorIndex={0}
        />

      <CKEditorWithFileUpload
        title={"Backup tasks description"}
        text={backupDescription}
        setText={setBackupDescription}
        note={category.backupNote ? category.backupNote : "No backup note"}
        buttonId={"ckeditor-file-upload-button-1"}
        editorIndex={1}
        />

      <CKEditorWithFileUpload
        title={"Monitoring  description"}
        text={monitoringDescription}
        setText={setMonitoringDescription}
        note={category.monitoringNote ? category.monitoringNote : "No monitoring note"}
        buttonId={"ckeditor-file-upload-button-2"}
        editorIndex={2}
        />

      <ButtonRow>
        <FullButton
          colour=""
          disabled={name.length === 0}
          onClick={(e) => {e.preventDefault(); onSubmit(
            name,
            status.value,
            company._id,
            placement,
            installationDate,
            expirationDate,
            description,
            backupDescription,
            monitoringDescription,
            moment().unix(),
            userId,
            itemOriginalItemId ? itemOriginalItemId : itemId,
            addresses,
            passwords,
            categoryID,
            moment().unix(),
            userId,
          );}}
          >
          Save
        </FullButton>
        <FullButton colour="grey" onClick={(e) => {e.preventDefault(); onCancel()}}>Cancel</FullButton>
        {onRemove && <FullButton colour="red" onClick={(e) => {e.preventDefault(); onRemove()}}>Delete</FullButton>}
      </ButtonRow>

    </Form>
  );
};
