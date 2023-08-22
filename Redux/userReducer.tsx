export interface Task {
  date: string;
  time: string;
  disc: string;
}

export interface UserState {
  username: string;
  email: string;
  password: string;
  tasks: Task[];
}

const initialState: UserState = {
  username: "",
  email: "",
  password: "",
  tasks: [],
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "UPDATE_USERNAME":
      return { ...state, username: action.payload };
    case "UPDATE_EMAIL":
      return { ...state, email: action.payload };
    case "UPDATE_PASSWORD":
      return { ...state, password: action.payload };
    case "UPDATE_USER":
      return {
        ...state,
        email: action.payload.email,
        username: action.payload.username,
        password: action.payload.password,
      };
    case "ADD_TASK":
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;
