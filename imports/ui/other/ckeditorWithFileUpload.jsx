import React, {
  useState,
  useRef
} from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  ImagesCollection
} from '/imports/api/imagesCollection';

import Loader from '/imports/ui/other/loadingScreen';
import {
  uint8ArrayToImg
} from '../../other/helperFunctions';

export default function CKEditorWithFileUpload( props ) {

  const {
    title,
    text,
    setText,
    note,
    buttonId,
    editorIndex
  } = props;

  console.log("CKEDIT");

    const editors = document.getElementsByClassName("ck-file-dialog-button");
    if (editors.length > 0){
      console.log(editors);
      editors[editorIndex].id = `ckeditor-file-upload-button-${editorIndex}`;
    }

    const inputFile = useRef(null);
    const input = document.querySelectorAll(`span#ckeditor-file-upload-button-${editorIndex}>input`)[0];
    if (input){
      input.click = function(){
        inputFile.current.click();
      };
    }

  return (
    <section  className="row-notes">
      <label>{title}</label>
      <div className="text">
        <div className="main" style={note ? {} : {width: "100%", padding: "0px"}}>
          <input
            type='file'
            id={`file-input-for-${editorIndex}`}
            ref={inputFile}
            style={{display: 'none'}}
            onChange={(e) =>  {
              e.persist();
              var file = e.target.files[0];
              if (!file) return;
              var reader = new FileReader();
              reader.onload = function(event){
                const buffer = new Uint8Array(reader.result);
                const img = uint8ArrayToImg(buffer);

                ImagesCollection.insert( {
                  buffer
                }, ( error, imgId ) => {
                  if ( error ) {
                    console.log( error );
                  } else {
                    const imgToInsert = `<p><span class="image-inline ck-widget ck-widget_selected" contentEditable="false"><img alt="loaded-picture-${imgId}" src="${img}"></span></p>`
                    let newText = imgToInsert + text;
                    setText(newText);
                  }
                } );
              }
              reader.readAsArrayBuffer(file);
            }}
            />
          <CKEditor
            editor={ClassicEditor}
            data={text}
            onChange={(event, editor) => {
              setText(editor.getData());
            }}
            />
        </div>
        {
          note &&
        <div className="note">
          {note}
        </div>
      }
      </div>
    </section>
  );
};
