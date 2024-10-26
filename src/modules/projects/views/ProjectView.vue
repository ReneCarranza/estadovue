<template>
    <h2> Nombre Proyecto: {{ proyecto.nombre }}</h2>
</template>

<script lang="ts" setup>

import { useProyectosStore } from '../store/projects.store';
const proyectosStore = useProyectosStore();

</script>