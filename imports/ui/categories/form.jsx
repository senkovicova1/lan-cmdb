import React, {
  useState,
  useEffect,
} from 'react';


import {
  useSelector
} from 'react-redux';

import {
  PencilIcon,
  BackIcon,
  DeleteIcon
} from "/imports/other/styles/icons";

import {
  Form,
  Card,
  Input,
  ButtonRow,
  LinkButton,
  BorderedLinkButton,
  BorderedFullButton,
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
    title,
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

      <h2>{title}</h2>

            <span className="command-bar">
              <BorderedLinkButton
                fit={true}
                onClick={(e) => {
                  e.preventDefault();
                  onCancel();
                }}
                >
                <img
                  src={BackIcon}
                  alt=""
                  className="icon"
                  />
                Cancel
              </BorderedLinkButton>
              {
                onRemove &&
                <BorderedLinkButton
                  fit={true}
                  onClick={(e) => {
                    e.preventDefault();
                    onRemove();
                  }}
                  >
                  <img
                    src={DeleteIcon}
                    alt=""
                    className="icon"
                    />
                  Delete
                </BorderedLinkButton>
              }
              <BorderedFullButton
                fit={true}
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
                <img
                  src={PencilIcon}
                  alt=""
                  className="icon"
                  />
                Save
              </BorderedFullButton>
            </span>

      <Card>
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

    </Card>

    </Form>
);
};
