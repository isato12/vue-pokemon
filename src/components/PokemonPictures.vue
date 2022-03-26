<!-- @format -->

<template>
  <div class="pokemon-container">
    <img :src="imgSrc" alt="Pokemon" class="hidden-pokemon" />

    <img v-if="showPokemon" :src="imgSrc" alt="Pokemon" class="fade-in" />
  </div>
</template>

<script>
export default {
  //creamos props de elemntos dinamicos que se utilizaran
  props: {
    pokemonId: {
      type: Number,
      required: true,
    },
    showPokemon: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  //obtener imagen de manera dinamica
  computed: {
    imgSrc() {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${this.pokemonId}.svg`;
    },
  },
};
</script>

<style>
.pokemon-container {
  height: 200px;
}
img {
  height: 200px;
  width: 100vw;
  margin-left: -50vw;
  position: absolute;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -webkit-user-drag: none;
}
.hidden-pokemon {
  filter: brightness(0);
}
</style>
