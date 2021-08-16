import {
  Mongo
} from 'meteor/mongo';

export const ItemsCollection = new Mongo.Collection( 'items' );