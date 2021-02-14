document.addEventListener("DOMContentLoaded", () => {
    const next = document.querySelector('.next');
    const prev = document.querySelector('.prev');
    const titleBlockWrapper = document.querySelector('.main_block_wrapper')
    const slideItemArray = document.querySelectorAll('.main_title_block');
    const sliderNav = document.querySelector('.slider_nav');
    const mobMenu = document.querySelector('.mobile_menu');
    const menu = document.querySelector('.header_nav nav ul');
    const mainOptions = document.querySelector('.main_options');
    const data = menu.querySelectorAll('li')
    const headerNav = document.querySelector('.header_nav nav')
    const result = document.querySelector('.search_result')
    const search = document.querySelector('.search');
    const cart = document.querySelector('.cart');
    const btnGroup = document.querySelector('.btn_group')
    
    const slideManage = {
        currentSlide: 0,
        screenWidth: '',
    }
    const slider = () => {
        const initWidth = () => {
            slideManage.screenWidth = window.screen.width;
            window.addEventListener('resize',() => {
                slideManage.screenWidth = window.screen.width;
                menu.classList.remove('show_mobile_menu')
                result.classList.remove('search_result_show')
                search.classList.remove('search_show')
                cart.classList.remove('cart_hide')
                btnGroup.style.top = '0'
                headerNav.style.gridTemplateColumns = '8fr 2fr 2fr'
                hideElements()
                if (slideManage.screenWidth >= 1280) {
                    hideElements(false)
                    headerNav.style.gridTemplateColumns = '8fr 1fr 1fr'
                    mobMenu.style.display = 'none'
                    menu.classList.remove('show_mobile_menu')
                    data.forEach((elem) => {
                        elem.style.top = '0px'
                    })
                } else {
                    mobMenu.style.display = 'flex'
                }
            })
        }
        initWidth()
        console.log(slideManage)
        const hideSlideElem = (id = 0) => {
            slideItemArray.forEach((elem) => {
                elem.classList.remove('show')
                elem.style.display = 'none'
                slideItemArray[id].style.display = 'flex'
                setTimeout(() => {
                    slideItemArray[id].classList.add('show')
                },50);
                if (slideManage.screenWidth <= 1080) {
                    slideItemArray[id].style.left = slideItemArray[id].offsetWidth + 'px'
                    setTimeout(() => {
                        slideItemArray[id].style.left = '0'
                    },50);
                }
                
    
            })
        }
        const showDots = (id = 0) => {
            const dots = document.querySelectorAll('.slider_nav .dot')
            dots.forEach((elem) => {
                elem.style.background = 'rgba(196,22,28,0)';
                dots[id].style.background = 'rgba(196,22,28,1)';
            })
        };
        const initSlideDots = () => {
            slideItemArray.forEach((elem) => {
                prev.insertAdjacentHTML('afterend', '<li><i class="far fa-circle dot"></i></li>');
            })
            showDots()
        }
        initSlideDots()
        
        sliderNav.addEventListener('click', (e) => {
            const target = e.target
            const dots = document.querySelectorAll('.slider_nav .dot')
            dots.forEach((elem,index) => {
                if(elem === target) {
                    slideManage.currentSlide = index;
                    showDots(slideManage.currentSlide)
                    hideSlideElem(slideManage.currentSlide)
                }
            })
        })
    
        hideSlideElem(slideManage.currentSlide)
        next.addEventListener('click',() => {
            if(slideManage.currentSlide >= slideItemArray.length -1) {
                slideManage.currentSlide = 0;
                hideSlideElem(slideManage.currentSlide)
                showDots(slideManage.currentSlide)
            } else {
                slideManage.currentSlide++;
                hideSlideElem(slideManage.currentSlide)
                showDots(slideManage.currentSlide)
            }
        })
        prev.addEventListener('click',() => {
            if(slideManage.currentSlide <= 0) {
                slideManage.currentSlide = slideItemArray.length -1;
                hideSlideElem(slideManage.currentSlide)
                showDots(slideManage.currentSlide)
            } else {
                slideManage.currentSlide--;
                hideSlideElem(slideManage.currentSlide)
                showDots(slideManage.currentSlide)
            }
        })
    }
    slider();

    const hideElements = (hide) => {
        if(hide) {
            sliderNav.style.display = 'none'
            titleBlockWrapper.style.display = 'none'
            mainOptions.style.display = 'none'
        } else {
            sliderNav.style.display = 'flex'
            titleBlockWrapper.style.display = 'block'
            mainOptions.style.display = 'flex'
        }
    }
    const mobileMenu = () => {
        mobMenu.addEventListener('click',()=> {
            let styleTop = 0;
            menu.classList.toggle('show_mobile_menu');
            if (menu.classList.contains('show_mobile_menu')) {
                btnGroup.style.top = '500px'
                hideElements(true)
                for (let i = 0; i < data.length; i++) {
                    data[i].classList.add('show_li')
                    setTimeout(() => {
                        data[i].style.top = styleTop + 'px';
                        styleTop = styleTop + 50
                    }, 100);
                  }
            } else {
                hideElements(false)
                btnGroup.style.top = '0'
                data.forEach((elem)=> {
                    elem.style.top = '0px'
                    elem.classList.remove('show_li')
                })
            }
            
        })
    }
    mobileMenu()


    const searchInit = () => {
        search.addEventListener('click',(e) => {
            const target = e.target
            if(target.classList.contains('fa-search')) {
                cart.classList.toggle('cart_hide')
                search.classList.toggle('search_show')
                result.classList.toggle('search_result_show')
                 if (cart.classList.contains('cart_hide')) {
                    headerNav.style.gridTemplateColumns = '8fr 2fr'
                    if (slideManage.screenWidth <= 1280) {
                        headerNav.style.gridTemplateColumns = '8fr 4fr'
                    }
                    if (slideManage.screenWidth <= 768) {
                        mobMenu.style.display = 'none'
                        headerNav.style.gridTemplateColumns = '1fr'
                    } 
                 } else {
                    headerNav.style.gridTemplateColumns = '8fr 1fr 1fr'
                    if (slideManage.screenWidth <= 1280) {
                        
                        headerNav.style.gridTemplateColumns = '8fr 2fr 2fr'
                    }
                    if (slideManage.screenWidth <= 768) {
                        mobMenu.style.display = 'flex'
                        headerNav.style.gridTemplateColumns = '8fr 2fr 2fr'
                    }
                    

            }
            }
            
        })
    }

    searchInit()




    const brands = () => {
        const next = document.querySelector('.brands_nav .next')
        const prev = document.querySelector('.brands_nav .prev')
        const brandsContainer = document.querySelector('.brands_items_container');
        const items = brandsContainer.children
        const dataSlide = {
            currentWidth: 0,
            currentSlide: 0
        }
        window.addEventListener('resize',() => {
            dataSlide.currentWidth = 0
            dataSlide.currentSlide = 0
            initImg(0)
            showDots(dataSlide.currentSlide)
        })

        const initImg = (toPx) => {
            ([...items]).forEach((elem) => {
                elem.style.right = toPx + 'px'
            })
        }
        next.addEventListener('click',()=> {
            if(dataSlide.currentWidth === (items.length-1)*brandsContainer.offsetWidth) {
                return
            } else {
                dataSlide.currentSlide++
                dataSlide.currentWidth = dataSlide.currentWidth + brandsContainer.offsetWidth
                initImg(dataSlide.currentWidth)
                showDots(dataSlide.currentSlide)
                
            }
        })
        prev.addEventListener('click',() => {
            if(dataSlide.currentWidth > 0) {
                dataSlide.currentWidth = dataSlide.currentWidth - brandsContainer.offsetWidth
                initImg(dataSlide.currentWidth)
                dataSlide.currentSlide--
                showDots(dataSlide.currentSlide)
            } else {
                return
            }
            
        })
        const initSlideDots = () => {
            ([...items]).forEach((elem) => {
                prev.insertAdjacentHTML('afterend', '<li><i class="far fa-circle dot"></i></li>')
            })
        }
        initSlideDots()
        const showDots = (id = 0) => {
            const dots = document.querySelectorAll('.brands_nav .dot')
            dots.forEach((elem) => {
                elem.style.background = 'rgba(196,22,28,0)';
                dots[id].style.background = 'rgba(196,22,28,1)';
            })
        };
        showDots()

    }
    brands();



    const formPopup = () => {
        const btn = document.querySelector('.main_form .button');
        const form = document.querySelector('.main_form');
        const popup = document.querySelector('.form_popup_wrapper');
        const close = popup.querySelector('.fas')
        form.addEventListener('click', (e) => {
            const target = e.target
            if(popup.classList.contains('form_popup_active')) {
                const hide = function(){
                    if(target === popup) {
                        console.log(target)
                        popup.classList.remove('form_popup_active')
                    }
                }
                hide()
            }
            if(target === btn) {
                e.preventDefault();
                popup.classList.add('form_popup_active')
                // setTimeout(()=> {
                //     popup.classList.remove('form_popup_active')             
                // },2000)
            }
            if (target === close) {
                popup.classList.remove('form_popup_active')
            }
            
        })
    }
    formPopup()






});