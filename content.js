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
                        if (stockNumber < 5) { //kırmızı
                            parentTd.style.backgroundColor = "#F08080";
                            parentTd.style.color = "white"; 
                            stockElement.style.color = "black";
                        } else if (stockNumber >= 5 && stockNumber < 10) { //sarı
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