import {
  Mongo
} from 'meteor/mongo';

export const PreviousItemsCollection = new Mongo.Collection( 'itemHistory' );