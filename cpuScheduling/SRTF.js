import bestFitPartition from "../utils/bestFit.js";
import sortObjectArray from "../utils/sortObjectArray.js";
import sortProcessesArrayByTA from "../utils/sortProcessesArrayByTA.js";

const initialRunningState = {
  id: null,
  arrival_time: null,
  irruption_time: null,
  size: null,
}


export const runSRTF = (configuration) => {

  const processesOrderedByTA = sortProcessesArrayByTA(configuration.processes)
  const totalClock = processesOrderedByTA.reduce(
    (acc, current) => acc + current.irruption_time,
    0
  );
  const memory = [...configuration.memoryPartitions]

  const readyState = []
  const readySuspendState = []
  const finishState = []
  const gant = []
  let runningState = {
    id: null,
    arrival_time: null,
    irruption_time: null,
    size: null,
  }

  for (let clock = 0; clock < totalClock; clock++) {

    // In this line I have the new state according to the arrival time.
    const newState = configuration.processes.filter(process => process.arrival_time === clock)
    // If there is some free space, we will check newState and readySuspendState 
    if (memory.some(partition => !partition.isInUse)) {

      // ReadySuspendState treatment: I have to check if I have free space in the RAM.
      // If I don't have enough space I will do nothing
      // Otherwise, readyState
      const indexOfProcessesToRemoveIntoReadySuspendState = []
      readySuspendState.forEach(process => {
        const { memoryIndex, processId } = bestFitPartition(memory, process)
        if (memoryIndex !== -1) {
          memory[memoryIndex].isInUse = !memory[memoryIndex].isInUse
          memory[memoryIndex].usedSpace = memory[memoryIndex].usedSpace - process.size
          memory[memoryIndex].idProcess = process.id
          readyState.push(process)
          const processIndexIntoReadySuspendState = readySuspendState.findIndex(process => process.id === processId)
          indexOfProcessesToRemoveIntoReadySuspendState.push(processIndexIntoReadySuspendState)
        }
      })
      indexOfProcessesToRemoveIntoReadySuspendState.forEach(processIndex => readySuspendState.splice(processIndex, 1))


      // NewState treatment: I have to check if I have free space in the RAM.
      // If I don't have enough space I will send the process to ReadySuspendState
      // Otherwise, readyState
      const indexOfProcessesToRemoveIntoNewState = []
      newState.forEach(process => {
        const { memoryIndex, processId } = bestFitPartition(memory, process)

        if (memoryIndex !== -1) {
          memory[memoryIndex].isInUse = !memory[memoryIndex].isInUse
          memory[memoryIndex].usedSpace = memory[memoryIndex].usedSpace - process.size
          memory[memoryIndex].idProcess = process.id
          readyState.push(process)
          const processIndexIntoNewState = newState.findIndex(process => process.id === processId)
          indexOfProcessesToRemoveIntoNewState.push(processIndexIntoNewState)
        } else {
          readySuspendState.push(process)
        }
      })
      indexOfProcessesToRemoveIntoNewState.forEach(processIndex => newState.splice(processIndex, 1))
    }

    // Ready State treatment.

    const shortestITIntoReadyState = sortObjectArray(
      readyState,
      "irruption_time"
    )[0];

    // Compare irruption time between Running State and Ready State
    let shortestIT
    if (!runningState.id) {
      shortestIT = shortestITIntoReadyState

      const runningStateIndexIntoReadyState = readyState.findIndex(process => process.id === shortestIT.id)
      if (runningStateIndexIntoReadyState !== -1) {
        readyState.splice(runningStateIndexIntoReadyState, 1)
      }

    } else if (shortestITIntoReadyState?.irruption_time < runningState.irruption_time) {
      shortestIT = shortestITReadyState
      const runningStateIndexIntoReadyState = readyState.findIndex(process => process.id === shortestIT.id)
      if (runningStateIndexIntoReadyState !== -1) {
        readyState.splice(runningStateIndexIntoReadyState, 1)
      }
    } else {
      shortestIT = runningState
    }


    runningState = shortestIT
    console.log({ totalClock, clock, newState, readySuspendState, readyState, memory, runningState, gant })
    gant.push(shortestIT);

    runningState.irruption_time = runningState.irruption_time - 1






    if (runningState.irruption_time === 0) {
      finishState.push(runningState)
      const runningStateIndexIntoMemory = memory.findIndex(partition => partition.idProcess === runningState.id)
      memory[runningStateIndexIntoMemory].idProcess = null;
      memory[runningStateIndexIntoMemory].isInUse = false;
      memory[runningStateIndexIntoMemory].usedSpace = memory[runningStateIndexIntoMemory].size;
      runningState = initialRunningState

    }
  }
};
