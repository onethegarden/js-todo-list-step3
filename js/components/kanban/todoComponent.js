const filterButtons = {
  all: "전체보기",
  priority: "우선 순위",
  active: "해야할 일",
  completed: "완료한 일",
};

const filterTodos = (todoList, filterType) => {
  switch (filterType) {
    case "completed":
      return todoList.filter((todo) => {
        return todo.isCompleted === true;
      });

    case "active":
      return todoList.filter((todo) => {
        return todo.isCompleted === false;
      });

    case "priority":
      return todoList.sort((a, b) => {
        return //로직
      });
    default:
      return todoList;
  }
};

export const todoList = (member, filterType) =>
  `
    <li class="todoapp-container" id=${member._id}>
        <h2>
          <span><strong>${member.name}</strong>'s Todo List</span>
        </h2>
        <div class="todoapp">
          <section class="input-container">
            <input class="new-todo" placeholder="할 일을 입력해주세요." autofocus="">
          </section>
          <section class="main">
            <ul class="todo-list">
            ${
              member.todoList.length !== 0
                ? filterTodos(member.todoList, filterType)
                    .map((todo) => {
                      return todoComponent.listToDo(todo);
                    })
                    .join("")
                : todoComponent.todoMessage
            }
            </ul>
          </section>
          <div class="count-container">
            <span class="todo-count">총 <strong>${
              member.todoList.length
            }</strong> 개</span>
            
            <ul class="filters">
            ${Object.entries(filterButtons)
              .map(([type, text]) => {
                return todoComponent.filter(filterType, type, text);
              })
              .join("")}
            </ul>
            <button class="clear-completed">모두 삭제</button>
          </div>
        </div>
      </li>
    `;

export const todoComponent = {
  todoMessage: `
  <li class='todo-list-item'>
    <div class="view">
        <label class="label">
            👀 할 일을 추가해주세요 👀
        </label>
    </div>
  </li>
  `,

  listToDo: (todo) => {
    return `
  <li id ='${todo._id}' class='todo-list-item ${
      todo.isCompleted == true ? "completed" : ""
    }'>
      <div class="view">
          <input class="toggle" type="checkbox" ${
            todo.isCompleted == true ? "checked" : ""
          }/>
          <label class="label">
          <div class="chip-container">
          ${
            todo.priority == "NONE"
              ? `<select class="chip select">
                  <option value="0" selected>순위</option>
                  <option value="1">1순위</option>
                  <option value="2">2순위</option>
                </select>`
              : ` <span class="chip ${
                  todo.priority == "FIRST" ? "primary" : "secondary"
                }">
              ${todo.priority == "FIRST" ? "1" : "2"}순위
            </span>`
          }
          </div>
          ${todo.contents}
          </label>
          <button class="destroy"></button>
      </div>
      <input class="edit" value="${todo.contents}" />
  </li>
  `;
  },

  filter: (filterType, type, text) => {
    return `
  <li>
    <a href="#${type}" ${
      filterType === type ? ' class="selected"' : ""
    }>${text}</a>
  </li>
  `;
  },
};
