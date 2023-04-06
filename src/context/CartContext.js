import { createContext, useState, useEffect } from "react";

const CartContext = createContext();


//creating the cart context function
export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    // setting the localcart to the items stored in localstorage if they exist otherwise set them initially to [] // to be used in case user is not logged in
    const [localCart, setLocalCart] = useState(
        localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
    );
    // this code handels  cases of a loggedin user  , the crud operation for shopping cart will be saved in db, otherwise inLocalstorage
    const addToCart = (item) => {
        fetch("https://digital-bazzar-backend.herokuapp.com/user/addtocart", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ item }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                //case user logged in , handle the request and use the user cart in db to do crud --------------------------->
                if (data.items) {
                    setItems(data.items);
                    setTotal(data.total);
                    // case unknown user , handle the request and save info in localstorage to use as cart --------------------------->
                } else {
                    // case localcart is empty , first item to be added
                    if (localCart.length === 0) {
                        setLocalCart([{ ...data, qty: 1 }]);
                        localStorage.setItem("items", JSON.stringify([{ ...data, qty: 1 }]));
                    } else {
                    // case localcart is not empty , check if item is already in cart     
                        const isAdded = localCart.filter(
                            (item) => item.itemInDb._id === data.itemInDb._id
                        );
                    // case localcart is not empty & product is already in cart ====> find item and increase qty         
                        if (isAdded.length > 0) {
                            const updatedLocatCart = localCart.map((element) => {
                                if (element.itemInDb._id === data.itemInDb._id) {
                                    element.qty += 1;
                                }
                                return element;
                            });
                            setLocalCart(updatedLocatCart);
                            localStorage.setItem("items", JSON.stringify(updatedLocatCart));
                        } else {
                    // case localcart is not empty & product is not in cart ====> add item 
                            setLocalCart((prev) => [...prev, { ...data, qty: 1 }]);
                            localStorage.setItem(
                                "items",
                                JSON.stringify([...localCart, { ...data, qty: 1 }])
                            );
                        }
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // in cart page , function to increase the qty of an item
    const increaseFromCart = (id, price) => {
        fetch("https://digital-bazzar-backend.herokuapp.com/user/increaseitem", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, price }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                //check if data comes back with user's cart from db or unknown user
                //case user loggedin
                if (data.items) {
                    setItems(data.items);
                    setTotal(data.total);
                }
                //case unknown user , update in local
                else {
                    const updatedLocatCart = localCart.map((element) => {
                        if (element.itemInDb._id === data._id.toString()) {
                            element.qty += 1;
                        }
                        return element;
                    });
                    setLocalCart(updatedLocatCart);
                    localStorage.setItem("items", JSON.stringify(updatedLocatCart));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

     // in cart page , function to decrease the qty of an item
    const decreaseFromCart = (id, price) => {
        fetch("https://digital-bazzar-backend.herokuapp.com/user/decreaseitem", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, price }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                //case user loggedin
                if (data.items) {
                    setItems(data.items);
                    setTotal(data.total);
                } else {
                    const updatedLocatCart = localCart
                        .map((element, index) => {
                            if (element.itemInDb._id === data._id.toString()) {
                                element.qty -= 1;
                            }
                            return element;
                        })
                        .filter((item) => item.qty > 0);
                    setLocalCart(updatedLocatCart);
                    localStorage.setItem("items", JSON.stringify(updatedLocatCart));
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    // in cart page , function to delete item
    const deleteFromCart = (id, price) => {
        fetch("https://digital-bazzar-backend.herokuapp.com/user/deletefromcart", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, price }),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                //check if data comes back with user's cart from db or unknown user
                //case user loggedin
                if (data.items) {
                    setItems(data.items);
                    setTotal(data.total);
                } else {
                    const updatedLocatCart = localCart.filter(
                        (item) => item.itemInDb._id !== data._id
                    );
                    localStorage.setItem("items", JSON.stringify(updatedLocatCart));
                    setLocalCart(updatedLocatCart);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
     // fetching the loggedin user's cart from DB  // if user is not loggedin use localcart   
        fetch("https://digital-bazzar-backend.herokuapp.com/user/getcart", {
            credentials: "include",
            method: "GET",
        })
            .then((res) => res.json())
            .then((fetchedCart) => {
                if (fetchedCart.items) {
                    setCart(fetchedCart);
                    setItems(fetchedCart.items);
                    setTotal(fetchedCart.total);
                } else {
                    //     setItems([])
                    setLocalCart(localCart);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <CartContext.Provider
            value={[
                items,
                localCart,
                total,
                addToCart,
                deleteFromCart,
                decreaseFromCart,
                increaseFromCart,
            ]}
        >
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;
