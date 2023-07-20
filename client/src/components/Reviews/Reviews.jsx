import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaTimesCircle } from "react-icons/fa";
import { getReviews, deleteReview } from "../../redux/actions";
import { getReviews, deleteReview } from "../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Image, Text, Button, Center } from "@chakra-ui/react";

const Reviews = (props) => {
  const { isAuthenticated, profile } = useAuth0();

  const user = useSelector((state) => state.userLogged);
  const event = useSelector((state) => state.event);
  let dispatch = useDispatch();
  // const png =
  //   "https://www.pinclipart.com/picdir/middle/566-5666405_png-file-svg-pesas-de-ejercicio-png-clipart.png";
  // const user = profile.user.email;

  const { comment, rate, userId, createdAt, eventId } = props;

  const rateToStars = (rate) => {
    switch (rate) {
      case 1:
        return "⭐";
      case 2:
        return "⭐⭐";
      case 3:
        return "⭐⭐⭐";
      case 4:
        return "⭐⭐⭐⭐";
      case 5:
        return "⭐⭐⭐⭐⭐";
      default:
        break;
    }
  };

  const trimDate = (date) => {
    let hour = date.split("T")[1];
    date = date.split("T")[0];
    date = date.split("-");
    date = `${date[2]}/${date[1]}/${date[0]}`;
    hour = hour.split(":");
    hour = `${hour[0]}:${hour[1]}`;
    return `${date} - ${hour}`;
  };

  const handleDeleteReview = async () => {
    let info = { userId, eventId };
    await dispatch(deleteReview(info));
    dispatch(getReviews());
  };

  return (
    <Center>
      <Box className="">
        {user && user.id === userId ? (
          <Button className="" onClick={handleDeleteReview}>
            <FaTimesCircle />
          </Button>
        ) : null}
        {/* <Image
          borderRadius="5px"
          w="30%"
          src={image ? image : png}
          alt={userId}
        /> */}
        <div className="">
          <span className="">{rateToStars(rate)}</span>
          <span className="">{comment}</span>
          <div className="">
            <span>{userId}</span>
            <Text>{trimDate(createdAt)}</Text>
          </div>
        </div>
      </Box>
    </Center>
  );
};

export default Reviews;
