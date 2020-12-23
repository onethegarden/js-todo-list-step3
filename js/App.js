/*
import store from './store/index.js';

import Count from './components/todoList/count.js';
import List from './components/todoList/list.js';
import Input from './components/todoList/input.js';
import Filter from './components/todoList/filter.js';
import DeleteAll from './components/todoList/deleteAll.js';

import User from './components/user/user.js';
import UserName from './components/user/userName.js';

const countInstance = new Count();
const listInstance = new List();
const InputInstance = new Input();
const FilterInstance = new Filter();
const UserInstance = new User();
const DeleteAllInstance = new DeleteAll();
const UserNameInstance = new UserName();

countInstance.render();
listInstance.render();
InputInstance.render();
FilterInstance.render();
UserInstance.render();
DeleteAllInstance.render();
UserNameInstance.render();

store.dispatch('loadUsersToDos');
*/
/*
function App() {
  const $todoApps = document.querySelector('.todoapp-list-container')
  $todoApps.addEventListener('click', e => {
    const $target = e.target
    const targetClassList = $target.classList
    if (targetClassList.contains('chip')) {
      const $chipSelect = $target.closest('.chip-container').querySelector('select')
      $target.classList.add('hidden')
      $chipSelect.classList.remove('hidden')
    }
  })
  
  const $addUserButton = document.querySelector('#add-user-button')
  $addUserButton.addEventListener('click', () => {
    const result = prompt('새로운 팀원 이름을 입력해주세요')
  })
}

new App()
*/

import store from './store/index.js';
import KanbanList from './components/kanban/kanbanList.js';
var searchParams = new URLSearchParams(location.search);


const kanbanListInstance = new KanbanList();
kanbanListInstance.render();
const getTeamId = searchParams.get("teamId");

store.dispatch('setTeamId', getTeamId);
store.dispatch('loadKanban', getTeamId);