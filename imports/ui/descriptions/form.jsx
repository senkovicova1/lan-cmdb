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
  Form,
  Input,
  ButtonRow,
  FullButton,
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

        <CKEditorWithFileUpload
            text={description}
            setText={setDescription}
            note={false}
            buttonId={"ckeditor-file-upload-button-description"}
            editorIndex={0}
            />

      <ButtonRow>
        <FullButton
          colour=""
          onClick={(e) => {e.preventDefault(); onSubmit(
            description,
            moment().unix()
          );}}
          >
          Save
        </FullButton>
        <FullButton colour="grey" onClick={(e) => {e.preventDefault(); onCancel()}}>Cancel</FullButton>
      </ButtonRow>

    </Form>
  );
};
