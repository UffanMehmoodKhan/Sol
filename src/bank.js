import * as redux from "redux";

const createStore = redux.createStore;

function withdraw(){
    return {
        type: "withdraw",
        amount: 100
    }
}

function deposit(){
    return {
        type: "deposit",
        amount: 100
    }
}

const initialState = {
    balance: 1000,
    accountName: "John Doe",
    accountNumber: "1234567890",
    accountType: "Savings",
    accountStatus: "Active",
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "withdraw":
            return {
                ...state,
                balance: state.balance - action.amount
            }
        case "deposit":
            return {
                ...state,
                balance: state.balance + action.amount
            }
        default:
            return state;
    }
}

const store = createStore(reducer);

const unsubscribe = store.subscribe(() => {
    console.log("Updated state: ", store.getState());
});

store.dispatch(withdraw());
store.dispatch(deposit());
store.dispatch(withdraw());

unsubscribe();

store.dispatch(deposit());
store.dispatch(deposit());