<!-- @format -->

// datos a mostrar en pantalla
<template>
  <main class="container">
    <!-- <p>Jugador</p>-->
    <!-- el puntaje que vas obteniendo -->
    <div class="score">
      <p>Score: {{ score }}</p>
      <!-- las oportunidades que te quedan -->
      <p>Vidas: {{ oportunidades }}</p>
    </div>
    <!-- la imagen de la pokebola que hace funcion de cargando se maneja con un v-if para indicar que esta cargando el juegouna vez que cargue  pasa al else -->
    <img
      v-if="!pokemon"
      src="../assets/pokeball.png"
      alt="Cargando"
      class="cargando"
    />
    <!-- en caso de que ya haya cargado se ejecut el v-else -->
    <div v-else>
      <h1>¿Quién es el pokémon?</h1>
      <!-- Imagen del pokemon  se le manda el id de la imagen-->
      <PokemonPictures :pokemonId="pokemon.id" :showPokemon="showPokemon" />

      <!--4 opciones a mostrar-->
      <!-- se hace el binding de un elemento al que llamamos pokemons y le pasamos el pokemon array que tenemos en la data -->
      <PokemonOptions :pokemons="pokemonArr" @selection="checkAnswer" />
      <div v-if="showAnswer">
        <h2>{{
          message
        }}</h2>
      </div>
      <button v-if="oportunidades === 0" @click="newGame">Nuevo juego</button>

      <!-- Puntaje máximo -->
    </div>
    <p class="record"> Record: {{ record }}</p>
  </main>
</template>

<script>
// importamos el componente PokemonPictures para poderlo usar
import PokemonPictures from "@/components/PokemonPictures";
// importamos PokemonOptions para poderlo usar
import PokemonOptions from "@/components/PokemonOptions";
// importamos la funcion getPokemonsOptions que esta en el archivo pokemonsArray para poder usarla
import getPokemonOptions from "../js/pokemonsArray";

// console.log(getPokemonsOptions());

export default {
  components: { PokemonPictures, PokemonOptions },
  // se define el metodo data que retorna el objeto reactivo con todos los elementos que manejamos en la lógica para despues pasarlos al template y hagan su funcion
  data() {
    return {
      pokemonArr: [], //arreglo que contiene los cuatro pokemones
      pokemon: null, //pokemon que sera el de la imagen
      //propiedad que muestra el pokemon a color
      showPokemon: false,
      showAnswer: false,
      message: "",
      score: 0,
      oportunidades: 3,
      record: 0,
    };
  },
  //utilizamos los methods para crear la lógica de nuestros elementos que se usaran para las opciones
  methods: {
    // este metodo debe ser asincrono ya que en el componente se maneja asincrono, por lo que no funciona si no se maneja asi
    //indicamos que el pokemonArr que declaramos en esta seccion contendra la funcion de getPokemonOptions que importamos del archivo de pokemonsArray
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();

      //declaramos una variable que tendra un numero aleatorio del 1 al 4
      const rndInt = Math.floor(Math.random() * 4);
      //el elemento de la data  pokemon cambia de valor null a el arreglo de pokes en posicion aleatoria del 1 al 4
      this.pokemon = this.pokemonArr[rndInt];
    },
    //creamos una funcion que servira para trabajar el pokemon seleccionado en el pokemon options y mostrarlo en un parrafo ya sea que es correcto o no
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
      if (this.oportunidades > 0) {
        setTimeout(this.newGame, 1000);
      }
    },
    newGame() {
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemonArr = [];
      this.pokemon = null;
      this.mixPokemonArray();
      if (this.oportunidades === 0) {
        this.oportunidades = 3;
        if (this.score > this.record) {
          this.record = this.score;
          this.score = 0;
        }
      }
      // localStorage.setItem("pokemons", JSON.stringify(this.record));
    },
  },

  // created() {
  //   const newRecord = JSON.parse(localStorage.getItem("pokemons"));
  //   if (newRecord === null) {
  //     this.record = score;
  //   } else {
  //     this.record = newRecord;
  //   }
  // },

  //se crea el mounted ya que en este ejemplo lo que deseamos es que nuestro juego inicie una vez se abre la página
  mounted() {
    this.mixPokemonArray();
    if (localStorage.record) {
      this.record = localStorage.record;
    }
  },
  watch: {
    record(newRecord) {
      localStorage.record = newRecord;
    },
  },
};
</script>
