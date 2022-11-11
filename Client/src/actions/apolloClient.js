// Declare action type variable
export const STORE_APOLLO_CLIENT = 'STORE_APOLLO_CLIENT';

/**
 * Action creator.
 * @param {object} client instance of apolloClient
 * @return {object} action with type STORE_APOLLO_CLIENT and payload (client)
 */
export const storeApolloClient = (client) => {
  return {
    type: STORE_APOLLO_CLIENT,
    client,
  };
};

