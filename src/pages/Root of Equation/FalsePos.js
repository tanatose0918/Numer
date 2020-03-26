import React, { Component } from 'react';
import { Card, Input, Button, Table, Col } from 'antd';
import 'antd/dist/antd.css';
import '../../style/fStyle.css';
import { range, compile } from 'mathjs';
import Plot from 'react-plotly.js';
import ButtonGroup from 'antd/lib/button/button-group';
import math from 'mathjs';

var dataInTable ;

const columns = [
    {
        title: 'Iteration',
        dataindex: 'iteration',
        key: 'iteration'
    },
    {
        title: 'Xl',
        dataindex: 'xl',
        key: 'xl'
    },
    {
        title: 'Xr',
        dataindex: 'xr',
        key: 'xr'
    },
    {
        title: 'Error',
        dataindex: 'error',
        key: 'error'
    }

]


const xValues = range(-10, 10, 0.5).toArray();

var fx = " ";

class FalsePos extends Component {
    constructor() {
        super()

        this.state = {
            fx: "",
            xl: 0,
            xr: 0,
            showGraph: false,
            showOutput: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.false_Position = this.false_Position.bind(this);
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    Reset() {
        this.setState({
            fx: "",
            xl: 0,
            xr: 0,
            showOutputCard: false,
            showGraph: false
        });
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    false_Position(xl, xr) {
        fx = this.state.fx;
        var data = [];
        data['Xl'] = [];
        data['Xr'] = [];
        data['error'] = [];
        var xold;

        var E = parseFloat(0.000001);
        var n = 0;
        var xm;

        xm = xl - ((this.func(xr) - (xl - xr)) / (this.func(xl) - this.func(xr)));
        if ((this.func(xm) * this.func(xr)) > 0) {
            xr = xm;
        } else {
            xl = xm;
        }

        xold = xm;

        do {
            xm = xl - ((this.func(xr) - (xl - xr)) / (this.func(xl) - this.func(xr)));
            if ((this.func(xm) * this.func(xr)) > 0) {
                xr = xm;
            } else {
                xl = xm;
            }

            E = this.error(xold, xm);
            console.log(n + " " + xm + " " + E);
            data['Xl'][n] = xl.toFixed(8);
            data['Xr'][n] = xr.toFixed(8);
            data['error'][n] = E.toFixed(8);
            console.log(data['Xl'][n] + " " + data['Xr'][n] + " " + data['error'][n]);
            console.log(n);
            xold = xm;
            n++;
        } while (Math.abs(E) > 0.000001);

        this.createTable(data['Xl'], data['Xr'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        });
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    createTable(xl, xr, error) {
        dataInTable = [];
        for (var i = 0; i < xl.length ; i++) {
            dataInTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                error: error[i]
            });
        }
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    func(X) {
        var expr = math.compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    };
    /* ----------------------------------------------------------------------------------------------------------------- */
    render() {
        return (
            <div>
                <h1 className="Head1">False Position</h1>
                <div className="ContentSheet">
                    <Card title={"Input your function and value"} id="inputCard" className="CardTemplate" bordered={true} onChange={this.handleChange} >
                        <Col span={8}>
                            <h3 style={{ color: "black" }}>f(x)</h3>                            <Input size="medium" name="fx" className="InputStyle" placeholder="Please enter your function" allowClear={true} />
                            <h3 style={{ color: "black" }}>X<sub>L</sub>: Left value  </h3>     <Input size="medium" name="xl" className="InputStyle" placeholder="Please enter Left side value" allowClear={true} />
                            <h3 style={{ color: "black" }}>X<sub>R</sub>: Right value </h3>     <Input size="medium" name="xr" className="InputStyle" placeholder="Please enter Right side value" allowClear={true} />
                            <div style={{ textAlign: "end" }}>
                                <ButtonGroup>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="reset_button" onClick={() => this.Reset()} >Reset</Button>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="summit_button" onClick={() => this.false_Position(parseFloat(this.state.xl), parseFloat(this.state.xr))}  >Confirm</Button>
                                </ButtonGroup>
                            </div>
                        </Col>
                        <Col span={16}>
                            {this.state.showGraph && <Card bordered={true} style={{ border: "2px solid black", background: "#f44aaa6", color: "#FFFFFFFF", marginLeft: "4%" }}>
                                <Plot
                                    data={[
                                        {
                                            x: range(-10, 10, 0.1).toArray(),
                                            y: xValues.map(function (x) {
                                                return compile(fx).eval({ x: x })
                                            }),
                                            type: 'scatter',
                                            marker: { color: 'red' }
                                        }
                                    ]}
                                    layout={{ title: 'Graph of Function' }}
                                    style={{ width: "100%" }}
                                />
                            </Card>}
                        </Col>
                    </Card>
                </div>
                <div>
                    {this.state.showOutputCard && <Card title={"Output"} style={{ borderRadius: "10px", marginBlockStart: "2%" }} className="OutputCard" id="outputCard" >
                        <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontSize: "16px", color: "black" }} /> </Card>}
                </div>
            </div>
        )
    }
}

export default FalsePos;
