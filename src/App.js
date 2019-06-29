import React from "react";
import ImageScroller from "./components/image-scroller";
import "./App.css";

class App extends React.Component {
  state = {
    images: []
  };

  render() {
    return (
      <div>
        <div style={{ marginTop: 10, marginLeft: 10 }}>
          <input
            type="button"
            value="Sort By Likes"
            onClick={() => this.sortByLikes()}
          />
          <input
            style={{ marginLeft: 10 }}
            type="button"
            onClick={() => this.sortByDisLikes()}
            value="Sort By DisLikes"
          />
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
    let url="http://localhost:4000/votes/updatelike/";
    let id ="";
    let likes = 0;
    const images = this.state.images.map((e, i) => {
      if (i == index) {
        e.likes++;
        id=e._id;
        likes=e.likes;
      }
      return e;
    });
    this.setState({ images });
    url+= id;
    const body ={_id:id,likes}
    window
    .fetch(url, {
      method: "post",
      headers: {
              'Content-Type': 'application/json'
      },
      body:JSON.stringify(body)
    })
    .then(response => {
      response
        .text()
        .then(data => {

        })
        .catch(e => {
          console.error(e);
        });
    })
    .catch(e => {
      console.error(e);
    });

  };
  dislikePlus = index => {
    let url="http://localhost:4000/votes/updatedislike/";
    let id ="";
    let dislikes= 0;
    const images = this.state.images.map((e, i) => {
      if (i == index) {
        e.dislikes++;
        id=e._id;
        dislikes=e.dislikes;
      }
      return e;
    });
    this.setState({ images });
    url+= id;
    const body ={_id:id,dislikes}
    window
    .fetch(url, {
      method: "post",
      headers: {
              'Content-Type': 'application/json'
      },
      body:JSON.stringify(body)
    })
    .then(response => {
      response
        .text()
        .then(data => {

        })
        .catch(e => {
          console.error(e);
        });
    })
    .catch(e => {
      console.error(e);
    });

  };

  sortByLikes = () => {
    const images = [...this.state.images];
    images.sort(function(a, b) {
      return -(a.likes - b.likes);
    });
    this.setState({ images });
  };

  sortByDisLikes = () => {
    const images = [...this.state.images];
    images.sort(function(a, b) {
      return -(a.dislikes - b.dislikes);
    });
    this.setState({ images });
  };
  componentDidMount(){
    this.fetchPhotos('72157709227278212');
  }
  fetchPhotos = galleryId => {
    const galleryUrl = "https://api.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=d5cb6f61c5cde97a97a520e4aee6d7bf&gallery_id="+galleryId;

    window
      .fetch(galleryUrl, {
        method: "get",
        headers: {
          Accept: "text/xml"
        }
      })
      .then(response => {
        response
          .text()
          .then(data => {
            //this.setState({images: this.parsePhotosData(data)  });
              this.addtoDb(this.parsePhotosData(data) );

          })
          .catch(e => {
            console.error(e);
          });
      })
      .catch(e => {
        console.error(e);
      });
  };
  addtoDb = (data)=>{
    const url= "http://localhost:4000/votes/add";
    window
      .fetch(url, {
        method: "post",
        headers: {
          Accept: "application/text",
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        response
          .text()
          .then(data => {
            //this.setState({images: this.parsePhotosData(data)  });
              this.getPhotos();

          })
          .catch(e => {
            console.error(e);
            this.getPhotos();
          });
      })
      .catch(e => {
        console.error(e);
        this.getPhotos();
      });
  }

  getPhotos = ()=>{
    const url= "http://localhost:4000/votes/";
    window
      .fetch(url, {
        method: "get",
        headers: {
          Accept: "application/json"
        }
      })
      .then(response => {
        response
          .text()
          .then(data => {
            this.setState({images: JSON.parse(data)  });
            

          })
          .catch(e => {
            console.error(e);
            
          });
      })
      .catch(e => {
        console.error(e);
        
      });
  }
  parsePhotosData = data => {
    const parsedData = new window.DOMParser().parseFromString(data, "text/xml");
    const childNodes = parsedData.documentElement.childNodes[1].childNodes;
    const nodes = Array.prototype.slice.call(childNodes);
    const photoNodes = nodes.filter(node => node.tagName === "photo");
    const photos = photoNodes.map(node => {
      const id = this.getNodeAttribute(node.attributes, "id");
      const secret = this.getNodeAttribute(node.attributes, "secret");
      const server = this.getNodeAttribute(node.attributes, "server");
      const farm = this.getNodeAttribute(node.attributes, "farm");
      const title = this.getNodeAttribute(node.attributes, "title");

      return {
        _id: id,
        title: title,
        source: this.formatUrl(farm, server, id, secret),
        likes:0,
        dislikes:0
      };
    });

    return photos;
  };
  getNodeAttribute = (attributes,key)=>{
    return attributes[key].value;
  }

  formatUrl = (farm, server, id, secret) => {
    return (
      "https://c1.staticflickr.com/" +
      farm +
      "/" +
      server +
      "/" +
      id +
      "_" +
      secret +
      "_b.jpg"
    );
  };
}

export default App;
