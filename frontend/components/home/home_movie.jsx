import React from 'react';

class HomeMovie extends React.Component {
    constructor(props) {
        super(props);
        this.handleEnterImg = this.handleEnterImg.bind(this);
        this.handleLeaveImg = this.handleLeaveImg.bind(this);
        this.handleClickImg = this.handleClickImg.bind(this);
        this.handleCreateRate = this.handleCreateRate.bind(this);
        this.handleUpdateRate = this.handleUpdateRate.bind(this);
        this.handleEnterPoster = this.handleEnterPoster.bind(this);
        this.handleLeavePoster = this.handleLeavePoster.bind(this);
        this.deleteMovie = this.deleteMovie.bind(this);

        this.state = {
            movie: {},
            key: 0,
            moods: {
                happy: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-one.png",
                meh: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-zero.png",
                sad: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-negative.png",
                happyActive: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-one-select.png",
                mehActive: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-zero-selected.png",
                sadActive: "https://res.cloudinary.com/dg4mxmige/image/upload/c_scale,w_30/v1549252135/rate-negative-selected.png"
            }
        }
    }

    componentDidMount() {
        this.setState({ movie: this.props.movie, key: this.props.key });
    }

    handleEnterImg(e) {
        if (e.target.id === "good") {
            e.target.src = this.state.moods.happyActive;
        } else if (e.target.id === "meh") {
            e.target.src = this.state.moods.mehActive;
        } else if (e.target.id === "bad") {
            e.target.src = this.state.moods.sadActive;
        }
    }

    handleLeaveImg(e) {
        const key = e.target.parentElement.parentElement.id;
        if (key && this.state.movie.rating && this.state.movie.rating.rate === 1 && e.target.id === "good") {
            e.target.src = this.state.moods.happyActive;
        } else if (key && this.state.movie.rating && this.state.movie.rating.rate === 0 && e.target.id === "meh") {
            e.target.src = this.state.moods.mehActive;
        } else if (key && this.state.movie.rating && this.state.movie.rating.rate === -1 && e.target.id === "bad") {
            e.target.src = this.state.moods.sadActive;
        } else if (e.target.id === "good") {
            e.target.src = this.state.moods.happy;
        } else if (e.target.id === "meh") {
            e.target.src = this.state.moods.meh;
        } else if (e.target.id === "bad") {
            e.target.src = this.state.moods.sad;
        }
    }

    handleClickImg(e) {
        const key = e.target.parentElement.parentElement.id;
        if (key && this.state.movie.rating.id) {
            this.handleUpdateRate(e);
        } else {
            this.handleCreateRate(e);
        }
    }

    handleCreateRate(e) {
        const movieKey = e.target.parentElement.parentElement.id;
        const movieId = this.state.movie.id;
        let rate;
        if (e.target.id === "good") {
            rate = 1;
        } else if (e.target.id === "meh") {
            rate = 0;
        } else if (e.target.id === "bad") {
            rate = -1;
        }
        // console.log(this.props.createRating);
        this.props.createRating({
            rate,
            movie_id: movieId
        }).then(rating => {
            // console.log(rating)
            let oldState = this.state.movie;
            oldState.rating = rating.rating;
            this.setState({ movie: oldState });
        })
    }

    handleUpdateRate(e) {
        const movieKey = e.target.parentElement.parentElement.id;
        const ratingId = this.state.movie.rating.id;
        let rate;
        if (e.target.id === "good") {
            rate = 1;
        } else if (e.target.id === "meh") {
            rate = 0;
        } else if (e.target.id === "bad") {
            rate = -1;
        }
        this.props.updateRating(
            ratingId,
            { rate }
        ).then(rating => {
            let oldState = this.state.movie;
            oldState.rating.rate = rate;
            this.setState({ movie: oldState });
        })
    }

    handleEnterPoster(e) {
        let poster;
        if (e.target.classList[0] === "overlay") {
            poster = e.target.previousSibling;
        } else if (e.target.classList[0] === "overlay-text") {
            poster = e.target.parentElement.previousSibling;
        } else {
            poster = e.target;
        }

        poster.classList.add('movie-poster-hover');
    }

    handleLeavePoster(e) {
        let poster;
        if (e.target.classList[0] === "overlay") {
            poster = e.target.previousSibling;
        } else if (e.target.classList[0] === "overlay-text") {
            poster = e.target.parentElement.previousSibling;
        } else {
            poster = e.target;
        }

        poster.classList.remove('movie-poster-hover');
    }

    deleteMovie(e) {
        const movie_id = e.target.id;
        const rating_id = Object.values(this.state.movies).find(movie => movie.id == movie_id).rating.id;
        var answer = window.confirm("Delete Movie?")
        if (answer) {
            // const movie = this.props.deleteMovie(id);
            this.props.deleteRating(rating_id);
            const refreshedMoviesArr = Object.values(this.state.movies).filter(movie => movie.id != movie_id);
            // const refreshedMoviesObj = Object.assign({}, refreshedMoviesArr);
            const refreshedMoviesObj = this.movieListToObj(refreshedMoviesArr);
            this.setState({ movies: refreshedMoviesObj });
        }
    }


    render() {
        console.log(this.state)
        return (
        <div className="movie-block" id={this.state.movie.id} key={this.state.key}>
            <div className="img-block">
                <img src={this.state.movie.img} className="movie-poster-img" onMouseEnter={this.handleEnterPoster} onMouseLeave={this.handleLeavePoster}></img>
                <div className="overlay" onMouseEnter={this.handleEnterPoster} onMouseLeave={this.handleLeavePoster}>
                <div className="delete-container">
                    <div className="delete-button" id={this.state.movie.id} onClick={this.deleteMovie}>Delete</div>
                </div>
                <p className="overlay-text">{this.state.movie.description}</p>
                </div>
            </div>
            <p>
                <img onMouseEnter={this.handleEnterImg} onMouseLeave={this.handleLeaveImg} onClick={this.handleClickImg}
                src={this.state.movie.rating && this.state.movie.rating.rate === 1 ? this.state.moods.happyActive : this.state.moods.happy} className="rating-img" id="good"></img>
                <img onMouseEnter={this.handleEnterImg} onMouseLeave={this.handleLeaveImg} onClick={this.handleClickImg}
                src={this.state.movie.rating && this.state.movie.rating.rate === 0 ? this.state.moods.mehActive : this.state.moods.meh} className="rating-img" id="meh"></img>
                <img onMouseEnter={this.handleEnterImg} onMouseLeave={this.handleLeaveImg} onClick={this.handleClickImg}
                src={this.state.movie.rating && this.state.movie.rating.rate === -1 ? this.state.moods.sadActive : this.state.moods.sad} className="rating-img" id="bad"></img>
                <h2>{this.state.movie.title} ({this.state.movie.year})</h2>
                {this.state.movie.genre}
            </p>
        </div>
        )
    }
}

export default HomeMovie;
