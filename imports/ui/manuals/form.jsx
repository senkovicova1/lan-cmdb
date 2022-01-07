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

import {
  PencilIcon,
  BackIcon,
  DeleteIcon
} from "/imports/other/styles/icons";

import Loader from '/imports/ui/other/loadingScreen';
import {
  Form,
  Card,
  Input,
  BorderedLinkButton,
  BorderedFullButton,
  CommandRow
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
    <Form narrow={true} style={{paddingTop: "1em"}}>

      <Card>
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
    </Card>

    <CommandRow>
                {
                  onCancel &&
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
                  Back
                </BorderedLinkButton>
              }
                {
                  onRemove &&
                  <BorderedLinkButton
                    fit={true}
                    onClick={(e) => {
                      e.preventDefault();
                      onRemove()
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
                  onClick={(e) => {e.preventDefault(); onSubmit(
                    title,
                    body,
                    userId,
                    moment().unix(),
                    userId,
                    moment().unix(),
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
