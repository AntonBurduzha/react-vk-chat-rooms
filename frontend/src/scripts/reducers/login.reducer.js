const loginReducer = (state = {}, action) => {
  switch(action.type){
    case 'SET_VK_USER_DATA':
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};

export default loginReducer;