import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef(null);

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxY2E3NGQ0NjZiMjU2OTBhMzA1YzRlYTJkYjk4MjNkMiIsIm5iZiI6MTcyMDU0NDgxMC44MTU2NzQsInN1YiI6IjY2OGQ2Y2ZjYzBlYTBjZTc5MDcxYmI0OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._KhvQSWGvd2Biz2UMcH0S8IYJ3qcqCtqSgBvVgNodGo'
    }
  };

  const handleWheel = (event) => {
    if (cardsRef.current) {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`,
          options
        );
        const data = await response.json();
        setApiData(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();

    const currentCardsRef = cardsRef.current;
    if (currentCardsRef) {
      currentCardsRef.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (currentCardsRef) {
        currentCardsRef.removeEventListener('wheel', handleWheel);
      }
    };
  }, [category]);

  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <Link to={`/player/${card.id}`}className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=""/>
            <p>{card.original_title}</p>
          </Link>
        })}
      </div>
    </div>
  );
};

export default TitleCards;
