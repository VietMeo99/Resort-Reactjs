import React, { Component } from 'react'

import { RoomContext } from '../context'
import Loading from './Loading';
import Room from './Room';
import Title from './Title'
 
 
export default class FeatureRooms extends Component {
  // gán giá trị context, contextTyoe là thuộc tính
  static contextType = RoomContext 
  render() {
    // lấy từ trong context, this.context sẽ lấy các biến truyền vào từ bên context.js (value)
    let { loading , featuredRooms : rooms} = this.context

    rooms = rooms.map( (room) => {
      return <Room key={room.id} room={room} />
    })
    
    return (
      <section className="feature-rooms">
        <Title title= "feature rooms" />
        <div className="feature-rooms-center">
          {loading ? <Loading /> : rooms }
        </div>
      </section>
    );
  }
}

