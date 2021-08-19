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

import {
  Form,
  TitleInput,
  Textarea,
  ButtonCol,
  FullButton,
} from "/imports/other/styles/styledComponents";

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
      setDescription( itemDescription );
    } else {
      setDescription( "" );
    }
    if ( itemBackupDescription ) {
      setBackupDescription( itemBackupDescription );
    } else {
      setBackupDescription( "" );
    }
    if ( itemMonitoringDescription ) {
      setMonitoringDescription( itemMonitoringDescription );
    } else {
      setMonitoringDescription( "" );
    }
  }, [ itemName, itemDescription, itemBackupDescription, itemMonitoringDescription ] );

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

      <section  className="row-notes">
        <label htmlFor="description">Description</label>
        <div className="text">
          <div className="main">
                <CKEditor
                    editor={ClassicEditor}
                    data={description}
                    onChange={(event, editor) => {
                        setDescription(editor.getData());
                    }}
                />
              </div>
              <div className="note">
            {category.descriptionNote ? category.descriptionNote : "No description noe"}
          </div>
        </div>
      </section>

      <section  className="row-notes">
        <label >Backup tasks description</label>
        <div className="text">
          <div className="main">
              <Textarea
                id="backupDescription"
                name="backupDescription"
                type="text"
                value={backupDescription}
                onChange={(e) => setBackupDescription(e.target.value)}
                />
            </div>
          <div className="note" >
            {category.backupNote ? category.backupNote : "No backup note"}
          </div>
        </div>
      </section>

      <section  className="row-notes">
        <label htmlFor="description">Monitoring  description</label>
        <div className="text">
          <div className="main">
              <Textarea
                id="monitoringDescription"
                name="monitoringDescription"
                type="text"
                value={monitoringDescription}
                onChange={(e) => setMonitoringDescription(e.target.value)}
                />
            </div>
          <div className="note">
            {category.monitoringNote ? category.monitoringNote : "No monitoring note"}
          </div>
        </div>
      </section>

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
