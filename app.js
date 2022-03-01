let add = document.querySelector("form button");
let section = document.querySelector("section");
let form = document.querySelector("form");
// add event to add New Todo
let addNewButton = document.querySelector("button#addNew");
addNewButton.addEventListener("click", (e) => {
  // form.style = "transition: 0.5s ease" // cannot make it slower *needs to fixed
  form.classList.toggle("show");
});

// form listener

add.addEventListener("click", (e) => {
  e.preventDefault();

  // take out the data we input separately
  let form = e.target.parentElement;
  let title = form.children[1].value;
  let month = form.children[2].children[0].value;
  let date = form.children[2].children[1].value;
  let hour = form.children[3].children[0].value;
  let minute = form.children[3].children[1].value;
  let detail = form.children[5].value;
  console.log(title);

  // data validation in the form
  // todo detail is not mandatory in this form
  if (
    title === "" ||
    !(parseInt(month) >= 1 && parseInt(month) <= 12) ||
    !(parseInt(date) >= 1 && parseInt(date) <= 31) ||
    !(parseInt(hour) >= 0 && parseInt(hour) <= 24) ||
    !(parseInt(minute) >= 0 && parseInt(minute) <= 60)
  ) {
    alert("Please check the input");
    return;
  }
  // delete the original text in inputs
  //   form.children[1].value = "";
  //   form.children[2].children[0].value = "";
  //   form.children[2].children[1].value = "";
  //   form.children[3].children[0].value = "";
  //   form.children[3].children[1].value = "";
  //   form.children[5].value = "";

  // create a todo
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let todoTitle = document.createElement("p");
  todoTitle.classList.add("todoTitle");
  todoTitle.innerText = title;

  let todoDate = document.createElement("p");
  todoDate.classList.add("todoDate");
  todoDate.innerText = month + " / " + date;

  let todoTime = document.createElement("p");
  todoTime.classList.add("todoTime");
  todoTime.innerText = hour + ":" + minute;

  let todoDetail = document.createElement("p");
  todoDetail.classList.add("todoDetail");
  if (detail == "") {
    todoDetail.innerText = "No detail of this event.";
    todoDetail.style = "font-size: 1.25rem; color: gray;";
  } else {
    todoDetail.innerText = detail;
  }

  todo.appendChild(todoTitle);
  todo.appendChild(todoDate);
  todo.appendChild(todoTime);
  todo.appendChild(todoDetail);

  //create green check and trash can
  let completeButton = document.createElement("button");
  completeButton.classList.add("complete");
  completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

  let trashButton = document.createElement("button");
  trashButton.classList.add("trash");
  trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  // add event listerner to complete button
  completeButton.addEventListener("click", (e) => {
    console.log(e.target.parentElement);
    todo.classList.toggle("done");
    // if there is done inside, delete the 'done' class. Otherwise, add 'done' inside the classList.
  });

  // add event listener to trash button
  trashButton.addEventListener("click", (e) => {
    let todoItem = e.target.parentElement;
    todoItem.addEventListener("animationend", () => {
      todoItem.remove();
      let myList = localStorage.getItem("list");
      let myListArray = JSON.parse(myList);
      myListArray.forEach((data, index) => {
        if (data.title == todoItem.children[0].innerText) {
          myListArray.splice(data, 1);
          localStorage.setItem("list", JSON.stringify(myListArray));
        }
      });
    });
    todoItem.style.animation = "scaleDown 0.32s forwards";
  });

  // add function of show detail when click paragraph
  todo.addEventListener("click", (e) => {
    let todoDiv = e.target.parentElement;
    //   todoDiv.classList.toggle("detail");
    todo.classList.toggle("detail");
  });

  // combine button into todo div
  todo.appendChild(completeButton);
  todo.appendChild(trashButton);

  //style todo animation
  todo.style.animation = "scaleUp 0.3s forwards";

  //   todo.appendChild(todoDetail);
  section.appendChild(todo);

  // store data to local storage
  let myList = {
    title: title,
    month: month,
    date: date,
    hour: hour,
    minute: minute,
    detail: detail,
  };
  let oldList = localStorage.getItem("list");
  if (oldList == null) {
    localStorage.setItem("list", JSON.stringify([myList]));
  } else {
    let oldListParse = JSON.parse(oldList);
    oldListParse.push(myList);
    localStorage.setItem("list", JSON.stringify(oldListParse));
  }

  console.log(JSON.parse(localStorage.getItem("list")));
}); // end of add new todo list (form button)

// load localStorage

