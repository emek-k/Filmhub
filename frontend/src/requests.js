const key = 'ac0accae8ecc4e6cba7c3a1110a8bb30'

const requests = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
    requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`,
    requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
    requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
    searchMovies: (query) => {
        return `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&query=${encodeURIComponent(query)}&include_adult=false`;
    }
};

export default requests