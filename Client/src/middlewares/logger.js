/**
 * logger middleware to check every action and its affect on update the store.
 * @param {object} store store object
 * @param {function} next to execute async functions
 * @param {object} action contains action to execute (none async)
 * @return {object} the new state value
 */
const logger =(store)=>(next)=>(action)=>{
  console.group(action.type);
  console.log('The action: ', action);
  const newStateValue=next(action);
  console.log('The new state: ', store.getState());
  console.groupEnd();
  return newStateValue;
};

export default logger;
