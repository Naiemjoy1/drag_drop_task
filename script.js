let taskIdCounter = 10;

function addCard(boxId) {
  const task = prompt("Enter the new task");
  if (task) {
    const boxContent = document.getElementById(boxId);
    const newTask = document.createElement("p");
    newTask.textContent = task;
    newTask.setAttribute("id", "task" + taskIdCounter);
    newTask.setAttribute("draggable", "true");
    newTask.setAttribute("ondragstart", "drag(event)");
    newTask.setAttribute("onclick", "editTask(this)");
    boxContent.appendChild(newTask);
    taskIdCounter++;
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: `Task "${task}" added successfully`,
      showConfirmButton: false,
      timer: 1500,
    });
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

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text/plain");
  const task = document.getElementById(taskId);

  if (event.target.classList.contains("box-content")) {
    event.target.appendChild(task);
  } else if (event.target.closest(".box-content")) {
    event.target.closest(".box-content").appendChild(task);
  }

  Swal.fire({
    position: "top-end",
    icon: "success",
    title: `Task "${task.textContent}" moved successfully`,
    showConfirmButton: false,
    timer: 1500,
  });
}

function rotateImage(taskId) {
  const imageCard = document.getElementById(taskId);
  const imgElement = imageCard.querySelector("img");
  let currentRotation = imgElement.getAttribute("data-rotation") || 0;

  currentRotation = parseInt(currentRotation, 10);

  let newRotation = currentRotation + 90;

  imgElement.style.transform = `rotate(${newRotation}deg)`;

  imgElement.setAttribute("data-rotation", newRotation);

  Swal.fire({
    position: "top-end",
    icon: "info",
    title: `Image rotated to ${newRotation} degrees`,
    showConfirmButton: false,
    timer: 1500,
  });
}
