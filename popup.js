document.addEventListener('DOMContentLoaded', () => {
    const partNumberInput = document.getElementById('partNumberInput');
    const addPartButton = document.getElementById('addPartButton');
    const partList = document.getElementById('partList');
    const partListHeader = document.getElementById('partListHeader');

    // Load saved part numbers
    function loadPartNumbers() {
        try {
            chrome.storage.local.get(['partNumbers'], (result) => {
                const partNumbers = result.partNumbers || [];
                updatePartList(partNumbers);
            });
        } catch (error) {
            console.error('Failed to load part numbers:', error);
        }
    }

    loadPartNumbers();

    // Add a new part number
    function addPart() {
        const partNumber = partNumberInput.value.trim();
        if (partNumber) {
            try {
                chrome.storage.local.get(['partNumbers'], (result) => {
                    const partNumbers = result.partNumbers || [];
                    if (!partNumbers.includes(partNumber)) {
                        partNumbers.push(partNumber);
                        chrome.storage.local.set({ partNumbers });
                        updatePartList(partNumbers);
                    }
                });
            } catch (error) {
                console.error('Failed to add part number:', error);
            }
        }
        partNumberInput.value = '';
    }

    // Add a new part number when button is clicked
    addPartButton.addEventListener('click', addPart);

    // Add a new part number when Enter key is pressed
    partNumberInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Formun gönderilmesini engelle
            addPart();
        }
    });

    // Update the part list UI
    function updatePartList(partNumbers) {
        try {
            partList.innerHTML = '';
            partNumbers.forEach((partNumber, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. ${partNumber}`; // Item numarasını ekle
                li.classList.add('part-item');

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.style.backgroundColor = '#B22222'; // Remove butonunun arka plan rengi
                removeButton.addEventListener('click', () => {
                    const index = partNumbers.indexOf(partNumber);
                    if (index !== -1) {
                        partNumbers.splice(index, 1);
                        chrome.storage.local.set({ partNumbers });
                        updatePartList(partNumbers);
                    }
                });

                li.appendChild(removeButton);
                partList.appendChild(li);
            });

            // Güncellenmiş toplam sayıyı göster
            partListHeader.textContent = `Total Items: ${partNumbers.length}`;
        } catch (error) {
            console.error('Failed to update part list:', error);
        }
    }
});
