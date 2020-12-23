import { api } from "../api/service.js";
import { message } from "../common/message.js";
import { validateResult } from "../common/validate.js";
import store from "../store/index.js";

export const actions = {
  loadUsersToDos(context) {
    context.commit("loadUsersToDos");
  },
  toggleToDo(context, payload) {
    context.commit("toggleToDo", payload);
  },
  editToDo(context, payload) {
    context.commit("editToDo", payload);
  },
  setFilterType(context, payload) {
    context.commit("setFilterType", payload);
  },
  setSelectedUserName(context, payload) {
    context.commit("setSelectedUserName", payload);
  },
  setSelectedUser(context, payload) {
    context.commit("setSelectedUser", payload);
  },
  addUser(context, payload) {
    context.commit("addUser", payload);
  },
  selectUsersToDo(context, payload) {
    context.commit("selectUsersToDo", payload);
  },
  deleteUser(context, payload) {
    context.commit("deleteUser", payload);
  },
  setPriority(context, payload) {
    context.commit("setPriority", payload);
  },
  deleteAllToDo(context) {
    context.commit("deleteAllToDo");
  },
  setIsLoading(context, payload) {
    context.commit("setIsLoading", payload);
  },
  //TEAM
  loadTeams(context) {
    context.commit("loadTeams");
  },
  addTeam(context, payload) {
    context.commit("addTeam", payload);
  },
  deleteTeam(context, payload) {
    context.commit("deleteTeam", payload);
  },
  setTeamId(context, payload) {
    context.commit("setTeamId", payload);
  },
  setToDoId(context, payload) {
    context.commit("setToDoId", payload);
  },
  //KanBan
  loadKanban(context, payload) {
    context.commit("loadKanban", payload);
  },
  addMember(context, payload) {
    context.commit("addMember", payload);
  },
  //ToDo
  addToDo(context, payload) {
    context.commit("addToDo", payload);
  },
  deleteToDo(context, payload) {
    context.commit("deleteToDo", payload);
  },
};

export const mutations = {
  loadUsersToDos: async (state) => {
    store.dispatch("setIsLoading", true);

    const userList = await api.loadToDos();

    if (validateResult(userList)) {
      state.userList = userList;
      //첫 값을 선택된 user로 세팅
      store.dispatch("setSelectedUser", userList[0]._id);
      store.dispatch("setSelectedUserName", userList[0].name);
      //해당하는 user의 todolist가져오기
      store.dispatch("selectUsersToDo", state.selectedUser);
      //로딩바 상태 변경
      store.dispatch("setIsLoading", false);
    } else {
      alert(message.failLoadUser);
      store.dispatch("setIsLoading", false);
    }
    return state;
  },

  destroyToDo: async (state, payload) => {
    const deleteToDo = await api.deleteToDo(state.selectedUser, payload);
    if (validateResult(deleteToDo)) {
      store.dispatch("selectUsersToDo", state.selectedUser);
    } else {
      alert(message.failDeleteToDo);
    }
    return state;
  },


  setFilterType: (state, payload) => {
    state.filterType = payload;
    return state;
  },

  setSelectedUserName: (state, payload) => {
    state.selectedUserName = payload;
    return state;
  },

  setSelectedUser: (state, payload) => {
    state.selectedUser = payload;
    store.dispatch("selectUsersToDo", payload);
    return state;
  },

  addUser: async (state, payload) => {
    const user = await api.addUser(payload);
    if (validateResult(user)) {
      store.dispatch("loadUsersToDos", state);
    } else {
      alert(message.failAddUser);
    }
    return state;
  },

  selectUsersToDo: async (state, payload) => {
    const userToDo = await api.selectUserToDo(payload);
    if (validateResult(userToDo)) {
      state.todos = userToDo;
    } else {
      alert(message.failLoadToDos);
    }
    return state;
  },

  deleteUser: async (state, payload) => {
    const message = await api.deleteUser(payload);
    if (validateResult(message)) {
      console.log(message.message);
      store.dispatch("loadUsersToDos", state);
    } else {
      alert(message.failDeleteUser);
    }
    return state;
  },

  deleteAllToDo: async (state) => {
    const deleteToDo = await api.deleteAllToDo(state.selectedUser);
    if (validateResult(deleteToDo)) {
      store.dispatch("loadUsersToDos", state.selectedUser);
    } else {
      alert(message.failDeleteToDoAll);
    }
    return state;
  },

  setIsLoading: (state, payload) => {
    state.isLoading = payload;
    return state;
  },

  loadTeams: async (state) => {
    const teamList = await api.loadTeams();

    if (validateResult(teamList)) {
      console.log(teamList);
      state.teamList = teamList;
    }
    return state;
  },

  addTeam: async (state, payload) => {
    const addTeam = await api.addTeam(payload);
    if (validateResult(addTeam)) {
      store.dispatch("loadTeams");
    } else {
      //메세지
    }
    return state;
  },

  deleteTeam: async (state, payload) => {
    const deleteTeam = await api.deleteTeam(payload); //teamId
    if (validateResult(deleteTeam)) {
      console.log(deleteTeam);
      store.dispatch("loadTeams");
    } else {
      //메세지
    }
    return state;
  },

  setTeamId: (state, payload) => {
    state.teamId = payload;
  },
  setToDoId: (state, payload) => {
    console.log("set");
    state.todoId = payload;
  },

  loadKanban: async (state, payload) => {
    const kanbanList = await api.loadKanban(payload);

    if (validateResult(kanbanList)) {
      console.log(kanbanList);
      state.kanbanList = kanbanList;
    }
    return state;
  },

  addMember: async (state, payload) => {
    console.log(state.teamId);
    const addTeam = await api.addMember(state.teamId, payload);
    if (validateResult(addTeam)) {
      store.dispatch("loadKanban", state.teamId);
    } else {
      //메세지
    }
    return state;
  },

  //TODO

  addToDo: async (state, payload) => {
    const userToDo = await api.addToDo(state.teamId, state.todoId, payload);
    if (validateResult(userToDo)) {
      store.dispatch("loadKanban", state.teamId);
    } else {
      alert(message.failAddToDo);
    }
    return state;
  },

  deleteToDo: async (state, payload) => {
    const deleteToDo = await api.deleteToDo(
      state.teamId,
      state.todoId,
      payload
    );
    if (validateResult(deleteToDo)) {
      store.dispatch("loadKanban", state.teamId);
    } else {
      alert(message.failDeleteToDo);
    }
    return state;
  },

  toggleToDo: async (state, payload) => {
    const toggleToDo = await api.toggleToDo(
      state.teamId,
      state.todoId,
      payload
    );
    if (validateResult(toggleToDo)) {
      store.dispatch("loadKanban", state.teamId);
    } else {
      alert(message.failToggleUser);
    }
    return state;
  },

  editToDo: async (state, payload) => {
    const editToDo = await api.editToDo(
      state.teamId,
      payload.todoId,
      payload.itemId,
      payload.contents
    );
    if (validateResult(editToDo)) {
      store.dispatch("loadKanban", state.teamId);
    } else {
      alert(message.failEditUser);
    }
    return state;
  },

  setPriority: async (state, payload) => {
    const priorityToDo = await api.setPriorityToDo(
      state.teamId,
      payload.todoId,
      payload.itemId,
      payload.priority
    );
    if (validateResult(priorityToDo)) {
      store.dispatch("loadKanban", state.teamId);
    } else {
      alert(message.failPriorityUser);
    }
    return state;
  },
};
