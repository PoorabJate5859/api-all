import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDog } from '../features/DogSlice';

const Dog = () => {
  const dispatch = useDispatch();
  const { data, status } = useSelector((state) => state.dog);

  const getBreedName = () => {
    if (!data?.message) return '';
    const parts = data.message.split('/');
    return parts[4].split('-').join(' ');
  };

  return (
    <div className="dog-container">
      <div className="dog-content">
        <button 
          className="generate-btn"
          onClick={() => dispatch(fetchDog())}
          disabled={status === 'loading'}
        >
          {status === 'loading' ? 'Generating...' : 'Generate New Dog'}
        </button>

        {data?.message && (
          <div className="dog-image-container">
            <img 
              src={data.message} 
              alt="Random Dog" 
              className="dog-image"
            />
            <div className="breed-name">
              🐶 {getBreedName()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dog;