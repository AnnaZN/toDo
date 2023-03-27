/*____________________custom select begin______________________*/
var x, i, j, l, ll, selElmnt, a, b, c;
//Look for any elements with the class "toDo__header-filter-custom":
x = document.getElementsByClassName("toDo__header-filter-custom");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  //For each element, create a new DIV that will act as the selected item:
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  //For each element, create a new DIV that will contain the option list:
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  //delete first element select
  //for (j = 1; j < ll; j++) {
  for (j = 0; j < ll; j++) {
    //For each option in the original select element,
    //create a new DIV that will act as an option item:
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
        and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    // When the select box is clicked, close any other select boxes,
    //and open/close the current select box:
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

function closeAllSelect(elmnt) {
  //A function that will close all select boxes in the document,
  //except the current select box:
  var x,
    y,
    i,
    xl,
    yl,
    arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i);
    }
    // else {
    //   y[i].classList.remove("select-arrow-active");
    // }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}
// If the user clicks anywhere outside the select box,
//then close all select boxes:
document.addEventListener("click", closeAllSelect);
/*____________________custom select end_________________________*/

/*____________________referehce modal window begin______________________*/
var modalWindow = document.querySelector(".reference-modal-window");
var showModalWindowBtn = document.querySelector(".toDo__header-reference-cmd");
var closeModalWindow = document.querySelector(
  ".reference-modal-window-close-btn"
);

function toggleModalWindow() {
  modalWindow.classList.toggle("reference-modal-window-show");
}

showModalWindowBtn.addEventListener("click", toggleModalWindow);
closeModalWindow.addEventListener("click", toggleModalWindow);

//show/hide description in reference begin
document.querySelectorAll(".description-link").forEach(function (elem) {
  elem.addEventListener("click", showHideDescription);
});

