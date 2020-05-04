import React from 'react';
import Rodal from 'rodal';
import HomeMovie from './home_movie_container.jsx';
import MoviePopUp from '../movie_popup/movie_popup_container.jsx';

// include styles
import 'rodal/lib/rodal.css';

class HomeMovieModal extends React.Component {
    constructor(props) {
        super(props);
        this.showMovieModal = this.showMovieModal.bind(this);
        this.state = { visible: false };
    }

    show() {
        this.setState({ visible: true });
    }

    hide() {
        this.setState({ visible: false });
    }

    showMovieModal() {
      if (this.state.visible) {
        return (
          <MoviePopUp movieId={this.props.movie.id} />
        )
      } else {
        return;
      }
    }

    render() {
        return (
            <div>
                {/* <button onClick={this.show.bind(this)}>show</button> */}
                <HomeMovie movie={this.props.movie} key={this.key} open={this.show.bind(this)}/>

                <Rodal visible={this.state.visible} onClose={this.hide.bind(this)} className="home-movie-rodal">
                    {this.showMovieModal()}
                </Rodal>
            </div>
        );
    }
}

export default HomeMovieModal;