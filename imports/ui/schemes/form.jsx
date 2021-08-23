import React, {
  useState,
  useEffect,
  useMemo
} from 'react';
import {
  useSelector
} from 'react-redux';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  Form,
  Input,
  ButtonCol,
  FullButton,
} from "/imports/other/styles/styledComponents";
import {
  uint8ArrayToImg
} from '../../other/helperFunctions.js';

export default function SchemeForm( props ) {

  const {
    title,
    picture: schemePicture,
    description: schemeDescription,
    match,
    onSubmit,
    onRemove,
    onCancel,
  } = props;

  const userId = Meteor.userId();

  const companyID = match.params.companyID;

  const [ picture, setPicture ] = useState(  {
    name: "",
    buffer: null,
    img: null
  } );
  const [ description, setDescription ] = useState( "" );

  useEffect( () => {
    if ( schemePicture ) {
      const img = uint8ArrayToImg( schemePicture );
      setPicture( {
        name: "",
        buffer: schemePicture,
        img
      } );
    } else {
      setPicture(  {
        name: "",
        buffer: null,
        img: null
      } );
    }
    if ( schemeDescription ) {
      setDescription( schemeDescription );
    } else {
      setDescription( "" );
    }
  }, [ schemePicture, schemeDescription ] );

  return (
    <Form>

      <h1>{title}</h1>

        <section>
          <label htmlFor="scheme">Scheme</label>
          <div>
            {
              picture.img &&
              <img className="scheme" src={picture.img} alt="scheme"/>
            }
            <Input
              id="scheme"
              name="scheme"
              style={{display: "block"}}
              type="file"
              value={picture.name}
              onChange={(e) =>  {
                e.persist();
                var file = e.target.files[0];
                if (!file) return;
                var reader = new FileReader();
                reader.onload = function(event){
                  var buffer = new Uint8Array(reader.result);
                  const img = uint8ArrayToImg(buffer);
                  setPicture({name: e.target.value, buffer, img});
                }
                reader.readAsArrayBuffer(file);
              }}
              />
          </div>
        </section>

      <section  className="row-notes">
        <label htmlFor="description">Description</label>
          <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => {
                  setDescription(editor.getData());
              }}
          />
      </section>

      <ButtonCol>
        <FullButton colour="grey" onClick={(e) => {e.preventDefault(); onCancel()}}>Cancel</FullButton>
        <FullButton
          colour=""
          onClick={(e) => {e.preventDefault(); onSubmit(
            picture.buffer,
            description,
          );}}
          >
          Save
        </FullButton>
      </ButtonCol>

    </Form>
  );
};
