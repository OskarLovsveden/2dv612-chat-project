// __tests__/hello_world.test.js
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import Login from '../components/Login';

const wrapper = shallow(<Login />);
describe('Login Component', () => {
    it('should render an email input tag', () => {
        expect(wrapper.find('input[name="Email"]').exists()).toBe(true);
    });

    it('should render a password input tag', () => {
        expect(wrapper.find('input[name="Password"]').exists()).toBe(true);
    });

    it('should render a submit button', () => {
        expect(wrapper.find('input[value="Submit"]').exists()).toBe(true);
    });

    it('the default value for both fields should be the placeholder', () => {
        expect(wrapper.find('input[name="Email"]').prop('placeholder')).toBe(
            'Enter Username'
        );
        expect(wrapper.find('input[name="Password"]').prop('placeholder')).toBe(
            'Enter Password'
        );
    });

    /* it('renders correctly', () => {
        const tree = renderer.create(<Login />).toJSON();
        expect(tree).toMatchSnapshot();
    }); */

    /**
    it('on change of value in the field, the state of that field in the component should be updated', () => {
        /* if the simulated event value and the field value is same then the state is updating on event trigger */

    /*  wrapper.find('input[name="Email"]').simulate('change', {
            target: {
                value: 'email@id.com',
            },
        });
        expect(wrapper.find('input[name="Email"]').prop('value')).toBe(
            'email@id.com'
        );
        wrapper.find('input[name="Password"]').simulate('change', {
            target: {
                value: 'somepassword',
            },
        });
        expect(wrapper.find('input[name="Password"]').prop('value')).toBe(
            'somepassword'
        );
    });
    */
});
