import { request, option } from "./api.js";
const BASE_URL = "https://js-todo-list-9ca3a.df.r.appspot.com";

export const api = {
  loadToDos: () => {
    return request(`${BASE_URL}/api/users`);
  },

  addUser: (contents) => {
    return request(`${BASE_URL}/api/users`, option.post(contents));
  },

  selectUserToDo: (userId) => {
    return request(`${BASE_URL}/api/users/${userId}`);
  },

  deleteUser: (userId) => {
    return request(`${BASE_URL}/api/users/${userId}`, option.delete());
  },


 


  //TEAM
  loadTeams: () => {
    return request(`${BASE_URL}/api/teams`);
  },

  addTeam: (teamName) => {
    return request(`${BASE_URL}/api/teams`, option.post(teamName));
  },

  deleteTeam: (teamId) => {
    return request(`${BASE_URL}/api/teams/${teamId}`, option.delete());
  },

  //KANBAN
  loadKanban: (teamId) => {
    return request(`${BASE_URL}/api/teams/${teamId}`);
  },

  addMember: (teamId, memberName) => {
    return request(`${BASE_URL}/api/teams/${teamId}/members`, option.post(memberName));
  },

  //TODO
  addToDo: (teamId, memberId, contents) => {
    return request( ///api/teams/:teamId/members/:memberId/items
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`,
      option.post(contents)
    );
  },
  
  deleteToDo: (teamId, memberId, itemId) => {
    return request(	
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      option.delete()
    );
  },

  toggleToDo: (teamId, memberId, itemId) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/toggle`,
      option.put()
    );
  },
  
  editToDo: (teamId, memberId, itemId, contents)  => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}`,
      option.put({ contents })
    );
  },

  setPriorityToDo: (teamId, memberId, itemId, priority) => {
    return request(
      `${BASE_URL}/api/teams/${teamId}/members/${memberId}/items/${itemId}/priority`,
      option.put({ priority })
    );
  },
  
  deleteAllToDo: (teamId, memberId) => {
    return request(`${BASE_URL}/api/teams/${teamId}/members/${memberId}/items`, option.delete());
  },

};
