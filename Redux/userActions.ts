export interface Task {
  date: string;
  time: string;
  disc: string;
}

export const updateUsername = (username: string) => ({
  type: 'UPDATE_USERNAME',
  payload: username,
});
export const updateEmail = (email: string) => ({
  type: 'UPDATE_EMAIL',
  payload: email,
});
export const updatePassword = (password: string) => ({
  type: 'UPDATE_PASSWORD',
  payload: password,
});
export const updateUser = (email: any, username: any) => ({
  type: 'UPDATE_USER',
  payload: { email, username }
});
export const addTask = (newTask: Task) => ({
  type: "ADD_TASK",
  payload: newTask,
});

