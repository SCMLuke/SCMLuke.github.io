const menu = document.querySelector('#mobile-menu')
const menuItems = document.querySelector('.navbar_menu')
const navigationLogo = document.querySelector('#navbar_logo')

// Mobile menu display
const mobileMenu = () => {
    menu.classList.toggle('is-active')
    menuItems.classList.toggle('active')
}

menu.addEventListener('click',mobileMenu)

// Highlight the menu when scrolling.
const highlightMenu = () => {
    const element = document.querySelector('.highlight')
    const homeMenu = document.querySelector('#home-page')
    const aboutMenu = document.querySelector('#about-page')
    const projectsMenu = document.querySelector('#projects-page')
    const contactMenu = document.querySelector('#contact-page')

    let scrollPos = window.scrollY

    if(window.innerWidth > 960 && scrollPos < 600) {
        homeMenu.classList.add('highlight')
        aboutMenu.classList.remove('highlight')
        return
    } else if (window.innerWidth > 960 && scrollPos < 1400) {
        aboutMenu.classList.add('highlight')
        homeMenu.classList.remove('highlight')
        projectsMenu.classList.remove('highlight')
        return
    } else if (window.innerWidth > 960 && scrollPos < 2200) {
        projectsMenu.classList.add('highlight')
        aboutMenu.classList.remove('highlight')
        contactMenu.classList.remove('highlight')
        return
    } else if (window.innerWidth > 960 && scrollPos < 2600) {
        contactMenu.classList.add('highlight')
        projectsMenu.classList.remove('highlight')
        return
    } 

    if((element && window.innerWidth < 960 && scrollPos < 600) || element) {
        element.classList.remove('highlight')
    }
    
}
window.addEventListener('scroll', highlightMenu);
window.addEventListener('click', highlightMenu);

// Close the mobile menu once an option is clicked.
const hideMobileMenu = () => {
    const menuBars = document.querySelector('.is-active')
    if(window.innerWidth <= 768 && menuBars) {
        menu.classList.toggle('is-active')
        menuItems.classList.remove('active')
    }
}

menuItems.addEventListener('click', hideMobileMenu)
navigationLogo.addEventListener('click', hideMobileMenu)