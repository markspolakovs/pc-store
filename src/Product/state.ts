import { createAction, getType } from "typesafe-actions";
import { combineReducers, AnyAction } from 'redux';

import { Product } from "./types";
import products from "../data/products";

export interface State {
    readonly products: Product[];
}

const initialState: State = {
    products: products,
};

export const actions = {
};

export const reducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        default: return state;
    }
}
