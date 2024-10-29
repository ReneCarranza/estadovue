<template>
  <div class="overflow-x-auto w-full">
    <table class="table">
      <!-- head -->
      <thead>
        <tr>
          <th>#</th>
          <th>Proyecto</th>
          <th>Tareas</th>
          <th>Avance</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(proyecto, i) in proyectosStore.proyectos" :key="i" class="hover">
          <th>{{ i + 1 }}</th>
          <td>
            <span v-if="!proyectoParaActualizar || proyectoParaActualizar.id !== proyecto.id">{{ proyecto.nombre }}</span>
            <input 
              v-else 
              v-model="proyectoParaActualizar.nombre" 
              type="text" 
              class="input input-bordered" 
            />
          </td>
          <td>
            <span>{{ proyecto.tareas.length }}</span>
            <button @click="addTask(i)" class="btn btn-sm btn-primary ml-2">Agregar Tarea</button>
          </td>
          <td>
            <progress :value="proyecto.progreso" class="progress progress-primary w-56" max="100"></progress>
            {{ proyecto.progreso.toFixed(2) }}%
          </td>
          <td>
            <button 
              v-if="!proyectoParaActualizar || proyectoParaActualizar.id !== proyecto.id" 
              @click="prepararActualizacion(proyecto)" 
              class="btn btn-warning btn-sm">
              Actualizar
            </button>
            <button 
              v-else 
              @click="actualizarProyecto(proyecto.id)" 
              class="btn btn-success btn-sm">
              Guardar
            </button>
            <button 
              v-if="proyectoParaActualizar && proyectoParaActualizar.id === proyecto.id" 
              @click="cancelarActualizacion" 
              class="btn btn-secondary btn-sm">
              Cancelar
            </button>
            <button 
              @click="eliminarProyecto(proyecto.id)" 
              class="btn btn-danger btn-sm ml-2">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <input-modal
    :open="modalOpen"
    @close="modalOpen = false"
    @value="onNewValue"
    placeholder="Ingrese el nombre del proyecto"
    title="Nuevo proyecto"
    sub-title="Dale un nombre único a tu proyecto"
  />

  <custom-modal :open="customModalOpen">
    <template #header>
      <h1 class="text-3xl">Titulo del modal</h1>
    </template>

    <template #body>
      <p>
        Nulla consequat non ullamco mollit est quis duis pariatur cupidatat consequat Lorem cillum.
      </p>
    </template>

    <template #footer>
      <div class="flex justify-end">
        <button @click="customModalOpen = false" class="btn mr-4">Close</button>
        <button @click="customModalOpen = false" class="btn btn-primary">Aceptar</button>
      </div>
    </template>
  </custom-modal>

  <fab-button @click="modalOpen = true">
    <AddCircle />
  </fab-button>

  <fab-button @click="customModalOpen = true" position="bottom-left">
    <ModalIcon />
  </fab-button>
</template>

<script lang="ts" setup>
import CustomModal from '@/modules/common/components/CustomModal.vue';
import FabButton from '@/modules/common/components/FabButton.vue';
import InputModal from '@/modules/common/components/InputModal.vue';
import AddCircle from '@/modules/common/icons/AddCircle.vue';
import ModalIcon from '@/modules/common/icons/ModalIcon.vue';
import { ref } from 'vue';
import { useProyectosStore } from '../store/projects.store';

const modalOpen = ref(false);
const customModalOpen = ref(false);
const proyectosStore = useProyectosStore();
const proyectoParaActualizar = ref(null); // Referencia para el proyecto a actualizar

const onNewValue = (nombreProyecto: string) => {
  proyectosStore.agregarProyecto(nombreProyecto);
  const nuevoProyecto = proyectosStore.proyectos[proyectosStore.proyectos.length - 1];
  nuevoProyecto.progreso = Math.min(nuevoProyecto.tareas.length * 10, 100); // Ajustar progreso inicial
  modalOpen.value = false; // Cierra el modal después de agregar un nuevo proyecto
};

const addTask = (index) => {
  const nuevoProyecto = proyectosStore.proyectos[index];
  // Simular agregar una tarea (aquí podrías pedir al usuario el nombre de la tarea)
  nuevoProyecto.tareas.push({
    id: Date.now().toString(),
    nombre: `Tarea ${nuevoProyecto.tareas.length + 1}`,
    completada: false,
    fecha: new Date().toLocaleString(), // Asignar la fecha y hora
  });

  // Calcular nuevo progreso
  nuevoProyecto.progreso = Math.min(nuevoProyecto.tareas.length * 10, 100); // Actualizar progreso
};

// Preparar la actualización del proyecto
const prepararActualizacion = (proyecto) => {
  proyectoParaActualizar.value = { ...proyecto }; // Clonar el proyecto
};

// Actualizar el proyecto
const actualizarProyecto = (id) => {
  const index = proyectosStore.proyectos.findIndex(p => p.id === id);
  if (index !== -1 && proyectoParaActualizar.value) {
    proyectosStore.proyectos[index].nombre = proyectoParaActualizar.value.nombre; // Actualizar nombre
    proyectoParaActualizar.value = null; // Limpiar la referencia de actualización
  }
};

// Cancelar la actualización
const cancelarActualizacion = () => {
  proyectoParaActualizar.value = null; // Limpiar la referencia de actualización
};

// Eliminar un proyecto
const eliminarProyecto = (id) => {
  proyectosStore.eliminarProyecto(id);
};
</script>
