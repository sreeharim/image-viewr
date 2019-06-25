import React from "react";
import ImageScroller from "./components/image-scroller";
import "./App.css";

class App extends React.Component {
  state = {
    images: [
      {
        source: "https://loremflickr.com/640/400?random=1",
        likes: 0,
        dislikes: 0
      },
      {
        source: "https://loremflickr.com/640/400??random=2",
        likes: 0,
        dislikes: 0
      },
      {
        source: "https://loremflickr.com/640/400??random=3",
        likes: 0,
        dislikes: 0
      },
      {
        source: "https://loremflickr.com/640/400??random=4",
        likes: 0,
        dislikes: 0
      },
      {
        source: "https://loremflickr.com/640/400??random=5",
        likes: 0,
        dislikes: 0
      }
    ]
  };

  render() {
    return (
      <div>
        <div style={{marginTop:10,marginLeft:10}}>
          <input type="button" value="Sort By Likes" onClick={()=>this.sortByLikes()} />
          <input style={{marginLeft:10}} type="button"  onClick={()=>this.sortByDisLikes()} value="Sort By DisLikes" />
        </div>
        <ImageScroller
          likePlus={this.likePlus}
          dislikePlus={this.dislikePlus}
          images={this.state.images}
        />
      </div>
    );
  }
  likePlus = index => {
    const images = this.state.images.map((e, i) => {
      if (i == index) {
        e.likes++;
      }
      return e;
    });
    this.setState({ images });
  };
  dislikePlus = index => {
    const images = this.state.images.map((e, i) => {
      if (i == index) {
        e.dislikes++;
      }
      return e;
    });
    this.setState({ images });
  };

  sortByLikes = () => {
    const images=[...this.state.images];
    images.sort(function (a, b) {
      return -(a.likes - b.likes);
    })
    this.setState({images})
  };

  sortByDisLikes = () => {
    const images=[...this.state.images];
    images.sort(function (a, b) {
      return -(a.dislikes - b.dislikes);
    })
    this.setState({images})
  };
}

export default App;
