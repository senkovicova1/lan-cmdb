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
  BorderedFullButton
} from "/imports/other/styles/styledComponents";
import {
  uint8ArrayToImg,
  addImagesToText
} from '../../other/helperFunctions';

export default function SchemeForm( props ) {

  const {
    title,
    diagram: schemeDiagram,
    createdDate,
    match,
    onSubmit,
    onRemove,
    onCancel,
  } = props;

  const userId = Meteor.userId();

  const companyID = match.params.companyID;

  const [ diagram, setDiagram ] = useState(  {
    name: "",
    buffer: null,
    img: null
  } );

  useEffect( () => {
    if ( schemeDiagram ) {
      const img = uint8ArrayToImg( schemeDiagram );
      setDiagram( {
        name: "",
        buffer: schemeDiagram,
        img
      } );
    } else {
      setDiagram(  {
        name: "",
        buffer: null,
        img: null
      } );
    }
  }, [ schemeDiagram ] );

  return (
    <Form>

      <h2>Edit scheme</h2>
      <Card>
        <section>
          <div>
            {
              !diagram.img &&
              <label>No scheme</label>
            }
            {
              diagram.img &&
              <img className="scheme" src={diagram.img} alt="scheme"/>
            }
            <Input
              id="scheme"
              name="scheme"
              style={{display: "block"}}
              width="100%"
              type="file"
              value={diagram.name}
              onChange={(e) =>  {
                e.persist();
                var file = e.target.files[0];
                if (!file) return;
                var reader = new FileReader();
                reader.onload = function(event){
                  var buffer = new Uint8Array(reader.result);
                  const img = uint8ArrayToImg(buffer);
                  setDiagram({name: e.target.value, buffer, img});
                }
                reader.readAsArrayBuffer(file);
              }}
              />
          </div>
        </section>

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
                    onClick={(e) => {
                      e.preventDefault();
                      onSubmit(
                      diagram.buffer,
                      moment().unix()
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
                </CommandRow>

    </Form>
  );
};
