import { useMemo } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { getHeroesById } from "../../selectors/getHeroesById";
import { heroImages } from "../../helpers/heroImages";
//import batman from '../../assets/heroes/dc-batman.jpg'


export const HeroScreen = () => {
                  //useParams nos brinda inmformación de la ruta en la que estamos
  const {heroId} = useParams();
                              //memorizamos el valor heroeId y solo si la dependencia (heroId) cambia se vuelve a memorizar, esto para evitar que la funcion getHeroesById se esté disparando cada vez que se renderiza el componente
  const hero = useMemo( () => getHeroesById(heroId), [ heroId ] );
  const navigate = useNavigate();

  if (!hero) {
    return <Navigate to='/' />// sino existe el heroe nos enviará la pag principal, usamos este hook para que nuesto componente retorne un componente como debe ser
  }
  
  const {
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
  } = hero;


  const handleReturn = () => {
    navigate(-1);// -1 significa regresar a la pagina anterior 
  }

  return (
    <div className="row mt-5">
        <div className="col-4">
            <img 
            //src={`../../assets/heroes/${heroId}.jpg`} //desde public/assets 
            //src={batman} //desde un el import estatico
            src={ heroImages(`./${ heroId }.jpg`) } //mas dinamico :)
            alt={superhero}
            className="img-thumbnail animate__animated animate__fadeInLeft"
            />
        </div>

        <div className="col-8 animate__animated animate__fadeIn" >
            <h3>{ superhero }</h3>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"> <b>Alter ego:</b> { alter_ego } </li> 
                <li className="list-group-item"> <b>Publisher:</b> { publisher } </li> 
                <li className="list-group-item"> <b>First Appearance:</b> { first_appearance } </li> 
            </ul>

            <h5 className="mt-3">Characters</h5>
            <p>{ characters }</p>

            <button 
              className="btn btn-outline-info"
              onClick={ handleReturn }
            >
                Regresar
            </button>
        </div>
    </div>
  )
}
