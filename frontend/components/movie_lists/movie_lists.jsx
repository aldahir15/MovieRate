import React from 'react';


class MovieLists extends React.Component {
  constructor(props) {
    super(props);
    // this.fetchMovieLists = this.fetchMovieLists.bind(this);
    this.state = {
      lists: {}
    }
  }

  componentDidMount() {
    const userId = this.props.user.currentUser.id;
    this.props.fetchMovieLists(userId).then(ret => {
      this.setState({ lists: ret.lists });
    });
  }




  render() {
    return (
      <div className="movie-list-container">
        {Object.keys(this.state.lists).map(key =>
         <div>{this.state.lists[key].name}</div>)}
      </div>
    );
  }
}

export default MovieLists;
