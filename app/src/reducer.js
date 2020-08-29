const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload
            };
        case 'SET_CURRENT_CONTENT_KEY':
            return {
                ...state,
                currentContentKey: action.payload
            };
        case 'ADD_FETCHED_CONTENT':
            return {
                ...state,
                posts: state.fetchedContent.concat(action.payload)
            };
        default:
            return state;
    }
};

export default Reducer;