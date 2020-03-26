import React, { Component } from 'react'
import { Card, Input, Button, Table, Col, Row } from 'antd';
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
        title: "Y",
        key: "y",
        dataIndex: "y"
    }
];

var fx = "";
fx = [];
var number = [];


const xValues = range(-10, 10, 0.5).toArray();

class Jacobi extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            Ttype: 0,
            Matrixs2: false,
            Matrixs3: false,
            Matrixs4: false,
            showOutputCard: false,
            showGraph: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.jacobi = this.jacobi.bind(this);
        this.Reset = this.Reset.bind(this);
        this.Pages = this.Pages.bind(this);
    }


    /* ----------------------------------------------------------------------------------------------------------------- */
    jacobi() {
        fx = this.state.fx;
        var data = []
        if (this.state.Ttype == 1) {
            number['row1'] = [];
            number['row2'] = [];

            fx.push();
        } else if (this.state.Ttype == 2) {
            number['row1'] = [];
            number['row2'] = [];
            number['row3'] = [];

        } else if (this.state.Ttype == 3) {
            number['row1'] = [];
            number['row2'] = [];
            number['row3'] = [];
            number['row4'] = [];

        }


        this.createTable(data['x'], data['y']);
        this.setState({ showOutputCard: true, showGraph: true })
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    Reset() {
        this.setState({
            fx: "",
            Ttype: 0,
            showOutputCard: false,
            showGraph: false
        })
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    Pages(p) {
        this.setState({ Matrixs2: false });
        this.setState({ Matrixs3: false });
        this.setState({ Matrixs4: false });
        if (p == 1) {
            this.setState({ Matrixs2: true });
        } else if (p == 2) {
            this.setState({ Matrixs3: true });
        } else if (p == 3) {
            this.setState({ Matrixs4: true });
        }
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    createTable(x, y) {
        dataInTable = []
        for (var i = 0; i < x.lenght; i++) {
            dataInTable.push({
                iteration: i + 1,
                x: x[i],
                y: y[i]
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
        const { fx } = this.state

        return (

            <div >
                <h1 className="Head1">Jacobi Method</h1>

                <div className="ContentSheet">
                    <Button type="primary" block style={{ width: "15%", margin: "2%", fontSize: "10px" }} onClick={() => this.Pages(1)}> 2*2 Matrixs</Button>
                    <Button type="primary" block style={{ width: "15%", margin: "2%", fontSize: "10px" }} onClick={() => this.Pages(2)}> 3*3 Matrixs</Button>
                    <Button type="primary" block style={{ width: "15%", margin: "2%", fontSize: "10px" }} onClick={() => this.Pages(3)}> 4*4 Matrixs</Button>
                    {this.state.Matrixs2 && <Card onChange={this.handleChange} title="Input your value in Matrixs" bordered={true} style={{ borderRadius: 10 }} >
                        <Col span={8} >
                            <Input.Group>
                                <Row gutter={8}>
                                    <Col span={12}><Input size="medium" name="col1" style={{ margin: "5%" }} className="InputStyle" placeholder=" row1 column1" allowClear={true} /></Col>
                                    <Col span={12}><Input size="medium" name="col2" style={{ margin: "5%" }} className="InputStyle" placeholder=" row1 column2" allowClear={true} /></Col>
                                </Row>
                            </Input.Group>
                            <Input.Group>
                                <Row gutter={8}>
                                    <Col span={12}><Input size="medium" name="col1" style={{ margin: "5%" }} className="InputStyle" placeholder=" row2 column1" allowClear={true} /></Col>
                                    <Col span={12}><Input size="medium" name="col2" style={{ margin: "5%" }} className="InputStyle" placeholder=" row2 column2" allowClear={true} /></Col>
                                </Row>
                            </Input.Group>
                            <div style={{ textAlign: "end" }}>
                                <ButtonGroup>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="reset_button" onClick={() => this.Reset()} >Reset</Button>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="summit_button" onClick={() => this.graphical(parseFloat(this.state.start), parseFloat(this.state.finish))} >Confirm</Button>
                                </ButtonGroup>
                            </div>
                        </Col>
                        <Col span={4}>

                        </Col>
                        <Col span={12}>
                            <Row gutter={8}>
                                <Input size="medium" name="col1" style={{ margin: "5%" , width: "30%"}} className="InputStyle" placeholder=" row1 column1" allowClear={true} />
                                <Input size="medium" name="col1" style={{ margin: "5%" , width: "30%"}} className="InputStyle" placeholder=" row1 column1" allowClear={true} />
                            </Row>
                        </Col>
                    </Card>}

                    {this.state.Matrixs3 && <Card onChange={this.handleChange} title="Input your value in Matrixs" bordered={true} style={{ borderRadius: 10 }} >
                        <Col span={8} >
                            <Input.Group name="row1">
                                <Row gutter={8}>
                                    <Col span={8}><Input size="medium" name="col1" style={{ margin: "5%" }} className="InputStyle" placeholder=" row1 column1" allowClear={true} /></Col>
                                    <Col span={8}><Input size="medium" name="col2" style={{ margin: "5%" }} className="InputStyle" placeholder=" row1 column2" allowClear={true} /></Col>
                                    <Col span={8}><Input size="medium" name="col3" style={{ margin: "5%" }} className="InputStyle" placeholder=" row1 column3" allowClear={true} /></Col>
                                </Row>
                            </Input.Group>
                            <Input.Group name="row2">
                                <Row gutter={8}>
                                    <Col span={8}><Input size="medium" name="col1" style={{ margin: "5%" }} className="InputStyle" placeholder=" row2 column1" allowClear={true} /></Col>
                                    <Col span={8}><Input size="medium" name="col2" style={{ margin: "5%" }} className="InputStyle" placeholder=" row2 column2" allowClear={true} /></Col>
                                    <Col span={8}><Input size="medium" name="col3" style={{ margin: "5%" }} className="InputStyle" placeholder=" row2 column3" allowClear={true} /></Col>
                                </Row>
                            </Input.Group>
                            <Input.Group name="row3">
                                <Row gutter={8}>
                                    <Col span={8}><Input size="medium" name="col1" style={{ margin: "5%" }} className="InputStyle" placeholder=" row3 column1" allowClear={true} /></Col>
                                    <Col span={8}><Input size="medium" name="col2" style={{ margin: "5%" }} className="InputStyle" placeholder=" row3 column2" allowClear={true} /></Col>
                                    <Col span={8}><Input size="medium" name="col3" style={{ margin: "5%" }} className="InputStyle" placeholder=" row3 column3" allowClear={true} /></Col>
                                </Row>
                            </Input.Group>
                            <div style={{ textAlign: "end" }}>
                                <ButtonGroup>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="reset_button" onClick={() => this.Reset()} >Reset</Button>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="summit_button" onClick={() => this.graphical(parseFloat(this.state.start), parseFloat(this.state.finish))} >Confirm</Button>
                                </ButtonGroup>
                            </div>
                        </Col>
                        <Col span={4}>
                        </Col>
                        <Col span={12}>
                            <Row gutter={8}>
                                <Input size="medium" name="col1" style={{ margin: "2%" , width: "30%" }} className="InputStyle" placeholder=" row3 column1" allowClear={true} />
                                <Input size="medium" name="col2" style={{ margin: "2%" , width: "30%"}} className="InputStyle" placeholder=" row3 column2" allowClear={true} />
                                <Input size="medium" name="col3" style={{ margin: "2%" , width: "30%"}} className="InputStyle" placeholder=" row3 column3" allowClear={true} />
                            </Row>
                        </Col>
                    </Card>}

                    {this.state.Matrixs4 && <Card onChange={this.handleChange} title="Input your value in Matrixs" bordered={true} style={{ borderRadius: 10 }} >
                        <Col span={8} >
                            <Input.Group name="row1">
                                <Row gutter={8}>
                                    <Col span={6}><Input size="medium" name="col1" style={{ margin: "5%" }} className="InputStyle" placeholder=" row1 column1" allowClear={true} /></Col>
                                    <Col span={6}><Input size="medium" name="col2" style={{ margin: "5%" }} className="InputStyle" placeholder=" row1 column2" allowClear={true} /></Col>
                                    <Col span={6}><Input size="medium" name="col3" style={{ margin: "5%" }} className="InputStyle" placeholder=" row1 column3" allowClear={true} /></Col>
                                    <Col span={6}><Input size="medium" name="col4" style={{ margin: "5%" }} className="InputStyle" placeholder=" row1 column4" allowClear={true} /></Col>
                                </Row>
                            </Input.Group>
                            <Input.Group name="row2">
                                <Row gutter={8}>
                                    <Col span={6}><Input size="medium" name="col1" style={{ margin: "5%" }} className="InputStyle" placeholder=" row2 column1" allowClear={true} /></Col>
                                    <Col span={6}><Input size="medium" name="col2" style={{ margin: "5%" }} className="InputStyle" placeholder=" row2 column2" allowClear={true} /></Col>
                                    <Col span={6}><Input size="medium" name="col3" style={{ margin: "5%" }} className="InputStyle" placeholder=" row2 column3" allowClear={true} /></Col>
                                    <Col span={6}><Input size="medium" name="col4" style={{ margin: "5%" }} className="InputStyle" placeholder=" row2 column4" allowClear={true} /></Col>
                                </Row>
                            </Input.Group>
                            <Input.Group name="row3">
                                <Row gutter={8}>
                                    <Col span={6}><Input size="medium" name="col1" style={{ margin: "5%" }} className="InputStyle" placeholder=" row3 column1" allowClear={true} /></Col>
                                    <Col span={6}><Input size="medium" name="col2" style={{ margin: "5%" }} className="InputStyle" placeholder=" row3 column2" allowClear={true} /></Col>
                                    <Col span={6}><Input size="medium" name="col3" style={{ margin: "5%" }} className="InputStyle" placeholder=" row3 column3" allowClear={true} /></Col>
                                    <Col span={6}><Input size="medium" name="col4" style={{ margin: "5%" }} className="InputStyle" placeholder=" row3 column4" allowClear={true} /></Col>
                                </Row>
                            </Input.Group>
                            <Input.Group name="row4">
                                <Row gutter={8}>
                                    <Col span={6}><Input size="medium" name="col1" style={{ margin: "5%" }} className="InputStyle" placeholder=" row4 column1" allowClear={true} /></Col>
                                    <Col span={6}><Input size="medium" name="col2" style={{ margin: "5%" }} className="InputStyle" placeholder=" row4 column2" allowClear={true} /></Col>
                                    <Col span={6}><Input size="medium" name="col3" style={{ margin: "5%" }} className="InputStyle" placeholder=" row4 column3" allowClear={true} /></Col>
                                    <Col span={6}><Input size="medium" name="col4" style={{ margin: "5%" }} className="InputStyle" placeholder=" row4 column4" allowClear={true} /></Col>
                                </Row>
                            </Input.Group>
                            <div style={{ textAlign: "end" }}>
                                <ButtonGroup>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="reset_button" onClick={() => this.Reset()} >Reset</Button>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="summit_button" onClick={() => this.graphical(parseFloat(this.state.start), parseFloat(this.state.finish))} >Confirm</Button>
                                </ButtonGroup>
                            </div>
                        </Col>
                        <Col span={4}>

                        </Col>
                        <Col span={12}>
                            <Row gutter={8}>
                                <Input size="medium" name="col1" style={{ margin: "5%" , width: "30%"}} className="InputStyle" placeholder=" row1 column1" allowClear={true} />
                                <Input size="medium" name="col1" style={{ margin: "5%" , width: "30%"}} className="InputStyle" placeholder=" row1 column1" allowClear={true} />
                                <Input size="medium" name="col1" style={{ margin: "5%" , width: "30%"}} className="InputStyle" placeholder=" row1 column1" allowClear={true} />
                                <Input size="medium" name="col1" style={{ margin: "5%" , width: "30%"}} className="InputStyle" placeholder=" row1 column1" allowClear={true} />
                            </Row>
                        </Col>
                    </Card>}

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

                    {this.state.showOutputCard &&
                        <Card title={"Output"} bordered={true} style={{ marginBlockStart: "2%", borderRadius: 10 }} id="outputCard" >
                            <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }} />
                        </Card>
                    }
                </div>
            </div>
        );
    }
}


export default Jacobi;