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

    // Set current time
    const currentTime = card.querySelector('.card__info_bottom__time');
    let currentTimeValue = timeframes.current;

    if (data.title == 'Work' && currentOption == 'monthly'){
        numberAnimation(currentTime, currentTimeValue, 1, true);
    }
    else 
        numberAnimation(currentTime, currentTimeValue, 40, false);

    /*
    currentTime.innerText = currentTimeValue == 1 ? 
                            currentTimeValue + 'hr' :
                            currentTimeValue + 'hrs';
                            */
    
    // Set previous time
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

function numberAnimation(cardChild, value, initialDelay, fast) {
    
    let counter = 0;
    var delay = initialDelay;
    const maxDelay = 300;

    let fn = () => {
        if (counter <= value) {
            cardChild.innerText = counter == 1 ? 
                                  counter + 'hr' :
                                  counter + 'hrs';
            counter++;
            if (!fast || counter >= 50)
                if (delay + 2 < maxDelay)
                    delay += 2;
            setTimeout(fn, delay);
        }
    }

    setTimeout(fn, delay);

    /*
    let counter = 0;
    let delay = 50; // ms?

    let fn = setInterval(() => {
        if (counter <= value) {
            cardChild.innerText = counter == 1 ? 
                                  counter + 'hr' :
                                  counter + 'hrs';
        } else {
            clearInterval(fn);
        }
        counter++;
    }, delay);*/
}

function initializeDailyData() {
    currentOption = 'daily';
    loadData();
}

main();