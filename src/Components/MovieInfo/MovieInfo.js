import React, {useEffect, useState} from 'react';
import Style from "./MovieInfo.module.css";
import {makeRequest} from "../../App";
import disneyPlus from "../../media/disney-plus.png";
import netflixLogo from "../../media/netflix.jpeg";
import hboMaxLogo from "../../media/hbo-max.png";
import amazonLogo from "../../media/prime.jpeg";
import googlePlayLogo from "../../media/googleplay.png";
import youtubeLogo from "../../media/yt.png";
import vuduLogo from "../../media/vudu.png";
import {makePosterImageUrl} from "../../App";

function MovieInfo(props) {
    const {movie} = props;
    const genres = movie?.genres?.map(genre => genre.name);
    const genresList = genres?.join(', ');
    const [streamUrl, setStreamUrl] = useState('');
    const [streamers, setStreamers] = useState([]);
    const flatRate = getFromStreamers("flatrate");
    const rent = getFromStreamers("rent");
    const buy = getFromStreamers("buy");
    const allProviders = flatRate?.concat(rent)?.concat(buy)?.filter(x => x !== undefined);
    const disney = allProviders?.includes("Disney Plus");
    const netflix = allProviders?.includes("Netflix");
    const hbo = allProviders?.includes("HBO Max");
    const amazon = allProviders?.includes("Amazon Video");
    const googlePlay = allProviders?.includes("Google Play Movies");
    const youtube = allProviders?.includes("YouTube");
    const vudu = allProviders?.includes("Vudu");
    const posterPath = movie?.poster_path;
    const imageUrl = makePosterImageUrl(posterPath);
    function getFromStreamers(prop) {
        return streamers?.[prop]?.map(provider => provider.provider_name);
    }

    useEffect(() => {
        if (streamUrl) {
            fetch(streamUrl).then(resp => resp.json())
                .then(info => setStreamers(info?.results?.US));
        }
    }, [streamUrl]);


    useEffect(() => {
        if (movie.id) {
            setStreamUrl(makeRequest(`/movie/${movie.id}/watch/providers`))
        }
    }, [movie.id])

    function runTime() {
        const hoursAndPortion = (movie?.runtime / 60).toString().split('.');
        const hours = hoursAndPortion[0];
        const minutes = Math.floor(("." + hoursAndPortion[1] * 1) * 60);
        return `${hours}h ${minutes}m`;
    }

    return (
        <div className={Style.main}>
            <img className={Style.imageModal} width="300px" src={`${posterPath ? imageUrl : "https://critics.io/img/movies/poster-placeholder.png"}`} alt="" />
            <div>
                
            </div>
            <div className={Style.movieText}>
                <div className={Style.headerInfo}>
                    <h1>{movie.title} <span>({movie?.release_date?.slice(0, 4)})</span></h1>
                    <p>{movie.release_date} | {genresList} | {runTime()}</p>
                </div>
                <div className={Style.description}>
                    <h3>Description</h3>
                    <p>{movie.overview}</p>
                </div>
                <div className={Style.whereTos}>
                    {disney && <img alt={'disney plus logo'} src={disneyPlus} className={Style.disney} />}
                    {netflix && <img alt={'netflix logo'} src={netflixLogo} />}
                    {hbo && <img alt={'hbo max logo'} src={hboMaxLogo} />}
                    {amazon && <img alt={'amazon logo'} src={amazonLogo} />}
                    {googlePlay && <img alt={'google play logo'} src={googlePlayLogo} />}
                    {youtube && <img alt={'youtube logo'} src={youtubeLogo} />}
                    {vudu && <img alt={'vudu logo'} src={vuduLogo} />}
                </div>
         
            </div>
        </div>
    );
}

export default MovieInfo;