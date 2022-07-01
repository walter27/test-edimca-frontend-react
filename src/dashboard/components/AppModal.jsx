import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useProductStore } from '../../hooks/useProductStore';
import { useUiStore } from '../../hooks/useUiStore';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

export const AppModal = () => {
  const [formSubmite, setFormSubmite] = useState(false);

  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: 0,
  });

  const { isAppModalOpen, closeModalApp } = useUiStore();

  const { activeEvent, startSavingEvent } = useProductStore();

  const titleClassName = useMemo(() => {
    if (!formSubmite) return '';
    return formValues.name.length > 0 ? 'is-valid' : 'is-invalid';
  }, [formValues.name, formSubmite]);

  const titleClassDescription = useMemo(() => {
    if (!formSubmite) return '';
    return formValues.description.length > 0 ? 'is-valid' : 'is-invalid';
  }, [formValues.description, formSubmite]);

  const titleClassPrice = useMemo(() => {
    if (!formSubmite) return '';
    return formValues.price > 0 ? 'is-valid' : 'is-invalid';
  }, [formValues.price, formSubmite]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onCloseModal = () => {
    closeModalApp();
    setFormSubmite(false);
  };

  const formSubmitData = async (event) => {
    event.preventDefault();
    setFormSubmite(true);
    if (
      formValues.name.length > 0 &&
      formValues.description.length > 0 &&
      formValues.price > 0
    ) {
      await startSavingEvent(formValues);
      closeModalApp();
      setFormSubmite(false);
    }
  };

  return (
    <Modal
      isOpen={isAppModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <form onSubmit={formSubmitData}>
        <div className='form-group pb-4'>
          <label>Name</label>
          <input
            name='name'
            type='text '
            className={`${titleClassName} form-control`}
            placeholder='Name '
            value={formValues.name}
            onChange={onInputChange}
          />
        </div>
        <div className='form-group pb-4'>
          <label>Description</label>
          <input
            name='description'
            type='text '
            className={`${titleClassDescription} form-control`}
            placeholder='Description '
            value={formValues.description}
            onChange={onInputChange}
          />
        </div>
        <div className='form-group '>
          <label>Price</label>
          <input
            name='price'
            type='number '
            className={`${titleClassPrice} form-control`}
            placeholder='Price '
            value={formValues.price}
            onChange={onInputChange}
          />
        </div>
        <div className='col-lg-12 text-center pt-4'>
          <button className='btn btn-primary' type='submit'>
            SAVE
          </button>
        </div>
      </form>
    </Modal>
  );
};
