import React, { useState } from 'react';
import axios from 'axios';

// Sample data for categories and filters
export const category = [
  {
    img: "https://i.pinimg.com/736x/fd/4b/1e/fd4b1e9fbbee80cb8528fea54cddcb50.jpg",
    name: "Burgers",
    off: "20-40% OFF",
  },
  {
    img: "https://img.freepik.com/premium-photo/huge-selection-peeroni-pizza-with-tomato-sauce-sausage-dark-table_124507-61025.jpg",
    name: "Pizzas",
    off: "10-20% OFF",
  },
  {
    img: "https://bonmasala.com/wp-content/uploads/2022/10/mutton-biriyani-recipe.jpeg",
    name: "Biriyanis",
    off: "20-40% OFF",
  },
  {
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Desserts.jpg/520px-Desserts.jpg",
    name: "Desserts",
    off: "30-40% OFF",
  },
  {
    img: "https://media.istockphoto.com/id/1366811190/photo/different-type-of-coktails-on-wooden-table.jpg?s=612x612&w=0&k=20&c=BS4lAi77xCxn7LkMleAkw56H-IBaSzE1P2tQuUJcQlQ=",
    name: "Beverages",
    off: "10-40% OFF",
  },
];

export const filter = [
  {
    name: "Food Categories",
    value: "category",
    items: [
      "Noodles",
      "Burger",
      "Pizza",
      "Pasta",
      "Sushi",
      "Tacos",
      "Salads",
      "Sandwiches",
      "Dessert",
      "Beverages",
    ],
  },
  {
    name: "Filter by Price",
    value: "price",
    items: [],
  },
];

// Main Component
const FilterComponent = () => {
  const [hoveredItem, setHoveredItem] = useState("");
  const [data, setData] = useState([]);

  // Example API endpoint - Recipe Puppy API
  const API_URL = "http://www.recipepuppy.com/api/";

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
    fetchData(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem("");
    setData([]);
  };

  const fetchData = async (item) => {
    try {
      const response = await axios.get(API_URL, {
        params: {
          i: item, // Use the hovered item as a query parameter
        },
      });
      setData(response.data.results || []); // Adjust based on the API response
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  return (
    <div>
      <h2>Filter by Food Categories</h2>
      <ul>
        {filter[0].items.map((item) => (
          <li
            key={item}
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            {item}
          </li>
        ))}
      </ul>
      {hoveredItem && (
        <div>
          <h3>Details for {hoveredItem}</h3>
          <ul>
            {data.length > 0 ? (
              data.map((detail, index) => (
                <li key={index}>
                  <a href={detail.href} target="_blank" rel="noopener noreferrer">
                    {detail.title}
                  </a>
                </li>
              ))
            ) : (
              <li>No data available</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterComponent;
