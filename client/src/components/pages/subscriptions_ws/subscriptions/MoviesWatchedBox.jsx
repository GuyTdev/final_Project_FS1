import { Button } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetAllMoviesQuery } from "../../../../rtk/features/movies/moviesApiSlice";
import { useGetSubscriptionByMemberIdQuery } from "../../../../rtk/features/subscriptions/subscriptionsApiSlice";
import AddMovieToSubscription from "./AddMovieToSubscription";

const MoviesWatched = ({ member_id }) => {
  const [showAddMovieToSubscriptionsBox, setShowAddMovieToSubscriptionsBox] =
    useState(false);
  const { data: subscription, isSuccess } =
    useGetSubscriptionByMemberIdQuery(member_id);
  const { data: movies, isSuccess: isSuccessMovies } = useGetAllMoviesQuery();
  let memberSubscribedMoviesNamesAndDates = [];
  let memberMoviesIdsSubscribedArray = [];
  if (isSuccess && isSuccessMovies) {
    memberMoviesIdsSubscribedArray = subscription?.movies.map(
      (movie) => movie.movieId
    );
    memberSubscribedMoviesNamesAndDates = subscription.movies.map(
      (movieObj) => {
        let movie_index = movies?.findIndex(
          (movie) => movie._id === movieObj.movieId
        );
        if (movie_index !== -1) {
          return { movieId:movies[movie_index]._id , name: movies[movie_index].name, date: movieObj.date };
        }
        return movieObj;
      }
    );
  }
  return (
    <div className="movies_watched_box">
      <b>Movies Watched</b>
      <Button
        sx={{ margin: 2, textTransform: "none" }}
        variant="contained"
        onClick={() => {
          setShowAddMovieToSubscriptionsBox(!showAddMovieToSubscriptionsBox);
        }}
      >
        {showAddMovieToSubscriptionsBox
          ? "Hide Subscribe area"
          : "Subscribe to new movie"}
      </Button>
      {showAddMovieToSubscriptionsBox ? (
        <AddMovieToSubscription
          member_id={member_id}
          memberMoviesIdsSubscribedArray={memberMoviesIdsSubscribedArray}
          setShowAddMovieToSubscriptionsBox={setShowAddMovieToSubscriptionsBox}
        />
      ) : null}
      <ul>
        {memberSubscribedMoviesNamesAndDates?.map((movie, index) => (
          <li key={index}>
            <div>
              <Link to={`../movies/${movie.movieId}`}> {movie.name} </Link>, {movie.date.slice(0, 10)}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesWatched;
