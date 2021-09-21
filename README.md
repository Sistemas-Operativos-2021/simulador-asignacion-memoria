# Simulador de Asignación de Memoria y

## Planificación de procesos

El objetivo de esta práctica consiste en la implementación de un simulador que permita mostrar 
los aspectos de la Planificación de Procesos a Corto Plazo y la gestión de la memoria con 
particiones Fijas dentro de un esquema de un solo procesador, tratando el ciclo de vida 
completo de un proceso desde su ingreso al sistema hasta su finalización.

### Consigna:
Implementar un simulador de asignación de memoria y planificación de procesos según los 
siguientes requerimientos.

El simulador deberá brindar la posibilidad de cargar N procesos. Para facilitar la implementación
se permitirán como máximo 10 procesos y la asignación de memoria se realizará con 
particiones fijas. El esquema de particiones será el siguiente:

* 100K destinados al Sistema Operativo
* 250K para trabajos los más grandes.
* 120K para trabajos medianos .
* 60K para trabajos pequeños.

El programa debe permitir ingreso nuevos procesos cuando sea posible (manteniendo un grado 
de multiprogramación adecuado) La política de asignación de memoria será Best-Fit, por cada 
proceso se debe ingresar o leer de un archivo el Id de proceso, tamaño del proceso, tiempo de 
arribo y tiempo de irrupción. La planificación de CPU será gobernada por un algoritmo SRTF 
(SJF preemtible).

El simulador deberá presentar como salida lo siguiente: 
* El estado del procesador (proceso que se encuentra corriendo en ese instante)
* La tabla de particiones de memoria, la cual deberá contener (Id de partición, dirección de comienzo
de partición, tamaño de la partición, id de proceso asignado a la partición, fragmentación interna). 
* El estado de la cola de procesos listos

### Video explicativo:
El simulador deberá estar acompañado de un video explicativo, desarrollado por el grupo, donde se 
exponga el funcionamiento del simulador (10 minutos como máximo) con una explicación, al inicio, 
sobre los conceptos teóricos involucrados (5 minutos como máximo). 

### Consideraciones:
* Las presentaciones de salida deberán realizarse cada vez que llega un nuevo proceso o se termina
un proceso en ejecución. 
* No se permiten corridas ininterrumpidas de simulador, desde que se inicia la simulación hasta que
* El trabajo deberá ser implementado por equipos de trabajo.
* El programa deberá ser implementado, preferentemente, en lenguaje C o Python (consultar por 
otros lenguajes a utilizar)
* No es necesario realizar el simulador con entorno gráfico.

Se realizarán presentaciones de avances, antes de la entrega final, las cuales serán consideradas
obligatorias ya que conformarán el coloquio del TPI. Las fechas estipuladas son:
- 23/9
- 30/9 o 1/10
- 11/11
- 19/11
- La entrega final será el 27 de noviembre.
- El coloquio de defensa del TPI se llevará a cabo el 2/12 o 3/12 (a confirmar para cada grupo)