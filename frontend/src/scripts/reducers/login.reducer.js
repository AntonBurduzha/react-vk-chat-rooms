const loginReducer = (state = {}, action) => {
  switch(action.type){
    case 'SET_VK_USER_ID':
      return action.id;
    case 'SET_VK_USER_DATA':
      return Object.assign({}, action.data);
    default:
      return state;
  }
};

export default loginReducer;