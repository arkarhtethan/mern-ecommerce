import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Row} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import {useDispatch, useSelector} from "react-redux";
import {register} from "../actions/userActions";
import Message from "../components/Message";

const RegisterScreen = ({location, history}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("")
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);

    const {error, userInfo} = userRegister;
    const redirect = location.search ? location.search.split("=")[1] : "/";
    useEffect(() => {
        if (userInfo) {
            history.push(redirect);
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords do not match')
        } else {
            setMessage(null)
            dispatch(register(name,email, password))
        }
    }

    return (
        <FormContainer>
            <h1>
                Sign Up
            </h1>
            {error && <Message variant={`danger`}>{error}</Message>}
            {message && <Message variant={`danger`}>{message}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Name
                    </Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={e => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Email
                    </Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter Confirm Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                    Register
                </Button>
            </Form>
            <Row className="py-3">
                <Col>
                    Have an Account ? <Link to={redirect ? `/login?redirect=${redirect}` : `/register`}>
                    Login
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen;
