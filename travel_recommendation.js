document.addEventListener("DOMContentLoaded", function () {
  // Define UI elements
  const searchButton = document.getElementById("searchButton");
  const clearButton = document.getElementById("clearButton");
  const searchInput = document.getElementById("searchInput");
  const resultsDiv = document.getElementById("results");

  let travelData = [];

  // Fetch data from the JSON file
  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      // Store the fetched data in a global variable for use in search
      travelData = data;
    })
    .catch((error) => console.error("Error fetching data:", error));

  // Event listener for the Search button
  searchButton.addEventListener("click", function () {
    const query = searchInput.value.toLowerCase();
    displayResults(query);
  });

  // Event listener for the Clear button
  clearButton.addEventListener("click", function () {
    clearResults();
  });

  // Function to display the results based on the search query
  function displayResults(query) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = ""; // Clear previous results

    // Filter and search through all categories (countries, temples, beaches)
    const filteredResults = [];

    Object.keys(travelData).forEach((category) => {
      travelData[category].forEach((item) => {
        if (category === "countries") {
          // For countries, search through each city's name and description
          item.cities.forEach((city) => {
            if (
              city.name.toLowerCase().includes(query) ||
              (city.description &&
                city.description.toLowerCase().includes(query))
            ) {
              filteredResults.push(city);
            }
          });
        } else {
          // For other categories, search through name and description directly
          if (
            item.name.toLowerCase().includes(query) ||
            (item.description && item.description.toLowerCase().includes(query))
          ) {
            filteredResults.push(item);
          }
        }
      });
    });

    // Display filtered results
    filteredResults.forEach((item) => {
      const resultElement = document.createElement("div");
      resultElement.className = "result";
      resultElement.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <img src="${item.imageUrl}" alt="${item.name}" width="300"/>
      `;
      resultsContainer.appendChild(resultElement);
    });

    // If no results, display a message
    if (filteredResults.length === 0) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
    }
  }

  // Function to clear the results and search input
  function clearResults() {
    resultsDiv.innerHTML = ""; // Clear displayed results
    searchInput.value = ""; // Clear search input
  }
});
