// Devices list

const devices = [
    {
        name: "Xiaomi Yeelight LED Smart Bulb",
        type: "lightBulb",
        room: "kitchen",
        isOn: true,
        icon: "guide/assets/icon_sun_2.svg",
    },
    {
        name: "Xiaomi Yeelight LED Smart Bulb",
        type: "lightBulb",
        room: "kitchen",
        isOn: true,
        icon: "guide/assets/icon_sun_2.svg",
    },
    {
        name: "Xiaomi Yeelight LED Smart Bulb",
        type: "lightBulb",
        room: "kitchen",
        isOn: true,
        icon: "guide/assets/icon_sun_2.svg",
    },
    {
        name: "Xiaomi Yeelight LED Smart Bulb",
        type: "lightBulb",
        room: "kitchen",
        isOn: true,
        icon: "guide/assets/icon_sun_2.svg",
    },
    {
        name: "Xiaomi Yeelight LED Smart Bulb",
        type: "lightBulb",
        room: "kitchen",
        isOn: true,
        icon: "guide/assets/icon_sun_2.svg",
    },
    {
        name: "Xiaomi Yeelight LED Smart Bulb",
        type: "lightBulb",
        room: "kitchen",
        isOn: true,
        icon: "guide/assets/icon_sun_2.svg",
    },
    {
        name: "Xiaomi Yeelight LED Smart Bulb",
        type: "lightBulb",
        room: "kitchen",
        isOn: true,
        icon: "guide/assets/icon_sun_2.svg",
    },
    {
        name: "Xiaomi Yeelight LED Smart Bulb",
        type: "lightBulb",
        room: "kitchen",
        isOn: true,
        icon: "guide/assets/icon_sun_2.svg",
    },

    {
        name: "D-Link Omna 180 Cam",
        type: "camera",
        room: "living-room",
        isOn: false,
        icon: "guide/assets/icon_sun.svg",
    },

    {
        name: "Elgato Eve Degree Connected",
        type: "thermometer",
        room: "kitchen",
        isOn: false,
        icon: "guide/assets/icon_temperature.svg",
    },

    {
        name: "LIFX Mini Day &amp; Dusk A60 E27",
        type: "camera",
        room: "living-room",
        isOn: false,
        icon: "guide/assets/icon_sun.svg",
    },

    {
        name: "Xiaomi Mi Air Purifier 2S",
        type: "air-purifier",
        room: "kitchen",
        isOn: true,
        icon: "guide/assets/icon_sun_2.svg",
    },

    {
        name: "Philips Zhirui",
        type: "camera",
        room: "living-room",
        isOn: false,
        icon: "guide/assets/icon_sun.svg",
    },

    {
        name: "Xiaomi Mi Air Purifier 2S",
        type: "air-purifier",
        room: "living-room",
        isOn: true,
        icon: "guide/assets/icon_sun_2.svg",
    },
];

function createDeviceFragment(device = {}) {
    const deviceElement = document.createElement("div");
    deviceElement.classList.add("item", device.type, device.room);
    deviceElement.innerHTML = `
        <img class="item__icon" src="${device.icon}">
        <div class="item__content">
            <h4 class="emphasized-text text">${device.name}</h4>
            ${device.isOn
        ? "<p class=\"item__text text--content\">Включено</p>"
        : "<p class=\"item__text text--content\">Выключено</p>"}
        </div>
    `;
    return deviceElement;
}

function renderDevices(devices = []) {
    const devicesHTML = devices.map(createDeviceFragment);
    const devicesList = document.querySelector(".list--devices");
    const fragment = devicesHTML.reduce((list, deviceElement) => {
        list.appendChild(deviceElement);
        return list;
    }, document.createDocumentFragment());
    devicesList.innerHTML = "";
    devicesList.appendChild(fragment);
}

renderDevices(devices);

// Devices filters

const devicesSection = document.querySelector(".main-section--devices");
devicesSection.addEventListener("change", (event) => {
    const { target: { value } } = event;
    const filtered = value === "kitchen" || value === "living-room" ? devices.filter(device => device.room === value)
        : value === "cameras" ? devices.filter(device => device.type === "camera")
            : value === "lights" ? devices.filter(device => device.type === "lightBulb")
                : devices;
    renderDevices(filtered);
});

// Devices menu - mobile

const controlsContainer = document.querySelector(".controls__container");
controlsContainer.addEventListener("click", (ev) => {
    if (ev.target.tagName === "LABEL") { controlsContainer.classList.toggle("controls__container--hidden"); }
});

