import { sortProcessesArrayByTA } from "../utils/sortProcessesArrayByTA.js";

export const runFCFS = (configuration) => {
    const { so_size, total_mem } = configuration.specs;

    const gant = [];
    // Vamos a ordenar los procesos por tiempo de arribo.
    const processesArraySorted = sortProcessesArrayByTA(configuration.process) 
  
    processesArraySorted.forEach((process) => {
      gant.push(process);
    });
  
    // De acuerdo al gant resultante vamos a iterarlo para la
    // asignacion de la memoria.
    const partitions = [];
  
    let free_mem = total_mem - so_size;
  
    try {
      gant.forEach((process, index) => {
        if (free_mem >= process.size) {
          free_mem -= process.size;
  
          const last_end_address =
            index > 0 ? partitions[index - 1].address_end : so_size;
          partitions.push({
            process_id: process.id,
            size_partition: process.size,
            address_initial: last_end_address + 1,
            address_end: last_end_address + process.size,
          });
          console.log("Time", index);
          console.table(partitions);
          if (index + 1 !== gant.length) console.log("-".repeat(100));
        } else {
          throw new Error(`Error de direccionamiento con proceso: ${process.id}`);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  