import React, {
  useMemo
} from 'react';
import {
  useSelector
} from 'react-redux';

import {
  PencilIcon,
} from "/imports/other/styles/icons";
import {
  Form,
  FullButton,
  TitleInputView,
  LinkButton
} from "/imports/other/styles/styledComponents";
import {
  addImagesToText,
  handleMedia
} from '/imports/other/helperFunctions';

export default function ManualDetail( props ) {

  const {
    editedManual,
    setShowDetail
  } = props;

  const manuals = useSelector( ( state ) => state.manuals.value );
  const manual = useMemo( () => {
    if ( manuals.length > 0 ) {
      return manuals.find( manual => manual._id === editedManual );
    }
    return null;
  }, [ editedManual, manuals ] );

  return (
    <Form>

      <section className="row">
        <div style={{width: "80%"}}>
          <h2>
            {manual && manual.title ? manual.title : "Untitled"}
          </h2>
        </div>
        <div style={{width: "20%"}}>
          <LinkButton
            style={{marginLeft: "auto"}}
            onClick={(e) => {e.preventDefault(); setShowDetail(false);}}
            >
            <img
              src={PencilIcon}
              alt=""
              className="icon"
              style={{marginRight: "0.6em", width: "20px"}}
              />
            Edit
          </LinkButton>
        </div>
      </section>

      <section>
        <div
          dangerouslySetInnerHTML={{
            __html: manual && manual.body ? addImagesToText(handleMedia(manual.body)) : "No description",
          }}
          >
        </div>
      </section>

    </Form>
  );
};
