import { ApiResponse } from "@ecoflow/types";
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const isRestartingServer = atomWithStorage("serverStatusRestart", false);
const isClosedServer = atomWithStorage("serverStatusClose", false);
const serverRestartedResponse = atom<ApiResponse>({});

export { isClosedServer, isRestartingServer, serverRestartedResponse };
