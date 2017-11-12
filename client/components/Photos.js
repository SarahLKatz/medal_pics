import React from 'react';
import {connect} from 'react-redux';

export const Photos = (props) => {
  const { pictures } = props;

  return (
    <div>
      
      <div>
      {
        pictures.map(photo => {
          return (
            <div className="photo-carousel" key={photo.id}>
              <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
            </div>
          )
        })
      }
      </div>
    </div>
  )
}

const mapState = (state, ownProps) => {
  return {
    pictures: ownProps.pictures,
  }
}

export default connect(mapState)(Photos)

// export class Photos extends React.Component {
//   constructor () {
//     super()
//     this.state = {
//       pictures: []
//     }
//   }

//   componentDidMount() {
//     let location = [40.7050309, -74.0090306];
//     axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=87adce3230bea8a46187c9da7f15a4aa&lat=40.7050389&lon=-74.0089989&format=json&nojsoncallback=1&api_sig=965dfaec35f5fff11d0d396019848ff1`)
//     .then(res => res.data.photos.photo)
//     .then(pictures => {
//       this.setState({pictures: pictures.slice(0,10)})
//     })
//   }

//   render () {
//     console.log(this.state)
//     return (
//       <div>
//         <h3>Photos From Flickr Will Go Here</h3>
//         <div>
//         {
//           this.state.pictures.forEach(photo => {
//             return (
//               <div className="photo-carousel" key={photo.id}>
//                 <img src={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
//               </div>
//             )
//           })
//         }
//         </div>
//       </div>
//     )
//   }
// }
