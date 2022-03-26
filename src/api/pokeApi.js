/** @format */

//solo se hace la peticion a la api con axios
import axios from "axios";

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
});

export default pokeApi;
