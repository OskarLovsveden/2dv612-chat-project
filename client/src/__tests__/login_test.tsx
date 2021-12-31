// __tests__/hello_world.test.js
import { shallow } from 'enzyme';
// import renderer from 'react-test-renderer';
import Login from '../components/Login';

const wrapper = shallow(<Login />);
describe('Login Component', () => {
    const userInput = wrapper.find('input[id="username"]')
    const pwInput = wrapper.find('input[id="password"]')

    it('should render an username input tag', () => {
        expect(userInput.exists()).toBe(true);
    });

    it('should render a password input tag', () => {
        expect(pwInput.exists()).toBe(true);
    });

    it('should render a submit button', () => {
        expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
    });

    it('the default value for both fields should be the placeholder', () => {
        expect(userInput.prop('placeholder')).toBe(
            'Enter Username'
        );
        expect(pwInput.prop('placeholder')).toBe(
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
