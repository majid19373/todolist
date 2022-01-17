//redux reducer for show and hide add and edit modal
export const modal = (state = false,action) => {
    switch (action.type) {
        case "MODAL":
            return action.payload;
        default:
            return state;
    }
}
//redux reducer for show and hide delete modal
export const deleteModal = (state = false,action) => {
    switch (action.type) {
        case "DELETE-MODAL":
            return action.payload;
        default:
            return state;
    }
}