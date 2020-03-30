import React from "react";
import axios from 'axios';
import Cookies from 'universal-cookie';

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
const cookie = new Cookies();

class RUDDOperator extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.location.state)
        this.state = {
            operator : {
                id: this.props.location.state.operatorID,
                username: "",
                password: "",
                email: "",
                first_name: "",
                last_name: "",
                is_active: true,
                cellphone: "",
                position: "OP"
            },
            operatorData: {
                id: this.props.location.state.operatorID,
                username: "",
                password: "",
                email: "",
                first_name: "",
                last_name: "",
                is_active: true,
                cellphone: "",
                position: "OP"
            },
            credentials: cookie.get('notCredentials'),
            operatorPassword: "",
            isAlertEmpty: false,
            isAlertSuccess: false,
            isBadinputs: false,
        }
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeFirsName = this.onChangeFirsName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangeCellphone = this.onChangeCellphone.bind(this);

        this.ModfOperator = this.ModfOperator.bind(this);
        this.SubmitEvent = this.SubmitEvent.bind(this);

    }
    componentDidMount(){
        axios.get(c.api + 'users/user/'+this.state.operator.id+'/',
                  {headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
                alert("Wrong Id")
              }
              else{
                console.log(response.data)
                this.setState({operator: response.data, operatorData: response.data})
                console.log(this.state.listOperators)                
            }             
        }).catch(error => alert(error))
    }
    onChangeUsername(e){
        this.setState({ operator: {
                                    id: this.state.operator.id,
                                    username: e.target.value,
                                    password: this.state.operator.password,
                                    email: this.state.operator.email,
                                    first_name: this.state.operator.first_name,
                                    last_name: this.state.operator.last_name,
                                    is_active: true,
                                    cellphone: this.state.operator.cellphone,
                                    position: "OP"
                                }})
    }
    onChangePassword(e){
        this.setState({ operatorPassword: e.target.value })
    }
    onChangeEmail(e){
        this.setState({ operator: {
                                    id: this.state.operator.id,
                                    username: this.state.operator.username,
                                    password: this.state.operator.password,
                                    email: e.target.value,
                                    first_name: this.state.operator.first_name,
                                    last_name: this.state.operator.last_name,
                                    is_active: true,
                                    cellphone: this.state.operator.cellphone,
                                    position: "OP"
                                }})
    }
    onChangeFirsName(e){
        this.setState({ operator: {
                                    id: this.state.operator.id,
                                    username: this.state.operator.username,
                                    password: this.state.operator.password,
                                    email: this.state.operator.email,
                                    first_name: e.target.value,
                                    last_name: this.state.operator.last_name,
                                    is_active: true,
                                    cellphone: this.state.operator.cellphone,
                                    position: "OP"
                                }})
    }
    onChangeLastName(e){
        this.setState({ operator: {
                                    id: this.state.operator.id,
                                    username: this.state.operator.username,
                                    password: this.state.operator.password,
                                    email: this.state.operator.email,
                                    first_name: this.state.operator.first_name,
                                    last_name: e.target.value,
                                    is_active: true,
                                    cellphone: this.state.operator.cellphone,
                                    position: "OP"
                                }})
    }
    onChangeCellphone(e){
        this.setState({ operator: {
                                    id: this.state.operator.id,
                                    username:this.state.operator.username,
                                    password: this.state.operator.password,
                                    email: this.state.operator.email,
                                    first_name: this.state.operator.first_name,
                                    last_name: this.state.operator.last_name,
                                    is_active: true,
                                    cellphone: e.target.value,
                                    position: "OP"
                                }})
    }
    SubmitEvent(buttonVal){
        this.setState({ isAlertSuccess: true,
            isAlertEmpty: false,
            isBadinputs: false,
        });
        if(buttonVal===1){            
            console.log("Modify")
            if ((this.state.operator.username === "") ||
                (this.state.operator.password === "") ||
                (this.state.operator.email === "") ||
                (this.state.operator.first_name === "") ||
                (this.state.operator.last_name === "") ||
                (this.state.operator.cellphone === "")){

                this.setState({isAlertEmpty: true, isAlertSuccess: false, isBadinputs: false})
            }else{
                console.log(this.state.operator)
                if(this.state.operatorPassword !== ""){
                    this.setState({ operator: {
                                            id: this.state.operator.id,
                                            username:this.state.operator.username,
                                            password: this.state.operator,
                                            email: this.state.operator.email,
                                            first_name: this.state.operator.first_name,
                                            last_name: this.state.operator.last_name,
                                            is_active: true,
                                            cellphone: this.state.operator.cellphone,
                                            position: "OP"
                                        }})
                }
                axios.put(c.api + 'users/user/'+this.state.operator.id+'/',
                        this.state.operator,
                        {headers: { Authorization: `Token ${this.state.credentials.token}`}})
                .then( response => {
                    console.log(response)
                    if ((response.data.password === this.state.operatorData.password) ||
                        (response.data.email === this.state.operatorData.email) ||
                        (response.data.first_name === this.state.operatorData.first_name) ||
                        (response.data.last_name === this.state.operatorData.last_name) ||
                        (response.data.cellphone === this.state.operatorData.cellphone)
                        ){
                        this.setState({ isAlertSuccess: true,
                                        isAlertEmpty: false,
                                        isBadinputs: false,
                                        operatorPassword: "",
                                    });
                    }
                }).catch(error => {
                    console.log(error.response.request)
                    this.setState({ isAlertSuccess: false,
                                    isAlertEmpty: false,
                                    isBadinputs: true})
                })
            }
        }else if(buttonVal === 2){
            axios.put(c.api + 'users/user/'+this.state.operator.id+'/',
            {
                id: this.state.operator.id,
                username:this.state.operator.username,
                password: this.state.operator.password,
                email: this.state.operator.email,
                first_name: this.state.operator.first_name,
                last_name: this.state.operator.last_name,
                is_active: false,
                cellphone: this.state.operator.cellphone,
                position: "OP"
            },
            {headers: { Authorization: `Token ${this.state.credentials.token}`}})
            .catch(error => console.log(error))

            this.props.history.push({
                pathname: '/admin/RegisteredOperators', state:{disabledOperator: true, deletedOperator: false}})
                window.location.reload(true);

        }else if(buttonVal === 3){
            console.log("Delete")
            axios.delete(c.api + 'users/user/'+this.state.operator.id+'/')
            .catch(error => console.log(error))

            this.props.history.push({
                pathname: '/admin/RegisteredOperators', state:{disabledOperator: false, deletedOperator: true}})
        }
    }
    ModfOperator(e){
        e.preventDefault()
        
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
                        <font size="5">{this.state.operator.first_name} Information</font>
                        </Col>
                    </Row>
                    </CardHeader>
                    <CardBody>
                    <Form onSubmit={this.AddOperator}>
                        <h6 className="heading-small text-muted mb-4">
                            Personal Information
                        </h6>
                        <div className="pl-lg-4">
                            <Alert color="warning" isOpen={this.state.isAlertEmpty}>
                                <strong>Warning!</strong> There are empty fields!
                            </Alert>
                            <Alert color="warning" isOpen={this.state.isBadinputs}>
                                <strong>Warning!</strong> Wrong information on fields!
                            </Alert>
                            <Alert color="success" isOpen={this.state.isAlertSuccess}>
                                <strong>Congratulations!</strong> The Operator was modified!
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
                                value={this.state.operator.first_name}
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
                                value={this.state.operator.last_name}
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
                                type="text"
                                value={this.state.operator.cellphone}
                                onChange={this.onChangeCellphone}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        </div>

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
                                value={this.state.operator.username}
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
                                value={this.state.operator.email}
                                onChange={this.onChangeEmail}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        {/* 
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
                                value={this.state.operatorPassword}
                                onChange={this.onChangePassword}
                                />
                            </FormGroup>
                            </Col>
                        </Row>
                        */}
                        <div className="text-center">
                            <Button className="mt-4" color="primary" onClick={ () => this.SubmitEvent(1) }>
                                Modify Information
                            </Button>
                            <Button className="mt-4" color="primary" onClick={ () => {if(window.confirm('Disable Operator?')){this.SubmitEvent(2)};} }>
                                Disable Operator
                            </Button>
                            <Button className="mt-4" color="primary" onClick={ () => {if(window.confirm('Delete Operator?')){this.SubmitEvent(3)};} }>
                                Delete Register
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

export default RUDDOperator;