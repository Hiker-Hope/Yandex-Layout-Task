// Modals

function popUpShow(itemId) {
    document.querySelector('.overlay').classList.remove('overlay--hidden');
    document.querySelector('.modal-container').classList.remove('modal-container--hidden');
    document.getElementById(itemId).classList.remove('hidden')
}

function popUpHide() {
    document.querySelector('.overlay').classList.add('overlay--hidden');
    document.querySelector('.modal-container').classList.add('modal-container--hidden');
    let tileClose = document.querySelectorAll('.modal__main')
        for (i=0; i<tileClose.length; i++) {
            tileClose[i].classList.add('hidden')
        } 
}

const mainContainer = document.querySelector('.main')
mainContainer.addEventListener('click', function({ target }) {
    if(!target) return

    const item = target.closest('.item')
    if (item.classList.contains('lightBulb')) popUpShow('home-lights')
    if (item.classList.contains('thermometer')) popUpShow('home-temperature')
    if (item.classList.contains('floors')) popUpShow('home-floor')
})

const modal = document.querySelector('.modal-container')
modal.addEventListener('click', function({ target }) {
        if(!target) return
        if (target.closest('.modal-item__button')) popUpHide()
})

// Hamburger menu

const toggleMainMenuBtn = document.querySelector('.header-menu__icon')
toggleMainMenuBtn.addEventListener('click', function() {
    document.querySelector('.header-menu').classList.toggle('header-menu--hidden')
})

// Forward button disable

function shouldEnableForward(parentSelector) {
    const forward = document.querySelector(`${parentSelector} .paginator--forward`)
    const container = document.querySelector(`${parentSelector} > div:nth-of-type(2)`)
    forward.disabled = container.offsetWidth >= container.scrollWidth
}

shouldEnableForward('.main__section--selected')
shouldEnableForward('.main__section--devices')

// Pagination

function turnPage(direction, container) {
    let { offsetWidth, style: { transform: transformStyle } } = container
    const translateValue = Number(transformStyle.replace(/[^\d.-]/g, ''));
    const nextTranslateValue = direction == 'forward' ?
                        translateValue - offsetWidth :
                        translateValue + offsetWidth
    
    container.style.transform = `translateX(${nextTranslateValue}px)`
}

const paginatorContainerMain = document.querySelector('.main')
paginatorContainerMain.addEventListener('click', function({ target }) {
    if(!target) return;

    const paginatorSection = target.closest('.main__section')
    const itemToMove =
        paginatorSection.classList.contains('main__section--selected') ?
                            document.querySelector('.selected-list') :
                            document.querySelector('.devices-list')

    const paginatorButton = target.closest('.paginator-button')
        if (paginatorButton.classList.contains('paginator--forward')) {
            const backButton = paginatorButton.parentNode.querySelector('.paginator--back')
            backButton.disabled = false

            turnPage ('forward', itemToMove) 
            const { offsetWidth, scrollWidth, style: { transform: transformStyle } } = itemToMove
            const translateValue = Number(transformStyle.replace(/[^\d.]/g, ''));
            paginatorButton.disabled = translateValue + offsetWidth >= scrollWidth
        }

        if (paginatorButton.classList.contains('paginator--back')) {
            const forwardButton = paginatorButton.parentNode.querySelector('.paginator--forward')
            forwardButton.disabled = false

            turnPage ('back', itemToMove)  
            const { style: { transform: transformStyle } } = itemToMove
            const translateValue = Number(transformStyle.replace(/[^\d.-]/g, ''));
            paginatorButton.disabled = translateValue >= 0
        }
})

// Temperature range slider

function getOutputValue(temperatureValue) {   
    const outputValue = 
            (temperatureValue > 0) ? 
            `+${temperatureValue}` :
            temperatureValue 
        document.getElementById('temperature--output').textContent = outputValue;
}

// Modal settings menu

const modalContainer = document.querySelector('.modal-container')
modalContainer.addEventListener('click', function({ target }) {
    if(!target) return;

    const modalMain = target.closest('.modal__main')
    const menuButton = target.closest('.menu-section__item')
    const lightsSlider = document.getElementById('range-lights')
    const temperatureSlider = document.getElementById('range-temperature')    
    
    if (modalMain.classList.contains('modal--lights')) {
        lightsSlider.value = menuButton.value
    } else { 
        temperatureSlider.value = menuButton.value
        getOutputValue(temperatureSlider.value)
    } 
})