let myList = localStorage.getItem("list");
if (myList !== null) {
  myListArray = JSON.parse(myList);
  myListArray.forEach((e) => {
    let todo = document.createElement("div");
    todo.classList.add("todo");
    let todoTitle = document.createElement("p");
    todoTitle.classList.add("todoTitle");
    todoTitle.innerText = e.title;

    let todoDate = document.createElement("p");
    todoDate.classList.add("todoDate");
    todoDate.innerText = e.month + " / " + e.date;

    let todoTime = document.createElement("p");
    todoTime.classList.add("todoTime");
    todoTime.innerText = e.hour + ":" + e.minute;

    let todoDetail = document.createElement("p");
    todoDetail.classList.add("todoDetail");
    if (e.detail == "") {
      todoDetail.innerText = "No detail of this event.";
      todoDetail.style = "font-size: 1.25rem; color: gray;";
    } else {
      todoDetail.innerText = e.detail;
    }

    todo.appendChild(todoTitle);
    todo.appendChild(todoDate);
    todo.appendChild(todoTime);
    todo.appendChild(todoDetail);

    //create green check and trash can
    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    // add event listerner to complete button
    completeButton.addEventListener("click", (e) => {
      console.log(e.target.parentElement);
      todo.classList.toggle("done");
      // if there is done inside, delete the 'done' class. Otherwise, add 'done' inside the classList.
    });

    // add event listener to trash button
    trashButton.addEventListener("click", (e) => {
      let todoItem = e.target.parentElement;
      todoItem.addEventListener("animationend", () => {
        todoItem.remove();
        let myList = localStorage.getItem("list");
        let myListArray = JSON.parse(myList);
        myListArray.forEach((data, index) => {
          if (data.title == todoItem.children[0].innerText) {
            myListArray.splice(data, 1);
            localStorage.setItem("list", JSON.stringify(myListArray));
          }
        });
      });
      todoItem.style.animation = "scaleDown 0.32s forwards";
    });

    // add function of show detail when click paragraph
    todo.addEventListener("click", (e) => {
      let todoDiv = e.target.parentElement;
      //   todoDiv.classList.toggle("detail");
      todo.classList.toggle("detail");
    });

    // combine button into todo div
    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    //style todo animation
    todo.style.animation = "scaleUp 0.3s forwards";

    //   todo.appendChild(todoDetail);
    section.appendChild(todo);
  });
}

// fetch data
let exampleButton = document.querySelector("button.example");
exampleButton.addEventListener("click", (event) => {
  event.preventDefault();
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function (response) {
    if (xhr.status >= 200 && xhr.status <= 300) {
      let myList = xhr.responseText;
      console.log(myList);
      let myListArray = JSON.parse(myList);
      console.log(myListArray);
      myListArray.forEach((e) => {
        let todo = document.createElement("div");
        todo.classList.add("todo");

        let todoTitle = document.createElement("p");
        todoTitle.classList.add("todoTitle");
        todoTitle.innerText = e.title;

        let todoDate = document.createElement("p");
        todoDate.classList.add("todoDate");
        todoDate.innerText = e.month + " / " + e.date;

        let todoTime = document.createElement("p");
        todoTime.classList.add("todoTime");
        todoTime.innerText = e.hour + ":" + e.minute;

        let todoDetail = document.createElement("p");
        todoDetail.classList.add("todoDetail");
        todoDetail.innerText = e.detail;

        todo.appendChild(todoTitle);
        todo.appendChild(todoDate);
        todo.appendChild(todoTime);
        todo.appendChild(todoDetail);

        //create green check and trash can
        let completeButton = document.createElement("button");
        completeButton.classList.add("complete");
        completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';

        let trashButton = document.createElement("button");
        trashButton.classList.add("trash");
        trashButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

        // add event listerner to complete button
        completeButton.addEventListener("click", (e) => {
          console.log(e.target.parentElement);
          todo.classList.toggle("done");
          // if there is done inside, delete the 'done' class. Otherwise, add 'done' inside the classList.
        });

        // add event listener to trash button
        trashButton.addEventListener("click", (e) => {
          let todoItem = e.target.parentElement;
          todoItem.addEventListener("animationend", () => {
            todoItem.remove();
            let myList = localStorage.getItem("list");
          });
          todoItem.style.animation = "scaleDown 0.32s forwards";
        });

        // add function of show detail when click paragraph
        todo.addEventListener("click", (e) => {
          let todoDiv = e.target.parentElement;
          //   todoDiv.classList.toggle("detail");
          todo.classList.toggle("detail");
        });

        // combine button into todo div
        todo.appendChild(completeButton);
        todo.appendChild(trashButton);

        //style todo animation
        todo.style.animation = "scaleUp 0.3s forwards";

        //   todo.appendChild(todoDetail);
        section.appendChild(todo);
      });
    }
  });
  xhr.open("GET", "./data/todos.json");
  xhr.send();
});
