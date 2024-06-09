// script.js
document.addEventListener('DOMContentLoaded', () => {
    const newItemInput = document.getElementById('new-item-input');
    const addItemButton = document.getElementById('add-item-button');
    const itemsList = document.getElementById('items-list');
    const remainingItemsList = document.getElementById('remaining-items-list');
    const purchasedItemsList = document.getElementById('purchased-items-list');

    const items = [
        { name: 'Помідори', quantity: 2, purchased: true },
        { name: 'Печиво', quantity: 2, purchased: false },
        { name: 'Сир', quantity: 1, purchased: false },
    ];

    function renderItems() {
        itemsList.innerHTML = '';
        remainingItemsList.innerHTML = '';
        purchasedItemsList.innerHTML = '';

        items.forEach((item, index) => {
            const itemElement = document.createElement('li');

            const nameElement = document.createElement('span');
            nameElement.className = 'name';
            nameElement.textContent = item.name;
            nameElement.contentEditable = !item.purchased;
            nameElement.addEventListener('blur', () => {
                item.name = nameElement.textContent;
                updateStats();
            });

            const quantityDisplay = document.createElement('span');
            quantityDisplay.className = 'quantity-display';
            quantityDisplay.textContent = item.quantity;

            const minusButton = document.createElement('button');
            minusButton.textContent = '-';
            minusButton.className = 'quantity minus';
            minusButton.disabled = item.quantity <= 1;
            minusButton.addEventListener('click', () => {
                item.quantity--;
                renderItems();
                updateStats();
            });

            const plusButton = document.createElement('button');
            plusButton.textContent = '+';
            plusButton.className = 'quantity plus';
            plusButton.addEventListener('click', () => {
                item.quantity++;
                renderItems();
                updateStats();
            });

            const markPurchasedButton = document.createElement('button');
            markPurchasedButton.textContent = item.purchased ? 'Не куплено' : 'Куплено';
            markPurchasedButton.className = item.purchased ? 'mark-not-purchased' : 'mark-purchased';
            markPurchasedButton.addEventListener('click', () => {
                item.purchased = !item.purchased;
                renderItems();
                updateStats();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '×';
            deleteButton.className = 'delete';
            deleteButton.addEventListener('click', () => {
                items.splice(index, 1);
                renderItems();
                updateStats();
            });

            itemElement.appendChild(nameElement);
            itemElement.appendChild(quantityDisplay);
            if (!item.purchased) {
                itemElement.appendChild(minusButton);
                itemElement.appendChild(plusButton);
                itemElement.appendChild(markPurchasedButton);
                itemElement.appendChild(deleteButton);
            } else {
                itemElement.className = 'strikethrough';
                itemElement.appendChild(markPurchasedButton);
            }

            itemsList.appendChild(itemElement);

            const statItemElement = document.createElement('li');
            const statName = document.createElement('span');
            statName.textContent = item.name;
            const statQuantity = document.createElement('span');
            statQuantity.className = 'quantity-display';
            statQuantity.textContent = item.quantity;

            statItemElement.appendChild(statName);
            statItemElement.appendChild(statQuantity);

            if (item.purchased) {
                purchasedItemsList.appendChild(statItemElement);
            } else {
                remainingItemsList.appendChild(statItemElement);
            }
        });
    }

    function updateStats() {
        renderItems();
    }

    addItemButton.addEventListener('click', () => {
        const itemName = newItemInput.value.trim();
        if (itemName) {
            items.push({ name: itemName, quantity: 1, purchased: false });
            newItemInput.value = '';
            newItemInput.focus();
            renderItems();
            updateStats();
        }
    });

    newItemInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addItemButton.click();
        }
    });

    renderItems();
    updateStats();
});
