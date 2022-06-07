import React, { useEffect, useState, useRef } from 'react';
import './Slider.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { sliderData } from '../data';
import { Link } from 'react-router-dom';

function Slider() {
  const [index, setIndex] = useState(0);
  const length = sliderData.length;

  const nextSlide = () => {
    setIndex(index === length - 1 ? 0 : index + 1);
  }

  const prevSlide = () => {
    setIndex(index === 0 ? length - 1 : index - 1);
  }
  
  const timeoutRef = useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
        ),
      2500
    );
    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className='slider__container'>
      <ArrowForwardIosIcon className='arrow1' onClick={nextSlide}/> 
      <ArrowBackIosNewIcon className='arrow2' onClick={prevSlide}/>
      {sliderData.map((slide, i) => {
        return (
          <div className={ i === index ? 'image__container' : ''} key={i}>
            {i === index ? <img src={slide.image}  className = 'slider__image fade' alt='' /> : ''}
          </div>
        ); 
      })}
        <div>
          <Link  className='slider__info' to={`/products/${sliderData[index].category}`}>
              <p className='slider__text'>{sliderData[index].info}</p>
              <button className='slider__button'>Shop {sliderData[index].category}'s</button>  
          </Link>
        </div> 
    </div> 
  )
}

export default Slider