import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import moment from 'moment';
import {
  useSelector
} from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import CKEditorWithFileUpload from '/imports/ui/other/ckeditorWithFileUpload';

import {
  Form,
  TitleInput,
  Textarea,
  ButtonCol,
  FullButton,
} from "/imports/other/styles/styledComponents";
import {
  addImagesToText
} from '/imports/other/helperFunctions';

export default function ItemForm( props ) {

  const {
    title,
    _id: itemId,
    name: itemName,
    description: itemDescription,
    backupDescription: itemBackupDescription,
    monitoringDescription: itemMonitoringDescription,
    match,
    onSubmit,
    onRemove,
    onCancel,
  } = props;

  const userId = Meteor.userId();

  const companyID = match.params.companyID;
  const categoryID = match.params.categoryID;

  const categories = useSelector( ( state ) => state.categories.value );
  const category = useMemo( () => {
    if ( categories.length > 0 ) {
      return categories.find( category => category._id === categoryID );
    }
    return {};
  }, [ categories, categoryID ] );

  const [ name, setName ] = useState( "" );
  const [ description, setDescription ] = useState( "" );
  const [ backupDescription, setBackupDescription ] = useState( "" );
  const [ monitoringDescription, setMonitoringDescription ] = useState( "" );

  useEffect( () => {
    if ( itemName ) {
      setName( itemName );
    } else {
      setName( "" );
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
  }, [ itemName, itemDescription, itemBackupDescription, itemMonitoringDescription ] );


  const editors = document.getElementsByClassName("ck-file-dialog-button");
  Array.from(editors).forEach((item, i) => {
    item.id = `ckeditor-file-upload-button-${i}`;
  });

  return (
    <Form>

      <h1>{title}</h1>

      <section>
        <label htmlFor="name">Name</label>
        <TitleInput
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
      </section>

      <CKEditorWithFileUpload
        title={"Description"}
          text={description}
          setText={setDescription}
          note={category.descriptionNote ? category.descriptionNote : "No description note"}
          buttonId={"ckeditor-file-upload-button-0"}
          />

          <CKEditorWithFileUpload
            title={"Backup tasks description"}
              text={backupDescription}
              setText={setBackupDescription}
              note={category.backupNote ? category.backupNote : "No backup note"}
              buttonId={"ckeditor-file-upload-button-1"}
              />

              <CKEditorWithFileUpload
                title={"Monitoring  description"}
                  text={monitoringDescription}
                  setText={setMonitoringDescription}
                  note={category.monitoringNote ? category.monitoringNote : "No monitoring note"}
                  buttonId={"ckeditor-file-upload-button-2"}
                  />

      <ButtonCol>
        <FullButton colour="grey" onClick={(e) => {e.preventDefault(); onCancel()}}>Cancel</FullButton>
        {onRemove && <FullButton colour="red" onClick={(e) => {e.preventDefault(); onRemove()}}>Delete</FullButton>}
        <FullButton
          colour=""
          disabled={name.length === 0}
          onClick={(e) => {e.preventDefault(); onSubmit(
            name,
            description,
            backupDescription,
            monitoringDescription,
            moment().unix(),
            userId,
            categoryID,
            companyID,
            moment().unix(),
            userId,
          );}}
          >
          Save
        </FullButton>
      </ButtonCol>

    </Form>
  );
};
