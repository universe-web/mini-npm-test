export function aysncTest(input) {
  return {
    type: "ASYNC_TEST",
    input
  };
}

export function getTestListSum() {
  return {
    type: "GET_TEST_LIST_SUM"
  };
}
