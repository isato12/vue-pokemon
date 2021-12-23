import pokeApi from "../api/pokeApi"

    const getPokemons = () =>{
    
        const pokemonArr = Array.from( Array(650) )
        
        return pokemonArr.map(( _, index) => index + 1) 
}

    const getPokemonsOptions = async() =>{

        const mixpoke = getPokemons().sort( () => Math.random() - 0.5)

        const pokemons = await getPokemonNames(mixpoke.splice(0,4) )
        console.table(pokemons)
        return pokemons
}

    const getPokemonNames =  async( [a,b,c,d] = [] ) => {
        
        //esta seria la forma de llamar a un solo elemento de la api

            // const resp = await pokeApi.get(`/1`)
            // console.log(resp.data.name, resp.data.id)
        
            // console.log(a,b,c,d)
       
            //forma de llamar los cuatro elementos aleatorios que requerimos de la api

            const promiseArr = [
                pokeApi.get(`/${a}`),
                pokeApi.get(`/${b}`),
                pokeApi.get(`/${c}`),
                pokeApi.get(`/${d}`)
            ]
            
        const [p1,p2,p3,p4] = await Promise.all(promiseArr)

        return[
            {name: p1.data.name, id:p1.data.id},
            {name: p2.data.name, id:p2.data.id},
            {name: p3.data.name, id:p3.data.id},
            {name: p4.data.name, id:p4.data.id}
        ]

    }


    export default getPokemonsOptions;