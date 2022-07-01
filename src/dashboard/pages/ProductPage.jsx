import { useEffect } from 'react';
import { useProductStore } from '../../hooks/useProductStore';
import { useUiStore } from '../../hooks/useUiStore';
import { AppModal } from '../components/AppModal';

export const ProductPage = () => {
  const { openModalApp } = useUiStore();

  const {
    products = [],
    setActiveEvent,
    deleteEvent,
    startLoadingProducts,
  } = useProductStore();

  const openModalProduct = () => {
    setActiveEvent({
      id: null,
      name: '',
      description: '',
      price: 0,
    });
    openModalApp();
  };

  const onSelect = (product) => {
    setActiveEvent(product);
    openModalApp();
  };

  const deleteProduct = (product) => {
    deleteEvent(product);
  };

  useEffect(() => {
    setTimeout(() => {
      startLoadingProducts();
    }, 1000);
  }, []);

  return (
    <>
      <div className='row p-5'>
        <div className='col-lg-12'>
          <h2>Products</h2>
        </div>
        <hr />
        <div className='col-lg-12 col-12 mt-5'>
          <button onClick={openModalProduct} className='btn btn-primary'>
            NEW
          </button>
        </div>
        <div className='col-lg-12 mt-4'>
          <div className='row'>
            {products.map((product) => (
              <div key={product.id} className='col-lg-4 col-12 mt-3'>
                <div className='card text-center p-3'>
                  <div className='row'>
                    <div className='col-12'>
                      <h5>{product.name} </h5>
                    </div>
                    <div className='col-12 mt-2'>
                      <p>{product.description} </p>
                    </div>
                    <div className='col-12 mt-2'>
                      <strong>{product.price} </strong>
                    </div>
                    <div className='col-lg-6 col-12 mt-3'>
                      <button
                        onClick={() => onSelect(product)}
                        className='btn btn-primary'
                      >
                        EDIT
                      </button>
                    </div>
                    <div className='col-lg-6 col-12 mt-3'>
                      <button
                        onClick={() => deleteProduct(product)}
                        className='btn btn-danger'
                      >
                        DELETE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AppModal />
    </>
  );
};
