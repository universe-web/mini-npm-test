const accountInitialState = {
  saveStatus: 0,
  isLogin: false
};

function accountReducer(action, state = accountInitialState) {
  switch (action.type) {
    case "LOGIN": {
      return {
        ...state,
        saveStatus: 1
      };
    }

    case "LOGIN_COMPLETION": {
      const { error } = action;

      if (error) {
        return {
          ...state,
          saveStatus: 0,
          isLogin: false
        };
      }

      return {
        ...state,
        saveStatus: 2,
        isLogin: true
      };
    }

    default:
      return state;
  }
}

export default {
  account: accountReducer
};
