import { mount } from 'enzyme';
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthContext } from '../../../auth/authContext';
import { HeroScreen } from '../../../components/hero/HeroScreen';
import { types } from '../../../types/types';


const mockNavigate = jest.fn();

jest.mock( 'react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate 
}));

describe('Pruebas en <HeroScreen />', () => {

    test('debe mostrarse correctamente', () => { 
        const wrapper = mount(
                <MemoryRouter initialEntries = { ['/hero']}>
                    <Routes>
                        <Route path="/hero" element={<HeroScreen />} />
                        <Route path="/" element={<h1>No Hero page</h1>} />
                    </Routes>
                </MemoryRouter>
        );
            
        expect(wrapper.find('h1').text().trim()).toBe('No Hero page');
    

     })
     
     test('debe mostrar un heroe si el parametro existe y se encuentra', () => { 
         const wrapper = mount(
                 <MemoryRouter initialEntries = { ['/hero/marvel-spider']}>
                     <Routes>
                         <Route path="/hero/:heroId" element={<HeroScreen />} />
                         <Route path="/" element={<h1>No Hero page</h1>} />
                     </Routes>
                 </MemoryRouter>
         );
             
         console.log(wrapper.html());
     
 
      })

    test('debe regresar a la pantalla anterior', () => { 
        const wrapper = mount(
                 <MemoryRouter initialEntries = { ['/hero/marvel-spider']}>
                     <Routes>
                         <Route path="/hero/:heroId" element={<HeroScreen />} />
                     </Routes>
                 </MemoryRouter>
        );
        
        wrapper.find('button').prop('onClick')();
        expect( mockNavigate ).toHaveBeenCalledWith(-1);
    })
    
    test('debe mostrar el "No Hero page" si no tenemos un heroe', () => { 
        const wrapper = mount(
                 <MemoryRouter initialEntries = { ['/hero/marvel-spider12133']}>
                     <Routes>
                         <Route path="/hero/:heroId" element={<HeroScreen />} />
                         <Route path="/" element={<h1>No Hero page</h1>} />
                     </Routes>
                 </MemoryRouter>
        );
        
        expect( wrapper.text() ).toBe('No Hero page');
    })

})

