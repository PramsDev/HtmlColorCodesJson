// Create function to fetch json data from provided path
function fetchJson(path) {
    return fetch(path)
        .then(response => response.json());
}

// Create function to handle color search via input
function searchColor(data, query) {
    return data.find(color => color.html_css_color_name.toLowerCase() === query.toLowerCase())
}

// Create function to handle color search via color picker
function pickColor(data, hexCode) {
    return data.find(color => color.hex_code_rgb.toLowerCase() === hexCode.toLowerCase());
}

// Create function to display color info
function displayColorInfo(color) {
    const resultsDiv = document.querySelector('#results');
    resultsDiv.innerHTML = `
        <p><strong>Name:</strong> ${color.html_css_color_name}</p>
        <p><strong>Hex Code:</strong> ${color.hex_code_rgb}</p>
        <p><strong>RGB:</strong> ${color.decimal_code_rgb}</p>
    `;
}

// Fetch the color data from the local json file and assign it to colorData 
fetchJson('/HtmlColorCodesJson/HtmlColorCodes.json').then(data => {
    window.colorData = data;  // This will make your json data globally available 

    // Attach event listeners to input and color picker
    const colorSearch = document.querySelector('#colorSearch');
    colorSearch.addEventListener('input', (e) => {
        const colorInfo = searchColor(colorData, e.target.value);
        if (colorInfo) {
            displayColorInfo(colorInfo);
        }
    });

    const colorPicker = document.querySelector('#colorPicker');
    colorPicker.addEventListener('change', (e) => {
        const colorInfo = pickColor(colorData, e.target.value);
        if (colorInfo) {
            displayColorInfo(colorInfo);
        }
    });
});
