import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../Login';
import { renderWithProviders } from '../../utils/testUtils';
import { server } from '../../mocks/setupServer';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());


describe('Login Tests', () => {
    it('should render username and password fields', () => {
        renderWithProviders(<Login />);
        const login = screen.getAllByText('Login')[0];
        expect(login).toBeInTheDocument();
        const registerTab = screen.getByText('Register');
        expect(registerTab).toBeInTheDocument();
        const username = screen.getByText('Username');
        expect(username).toBeInTheDocument();
        const password = screen.getByText('Password');
        expect(password).toBeInTheDocument();
    });
    it('should render register fields if register tab is clicked', () => {
        renderWithProviders(<Login />);
        const registerTab = screen.getByText('Register');
        expect(registerTab).toBeInTheDocument();
        userEvent.click(registerTab);
        const username = screen.getByText('Username');
        expect(username).toBeInTheDocument();
        const firstName = screen.getByText('First Name');
        expect(firstName).toBeInTheDocument();
        const lastName = screen.getByText('Last Name');
        expect(lastName).toBeInTheDocument();
        const email = screen.getByText('Email');
        expect(email).toBeInTheDocument();
        const password = screen.getByText('Password');
        expect(password).toBeInTheDocument();
    });
})