import React, { Component } from 'react'
import { Card, Input, Button, Table, Col } from 'antd';

import '../../style/fStyle.css';
import 'antd/dist/antd.css';
import { range, compile } from 'mathjs';
import Plot from 'react-plotly.js';
import ButtonGroup from 'antd/lib/button/button-group';
import math from 'mathjs';

var dataInTable 
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X_Left",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "X_Right",
        dataIndex: "xr",
        key: "xr"
    },
    {
        title: "X_Middle",
        dataIndex: "xm",
        key: "xm"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

const xValues = range(-10, 10, 0.5).toArray();

var fx = " ";

class Bisection extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            showOutputCard: false,
            showGraph: false,
            moveLeft: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.bisection = this.bisection.bind(this);
        this.Reset = this.Reset.bind(this);
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    bisection(xl, xr) {
        fx = this.state.fx;
        var increaseFunction = false;
        var xm = 0;
        var E = parseFloat(0.000000);
        var i = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['xm'] = []
        data['error'] = []
        if (this.func(xl) < this.func(xr)) {
            increaseFunction = true;
        }
        if (this.func(xm) * this.func(xr) < 0) {
            E = this.error(xm, xr);
            if (increaseFunction) {
                xl = xm;
            }
            else {
                xr = xm;
            }

        }
        else {
            E = this.error(xm, xl);
            if (increaseFunction) {
                xr = xm;
            }
            else {
                xl = xm;
            }
        }

        do {
            xm = (xl + xr) / 2;
            data['xl'][i] = xl;
            data['xr'][i] = xr;
            if (this.func(xm) * this.func(xr) < 0) {
                E = this.error(xm, xr);
                if (increaseFunction) {
                    xl = xm;
                }
                else {
                    xr = xm;
                }

            }
            else {
                E = this.error(xm, xl);
                if (increaseFunction) {
                    xr = xm;
                }
                else {
                    xl = xm;
                }
            }
            data['xm'][i] = xm.toFixed(8);
            data['error'][i] = E.toFixed(8);
            i++;
        } while (E > 0.000001);
        this.createTable(data['xl'], data['xr'], data['xm'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    Reset() {
        this.setState({
            fx: "",
            xl: 0,
            xr: 0,
            showOutputCard: false,
            showGraph: false
        })
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    error(xnew, xold) {
        return math.abs((xnew - xold) / xnew);
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    createTable(xl, xr, xm, error) {
        dataInTable = []
        for (var i = 0; i < xl.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                xm: xm[i],
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
                <h1 className="Head1">Bisection</h1>
                <div className="ContentSheet">
                    <Card title={"Input your function and value"} bordered={true} onChange={this.handleChange} id="inputCard" >
                        <Col span={8}>
                            <h3 style={{ color: "black" }}>f(x): Function             </h3>   <Input size="medium" name="fx" className="InputStyle" placeholder="Please enter your function" allowClear={true} />
                            <h3 style={{ color: "black" }}>X<sub>L</sub>: Left value  </h3>   <Input size="medium" name="xl" className="InputStyle" placeholder="Please enter Left side value" allowClear={true} />
                            <h3 style={{ color: "black" }}>X<sub>R</sub>: Right value </h3>   <Input size="medium" name="xr" className="InputStyle" placeholder="Please enter Right side value" allowClear={true} />
                            <div style={{ textAlign: "end" }}>
                                <ButtonGroup>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="reset_button" onClick={() => this.Reset()} >Reset</Button>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="summit_button" onClick={() => this.bisection(parseFloat(this.state.xl), parseFloat(this.state.xr))}  >Confirm</Button>
                                </ButtonGroup>
                            </div>
                        </Col>
                        <Col span={16}>
                            {this.state.showGraph && <Card bordered={true} style={{ border: "2px solid black", background: "#f44aaa6", color: "#FFFFFFFF", marginLeft: "4%" }}>
                                <Plot
                                    data={[
                                        {
                                            x: range(-10, 10, 0.5).toArray(),
                                            y: xValues.map(function (x) {
                                                return compile(fx).eval({ x: x })
                                            }),
                                            type: 'scatter',
                                            marker: { color: 'red' },
                                        }]}
                                    layout={{ title: 'Graph of Function' }}

                                    style={{ width: "100%" }}
                                /></Card>}
                        </Col>
                    </Card>
                    {this.state.showOutputCard && <Card title={"Output"} style={{  borderRadius: "10px",  marginBlockStart: "2%" }} id="outputCard" >
                        <Table columns={columns} dataSource={dataInTable} bodyStyle={{  fontSize: "16px", color: "black" }}></Table>
                    </Card>}
                </div>


            </div>
        );
    }
}
export default Bisection;