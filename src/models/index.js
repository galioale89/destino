// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { PluginStation, Schedule, Route, PluginType, Vehicle, Trip, Eletrostation, User } = initSchema(schema);

export {
  PluginStation,
  Schedule,
  Route,
  PluginType,
  Vehicle,
  Trip,
  Eletrostation,
  User
};