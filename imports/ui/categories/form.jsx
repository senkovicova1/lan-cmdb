import React, {
  useState,
  useEffect,
} from 'react';


import {
  useSelector
} from 'react-redux';

import {
  Form,
  Input,
  ButtonRow,
  LinkButton,
  FullButton,
  UserEntry,
  Textarea
} from "../../other/styles/styledComponents";

import {
  countries
} from "/imports/other/constants";
import {
  uint8ArrayToImg,
  isEmail
} from '/imports/other/helperFunctions';

export default function CategoryForm( props ) {

  const {
    _id: categoryId,
    name: categoryName,
    descriptionNote: categoryDescriptionNote,
    backupNote: categoryBackupNote,
    monitoringNote: categoryMonitoringNote,
    onSubmit,
    onRemove,
    onCancel,
    match,
    location,
  } = props;

  const [ name, setName ] = useState( "" );
  const [ descriptionNote, setDescriptionNote ] = useState( "" );
  const [ backupNote, setBackupNote ] = useState( "" );
  const [ monitoringNote, setMonitoringNote ] = useState( "" );

  useEffect( () => {
    if ( categoryName ) {
      setName( categoryName );
    } else {
      setName( "" );
    }
    if ( categoryDescriptionNote ) {
      setDescriptionNote( categoryDescriptionNote );
    } else {
      setDescriptionNote( "" );
    }
    if ( categoryBackupNote ) {
      setBackupNote( categoryBackupNote );
    } else {
      setBackupNote( "" );
    }
    if ( categoryMonitoringNote ) {
      setMonitoringNote( categoryMonitoringNote );
    } else {
      setMonitoringNote( "" );
    }
  }, [ categoryName, categoryDescriptionNote, categoryBackupNote, categoryMonitoringNote ] );

  return (
    <Form>

      <section>
        <label htmlFor="name">
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName( e.target.value )}
          />
      </section>

      <section>
        <label htmlFor="descriptionNote">
          Description note
        </label>
        <Textarea
          id="descriptionNote"
          name="descriptionNote"
          type="text"
          value={descriptionNote}
          onChange={(e) => setDescriptionNote( e.target.value )}
          />
      </section>

      <section>
        <label htmlFor="backupNote">
          Backup note
        </label>
        <Textarea
          id="backupNote"
          name="backupNote"
          type="text"
          value={backupNote}
          onChange={(e) => setBackupNote( e.target.value )}
          />
      </section>

      <section>
        <label htmlFor="monitoringNote" >
          Monitoring note
        </label>
        <Textarea
          id="monitoringNote"
          name="monitoringNote"
          type="text"
          value={monitoringNote}
          onChange={(e) => setMonitoringNote( e.target.value )}
          />
      </section>

      <ButtonRow>
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
        <FullButton
          colour="grey"
          onClick={(e) => {
            e.preventDefault();
            onCancel();
          }}
          >
          Cancel
        </FullButton>
        {
          onRemove &&
          <FullButton
            colour="red"
            onClick={(e) => {
              e.preventDefault();
              onRemove();
            }}
            >
            Delete
          </FullButton>
        }
      </ButtonRow>

    </Form>
);
};
