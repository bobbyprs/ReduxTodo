import Action from "../actions/action";
export default function reducer(state = [], action) {
  switch (action.type) {
    case Action.ADD_ITEM: {
      return { ...state, workList: [...state.workList, action.payload] };
    }
    case Action.EDIT_ITEM: {
      const { index, edit } = action.payload;
      return {
        ...state,
        workList: [
          ...state.workList.slice(0, index),
          edit,
          ...state.workList.slice(index + 1)
        ]
      };
    }
    case Action.DELETE_ITEM: {
      return {
        ...state,
        workList: [
          ...state.workList.slice(0, action.payload),
          ...state.workList.slice(action.payload + 1)
        ]
      };
    }
    case Action.LOGIN_DETAILS: {
      localStorage.setItem("fname", action.payload.fname);
      return { ...state, authCredentials: action.payload };
    }
    case Action.LOGOUT_DETAILS: {
      localStorage.clear();
      return {
        ...state,
        authCredentials: { fname: null, password: null, email: null }
      };
    }

    default:
      return state;
  }
}
