// Devices list

const devices = [
    {
        name: 'Xiaomi Yeelight LED Smart Bulb',
        type: 'lightBulb',
        room: 'kitchen',
        isOn: true,
        icon: 'guide/assets/icon_sun_2@2x.png'
    },

    {
        name: 'D-Link Omna 180 Cam',
        type: 'camera',
        room: 'living-room',
        isOn: false,
        icon: 'guide/assets/icon_sun@2x.png'
    },

    {
        name: 'Elgato Eve Degree Connected',
        type: 'thermometer',
        room: 'kitchen',
        isOn: false,
        icon: 'guide/assets/icon_temperature@2x.png'
    },

    {
        name: 'LIFX Mini Day &amp; Dusk A60 E27',
        type: 'lightBulb',
        room: 'living-room',
        isOn: false,
        icon: 'guide/assets/icon_sun@2x.png'    
    },

    {
        name: 'Xiaomi Mi Air Purifier 2S',
        type: 'air-purifier',
        room: 'kitchen',
        isOn: true,
        icon: 'guide/assets/icon_sun_2@2x.png'    
    },

    {
        name: 'Philips Zhirui',
        type: 'lightBulb',
        room: 'living-room',
        isOn: false,
        icon: 'guide/assets/icon_sun@2x.png'    
    },

    {
        name: 'Xiaomi Mi Air Purifier 2S',
        type: 'air-purifier',
        room: 'living-room',
        isOn: true,
        icon: 'guide/assets/icon_sun_2@2x.png'    
    }
]

const devicesHTML = devices.map(device => {
    const deviceElement = document.createElement('div')
    deviceElement.classList.add('item', device.type, device.room)
    deviceElement.innerHTML = `
        <img class="item__icon" src="${device.icon}">
        <div class="item__content">
            <h4 class="emphasized-text text--element-title">${device.name}</h4>
            ${ device.isOn ? 
                '<p class="item__text text--content">Включено</p>' :
                '<p class="item__text text--content">Выключено</p>'}
        </div>
    `
    return deviceElement
})

console.log(devicesHTML)

const devicesSection = document.querySelector('.main__section--devices')
const devicesList = devicesHTML.reduce((list, deviceElement) => {
    list.appendChild(deviceElement)
    return list
}, document.createElement('div'))
devicesList.classList.add('devices-list')
devicesSection.appendChild(devicesList)

// Devices filters





// Devices menu - mobile

const toggleDevicesMenuButtons = document.querySelectorAll('.devices-menu-item__label')
for(i=0; i<toggleDevicesMenuButtons.length; i++) {
    const toggleDevicesMenuButton = toggleDevicesMenuButtons[i]
    toggleDevicesMenuButton.addEventListener('click', function() {
        toggleDevicesMenuButton.checked = true;
        document.querySelector('.devices-section__menu').classList.toggle('devices-section__menu--hidden')
    })
}

// Modals popup

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
