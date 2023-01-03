import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";



class Formulario extends React.Component {
  state = {
    data:[],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombres: "",
      apellidos: "",
      identificacion: "",
      edad: "",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id == registro.id) {
        arreglo[contador].nombres = dato.nombres;
        arreglo[contador].apellidos = dato.apellidos;
        arreglo[contador].identificacion = dato.identificacion;
        arreglo[contador].edad = dato.edad;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });

  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id == registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= (e)=>{

    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }
  

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };


  
  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear Registros</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombres</th>
                <th>Apellidos</th>
                <th>Identificacion</th>
                <th>Edad</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombres}</td>
                  <td>{dato.apellidos}</td>
                  <td>{dato.identificacion}</td>
                  <td>{dato.edad}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.id}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                nombres: 
              </label>
              <input
                className="form-control"
                name="nombres"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombres}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellidos: 
              </label>
              <input
                className="form-control"
                name="apellidos"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellidos}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Identificacion: 
              </label>
              <input
                className="form-control"
                name="identificacion"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.identificacion}
              />
            </FormGroup>
            <FormGroup>
              <label>
                Edad: 
              </label>
              <input
                className="form-control"
                name="edad"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.edad}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Guardar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Registros</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombres: 
              </label>
              <input
                className="form-control"
                name="nombres"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellidos: 
              </label>
              <input
                className="form-control"
                name="apellidos"
                type="text"
                onChange={this.handleChange}
              />
              </FormGroup>
              <FormGroup>
              <label>
                Identificacion: 
              </label>
              <input
                className="form-control"
                name="identificacion"
                type="number"
                onChange={this.handleChange}
              />
              </FormGroup>
              <FormGroup>
              <label>
                Edad: 
              </label>
              <input
                className="form-control"
                name="edad"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default Formulario;