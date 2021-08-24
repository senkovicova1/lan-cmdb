import {
  Mongo
} from 'meteor/mongo';

export const ImagesCollection = new Mongo.Collection( 'images' );