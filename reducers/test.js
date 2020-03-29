const testInitialState = {
  name: "test",
  acc: 0
};

const testListInitialState = {
  list: [1, 2, 3, 4],
  sum: "未计算"
};

function testReducer(action, state = testInitialState) {
  switch (action.type) {
    case "ASYNC_TEST": {
      return {
        ...state,
        ...action.input
      };
    }
    default:
      return state;
  }
}

function testListReducer(action, state = testListInitialState) {
  switch (action.type) {
    case "GET_TEST_LIST_SUM": {
      return {
        ...state,
        sum: state.list.reduce((acc, cur) => {
          acc += cur;
          return acc;
        })
      };
    }
    default:
      return state;
  }
}

export default {
  test: {
    test: testReducer,
    list: testListReducer
  }
};
