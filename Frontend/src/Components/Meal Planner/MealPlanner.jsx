import React, { useState } from 'react';
import axios from 'axios';
import './MealPlanner.css';
import loadingsrc from '../Assets/loading-unscreen.gif';

const MealPlanner = ({isOpen}) => {
  const [mealPlan, setMealPlan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    allergies: [],
    diets: [],
    meals: [],
    nutrients: [],
  });

  // Event handler for slider input
  
  const [calories, setCalories] = useState(2000);
  const handleSliderChange = (event) => {
    const newCalories = parseInt(event.target.value, 10);
    setCalories(newCalories);
  };

  // Event handler for input field change
  const handleInputChange = (event) => {
    const newCalories = parseInt(event.target.value, 10);
    setCalories(newCalories);
  };
  const [showAllFilters, setShowAllFilters] = useState({
    allergies: false,
    diets: false,
    nutrients: false,
  });

  const allergiesOptions = [
    'Celery-free',
    'Crustacean-free',
    'Dairy-free',
    'Egg-free',
    'Fish-free',
    'Gluten-free',
    'Lupine-free',
    'Mustard-free',
    'Peanut-free',
    'Sesame-free',
    'Shellfish-free',
    'Soy-free',
    'Tree-Nut-free',
    'Wheat-free',
    'FODMAP-Free',
    'Immuno-Supportive',
  ];

  const dietOptions = [
    'Alcohol-free',
    'Balanced',
    'DASH',
    'High-Fiber',
    'High-Protein',
    'Keto',
    'Kidney friendly',
    'Kosher',
    'Low-Carb',
    'Low-Fat',
    'Low potassium',
    'Low-Sodium',
    'Mediterranean',
    'No oil added',
    'No-sugar',
    'Paleo',
    'Pescatarian',
    'Pork-free',
    'Red meat-free',
    'Sugar-conscious',
    'Vegan',
    'Vegetarian',
    'Mollusk-Free',
    'Sulfite-Free',
  ];

  const nutrientsOptions = [
    'Fat',
    'Saturated',
    'Trans',
    'Monounsaturated',
    'Polyunsaturated',
    'Carbs',
    'Fiber',
    'Sugars',
    'Protein',
    'Added sugar',
    'Carbohydrate(net)',
    'Water',
    'Micronutrients',
    'Cholesterol',
    'Sodium',
    'Calcium',
    'Magnesium',
    'Potassium',
    'Iron',
    'Phosphorus',
    'Vitamin A',
    'Vitamin C',
    'Thiamin (B1)',
    'Riboflavin (B2)',
    'Niacin (B3)',
    'Vitamin B6',
    'Folate (Equivalent)',
    'Vitamin B12',
    'Vitamin D',
    'Vitamin E',
    'Vitamin K',
    'Folate, food',
    'Folic acid',
    'Sugar alcohols',
    'Zinc, Zn',
  ];

  const handleFilterClick = (filterType, filterValue) => {
    setFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      const index = updatedFilters[filterType].indexOf(filterValue);

      if (index !== -1) {
        // Remove filter if already present
        updatedFilters[filterType] = updatedFilters[filterType].filter(item => item !== filterValue);
      } else {
        // Add filter if not present
        updatedFilters[filterType] = [...updatedFilters[filterType], filterValue];
      }

      return updatedFilters;
    });
  };

  const toggleShowAllFilters = (filterType) => {
    setShowAllFilters((prevShowAllFilters) => ({
      ...prevShowAllFilters,
      [filterType]: !prevShowAllFilters[filterType],
    }));
  };

  const generateMealPlan = async () => {
    const api_key = '857e6d81f29c49878c61bcb42b0c8950'; // API key Spoonacular
    const meals_per_day = filters.meals.length > 0 ? filters.meals.length : 3;

    setLoading(true);

    try {
      // Make the API request
      const response = await axios.get('https://api.spoonacular.com/mealplanner/generate', {
        params: {
          apiKey: api_key,
          targetCalories: calories,
          timeFrame: 'day',
          diet: filters.diets.join(','),
          exclude: filters.allergies.join(','),
          number: meals_per_day,
          nutrients: filters.nutrients.join(','),
        },
      });

      const mealPromises = response.data.meals.map(async (meal) => {
        // Fetch additional information for each meal, including the image URL and nutrition details
        const mealDetailsResponse = await axios.get(
          `https://api.spoonacular.com/recipes/${meal.id}/information`,
          {
            params: {
              apiKey: api_key,
              includeNutrition: true, // Include nutrition details
            },
          }
        );

        return {
          id: meal.id,
          title: meal.title,
          image: mealDetailsResponse.data.image,
          nutrients: mealDetailsResponse.data.nutrition.nutrients,
        };
      });

      // Wait for all promises to resolve
      const detailedMeals = await Promise.all(mealPromises);

      // Update the state with the detailed meal plan
      setMealPlan(detailedMeals);
      setLoading(false);
    } catch (error) {
      // Handle errors
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className={`content ${isOpen ? 'shifted' : ''}`}>
      <div className={`page-container ${loading ? 'vaporize' : ''}`}>
    <div className="meal-planner-container">
      <h1>Meal Planner</h1>

      <div className="input-container">
        <label className='Cals'>Calories per Meal: </label>
        {/* <input placeholder="0-0-0" class="input" name="firstName" type="text" onChange={(e)=>setCalories(e.target.value)}/> */}
        <input
        type="range"
        min="0"
        max="8000"
        value={calories}
        className="PB-range-slider"
        id="myRange"
        onChange={handleSliderChange}
      />
      <input
        type="number"
        min="0"
        max="8000"
        value={calories}
        onChange={handleInputChange}
        className="PB-range-input"
        id='rang'
        style={{borderRadius:'4px'}}
      />
      <label style={{fontWeight:'bolder', marginLeft:'10px'}} for="rang">Calories</label>
      </div>

      <div className="filter-section">
        <h3>Allergies:</h3>
        {allergiesOptions.slice(0, showAllFilters.allergies ? undefined : 5).map((allergy) => (
          <div
            key={allergy}
            className={`chip ${filters.allergies.includes(allergy) ? 'chip-active' : ''}`}
            onClick={() => handleFilterClick('allergies', allergy)}
          >
            {allergy}
          </div>
        ))}
        {allergiesOptions.length > 5 && (
          <button className="toggle-filters-button" onClick={() => toggleShowAllFilters('allergies')}>
            {showAllFilters.allergies ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>

      <div className="filter-section">
        <h3>Diets:</h3>
        {dietOptions.slice(0, showAllFilters.diets ? undefined : 5).map((diet) => (
          <div
            key={diet}
            className={`chip ${filters.diets.includes(diet) ? 'chip-active' : ''}`}
            onClick={() => handleFilterClick('diets', diet)}
          >
            {diet}
          </div>
        ))}
        {dietOptions.length > 5 && (
          <button className="toggle-filters-button" onClick={() => toggleShowAllFilters('diets')}>
            {showAllFilters.diets ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>

      <div className="filter-section">
        <h3>Meals:</h3>
        {['Breakfast', 'Brunch', 'Lunch', 'Dinner'].map((meal) => (
          <div
            key={meal}
            className={`chip ${filters.meals.includes(meal) ? 'chip-active' : ''}`}
            onClick={() => handleFilterClick('meals', meal)}
          >
            {meal}
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h3>Nutrients:</h3>
        {nutrientsOptions.slice(0, showAllFilters.nutrients ? undefined : 5).map((nutrient) => (
          <div
            key={nutrient}
            className={`chip ${filters.nutrients.includes(nutrient) ? 'chip-active' : ''}`}
            onClick={() => handleFilterClick('nutrients', nutrient)}
          >
            {nutrient}
          </div>
        ))}
        {nutrientsOptions.length > 5 && (
          <button className="toggle-filters-button" onClick={() => toggleShowAllFilters('nutrients')}>
            {showAllFilters.nutrients ? 'Show Less' : 'Show More'}
          </button>
        )}
      </div>

      <button className="generate-button" onClick={generateMealPlan} disabled={loading}>
        Generate Meal Plan
      </button>
      
          <br/>
      {loading && <img src={loadingsrc} style={{width:'1000px',height:'1000px'}}></img>}
      {error && <p className="error-message">{error}</p>}

      {mealPlan.length > 0 && (
  <div>
    <h3>Meal Plan:</h3>
    <div className="card-container50">
      {mealPlan.map((meal) => (
        <div className="card15" key={meal.id}>
          <div className="imge">
            <div className="heart-icon">
            <label class="ui-bookmark">
  <input type="checkbox" />
  <div class="bookmark">
    <svg
      viewBox="0 0 16 16"
      style={{marginTop:'4px'}}
      class="bi bi-heart-fill"
      height="25"
      width="25"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"
        fill-rule="evenodd"
      ></path>
    </svg>
  </div>
</label>
            </div>
            <img
              src={meal.image}
              alt={meal.title}
              className="Usericon"
            />
            <p className="UserName">{meal.title}</p>
            {/* <p className="Id">{`${meal.nutrients.find(nutrient => nutrient.name === 'Calories').amount} ${meal.nutrients.find(nutrient => nutrient.name === 'Calories').unit}`}</p> */}
          </div>
          <div className="Description">
            {meal.nutrients.map((nutrient) => (
              <p key={nutrient.name}>
                {nutrient.name}: {nutrient.amount} {nutrient.unit}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
)}


    </div>
    </div>
    </div>
  );
};

export default MealPlanner;
