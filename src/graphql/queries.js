/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPluginStation = /* GraphQL */ `
  query GetPluginStation($id: ID!) {
    getPluginStation(id: $id) {
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
export const listPluginStations = /* GraphQL */ `
  query ListPluginStations(
    $filter: ModelPluginStationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPluginStations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        eletrostationID
        plugintypeID
        name
        operation
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
      nextToken
      startedAt
    }
  }
`;
export const syncPluginStations = /* GraphQL */ `
  query SyncPluginStations(
    $filter: ModelPluginStationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPluginStations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        eletrostationID
        plugintypeID
        name
        operation
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
      nextToken
      startedAt
    }
  }
`;
export const getPluginType = /* GraphQL */ `
  query GetPluginType($id: ID!) {
    getPluginType(id: $id) {
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
export const listPluginTypes = /* GraphQL */ `
  query ListPluginTypes(
    $filter: ModelPluginTypeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPluginTypes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        voltage
        current
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncPluginTypes = /* GraphQL */ `
  query SyncPluginTypes(
    $filter: ModelPluginTypeFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncPluginTypes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        voltage
        current
        image
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getSchedule = /* GraphQL */ `
  query GetSchedule($id: ID!) {
    getSchedule(id: $id) {
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
export const listSchedules = /* GraphQL */ `
  query ListSchedules(
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSchedules(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncSchedules = /* GraphQL */ `
  query SyncSchedules(
    $filter: ModelScheduleFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSchedules(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getEletrostation = /* GraphQL */ `
  query GetEletrostation($id: ID!) {
    getEletrostation(id: $id) {
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
export const listEletrostations = /* GraphQL */ `
  query ListEletrostations(
    $filter: ModelEletrostationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEletrostations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        type
        brand
        year
        data
        latitude
        longitude
        adress
        verified
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncEletrostations = /* GraphQL */ `
  query SyncEletrostations(
    $filter: ModelEletrostationFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEletrostations(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        type
        brand
        year
        data
        latitude
        longitude
        adress
        verified
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const getRoute = /* GraphQL */ `
  query GetRoute($id: ID!) {
    getRoute(id: $id) {
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
export const listRoutes = /* GraphQL */ `
  query ListRoutes(
    $filter: ModelRouteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoutes(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncRoutes = /* GraphQL */ `
  query SyncRoutes(
    $filter: ModelRouteFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncRoutes(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncUsers = /* GraphQL */ `
  query SyncUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUsers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getTrip = /* GraphQL */ `
  query GetTrip($id: ID!) {
    getTrip(id: $id) {
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
export const listTrips = /* GraphQL */ `
  query ListTrips(
    $filter: ModelTripFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrips(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        date
        hour_out
        hour_arrive
        destination
        origin
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
      nextToken
      startedAt
    }
  }
`;
export const syncTrips = /* GraphQL */ `
  query SyncTrips(
    $filter: ModelTripFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTrips(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        date
        hour_out
        hour_arrive
        destination
        origin
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
      nextToken
      startedAt
    }
  }
`;
export const getVehicle = /* GraphQL */ `
  query GetVehicle($id: ID!) {
    getVehicle(id: $id) {
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
export const listVehicles = /* GraphQL */ `
  query ListVehicles(
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVehicles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        brand
        model
        year
        license
        type
        plugintypeID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncVehicles = /* GraphQL */ `
  query SyncVehicles(
    $filter: ModelVehicleFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncVehicles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        brand
        model
        year
        license
        type
        plugintypeID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
