<template>
  <main class="container">
    <!-- <p>Jugador</p>-->
    <div class="score">
      <p>Score: {{ score }}</p>

      <p>Vidas: {{ oportunidades }}</p>
    </div>
    <img
      v-if="!pokemon"
      src="../assets/pokeball.png"
      alt="Cargando"
      class="cargando"
    />

    <div v-else>
      <h1>¿Quién es el pokémon?</h1>
      <!-- Imagen -->
      <PokemonPictures :pokemonId="pokemon.id" :showPokemon="showPokemon" />
      <!-- opciones -->

      <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />
      <div v-if="showAnswer">
        <h2>{{ message }}</h2>
        <button @click="newGame()">Nuevo juego</button>
      </div>
      <!-- Puntaje máximo -->
    </div>
    <p class="record">{{ record }}</p>
  </main>
</template>

<script>
import PokemonPictures from "@/components/PokemonPictures";
import PokemonOptions from "@/components/PokemonOptions";

import getPokemonsOptions from "../js/pokemonsArray";

// console.log(getPokemonsOptions());

export default {
  components: { PokemonPictures, PokemonOptions },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
      score: 0,
      oportunidades: 3,
      record: 0,
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonsOptions();

      const rndInt = Math.floor(Math.random() * 4);

      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(pokemonId) {
      this.showPokemon = true;
      this.showAnswer = true;

      if (pokemonId === this.pokemon.id) {
        this.message = `¡Correcto! ${this.pokemon.name}`;
        this.score++;
      } else {
        this.message = `El pokemon era ${this.pokemon.name}`;
        this.oportunidades--;
      }
      setTimeout(this.newGame, 1000);
    },
    newGame() {
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemonArr = [];
      this.pokemon = null;
      this.mixPokemonArray();
      if (this.oportunidades === 0) {
        this.score = 0;
        this.oportunidades = 3;
        if (this.score > this.record) {
          this.record = this.score;
        }
      }
    },
  },
  watch: {
    record(newRecord) {
      localStorage.record = newRecord;
    },
  },
  mounted() {
    this.mixPokemonArray();
    if (localStorage.this.record) {
      this.record = localStorage.record;
    }
  },
};
</script>
