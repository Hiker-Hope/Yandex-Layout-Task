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
        if (paginatorButton.classList.contains('paginator--forward')) turnPage ('forward', itemToMove)
        if (paginatorButton.classList.contains('paginator--back')) turnPage ('back', itemToMove)  
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
    const lightsSetting = document.getElementById('range-lights')
    const temperatureSetting = document.getElementById('range-temperature')    
    
    if (modalMain.classList.contains('modal--lights')) {
        lightsSetting.value = menuButton.value
    } else { 
        temperatureSetting.value = menuButton.value
        nextValue(temperatureSetting.value)
    } 
})

// Devices filter 

const devices = document.querySelectorAll('.devices-item')
for (i=0; i<devices.length; i++) {
    const device = devices[i]
    console.log(device)
}

