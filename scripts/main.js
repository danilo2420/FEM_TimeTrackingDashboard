/* Elements */
const options = document.getElementById('user__options');

/* Variables */
let currentOption = 'daily';

/* Functions */
function main() {
    configureOptions();
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
}

main();