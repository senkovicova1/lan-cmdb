import {
  Mongo
} from 'meteor/mongo';

export const DescriptionsCollection = new Mongo.Collection( 'descriptions' );