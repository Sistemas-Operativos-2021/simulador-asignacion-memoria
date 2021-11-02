const bestFitPartition = (memory, process) => {
    // The memory has to be sorted by size.
    const memoryIndex = memory.findIndex((partition) => (!partition.isInUse && process.size <= partition.size))
    return { memoryIndex, processId: process.id }
}

export default bestFitPartition