import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllProducts } from "../api"; // Import the API function

// Styled-components for styling the dishes layout
const DishesContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const DishCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin: 10px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const DishImage = styled.img`
  max-width: 100%;
  height: auto;
  border-radius: 8px;
`;

// Main Dishes component
const Dishes = () => {
  const [dishes, setDishes] = useState([]);

  // Fetch dishes data from the API
  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await getAllProducts(); // Fetch data using the API function
        setDishes(response.data); // Update state with fetched data
      } catch (error) {
        console.error("Error fetching dishes:", error); // Handle any errors
      }
    };
    fetchDishes(); // Invoke the fetch function
  }, []); // Dependency array is empty, so this effect runs once on component mount

  return (
    <DishesContainer>
      <h2>Dishes</h2>
      <div>
        {dishes.map((dish) => (
          <DishCard key={dish._id}>
            <DishImage src={dish.image} alt={dish.name} />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>${dish.price}</p>
          </DishCard>
        ))}
      </div>
    </DishesContainer>
  );
};

export default Dishes;
