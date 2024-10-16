function addCard(boxId) {
  const task = prompt("Enter the new task");
  if (task) {
    const boxContent = document.getElementById(boxId);
    const newTask = document.createElement("p");
    newTask.textContent = task;
    newTask.setAttribute("onclick", "editTask(this)");
    boxContent.appendChild(newTask);
  }
}

function editTask(element) {
  element.contentEditable = true;
  element.focus();

  element.addEventListener("blur", function () {
    element.contentEditable = false;
  });

  element.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      element.contentEditable = false;
    }
  });
}
