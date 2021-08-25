import {
  Mongo
} from 'meteor/mongo';

export const SchemesCollection = new Mongo.Collection( 'schemes' );