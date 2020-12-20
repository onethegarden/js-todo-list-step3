import store from './store/index.js';

import TeamList from './components/teamList/teamList.js';

const teamInstance = new TeamList();

teamInstance.render();

store.dispatch('loadTeams');

const $addTeamButton = document.querySelector('#add-team-button')
$addTeamButton.addEventListener('click', () => {
  const result = prompt('팀 이름을 입력해주세요')
})

