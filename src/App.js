import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'antd/dist/antd.css';
import './style/style.scss';
import { Layout, Menu, Icon } from 'antd';
import Graphical from './pages/Root of Equation/Graphical'
import Bisection from './pages/Root of Equation/Bisection'
import FalsePos from './pages/Root of Equation/FalsePos'
import Cramer from './pages/Linear Algebra/Cramer'
import Newton from './pages/Root of Equation/Newton-raphson'
import Onepoint from './pages/Root of Equation/Onepoint'
import Secant from './pages/Root of Equation/Secant'
import Jacobi from './pages/Linear Algebra/Jacobi'
import NewtonD from './pages/Interpolation/NewtonD'
import CompositeSimpson from './pages/Intregration/CompositeSimpson'
import CompositeTrapzoidal from './pages/Intregration/CompositeTrapzoidal'
import Trapzoidal from './pages/Intregration/Trapzoidal'
import Simpson from './pages/Intregration/Simpson'

const { SubMenu } = Menu;
const { Header, Content, Footer  } = Layout;

class App extends Component {

render() {
  return (
    <Router>
      <Layout id="styleScroll" >
        <Layout >
          <Header  style={{ height: "80px" , backgroundColor: 'rgb(7, 54, 68)' }}>
            <h1  style={{marginTop: '10px', marginLeft:'10px' , color: 'White', fontSize: '45px', fontFamily:'Lucida Sans' }}> <Icon type= "calculator"/>  Numerical Medthod  </h1> 
          </Header>
        </Layout>

        <Layout >
            <Menu mode="horizontal"  style={{ height: '50px', backgroundColor: "rgb(230, 207, 77)" }} theme="light" >
              <SubMenu key="root_submenu" title={<span><Icon type="caret-right" />Root of Equation</span>}>
                <Menu.Item key="menu_graphical" >Graphical        <Link to="/graphical" /></Menu.Item>
                <Menu.Item key="menu_bisection" >Bisection        <Link to="/bisection" /></Menu.Item>
                <Menu.Item key="menu_false">False Position        <Link to="/FalsePos"/></Menu.Item>
                <Menu.Item key="menu_onepoint">One-Point Iteration<Link to="/Onepoint"/>  </Menu.Item>
                <Menu.Item key="menu_newton">Newton-Raphson       <Link to="/NewtonRaph"/></Menu.Item>
                <Menu.Item key="menu_secant">Secant Method        <Link to="/Secant"/></Menu.Item>
              </SubMenu>

              <SubMenu key="algebra_submenu" title={<span> <Icon type="caret-right" theme="outlined" />Linear Algebra</span>}>
                <Menu.Item key="menu_cramer">Cramer's Rule                  <Link to="/cramer" /></Menu.Item>
                <Menu.Item key="menu_gauss">Gauss's Elimination             </Menu.Item>
                <Menu.Item key="menu_jordan">Gauss Jordan Method            </Menu.Item>
                <Menu.Item key="menu_inverse">Matrix Inversion              </Menu.Item>
                <Menu.Item key="menu_lu">LU Decomposition                   </Menu.Item>
                <Menu.Item key="menu_cholesky">Cholesky Decomposition       </Menu.Item>
                <Menu.Item key="menu_jacobi">Jacobi Iteration Method        <Link to ="/Jacobi"/></Menu.Item>
                <Menu.Item key="menu_seidel">Gauss Seidel Iteration         </Menu.Item>
                <Menu.Item key="menu_gradient">Conjugate Gradient Method    </Menu.Item>
              </SubMenu>

              <SubMenu key="interpolate_submenu" title={<span><Icon type="caret-right" />Interpolation</span>}>
                <Menu.Item key="menu_D">Newton Divide Difference            <Link to="/NewtonD"/></Menu.Item>
                <Menu.Item key="menu_lagrange">Lagrange                     </Menu.Item>
                <Menu.Item key="menu_spline">Spline                         </Menu.Item>
              </SubMenu>

              <SubMenu key="regression_submenu" title={<span><Icon type="caret-right" />Least Square Error</span>}>
                <Menu.Item key="menu_linear">Linear Regression</Menu.Item>
                <Menu.Item key="menu_poly">Polynomial Regression</Menu.Item>
                <Menu.Item key="menu_multiple">Multiple Linear Regression</Menu.Item>
              </SubMenu>

              <SubMenu key="integrate_submenu" title={<span><Icon type="caret-right" />Integration</span>}>
                <Menu.Item key="menu_compositeTrapzoidal">Trapezoidal Rule            <Link to="/Trapezoidal"/></Menu.Item>
                <Menu.Item key="menu_compositeTrapzoidal">Composite Trapezoidal Rule  <Link to="/CompositeTrapezoidal"/></Menu.Item>
                <Menu.Item key="menu_compositeSimpson">Simpson's Rule                 <Link to="/Simpson"/></Menu.Item>
                <Menu.Item key="menu_compositeSimpson">Composite Simpson's Rule       <Link to="/CompositeSimpson"/></Menu.Item>
              </SubMenu>

              <SubMenu key="diff_submenu" title={<span><Icon type="caret-right" />Differentiation</span>}>
                <Menu.Item key="menu_forwardh">Forward Divided-Differences O(h)</Menu.Item>
                <Menu.Item key="menu_backwardh">Backward Divided-Differences O(h)</Menu.Item>
                <Menu.Item key="menu_centralh">Central Divided-Differences O(h{<sup>2</sup>})</Menu.Item>
                <Menu.Item key="menu_forward2h">Forward Divided-Differences O(h{<sup>2</sup>})</Menu.Item>
                <Menu.Item key="menu_backward2h">Backward Divided-Differences O(h{<sup>2</sup>})</Menu.Item>
                <Menu.Item key="menu_central2h">Central Divided-Differences O(h{<sup>4</sup>})</Menu.Item>
              </SubMenu>
            </Menu>

          <Content style={{ padding: '24px',  minHeight: '480px', backgroundColor:'rgb(255, 254, 208)' }}>
            <Route path="/graphical"    component={Graphical} />
            <Route path="/bisection"    component={Bisection} />
            <Route path="/FalsePos"     component={FalsePos}/>
            <Route path="/cramer"       component={Cramer}/>
            <Route path="/NewtonRaph"   component={Newton}/>
            <Route path="/CompositeSimpson"   component={CompositeSimpson}/>
            <Route path="/CompositeTrapezoidal" component={CompositeTrapzoidal}/>
            <Route path="/Trapezoidal"          component={Trapzoidal}/>
            <Route path="/Simpson"      component={Simpson}/>
            <Route path="/Secant"       component={Secant}/>
            <Route path="/Onepoint"     component={Onepoint}/>

            
            <Route path="/Jacobi"       component={Jacobi}/>
            <Route path="/NewtonD"      component={NewtonD}/>
          </Content>
        </Layout>
      
        <Footer style={{ backgroundColor: "rgb(7, 54, 68)" , color:"white" ,textAlign: "center"}}  >
              © All Right Reserved
              <br />
              Department of Computer and Information Science - King Mongkut's University of Technology North Bangkok
            
        </Footer>

      </Layout>
    </Router>

    )
  }
}

export default App
