import React, { Component } from 'react'
import { Card, Input, Button } from 'antd'
import 'antd/dist/antd.css'
import { compile, derivative } from 'mathjs'

var y, error, exact;
class Forward_OH extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fx: '',
            degree: 0,
            X: 0,
            H: 0,
            showOutputCard: false,
            showinput: true
        }
        this.handleChange = this.handleChange.bind(this);
        this.Forward_OH = this.Forward_OH.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    Forward_OH(X, H, degree) {
        switch (degree) {
            case 1:
                y = (this.func(X + (1 * H)) - this.func(X)) / H
                break;
            case 2:
                y = (this.func(X + (2 * H)) - 2 * this.func(X + (1 * H)) + this.func(X)) / Math.pow(H, 2)
                break;
            case 3:
                y = (this.func(X + (3 * H)) - 3 * this.func(X + (2 * H)) + 3 * this.func(X + (1 * H)) - this.func(X)) / Math.pow(H, 3)
                break;
            default:
                y = (this.func(X * (4 * H)) - 4 * this.func(X + (3 * H)) + 6 * this.func(X + (2 * H)) - 4 * this.func(X + (1 * H)) + this.func(X)) / Math.pow(H, 4)
        }
        exact = this.funcDiff(X, degree)
        error = Math.abs((y - exact) / y) * 100

        this.setState({
            showOutputCard: true,
            showinput: false
        })
    }
    func(X) {
        var expr = compile(this.state.fx);
        let scope = { x: parseFloat(X) };
        return expr.eval(scope);
    }
    funcDiff(X, degree) {
        var temp = this.state.fx, expr
        for(var i=1 ; i <= degree ; i++){
            temp = derivative(temp, 'x')
            expr = temp
        }
       

        let scope = {x:parseFloat(X)};
        return expr.eval(scope)
    }
    
    render() {
        return (
            <div>
                <br></br><br></br><br></br><br></br>
                <span style={{ color: 'Black', fontSize: '24px' }}>Forward Divided-Difference O(h)</span>
                <br></br><br></br>
                <Card

                    bordered
                    style={{ backgroundColor: 'rgb(55, 76, 104)', borderRadius: '15px' }}
                    onChange={this.handleChange}
                >
                    {this.state.showinput &&
                        <div>
                            <span style={{ color: 'white', fontSize: '24px' }}>F(x)</span><Input size="middle" name="fx" ></Input>
                            <span style={{ color: 'white', fontSize: '24px' }}>Order derivative</span><Input size="middle" name="degree" ></Input>
                            <span style={{ color: 'white', fontSize: '24px' }}>X</span><Input size="middle" name="X" ></Input>
                            <span style={{ color: 'white', fontSize: '24px' }}>H</span><Input size="middle" name="H" ></Input><br></br><br></br>
                            <Button type="primary" size="large" onClick={() => this.Forward_OH(this.state.degree, this.state.X, this.state.H)}>Submit</Button>
                        </div>}
                    {this.state.showOutputCard &&
                        <div>
                            <p style={{ color: 'white', fontSize: '24px' }}>Answer : {y.toFixed(8)}</p><br></br>
                            <p style={{ color: 'white', fontSize: '24px' }}>Error : {error.toFixed(8)}</p>
                        </div>
                    }
                </Card>
            </div>

        )
    }
}

export default Forward_OH
