const configuration = {
  specs: {
    so_size: 150,
    total_mem: 800,
  },
  algorithm: "FCFS",
  process: [
    {
      id: 1,
      arrival_time: 0,
      irruption_time: 10,
      size: 100,
    },
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
  ],
};

const { so_size, total_mem } = configuration.specs;

const runFCFS = () => {
  const gant = [];
  // Vamos a suponer que los procesos están ordenados por
  // tiempo de arribo.
  configuration.process.forEach((process) => {
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

switch (configuration.algorithm) {
  case "FCFS":
    runFCFS();
    break;
  default:
    break;
}
