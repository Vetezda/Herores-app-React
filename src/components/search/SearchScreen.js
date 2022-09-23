import { useForm } from '../../hooks/useForm';
import { getHeroesByName } from '../../selectors/getHeroesByName';
import { HeroCard } from '../hero/HeroCard';
import { useLocation, useNavigate } from "react-router-dom"
import queryString from 'query-string';
import { useMemo } from "react";

export const SearchScreen = () => {
  const navigate = useNavigate();

  //el siguiente codigo es para hacer busquedas basadas en el url
  const location = useLocation();//nos de información del url y las propiedades

  //el search es el path, el cual contiene una propiedad 'q' la cual contiene el primer argumento que se buscó en el input
  const { q = ''} = queryString.parse(location.search);
        //Y q es el query
  //tambien hace que lo que se escriba en el url se agrege al input al dar enter, por lo tanto si recargamos la pagina tampoco se borra lo que hayamos escrito en el input      

  const [ {searchText}, handleInputChange ] = useForm({
    searchText: q
  });

  const heroesFileted = useMemo( () => getHeroesByName(q), [q] );//para que memorize cada vez que el query cambie y no el searchText ya que es el target y el getHeroesByName se disparará cada vez que toquemos una tecla

  const handleSearch = (e) => {
      e.preventDefault();

      navigate(`?q=${searchText}`);
  }

  return (
    <>
        <div className="row">
            <div className="col-5 animate__animated animate__bounceInDown">
                <hr/>

                <form onSubmit={handleSearch}>
                    <input 
                      type="text" 
                      className="form-control"
                      placeholder="Buscar heroe..."
                      name="searchText"
                      autocomplete="off"
                      value={searchText}
                      onChange={handleInputChange}
                    />

                    <button
                      className="btn btn-outline-primary mt-2"
                      type="submit"
                    >
                        Buscar
                    </button>
                </form>
            </div>

            <div className="col-7 animate__animated animate__fadeInRightBig">
                <h4>Resultados</h4>
                <hr/>
                {
                  (q === '')
                    ? <div className="alert alert-info">Buscar un héroe</div>
                    : ( heroesFileted.length === 0 )
                      && <div className="alert alert-danger">No hay resultados para: { q }</div>
                }

                {
                  heroesFileted.map(hero => (
                      <HeroCard 
                        className=""
                        key={hero.id}
                        {...hero}
                      />
                  ))
                }
            </div>
        </div>
    </>
  )
}
