export interface Task {
  date: string;
  time: string;
  disc: string;
  id: any;
}

export interface UserState {
  username: string;
  email: string;
  photoUrl: string;
  tasks: Task[];
  city: string;
  gouv: string;
}

const initialState: UserState = {
  username: "",
  email: "",
  photoUrl: "",
  tasks: [],
  city: "",
  gouv: "",
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "UPDATE_USERNAME":
      return { ...state, username: action.payload };
    case "UPDATE_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_PASSWORD":
      return { ...state, photoUrl: action.payload };
    case "UPDATE_USER":
      return {
        ...state,
        email: action.payload.email,
        username: action.payload.username,
        photoUrl: action.payload.photoUrl,
        city: action.payload.city,
        gouv: action.payload.gouv,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case "UPDATE_TASKS":
      return { ...state, tasks: action.payload };
    case "EDIT_TASK":
      const modifiedTask = action.payload;
      const modifiedTasks = state.tasks.map((task) =>
        task.id === modifiedTask.id ? modifiedTask : task
      );
      return {
        ...state,
        tasks: modifiedTasks,
      };
    default:
      return state;
  }
};

export default userReducer;
