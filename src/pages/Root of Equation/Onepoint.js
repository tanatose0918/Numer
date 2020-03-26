import React, { Component } from 'react'
import { Layout, Input, Button, Card, Table, Col } from 'antd';
import 'antd/dist/antd.css';
import '../../style/style.scss';
import '../../style/fStyle.css';
import { range, compile } from 'mathjs';
import Plot from 'react-plotly.js';
import math from 'mathjs';
import ButtonGroup from 'antd/lib/button/button-group';

var dataInTable;

const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];
var fx = "";
var x = []
const xValues = range(-10, 10, 0.5).toArray();

class Onepoint extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.onepoint = this.onepoint.bind(this);
    }
    onepoint(xold) {
        fx = this.state.fx;
        var xnew = 0;
        var epsilon = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['x'] = []
        data['error'] = []

        do {
            xnew = this.func(xold);
            epsilon = this.error(xnew, xold)
            data['x'][n] = xnew.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);
            n++;
            xold = xnew;

        } while (Math.abs(epsilon) > 0.000001);

        this.createTable(data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    error(xnew, xold) {
        return Math.abs((xnew - xold) / xnew);
    }
    createTable(x, error) {
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                error: error[i]
            });
        }
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div>
                <h2 style={{ color: "black", fontWeight: "bold" }}>Onepoint</h2>
                <div className="ContentSheet">
                    <Card onChange={this.handleChange} title="Input your function and value" bordered={true} style={{ borderRadius: 10 }} >
                        <form onReset={this.Reset}>
                            <Col span={8} >

                                <h3 style={{ color: "black" }}>f(x): Function</h3>      <Input size="medium" name="fx" className="InputStyle" placeholder="  Please enter your function" allowClear={true} />
                                <h3 style={{ color: "black" }}>Starter X value</h3>     <Input size="medium" name="x0" className="InputStyle" placeholder="  Please enter Start value" allowClear={true} />
                                <div style={{ textAlign: "end" }}>
                                    <ButtonGroup>
                                        <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="reset_button" onClick={() => this.Reset()} >Reset</Button>
                                        <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="summit_button" onClick={() => this.onepoint(parseFloat(this.state.x0))} >Confirm</Button>
                                    </ButtonGroup>
                                </div>
                            </Col>
                        </form>
                        <Col span={16}>
                            {this.state.showGraph && <Card bordered={true} style={{ border: "2px solid black", background: "#f44aaa6", color: "#FFFFFFFF", marginLeft: "4%" }} >
                                <Plot
                                    data={[
                                        {
                                            x: math.range(-10, 10, 0.5).toArray(),
                                            y: xValues.map(function (x) {
                                                return math.compile(fx).eval({ x: x })
                                            }),
                                            type: 'scatter',
                                            marker: { color: 'red' },
                                        },
                                    ]}
                                    layout={{ title: 'Graph of Function' }}
                                    style={{ width: "100%" }}
                                />
                            </Card>}
                        </Col>
                    </Card>
                    {this.state.showOutputCard &&
                        <Card title={"Output"} bordered={true} style={{ marginBlockStart: "2%", borderRadius: 10 }} id="outputCard" >
                            <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }} />
                        </Card>
                    }
                </div>
            </div>
        )
    }
}
export default Onepoint;
