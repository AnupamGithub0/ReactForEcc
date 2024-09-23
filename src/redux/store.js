import { encryptTransform } from 'redux-persist-transform-encrypt';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';

const encryptor = encryptTransform({
  secretKey:  import.meta.env.VITE_SECRET_KEY_encrypt, 
  onError: function (error) {
    console.log('Encryption Error:', error);
  }
});


const persistConfig = {
  key: 'root',
  storage,
  transforms: [encryptor], 
};

const rootReducer = combineReducers({ user: userSlice });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
