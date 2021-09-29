import React from 'react';
import {
  ImagesCollection
} from '/imports/api/imagesCollection';

export const isEmail = ( email ) =>
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );

export const uint8ArrayToImg = ( arr ) => {
  const blob = new Blob( [ arr ], {
    type: "image/jpeg"
  } );
  const img = URL.createObjectURL( blob );
  return img;
};

export const addImagesToText = (text) => {
  let newText = text;
  const substring = 'alt="loaded-picture-';
  const occurences = [];
  let fromIndex = 0;
  let portion = "";
  while (fromIndex <= text.length - substring.length){
    fromIndex = text.indexOf(substring, fromIndex);
    if (fromIndex === -1){
      break;
    }
    portion = text.substring(0, fromIndex);
    occurences.push({
      index: fromIndex,
      imageId: text.substring(fromIndex + substring.length, text.indexOf('"', fromIndex + substring.length)),
      src: portion.substring(portion.lastIndexOf('src="') + 5,  portion.lastIndexOf('"')),
    }) ;
    fromIndex += 1;
  }
  occurences.forEach((item, i) => {
    const imgBuffer = ImagesCollection.findOne({_id: item.imageId});
    const img = uint8ArrayToImg(imgBuffer.buffer);
    newText = newText.replace(item.src, img);
  });

  return newText;
}

export const handleMedia = (text) => {
    let newText = text;
    const media = `<figure class="media">`;
    const occurences = [];
    let fromIndex = 0;
    let endIndex = text.length;
    let portion = "";
    while ( fromIndex <= text.length - media.length ) {
      fromIndex = text.indexOf( media, fromIndex );
      if ( fromIndex === -1 ) {
        break;
      }
      endIndex = text.indexOf( "</figure>", fromIndex );
      portion = text.substring( fromIndex, endIndex + 9 );
      occurences.push( {
        start: fromIndex,
        end: endIndex,
        link: text.substring( fromIndex + media.length + 13, endIndex - 11 ),
        portion,
      } );
      fromIndex += 1;
    }
    occurences.forEach( ( item, i ) => {
      let newLink = item.link.replace("watch?v=", "embed/");
      newLink = newLink.substring(0, newLink.indexOf("&"));
      const newItem = `<iframe
                width="560"
                height="315"
                src="${newLink}"
                frameborder="0"
                allowfullscreen
                >
              </iframe>`
      newText = newText.replace( item.portion, newItem );
    } );

    return newText;
}
