'use strict'

const imgs = document.querySelectorAll('.gallery-image')
const overlayContainer = document.querySelector('.overlay-container')
const overlayTitle = document.querySelector('.overlay-title')
const overlayImage = document.querySelector('.overlay-image')

imgs.forEach(img => {
    img.addEventListener('click', e => {
        // console.log(e.target)

        overlayTitle.innerText = `ImageID: ${e.target.id}`
        overlayImage.src = e.target.src

        overlayContainer.classList.remove('hide-overlay')
        overlayContainer.classList.add('show-overlay')
    })
})

const hideOverlay = function () {
    overlayContainer.classList.add('hide-overlay')
    overlayContainer.classList.remove('show-overlay')
}

overlayImage.addEventListener('click', hideOverlay)
overlayContainer.addEventListener('click', hideOverlay)
