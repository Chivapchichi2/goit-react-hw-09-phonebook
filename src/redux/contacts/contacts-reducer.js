import { combineReducers } from 'redux';
import { createReducer } from '@reduxjs/toolkit';
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
  changeFilter,
} = contactsActions;

const items = createReducer([], {
  [fetchItemsSuccess]: (_, { payload }) => payload,
  [addItemSuccess]: (state, { payload }) => [...state, payload],
  [deleteItemSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
  [changeFilter]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [fetchItemsRequest]: () => true,
  [fetchItemsSuccess]: () => false,
  [fetchItemsError]: () => false,
  [addItemRequest]: () => true,
  [addItemSuccess]: () => false,
  [addItemError]: () => false,
  [deleteItemRequest]: () => true,
  [deleteItemSuccess]: () => false,
  [deleteItemError]: () => false,
});

export default combineReducers({
  items,
  filter,
  loading,
});
