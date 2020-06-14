/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import defaultImg from "../images/room-1.jpeg";
import { chuyenDoiURl} from "../handle"


// chuyenDoiURl = (str) => {
  
// }
// lấy room FeatureRooms
export default function Room({ room }) {
  // console.log(room);
 
  const { name, slug, images, price, id } = room;
  let str = chuyenDoiURl(slug)
  return (
    <article className="room">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single room" />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        {/* <Link to={`/rooms/${slug}.html.php`} className="btn-primary room-link"> */}
        <Link to={`/rooms/${str}/${id}.html.php`} className="btn-primary room-link">
          {/* str là slug  */}
          Features
        </Link>
      </div>
      <p className="room-info">{name}</p>
    </article>
  );
}

Room.propsTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
  }),
};
