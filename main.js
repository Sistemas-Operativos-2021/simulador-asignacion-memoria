import { runFCFS } from "./cpuScheduling/FCFS.js";

const configuration = {
  specs: {
    so_size: 150,
    total_mem: 800,
  },
  algorithm: "FCFS",
  process: [
    {
      id: 2,
      arrival_time: 1,
      irruption_time: 5,
      size: 150,
    },
    {
      id: 3,
      arrival_time: 2,
      irruption_time: 4,
      size: 250,
    },
    {
      id: 1,
      arrival_time: 0,
      irruption_time: 10,
      size: 100,
    },
  ],
};

switch (configuration.algorithm) {
  case "FCFS":
    runFCFS(configuration);
    break;
  default:
    break;
}
