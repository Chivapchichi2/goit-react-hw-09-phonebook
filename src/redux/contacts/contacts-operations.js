import axios from 'axios';
import contactsActions from './contacts-actions';

const {
  fetchItemsRequest,
  fetchItemsSuccess,
  fetchItemsError,
  addItemRequest,
  addItemSuccess,
  addItemError,
  deleteItemRequest,
  deleteItemSuccess,
  deleteItemError,
} = contactsActions;

const fetchContacts = () => async dispatch => {
  dispatch(fetchItemsRequest());
  try {
    const { data } = await axios.get('/contacts');

    dispatch(fetchItemsSuccess(data));
  } catch (error) {
    dispatch(fetchItemsError(error.message));
  }
};

const addContact = contact => async dispatch => {
  dispatch(addItemRequest());
  try {
    const { data } = await axios.post('/contacts', contact);

    dispatch(addItemSuccess(data));
  } catch (error) {
    dispatch(addItemError(error.message));
  }
};

const deleteContact = id => async dispatch => {
  dispatch(deleteItemRequest());
  try {
    await axios.delete(`/contacts/${id}`);

    dispatch(deleteItemSuccess(id));
  } catch (error) {
    dispatch(deleteItemError(error.message));
  }
};

export default { fetchContacts, addContact, deleteContact };
