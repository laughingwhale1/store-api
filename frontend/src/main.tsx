import React, {Suspense} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {ChakraProvider, Spinner} from "@chakra-ui/react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {setupStore} from "./store/store.ts";
import {PersistGate} from "redux-persist/integration/react";
import {AuthProvider} from "./components/AuthProvider/AuthProvider.tsx";

const store = setupStore();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
       <Provider store={store.store}>
           <PersistGate loading={null} persistor={store.persistor}>
               <Suspense fallback={<Spinner />}>
                   <ChakraProvider>
                       <AuthProvider>
                           <App />
                       </AuthProvider>
                   </ChakraProvider>
               </Suspense>
           </PersistGate>
       </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
