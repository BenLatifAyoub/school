export interface Task {
  date: string;
  time: string;
  disc: string;
  id: any;
}

export const updateUsername = (username: string) => ({
  type: "UPDATE_USERNAME",
  payload: username,
});
export const updateEmail = (email: string) => ({
  type: "UPDATE_EMAIL",
  payload: email,
});
export const updatePassword = (password: string) => ({
  type: "UPDATE_PASSWORD",
  payload: password,
});
export const updateUser = (
  email: any,
  username: any,
  photoUrl: any,
  city: any,
  gouv: any
) => ({
  type: "UPDATE_USER",
  payload: { email, username, photoUrl, city, gouv },
});
export const addTask = (newTask: Task) => ({
  type: "ADD_TASK",
  payload: newTask,
});
export const updateTasks = (Tasks: any) => ({
  type: "UPDATE_TASKS",
  payload: Tasks,
});
export const editTask = (modifiedTask: Task) => ({
  type: "EDIT_TASK",
  payload: modifiedTask,
});
