/** @format */

import pokeApi from "../api/pokeApi";

//creamos una funcion la cual nos devolvera un arreglo con 650 elementos vacios
const getPokemons = () => {
  //creamos el arreglo con 650 posiciones vacias
  const pokemonArr = Array.from(Array(650));

  //retornamos el arreglo el cual ya fue trabajado y obtendra el indice de cada posicion del arreglo (del 0 al 649) y el contenido del mismo (0-1,0-2, etc),porque se le coloca el + uno para no obtener el elemento cero
  return pokemonArr.map((_, index) => index + 1);
};

//creamos la funcion que exportara el arreglo de pokes
const getPokemonOptions = async () => {
  //hacemos la logica para mesclar los pokemones del arreglo utilizando el metodo .sort()el cual devuelve un arreglo ordenado y el metodo math.random el cual nos devolvera un arreglo aleatorio
  const mixpoke = getPokemons().sort(() => Math.random() - 0.5);

  //en nuestra variable de pokemons lo que hacemos es solicitar solo los primeros 4 elementos del arreglo que ya vienen co nombre del arreeglo getPokemonNames y mesclados  por la variable mixpoke
  const pokemons = await getPokemonNames(mixpoke.splice(0, 4));
  console.table(pokemons);
  return pokemons;
};

//con esta funcion obtenemos los nombres de cada pokemon

//esta funcion asincrona tiene un arreglo con cada letra la cual es el indice
const getPokemonNames = async ([a, b, c, d] = []) => {
  //esta seria la forma de llamar a un solo elemento de la api

  // const resp = await pokeApi.get(`/1`)
  // console.log(resp.data.name, resp.data.id)

  // console.log(a,b,c,d)

  //forma de llamar los cuatro elementos aleatorios que requerimos de la api
  //aqui llamamos los cuatro utilizando los elementos del arreglo de arriba para colocarles a cada uno el respectivo elemento de la api
  const promiseArr = [
    pokeApi.get(`/${a}`),
    pokeApi.get(`/${b}`),
    pokeApi.get(`/${c}`),
    pokeApi.get(`/${d}`),
  ];

  //   creamos un arreglo que utilizaremos para que cada uno tenga su peticion de cada elemento del arreglo del promiseArr que tenemos arriba
  const [p1, p2, p3, p4] = await Promise.all(promiseArr);

  //retornamos los nombres de los pokes
  return [
    {
      name: p1.data.name,
      id: p1.data.id,
    },
    {
      name: p2.data.name,
      id: p2.data.id,
    },
    {
      name: p3.data.name,
      id: p3.data.id,
    },
    {
      name: p4.data.name,
      id: p4.data.id,
    },
  ];
};

export default getPokemonOptions;
