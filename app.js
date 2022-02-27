let add = document.querySelector("form button");
add.addEventListener("click", (e) => {
  e.preventDefault();

  let form = e.target.parentElement;
  let title = form.children[1];
  let month = form.children[2].children[0];
  let date = form.children[2].children[1];
  let detail = form.children[4];
  console.log(detail);
});
