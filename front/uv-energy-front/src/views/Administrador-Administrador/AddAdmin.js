import React from "react";
//import { Link } from "react-router-dom";
import axios from 'axios';

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";

import 'leaflet/dist/leaflet.css';

// core components
import UVHeader from "components/Headers/UVHeader.js";

const c = require('../constants')

class AddAdmin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            admin : {
                username: "Username",
                password: "",
                email: "Email",
                first_name: "Name",
                last_name: "Last name",
                is_active: true,
                cellphone: "123",
                position: "ADMIN"
            },
            isAlertEmpty: false,
            isAlertSuccess: false,
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirsName = this.onChangeFirsName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeCellphone = this.onChangeCellphone.bind(this);

        this.AddAdmin = this.AddAdmin.bind(this);
    }
    onChangeUsername(e){
        this.setState({ admin: {
                                    username: e.target.value,
                                    password: this.state.admin.password,
                                    email: this.state.admin.email,
                                    first_name: this.state.admin.first_name,
                                    last_name: this.state.admin.last_name,
                                    is_active: true,
                                    cellphone: this.state.admin.cellphone,
                                    position: "ADMIN"
                                }})
    }
    onChangePassword(e){
        this.setState({ admin: {
                                    username: this.state.admin.username,
                                    password: e.target.value,
                                    email: this.state.admin.email,
                                    first_name: this.state.admin.first_name,
                                    last_name: this.state.admin.last_name,
                                    is_active: true,
                                    cellphone: this.state.admin.cellphone,
                                    position: "ADMIN"
                                }})
    }
    onChangeEmail(e){
        this.setState({ admin: {
                                    username: this.state.admin.username,
                                    password: this.state.admin.password,
                                    email: e.target.value,
                                    first_name: this.state.admin.first_name,
                                    last_name: this.state.admin.last_name,
                                    is_active: true,
                                    cellphone: this.state.admin.cellphone,
                                    position: "ADMIN"
                                }})
    }
    onChangeFirsName(e){
        this.setState({ admin: {
                                    username: this.state.admin.username,
                                    password: this.state.admin.password,
                                    email: this.state.admin.email,
                                    first_name: e.target.value,
                                    last_name: this.state.admin.last_name,
                                    is_active: true,
                                    cellphone: this.state.admin.cellphone,
                                    position: "ADMIN"
                                }})
    }
    onChangeLastName(e){
        this.setState({ admin: {
                                    username: this.state.admin.username,
                                    password: this.state.admin.password,
                                    email: this.state.admin.email,
                                    first_name: this.state.admin.first_name,
                                    last_name: e.target.value,
                                    is_active: true,
                                    cellphone: this.state.admin.cellphone,
                                    position: "ADMIN"
                                }})
    }
    onChangeCellphone(e){
        this.setState({ admin: {
                                    username:this.state.admin.username,
                                    password: this.state.admin.password,
                                    email: this.state.admin.email,
                                    first_name: this.state.admin.first_name,
                                    last_name: this.state.admin.last_name,
                                    is_active: true,
                                    cellphone: e.target.value,
                                    position: "ADMIN"
                                }})
    }
    AddAdmin(e){
        e.preventDefault()
        if ((this.state.admin.username === "Username") ||
            (this.state.admin.password === "") ||
            (this.state.admin.email === "Email") ||
            (this.state.admin.first_name === "Name") ||
            (this.state.admin.last_name === "Last name") ||
            (this.state.admin.cellphone === "123")){
            console.log(this.state.admin)
            this.setState({isAlertEmpty: true, isAlertSuccess: false})
        }else{
            axios.post(c.api + 'users/user/',
                       this.state.admin)
            .then( response => {
                console.log(response)
                if (response.data.username !== "username"){
                    this.setState({ isAlertSuccess: true,
                                    isAlertEmpty: false,
                                    admin : {
                                                username: "Username",
                                                password: "",
                                                email: "Email",
                                                first_name: "Name",
                                                last_name: "Last name",
                                                is_active: true,
                                                cellphone: "123",
                                                position: "ADMIN"
                                            }});
                }
            }).catch(error => console.log(error))
        }
    }
    render() {
        return(
            <>
            <UVHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                <Card className="bg-secondary shadow">
                    <CardHeader className="bg-white border-0">
                    <Row className="align-items-center">
                        <Col xs="8">
                        <h3 className="mb-0">Admin Information</h3>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.AddAdmin}>
                        <h6 className="heading-small text-muted mb-4">
                        Personal Information
                        </h6>
                        <div className="pl-lg-4">
                            <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                                <strong>Warning!</strong> There are empty fields!
                            </Alert>
                            <Alert color="success" isOpen={this.state.isAlertSuccess}>
                                <strong>Congratulations!</strong> The electric transformer was created!
                            </Alert>
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-first-name"
                                >
                                Name
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-first-name"
                                placeholder="Name"
                                type="text"
                                value={this.state.admin.first_name}
                                onChange={this.onChangeFirsName}
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-last-name"
                                >
                                Last Name
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-last-name"
                                placeholder="Last Name"
                                type="text"
                                value={this.state.admin.last_name}
                                onChange={this.onChangeLastName}
                                />
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-phone-number"
                                >
                                Phone Number
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-phone-number"
                                placeholder="Phone Number"
                                type="number"
                                value={this.state.admin.cellphone}
                                onChange={this.onChangeCellphone}
                                />
                            </FormGroup>
                            </Col>

                            {/* 
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-address"
                                >
                                Address
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-address"
                                placeholder="Adress"
                                type="text"
                                />
                            </FormGroup>
                            </Col>
                            */}
                        </Row>
                        {/* 
                        <Row>
                            <Col className="col-md-12">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-date-birth"
                                >
                                Date of birth
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-date birth"
                                placeholder=""
                                type="date"
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        */}
                        </div>
                        {/*
                        <hr className="my-4"></hr>
                        <h6 className="heading-small text-muted mb-4">
                        Payment Information
                        </h6>
                        <div className="pl-lg-4">
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-bank"
                                >
                                Bank
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-bank"
                                placeholder="Bank"
                                type="text"
                                />
                            </FormGroup>
                            </Col>

                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-account-type"
                                >
                                Account Type
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-account-type"
                                placeholder="Account type"
                                type="text"
                                />
                            </FormGroup>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-account-number"
                                >
                                Account Number
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-account-number"
                                placeholder="Account Number"
                                type="text"
                                />
                            </FormGroup>
                            </Col>

                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-salary"
                                >
                                Salary
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-salary"
                                placeholder="Salary"
                                type="number"
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        </div>
                        */}

                        <hr className="my-4"></hr>
                        <h6 className="heading-small text-muted mb-4">
                        Account Information
                        </h6>
                        <div className="pl-lg-4">                        
                        <Row>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-username"
                                >
                                Username
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-username"
                                placeholder="Username"
                                type="text"
                                value={this.state.admin.username}
                                onChange={this.onChangeUsername}
                                />
                            </FormGroup>
                            </Col>
                            <Col lg="6">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-email"
                                >
                                Email 
                                </label>
                                <Input
                                className="form-control-alternative"
                                id="input-email"
                                placeholder="jesse@example.com"
                                type="email"
                                value={this.state.admin.email}
                                onChange={this.onChangeEmail}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col className="col-md-12">
                            <FormGroup>
                                <label
                                className="form-control-label"
                                htmlFor="input-password"
                                >
                                Password
                                </label>
                                <Input 
                                className="form-control-alternative"
                                placeholder="Password" 
                                type="password" 
                                autoComplete="new-password"
                                value={this.state.admin.password}
                                onChange={this.onChangePassword}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        <div className="text-center">
                            <Button className="mt-4" color="primary" type="submit">
                                Add
                            </Button>
                        </div>
                        </div>
                    </Form>
                    </CardBody>
                </Card>
            </Container>
            </>
        );
    }
}

export default AddAdmin;