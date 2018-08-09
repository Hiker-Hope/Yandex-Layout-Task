// Devices list

const devices = [
    {
        name: 'Xiaomi Yeelight LED Smart Bulb',
        type: 'lightBulb',
        room: 'kitchen',
        isOn: true,
        icon: 'guide/assets/icon_sun_2.svg'
    },
    {
        name: 'Xiaomi Yeelight LED Smart Bulb',
        type: 'lightBulb',
        room: 'kitchen',
        isOn: true,
        icon: 'guide/assets/icon_sun_2.svg'
    },
    {
        name: 'Xiaomi Yeelight LED Smart Bulb',
        type: 'lightBulb',
        room: 'kitchen',
        isOn: true,
        icon: 'guide/assets/icon_sun_2.svg'
    },
    {
        name: 'Xiaomi Yeelight LED Smart Bulb',
        type: 'lightBulb',
        room: 'kitchen',
        isOn: true,
        icon: 'guide/assets/icon_sun_2.svg'
    },
    {
        name: 'Xiaomi Yeelight LED Smart Bulb',
        type: 'lightBulb',
        room: 'kitchen',
        isOn: true,
        icon: 'guide/assets/icon_sun_2.svg'
    },
    {
        name: 'Xiaomi Yeelight LED Smart Bulb',
        type: 'lightBulb',
        room: 'kitchen',
        isOn: true,
        icon: 'guide/assets/icon_sun_2.svg'
    },
    {
        name: 'Xiaomi Yeelight LED Smart Bulb',
        type: 'lightBulb',
        room: 'kitchen',
        isOn: true,
        icon: 'guide/assets/icon_sun_2.svg'
    },
    {
        name: 'Xiaomi Yeelight LED Smart Bulb',
        type: 'lightBulb',
        room: 'kitchen',
        isOn: true,
        icon: 'guide/assets/icon_sun_2.svg'
    },

    {
        name: 'D-Link Omna 180 Cam',
        type: 'camera',
        room: 'living-room',
        isOn: false,
        icon: 'guide/assets/icon_sun.svg'
    },

    {
        name: 'Elgato Eve Degree Connected',
        type: 'thermometer',
        room: 'kitchen',
        isOn: false,
        icon: 'guide/assets/icon_temperature.svg'
    },

    {
        name: 'LIFX Mini Day &amp; Dusk A60 E27',
        type: 'camera',
        room: 'living-room',
        isOn: false,
        icon: 'guide/assets/icon_sun.svg'
    },

    {
        name: 'Xiaomi Mi Air Purifier 2S',
        type: 'air-purifier',
        room: 'kitchen',
        isOn: true,
        icon: 'guide/assets/icon_sun_2.svg'
    },

    {
        name: 'Philips Zhirui',
        type: 'camera',
        room: 'living-room',
        isOn: false,
        icon: 'guide/assets/icon_sun.svg'
    },

    {
        name: 'Xiaomi Mi Air Purifier 2S',
        type: 'air-purifier',
        room: 'living-room',
        isOn: true,
        icon: 'guide/assets/icon_sun_2.svg'
    }
]

function createDeviceFragment(device = {}) {
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
}

function renderDevices(devices = []) {
    const devicesHTML = devices.map(createDeviceFragment)
    const devicesList = document.querySelector('.devices-list')
    const fragment = devicesHTML.reduce((list, deviceElement) => {
        list.appendChild(deviceElement)
        return list
    }, document.createDocumentFragment())
    devicesList.innerHTML = ''
    devicesList.appendChild(fragment)
}

renderDevices(devices)

// Devices filters

const devicesSection = document.querySelector('.main__section--devices')
devicesSection.addEventListener('change', function (event) {
    const {target: {value}} = event
    const filtered =
        value == 'kitchen' || value == 'living-room' ? devices.filter(device => device.room == value) :
        value == 'cameras' ? devices.filter(device => device.type == 'camera') :
        value == 'lights' ? devices.filter(device => device.type == 'lightBulb') :
        devices
    renderDevices(filtered)
})

// Devices menu - mobile

const toggleDevicesMenuButtons = document.querySelectorAll('.devices-menu-item__label')
for (let i=0; i<toggleDevicesMenuButtons.length; i++) {
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
        for (let i=0; i<tileClose.length; i++) {
            tileClose[i].classList.add('hidden')
        }
}

const mainContainer = document.querySelector('.main')
mainContainer.addEventListener('click', function({ target }) {
    if(!target) return

    const item = target.closest('.item')
    if(!item) return

    if (item.classList.contains('lightBulb')) popUpShow('home-lights')
    if (item.classList.contains('thermometer')) popUpShow('home-temperature')
    if (item.classList.contains('floors')) popUpShow('home-floor')
})

// const modal = document.querySelector('.modal-container')


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
    let { offsetWidth, scrollLeft } = container
    // console.log(scrollLeft)
    // const translateValue = Number(transformStyle.replace(/[^\d.-]/g, ''));
    // const nextTranslateValue = direction == 'forward' ?
    //                     translateValue - offsetWidth :
    //                     translateValue + offsetWidth
    const scrollAmount = direction == 'forward' ? scrollLeft + offsetWidth : scrollLeft - offsetWidth
    // container.style.transform = `translateX(${nextTranslateValue}px)`
    // container.scrollLeft = offsetWidth
    container.scrollTo({
        left: scrollAmount,
        behavior: "smooth"
    });
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
    if(!paginatorButton) return

        if (paginatorButton.classList.contains('paginator--forward')) {
            const backButton = paginatorButton.parentNode.querySelector('.paginator--back')
            backButton.disabled = false

            turnPage ('forward', itemToMove)
            const { offsetWidth, scrollLeft, scrollWidth } = itemToMove
            // const translateValue = Number(transformStyle.replace(/[^\d.]/g, ''));
            paginatorButton.disabled = scrollLeft + offsetWidth >= scrollWidth - offsetWidth
            // console.log(scrollLeft)
            // console.log(scrollWidth)
        }

        if (paginatorButton.classList.contains('paginator--back')) {
            const forwardButton = paginatorButton.parentNode.querySelector('.paginator--forward')
            forwardButton.disabled = false

            turnPage ('back', itemToMove)
            const { scrollLeft, offsetWidth } = itemToMove
            // console.log(scrollLeft)
            // const translateValue = Number(transformStyle.replace(/[^\d.-]/g, ''));
            paginatorButton.disabled = scrollLeft - offsetWidth <= 0
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
    if (target.closest('.modal-item__button')) {
        popUpHide()
        return
    }

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

const debounce = (callback, time = 250, interval) =>
  (...args) =>
    clearTimeout(interval, interval = setTimeout(() => callback(...args), time));

// arrow box
const scheduledList = document.querySelector('.scheduled-list')
if (scheduledList.children.length > 2 && window.innerWidth > 1250) {
    scheduledList.classList.add('arrow-box')
}

scheduledList.addEventListener('scroll', debounce(function(event) {
    if (scheduledList.scrollTop > 0) scheduledList.classList.remove('arrow-box')
    if (scheduledList.scrollTop <= 0) scheduledList.classList.add('arrow-box')
}, 10))


window.addEventListener('resize', debounce(function () {
    if (window.innerWidth <= 1250) scheduledList.classList.remove('arrow-box')
    if (window.innerWidth > 1250) scheduledList.classList.add('arrow-box')
}) )