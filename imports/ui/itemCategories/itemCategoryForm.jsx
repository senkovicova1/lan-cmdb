import React, {
  useState,
  useMemo,
  useEffect,
} from 'react';

import Select from 'react-select';

import {
  selectStyle
} from '../../other/styles/selectStyles';

import { DeleteIcon } from  "/imports/other/styles/icons";
import { countries } from  "/imports/other/constants";

import {
  uint8ArrayToImg,
  isEmail
} from '../../other/helperFunctions';

import { useSelector } from 'react-redux';

import {
  Form,
  Input,
  ButtonCol,
  LinkButton,
  FullButton,
  UserEntry,
  Textarea
} from "../../other/styles/styledComponents";

export default function FolderForm( props ) {

  const {
    _id: itemCategoryId,
    name: itemCategoryName,
    descriptionNote: itemCategoryDescriptionNote,
    backupNote: itemCategoryBackupNote,
    monitoringNote: itemCategoryMonitoringNote,
    onSubmit,
    onRemove,
    onCancel,
    match,
    location,
    title
  } = props;

  const [ name, setName ] = useState( "" );
  const [ descriptionNote, setDescriptionNote ] = useState( "" );
  const [ backupNote, setBackupNote ] = useState( "" );
  const [ monitoringNote, setMonitoringNote ] = useState( "" );

  useEffect( () => {
    if ( itemCategoryName ) {
      setName( itemCategoryName );
    } else {
      setName( "" );
    }
    if ( itemCategoryDescriptionNote ) {
      setDescriptionNote( itemCategoryDescriptionNote );
    } else {
      setDescriptionNote( "" );
    }
    if ( itemCategoryBackupNote ) {
      setBackupNote( itemCategoryBackupNote );
    } else {
      setBackupNote( "" );
    }
    if ( itemCategoryMonitoringNote ) {
      setMonitoringNote( itemCategoryMonitoringNote );
    } else {
      setMonitoringNote( "" );
    }
}, [ itemCategoryName, itemCategoryDescriptionNote, itemCategoryBackupNote,itemCategoryMonitoringNote] );

  return (
    <Form>

      <h1>{title}</h1>

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

      <section>
        <label htmlFor="descriptionNote">Description note</label>
        <Textarea
          id="descriptionNote"
          name="descriptionNote"
          type="text"
          value={descriptionNote}
          onChange={(e) => setDescriptionNote(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="backupNote">Backup note</label>
        <Textarea
          id="backupNote"
          name="backupNote"
          type="text"
          value={backupNote}
          onChange={(e) => setBackupNote(e.target.value)}
          />
      </section>

      <section>
        <label htmlFor="monitoringNote">Monitoring note</label>
        <Textarea
          id="monitoringNote"
          name="monitoringNote"
          type="text"
          value={monitoringNote}
          onChange={(e) => setMonitoringNote(e.target.value)}
          />
      </section>

      <ButtonCol>
        <FullButton colour="grey" onClick={(e) => {e.preventDefault(); onCancel();}}>Cancel</FullButton>
        {onRemove &&
          <FullButton colour="red" onClick={(e) => {e.preventDefault(); onRemove(folderId);}}>Delete</FullButton>
        }
        <FullButton
          colour=""
          disabled={name.length === 0}
          onClick={(e) => {
            e.preventDefault();
            onSubmit(
               name,
               descriptionNote,
               backupNote,
               monitoringNote
            );
          }}
          >
          Save
        </FullButton>
      </ButtonCol>

    </Form>
  );
};
