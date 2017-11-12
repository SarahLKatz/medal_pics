import React from 'react';
import {connect} from 'react-redux';
import { Carousel } from 'react-responsive-carousel';

export const Photos = (props) => {
  const { pictures } = props;

  return (
      <div>
      { pictures.length &&
      <Carousel dynamicHeight>
        {
          pictures.map(photo => {
            return (
              <div className="photo-carousel" key={photo.id}>
                <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
                <p className="legend">{photo.title}</p>
              </div>
            )
          })
        }
      </Carousel>
    }
    </div>
  )
}

export default Photos;