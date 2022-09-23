import { SearchScreen } from "../../../components/search/SearchScreen"
import { mount } from 'enzyme';
import { MemoryRouter } from "react-router-dom";
//la variable debe llamarse mockNavigate ya que es reservada 
const mockNavigate = jest.fn();//simulamos el navigate que está en <searchScreen />

jest.mock( 'react-router-dom', () => ({//con este trozo de codigo podemos simular cualquier hook, en este caso el useNvigate
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate//useNavigate retorna una funcion navigate, por eso usamos el mockNavigate anteriormente creado  
}));


describe('Pruebas en <SearchScreen />', () => {

    test('debe mostrarse correctamente con valores por defecto', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries = { ['/search'] }>
                <SearchScreen /> 
            </MemoryRouter>           
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.alert-info').text().trim()).toBe('Buscar un héroe');
     })

    test('debe mostrar batman y el input con el valor del queryString', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries = { ['/search?q=batman'] }>
                <SearchScreen /> 
            </MemoryRouter>           
        );

        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
     })

    test('debe mostrar error', () => { 

        const wrapper = mount(
            <MemoryRouter initialEntries = { ['/search?q=batman123'] }>
                <SearchScreen /> 
            </MemoryRouter>           
        );

        expect(wrapper.find('.alert-danger').text().trim()).toBe('No hay resultados para: batman123');
        expect(wrapper).toMatchSnapshot();
     })
     
     test('debe llamar al navigate a la nueva pantalla', () => { 
 
         const wrapper = mount(
             <MemoryRouter initialEntries = { ['/search'] }>
                 <SearchScreen /> 
             </MemoryRouter>           
         );

         wrapper.find('input').simulate('change', {
             target: {
                 name: 'searchText',
                 value: 'batman'
             }
         })


        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });

         expect(mockNavigate).toHaveBeenCalledWith('?q=batman');
    })
})



