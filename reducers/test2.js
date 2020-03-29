const test2InitialState = {
  name: "test2",
  acc: 10
};

function test2Reducer(action, state = test2InitialState) {
  switch (action.type) {
    case "ASYNC_TEST_2": {
      return {
        ...state,
        ...action.input
      };
    }
    default:
      return state;
  }
}

export default {
  test2: test2Reducer
};
