import React from "react";
import { useLoaderData } from "react-router-dom";
import getStripe from "../getStripe";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";

function Checkout() {
  const data = useLoaderData();
  const course = data.courses;

  const { title, photo_url, price } = course;

  async function handleCheckout() {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: process.env.REACT_APP_STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      successUrl: `http://localhost:3000/success`,
      cancelUrl: `http://localhost:3000/cancel`,
      customerEmail: "customer@email.com",
    });
    console.warn(error.message);
  }
  return (
    <div className="flex justify-center">
      <Card className="w-96">
        <CardHeader floated={false} className="h-80">
          <img src={photo_url} alt="" />
        </CardHeader>
        <CardBody className="text-center">
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {title}
          </Typography>
          <Typography variant="h3" color="blue" className="font-medium">
            ${price}
          </Typography>
          <Typography color="blue-gray" className="font-medium mt-2">
            Get all our courses with only 10$ per month subscription!
          </Typography>
          <Typography color="blue" className="font-medium">
            Subscribe Now!
          </Typography>
        </CardBody>
        <CardFooter className="flex justify-center pt-2">
          <button
            className="bg-myblue w-full text-white p-2 mb-2"
            onClick={handleCheckout}
          >
            GET PREMIUM ACCESS
          </button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Checkout;
