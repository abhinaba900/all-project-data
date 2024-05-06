import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate, useParams } from "react-router-dom";

function PaypalPaymentIntigration() {
  const navigate = useNavigate();

  // This function is triggered when the currency selection changes
  const { id } = useParams();
  console.log(id);
  return (
    <>
      <PayPalScriptProvider
        options={{
          "client-id":
            "AWCg7iW68yDZcsHnoZQHyqneAnWB1y4ShPaNudhYGuAXli2rwm6JsvXF8HVQbEIN5ak5I59MObq_KAdt",
          components: "buttons",
          currency: "USD", // Dynamically set currency
        }}
      >
        <div
          className="payment_inner"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PayPalButtons
            style={{
              layout: "vertical",
              color: "blue",
              shape: "rect",
              label: "pay",
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: id, // Set this to the total amount
                    },
                  },
                ],
              });
            }}
            onApprove={(data, actions) => {
              return actions.order.capture().then((details) => {
                const name = details.payer.name.given_name;
                const TransactionId = details.id;
                alert(
                  `Transaction completed by - ${name} Transaction ID: ${TransactionId}`
                );
                navigate("/");
              });
            }}
            onCancel={() => {
              alert("Transaction cancelled.");
            }}
            onError={(err) => {
              console.error("PayPal Button Error:", err);
              alert("An error occurred with the PayPal Button.");
            }}
            onSetup={(data, actions) => {
              return actions.order.capture().then((details) => {
                const name = details.payer.name.given_name;
                alert(`Transaction completed by . ${name} `);
              });
            }}
            onAuthorize={(data, actions) => {
              return actions.order.capture().then((details) => {
                const name = details.payer.name.given_name;
                alert(`Transaction completed by . ${name} `);
              });
            }}
          />
        </div>
      </PayPalScriptProvider>
    </>
  );
}

export default PaypalPaymentIntigration;
