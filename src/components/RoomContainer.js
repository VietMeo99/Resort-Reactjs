/* eslint-disable no-unused-vars */
import React from "react";
import RoomFilter from "./RoomFilter";
import RoomList from "./RoomList";
import { withRoomConsumer } from "../context";
// hoặc phải import {RoomsConsumer} như ở dưới
import Loading from "./Loading";

function RoomContainer({ context }) { // cái context này đăng bằng value
  const { loading, sortedRooms, rooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </div>
  );
}

export default withRoomConsumer(RoomContainer);

// import React from "react";
// import RoomFilter from "./RoomFilter";
// import RoomList from "./RoomList";
// import { RoomConsumer } from "../context";
// import Loading from "./Loading";

// export default function RoomContainer() {
//   return (
//     <RoomConsumer>
//       // value là giá trị sẵn
//       {(value) => {
//         // console.log(value);
//         const { loading, sortedRooms, rooms } = value;
//         if(loading){
//           return <Loading />
//         }
//         return (
//           <div>
//             Hello room container
//             <RoomFilter rooms={rooms} />
//             <RoomList rooms={sortedRooms} />
//           </div>
//         );
//       }}
//     </RoomConsumer>
//   );
// }
