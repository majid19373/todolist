//redux reducer for add, edit and delete todo
export const todos = (state = [],action) => {
    switch (action.type) {
        case "ADD_TODO":
            return action.payload;
        default:
            return state;
    }
}