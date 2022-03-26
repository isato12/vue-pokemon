<!-- @format -->

<template>
  <div class="options-container">
    <!-- se agrega nuestro listado con un v-for para recorrer el arreglo de los pokemones -->
    <ul>
      <li
        v-for="pokemon in pokemons"
        :key="pokemon.id"
        @click="$emit('selection', pokemon.id)"
      >
        {{ pokemon.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  //se crea el props para indicar que recibiremos el elemento pokemons que es un objeto tpo array y es requerido
  props: {
    pokemons: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style>
.options-container {
  width: 100%;
  display: flex;
  justify-content: center;
}

ul {
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
}
li {
  width: 300px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin: 10px auto;
  font-size: 25px;
  padding: 3px 5px;
}

li:hover {
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
}
li:active {
  background-color: green;
}
</style>
