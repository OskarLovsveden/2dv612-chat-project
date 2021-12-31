// __tests__/hello_world.test.js
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import Logout from '../components/Logout';

const wrapper = shallow(<Logout />);
describe('Login Component', () => {
    it('should render a a', () => {
        expect(wrapper.find('a').exists()).toBe(true);
    });

    it('should render render the logout text', () => {
        expect(wrapper.find('a').text()).toBe('Logout');
    });
});
