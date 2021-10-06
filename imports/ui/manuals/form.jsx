import React, {
  useState,
  useEffect,
  useRef
} from 'react';
import {
  useSelector
} from 'react-redux';
import moment from 'moment';
import {
  CKEditor
} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import CKEditorWithFileUpload from '/imports/ui/other/ckeditorWithFileUpload';

import Loader from '/imports/ui/other/loadingScreen';
import {
  Form,
  Input,
  ButtonRow,
  FullButton,
} from "/imports/other/styles/styledComponents";
import {
  addImagesToText
} from '/imports/other/helperFunctions';

export default function ManualForm( props ) {

  const {
    companyID,
    match,
    title: manualTitle,
    body: manualBody,
    onSubmit,
    onRemove,
    onCancel,
  } = props;

  const userId = Meteor.userId();

  const [ title, setTitle ] = useState( "" );
  const [ body, setBody ] = useState( "" );

  useEffect( () => {

    if ( manualTitle ) {
      setTitle( manualTitle );
    } else {
      setTitle( "" );
    }

    if ( manualBody ) {
      setBody( addImagesToText(manualBody) );
    } else {
      setBody( "" );
    }

  }, [ manualTitle, manualBody ] );

  return (
    <Form fullPadding={true}>

      <section>
        <label htmlFor="title">Title</label>
        <Input
          id="title"
          name="title"
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
      </section>

      <CKEditorWithFileUpload
        title={"Body"}
        text={body}
        setText={setBody}
        buttonId={"ckeditor-file-upload-button-0"}
        editorIndex={0}
        />

      <ButtonRow>
        <FullButton
          colour=""
          onClick={(e) => {e.preventDefault(); onSubmit(
            title,
            body,
            userId,
            moment().unix(),
            userId,
            moment().unix(),
          );}}
          >
          Save
        </FullButton>
        <FullButton colour="grey" onClick={(e) => {e.preventDefault(); onCancel()}}>Back</FullButton>
        {onRemove && <FullButton colour="red" onClick={(e) => {e.preventDefault(); onRemove()}}>Delete</FullButton>}
      </ButtonRow>

    </Form>
  );
};
