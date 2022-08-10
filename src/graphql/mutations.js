/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPluginStation = /* GraphQL */ `
  mutation CreatePluginStation(
    $input: CreatePluginStationInput!
    $condition: ModelPluginStationConditionInput
  ) {
    createPluginStation(input: $input, condition: $condition) {
      id
      eletrostationID
      plugintypeID
      name
      operation
      Schedules {
        nextToken
        startedAt
      }
      Routes {
        nextToken
        startedAt
      }
      year_instalation
      brand
      model
      num_chargers
      max_power
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updatePluginStation = /* GraphQL */ `
  mutation UpdatePluginStation(
    $input: UpdatePluginStationInput!
    $condition: ModelPluginStationConditionInput
  ) {
    updatePluginStation(input: $input, condition: $condition) {
      id
      eletrostationID
      plugintypeID
      name
      operation
      Schedules {
        nextToken
        startedAt
      }
      Routes {
        nextToken
        startedAt
      }
      year_instalation
      brand
      model
      num_chargers
      max_power
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deletePluginStation = /* GraphQL */ `
  mutation DeletePluginStation(
    $input: DeletePluginStationInput!
    $condition: ModelPluginStationConditionInput
  ) {
    deletePluginStation(input: $input, condition: $condition) {
      id
      eletrostationID
      plugintypeID
      name
      operation
      Schedules {
        nextToken
        startedAt
      }
      Routes {
        nextToken
        startedAt
      }
      year_instalation
      brand
      model
      num_chargers
      max_power
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createPluginType = /* GraphQL */ `
  mutation CreatePluginType(
    $input: CreatePluginTypeInput!
    $condition: ModelPluginTypeConditionInput
  ) {
    createPluginType(input: $input, condition: $condition) {
      id
      name
      voltage
      PluginStation {
        nextToken
        startedAt
      }
      current
      Vehicles {
        nextToken
        startedAt
      }
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updatePluginType = /* GraphQL */ `
  mutation UpdatePluginType(
    $input: UpdatePluginTypeInput!
    $condition: ModelPluginTypeConditionInput
  ) {
    updatePluginType(input: $input, condition: $condition) {
      id
      name
      voltage
      PluginStation {
        nextToken
        startedAt
      }
      current
      Vehicles {
        nextToken
        startedAt
      }
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deletePluginType = /* GraphQL */ `
  mutation DeletePluginType(
    $input: DeletePluginTypeInput!
    $condition: ModelPluginTypeConditionInput
  ) {
    deletePluginType(input: $input, condition: $condition) {
      id
      name
      voltage
      PluginStation {
        nextToken
        startedAt
      }
      current
      Vehicles {
        nextToken
        startedAt
      }
      image
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createSchedule = /* GraphQL */ `
  mutation CreateSchedule(
    $input: CreateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    createSchedule(input: $input, condition: $condition) {
      id
      day
      month
      year
      interval
      period
      pluginstationID
      date
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateSchedule = /* GraphQL */ `
  mutation UpdateSchedule(
    $input: UpdateScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    updateSchedule(input: $input, condition: $condition) {
      id
      day
      month
      year
      interval
      period
      pluginstationID
      date
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteSchedule = /* GraphQL */ `
  mutation DeleteSchedule(
    $input: DeleteScheduleInput!
    $condition: ModelScheduleConditionInput
  ) {
    deleteSchedule(input: $input, condition: $condition) {
      id
      day
      month
      year
      interval
      period
      pluginstationID
      date
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createEletrostation = /* GraphQL */ `
  mutation CreateEletrostation(
    $input: CreateEletrostationInput!
    $condition: ModelEletrostationConditionInput
  ) {
    createEletrostation(input: $input, condition: $condition) {
      id
      name
      type
      brand
      year
      data
      latitude
      longitude
      PluginStations {
        nextToken
        startedAt
      }
      adress
      verified
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateEletrostation = /* GraphQL */ `
  mutation UpdateEletrostation(
    $input: UpdateEletrostationInput!
    $condition: ModelEletrostationConditionInput
  ) {
    updateEletrostation(input: $input, condition: $condition) {
      id
      name
      type
      brand
      year
      data
      latitude
      longitude
      PluginStations {
        nextToken
        startedAt
      }
      adress
      verified
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteEletrostation = /* GraphQL */ `
  mutation DeleteEletrostation(
    $input: DeleteEletrostationInput!
    $condition: ModelEletrostationConditionInput
  ) {
    deleteEletrostation(input: $input, condition: $condition) {
      id
      name
      type
      brand
      year
      data
      latitude
      longitude
      PluginStations {
        nextToken
        startedAt
      }
      adress
      verified
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createRoute = /* GraphQL */ `
  mutation CreateRoute(
    $input: CreateRouteInput!
    $condition: ModelRouteConditionInput
  ) {
    createRoute(input: $input, condition: $condition) {
      id
      origin
      destination
      tripID
      distance
      date_out
      date_arrive
      time
      pluginstationID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateRoute = /* GraphQL */ `
  mutation UpdateRoute(
    $input: UpdateRouteInput!
    $condition: ModelRouteConditionInput
  ) {
    updateRoute(input: $input, condition: $condition) {
      id
      origin
      destination
      tripID
      distance
      date_out
      date_arrive
      time
      pluginstationID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteRoute = /* GraphQL */ `
  mutation DeleteRoute(
    $input: DeleteRouteInput!
    $condition: ModelRouteConditionInput
  ) {
    deleteRoute(input: $input, condition: $condition) {
      id
      origin
      destination
      tripID
      distance
      date_out
      date_arrive
      time
      pluginstationID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      adress
      number
      cep
      full_name
      phone_number
      document
      drivers_license
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      adress
      number
      cep
      full_name
      phone_number
      document
      drivers_license
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      adress
      number
      cep
      full_name
      phone_number
      document
      drivers_license
      email
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const createTrip = /* GraphQL */ `
  mutation CreateTrip(
    $input: CreateTripInput!
    $condition: ModelTripConditionInput
  ) {
    createTrip(input: $input, condition: $condition) {
      id
      date
      hour_out
      hour_arrive
      destination
      origin
      Routes {
        nextToken
        startedAt
      }
      distance
      vehicleID
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateTrip = /* GraphQL */ `
  mutation UpdateTrip(
    $input: UpdateTripInput!
    $condition: ModelTripConditionInput
  ) {
    updateTrip(input: $input, condition: $condition) {
      id
      date
      hour_out
      hour_arrive
      destination
      origin
      Routes {
        nextToken
        startedAt
      }
      distance
      vehicleID
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteTrip = /* GraphQL */ `
  mutation DeleteTrip(
    $input: DeleteTripInput!
    $condition: ModelTripConditionInput
  ) {
    deleteTrip(input: $input, condition: $condition) {
      id
      date
      hour_out
      hour_arrive
      destination
      origin
      Routes {
        nextToken
        startedAt
      }
      distance
      vehicleID
      status
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const createVehicle = /* GraphQL */ `
  mutation CreateVehicle(
    $input: CreateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    createVehicle(input: $input, condition: $condition) {
      id
      brand
      model
      year
      license
      Trip {
        nextToken
        startedAt
      }
      type
      plugintypeID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const updateVehicle = /* GraphQL */ `
  mutation UpdateVehicle(
    $input: UpdateVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    updateVehicle(input: $input, condition: $condition) {
      id
      brand
      model
      year
      license
      Trip {
        nextToken
        startedAt
      }
      type
      plugintypeID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const deleteVehicle = /* GraphQL */ `
  mutation DeleteVehicle(
    $input: DeleteVehicleInput!
    $condition: ModelVehicleConditionInput
  ) {
    deleteVehicle(input: $input, condition: $condition) {
      id
      brand
      model
      year
      license
      Trip {
        nextToken
        startedAt
      }
      type
      plugintypeID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
