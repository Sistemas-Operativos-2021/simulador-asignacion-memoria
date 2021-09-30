import { sortObjectArray } from "../utils/sortObjectArray.js";
import { sortProcessesArrayByTA } from "../utils/sortProcessesArrayByTA.js";

export const runSRTF = (configuration, multiProg) => {
  const { so_size, total_mem } = configuration.specs;
  
  const multiProgLevel = Array(multiProg);
  const suspend = [];
  const gant = [];

  // Inicializa el clock general 
  const totalClock = configuration.process.reduce(
    (acc, current) => acc + current.irruption_time,
    0
  );
 
  var procesosRestantes = totalProcess;

  // Ordenar los procesos por tiempo de arrivo
  const processesArraySortedByTA = sortProcessesArrayByTA(
    configuration.process
  );

  // Building the gant diagram using the Algorithm.
  const totalCola = JSON.parse(JSON.stringify(processesArraySortedByTA));

  var currentClock = 0;

    // Arranca el proceso
    while(procesosRestantes !== 0) {

      const procesosArrivadosAhora = totalCola.filter(
        (process) => process.arrival_time <= currentClock
      );

      // Se obtiene el proceso mas corto
      const elProcesoMenorIrrupcion = sortObjectArray(
        procesosArrivadosAhora,
        "irruption_time"
      )[0];

      // Se obtiene el index del proceso más corto
      const idProcesoMasCorto = procesosArrivadosAhora.findIndex(
        (processIntoQueue) => processIntoQueue.id === elProcesoMenorIrrupcion.id
      );

      if ( procesosAceptados < multiProgLevel) {
        // Si es admitido entonces se agrega a la cola, nuevamente hay que checkear si hay memoria
        readyQueue.add(elProcesoMenorIrrupcion);
      } else {
        // Si no se lo agrega a la cola de suspendidos
        suspend.add(elProcesoMenorIrrupcion)
      }

      // EJECUCION DEL PROCESADOR
      readyQueue[idProcesoMasCorto].irruption_time = readyQueue[idProcesoMasCorto].irruption_time - 1;

      // Si termina el proceso, es decir no tiene más irruption_time = 0
      if (readyQueue[idProcesoMasCorto].irruption_time === 0) {

        //Saca de la cola de listo 
        readyQueue.splice(idProcesoMasCorto, 1);
        
        // Se consigue el primer proceso de la cola de suspendidos
        procesoVieneSuspendido = suspend[0];

        // Guardar los tamaños de las particiones, y restarle el tamaño del proceso que viene
        // elegir el mas chico
        var id;
        var diff;
        for (let index = 0; index < total_memoria.size; index++) {
          if((total_memoria[index] - procesoVieneSuspendido.size) < diff) {
              id = index; 
          }
        }
          const procesoSacadoDeMemoria = total_memoria[id];
          suspend.add(procesoSacadoDeMemoria);
          readyQueue.add(procesoVieneSuspendido);
        }
        // Mostrar la fragmentación interna
      }
      currentClock++;
    }



   /**
  //for (let currentClock = 0; currentClock < totalClock; currentClock++) {

    const processesWhichHaveArrived = readyQueue.filter(
      (process) => process.arrival_time <= currentClock
    );

    // Se obtiene el proceso con irruption_time más corto
    const shortestIT = sortObjectArray(
      processesWhichHaveArrived,
      "irruption_time"
    )[0];

    // Se obtiene el index del proceso más corto
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

      // Si termina el proceso, es decir no tiene más irruption_time = 0
    if (readyQueue[shortestITIndex].irruption_time === 0) {
      readyQueue.splice(shortestITIndex, 1);
   //  }
   //}
   */

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
