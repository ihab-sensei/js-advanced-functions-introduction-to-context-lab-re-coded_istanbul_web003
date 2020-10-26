// Your code here

const createEmployeeRecord = (arr) => {
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
};

const createEmployeeRecords = (arr) => {
  return arr.map((subArr) => createEmployeeRecord(subArr));
};

const createTimeInEvent = (obj, timeStamp) => {
  const date = timeStamp.split(" ");
  const timeIn = {
    type: "TimeIn",
    date: date[0],
    hour: parseInt(date[1]),
  };
  obj.timeInEvents.push(timeIn);
  return obj;
};

const createTimeOutEvent = (obj, timeStamp) => {
  const date = timeStamp.split(" ");
  const timeOut = {
    type: "TimeOut",
    date: date[0],
    hour: parseInt(date[1]),
  };
  obj.timeOutEvents.push(timeOut);
  return obj;
};

const hoursWorkedOnDate = (obj, timeStamp) => {
  const timeIn = obj.timeInEvents.find((ele) => ele.date === timeStamp);
  const timeOut = obj.timeOutEvents.find((ele) => ele.date === timeStamp);
  return (timeOut.hour - timeIn.hour) / 100;
};

const wagesEarnedOnDate = (obj, timeStamp) => {
  return hoursWorkedOnDate(obj, timeStamp) * obj.payPerHour;
};

const allWagesFor = (obj) => {
  const dates = obj.timeInEvents.map((ele) => ele.date);
  return dates.reduce(function (acc, curr) {
    return acc + wagesEarnedOnDate(obj, curr);
  }, 0);
};

const findEmployeeByFirstName = (srcArray, firstName) => {
  return srcArray.find((ele) => ele.firstName === firstName);
};

const calculatePayroll = (arr) => {
  const total = arr.map((ele) => allWagesFor(ele));
  return total.reduce((num, total) => num + total);
};
