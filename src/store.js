import { createStore, compose, applyMiddleware } from "redux";
//import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import createSagaMiddleware from "redux-saga";
import sagaControler from './saga';
import reducer from "./reducers";

function configureStoreProd(initialState) {
  const sagaMiddleware = createSagaMiddleware(sagaControler);
  const middlewares = [sagaMiddleware];
  const store = createStore(
    reducer,
    initialState,
    compose(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(sagaControler);
  return store;
}

function configureStoreDev(initialState) {
  const sagaMiddleware = createSagaMiddleware(sagaControler);
  const middlewares = [
    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    //reduxImmutableStateInvariant(),
    sagaMiddleware
  ];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(sagaControler);

  return store;
}

const configureStore =
  process.env.NODE_ENV === "production"
    ? configureStoreProd
    : configureStoreDev;

export default configureStore;
