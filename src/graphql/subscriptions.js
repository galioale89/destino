/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePluginStation = /* GraphQL */ `
  subscription OnCreatePluginStation {
    onCreatePluginStation {
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
export const onUpdatePluginStation = /* GraphQL */ `
  subscription OnUpdatePluginStation {
    onUpdatePluginStation {
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
export const onDeletePluginStation = /* GraphQL */ `
  subscription OnDeletePluginStation {
    onDeletePluginStation {
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
export const onCreatePluginType = /* GraphQL */ `
  subscription OnCreatePluginType {
    onCreatePluginType {
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
export const onUpdatePluginType = /* GraphQL */ `
  subscription OnUpdatePluginType {
    onUpdatePluginType {
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
export const onDeletePluginType = /* GraphQL */ `
  subscription OnDeletePluginType {
    onDeletePluginType {
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
export const onCreateSchedule = /* GraphQL */ `
  subscription OnCreateSchedule($owner: String) {
    onCreateSchedule(owner: $owner) {
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
export const onUpdateSchedule = /* GraphQL */ `
  subscription OnUpdateSchedule($owner: String) {
    onUpdateSchedule(owner: $owner) {
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
export const onDeleteSchedule = /* GraphQL */ `
  subscription OnDeleteSchedule($owner: String) {
    onDeleteSchedule(owner: $owner) {
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
export const onCreateEletrostation = /* GraphQL */ `
  subscription OnCreateEletrostation($owner: String) {
    onCreateEletrostation(owner: $owner) {
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
export const onUpdateEletrostation = /* GraphQL */ `
  subscription OnUpdateEletrostation($owner: String) {
    onUpdateEletrostation(owner: $owner) {
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
export const onDeleteEletrostation = /* GraphQL */ `
  subscription OnDeleteEletrostation($owner: String) {
    onDeleteEletrostation(owner: $owner) {
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
export const onCreateRoute = /* GraphQL */ `
  subscription OnCreateRoute {
    onCreateRoute {
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
export const onUpdateRoute = /* GraphQL */ `
  subscription OnUpdateRoute {
    onUpdateRoute {
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
export const onDeleteRoute = /* GraphQL */ `
  subscription OnDeleteRoute {
    onDeleteRoute {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($owner: String) {
    onCreateUser(owner: $owner) {
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
      owner
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($owner: String) {
    onUpdateUser(owner: $owner) {
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
      owner
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($owner: String) {
    onDeleteUser(owner: $owner) {
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
      owner
    }
  }
`;
export const onCreateTrip = /* GraphQL */ `
  subscription OnCreateTrip($owner: String) {
    onCreateTrip(owner: $owner) {
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
export const onUpdateTrip = /* GraphQL */ `
  subscription OnUpdateTrip($owner: String) {
    onUpdateTrip(owner: $owner) {
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
export const onDeleteTrip = /* GraphQL */ `
  subscription OnDeleteTrip($owner: String) {
    onDeleteTrip(owner: $owner) {
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
export const onCreateVehicle = /* GraphQL */ `
  subscription OnCreateVehicle($owner: String) {
    onCreateVehicle(owner: $owner) {
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
export const onUpdateVehicle = /* GraphQL */ `
  subscription OnUpdateVehicle($owner: String) {
    onUpdateVehicle(owner: $owner) {
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
export const onDeleteVehicle = /* GraphQL */ `
  subscription OnDeleteVehicle($owner: String) {
    onDeleteVehicle(owner: $owner) {
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
