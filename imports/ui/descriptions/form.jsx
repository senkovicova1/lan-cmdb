import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import {
  useSelector
} from 'react-redux';
import moment from 'moment';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import CKEditorWithFileUpload from '/imports/ui/other/ckeditorWithFileUpload';

import {
  PencilIcon,
  BackIcon,
} from "/imports/other/styles/icons";

import {
  Form,
  Card,
  Input,
  CommandRow,
  BorderedLinkButton,
  BorderedFullButton,
} from "/imports/other/styles/styledComponents";
import {
  uint8ArrayToImg,
  addImagesToText
} from '../../other/helperFunctions';

export default function DescriptionForm( props ) {

  const {
    title,
    description: descriptionDescription,
    createdDate,
    match,
    onSubmit,
    onRemove,
    onCancel,
  } = props;

  const userId = Meteor.userId();

  const companyID = match.params.companyID;

  const [ description, setDescription ] = useState( "" );

  useEffect( () => {
    if ( descriptionDescription ) {
      setDescription( addImagesToText(descriptionDescription) );
    } else {
      setDescription( "" );
    }
  }, [ descriptionDescription ] );

  return (
    <Form>

      <h2>Edit description</h2>

        <Card>

        <CKEditorWithFileUpload
            text={description}
            setText={setDescription}
            note={false}
            buttonId={"ckeditor-file-upload-button-description"}
            editorIndex={0}
            />

        </Card>

        <CommandRow>

          <BorderedLinkButton
            fit={true}
            onClick={(e) => {
              e.preventDefault();
              onCancel()
            }}
            >
            <img
              src={BackIcon}
              alt=""
              className="icon"
              />
            Cancel
          </BorderedLinkButton>

          <BorderedFullButton
            fit={true}
            onClick={(e) => {e.preventDefault(); onSubmit(
              description,
              moment().unix()
            );}}
            >
            <img
              src={PencilIcon}
              alt=""
              className="icon"
              />
            Save
          </BorderedFullButton>

        </CommandRow>

    </Form>
  );
};
