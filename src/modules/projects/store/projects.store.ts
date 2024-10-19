import { defineStore } from 'pinia';

export const useProyectosStore = defineStore('proyectos', {
   state:() => ({
    proyectos: [] as { nombre: string; tareas: number; progreso: number } [],
   }),
   actions: {
    agregarProyecto(nombreProyecto: string){
        this.proyectos.push({ nombre: nombreProyecto, tareas: 0, progreso: 0 });
    },
    incrementarTareas(i: number){
        const proyecto = this.proyectos[i];
        if (proyecto && proyecto.tareas <10 ){
            proyecto.tareas +=1;
            //LLAMO A MI FUNCION PARA QUE SE ACTUALIZE AUTOMATICAMENTE CUANDO COMPLETO UNA TAREA
            this.actualizarProgreso(i);
        }
    },
    actualizarProgreso(i: number){
       const proyecto = this.proyectos[i];
       if (proyecto) {
        proyecto.progreso = (proyecto.tareas /10) * 100;
       }
    }
   } 
});