function showHideDescription(e) {
  let descriptionBox = e.target.closest(
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

const fromStorage = localStorage.getItem("toDo");
const elemText = document.querySelector(".toDo__add-item-element");
//localStorage.clear();

document.querySelector(".toDo__added-box").dataset.todoOption = "all";

if (fromStorage) {
  document.querySelector(".toDo__added-box").innerHTML = fromStorage;
}
document.querySelector(".select-selected").addEventListener("click", filter);

function filter() {
  const option = document.querySelector(".toDo__header-filter").value;
  document.querySelector(".toDo__added-box").dataset.todoOption = option;
}

//_______________________mark items as complete begin______________________________
document.querySelector('.toDo__header-select-all-cmd').addEventListener('click', (e) => {

  let items = document.querySelectorAll('.toDo__added-item[data-todo-state="active"]');
  items.forEach((item) => {     
    item.dataset.todoState = "completed";
    item.querySelector(".toDo__added-element").querySelector(".toDo__added-element-text")
       .classList.remove("bg-none");
  });
});
//_________________________mark items as complete end_______________________________

//_______________________mark items as incomplete begin______________________________
document.querySelector('.toDo__header-remove-all-cmd').addEventListener('click', (e) => {

  let items = document.querySelectorAll('.toDo__added-item[data-todo-state="completed"]');
  items.forEach((item) => {     
    item.dataset.todoState = "active";
    item.querySelector(".toDo__added-element").querySelector(".toDo__added-element-text")
       .classList.add("bg-none");
       
  });
});
//_________________________mark items as incomplete end_______________________________

//______________________save list in txt file begin_________________________________
document.querySelector('.toDo__header-save-cmd').addEventListener('click', (e) => {
  var a = document.createElement('a');
  a.download = 'tasks.txt';
  let content = '1. Активные задачи';
  let items = document.querySelectorAll('.toDo__added-item[data-todo-state="active"]');
  items.forEach((item, index) => {
     content += '\n1.' + (index + 1) + '. ' 
      + item.querySelector('.toDo__added-element').firstElementChild.textContent;
   });
  content += '\n\n2. Завершённые задачи';
  items = document.querySelectorAll('.toDo__added-item[data-todo-state="completed"]');
  items.forEach((item, index) => {
    content += '\n2.' + (index + 1) + '. ' 
    + item.querySelector('.toDo__added-element').firstElementChild.textContent;
  });
  a.href = window.URL.createObjectURL(new Blob([content], { type: 'text/plain' }));
  a.click();
});
//_______________________save list in txt file end___________________________________


//__________adding an item when clicking outside the input field begin_______________
window.addEventListener("click", windowOnClick);

function windowOnClick(event) {
  if (!(event.target === document.querySelector(".toDo__add-item-element"))) {
    addItem();
  }
}
//___________adding an item when clicking outside the input field end_________________

//_______________________add new item begin______________________________

//adding a list item when pressing enter begin
document.querySelector(".toDo__add-item-element").addEventListener( 'keyup', event => {
  if (event.which == 13 || event.keyCode == 13){
    addItem();
  }
});
//adding a list item when pressing enter end

//add new item by button begin
document.getElementById("toDo-add-item-btn").addEventListener("click", addItem);

function addItem(e) {
  if (elemText.disabled || !elemText.value.length) {
    return;
  }
  document
    .querySelector(".toDo__added-box")
    .insertAdjacentHTML("beforeend", create(elemText.value));
  elemText.value = "";
  //document.querySelector('.toDo__added-box').innerHTML.dataset.todoState = 'active';
  localStorage.setItem(
    "toDo",
    document.querySelector(".toDo__added-box").innerHTML
  );
}

function create(text) {

  return `<li class="toDo__added-item" data-todo-state ="active">
           <div class="toDo__added-item-ok" >
            <button class="toDo__added-item-ok-cmd todo__action" type="submit"  data-todo-action="completed" id="toDo-added-item-ok" aria-label="ok">
             <div class="toDo__added-item-ok-box">
              <img class="toDo__added-item-ok-img" src="images/maked_task.png" alt=""> 
             </div>                  
            </button>
           </div> 
 
          <div class="toDo__added-element">
            <div class="toDo__added-element-text highlighted  highlighted-width bg-none" contenteditable="false">${text}</div> 
          </div>
             
            <div class="toDo__added-item-edit">
            <button class="toDo__added-item-edit-cmd todo__action" type="submit"  id="toDo-added-item-edit" aria-label="edit">
             <div class="toDo__added-item-edit-box">
                <img class="toDo__added-item-edit-img" src="images/edit_task.svg" alt=""> 
              </div>                  
            </button>
           </div>
           <div class="toDo__added-item-delete">
            <button class="toDo__added-item-delete-cmd todo__action" type="submit"  id="toDo-added-item-delete" aria-label="delete">
              <div class="toDo__added-item-delete-box">
                <img class="toDo__added-item-delete-img" src="images/delete_task.png" alt=""> 
              </div>                  
            </button>
           </div>  
          </li>`;
}
//add new item by button end
//_______________________add new item end______________________________


//_______________________added list item handlers begin_____________________________
const toDoListAddedItems = document.getElementById("toDo-list-added-items");
toDoListAddedItems.addEventListener("click", handleTodoClickEvent);

function handleTodoClickEvent(e) {
  let buttonDelete = e.target.closest(".toDo__added-item-delete-cmd");
  let buttonComplete = e.target.closest(".toDo__added-item-ok-cmd");
  let buttonEdit = e.target.closest(".toDo__added-item-edit-cmd");

  //_______________________list item delete begin_____________________________
  if (toDoListAddedItems.contains(buttonDelete) || buttonDelete) {
    buttonDelete.closest(".toDo__added-item").remove();
    localStorage.setItem(
      "toDo",
      document.querySelector(".toDo__added-box").innerHTML
    );
  //_________________________list item delete end______________________________ 
  
  //_____________________mark the item as complete begin____________________________
  } else if (toDoListAddedItems.contains(buttonComplete) || buttonComplete) {
    if (
      buttonComplete.closest(".toDo__added-item").dataset.todoState ==
      "completed"
    ) {
      buttonComplete.closest(".toDo__added-item").dataset.todoState = "active";
      buttonComplete
        .closest(".toDo__added-item")
        .querySelector(".toDo__added-element")
        .querySelector(".toDo__added-element-text")
        .classList.add("bg-none");
    } else {
      buttonComplete.closest(".toDo__added-item").dataset.todoState =
        "completed";

      buttonComplete
        .closest(".toDo__added-item")
        .querySelector(".toDo__added-element")
        .querySelector(".toDo__added-element-text")
        .classList.remove("bg-none");
    } 
    //_____________________mark the item as complete end______________________________ 

  //_______________________list item editing begin_____________________________
  } else if (toDoListAddedItems.contains(buttonEdit) || buttonEdit) {
    let elementEdit = buttonEdit
      .closest(".toDo__added-item")
      .querySelector(".toDo__added-element")
      .querySelector(".toDo__added-element-text");

    elementEdit.addEventListener("focusout", function () {
      elementEdit.contentEditable = "false";
      elementEdit.parentNode.classList.remove("editable");
    });

    
    elementEdit.contentEditable = "true";
    elementEdit.parentNode.classList.add("editable");

    var preHtml = elementEdit.innerText;
    elementEdit.innerText = preHtml;
    elementEdit.focus();
    placeCaretAtEnd(elementEdit);

    function placeCaretAtEnd(el) {
      el.focus();
      if (
        typeof window.getSelection != "undefined" &&
        typeof document.createRange != "undefined"
      ) {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
      }
      //_______________________list item editing end_____________________________

      //_________________key 'Enter' = finish editing begin_________________________
      elementEdit.addEventListener( 'keydown', event => {
        if (event.keyCode == 13 && !event.shiftKey){
          elementEdit.contentEditable = "false";
          elementEdit.parentNode.classList.remove("editable");
        }     
      });
      //_________________key 'Enter' = finish editing end____________________________
    }
  }

  localStorage.setItem(
    "toDo",
    document.querySelector(".toDo__added-box").innerHTML
  );
}
//__________________________added list item handlers end_________________________________

/*____________________toDo end_________________________*/
