import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const initStatusState = atom({
  isAuth: false,
  isNew: false,
  isLoggedIn: false,
  userID: undefined,
});

export const isLoggedOut = atomWithStorage("isLoggedOut", false);
export const isLoggedIn = atomWithStorage("isLoggedIn", false);

export default initStatusState;
