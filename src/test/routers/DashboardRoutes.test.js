import { DashboardRoutes } from "../../routers/DashboardRoutes"
import { mount } from 'enzyme';
import { AuthContext } from "../../auth/authContext";
import { MemoryRouter } from "react-router-dom";


describe('Pruebas en <DashboardRoutes />', () => {

    const contextValue = {
        user: {
            logged: true, 
            name: 'Juanito'
        }
    }

    test('debe mostrarse correctamente de Marvel', () => { 
        
            const wrapper = mount(
                <AuthContext.Provider value = {contextValue} >
                    <MemoryRouter initialEntries = { ['/'] }>
                        <DashboardRoutes />
                    </MemoryRouter>
                </AuthContext.Provider>
            );

            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('h1').text().trim()).toBe('Marvel');
    })

    test('debe mostrarse correctamente de DC', () => { 
        
            const wrapper = mount(
                <AuthContext.Provider value = {contextValue} >
                    <MemoryRouter initialEntries = { ['/dc'] }>
                        <DashboardRoutes />
                    </MemoryRouter>
                </AuthContext.Provider>
            );

            expect(wrapper).toMatchSnapshot();
            expect(wrapper.find('h1').text().trim()).toBe('DC');
    })
})