import React, { Component } from 'react'
import { Input, Button, Card ,Col} from 'antd';
import 'antd/dist/antd.css';
import '../../style/style.scss';
import '../../style/fStyle.css';
import { compile } from 'mathjs';

var Algebrite = require('algebrite')

var I, exact, error;

class Simpson extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            showOutputCard: false,
            inputError: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    simpson(a, b) {
        if (this.state.fx === "" || a === 0 || b === 0) {
            this.setState({ inputError: true })
        }
        else {
            this.setState({ inputError: false })
        }
        if (this.state.inputError === false) {
            var h = (b - a)
            var x1 = (a + b) / 2
            I = (h / 2) * (this.func(a) + this.func(b) + (4 * this.func(x1)))
            exact = this.exactIntegrate(a, b)
            error = (Math.abs((I - exact) / I) * 100).toFixed(6)
            this.setState({
                showOutputCard: true
            })
        }

    }
    exactIntegrate(a, b) {
        var expr = compile(Algebrite.integral(Algebrite.eval(this.state.fx)).toString())
        return expr.eval({ x: b }) - expr.eval({ x: a })

    }
    summationFunction(n, h) {
        var sum = 0
        var counter = h
        for (var i = 1; i < n; i++) {
            sum += this.func(counter)
            counter += h
        }
        return sum
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    render() {
        return (
            <div>
                <h2  className="Head1"> Simpson's Rule</h2>
                <div className="ContentSheet">
                    <Card onChange={this.handleChange} style={{ padding: '0 50px', width: '100%%', borderRadius: "15px" }}>
                        <Col span={8}>
                            {this.state.inputError &&
                                <div style={{ textAlign: "center" }}>
                                    <br />
                                    <br />
                                    <h1>Please type your input</h1>
                                </div>}
                        </Col>
                        <Col span={8}>
                            <h3>f(x)</h3>                           <Input size="medium" name="fx" className="InputStyle" placeholder="  Please enter your function" allowClear={true} />
                            <h3>Lower bound (A)</h3>                <Input size="medium" name="a" className="InputStyle" placeholder="  Please enter your lower bound" allowClear={true} />
                            <h3>Upper bound (B)</h3>                <Input size="medium" name="b" className="InputStyle" placeholder="  Please enter your upper bound" allowClear={true} />
                            <div style={{ textAlign: "end" }}>
                                <Button id="submit_button" style={{ backgroundColor: "rgb(9, 68, 122)", color: "white", fontSize: "20px", marginTop: 20, alignItems: "center" }} onClick={() => this.Simpson(parseInt(this.state.a), parseInt(this.state.b))} >Submit</Button>
                            </div>
                        </Col>
                    </Card>

                    {this.state.showOutputCard &&
                        <Card style={{ borderRadius: "10px", margin: "10%" }}>
                            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                Approximate = {I}<br />
                                Exact = {exact}<br />
                                Error = {error}%
                            </p>
                        </Card>
                    }

                </div>

            </div>
        );
    }
}
export default Simpson