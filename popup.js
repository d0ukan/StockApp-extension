document.addEventListener('DOMContentLoaded', () => {
    const partNumberInput = document.getElementById('partNumberInput');
    const addPartButton = document.getElementById('addPartButton');
    const partList = document.getElementById('partList');

    // Load saved part numbers
    chrome.storage.local.get(['partNumbers'], (result) => {
        const partNumbers = result.partNumbers || [];
        updatePartList(partNumbers);
    });

    // Add a new part number
    function addPart() {
        const partNumber = partNumberInput.value.trim();
        if (partNumber) {
            chrome.storage.local.get(['partNumbers'], (result) => {
                const partNumbers = result.partNumbers || [];
                if (!partNumbers.includes(partNumber)) {
                    partNumbers.push(partNumber);
                    chrome.storage.local.set({ partNumbers });
                    updatePartList(partNumbers);
                }
            });
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
        partList.innerHTML = '';
        partNumbers.forEach((partNumber) => {
            const li = document.createElement('li');
            li.textContent = partNumber;
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
    }
});