// Modals popup

function popUpShow(itemId) {
    document.querySelector(".overlay").classList.remove("overlay--hidden");
    document.querySelector(".modal-container").classList.remove("modal-container--hidden");
    document.getElementById(itemId).classList.remove("hidden");
}

function popUpHide() {
    document.querySelector(".overlay").classList.add("overlay--hidden");
    document.querySelector(".modal-container").classList.add("modal-container--hidden");
    const modals = document.querySelectorAll(".modal");
    modals.forEach(modal => modal.classList.add("hidden"));
}

const mainContainer = document.querySelector(".main");
mainContainer.addEventListener("click", ({ target }) => {
    if (!target) return;

    const item = target.closest(".item");
    if (!item) return;

    if (item.classList.contains("lightBulb")) popUpShow("home-lights");
    if (item.classList.contains("thermometer")) popUpShow("home-temperature");
    if (item.classList.contains("floors")) popUpShow("home-floor");
});

// const modal = document.querySelector('.modal-container')


// Hamburger menu

const toggleMainMenuBtn = document.querySelector(".header-menu__icon");
toggleMainMenuBtn.addEventListener("click", () => {
    document.querySelector(".header-menu__items").classList.toggle("header-menu__items--hidden");
});

// Forward button disable

function shouldEnableForward(parentSelector) {
    const forward = document.querySelector(`${parentSelector} .paginator-button--forward`);
    const container = document.querySelector(`${parentSelector} > div:nth-of-type(2)`);
    forward.disabled = container.offsetWidth >= container.scrollWidth;
}

shouldEnableForward(".main-section:nth-child(2)");
shouldEnableForward(".main-section--devices");

// Pagination

function turnPage(direction, container) {
    const { offsetWidth, scrollLeft } = container;
    const scrollAmount = direction === "forward" ? scrollLeft + offsetWidth : scrollLeft - offsetWidth;
    container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
    });
}

const paginatorContainerMain = document.querySelector(".main");
paginatorContainerMain.addEventListener("click", ({ target }) => {
    if (!target) return;

    const paginatorSection = target.closest(".main-section");
    const itemToMove = paginatorSection.classList.contains("main-section--devices")
        ? document.querySelector(".list--devices")
        : document.querySelector(".list");
    const paginatorButton = target.closest(".paginator-button");

    if (!paginatorButton) return;

    if (paginatorButton.classList.contains("paginator-button--forward")) {
        const backButton = paginatorButton.parentNode.querySelector(".paginator-button:not(.paginator-button--forward)");
        backButton.disabled = false;

        turnPage("forward", itemToMove);
        const { offsetWidth, scrollLeft, scrollWidth } = itemToMove;
        paginatorButton.disabled = scrollLeft + offsetWidth >= scrollWidth - offsetWidth;
    } else {
        const forwardButton = paginatorButton.parentNode.querySelector(".paginator-button--forward");
        forwardButton.disabled = false;

        turnPage("back", itemToMove);
        const { scrollLeft, offsetWidth } = itemToMove;
        paginatorButton.disabled = scrollLeft - offsetWidth <= 0;
    }
});

// Temperature range slider

function getOutputValue(temperatureValue) {
    const outputValue = (temperatureValue > 0)
        ? `+${temperatureValue}`
        : temperatureValue;
    document.getElementById("temperature--output").textContent = outputValue;
}

// Modal settings menu

const modalContainer = document.querySelector(".modal-container");
modalContainer.addEventListener("click", ({ target }) => {
    if (!target) return;
    if (target.closest(".modal__button")) {
        popUpHide();
        return;
    }

    const modalMain = target.closest(".modal");
    const menuButton = target.closest(".controls__input");
    const lightsSlider = document.getElementById("range-lights");
    const temperatureSlider = document.getElementById("range-temperature");

    if (modalMain.id === "home-lights") {
        lightsSlider.value = menuButton.value;
    } else {
        temperatureSlider.value = menuButton.value;
        getOutputValue(temperatureSlider.value);
    }
});

const debounce = (callback, time = 250, interval) => (...args) => clearTimeout(interval, interval = setTimeout(() => callback(...args), time));

// arrow box
const scheduledList = document.querySelector(".dashboard__list");

scheduledList.addEventListener("scroll", debounce(() => {
    if (scheduledList.scrollTop > 0) scheduledList.classList.remove("arrow-box");
    if (scheduledList.scrollTop <= 0) scheduledList.classList.add("arrow-box");
}, 10));
