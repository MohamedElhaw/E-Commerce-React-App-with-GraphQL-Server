// Declare action type variables
export const RESET_ERROR='RESET_ERROR';
export const SET_ERROR='SET_ERROR';

/**
 * Action creator.
 * @return {object} action with type RESET_ERROR
 */
export const resetError=()=>{
  return {
    type: RESET_ERROR,
  };
};
/**
 * Action creator.
 * @return {object} action with type SET_ERROR
 */
export const setError=()=>{
  return {
    type: SET_ERROR,
  };
};
