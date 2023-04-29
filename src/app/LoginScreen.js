import React, { Component } from 'react';
import './css/LoginForm.css';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    // Aquí puedes realizar la lógica de autenticación
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div className="login-form">
        <Container>
          <Row>
            <Col md="6" className="offset-md-3">
              <div className="form-box">
                <h1 className="text-center">Iniciar sesión</h1>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="email">Correo electrónico</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={this.state.email} 
                      onChange={this.handleInputChange} 
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="password">Contraseña</Label>
                    <Input 
                      type="password" 
                      id="password" 
                      name="password" 
                      value={this.state.password} 
                      onChange={this.handleInputChange} 
                      required
                    />
                  </FormGroup>
                  <Button color="primary" block>Ingresar</Button>
                </Form>
                <div className="text-center mt-3">
                  <p>¿No tienes una cuenta? <Link to="/registro">Regístrate aquí</Link>.</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default LoginForm;
