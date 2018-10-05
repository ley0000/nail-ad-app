import React, { Component } from "react";
import "./App.css";
import { Slide } from "react-slideshow-image";
import { DefaultPlayer as Video } from "react-html5video";

const slideImages = [
{imageUrl :  'http://nailonomicapi.haricotinc.com/image/banner/pos1.jpg'},
{imageUrl :  'http://nailonomicapi.haricotinc.com/image/banner/pos2.jpg'},

{imageUrl :  "https://download.blender.org/durian/trailer/sintel_trailer-720p.mp4"},
{imageUrl :  "http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov"},
]

const properties = {
  duration: 3000,
  transitionDuration: 3000,
  infinite: true,
  indicators: false,
  arrows: false
};


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slideImages:[]
    };
  }

  componentWillMount() {
    fetch("http://nailonomicapi.haricotinc.com/api/pos/banner/views", {
      headers: {
        Authorization: 'haricotinc.pos.nailonomic',
      }
    })
      .then(res => res.json())
      .then(resJSON => { 
        this.setState({ slideImages: resJSON.response })
      })
      .catch((error) =>{
        alert(error)
        return []
        });
  }

  render() {
    return (
      <div style={{flex: 1}}>
        {
          this.state.slideImages.length > 0 ?
          <Slide {...properties}>
          {
            this.state.slideImages.map((each, index) =>
              <div key={index} className="each-slide" style={{'backgroundImage': `url(${each.imageUrl})`, flex: 1}}>
                {each.imageUrl && !each.imageUrl.includes('.png') && !each.imageUrl.includes('.jpg') ?
                <Video autoPlay loop muted 
                      controls={['Captions']}
                      //poster={each.imageUrl}
                      // onCanPlayThrough={() => {
                      //     // Do stuff
                      // }}
                      >
                      <source src={each.imageUrl} type="video/mp4" />
                </Video> : null}
              </div>
              )
          }
        </Slide> : <div></div>
        }
      </div>
    );
  }
}

export default App;
