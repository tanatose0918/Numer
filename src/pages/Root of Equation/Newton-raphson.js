import React, { Component } from 'react'
import {Card, Input, Button, Table,Col} from 'antd';
import 'antd/dist/antd.css';
import math from 'mathjs';
import Plot from 'react-plotly.js';
import '../../style/fStyle.css';

import ButtonGroup from 'antd/lib/button/button-group';

var dataInTable ;

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

  const xValues = math.range(-10, 10, 0.5).toArray();
  var fx = " ";

class Newton extends Component {
    
    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.newton_raphson = this.newton_raphson.bind(this);
        this.Reset = this.Reset.bind(this);
    }
/* ----------------------------------------------------------------------------------------------------------------- */
    newton_raphson(xold) {
        fx = this.state.fx;
        var xnew = 0;
        var E = parseFloat(0.000000);
        var n = 0;
        var data  = []
        data['x'] = []
        data['error'] = []
        do{ 
            xnew = xold - (this.func(xold)/this.funcDiff(xold));
            E = this.error(xnew, xold)
            data['x'][n] =  xnew.toFixed(8);
            data['error'][n] = E.toFixed(8);
            n++;  
            xold = xnew;
        }while(E>0.000001);

        this.createTable(data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })
    }
/* ----------------------------------------------------------------------------------------------------------------- */
    func(X) {
        var expr = math.compile(this.state.fx);
        let scope = {x:parseFloat(X)};
        return expr.eval(scope);        
    }
/* ----------------------------------------------------------------------------------------------------------------- */
    funcDiff(X) {
        var expr = math.derivative(this.state.fx, 'x');
        let scope = {x:parseFloat(X)};
        return expr.eval(scope); 
    }
/* ----------------------------------------------------------------------------------------------------------------- */
    error(xnew, xold) {
        return math.abs((xnew-xold) / xnew);
    }
    /* ----------------------------------------------------------------------------------------------------------------- */
    Reset() {
        this.setState({
            fx: "",
            x0: 0,
            showOutputCard: false,
            showGraph: false
        });
    }
/* ----------------------------------------------------------------------------------------------------------------- */
    createTable(x, error) {
        dataInTable = []
        for (var i = 0 ; i<x.length ; i++) {
            dataInTable.push({
                iteration: i+1,
                x: x[i],
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
        return(
            <div >
                <h2 className="Head1">Newton Raphson</h2>
                <div className="ContentSheet">
                    <Card title={"Input False Postion"} onChange={this.handleChange}>
                        <Col span={8}>
                        <h3 style={{color:'black'}}>f(x)</h3>                               <Input size="medium" name="fx" className="InputStyle" placeholder="Please enter your function"  allowClear={true}/>
                        <h3 style={{ color: 'black' }}>X<sub>old</sub> Or start value</h3>     <Input size="medium" name="x0" className="InputStyle" placeholder="Please enter start value" allowClear={true} />
                        <div style={{ textAlign: "end" }}>
                                <ButtonGroup>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="reset_button" onClick={() => this.Reset()} >Reset</Button>
                                    <Button className="SubmitButton" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} id="summit_button" onClick={() => this.newton_raphson(this.state.x0)}  >Confirm</Button>
                                </ButtonGroup>
                            </div>
                        </Col>
                        <Col span={16}>
                        {this.state.showGraph && <Card title={"Graph"} bordered={true} style={{ border:"2px solid black", background: "#f44aaa6", color: "#FFFFFFFF", marginLeft: "4%"}}>
                            <Plot
                                data={[
                                {
                                    x: math.range(-10, 10, 1).toArray(),
                                    y: xValues.map(function (x) {
                                        return math.compile(fx).eval({x: x})
                                    }),
                                    type: 'scatter',
                                    marker: {color: 'red'},
                                }
                                ]}
                                layout={ {title: 'Function of Graph'} }
                                style={{width: "100%"}}
                            />  
                            </Card> }
                        </Col>
                    </Card>   
                    {this.state.showOutputCard && <Card title={"Output"} style={{ borderRadius: "10px", marginBlockStart: "2%"}} className="OutputCard" id="outputCard" >
                         <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontSize: "16px", color: "black"}}/>
                         </Card>}                    
                </div>
            </div>
        );
    }
}
export default Newton;