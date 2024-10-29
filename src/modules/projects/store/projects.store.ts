import { defineStore } from 'pinia';

export const useProyectosStore = defineStore('proyectos', {
  state: () => ({
    proyectos: [] as {
      id: string;
      nombre: string;
      tareas: { 
        id: string; 
        nombre: string; 
        completada: boolean; 
        fecha: string;  
      }[];
      progreso: number;
    }[],
  }),
  
  actions: {
    agregarProyecto(nombreProyecto: string) {
      const proyecto = { 
        id: Date.now().toString(), 
        nombre: nombreProyecto, 
        tareas: [], 
        progreso: 0 
      };
      this.proyectos.push(proyecto);
    },
    
    incrementarTareas(idProyecto: string) {
      const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
      if (proyecto) {
        // Agregar una tarea nueva para incrementar el conteo
        const nuevaTarea = {
          id: Date.now().toString(),
          nombre: `Tarea ${proyecto.tareas.length + 1}`,
          completada: false,
          fecha: new Date().toLocaleString(), // Asignar fecha y hora actuales
        };
        proyecto.tareas.push(nuevaTarea);
        // Actualizar el progreso del proyecto después de agregar una tarea
        proyecto.progreso = Math.min(proyecto.tareas.length * 10, 100); // Incrementar progreso
      }
    },
    
    agregarTarea(idProyecto: string, tarea: { nombre: string; completada: boolean; fecha: string }) {
      const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
      if (proyecto) {
        // Agregar la tarea completa
        proyecto.tareas.push({
          id: Date.now().toString(),
          nombre: tarea.nombre,
          completada: tarea.completada,
          fecha: tarea.fecha,
        });
        // Actualizar el progreso del proyecto después de agregar una tarea
        proyecto.progreso = Math.min(proyecto.tareas.length * 10, 100); // Incrementar progreso
      }
    },
    
    eliminarTarea(idProyecto: string, tareaId: string) {
      const proyecto = this.proyectos.find((proyecto) => proyecto.id === idProyecto);
      if (proyecto) {
        // Filtrar las tareas para eliminar la que coincide con el id de tarea
        proyecto.tareas = proyecto.tareas.filter(tarea => tarea.id !== tareaId);
        // Actualizar el progreso del proyecto después de eliminar una tarea
        proyecto.progreso = Math.min(proyecto.tareas.length * 10, 100); // Actualizar progreso
      }
    },
    
    eliminarProyecto(idProyecto: string) {
      const index = this.proyectos.findIndex(proyecto => proyecto.id === idProyecto);
      if (index !== -1) {
        this.proyectos.splice(index, 1); // Eliminar el proyecto
      }
    },
    
    // Puedes implementar el método actualizarProgreso si necesitas
    actualizarProgreso(i: number) {
      // Implementación para actualizar el progreso si es necesario
    }
  }
});
