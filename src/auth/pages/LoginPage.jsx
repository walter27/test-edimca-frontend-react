import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../../hooks';

const loginFormFields = {
  loginUsername: '',
  loginPassword: '',
};

export const LoginPage = () => {
  const { startLogin, errorMessage } = useAuthStore();

  const { loginUsername, loginPassword, onInputChange } =
    useForm(loginFormFields);

  const loginSubmit = (event) => {
    event.preventDefault();
    startLogin({ username: loginUsername, password: loginPassword });
  };

  useEffect(() => {
    if (errorMessage !== undefined) {
      Swal.fire('Failed to login', errorMessage, 'error');
    }
  }, [errorMessage]);

  return (
    <div className='container h-100'>
      <div className='row align-items-center'>
        <div className='col-lg-4 text-center mx-auto'>
          <div className='card mt-5  p-5 h-100'>
            <h3>Login</h3>
            <form onSubmit={loginSubmit}>
              <div className='form-group mt-4'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='username'
                  name='loginUsername'
                  value={loginUsername}
                  onChange={onInputChange}
                />
              </div>
              <div className='form-group mt-4'>
                <input
                  type='password'
                  className='form-control'
                  placeholder='password'
                  name='loginPassword'
                  value={loginPassword}
                  onChange={onInputChange}
                />
              </div>
              <div className='form-group mt-4 text-center'>
                <input
                  type='submit'
                  className='btn btn-primary'
                  value='Login'
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
