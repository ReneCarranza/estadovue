import { defineStore } from 'pinia';

export const useProyectosStore = defineStore('proyectos', {
   state:() => ({
    proyectos: [] as { 
        id: string, 
        nombre: string; 
        tareas: { id: string; nombre: string; completada: boolean }[]; 
        progreso: number 
    }[],
   }),
   actions: {
    agregarProyecto(nombreProyecto: string){
        /*this.proyectos.push({ id: Date.now().toString(), nombre: nombreProyecto, tareas: 0, progreso: 0 });*/
        const proyecto = { 
            id: Date.now().toString(), 
            nombre: nombreProyecto, 
            tareas: [], 
            progreso: 0 };
        this.proyectos.push(proyecto);
    },
    incrementarTareas(idProyecto: string){
            const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
            if (proyecto) {
              // Agregar una tarea nueva para incrementar el conteo
              const nuevaTarea = {
                id: Date.now().toString(),
                nombre: `Tarea ${proyecto.tareas.length + 1}`,
                completada: false,
              };
              proyecto.tareas.push(nuevaTarea);
            }
    },
    actualizarProgreso(i: number){
     
    },
    agregarTarea(idProyecto: string, nombreTarea: string){
            const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
            if (proyecto) {
              // Agregar una tarea nueva para incrementar el conteo
              proyecto.tareas.push({
                id: Date.now().toString(),
                nombre: nombreTarea,
                completada: false,
              });
            }
    }
   } 
});
