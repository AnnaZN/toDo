/*____________________custom select begin______________________*/
//Look for any elements with the class "toDo__header-filter-custom":
let boxFilterCustom = document.getElementsByClassName("toDo__header-filter-custom");

for (let i = 0; i < boxFilterCustom.length; i++) {
  let  selElmnt = boxFilterCustom[i].getElementsByTagName("select")[0];
  //For each element, create a new DIV that will act as the selected item:
  const wrapperSelect = document.createElement("DIV");
  wrapperSelect.setAttribute("class", "select-selected");
  wrapperSelect.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  boxFilterCustom[i].appendChild(wrapperSelect);

  //For each element, create a new DIV that will contain the option list:
  itemsSelectHide = document.createElement("DIV");
  itemsSelectHide.setAttribute("class", "select-items select-hide");

  //delete first element select
  for (let j = 0; j < selElmnt.length; j++) {
    //For each option in the original select element,
    //create a new DIV that will act as an option item:
    let activeItemSelect = document.createElement("DIV"); 
    activeItemSelect.innerHTML = selElmnt.options[j].innerHTML;

    activeItemSelect.addEventListener("click", function () {
      /* When an item is clicked, update the original select box,
        and the selected item: */
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
    // When the select box is clicked, close any other select boxes,
    //and open/close the current select box:
    event.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  //A function that will close all select boxes in the document,
  //except the current select box:
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
// If the user clicks anywhere outside the select box,
//then close all select boxes:
document.addEventListener("click", closeAllSelect);
/*____________________custom select end_________________________*/

/*____________________referehce modal window begin______________________*/
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

//show/hide description in reference begin
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
//show/hide description in reference end

/*____________________referehce modal window end_________________________*/

/*____________________toDo begin_________________________*/
//localStorage.clear();
document.addEventListener("DOMContentLoaded", getDataToDo);

function getDataToDo() {
  let dataToDo;

  if (localStorage.getItem("dataToDo") === null) {
    dataToDo = [];
  } else {
    dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
  }
  
  dataToDo.forEach(function (itemDataToDo) {
    const liAddedItem = document.createElement("li");

    liAddedItem.classList.add("toDo__added-item");
    liAddedItem.setAttribute("data-todo-state", itemDataToDo.state);

    createButtonAddedItemOkCmd(liAddedItem);

    createTaskStorageField(liAddedItem, itemDataToDo.task);

    createButtontoDoAddedItemEditCmd(liAddedItem);

    createbuttontoDoAddedItemDeleteCmd(liAddedItem);

    listAddedItems.insertBefore(liAddedItem, listAddedItems.childNodes[0]);  
  });
}

document.querySelector(".select-selected").addEventListener("click", filter);

function filter() {
  const option = document.querySelector(".toDo__header-filter").value;
  document.querySelector(".toDo__added-box").dataset.todoOption = option;
}
//_______________________mark items as complete begin______________________________
document
  .querySelector(".toDo__header-select-all-cmd")
  .addEventListener("click", () => {
    let itemsList = document.querySelectorAll(
      '.toDo__added-item[data-todo-state="active"]'
    );

    itemsList.forEach((item) => {
      item.dataset.todoState = "completed";
      item
        .querySelector(".toDo__added-element")
        .querySelector(".toDo__added-element-text")
        .classList.remove("bg-none");
    });

    if (localStorage.getItem("dataToDo") === null) {
      dataToDo = [];
    } else {
      dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
    }

    dataToDo.forEach((itemArray) => {
      if (itemArray.state === "active") {
        itemArray.state = "completed";
      }
    });

    localStorage.setItem("dataToDo", JSON.stringify(dataToDo));
  });
//_________________________mark items as complete end_______________________________

//_______________________mark items as incomplete begin______________________________
document
  .querySelector(".toDo__header-remove-all-cmd")
  .addEventListener("click", () => {
    let items = document.querySelectorAll(
      '.toDo__added-item[data-todo-state="completed"]'
    );

    items.forEach((item) => {
      item.dataset.todoState = "active";
      item
        .querySelector(".toDo__added-element")
        .querySelector(".toDo__added-element-text")
        .classList.add("bg-none");
    });

    if (localStorage.getItem("dataToDo") === null) {
      dataToDo = [];
    } else {
      dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
    }

    dataToDo.forEach((itemArray) => {
      if (itemArray.state === "completed") {
        itemArray.state = "active";
      }
    });

    localStorage.setItem("dataToDo", JSON.stringify(dataToDo));
  });
//_________________________mark items as incomplete end_______________________________

//______________________save list in txt file begin_________________________________
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
//_______________________save list in txt file end___________________________________

const inputTodo = document.querySelector(".toDo__add-item-element");
const listAddedItems = document.getElementById("toDo-list-added-items");

//_______________________add new item begin___________________
//add new item by button begin
document
  .getElementById("toDo-add-item-btn")
  .addEventListener("click", addItemArray);
//add new item by button end

//adding a list item when pressing enter begin
inputTodo.addEventListener("keyup", (event) => {
  if (event.which == 13 || event.keyCode == 13) {
    addItemArray(inputTodo);
  }
});
//adding a list item when pressing enter end

//adding an item when clicking outside the input field begin
window.addEventListener("click", windowOnClick);

function windowOnClick(event) {
  if (!(event.target === inputTodo)) {
    addItemArray(inputTodo);
  }
}
//adding an item when clicking outside the input field end
function addItemArray() {
  if (inputTodo.disabled || !inputTodo.value.length) {
    return;
  }

  renderItemArray(inputTodo);
  saveNewDataToDo(inputTodo.value);

  inputTodo.value = "";
}
function renderItemArray(todoElement) {
  const liAddedItem = document.createElement("li"); 
  liAddedItem.classList.add("toDo__added-item");
  liAddedItem.setAttribute("data-todo-state", "active");
 
  createButtonAddedItemOkCmd(liAddedItem);

  createTaskStorageField(liAddedItem, todoElement.value);

  createButtontoDoAddedItemEditCmd(liAddedItem);

  createbuttontoDoAddedItemDeleteCmd(liAddedItem);

  listAddedItems.insertBefore(liAddedItem, listAddedItems.childNodes[0]);
}
function saveNewDataToDo(textItem) {
  let dataToDo;
  let newElementArrayItem = {
    task: "",
    state: "",
  };

  if (localStorage.getItem("dataToDo") === null) {
    dataToDo = [];
  } else {
    dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
  }

  newElementArrayItem.task = String(textItem);
  newElementArrayItem.state = "active";
  dataToDo.push(newElementArrayItem);
  localStorage.setItem("dataToDo", JSON.stringify(dataToDo));
}
//button "Complete" begin
function createButtonAddedItemOkCmd(liAddedItem) {
  const divAddedItemOk = document.createElement("div");
  divAddedItemOk.classList.add("toDo__added-item-ok");
  liAddedItem.appendChild(divAddedItemOk);

  const buttonAddedItemOkCmd = document.createElement("button");
  buttonAddedItemOkCmd.classList.add("toDo__added-item-ok-cmd");
  buttonAddedItemOkCmd.classList.add("todo__action");
  buttonAddedItemOkCmd.setAttribute("type", "submit");
  buttonAddedItemOkCmd.setAttribute("data-todo-action", "completed");
  buttonAddedItemOkCmd.setAttribute("id", "toDo-added-item-ok");
  buttonAddedItemOkCmd.setAttribute("aria-label", "ok");
  buttonAddedItemOkCmd.addEventListener("click", function (event) {
    completeItem(event.target);
  });
  divAddedItemOk.appendChild(buttonAddedItemOkCmd);

  const divAddedItemOkBox = document.createElement("div");
  divAddedItemOkBox.classList.add("toDo__added-item-ok-box");
  buttonAddedItemOkCmd.appendChild(divAddedItemOkBox);

  const imgAddedItemOk = document.createElement("img");
  imgAddedItemOk.classList.add("toDo__added-item-ok-img");
  imgAddedItemOk.setAttribute("src", "images/maked_task.png");
  imgAddedItemOk.setAttribute("alt", "complete");
  divAddedItemOkBox.appendChild(imgAddedItemOk);
}
function completeItem(elem) {
  const itemComplete = elem.closest(".toDo__added-item");
  const itemTag = itemComplete
    .querySelector(".toDo__added-element")
    .querySelector(".toDo__added-element-text");  
  const todoTask = itemComplete.innerText;  

  if (localStorage.getItem("dataToDo") === null) {
    dataToDo = [];
  } else {
    dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
  }
  
  itemCompleteArray = dataToDo.find((elemDataToDo) => (elemDataToDo.task === todoTask) && (elemDataToDo.state === itemComplete.dataset.todoState));

  if (itemComplete.dataset.todoState == "completed") {
    itemComplete.dataset.todoState = "active";
    itemTag.classList.add("bg-none");
    itemCompleteArray.state = "active";
  } else {
    itemComplete.dataset.todoState = "completed";
    itemTag.classList.remove("bg-none");
    itemCompleteArray.state = "completed";
  }

  localStorage.setItem("dataToDo", JSON.stringify(dataToDo)); 
}
//button "Complete" end

//task text begin
function createTaskStorageField(liAddedItem, text) { 
  const divAddedItem = document.createElement("div");
  divAddedItem.classList.add("toDo__added-element");
  liAddedItem.appendChild(divAddedItem);

  const divAddedTextItem = document.createElement("div");
  divAddedTextItem.classList.add("toDo__added-element-text");
  divAddedTextItem.classList.add("highlighted");
  divAddedTextItem.classList.add("highlighted-width");

  if (liAddedItem.dataset.todoState === "active") {
    divAddedTextItem.classList.add("bg-none");
  };

  divAddedTextItem.setAttribute("contenteditable", "false");
  divAddedTextItem.textContent = text;
  divAddedItem.appendChild(divAddedTextItem);
}
//task text end

//button "Edit" begin
function createButtontoDoAddedItemEditCmd(liAddedItem) {
  const divAddedItemEdit = document.createElement("div");
  divAddedItemEdit.classList.add("toDo__added-item-edit");
  liAddedItem.appendChild(divAddedItemEdit);

  const buttontoDoAddedItemEditCmd = document.createElement("button");
  buttontoDoAddedItemEditCmd.classList.add("toDo__added-item-edit-cmd");
  buttontoDoAddedItemEditCmd.classList.add("todo__action");
  buttontoDoAddedItemEditCmd.setAttribute("type", "submit");
  buttontoDoAddedItemEditCmd.setAttribute("id", "toDo-added-item-edit");
  buttontoDoAddedItemEditCmd.setAttribute("aria-label", "edit");
  buttontoDoAddedItemEditCmd.addEventListener("click", function (event) {
    editItem(event.target);
  });
  divAddedItemEdit.appendChild(buttontoDoAddedItemEditCmd);

  const divAddedItemEditBox = document.createElement("div");
  divAddedItemEditBox.classList.add("toDo__added-item-edit-box");
  buttontoDoAddedItemEditCmd.appendChild(divAddedItemEditBox);

  const imgAddedItemEditImg = document.createElement("img");
  imgAddedItemEditImg.classList.add("toDo__added-item-edit-img");
  imgAddedItemEditImg.setAttribute("src", "images/edit_task.svg");
  imgAddedItemEditImg.setAttribute("alt", "edit");
  divAddedItemEditBox.appendChild(imgAddedItemEditImg);
}
function editItem(elem) {
  const itemEdit = elem.closest(".toDo__added-item");
  let itemTag = elem
    .closest(".toDo__added-item")
    .querySelector(".toDo__added-element")
    .querySelector(".toDo__added-element-text");
  let preHtml = itemTag.innerText;  

  //key 'Enter' = finish editing begin
  itemTag.addEventListener("keydown", (event) => {
    if (event.keyCode == 13 && !event.shiftKey) {
      itemTag.contentEditable = "false";
      itemTag.parentNode.classList.remove("editable");
      saveEditItemArray(itemEdit, itemTag.innerText, preHtml);
    }
  });
  //key 'Enter' = finish editing end

  itemTag.addEventListener("focusout", function () {
    itemTag.contentEditable = "false";
    itemTag.parentNode.classList.remove("editable");
    saveEditItemArray(itemEdit, itemTag.innerText, preHtml);
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
function saveEditItemArray(elemEdit, text, textBeforeEdit) {
  if (localStorage.getItem("dataToDo") === null) {
      dataToDo = [];
    } else {
      dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
  }
  
    itemEditArray = dataToDo.find((elemDataToDo) => (elemDataToDo.task === textBeforeEdit) && (elemDataToDo.state === elemEdit.dataset.todoState));
    itemEditArray.task = text;
  
  localStorage.setItem("dataToDo", JSON.stringify(dataToDo)); 
}
//button "Edit" end

//button "Delete" begin
function createbuttontoDoAddedItemDeleteCmd(liAddedItem) {
  const divAddedItemDelete = document.createElement("div");
  divAddedItemDelete.classList.add("toDo__added-item-delete");
  liAddedItem.appendChild(divAddedItemDelete);

  const buttontoDoAddedItemDeleteCmd = document.createElement("button");
  buttontoDoAddedItemDeleteCmd.classList.add("toDo__added-item-delete-cmd");
  buttontoDoAddedItemDeleteCmd.classList.add("todo__action");
  buttontoDoAddedItemDeleteCmd.setAttribute("type", "submit");
  buttontoDoAddedItemDeleteCmd.setAttribute("id", "toDo-added-item-delete");
  buttontoDoAddedItemDeleteCmd.setAttribute("aria-label", "delete");
  buttontoDoAddedItemDeleteCmd.addEventListener("click", function (event) {
    deleteItem(event.target);
  });
  divAddedItemDelete.appendChild(buttontoDoAddedItemDeleteCmd);

  const divAddedItemDeleteBox = document.createElement("div");
  divAddedItemDeleteBox.classList.add("toDo__added-item-delete-box");
  buttontoDoAddedItemDeleteCmd.appendChild(divAddedItemDeleteBox);

  const imgAddedItemDeleteImg = document.createElement("img");
  imgAddedItemDeleteImg.classList.add("toDo__added-item-delete-img");
  imgAddedItemDeleteImg.setAttribute("src", "images/delete_task.png");
  imgAddedItemDeleteImg.setAttribute("alt", "delete");
  divAddedItemDeleteBox.appendChild(imgAddedItemDeleteImg);
}
function deleteItem(elem) {
  const itemDelete = elem.closest(".toDo__added-item");
  const parentItemDelete = itemDelete.parentNode;
  const todoTask = itemDelete.innerText;
  let dataToDo;

  if (localStorage.getItem("dataToDo") === null) {
    dataToDo = [];
  } else {
    dataToDo = JSON.parse(localStorage.getItem("dataToDo"));
  }

  itemDeleteArray = dataToDo.find(
    (elemDataToDo) =>
      elemDataToDo.task === todoTask &&
      elemDataToDo.state === itemDelete.dataset.todoState
  );
  dataToDo.splice(dataToDo.indexOf(itemDeleteArray), 1);
  localStorage.setItem("dataToDo", JSON.stringify(dataToDo));

  parentItemDelete.removeChild(itemDelete);
}
//button "Delete" end

//_______________________add new item end _______________________

/*____________________toDo end_________________________*/
