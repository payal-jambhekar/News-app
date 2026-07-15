import React, { Component } from 'react'

export class Newsitem extends Component {
  render() {
    let {title,description,imgUrl ,newsUrl ,author , date,source} = this.props;
    return (
      <div className='my-3'>
        <div className="card mx-2" >
          <span class="position-absolute top-0  translate-middle badge  rounded-pill bg-danger  " style={{left:"90%" , zIndex:"1"}}>{source}
  </span>
          <img src={!imgUrl? "https://www.fodors.com/wp-content/uploads/2025/03/0_HERO_Shutterstock_2478374131_london-cityscape-with-houses-of-parliament-and-big-ben-tower-uk_Mistervlad.jpg": imgUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}...</h5>
            <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-danger">By {!author ? "Unknown" :author} on {new Date(date).toGMTString()}</small></p>
            <a rel='noreferrer' href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Newsitem
