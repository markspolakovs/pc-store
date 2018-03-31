import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
  Middleware
} from "redux";
import { routerReducer, RouterState } from "react-router-redux";

import {
  State as ProductState,
  reducer as productReducer
} from "./Product/state";

import {
  State as CartState,
  reducer as cartReducer,
  selectors as cartSelectors,
  actions as cartActions
} from "./Cart/state";

export interface RootState {
  product: ProductState;
  router: RouterState;
  cart: CartState;
}

export const rootReducer = combineReducers<RootState>({
  product: productReducer,
  router: routerReducer,
  cart: cartReducer
});

const composeEnhancers =
  (process.env.NODE_ENV === "development" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

function configureStore(initialState?: RootState) {
  const middleware: Middleware[] = [];
  const enhancer = composeEnhancers(applyMiddleware(...middleware));
  return createStore(rootReducer, initialState!, enhancer);
}

const store = configureStore();

export default store;

// shitty place to put this, TODO move
store.subscribe(() => {
  const s = store.getState();
  const total = cartSelectors.total(s);
  const seizures = cartSelectors.seizures(s);
  if (total > 1_000_000_000 && seizures === null) {
    const newSeizures = confirm("If you are prone to seizures, press cancel.");
    store.dispatch(cartActions.seizures(newSeizures));
  }
});
