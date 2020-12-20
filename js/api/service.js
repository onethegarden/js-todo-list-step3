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

  //TODO
  addToDo: (userId, contents) => {
    return request(
      `${BASE_URL}/api/users/${userId}/items`,
      option.post(contents)
    );
  },

  deleteToDo: (userId, itemId) => {
    return request(
      `${BASE_URL}/api/users/${userId}/items/${itemId}`,
      option.delete()
    );
  },

  editToDo: (userId, itemId, contents) => {
    return request(
      `${BASE_URL}/api/users/${userId}/items/${itemId}`,
      option.put({ contents })
    );
  },

  toggleToDo: (userId, itemId) => {
    return request(
      `${BASE_URL}/api/users/${userId}/items/${itemId}/toggle`,
      option.put()
    );
  },

  setPriorityToDo: (userId, itemId, priority) => {
    return request(
      `${BASE_URL}/api/users/${userId}/items/${itemId}/priority`,
      option.put({ priority })
    );
  },

  deleteAllToDo: (userId) => {
    return request(`${BASE_URL}/api/users/${userId}/items/`, option.delete());
  },

  //TEAM
  loadTeams: () => {
    return request(`${BASE_URL}/api/teams`);
  },

  addTeam: (teamName) => {
    return request(`${BASE_URL}/api/teams`, option.post(teamName));
  },
};
