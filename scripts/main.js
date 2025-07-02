/* Elements */
const options = document.getElementById('user__options');
const cards = document.querySelectorAll('.card');

/* Variables */
let currentOption = undefined; // Use this later 
const map = new Map();

/* Functions */
function main() {
    initializeMap();
    configureOptions();
    initializeDailyData();
}

function initializeMap() {
    for (card of cards) {
        const value = card.dataset.value;
        map.set(value, card);
    }
}

function configureOptions() {
    for (option of options.children) {
        option.addEventListener('click', (event) => {
            currentOption = event.target.dataset.item;
            styleOptions(event);
            loadData();
        })
    }
}

function styleOptions(event) {
    for (option of options.children) {
        option.classList.remove('item--active');
    }
    event.target.classList.add('item--active');
}

function loadData() {
    fetch('data.json')
        .then((response) => {
            if(!response.ok) return console.log('Something went wrong');
            return response.json()
        }).then((data) => {
            if (data) setData(data);
        });
}

function setData(data) {
    for (cardData of data) {
        const currentCard = map.get(cardData.title);
        setCardData(currentCard, cardData);
    }
}

function setCardData(card, data) {
    timeframes = data.timeframes[currentOption];

    const currentTime = card.querySelector('.card__info_bottom__time');
    currentTimeValue = timeframes.current;
    currentTime.innerText = currentTimeValue == 1 ? 
                            currentTimeValue + 'hr' :
                            currentTimeValue + 'hrs';

    const lastTime = card.querySelector('.card__info_bottom__lastTime');
    
    lastTimeSecondaryText = undefined; 
    switch (currentOption) {
        case 'daily':
            lastTimeSecondaryText = 'Yesterday - ';
            break;
        case 'weekly':
            lastTimeSecondaryText = 'Last Week - ';
            break;
        case 'monthly':
            lastTimeSecondaryText = 'Last Month - ';
            break;
    }

    lastTimeValue = timeframes.previous;
    lastTime.innerText = lastTimeSecondaryText + lastTimeValue + 
                         (lastTimeValue == '1' ? 'hr' : 'hrs');
}

function initializeDailyData() {
    currentOption = 'daily';
    loadData();
}

main();