/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";

import items from "./data";
import { chuyenDoiURl } from "./handle"


// context dùng chung. chú ý RoomProvider bao ngoài tất cả, để ở index.js
const RoomContext = React.createContext();

class RoomProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      sortedRooms: [],
      featuredRooms: [],
      loading: true,
      type: "all",
      capacity: 1,
      price: 0,
      minPrice: 0,
      maxPrice: 0,
      minSize: 0,
      maxSize: 0,
      breakfast: false,
      pets: false,
    };
  }
  // state = {
  //   rooms: [],
  //   sortedRooms: [],
  //   featuredRooms: [],
  //   loading: true
  // }
  //get data
  componentDidMount() {
    // this.getData
    let rooms = this.formatData(items); // lấy để các key cùng cấp độ images, ...fields, id
    // console.log(rooms);  //dạng arr có các object
    let featuredRooms = rooms.filter((room) => room.featured === true);

    let maxPrice = Math.max(...rooms.map((item) => item.price));
    let maxSize = Math.max(...rooms.map((item) => item.size));

    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize,
    });
  }
  formatData(items) {
    // items dạng arr có các object
    let tempItems = items.map((item) => {
      //item đang ở dạng object
      let id = item.sys.id;
      // mặc định đường dẫn static/media/ theo đúng cấp độ  truy cập
      let images = item.fields.images.map((image) => image.fields.file.url);

      let room = { ...item.fields, images, id }; // dang object
      return room;
    });
    return tempItems; // dạng arr có các object room
  }

  // chuyenDoiURl = (str) => {
  //   // Chuyển hết sang chữ thường
  //   str = str.toLowerCase(); // xóa dấu
  //   str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
  //   str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
  //   str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
  //   str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
  //   str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
  //   str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
  //   str = str.replace(/(đ)/g, "d"); // Xóa ký tự đặc biệt
  //   str = str.replace(/([^0-9a-z-\s])/g, ""); // Xóa khoảng trắng thay bằng ký tự -
  //   str = str.replace(/(\s+)/g, "-"); // xóa phần dự - ở đầu
  //   str = str.replace(/^-+/g, ""); // xóa phần dư - ở cuối
  //   str = str.replace(/-+$/g, ""); // return
  //   return str;
  // }
  getRoom = (slug) => {
    let tempRooms = [...this.state.rooms];
    // nếu để trong component mới là this.chuyenDoi
    // const room = tempRooms.find((room) => this.chuyenDoiURl(room.slug) === slug);
    const room = tempRooms.find((room) => chuyenDoiURl(room.slug) === slug);
    return room;
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState(
      {
        [name]: value, // name tương ứng 
      }, // call back
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets,
    } = this.state;

    let tempRooms = [...rooms];
    // transform values
    // get capacity
    capacity = parseInt(capacity);
    price = parseInt(price);

    // filter by type
    if (type !== "all") {
      // .map để lấy ra , .filter để tìm
      tempRooms = tempRooms.filter((room) => room.type === type);
    }

    // filter by capacity
    if (capacity !== 1) {
      tempRooms = tempRooms.filter((room) => room.capacity >= capacity);
    }

    // filter by price
    tempRooms = tempRooms.filter((room) => room.price <= price);

    //filter by size
    tempRooms = tempRooms.filter(
      (room) => room.size >= minSize && room.size <= maxSize
    );

    //filter by breakfast
    if (breakfast) {
      tempRooms = tempRooms.filter(room => room.breakfast === true);
    }

    //filter by pets
    if (pets) {
      tempRooms = tempRooms.filter(room => room.pets === true);
    }

    this.setState({
      sortedRooms: tempRooms,
    });
  };
  render() {
    return (
      // truyền state vào cho FeaturedRooms, trong state đang có rooms
      // mỗi context kèm theo provider cho phép nhận sự thay đổi của context
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

// dùng khi muốn thay đổi context ???
// để CHIA SẺ CONTEXT, ở đây là chia sẻ cho roomfilter, roomlist 
// để trong roomfilter, roomlist ở roomcontainer 
const RoomConsumer = RoomContext.Consumer;  

export function withRoomConsumer(Component) {
  // lấy lại component để cập nhập lại,
  // cái props để cập nhập thôi thì phải, thấy xóa đi ko ảnh hưởng j
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {(value) => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
