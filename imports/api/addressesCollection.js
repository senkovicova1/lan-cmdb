import {
  Mongo
} from 'meteor/mongo';

export const AddressesCollection = new Mongo.Collection( 'addresses' );