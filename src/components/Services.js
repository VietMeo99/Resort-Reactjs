import React, { Component } from 'react'
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer} from "react-icons/fa"

import Title from './Title'

export default class Services extends Component {
  constructor(props){
    super(props);
    this.state = {
      services: [
        {
          icon: <FaCocktail />,
          title: "Free Cocktails",
          info: "assbsssk"
        },
        {
          icon: <FaHiking />,
          title: "Ending Hiking",
          info: "assbsssk"
        },
        {
          icon: <FaShuttleVan />,
          title: "Free Shuttel",
          info: "assbsssk"
        },
        {
          icon: <FaBeer />,
          title: "Strongest Beer",
          info: "assbsssk"
        }
      ]
    }
  }
  render() {
    return (
      <section className="services">
        <Title title="Service"></Title>
        <div className="services-center">
          {this.state.services.map((item, index) => {
            return(
              <article key={index} className="service" >
                <span>{item.icon}</span>
                <h4>{item.title}</h4>
                <p>{item.info}</p>
              </article>
            )
          })}
        </div>

      </section>
    )
  }
}
