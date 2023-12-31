
import "../styles/Favorites.css"
import React, { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import { useNavigate } from 'react-router-dom';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { ImSpinner8 } from 'react-icons/im';
const Favorites = ({ bookmarkedItems, toggleBookmark, isItemBookmarked}) => {
    const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useContext(UserContext);

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  };

  const handleItemClick = (itemId) => {
    navigate(`/item/${itemId}`);
  };

  useEffect(() => {
    setIsLoading(true); 

    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(delay);
  }, [bookmarkedItems]); 

  const displayItem = bookmarkedItems.map((item) => {
    const truncatedTitle = truncateTitle(item.title, 20);

    return (
      <div className='display-item' key={item.id}>
        <div className='image-container' onClick={() => handleItemClick(item.id)}>
          <img src={item.image_url} alt='' />
        </div>
        <div className='item-details-display'>
          <div className='display-details'>
            <p>{truncatedTitle}</p>
            <p>${item.price.toFixed(2)}</p>
            <h4>{item.location}</h4>
          </div>
          <div className='bookmark' onClick={() => toggleBookmark(item.id)}>
          {isItemBookmarked(item.id) ? <BsBookmarkFill /> : <BsBookmark />}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className='Main Favorites'>
        <h1>{currentUser.name}'s favorites</h1>
      {isLoading ? (
        <div className='no-items-wrapper'>
          <ImSpinner8 className='load' />
        </div>
      ) : bookmarkedItems.length > 0 ? (
        <div className='display-items-wrapper'>{displayItem}</div>
      ) : (
        <div className='no-items-wrapper'>
          <p className='no-items'>No favorites found</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
