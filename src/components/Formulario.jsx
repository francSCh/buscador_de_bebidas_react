import { useState } from 'react';
import { Button, Form, Row, Col, Alert } from 'react-bootstrap';
import useBebidas from '../hooks/useBebidas';
import useCategorias from '../hooks/useCategorias';

const Formulario = () => {
    const [ busqueda, setBusqueda ] = useState({
        nombre: '',
        categoria: ''
    });
    const [ alerta, setAlerta ] = useState('');

    const { categorias } = useCategorias();
    const  { consultarBebida } = useBebidas();

    const handleSubmit = e => {
        e.preventDefault();

        if(Object.values(busqueda).includes('')) {
            setAlerta('All fields are required');
            return;
        }

        setAlerta('');
        consultarBebida(busqueda);
    };

    return (
        <div>
            <Form onSubmit={handleSubmit}>

                {alerta && <Alert variant='danger' className='text-center'>{alerta}</Alert>}

                <Row>
                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='nombre'>Name</Form.Label>

                            <Form.Control id='nombre' type='text' placeholder='Tequila, Vodka, etc.' name='nombre'  value={busqueda.nombre} onChange={e => setBusqueda({ 
                                ...busqueda, 
                                [e.target.name] : e.target.value })}/>
                        </Form.Group>

                    </Col>
                    <Col md={6}>
                        <Form.Group className='mb-3'>
                            <Form.Label htmlFor='categoria'>Category</Form.Label>

                            <Form.Select id='categoria' name='categoria' value={busqueda.categoria} 
                            onChange={e => setBusqueda({ 
                                ...busqueda, 
                                [e.target.name] : e.target.value })}>
                                    
                                <option>- Select a Category -</option>
                                {categorias.map(categoria => (
                                    <option key={categoria.strCategory} value={categoria.strCategory}>
                                        {categoria.strCategory}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>

                <Row className='justify-content-end'>
                    <Col md={3}>
                        <Button variant='danger' className='text-uppercase w-100' type='submit'>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default Formulario
