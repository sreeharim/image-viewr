import React from "react";
class Image extends React.Component {
  render() {
    return (
      <div style={{marginTop:10}}>
        <div>
          <img src={this.props.source} />
        </div>
        <div>
          <span style={{marginLeft:10}}>
            <i onClick={()=>this.props.likePlus(this.props.index)} class="fa fa-lg fa-thumbs-up" />
            <span style={{marginLeft:5}} id="likeCount" >{this.props.likes}</span>
          </span>
          <span style={{marginLeft:10}}>
            <i class="fa fa-lg fa-thumbs-down" onClick={()=>this.props.dislikePlus(this.props.index)} />
            <span style={{marginLeft:5}} id="dislikeCount">{this.props.dislikes}</span>
          </span>
        </div>
      </div>
    );
  }
}

export default Image;
