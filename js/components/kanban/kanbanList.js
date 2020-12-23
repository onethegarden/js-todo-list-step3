import Component from "../../lib/component.js";
import store from "../../store/index.js";
import { todoList } from "./todoComponent.js";
import { validateInput } from "../../common/validate.js";

const KanbanList = class extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector(".todoapp-list-container"),
    });
  }

  addTeam = (e) => {
    if (
      e.target.id !== "add-team-button" &&
      e.target.className !== "material-icons"
    )
      return;
    const newTeamName = prompt("새로운 팀원 이름을 입력해주세요");
    store.dispatch("addMember", { name: newTeamName });
  };

  addToDo = (e) => {
    if (
      e.target.className !== "new-todo" ||
      e.key !== "Enter" ||
      !validateInput(e.target.value)
    ) {
      return;
    }

    const todoId = e.target.closest(".todoapp-container").id;
    const text = e.target.value;
    store.dispatch("setToDoId", todoId);
    store.dispatch("addToDo", { contents: text });
    //입력시엔 할 일들을 보두 보여줌
    //store.dispatch('setFilterType', 'all');
    e.target.value = "";
    e.target.focus();
  };

  //토글, 삭제
  toDoClick = (e) => {
    if (e.target.className !== "toggle" && e.target.className !== "destroy")
      return;

    const todoId = e.target.closest(".todoapp-container").id;
    store.dispatch("setToDoId", todoId);
    const todoListId = e.target.closest("li").id;

    switch (e.target.className) {
      case "toggle":
        store.dispatch("toggleToDo", todoListId);
        break;
      case "destroy":
        store.dispatch("deleteToDo", todoListId);
        break;
    }
  };

  //수정
  toDoEdit = (e) => {
    console.log(e.target.className);
    if (e.target.className !== "view" && e.target.className !== "label") return;

    const todoListId = e.target.closest("li").id;
    const thisToDo = document.getElementById(todoListId);

    thisToDo.className = "editing";
    thisToDo.querySelector(".edit").select();
  };

  toDoKeyup = (e) => {
    if (e.target.className !== "edit") return;
    const todoId = e.target.closest(".todoapp-container").id;
    const todoListId = e.target.closest("li").id;
    const thisToDo = document.getElementById(todoListId);

    switch (e.key) {
      case "Enter":
        if (!validateInput(e.target.value)) {
          return;
        }
        store.dispatch("editToDo", {
          todoId: todoId,
          itemId: todoListId,
          contents: e.target.value,
        });
        thisToDo.className = "";
        break;
      case "Escape":
        thisToDo.className = "";
        break;
    }
  };

  setPriority = (e) => {
    if (e.target.nodeName !== "SELECT") return;

    const optionValue = e.target.options[e.target.selectedIndex].value;
    let priority = "";
    switch (optionValue) {
      case "0":
        return;
      case "1":
        priority = "FIRST";
        break;
      case "2":
        priority = "SECOND";
        break;
    }

    const todoId = e.target.closest(".todoapp-container").id;
    const todoListId = e.target.closest("li").id;

    store.dispatch("setPriority", {
      todoId: todoId,
      itemId: todoListId,
      priority: priority,
    });
  };

  toDoFilter = (e) => {
    if (e.target.nodeName !== "A") return;
    const todoClassName = e.target.getAttribute("href");
    const buttonName = todoClassName.substring(1, todoClassName.length);

    if (
      buttonName !== "all" &&
      buttonName !== "priority" &&
      buttonName !== "active" &&
      buttonName !== "completed"
    )
      return;
    
    store.dispatch("setFilterType", buttonName);
  };

  

  render() {
    if (!store.state.kanbanList.members) return;

    this.element.innerHTML = `
        ${store.state.kanbanList.members
          .map((member) => {
            return todoList(member, store.state.filterType);
          })
          .join("")}

          <div class="add-team-button-container">
            <button id="add-team-button" class="ripple">
              <span class="material-icons">add</span>
            </button>
          </div>
        `;
  }

  setEvent(target) {
    //팀 추가
    target.addEventListener("click", (e) => {
      this.addTeam(e);
    });
    //todo추가
    target.addEventListener("keyup", (e) => {
      this.addToDo(e);
    });
    //토글, 삭제
    target.addEventListener("click", (e) => {
      this.toDoClick(e);
    });
    //수정
    target.addEventListener("dblclick", (e) => {
      this.toDoEdit(e);
    });
    target.addEventListener("keyup", (e) => {
      this.toDoKeyup(e);
    });
    //우선순위
    target.addEventListener("click", (e) => {
      this.setPriority(e);
    });
    //filter
    target.addEventListener("click", (e) => {
      this.toDoFilter(e);
    });
  }
};
export default KanbanList;
