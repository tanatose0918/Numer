import React, { Component } from 'react'
import { Card, Input, Button, Table, Col } from 'antd';
import 'antd/dist/antd.css';
import math from 'mathjs';
import Plot from 'react-plotly.js';
import '../../style/fStyle.css';
import ButtonGroup from 'antd/lib/button/button-group';

var dataInTable;

const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "Xold",
        dataIndex: "xold",
        key: "xold"
    },
    {
        title: "Xnew",
        dataIndex: "xnew",
        key: "xnew"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

const xValues = math.range(-10, 10, 0.5).toArray();

var fx = " ";

class Secant extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            xold: 0,
            xnew: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.SecantMethod = this.SecantMethod.bind(this);
        this.Reset = this.Reset.bind(this);
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    SecantMethod(xold, xnew) {
        fx = this.state.fx;
        var fx0 ;
        var fx1 ;
        var fdiff ; 
        var xnext ;
        var data = [];
        data['xold'] = [];
        data['xnew'] = [];
        data['error'] = [];
        var i=0;
        var E = parseFloat(0.000001);
        do {
            fx0 = this.func(xold);
            fx1 = this.func(xnew);
            fdiff = (fx0 - fx1) / (xold - xnew);
            xnext = xold - (fx0 / fdiff);
            E = this.error(xold,xnext);
            data['xold'][i] = xold;
            data['xnew'][i] = xnew;
            data['error'][i] = E;
            xold = xnew;
            xnew = xnext;
            i++;
        } while (math.abs(E) > 0.000001);

        this.createTable(data['xold'],data['xnew'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    func(X) {
        var expr = math.compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    Reset() {
        this.setState({
            fx: "",
            xold: 0,
            xnew:0,
            showOutputCard: false,
            showGraph: false
        });
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    error(xnew, xold) {
        return math.abs((xnew - xold) / xnew);
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    createTable(xold, xnew, error) {
        dataInTable = []
        for (var i = 0; i < xold.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xold: xold[i],
                xnew: xnew[i],
                error: error[i]
            });
        }
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    render() {
        return (
            <div >
                <h2 className="Head1">Secant Method</h2>
                <div className="ContentSheet">
                    <Card title={"Input False Postion"} onChange={this.handleChange}>
                        <Col span={8}>
                            <h3 style={{ color: 'black' }}>f(x)</h3>                               <Input size="medium" name="fx" className="InputStyle" placeholder="Please enter your function" allowClear={true} />
                            <h3 style={{ color: 'black' }}>X<sub>old</sub> Or start value</h3>     <Input size="medium" name="xold" className="InputStyle" placeholder="Please enter start value" allowClear={true} />
                            <h3 style={{ color: 'black' }}>X<sub>new</sub> Or next value</h3>     <Input size="medium" name="xnew" className="InputStyle" placeholder="Please enter start value" allowClear={true} />      
                            <div style={{ textAlign: "end" }}>
                                <ButtonGroup>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="reset_button" onClick={() => this.Reset()} >Reset</Button>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="summit_button" onClick={() => this.SecantMethod(parseFloat(this.state.xold), parseFloat(this.state.xnew))}  >Confirm</Button>
                                </ButtonGroup>
                            </div>
                        </Col>
                        <Col span={16}>
                            {this.state.showGraph && <Card title={"Graph"} bordered={true} style={{ border: "2px solid black", background: "#f44aaa6", color: "#FFFFFFFF", marginLeft: "4%" }}>
                                <Plot
                                    data={[
                                        {
                                            x: math.range(-10, 10, 1).toArray(),
                                            y: xValues.map(function (x) {
                                                return math.compile(fx).eval({ x: x })
                                            }),
                                            type: 'scatter',
                                            marker: { color: 'red' },
                                        }
                                    ]}
                                    layout={{ title: 'Graph of Function' }}
                                    style={{ width: "100%" }}
                                />
                            </Card>}
                        </Col>
                    </Card>
                    {this.state.showOutputCard && <Card title={"Output"} style={{ borderRadius: "10px", marginBlockStart: "2%" }} className="OutputCard" id="outputCard" >
                        <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontSize: "16px", color: "black" }} />
                    </Card>}
                </div>
            </div>
        );
    }
}
export default Secant;