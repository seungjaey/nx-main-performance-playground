import { configureStore, getDefaultMiddleware, ThunkAction } from '@reduxjs/toolkit';
import { AnyAction, combineReducers } from 'redux';
import { shallowEqual, TypedUseSelectorHook, useSelector } from 'react-redux';

import benchmark from '@/src/store/slices/benchmark';

const reducer = combineReducers({
  benchmark,
});

export const store = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware({ thunk: true })],
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>;
export const useAppSelector: TypedUseSelectorHook<RootState> = (selectFunction) =>
  useSelector(selectFunction, shallowEqual);
