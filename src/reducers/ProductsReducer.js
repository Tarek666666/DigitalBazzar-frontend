// reducer function to be used in product context , to update products and pass dispatch function ( was not used offen was made only for practicing)
  const reducer = (state, action) => {
    switch (action.type) {

      case 'FETCH_PRODUCTS_REQUEST':
        return {
          ...state,
          loading: true,
          products: []
        };
      case 'FETCH_PRODUCTS_SUCCESS':
          return {
            ...state,
            loading: false,
            products: action.payload
          };
     
      default:
        return state;
    }
  };


export default reducer;