import { createAction, getType } from "typesafe-actions";
import { combineReducers, AnyAction } from 'redux';
import { createSelector } from 'reselect';

import { Product } from "../Product/types";
import { RootState } from "../state";

export interface State {
    items: Product[];
    seizures: boolean | null;
    epilepsy: boolean;
}

const initialState: State = {
    items: [],
    seizures: null,
    epilepsy: false
};

const items = (state: RootState) => state.cart.items;

const total = createSelector(
    items,
    (items) => {
        return items.reduce((prev, curr) => prev + curr.price, 0);
    }
);

const seizures = (state: RootState) => state.cart.seizures;

const epilepsy = createSelector(
    total,
    seizures,
    (total, seizures) => {
        return total > 1_000_000_000 && seizures;
    }
)

export const selectors = {
    items,
    total,
    seizures,
    epilepsy
};

export const actions = {
    addItem: createAction("ADD_ITEM", (item: Product) => ({
        type: "ADD_ITEM",
        item
    })),
    clearCart: createAction("CLEAR_CART"),
    seizures: createAction("SEIZURES", (val: boolean) => ({
        type: "SEIZURES",
        val
    }))
};

export const reducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case getType(actions.addItem):
            return {
                ...state,
                items: [...state.items, action.item]
            };
        case getType(actions.clearCart):
            return {
                ...state,
                items: []
            };
        case getType(actions.seizures):
            return {
                ...state,
                seizures: action.val
            };
        default: return state;
    }
}
