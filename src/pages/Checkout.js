import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import getStripe from "../getStripe";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import {
  getOneCourse,
  createCheckoutSession,
  getCurrentUserDB,
} from "../services/api";
import { AuthContext } from "../contexts/AuthProvider";

function Checkout() {
  const { categoryId, courseId } = useParams();
  const [course, setCourse] = useState({
    _id: "",
    category_id: "",
    title: "",
    photo_url: "",
    price: "",
  });
  const { user, token } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOneCourse(categoryId, courseId);
        setCourse(data);
        const getUser = await getCurrentUserDB(user, token);
        setCurrentUser(getUser);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [categoryId, course, courseId, token, user]);

  const { title, photo_url, price } = course;

  async function handleCheckout() {
    const response = await createCheckoutSession(
      categoryId,
      courseId,
      user,
      token
    );
    if (response) {
      const stripe = await getStripe();
      const { error } = await stripe.redirectToCheckout({
        sessionId: response.id,
      });
      if (error) {
        console.warn(error.message);
      }
    }
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
          {currentUser && currentUser.enrollments.includes(courseId) ? (
            <Link to={`/courses/${course.category_id}/${course._id}/view`}>
              <button className="bg-myblue w-full text-white p-2 mb-2">
                GO TO COURSE
              </button>
            </Link>
          ) : (
            <button
              className="bg-myblue w-full text-white p-2 mb-2"
              onClick={handleCheckout}
            >
              GET PREMIUM ACCESS
            </button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}

export default Checkout;
