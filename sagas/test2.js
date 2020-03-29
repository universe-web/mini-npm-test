const watchSaga2 = {
  type: "MY_SAGA2",
  cb: function() {
    console.log("run saga2");
  }
};

const test2Saga = [watchSaga2];

export default test2Saga;
