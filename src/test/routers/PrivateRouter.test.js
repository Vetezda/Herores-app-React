import { mount } from 'enzyme';
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from '../../auth/authContext';
import { PrivateRoute } from '../../routers/PrivateRoute';

jest.mock( 'react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Navigate: () => <span>Saliendo de aquí</span>// este es un mock del compoente <Navigate /> de React y no el hook useNavigate
}));


describe('pruebas en <PrivateRoute />', () => {

    Storage.prototype.setItem = jest.fn();//es un mock del localStorage

    test('debe mostrar el componente si está autenticado y guardar en el localStorage', () => { 
        
        const contextValue = {
            user: {
                name: 'John',
                logged: true
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value = { contextValue }>
                <MemoryRouter initialEntries = {['/']}>
                    <PrivateRoute >
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect(wrapper.text().trim()).toBe('Private component');
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/');
    })
    
    test('debe bloquear el componente si no esta logeado', () => { 
        
        const contextValue = {
            user: {
                logged: false
            }
        }
        const wrapper = mount(
            <AuthContext.Provider value = { contextValue }>
                <MemoryRouter initialEntries = {['/']}>
                    <PrivateRoute >
                        <h1>Private component</h1>
                    </PrivateRoute>
                </MemoryRouter>
            </AuthContext.Provider>
        );
        
        expect(wrapper.text().trim()).toBe('Saliendo de aquí');
    })

})



