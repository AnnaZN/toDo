let boxFilterCustom = document.getElementsByClassName("toDo__header-filter-custom");

for (let i = 0; i < boxFilterCustom.length; i++) {
  let  selElmnt = boxFilterCustom[i].getElementsByTagName("select")[0];
  const wrapperSelect = document.createElement("DIV");
  wrapperSelect.setAttribute("class", "select-selected");
  wrapperSelect.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  boxFilterCustom[i].appendChild(wrapperSelect);

  itemsSelectHide = document.createElement("DIV");
  itemsSelectHide.setAttribute("class", "select-items select-hide");

  for (let j = 0; j < selElmnt.length; j++) {
    let activeItemSelect = document.createElement("DIV"); 
    activeItemSelect.innerHTML = selElmnt.options[j].innerHTML;

    activeItemSelect.addEventListener("click", function () {
      let ValueDefaultSelect = this.parentNode.parentNode.getElementsByTagName("select")[0];
      let activeValueSelect = this.parentNode.previousSibling;

      for (let i = 0; i < ValueDefaultSelect.length; i++) {
        if (ValueDefaultSelect.options[i].innerHTML == this.innerHTML) {
          let wrapperSelect = this.parentNode.getElementsByClassName("same-as-selected");

          ValueDefaultSelect.selectedIndex = i;
          activeValueSelect.innerHTML = this.innerHTML;

          for (let j = 0; j < wrapperSelect.length; j++) {
            wrapperSelect[j].removeAttribute("class");
          }

          this.setAttribute("class", "same-as-selected");
          break;
        }
      }

      activeValueSelect.click();
    });

    itemsSelectHide.appendChild(activeItemSelect);
  }

  boxFilterCustom[i].appendChild(itemsSelectHide);
  wrapperSelect.addEventListener("click", function (event) {
    event.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  let arrNo = [];
  let selectItems = document.getElementsByClassName("select-items");
  let wrapperSelect = document.getElementsByClassName("select-selected");

  for (let i = 0; i < wrapperSelect.length; i++) {
    if (elmnt == wrapperSelect[i]) {
      arrNo.push(i);
    }
  }

  for (let i = 0; i < selectItems.length; i++) {
    if (arrNo.indexOf(i)) {
      selectItems[i].classList.add("select-hide");
    }
  }

}
document.addEventListener("click", closeAllSelect);

const modalWindow = document.querySelector(".reference-modal-window");
const showModalWindowBtn = document.querySelector(
  ".toDo__header-reference-cmd"
);
const closeModalWindow = document.querySelector(
  ".reference-modal-window-close-btn"
);

function toggleModalWindow() {
  modalWindow.classList.toggle("reference-modal-window-show");
}

showModalWindowBtn.addEventListener("click", toggleModalWindow);
closeModalWindow.addEventListener("click", toggleModalWindow);

document.querySelectorAll(".description-link").forEach( function (elem) {
  elem.addEventListener("click", showHideDescription);
});

function showHideDescription(event) {
  let descriptionBox = event.target.closest(
    ".description-link-box"
  ).nextElementSibling;

  if (descriptionBox.classList.contains("show-hide-description") == false) {
    descriptionBox.classList.add("show-hide-description");
  } else {
    descriptionBox.classList.remove("show-hide-description");
  }

}

document.addEventListener("DOMContentLoaded", getDataToDo);

function getDataToDo() {
  let dataToDo;

  if (localStorage.getItem("dataToDo") === null) {
    dataToDo = [];
  } else {
    dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
  }
  
  dataToDo.forEach(function (elem) {
    const liTask = document.createElement("li");

    liTask.classList.add("toDo__added-item");
    liTask.setAttribute("data-todo-state", elem.state);

    createTaskCompletedButton(liTask);

    createTaskFromStorage(liTask, elem.textTask);

    createTaskEditButton(liTask);

    createTaskDeleteButton(liTask);

    listTasks.insertBefore(liTask, listTasks.childNodes[0]);  
  });
}

document.querySelector(".select-selected").addEventListener("click", filter);

function filter() {
  const option = document.querySelector(".toDo__header-filter").value;
  document.querySelector(".toDo__added-box").dataset.todoOption = option;
}

document
  .querySelector(".toDo__header-select-all-cmd")
  .addEventListener("click", () => {
    let tasksList = document.querySelectorAll(
      '.toDo__added-item[data-todo-state="active"]'
    );

    tasksList.forEach((task) => {
      task.dataset.todoState = "completed";
      task
        .querySelector(".toDo__added-element")
        .querySelector(".toDo__added-element-text")
        .classList.remove("bg-none");
    });

    if (localStorage.getItem("dataToDo") === null) {
      dataToDo = [];
    } else {
      dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
    }

    dataToDo.forEach((taskArray) => {
      if (taskArray.state === "active") {
        taskArray.state = "completed";
      }
    });

    localStorage.setItem("dataToDo", JSON.stringify(dataToDo));
  });

document
  .querySelector(".toDo__header-remove-all-cmd")
  .addEventListener("click", () => {
    let tasksCompleted = document.querySelectorAll(
      '.toDo__added-item[data-todo-state="completed"]'
    );

    tasksCompleted.forEach((task) => {
      task.dataset.todoState = "active";
      task
        .querySelector(".toDo__added-element")
        .querySelector(".toDo__added-element-text")
        .classList.add("bg-none");
    });

    if (localStorage.getItem("dataToDo") === null) {
      dataToDo = [];
    } else {
      dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
    }

    dataToDo.forEach((taskArray) => {
      if (taskArray.state === "completed") {
        taskArray.state = "active";
      }
    });

    localStorage.setItem("dataToDo", JSON.stringify(dataToDo));
  });

document
  .querySelector(".toDo__header-save-cmd")
  .addEventListener("click", () => {
    const linkDownload = document.createElement("a");
    linkDownload.download = "tasks.txt";

    let content = "1. Активные задачи";
    let itemsActive = document.querySelectorAll(
      '.toDo__added-item[data-todo-state="active"]'
    );
    itemsActive.forEach((itemActive, index) => {
      content +=
        "\n1." +
        (index + 1) +
        ". " +
        itemActive.querySelector(".toDo__added-element").firstElementChild
          .textContent;
    });

    content += "\n\n2. Завершённые задачи";
    itemsCompleted = document.querySelectorAll(
      '.toDo__added-item[data-todo-state="completed"]'
    );
    itemsCompleted.forEach((itemCompleted, index) => {
      content +=
        "\n2." +
        (index + 1) +
        ". " +
        itemCompleted.querySelector(".toDo__added-element").firstElementChild
          .textContent;
    });

    linkDownload.href = window.URL.createObjectURL(
      new Blob([content], { type: "text/plain" })
    );
    linkDownload.click();
  });

const inputTodo = document.querySelector(".toDo__add-item-element");
const listTasks = document.getElementById("toDo-list-added-items");

document
  .getElementById("toDo-add-item-btn")
  .addEventListener("click", addTask);

inputTodo.addEventListener("keyup", (event) => {
  if (event.which == 13 || event.keyCode == 13) {
    addTask(inputTodo);
  }
});

window.addEventListener("click", windowOnClick);

function windowOnClick(event) {
  if (!(event.target === inputTodo)) {
    addTask(inputTodo);
  }
}

function addTask() {
  if (inputTodo.disabled || !inputTodo.value.length || /\s/.test(inputTodo.value)) {
    inputTodo.value = "";
    return;
  }

  renderTaskArray(inputTodo);
  saveNewDataToDo(inputTodo.value);

  inputTodo.value = "";
}
function renderTaskArray(todoElement) {
  const liTask = document.createElement("li"); 
  liTask.classList.add("toDo__added-item");
  liTask.setAttribute("data-todo-state", "active");
 
  createTaskCompletedButton(liTask);

  createTaskFromStorage(liTask, todoElement.value);

  createTaskEditButton(liTask);

  createTaskDeleteButton(liTask);

  listTasks.insertBefore(liTask, listTasks.childNodes[0]);
}
function saveNewDataToDo(textItem) {
  let dataToDo;
  let newTask = {
    textTask: "",
    state: "",
  };

  if (localStorage.getItem("dataToDo") === null) {
    dataToDo = [];
  } else {
    dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
  }

  newTask.textTask = String(textItem);
  newTask.state = "active";
  dataToDo.push(newTask);
  localStorage.setItem("dataToDo", JSON.stringify(dataToDo));
}

function createTaskCompletedButton(liTask) {
  const boxTaskCompletedButton = document.createElement("div");
  boxTaskCompletedButton.classList.add("toDo__added-item-ok");
  liTask.appendChild(boxTaskCompletedButton);

  const buttonTaskCompleted = document.createElement("button");
  buttonTaskCompleted.classList.add("toDo__added-item-ok-cmd");
  buttonTaskCompleted.classList.add("todo__action");
  buttonTaskCompleted.setAttribute("type", "submit");
  buttonTaskCompleted.setAttribute("data-todo-action", "completed");
  buttonTaskCompleted.setAttribute("id", "toDo-added-item-ok");
  buttonTaskCompleted.setAttribute("aria-label", "ok");
  buttonTaskCompleted.addEventListener("click", function (event) {
    completeTask(event.target);
  });
  boxTaskCompletedButton.appendChild(buttonTaskCompleted);

  const boxTaskCompletedImg = document.createElement("div");
  boxTaskCompletedImg.classList.add("toDo__added-item-ok-box");
  buttonTaskCompleted.appendChild(boxTaskCompletedImg);

  const imgTaskCompleted = document.createElement("img");
  imgTaskCompleted.classList.add("toDo__added-item-ok-img");
  imgTaskCompleted.setAttribute("src", "images/maked_task.png");
  imgTaskCompleted.setAttribute("alt", "Сделано/Не сделано");
  boxTaskCompletedImg.appendChild(imgTaskCompleted);
}
function completeTask(elem) {
  const itemComplete = elem.closest(".toDo__added-item");
  const itemTag = itemComplete
    .querySelector(".toDo__added-element")
    .querySelector(".toDo__added-element-text");  
  const textTask = itemComplete.innerText;  

  if (localStorage.getItem("dataToDo") === null) {
    dataToDo = [];
  } else {
    dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
  }
  
  taskCompleteArray = dataToDo.find((elem) => (elem.textTask === textTask) && (elem.state === itemComplete.dataset.todoState));

  if (itemComplete.dataset.todoState == "completed") {
    itemComplete.dataset.todoState = "active";
    itemTag.classList.add("bg-none");
    taskCompleteArray.state = "active";
  } else {
    itemComplete.dataset.todoState = "completed";
    itemTag.classList.remove("bg-none");
    taskCompleteArray.state = "completed";
  }

  localStorage.setItem("dataToDo", JSON.stringify(dataToDo)); 
}

function createTaskFromStorage(liTask, text) { 
  const boxTask = document.createElement("div");
  boxTask.classList.add("toDo__added-element");
  liTask.appendChild(boxTask);

  const boxTaskText = document.createElement("div");
  boxTaskText.classList.add("toDo__added-element-text");
  boxTaskText.classList.add("highlighted");
  boxTaskText.classList.add("highlighted-width");

  if (liTask.dataset.todoState === "active") {
    boxTaskText.classList.add("bg-none");
  };

  boxTaskText.setAttribute("contenteditable", "false");
  boxTaskText.textContent = text;
  boxTask.appendChild(boxTaskText);
}

function createTaskEditButton(liTask) {
  const boxTaskEdit = document.createElement("div");
  boxTaskEdit.classList.add("toDo__added-item-edit");
  liTask.appendChild( boxTaskEdit);

  const buttonTaskEdit = document.createElement("button");
  buttonTaskEdit.classList.add("toDo__added-item-edit-cmd");
  buttonTaskEdit.classList.add("todo__action");
  buttonTaskEdit.setAttribute("type", "submit");
  buttonTaskEdit.setAttribute("id", "toDo-added-item-edit");
  buttonTaskEdit.setAttribute("aria-label", "edit");
  buttonTaskEdit.addEventListener("click", function (event) {
    editTask(event.target);
  });
   boxTaskEdit.appendChild(buttonTaskEdit);

  const  boxTaskEditImg = document.createElement("div");
  boxTaskEditImg.classList.add("toDo__added-item-edit-box");
  buttonTaskEdit.appendChild(boxTaskEditImg);

  const imgTaskEdit = document.createElement("img");
  imgTaskEdit.classList.add("toDo__added-item-edit-img");
  imgTaskEdit.setAttribute("src", "images/edit_task.svg");
  imgTaskEdit.setAttribute("alt", "Редактировать");
  boxTaskEditImg.appendChild(imgTaskEdit);
}
function editTask(elem) {
  const itemEdit = elem.closest(".toDo__added-item");
  let itemTag = elem
    .closest(".toDo__added-item")
    .querySelector(".toDo__added-element")
    .querySelector(".toDo__added-element-text");
  let preHtml = itemTag.innerText;  

  itemTag.addEventListener("keydown", (event) => {
    if (event.keyCode == 13 && !event.shiftKey) {
      itemTag.contentEditable = "false";
      itemTag.parentNode.classList.remove("editable");
      saveEditTaskArray(itemEdit, itemTag.innerText, preHtml);
    }
  });

  itemTag.addEventListener("focusout", function () {
    itemTag.contentEditable = "false";
    itemTag.parentNode.classList.remove("editable");
    saveEditTaskArray(itemEdit, itemTag.innerText, preHtml);
  });

  itemTag.contentEditable = "true";
  itemTag.parentNode.classList.add("editable");
  itemTag.innerText = preHtml;
  
  itemTag.focus();
  placeCaretAtEnd(itemTag);
}
function placeCaretAtEnd(elem) {
  elem.focus();

  if (
    typeof window.getSelection != "undefined" &&
    typeof document.createRange != "undefined"
  ) {
    var range = document.createRange();
    range.selectNodeContents(elem);
    range.collapse(false);

    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(elem);
    textRange.collapse(false);
    textRange.select();
  }
}
function saveEditTaskArray(elemEdit, text, textBeforeEdit) {
  if (localStorage.getItem("dataToDo") === null) {
      dataToDo = [];
    } else {
      dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
  }
  
    taskEditArray = dataToDo.find((elem) => (elem.textTask === textBeforeEdit) && (elem.state === elemEdit.dataset.todoState));
    taskEditArray.textTask = text;
  
  localStorage.setItem("dataToDo", JSON.stringify(dataToDo)); 
}

function createTaskDeleteButton(liTask) {
  const boxTaskDeleteButton = document.createElement("div");
  boxTaskDeleteButton.classList.add("toDo__added-item-delete");
  liTask.appendChild(boxTaskDeleteButton);

  const buttonTaskDelete = document.createElement("button");
  buttonTaskDelete.classList.add("toDo__added-item-delete-cmd");
  buttonTaskDelete.classList.add("todo__action");
  buttonTaskDelete.setAttribute("type", "submit");
  buttonTaskDelete.setAttribute("id", "toDo-added-item-delete");
  buttonTaskDelete.setAttribute("aria-label", "delete");
  buttonTaskDelete.addEventListener("click", function (event) {
    deleteTask(event.target);
  });
  boxTaskDeleteButton.appendChild(buttonTaskDelete);

  const boxTaskDeleteImg = document.createElement("div");
  boxTaskDeleteImg.classList.add("toDo__added-item-delete-box");
  buttonTaskDelete.appendChild(boxTaskDeleteImg);

  const imgTaskDelete = document.createElement("img");
  imgTaskDelete.classList.add("toDo__added-item-delete-img");
  imgTaskDelete.setAttribute("src", "images/delete_task.png");
  imgTaskDelete.setAttribute("alt", "Удалить");
  boxTaskDeleteImg.appendChild(imgTaskDelete);
}
function deleteTask(elem) {
  const itemDelete = elem.closest(".toDo__added-item");
  const parentItemDelete = itemDelete.parentNode;
  const textTask = itemDelete.innerText;
  let dataToDo;

  if (localStorage.getItem("dataToDo") === null) {
    dataToDo = [];
  } else {
    dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
  }

  taskDeleteArray = dataToDo.find(
    (elemDataToDo) =>
      elemDataToDo.textTask === textTask  &&
      elemDataToDo.state === itemDelete.dataset.todoState
  );
  dataToDo.splice(dataToDo.indexOf(taskDeleteArray), 1);
  localStorage.setItem("dataToDo", JSON.stringify(dataToDo));

  parentItemDelete.removeChild(itemDelete);
}

