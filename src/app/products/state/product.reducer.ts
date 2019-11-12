// this function takes 2 paramter first the current state of store and 2nd is the action performed.
// for each action performed we have a switch case which gets executed
export function reducer(state, action) {
    switch (action.type) {
        case 'TOGGLE_PRODUCT_CODE':
            console.log('exisiting state' + JSON.stringify(state))
            console.log('payload' + action.payload)
            return {
                ...state,
                showProductCode: action.payload
            };

        default:
            return state;
    }
}