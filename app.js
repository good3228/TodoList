let add = document.querySelector("form button");
let section = document.querySelector("section");
add.addEventListener("click", (e) => {
  e.preventDefault();

  // take out the data we input separately
  let form = e.target.parentElement;
  let title = form.children[1];
  let month = form.children[2].children[0];
  let date = form.children[2].children[1];
  let detail = form.children[4];
  console.log(detail);

  // create a todo
    let todo = document.createElement("div");
    let todoTitle = document.createElement("p");
    todoTitle.innerHTML = title;
    let todoDate = document.createElement("p");
    todoDate.innerHTML = month + "/" + date;
    let todoDetail = document.createElement("p");
    todoDetail.innerHTML= detail;

    todo.appendChild(todoTitle);
    todo.appendChild(todoDate);
    todo.appendChild(todoDetail);
});
