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
  Card,
  FullButton,
  TitleInputView,
  BorderedLinkButton
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
    <Form narrow={true}>
      <span style={{display: "flex", padding: "0px", marginTop: "1em", marginBottom: "1em"}}>
        <BorderedLinkButton
          fit={true}
          onClick={(e) => {e.preventDefault(); setShowDetail(false);}}
          >
          <img
            src={PencilIcon}
            alt=""
            className="icon"
            />
          Edit
        </BorderedLinkButton>
      </span>

      <Card>
      <section>
          <h2>
            {manual && manual.title ? manual.title : "Untitled"}
          </h2>
        </section>


      <section>
        <div
          dangerouslySetInnerHTML={{
            __html: manual && manual.body ? addImagesToText(handleMedia(manual.body)) : "No description",
          }}
          >
        </div>
      </section>
    </Card>

    </Form>
  );
};
