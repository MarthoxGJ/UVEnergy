import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  Table,
  Container,
  Row
} from "reactstrap";
// core components
import UVHeader from "components/Headers/UVHeader.js";
import axios from 'axios';
import { withTranslation } from 'react-i18next';
import Cookies from 'universal-cookie';

const c = require('../constants')
const cookie = new Cookies();

class CheckPendingBills extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            bill : {
                pk_bill: -1,
                start_date: "",
                end_date: "",
                read: 1,
                expedition_date: "",
                expiration_date: "",
                is_paid: true,
                fk_debit_payment: -1,
                fk_meter: -1,
                fk_employee: -1
            },
            path: '',
            listBills: [],
            credentials: cookie.get('notCredentials'),           
        }
    }
    componentDidMount(){
        console.log(this.state.credentials)
        axios.get(c.api + 'sales/pendingbillList/', {params: { pk_cliente: this.state.credentials.id}, 
                headers: { Authorization: `Token ${this.state.credentials.token}`}})
        .then( response => {
            if( response.data.error != null){
                alert(response.data.error);
              }
              else{
                this.setState({listBills: response.data})
               /*console.log(this.state.listBills)*/
                 /*console.log(response.config)*/
            }             
        }).catch(error => alert(error))
    }
    render() {
        const { t } = this.props
        return(
            <>
            <UVHeader />
            {/* Page content */}
            <Container className="mt--7" fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="border-0">
                            <font size="5">{t("Bill.MyBills.1")}</font>
                            </CardHeader>
                            <Table className="align-items-center table-flush" responsive>
                            <thead className="thead-light">
                                <tr>
                                <th scope="col"><font size="2">{t("Bill.Id.1")}</font></th>
                                <th scope="col"><font size="2">{t("Bill.IsPaid.1")}</font></th>
                                <th scope="col"><font size="2">{t("Bill.expirationDate.1")}</font></th>
                                <th scope="col" />
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.listBills.map((item, key) => 
                                    
                                    <tr key={'bill-'+ key}>
                                    <td>{item.pk_bill}</td>
                                    <th scope="row">
                                        <span className="mb-0 text-sm">
                                        {item.read}
                                        </span>
                                    </th>
                                    <td>{item.expirationDate}</td>
                                    <td className="text-right">
                                    </td>
                                    </tr>
                                )}
                                
                            </tbody>
                            </Table>
                        </Card>
                    </div>
                </Row>
            </Container>
            </>
        );
    }
}

export default withTranslation()(CheckPendingBills);