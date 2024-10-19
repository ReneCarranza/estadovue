import { defineStore } from 'pinia';

export const useProyectosStore = defineStore('proyectos', {
   state:() => ({
    proyectos: [] as { nombre: string; tareas: number; progreso: number } [],
   }),
   actions: {
    agregarProyecto(nombreProyecto: string){
        this.proyectos.push({ nombre: nombreProyecto, tareas: 0, progreso: 0 });
    },
   } 
});
