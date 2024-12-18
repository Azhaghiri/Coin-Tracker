 const API_URL = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
let cryptoData = []; // To store the fetched data
let isSortedByMarketCap = false;
let isSortedByPercentageChange = false;

// Function to render data into the table
function renderTable(data) {
    const tableBody = document.querySelector("#cryptoTable tbody");
    tableBody.innerHTML = ""; // Clear previous table data

    data.forEach((coin) => {
        const row = `
            <tr>
            <td><img src="${coin.image}" alt="${coin.name}"/> </td>
            <td>${coin.name}</td>
            <td>${coin.symbol.toUpperCase()}</td>
                <td>${coin.total_volume}</td>
                <td>${coin.price_change_percentage_24h}%</td>
                <td>Mkr Cap: ${coin.market_cap}</td>
            </tr>
        `;
        tableBody.insertAdjacentHTML("beforeend", row);
    });
}

// Fetch using .then()
function fetchDataUsingThen() {
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            cryptoData = data;
            renderTable(cryptoData);
        })
        .catch((error) => console.error("Error fetching data:", error));
}

// Fetch using async/await
async function fetchDataUsingAsyncAwait() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        cryptoData = data;
        renderTable(cryptoData);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Search Functionality
function searchCrypto() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const filteredData = cryptoData.filter((coin) =>
        coin.name.toLowerCase().includes(searchInput)
    );
    renderTable(filteredData);
}

// Sort Functionality by Market Cap
function sortByMarketCap() {
    isSortedByMarketCap = !isSortedByMarketCap;

    const sortedData = [...cryptoData].sort((a, b) => {
        return isSortedByMarketCap
            ? a.market_cap - b.market_cap // Ascending
            : b.market_cap - a.market_cap; // Descending
    });

    renderTable(sortedData);
}

// Sort Functionality by Percentage Change
function sortByPercentageChange() {
    isSortedByPercentageChange = !isSortedByPercentageChange;

    const sortedData = [...cryptoData].sort((a, b) => {
        return isSortedByPercentageChange
            ? a.price_change_percentage_24h - b.price_change_percentage_24h // Ascending
            : b.price_change_percentage_24h - a.price_change_percentage_24h; // Descending
    });

    renderTable(sortedData);
}

// Event Listeners
document.getElementById("searchButton").addEventListener("click", searchCrypto);
document.getElementById("sortButton").addEventListener("click", sortByMarketCap);
document
    .getElementById("sortPercentageButton")
    .addEventListener("click", sortByPercentageChange);

// Initial Data Fetch (Using async/await)
fetchDataUsingAsyncAwait();
