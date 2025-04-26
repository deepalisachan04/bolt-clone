// convex/server.js

// Import necessary functions from the Convex package (adjust this path based on your project setup)
import {
  mutationGeneric,
  queryGeneric,
  actionGeneric,
  internalMutationGeneric,
  internalQueryGeneric,
  internalActionGeneric,
  httpActionGeneric
} from "convex/server"; // Make sure the path is correct

// Now export them for use in other parts of your application
export const mutation = mutationGeneric;
export const query = queryGeneric;
export const action = actionGeneric;
export const internalMutation = internalMutationGeneric;
export const internalQuery = internalQueryGeneric;
export const internalAction = internalActionGeneric;
export const httpAction = httpActionGeneric;

export const anyApi = {
  mutation,
  query,
  action,
  internalMutation,
  internalQuery,
  internalAction,
  httpAction
};