import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import NavbarForHomePage from "./homePageComponents/NavbarForHomePage";
import Footer from "./homePageComponents/Footer";

function CartPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Water Truck 1",
      image:
        "https://bitpastel.io/mi/rammoy/construction1/static/media/water-truck-product.64e6c601b79fa495eba8.jpg",
      price: 1,
      quantity: 1,
      pickup: "Owner Pickup",
      totalPrice: 1,
      dates: [
        new Date("Sat May 04 2024 12:00:05 GMT+0530 (India Standard Time)"),
        new Date("Sun May 05 2024 12:00:05 GMT+0530 (India Standard Time)"),
      ],
    },
    {
      id: 2,
      name: "Water Truck 2",
      image:
        "https://bitpastel.io/mi/rammoy/construction1/static/media/product_2.b67cc42383d3c5f70034.webp",
      price: 2,
      quantity: 1,
      pickup: "Self Pickup",
      totalPrice: 2,
      dates: [
        new Date("Sat May 03 2024 12:00:05 GMT+0530 (India Standard Time)"),
        new Date("Sun May 04 2024 12:00:05 GMT+0530 (India Standard Time)"),
      ],
    },
  ]);

  

  useEffect(() => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        const durationInDays = Math.round(
          (item.dates[1] - item.dates[0]) / (1000 * 60 * 60 * 24)
        );
        let pricePerUnit = item.price; // Assuming item.price is the base price per day.

        if (durationInDays < 0) {
          pricePerUnit = item.price; // Default to base price if dates are invalid.
        } else if (durationInDays < 7) {
          pricePerUnit = item.price; // Keep base price if less than a week.
        } else if (durationInDays >= 7 && durationInDays < 30) {
          pricePerUnit = Math.floor(durationInDays / 7) * 2 + 1; // Adjusted price for weeks.
        } else {
          pricePerUnit = Math.floor(durationInDays / 30) * 7 + 1;
        }

        if (item.pickup === "Owner Pickup") {
          pricePerUnit = item.price + 1;
        }

        const totalPrice = pricePerUnit * item.quantity;

        return {
          ...item,
          price: totalPrice,
        };
      })
    );
  }, []);


  const removeItem = (id) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const totalPrice = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ position: "relative" }} onLoad={() => window.scrollTo(0, 0)}>
      <NavbarForHomePage />
      <section className="h-100 h-custom">
        <div className="container-fluid py-5">
          <div className="row justify-content-center align-items-center">
            <div className="col-12">
              <div
                className="card card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <div className="card-body p-0">
                  {" "}
                  {/* Removed col-lg-8 class */}
                  <div className="row g-0">
                    {/* Removed col-lg-8 div */}
                    <div className="p-5">
                      {" "}
                      {/* Added p-5 class */}
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <h1 className="fw-bold mb-0 text-black">
                          My Shopping Cart
                        </h1>
                        <h6 className="mb-0 text-muted">
                          {items.length} items
                        </h6>
                      </div>
                      <hr className="my-4" />
                      {items.map((item) => (
                        <React.Fragment key={item.id}>
                          <div className="row mb-4 d-flex justify-content-between align-items-center">
                            <div className="col-md-2 col-lg-2 col-xl-2">
                              <img
                                src={item.image}
                                className="img-fluid rounded-3"
                                alt={item.name}
                              />
                            </div>
                            <div className="col-md-3 col-lg-3 col-xl-3">
                              <h6 className="text-muted">Product</h6>
                              <h6 className="text-black mb-0">{item.name}</h6>
                              <h6 className="text-black mb-0 mt-2 text-muted gray-color-for-price">
                                {item.pickup}
                              </h6>
                            </div>
                            <div className="col-md-2 col-lg-2 col-xl-2 d-flex align-items-center justify-content-center gap-2">
                              <h6 className="text-muted">
                                {item?.dates[0].getDay() +
                                  "/" +
                                  item?.dates[0].getMonth() +
                                  "/" +
                                  item?.dates[0].getFullYear()}
                              </h6>
                              to
                              <h6 className="text-muted">
                                {item?.dates[1].getDay() +
                                  "/" +
                                  item?.dates[1].getMonth() +
                                  "/" +
                                  item?.dates[1].getFullYear()}
                              </h6>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                              <h6 className="mb-0">
                                $ {item.price.toFixed(2)} * {item.quantity}
                              </h6>
                            </div>
                            <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                              <a
                                href="#!"
                                className="text-muted"
                                onClick={() => removeItem(item.id)}
                              >
                                <AiFillDelete />
                              </a>
                            </div>
                          </div>
                          <hr className="my-4" />
                        </React.Fragment>
                      ))}
                      <div className="pt-5">
                        <h6 className="mb-0">
                          <a
                            href="#!"
                            className="text-body"
                            onClick={() => navigate(-1)}
                          >
                            Back to shop
                          </a>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
export function AddFirstItem(item) {
  console.log(item);

}

export function AddSecondItem(item) {
 console.log(item);
}

export default CartPage;
