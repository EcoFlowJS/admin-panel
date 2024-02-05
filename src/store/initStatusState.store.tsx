import { atom } from "jotai";

const initStatusState = atom({
  isAuth: false,
  isNew: false,
  isLoggedIn: false,
  userID: undefined,
});

export default initStatusState;
