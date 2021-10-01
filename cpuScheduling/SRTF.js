import { sortObjectArray } from "../utils/sortObjectArray.js";
import { sortProcessesArrayByTA } from "../utils/sortProcessesArrayByTA.js";

const checkIfMemoryIsFull = () => {};

export const runSRTF = (configuration) => {
  const { memoryPartitions } = configuration;

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

  for (let currentClock = 0; currentClock < totalClock; currentClock++) {
    // Check If Exist An Arrived Process at currentClock
    const processesWhichHaveArrived = processes.filter(
      (process) => process.arrival_time === currentClock
    );
    newProcessesQueue = [...newProcessesQueue, processesWhichHaveArrived];

    newProcessesQueue.forEach((newProcess) => {});

    // const processesWhichHaveArrived = processes.filter(
    //   (process) => process.arrival_time <= currentClock
    // );

    const shortestIT = sortObjectArray(
      processesWhichHaveArrived,
      "irruption_time"
    )[0];

    const shortestITIndex = readyQueue.findIndex(
      (processIntoQueue) => processIntoQueue.id === shortestIT.id
    );
    gant.push(JSON.parse(JSON.stringify(shortestIT)));

    console.log("-".repeat(100));

    console.log("Time", currentClock);
    console.table(readyQueue);
    console.table(gant);
    console.log("-".repeat(100));
    readyQueue[shortestITIndex].irruption_time =
      readyQueue[shortestITIndex].irruption_time - 1;

    if (readyQueue[shortestITIndex].irruption_time === 0) {
      readyQueue.splice(shortestITIndex, 1);
    }
  }

  // De acuerdo al gant resultante vamos a iterarlo para la
  // asignacion de la memoria.
  // const partitions = [];

  // let free_mem = total_mem - so_size;
  // try {
  //   gant.forEach((process, index) => {
  //     if (free_mem >= process.size) {
  //       free_mem -= process.size;

  //       const last_end_address =
  //         index > 0 ? partitions[index - 1].address_end : so_size;
  //       partitions.push({
  //         process_id: process.id,
  //         size_partition: process.size,
  //         address_initial: last_end_address + 1,
  //         address_end: last_end_address + process.size,
  //       });
  //       console.log("Time", index);
  //       console.table(partitions);
  //       if (index + 1 !== gant.length) console.log("-".repeat(100));
  //     } else {
  //       throw new Error(`Error de direccionamiento con proceso: ${process.id}`);
  //     }
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
};
