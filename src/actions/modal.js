//Show and hide add and edit modal
export const modal = (display) => {
    return async (dispatch) => {
        await dispatch({ type: "MODAL", payload: !display });
    }
}
//Show and hide delete modal
export const deleteModal = (display) => {
    return async (dispatch) => {
        await dispatch({ type: "DELETE-MODAL", payload: !display });
    }
}