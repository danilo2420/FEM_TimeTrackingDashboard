/* Elements */
const options = document.getElementById('user__options');
const cards = document.querySelectorAll('.card');

/* Variables */
let currentOption = 'daily'; // Use this later 
const map = new Map();

/* Functions */
function main() {
    initializeMap();
    configureOptions();
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
            styleOptions(event);
            loadData(event.target.dataset.item);
        })
    }
}

function styleOptions(event) {
    for (option of options.children) {
        option.classList.remove('item--active');
    }
    event.target.classList.add('item--active');
}

function loadData(value) {
    console.log('value is ' + value);
    fetch('data.json')
        .then((response) => {
            if(!response.ok) return console.log('Something went wrong');
            return response.json()
        }).then((data) => {
            for (item of data) {
                console.log(item);
            }
        });
}

main();