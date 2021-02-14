document.addEventListener('DOMContentLoaded',()=>{
    const mobMenu = document.querySelector('.mobile_menu i');
    const menu = document.querySelector('.header_nav nav ul');
    const searchIcon = document.querySelector('.search_img');
    const search = document.querySelector('.search');
    const cart = document.querySelector('.cart');
    const result = document.querySelector('.search_result')
    const btnFilter = document.querySelector('.mobile_filter')
    const filter = document.querySelector('.filter')
    const btnBurger = document.querySelector('.mobile_data .hamburger')
    const menuBurger = document.querySelector('.cat_menu')
    
    const mobileFilterMenu = () => {

        btnFilter.addEventListener('click',()=> {
            menuBurger.classList.remove('show_menu_burger')
            menu.classList.remove('show_mobile_menu');
            search.classList.remove('search_show')
            result.classList.remove('search_result_show')
            search.style.color = '#ffffff'
            cart.style.opacity = '1'
            filter.classList.toggle('show_filter')
        })
        btnBurger.addEventListener('click',()=>{
            filter.classList.remove('show_filter')
            menu.classList.remove('show_mobile_menu');
            search.classList.remove('search_show')
            result.classList.remove('search_result_show')
            search.style.color = '#ffffff'
            cart.style.opacity = '1'
            menuBurger.classList.toggle('show_menu_burger')
        })

    }
    mobileFilterMenu()



    const mobileMenu = () => {
        mobMenu.addEventListener('click',()=> {
            menuBurger.classList.remove('show_menu_burger')
            filter.classList.remove('show_filter')
            search.classList.remove('search_show')
            result.classList.remove('search_result_show')
            search.style.color = '#ffffff'
            cart.style.opacity = '1'
            menu.classList.toggle('show_mobile_menu');

        })
    }
    mobileMenu()


    const searchInit = () => {
        searchIcon.addEventListener('click',(e) => {
            search.classList.toggle('search_show')
            result.classList.toggle('search_result_show')
            if(search.classList.contains('search_show')) {
                search.style.color = '#000000'
                cart.style.opacity = '0'
            } else {
                search.style.color = '#ffffff'
                cart.style.opacity = '1'
            }
        })
    }

    searchInit()

    

})