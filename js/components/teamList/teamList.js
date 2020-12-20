import Component from "../../lib/component.js";
import store from "../../store/index.js";

const TeamList = class extends Component {
  constructor() {
    super({
      store,
      element: document.querySelector(".team-list-container"),
    });
  }

  teamClick = (e) => {
    switch (e.target.nodeName) {
      case "BUTTON":
        this.addTeam();
        return;
        case "A":
        console.log("a태그");
        return;
    }
  };

  addTeam = () => {
    const result = prompt("팀 이름을 입력해주세요");
    
    store.dispatch('addTeam', { name: result });
  };

  render() {
    this.element.innerHTML = `
        ${store.state.teamList
          .map((team) => {
            return `
            <div class="team-card-container">
              <a href="/#" class="card">
                <div class="card-title" id = "${team._id}">
                  ${team.name}
                </div>
              </a>
            </div>`;
          })
          .join("")}
        `;
    this.element.innerHTML += `
    <div class="add-team-button-container">
        <button id="add-team-button" class="ripple">
          <span class="material-icons">add</span>
        </button>
      </div>
    `;
  }

  setEvent(target) {
    target.addEventListener("click", (e) => {
      this.teamClick(e);
    });
  }
};
export default TeamList;
