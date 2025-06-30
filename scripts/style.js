console.log('hello');

function styleDocument() {
    const screenWidth = screen.width;

    if (screenWidth > 600) {
        const cards = document.querySelectorAll('.card');
        console.log(cards);
        cards.forEach((card) => {
            const time = card.querySelector('.card__info_bottom__time');
            time.classList.remove('tp3');
            time.classList.add('tp1');
            console.log('hello');
        })
    }
}
