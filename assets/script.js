$.when($.ready).then(() => {
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
  // let plannerObj = new Object;
  const container = $(".container");
  const currentDay = $("#currentDay");
  const alertArea = $(".alert-area");
  let timeNow = moment().unix();
  let hourNow = moment.unix(timeNow).format("HH");
  let dateNow = moment.unix(timeNow).format("YYYYMMDD");
  currentDay.text(`${moment.unix(timeNow).format("dddd, MMMM Do")}`);

  let colorRender = (hour) => {
    if (hour > hourNow) {
      return "future";
    } else if (hour < hourNow) {
      return "past";
    } else {
      return "present";
    }
  };

  let renderTimeBlock = () => {
    container.html("");
    let storedTodos = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < timeArr.length; i++) {
      let dataId = `${dateNow}${timeArr[i].hNum}`;
      // console.log(dataId)
      let textAreaContent = "";
      if (storedTodos !== null) {
        let todoObjText = storedTodos.find(element => element.dataId === dataId);
        // console.log(todoObjText)
        textAreaContent = todoObjText && todoObjText.todo ? todoObjText.todo : "";
      }
      container.append($(`<div></div>`).addClass("time-block").attr("data-id", `${dateNow}${timeArr[i].hNum}`).append($(`<div></div>`).addClass("row").append($(`<div></div>`).addClass("hour").text(`${timeArr[i].hour}`)).append($(`<div></div>`).addClass(`description ${colorRender(timeArr[i].hNum)}`).append($(`<textarea name="" id="planner_${dateNow}${timeArr[i].hNum}" cols="115" rows="3"></textarea>`).val(textAreaContent))).append($(`<button></button>`).addClass("saveBtn").attr("data-id", `${dateNow}${timeArr[i].hNum}`).append($(`<i></i>`).addClass("fas fa-save saveIcon").attr("data-id", `${dateNow}${timeArr[i].hNum}`)))))
    }
  };

  let storeTodo = (todo, dataId) => {
    let storedTodos = JSON.parse(localStorage.getItem("todos"));
    const todoObjInit = {
      dataId: dataId,
      todo: todo,
    };
    if (todo) {
      if (storedTodos === null) {
        //Init the scores as array then push
        storedTodos = [];
        storedTodos.push(todoObjInit);
        stateAlert("Success your plan was stored!", "success");
      } else {
        let todoObj = storedTodos.find(element => element.dataId === dataId);
        if (todoObj) {
          todoObj.todo = todo;
          stateAlert("Success your plan was edited!", "success");
        } else {
          storedTodos.push(todoObjInit);
          stateAlert("Success your plan was stored!", "success");
        }
      }
      localStorage.setItem("todos", JSON.stringify(storedTodos));
      renderTimeBlock();
    } else {
      stateAlert("Please provide your plan", "danger");
    }
  };

  //Show Alert
  let stateAlert = (content, type) => {
    alertArea.html(`<div class="alert alert-${type}" id="alert-clip" role="alert">${content}</div>`)
    setTimeout(() => { $("#alert-clip").hide(); }, 800);
  };
  //Show Alert

  container.on("click", (event) => {
    let target = $(event.target);
    // console.log(target.hasClass("saveBtn"));
    if (target.hasClass("saveBtn") || target.hasClass("saveIcon")) {
      let dataId = target.attr("data-id");
      let textTodo = container.find(`#planner_${dataId}`).val();
      storeTodo(textTodo, dataId);
    }
  });

  renderTimeBlock();
});