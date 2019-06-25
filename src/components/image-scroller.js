import React from "react";
import Image from "./image";
class ImageScroller extends React.Component {
  render() {
    return (
      <div style={{marginLeft:20, marginTop:20}}>
          {this.renderImages()}
      </div>
    );
  }
  renderImages=()=>{
      console.log("renderImages called")
      return this.props.images.map((e,i)=>{
        console.log("inside loop")
       return <Image source={e.source} index={i} dislikePlus={this.props.dislikePlus} likePlus={this.props.likePlus} likes={e.likes} dislikes={e.dislikes}/>
      });
  }
}

export default ImageScroller;
