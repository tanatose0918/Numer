import React, { Component } from 'react'
import { Card, Input, Button, Table, Col, Form } from 'antd';
import 'antd/dist/antd.css';
import '../../style/style.scss';
import '../../style/fStyle.css';
import { range, compile } from 'mathjs';
import Plot from 'react-plotly.js';
import math from 'mathjs';
import ButtonGroup from 'antd/lib/button/button-group';

var tableFirst = []

const columnFirst = [
    {
        title: "Points",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    }
];

var fx = "";
var X = [], Y = [], n = 0


class NewtonD extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            y: 0,
            xlast: 0,
            findX: 0,
            showTable: false,
            insertfx: true,
            showInput: false,
            showOutputCard: false,
            selected: true,
            lastInput: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.NewtonD = this.NewtonD.bind(this);
        this.Reset = this.Reset.bind(this);
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    Addpoint() {
        this.setState({
            showTable: false
        })
        if (this.state.insertfx) {
            X.push(this.state.x);
            Y.push(this.func(X[n]))
            n++;
            tableFirst.push({
                iteration: n,
                x: X[n - 1],
                y: Y[n - 1]
            });
        } else {
            X.push(this.state.x);
            Y.push(this.state.y);
            n++;
            tableFirst.push({
                iteration: n,
                x: X[n - 1],
                y: Y[n - 1]
            });
        }

        this.setState({
            showTable: true
        })
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    NewtonD(xlast) {
        var k, C = 0, Ans = [], A = []
        let i = 0, n
        console.log(X.length)
        while (i < X.length) {
            k = X.length - i - 1;
            n = 0
            A = []
            console.log(k);
            while (k >= 0) {
                if (i === 0) {
                    A.push(Y[n])
                } else {
                    A.push((Ans[i - 1][n + 1] - Ans[i - 1][n]) / (X[n + 1] - X[n]))
                }
                console.log(A[n])
                n++;
                k--;
            }
            Ans.push(A)
            i++;
        }
        i = 0
        while (i < X.length) {
            C = C + (Ans[i][0] * (this.FindX(xlast, i + 1)))
            i++;
        }


        console.log(C);
        this.setState({ findX: C, showOutputCard: true });
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    FindX(xlast, n) {
        var i = 0
        var xnew = [], temp = 1
        while (i < n) {
            xnew.push(xlast - X[i]);
            i++;
        }
        i = 0
        while (i < n) {
            temp = temp * xnew[i];
            i++;
        }
        return temp;
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    ConfirmFx() {
        fx = this.state.fx;
        this.setState({
            showInput: true
        })
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    Reset() {
        n = 0;
        X = [];
        Y = [];
        this.setState({
            fx: "",
            x: 0,
            y: 0,
            xlast: 0,
            findx: 0,
            showTable: false,
            insertfx: true,
            showInput: false,
            showOutputCard: false,
            showGraph: false,
            selected: true,
            lastInput: false
        })
        console.log(X, Y)
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }

    /* ----------------------------------------------------------------------------------------------------------------- */
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    render() {
        const { fx } = this.state

        return (
            <div>
                <h1 className="Head1">Newton Divide Difference</h1>
                <div className="ContentSheet">
                    <Card onChange={this.handleChange} title="Input your function and value" bordered={true} style={{ borderRadius: 10 }} >
                        {this.state.selected &&
                            <div style={{ textAlign: "center" }}>
                                <Button type="primary" block style={{ width: "15%", margin: "2%", fontSize: "10px" }} onClick={() => this.setState({ insertfx: true, selected: false })}> Have Function</Button>
                                <Button type="primary" block style={{ width: "15%", margin: "2%", fontSize: "10px" }} onClick={() => this.setState({ insertfx: false, selected: false })}> No   Function</Button>
                            </div>
                        }
                        <Col span={6}>
                            <form onReset={this.Reset}>
                                {
                                    this.state.insertfx === false && this.state.selected === false &&
                                    <div>
                                        <h3 style={{ color: "black" }}>X value</h3>         <Input size="medium" name="x" className="InputStyle" placeholder="  Please enter X value" allowClear={true} />
                                        <h3 style={{ color: "black" }}>Y value</h3>         <Input size="medium" name="y" className="InputStyle" placeholder="  Please enter Y value" allowClear={true} />
                                        <ButtonGroup>
                                            <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} onClick={() => this.Reset()} >Reset</Button>
                                            <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} onClick={() => this.Addpoint()} >Add Point</Button>
                                            <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} onClick={() => this.setState({ lastInput: true , showInput: false })} >Confirm</Button>
                                        </ButtonGroup>
                                    </div>
                                }

                                {this.state.insertfx && this.state.selected === false &&
                                    <div>
                                        <h3 style={{ color: "black" }}>f(x): Function</h3>  <Input value={fx} size="medium" name="fx" className="InputStyle" placeholder="  Please enter your function" allowClear={true} />
                                        <div style={{ textAlign: "end" }}>
                                            <ButtonGroup>
                                                <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} onClick={() => this.Reset()} >Reset</Button>
                                                <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} onClick={() => this.ConfirmFx()} >Confirm</Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>

                                }

                                {
                                    this.state.showInput && this.state.selected === false &&
                                    <div >
                                        <h3 style={{ color: "black" }}>X value</h3>         <Input size="medium" name="x" className="InputStyle" placeholder="  Please enter X value" allowClear={true} />
                                        <div style={{ textAlign: "end" }}>
                                            <ButtonGroup>
                                                <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} onClick={() => this.Reset()} >Reset</Button>
                                                <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} onClick={() => this.Addpoint()} >Add Point</Button>
                                                <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} onClick={() => this.setState({ lastInput: true })} >Confirm</Button>
                                            </ButtonGroup>
                                        </div>

                                    </div>
                                }
                                {this.state.lastInput &&
                                    <div>
                                        <h3 style={{ color: "black" }}> X value to find</h3>    <Input size="medium" name="xlast" className="InputStyle" placeholder="  Please enter X value to find" allowClear={true} />
                                        <div style={{ textAlign: "end" }}>
                                            <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} onClick={() => this.NewtonD(parseFloat(this.state.xlast))} >Confirm</Button>
                                        </div>
                                    </div>}
                            </form>
                        </Col>

                        <Col span={16}>
                            {this.state.showInput &&
                                <div style={{ textAlign: "center" , marginLeft: "10%"}}>
                                    <h1>
                                        fx = {this.state.fx}
                                    </h1><br />
                                    {this.state.showTable && 
                                        
                                        <Table columns={columnFirst} bordered={true} dataSource={tableFirst} bodyStyle={{ textAlign: "center", fontSize: "14px", color: "black" }} />
                                    }

                                </div>
                            }

                            {this.state.errorInput &&
                                <h1 style={{ textAlign: "center" }} > Please Enter a new value </h1>
                            }

                        </Col>
                    </Card>
                    {this.state.showOutputCard &&
                        <Card title={"Output"} bordered={true} style={{ marginBlockStart: "2%", borderRadius: 10 }} id="outputCard" >
                            <div style={{ textAlign: "center" }}>
                                the answer is {this.state.findX}
                            </div>
                        </Card>
                    }
                </div>
            </div>
        );
    }
}


export default NewtonD;