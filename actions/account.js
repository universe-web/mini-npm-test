export function login() {
  return {
    type: "LOGIN"
  };
}

export function loginCompletion(error) {
  return {
    type: "LOGIN_COMPLETION",
    error
  };
}
