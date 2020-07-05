//Declare Variables
let timeArr = [
  {
    hour: "9:00 AM",
    hNum: 9
  },
  {
    hour: "10:00 AM",
    hNum: 10
  },
  {
    hour: "11:00 AM",
    hNum: 11
  },
  {
    hour: "12:00 PM",
    hNum: 12
  },
  {
    hour: "1:00 PM",
    hNum: 13
  },
  {
    hour: "2:00 PM",
    hNum: 14
  },
  {
    hour: "3:00 PM",
    hNum: 15
  },
  {
    hour: "4:00 PM",
    hNum: 16
  },
  {
    hour: "5:00 PM",
    hNum: 17
  },
];



//Declare a global object variable for planner
let plannerObj = new Object;
const container = document.querySelector(".container");
const currentDay = document.querySelector("#currentDay");
let timeNow = moment().unix();
let hourNow = moment.unix(timeNow).format("HH");
console.log(hourNow)
// console.log(moment.unix(timeNow).format("MM/DD/YYYY"));
currentDay.textContent = `${moment.unix(timeNow).format("dddd, MMMM Do")}`;

let colorRender = (hour) => {
  if (hour > hourNow) {
    return "future";
  } else if (hour < hourNow) {
    return "past";
  } else {
    return "present";
  }
};

let renderTime = () => {
  for (let i = 0; i < timeArr.length; i++) {
    const timeBlock = document.createElement("div");
    timeBlock.setAttribute("class", "time-block");
    container.appendChild(timeBlock);
    const row = document.createElement("div");
    row.setAttribute("class", "row");
    timeBlock.appendChild(row);
    const hour = document.createElement("div");
    hour.setAttribute("class", "hour");
    hour.textContent = `${timeArr[i].hour}`;
    row.appendChild(hour);
    const description = document.createElement("div");
    description.setAttribute("class", `description ${colorRender(timeArr[i].hNum)}`);
    description.innerHTML = `<textarea name="" id="" cols="115" rows="3">`;
    row.appendChild(description);
    const saveBtn = document.createElement("button");
    saveBtn.setAttribute("class", "saveBtn");
    saveBtn.textContent = "Save";
    // saveBtn.textContent = `${timeArr[i]}`;
    row.appendChild(saveBtn);
  }
};

renderTime();