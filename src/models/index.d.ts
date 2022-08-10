import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type PluginStationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ScheduleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type RouteMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PluginTypeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type VehicleMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TripMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EletrostationMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class PluginStation {
  readonly id: string;
  readonly eletrostationID: string;
  readonly plugintypeID: string;
  readonly name?: string | null;
  readonly operation?: boolean | null;
  readonly Schedules?: (Schedule | null)[] | null;
  readonly Routes?: (Route | null)[] | null;
  readonly year_instalation?: number | null;
  readonly brand?: string | null;
  readonly model?: string | null;
  readonly num_chargers?: number | null;
  readonly max_power?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PluginStation, PluginStationMetaData>);
  static copyOf(source: PluginStation, mutator: (draft: MutableModel<PluginStation, PluginStationMetaData>) => MutableModel<PluginStation, PluginStationMetaData> | void): PluginStation;
}

export declare class Schedule {
  readonly id: string;
  readonly day?: string | null;
  readonly month?: string | null;
  readonly year?: string | null;
  readonly interval?: string | null;
  readonly period?: string | null;
  readonly pluginstationID: string;
  readonly date?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Schedule, ScheduleMetaData>);
  static copyOf(source: Schedule, mutator: (draft: MutableModel<Schedule, ScheduleMetaData>) => MutableModel<Schedule, ScheduleMetaData> | void): Schedule;
}

export declare class Route {
  readonly id: string;
  readonly origin?: string | null;
  readonly destination?: string | null;
  readonly tripID?: string | null;
  readonly distance?: string | null;
  readonly date_out?: string | null;
  readonly date_arrive?: string | null;
  readonly time?: number | null;
  readonly pluginstationID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Route, RouteMetaData>);
  static copyOf(source: Route, mutator: (draft: MutableModel<Route, RouteMetaData>) => MutableModel<Route, RouteMetaData> | void): Route;
}

export declare class PluginType {
  readonly id: string;
  readonly name: string;
  readonly voltage?: number | null;
  readonly PluginStation?: (Vehicle | null)[] | null;
  readonly current?: number | null;
  readonly Vehicles?: (Vehicle | null)[] | null;
  readonly image?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<PluginType, PluginTypeMetaData>);
  static copyOf(source: PluginType, mutator: (draft: MutableModel<PluginType, PluginTypeMetaData>) => MutableModel<PluginType, PluginTypeMetaData> | void): PluginType;
}

export declare class Vehicle {
  readonly id: string;
  readonly brand?: string | null;
  readonly model?: string | null;
  readonly year?: string | null;
  readonly license?: string | null;
  readonly Trip?: (Trip | null)[] | null;
  readonly type?: string | null;
  readonly plugintypeID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Vehicle, VehicleMetaData>);
  static copyOf(source: Vehicle, mutator: (draft: MutableModel<Vehicle, VehicleMetaData>) => MutableModel<Vehicle, VehicleMetaData> | void): Vehicle;
}

export declare class Trip {
  readonly id: string;
  readonly date?: string | null;
  readonly hour_out?: string | null;
  readonly hour_arrive?: string | null;
  readonly destination?: string | null;
  readonly origin?: string | null;
  readonly Routes?: (Route | null)[] | null;
  readonly distance?: string | null;
  readonly vehicleID?: string | null;
  readonly status?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Trip, TripMetaData>);
  static copyOf(source: Trip, mutator: (draft: MutableModel<Trip, TripMetaData>) => MutableModel<Trip, TripMetaData> | void): Trip;
}

export declare class Eletrostation {
  readonly id: string;
  readonly name?: string | null;
  readonly type?: string | null;
  readonly brand?: string | null;
  readonly year?: string | null;
  readonly data?: string | null;
  readonly latitude?: string | null;
  readonly longitude?: string | null;
  readonly PluginStations?: (PluginStation | null)[] | null;
  readonly adress?: string | null;
  readonly verified?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Eletrostation, EletrostationMetaData>);
  static copyOf(source: Eletrostation, mutator: (draft: MutableModel<Eletrostation, EletrostationMetaData>) => MutableModel<Eletrostation, EletrostationMetaData> | void): Eletrostation;
}

export declare class User {
  readonly id: string;
  readonly adress?: string | null;
  readonly number?: number | null;
  readonly cep?: number | null;
  readonly full_name?: string | null;
  readonly phone_number?: number | null;
  readonly document?: string | null;
  readonly drivers_license?: string | null;
  readonly email?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}