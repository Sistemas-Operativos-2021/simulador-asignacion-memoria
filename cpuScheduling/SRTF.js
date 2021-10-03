import { sortObjectArray } from "../utils/sortObjectArray.js";
import { sortProcessesArrayByTA } from "../utils/sortProcessesArrayByTA.js";

export const runSRTF = (configuration) => {
  const { memoryPartitions } = configuration;
  const memoryPartitionsSortedBySize = JSON.parse(
    JSON.stringify(sortObjectArray(memoryPartitions, "size"))
  );
  const gant = [];
  // Vamos a ordenar los procesos por tiempo de arribo.
  const totalClock = configuration.process.reduce(
    (acc, current) => acc + current.irruption_time,
    0
  );

  // We sort the entire processes list by arrived time.
  const processes = sortProcessesArrayByTA(configuration.process);

  // Building the gant digram.
  let newProcessesQueue = [];
  let readyProcessesQueue = [];
  let suspendedProcessesQueue = [];

  // const readyQueue = JSON.parse(JSON.stringify(processesArraySortedByTA));

  const currentMemoryMonitor = JSON.parse(
    JSON.stringify(memoryPartitionsSortedBySize)
  );

  let executingProcess = {
    id: null,
    arrival_time: null,
    irruption_time: null,
    size: null,
  };

  for (let currentClock = 0; currentClock < totalClock; currentClock++) {
    // Check If Exist An Arrived Process at currentClock
    const processesWhichHaveArrived = processes.filter(
      (process) => process.arrival_time === currentClock
    );
    newProcessesQueue = [...newProcessesQueue, processesWhichHaveArrived];

    // Check if there is free space into RAM.
    // If there is free space move the process to ReadyQueue
    // If there in no free space stay into new processes queue.
    newProcessesQueue.forEach((newProcess) => {
      const memoryPartitionsAvailable = currentMemoryMonitor.filter(
        (freePartition) => !freePartition.isInUse
      );
      memoryPartitionsAvailable.forEach((partition, index) => {
        if (partition.size >= newProcess.size) {
          // If there is some process executing then push to ready queue because the CPU is in use
          if (executingProcess.id) {
            readyProcessesQueue.push(newProcess);
          } else {
            executingProcess = JSON.parse(JSON.parse(newProcess));
          }

          currentMemoryMonitor[index].isInUse = true;
          currentMemoryMonitor[index].idProcess = newProcess.id;
        }
      });
    });

    const shortestITReadyQueue = sortObjectArray(
      readyProcessesQueue,
      "irruption_time"
    )[0];

    const shortestIT =
      shortestITReadyQueue[0].irruption_time < executingProcess.irruption_time
        ? shortestITReadyQueue[0]
        : executingProcess;

    const shortestITIndex = currentMemoryMonitor.findIndex(
      (processIntoQueue) => processIntoQueue.idProcess === shortestIT.id
    );

    gant.push(JSON.parse(JSON.stringify(shortestIT)));

    console.log("-".repeat(100));

    console.log("Time", currentClock);
    console.table(readyQueue);
    console.table(gant);
    console.log("-".repeat(100));
    currentMemoryMonitor[shortestITIndex].irruption_time =
      currentMemoryMonitor[shortestITIndex].irruption_time - 1;

    if (currentMemoryMonitor[shortestITIndex].irruption_time === 0) {
      currentMemoryMonitor[shortestITIndex].idProcess = null;
    }
  }
};
