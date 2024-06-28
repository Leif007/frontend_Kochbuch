import axios from 'axios'

const url = import.meta.env.VITE_APP_BACKEND_BASE_URL

const apiClient = axios.create({
    baseURL:"http://localhost:8080",
    headers: {
        'Content-Type': 'application/json'
    }
})



export default {
    getRoot() {
        return apiClient.get('/')
    },

    newRecipe(newRecipe) {
        return apiClient.post('/recipe', {newRecipe})
    },

    allRecipes() {
        return apiClient.get('/recipes')
    },
    searchAndGetDetails(foodNames) {
    const backendUrl = 'https://meinkochbuch-backend.onrender.com';
        console.log(`Fetching details for: ${foodNames}`);
    fetch(`${backendUrl}/searchAndGetDetails/${foodNames}`)
      .then(response => response.json())
      .then(data => {
          console.log(`Received data: ${JSON.stringify(data)}`);
          console.log(data);
      })
      .catch(error => {
          console.error('Error:', error);
      });
}
}


