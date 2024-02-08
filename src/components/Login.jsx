import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {login, signup} from '../store/actions/user'
import { Form, Tab, Button } from 'semantic-ui-react'

const Login = () => {
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerForm, setRegisterForm] = useState({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });

    const handleSubmit = (type) => {
      if(type === "login") {
        dispatch(login({
          username,
          password
        }))
      } else if (type === "register") {
        dispatch(signup(registerForm));
      }
      
    } 

    const panes = [
      { menuItem: 'Login', render: () => {
        return (
          <Tab.Pane>
            <Form
              onSubmit={() => handleSubmit("login") }
            >
              <Form.Field>
                <label>Username</label>
                <Form.Input placeholder="Enter Username" type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </Form.Field> 
              <Form.Field>
              <label>Password</label>
                <Form.Input placeholder="Enter Password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
              </Form.Field>
              <Button type="submit" data-testid="login-button">Login</Button>
            </Form>
          </Tab.Pane>
        )
      } },
      { menuItem: 'Register', render: () => {
        return (
          <Tab.Pane>
            <Form
              onSubmit={() => handleSubmit("register") }
            >
              <Form.Field>
                <label>Username</label>
                <Form.Input type="text" name="username" value={registerForm.username} onChange={(e) => setRegisterForm({...registerForm, username: e.target.value})} />
              </Form.Field> 
              <Form.Field>
                <label>First Name</label>
                <Form.Input type="text" name="firstName" value={registerForm.firstName} onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})} />
              </Form.Field> 
              <Form.Field>
                <label>Last Name</label>
                <Form.Input type="text" name="username" value={registerForm.lastName} onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})} />
              </Form.Field> 
              <Form.Field>
                <label>Email</label>
                <Form.Input type="text" name="username" value={registerForm.email} onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})} />
              </Form.Field> 
              <Form.Field>
              <label>Password</label>
                <Form.Input type="password" name="password" value={registerForm.password} onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})} />
              </Form.Field>
              <Button type="submit">Register</Button>
            </Form>
          </Tab.Pane>
        )
      } },
    ]
    return (
      <Tab panes={panes} />
    );
}
 
export default Login;