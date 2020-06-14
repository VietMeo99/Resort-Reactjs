
// viết như này cũng đúng
import React, { Component } from 'react'

export default class Hero extends Component {
  render() {
    return (
      <header className={this.props.hero}>{this.props.children}</header>
    )
  }
}

// hero để lấy tên className , truyền vào ở Rooms,...
// import React from 'react'
// export default function Hero({hero, children}) { 
//   return (
//       <header className={hero}>{children}</header>
//   );
// }

// hàm defaultProps có sẵn
Hero.defaultProps = {
  hero: "defaultHero"
}