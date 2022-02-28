let add = document.querySelector("form button");
let section = document.querySelector("section");
add.addEventListener("click", (e) => {
  e.preventDefault();

  // take out the data we input separately
  console.log(e.target.parentElement.children[1]);
  let form = e.target.parentElement;
  let title = form.children[1].value;
  let month = form.children[2].children[0].value;
  let date = form.children[2].children[1].value;
  let detail = form.children[4].value;
  console.log(title);

  // data validation in the form
  if (
    title === "" ||
    !(parseInt(month) >= 1 && parseInt(month) <= 12) ||
    !(parseInt(date) >= 1 && parseInt(date) <= 12)
  ) {
    alert("Please check the input");
    return;
  }
  // create a todo
  let todo = document.createElement("div");
  todo.classList.add("todo");
  let todoTitle = document.createElement("p");
  todoTitle.classList.add("todoTitle");
  todoTitle.innerText = title;

  let todoDate = document.createElement("p");
  todoDate.classList.add("todoDate");
  todoDate.innerText = month + " / " + date;

  let todoDetail = document.createElement("p");
  todoDetail.classList.add("todoDetail");
  todoDetail.innerText = detail;

  todo.appendChild(todoTitle);
  todo.appendChild(todoDate);

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
    });
    todoItem.style.animation = "scaleDown 0.25s forwards";
  });

  //
  todo.appendChild(completeButton);
  todo.appendChild(trashButton);

  todo.style.animation = "scaleUp 0.3s forwards";
  //   todo.appendChild(todoDetail);
  section.appendChild(todo);
});
