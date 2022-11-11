import { Modal, Image } from 'react-bootstrap';
import useBebidas from '../hooks/useBebidas';

const ModalBebida = () => {
    const { modal, handleModalClick, receta, cargando } = useBebidas();

    const mostrarIngredientes = () => {
        let ingredientes = [];

        for (let i = 1; i < 16; i++) {
            if (receta[`strIngredient${i}`]) {
                //IMPORTANTE: push en react no se debe de utilizar, va en contra de la filosofía de react, que es, no 
                //modificar la variable original en el state; sin embargo, aquí no utilizamos un state... so, go ahead!
                ingredientes.push(
                    <li>{receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}</li>
                );
            }
        }

        return ingredientes;
    };

    return (
        !cargando && (
            <Modal show={modal} onHide={handleModalClick}>
                <Image src={receta.strDrinkThumb} alt={`Imagen recipe ${receta.strDrink}`} />

                <Modal.Header>
                    <Modal.Title>{receta.strDrink}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className='p-3'>
                        <h2>Instructions</h2>
                        {receta.strInstructions}
                        <h2>Ingredients</h2>
                        {mostrarIngredientes()}
                    </div>
                </Modal.Body>
            </Modal>
        )
    )
}

export default ModalBebida
