import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [localCart, setLocalCart] = useState(
        localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
    );
  // this code handels to cases, if the user is loggedin , the crud operation for shopping cart will be saved in db, otherwise inLocalstorage    
    const addToCart = (item) => {
        fetch("/user/addtocart", {
            method: "POST",
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
                    if (localCart.length === 0) {
                        setLocalCart([{ ...data, qty: 1 }]);
                        localStorage.setItem("items", JSON.stringify([{ ...data, qty: 1 }]));
                    } else {
                        const isAdded = localCart.filter(
                            (item) => item.itemInDb._id === data.itemInDb._id
                        );

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
    const increaseFromCart = (id, price) => {
        fetch("/user/increaseitem", {
            method: "POST",
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
    const decreaseFromCart = (id, price) => {
        fetch("/user/decreaseitem", {
            method: "POST",
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

    const deleteFromCart = (id, price) => {
        fetch("/user/deletefromcart", {
            method: "POST",
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
        //   setTotal(items.reduce((acc, item) => acc + (item.price * item.qty), 0))

        fetch("/user/getcart")
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
