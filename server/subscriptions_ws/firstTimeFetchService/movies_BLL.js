import Movie from "../models/Movie.js";
import * as moviesWS_DAL from './moviesWS_DAL.js'

export const getSpecificPropsFromWSAndInsetIntoDBCollection = async (req,res)=>{
    try{
        let moviesArrayFromDB = await Movie.find();
        let movies = moviesArrayFromDB;
        if(moviesArrayFromDB.length === 0){
            let {data: fetchedMovies} = await moviesWS_DAL.getMovies();
            fetchedMovies = fetchedMovies.slice(0,10);
            movies = fetchedMovies.map(movie =>{
                const {name, genres, image :{medium}, premiered} = movie;
                let  relevantMovieDetails = {name, genres, image: medium, premiered}
                return relevantMovieDetails
            })
            Movie.insertMany(movies, (err, docs) =>{
                if(err) return console.error(err)
                console.log("multiple documents of type Movie have been inserted to Movies Collection inside subscriptionDB");
                return ("multiple documents of type Movie have been inserted to Movies Collection inside subscriptionDB")
            })
        }else{
            console.log(`there Is already ${moviesArrayFromDB.length} Movies In DB` );
            return `there Is already ${moviesArrayFromDB.length} Movies In DB`;
        }
    }catch(err){
        console.log(err);
    }

 }