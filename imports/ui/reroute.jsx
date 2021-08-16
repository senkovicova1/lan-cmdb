import React, {
  useEffect
} from 'react';
import {
getGoToLink
} from "/imports/other/navigationLinks";

export default function Reroute( props ) {


  useEffect(() => {
    if (props.match.path === "/" ){
      props.history.push(getGoToLink());
    }
  }, [props.match.path]);

  return (<div style={{display: "none"}}></div>);
};
