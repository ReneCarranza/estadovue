<template>
  <div class="p-8 overflow-x-auto w-full">
    <h2> Nombre Proyecto: {{ proyectoActual?.nombre }}</h2>

    <div class="mt-4">
      <input v-model="nuevaTarea" type="text" placeholder="Agregar nueva tarea" 
      class="input input-borderd mr-2"/>
      <button @click="agregarTarea" class="btn btn-primary">Agregar</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Completada</th>
          <th>Tarea</th>
          <th>Fecha y hora de Registro</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="tarea, index in proyectoActual?.tareas" :key="index">
          <td> {{ index + 1 }}</td>
          <td>
            <input
            type="checkbox"
            :checked="tarea.completada"
            />
          </td>
          <td>{{ tarea.nombre }}</td>
          <td>
            sdffsd
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>

import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProyectosStore } from '../store/projects.store';
const proyectosStore = useProyectosStore();

const route = useRoute();
const nuevaTarea = ref('');

const proyectoActual = computed(() =>
  proyectosStore.proyectos.find((proyecto) => proyecto.id === route.params.id)
);



const agregarTarea = () => {
    if (nuevaTarea.value.trim() !== '') {
      proyectosStore.agregarTarea(route.params.id as string, nuevaTarea.value.trim());
      nuevaTarea.value = '';
    }
  };
</script>