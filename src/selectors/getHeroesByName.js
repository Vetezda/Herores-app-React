import { heroes } from "../data/heroes"


export const getHeroesByName = (name = '') => {

    //console.log('first'); para comprobar que el useMemo memoriza y este clg no se dispara cada vez que cambia el target

    if ( name === '' ) {
        return [];
    }

    name = name.toLowerCase();
  return heroes.filter(hero => hero.superhero.toLowerCase().includes(name));
}
