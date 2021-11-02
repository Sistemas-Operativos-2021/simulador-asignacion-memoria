import sortObjectArray from "./sortObjectArray.js";

const sortProcessesArrayByTA = (array) =>
  sortObjectArray(array, "arrival_time");

export default sortProcessesArrayByTA