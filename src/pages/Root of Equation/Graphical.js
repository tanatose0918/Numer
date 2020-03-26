import React, { Component } from 'react'
import { Card, Input, Button, Table, Col } from 'antd';
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

const xValues = range(-10, 10, 0.5).toArray();

class Graphical extends Component {

    constructor() {
        super();
        this.state = {
            fx: "",
            start: 0,
            finish: 0,

            showOutputCard: false,
            showGraph: false,
            errorInput: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.graphical = this.graphical.bind(this);
        this.Reset = this.Reset.bind(this);
    }


    /* ----------------------------------------------------------------------------------------------------------------- */
    graphical() {

        fx = this.state.fx;
        var data = []
        data['x'] = []
        data['y'] = []
        for (var i = parseInt(this.state.start); i <= parseInt(this.state.finish); i++) {
            data['x'].push(i);
            data['y'].push(this.func(i));
        }
        this.createTable(data['x'], data['y']);
        this.setState({ showOutputCard: true, showGraph: true })
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    Reset() {
        this.setState({
            fx: "",
            start: 0,
            finish: 0,

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
    createTable(x, y) {
        dataInTable = []
        for (var i = 0; i < parseInt(this.state.finish - this.state.start); i++) {
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
                <h1 className="Head1">Graphical</h1>

                <div className="ContentSheet">
                    <Card onChange={this.handleChange} title="Input your function and value" bordered={true} style={{ borderRadius: 10 }} >
                        <form onReset={this.Reset}>
                            <Col span={8} >

                                <h3 style={{ color: "black" }}>f(x): Function</h3>  <Input value={fx} size="medium" name="fx" className="InputStyle" placeholder="  Please enter your function" allowClear={true} />
                                <h3 style={{ color: "black" }}>Start Point</h3>     <Input size="medium" name="start" className="InputStyle" placeholder="  Please enter Start value" allowClear={true} />
                                <h3 style={{ color: "black" }}>Finish Point</h3>    <Input size="medium" name="finish" className="InputStyle" placeholder="  Please enter Finish value" allowClear={true} />
                                <div style={{ textAlign: "end" }}>
                                    <ButtonGroup>
                                        <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="reset_button" onClick={() => this.Reset()} >Reset</Button>
                                        <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="summit_button" onClick={() => this.graphical(parseFloat(this.state.start), parseFloat(this.state.finish))} >Confirm</Button>
                                    </ButtonGroup>
                                </div>
                            </Col>
                        </form>
                        <Col span={16}>
                            {this.state.errorInput && <h1 style={{ textAlign: "center" }} > Please Enter a new value </h1>}
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
        );
    }
}


export default Graphical;