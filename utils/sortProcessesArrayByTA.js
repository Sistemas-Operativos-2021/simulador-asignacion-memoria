import { sortObjectArray } from "./sortObjectArray.js";

export const sortProcessesArrayByTA = (array) =>
  sortObjectArray(array, "arrival_time");
