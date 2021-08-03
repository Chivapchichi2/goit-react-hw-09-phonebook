import axios from 'axios';
import authActions from './auth-actions';

const {
  registerRequest,
  registerSuccess,
  registerError,
  loginRequest,
  loginSuccess,
  loginError,
  logoutRequest,
  logoutSuccess,
  logoutError,
  getCurrentUserRequest,
  getCurrentUserSuccess,
  getCurrentUserError,
} = authActions;

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set(tok) {
    axios.defaults.headers.common.Authorization = `Bearer ${tok}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
};

const register = credential => async dispatch => {
  dispatch(registerRequest());
  try {
    const { data } = await axios.post('/users/signup', credential);
    token.set(data.token);
    dispatch(registerSuccess(data));
  } catch (error) {
    dispatch(registerError(error.message));
  }
};

const login = credential => async dispatch => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post('/users/login', credential);
    token.set(data.token);
    dispatch(loginSuccess(data));
  } catch (error) {
    dispatch(loginError(error.message));
  }
};

const logout = () => async dispatch => {
  dispatch(logoutRequest());
  try {
    await axios.post('/users/logout');
    token.unset();
    dispatch(logoutSuccess());
  } catch (error) {
    dispatch(logoutError(error.message));
  }
};

const getCurrentUser = () => async (dispatch, getState) => {
  const {
    auth: { token: persistedToken },
  } = getState();

  if (!persistedToken) return;

  token.set(persistedToken);

  dispatch(getCurrentUserRequest());
  try {
    const { data } = await axios.get('/users/current');
    dispatch(getCurrentUserSuccess(data));
  } catch (error) {
    dispatch(getCurrentUserError(error.message));
  }
};

export default { register, login, logout, getCurrentUser };
