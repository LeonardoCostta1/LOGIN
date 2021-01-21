const user = [
  {
    email: "EMAIL INVALIDO",
    name: "NOME INVALIDO",
  },
];

const userReducer = (state = user, action)=>{
  switch (action.type) {
    case "GET_USER":
      return (state = [action.payload]);
    default:
      return state;
  }
}

export default userReducer;