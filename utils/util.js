const formatTime = date => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};

function request() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ code: 1 });
    }, 0);
  });
}

function requestLogin() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({ code: 0 });
    }, 0);
  });
}

// 二分查找法
function binarySearch(arr, target) {
  if (arr.length === 0) {
    return -1;
  }

  let i = -1;

  function find(startIdx, endIdx) {
    if (endIdx === startIdx) {
      if (arr[startIdx] !== target) {
        return;
      }
    }

    const n = Math.floor((startIdx + endIdx) / 2);
    if (arr[n] === target) {
      i = n;
    } else if (target > arr[n]) {
      return find(n + 1, endIdx);
    } else {
      return find(startIdx, n - 1);
    }
  }

  find(0, arr.length - 1);
  return i === -1 ? `数组不存在${target}` : `${target}在第${i}位（0起算）`;
}

module.exports = {
  formatTime,
  request,
  requestLogin,
  binarySearch
};