import React, { useState } from 'react';
import Movie from "./Movie";

const Home = () => {
    const [selectedCategory, setSelectedCategory] = useState('popular');
    const [reloadKey, setReloadKey] = useState(0);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setReloadKey(prevKey => prevKey + 1);
    };

    return (
        <div className="bg-dark text-white text-center">
            <h1>{selectedCategory.toUpperCase()} MOVIES</h1>
            <div className="row gx-2 my-3">
                {['popular', 'toprated', 'trending', 'horror', 'upcoming'].map((category) => (
                    <div className="col" key={category}>
                        <button
                            type="button"
                            className={`btn w-100 ${category === selectedCategory ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    </div>
                ))}
            </div>
            <Movie key={reloadKey} selectedCategory={selectedCategory}/>
        </div>
    );
};

export default Home;
