import { runSRTF } from "./cpuScheduling/SRTF.js";

const configuration = {
  specs: {
    so_size: 150,
    total_mem: 800,
  },
  algorithm: "SRTF",
  processes: [
    {
      id: 1,
      arrival_time: 0,
      irruption_time: 10,
      size: 100,
    },
    {
      id: 2,
      arrival_time: 0,
      irruption_time: 2,
      size: 100,
    },
    {
      id: 3,
      arrival_time: 0,
      irruption_time: 1,
      size: 100,
    },
    {
      id: 4,
      arrival_time: 1,
      irruption_time: 5,
      size: 150,
    },
    {
      id: 5,
      arrival_time: 2,
      irruption_time: 4,
      size: 250,
    },
  ],
  memoryPartitions: [
    { partitionName: "Small", usedSpace: 0, size: 60, isInUse: false, idProcess: null },
    { partitionName: "Medium", usedSpace: 0, size: 120, isInUse: false, idProcess: null },
    { partitionName: "Big", usedSpace: 0, size: 250, isInUse: false, idProcess: null },
  ],
};

switch (configuration.algorithm) {
  case "SRTF":
    runSRTF(configuration);
    break;
  default:
    break;
}
