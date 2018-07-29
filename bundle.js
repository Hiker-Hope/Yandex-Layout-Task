function popUpShow(itemId) {
    document.querySelector('.overlay').classList.replace('overlay--hidden', 'popup');
    document.querySelector('.modal-container').classList.replace('modal-container--hidden', 'popup');
    document.getElementById(itemId).classList.remove('hidden')
}

function popUpHide() {
    document.querySelector('.modal-container').classList.replace('popup', 'modal-container--hidden');
    document.querySelector('.overlay').classList.replace('popup','overlay--hidden');
    let tileClose = document.querySelectorAll('.modal__main')
        for (i=0; i<tileClose.length; i++) {
            tileClose[i].classList.add('hidden')
        } 
}

function doSomething() {
    const lightTiles = document.querySelectorAll('.lightBulb')
        for (i=0; i< lightTiles.length; i++) { 
            let lightSwitch = lightTiles[i];
            lightSwitch.addEventListener('click', function() {
                popUpShow('home-lights')
        })
    }

    const temperatureTiles = document.querySelectorAll('.thermometer')
        for (j=0; j< temperatureTiles.length; j++) { 
            let temperatureSwitch = temperatureTiles[j];
            temperatureSwitch.addEventListener('click', function() {
                popUpShow('home-temperature')
        })
    }

    const floorTiles = document.querySelectorAll('.floors')
        for (k=0; k< floorTiles.length; k++) { 
            let floorSwitch = floorTiles[k];
            floorSwitch.addEventListener('click', function() {
                popUpShow('home-floor')
        })
    }

    const closeButton = document.querySelector('.modal__button--close')
    closeButton.addEventListener('click', function(){
        popUpHide()
    })
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", doSomething);
} else {  // `DOMContentLoaded` already fired
    doSomething();
}