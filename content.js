// Function to apply logic based on stock number and modify the seventh block dynamically
function applyColorBasedOnStock() {
    chrome.storage.local.get(['partNumbers'], (result) => {
        const partNumbers = result.partNumbers || [];

        document.querySelectorAll('a').forEach((partElement) => {
            const partText = partElement.textContent.trim();

            if (partNumbers.includes(partText)) {
                
                const parentRow = partElement.closest('tr');

                if (parentRow) {
                    
                    const stockElement = parentRow.querySelector('a[href^="/stock/item/"]');
                    if (stockElement) {
                        const stockNumber = parseInt(stockElement.textContent.trim(), 10);

                        if (stockNumber <= 5) {
                            
                            const requiredNumber = 10 - stockNumber;
                            
                            
                            const tdElements = parentRow.querySelectorAll('td');
                            if (tdElements.length >= 7) {
                                
                                tdElements[6].textContent = "SIPARIS";
                            }
                        }

                        
                        const parentTd = stockElement.closest('td');
                        if (stockNumber <= 5) { //kırmızı
                            parentTd.style.backgroundColor = "#F08080";
                            parentTd.style.color = "white"; 
                            stockElement.style.color = "black";
                        } else if (stockNumber >= 6 && stockNumber < 10) { //sarı
                            parentTd.style.backgroundColor = "#f7f7a1";
                            parentTd.style.color = "white";
                            stockElement.style.color = "black";
                        } else if (stockNumber >= 10) { //yesil
                            parentTd.style.backgroundColor = "#85e0b3";
                            parentTd.style.color = "white";
                            stockElement.style.color = "black";
                        }
                    }
                }
            }
        });
    });
}

// Apply logic when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", applyColorBasedOnStock);

// Use MutationObserver to monitor dynamic content
const observer = new MutationObserver(applyColorBasedOnStock);

observer.observe(document.body, {
    childList: true,
    subtree: true
});




/*
// Function to apply color based on stock number
function applyColorBasedOnStock() {
    const partNumbers = ["HK-0005-R00", "HK-0006-R00"]; // Add more part numbers as needed

    document.querySelectorAll('a').forEach((partElement) => {
        const partText = partElement.textContent.trim();

        if (partNumbers.includes(partText)) {
            // Now, search for the stock number <a> elements related to this part
            const stockElements = document.querySelectorAll('a[href^="/stock/item/"]');

            stockElements.forEach((stockElement) => {
                const stockNumber = parseInt(stockElement.textContent.trim(), 10);

                // Apply color based on the stock number
                if (stockNumber <= 5) {
                    stockElement.style.color = "red";
                } else if (stockNumber >= 6 && stockNumber <= 10) {
                    stockElement.style.color = "yellow";
                } else if (stockNumber > 10) {
                    stockElement.style.color = "green";
                }
            });
        }
    });
}

// Apply color when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", applyColorBasedOnStock);

// Use MutationObserver to monitor dynamic content
const observer = new MutationObserver(applyColorBasedOnStock);

observer.observe(document.body, {
    childList: true,
    subtree: true
});

*/

/* 
// Function to apply logic based on stock number and modify seventh block
function applyColorBasedOnStock() {
    const partNumbers = ["HK-0005-R00", "HK-0006-R00"]; // Add more part numbers as needed

    document.querySelectorAll('a').forEach((partElement) => {
        const partText = partElement.textContent.trim();

        if (partNumbers.includes(partText)) {
            // Find the closest <tr> that relates this part number to the stock number
            const parentRow = partElement.closest('tr');

            if (parentRow) {
                // Find the stock number <a> element within this row
                const stockElement = parentRow.querySelector('a[href^="/stock/item/"]');
                if (stockElement) {
                    const stockNumber = parseInt(stockElement.textContent.trim(), 10);

                    // If the stock number is 4, modify the seventh <td> in the row
                    if (stockNumber === 4) {
                        const tdElements = parentRow.querySelectorAll('td');
                        if (tdElements.length >= 7) {
                            // Change the content of the seventh <td> to "6"
                            tdElements[6].textContent = "6"; // Note: tdElements[6] refers to the seventh <td> (0-indexed)
                        }
                    }
                }
            }
        }
    });
}

// Apply logic when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", applyColorBasedOnStock);

// Use MutationObserver to monitor dynamic content
const observer = new MutationObserver(applyColorBasedOnStock);

observer.observe(document.body, {
    childList: true,
    subtree: true
});

*/