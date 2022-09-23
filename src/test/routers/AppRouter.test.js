import { AppRouter } from "../../routers/AppRouter";
import { mount } from 'enzyme';
import { AuthContext } from "../../auth/authContext";

describe("Pruebas en <AppRouter />", () => {

    
    test('debe mostrar el login si no está autenticado', () => { 
        const contextValue = {
            user: {
                logged: false
            }    
        }
        
        const wrapper = mount(
            <AuthContext.Provider value = { contextValue }>
                <AppRouter />

            </AuthContext.Provider>
            
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('h1').text().trim()).toBe('Login');
    })

    test('debe mostrar el componente Marvel si está autenticado', () => { 
        const contextValue = {
            user: {
                logged: true,
                name: 'John'
            }    
        }
        
        const wrapper = mount(
            <AuthContext.Provider value = { contextValue }>
                <AppRouter />

            </AuthContext.Provider>
            
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.navbar').exists()).toBeTruthy();
    })
})
