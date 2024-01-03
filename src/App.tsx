import { atom, getDefaultStore } from "jotai";
import router from "./lib/router/BrowserRouter";

const defaultStore = getDefaultStore();
console.log(defaultStore.get(atom("abcef")));

export default router;
