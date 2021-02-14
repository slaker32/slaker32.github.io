document.addEventListener('DOMContentLoaded',() => {
    const tabsContent = document.querySelectorAll('.tabs_content_item');
    const tabsNav = document.querySelector('.block_tabs')
    const tabsNavItems = document.querySelectorAll('.block_tabs div')

    const hideTabsContent = (id = 0) => {
        tabsContent.forEach((elem) => {
            elem.classList.add('tabs_hide')
        })
        tabsContent[id].classList.remove('tabs_hide')
    }
    hideTabsContent()
    const manageTabs = () => {
        tabsNav.addEventListener('click',(e)=> {
            const target = e.target;
            tabsNavItems.forEach((elem,index) => {
                elem.classList.remove('tab_active')
                if(target == elem) {
                    elem.classList.add('tab_active')
                    hideTabsContent(index)
                }
            })
        })
    }
    manageTabs()


    class ProductSlider {
        constructor(wrapper) {
            this.wrapperSlider = document.querySelector(wrapper)
            this.state = {
                currentImage : 0,
                nav: this.wrapperSlider.querySelector('.slider_nav'),
                dataImg: this.wrapperSlider.querySelectorAll('.main_img img'),
                dotsNavWrapper: this.wrapperSlider.querySelector('.dots_img'),
                dotsNav: this.wrapperSlider.querySelectorAll('.dot_img div'),
            }
        }
        initImg(id = this.state.currentImage){
            this.state.dataImg.forEach((elem) => {
                elem.classList.add('hide')
                this.state.dataImg[id].classList.remove('hide')
            })
        }
        initDots(id = this.state.currentImage) {
            this.state.dotsNav.forEach((elem) => {
                elem.classList.remove('active')
                this.state.dotsNav[id].classList.add('active')

            })
        }
        dotsClick(){
            this.state.dotsNavWrapper.addEventListener('click',(e)=> {
                const target = e.target
                this.state.dotsNav.forEach((elem,index) => {
                    if (elem === target) {
                        this.state.currentImage = index
                        this.initImg()
                        this.initDots()
                    }
                })
            })
        }
        navClick() {
            this.state.nav.addEventListener('click',(e) => {
                const target = e.target
                if (target.classList.contains('next')|| target == this.state.nav.querySelector('.next i')) {
                    if(this.state.currentImage >= this.state.dotsNav.length-1) {
                        return null
                    } else {
                        this.state.currentImage++
                        this.initImg()
                        this.initDots()
                    }
                }
                if (target.classList.contains('prev')|| target == this.state.nav.querySelector('.prev i')) {
                    if(this.state.currentImage > 0) {
                        this.state.currentImage--
                        this.initImg()
                        this.initDots()
                    } else {
                        return null
                    }
                }
            })
        }
        initSlider(){
            this.initImg()
            this.initDots()
            this.dotsClick()
            this.navClick()
        }
    }
    const productSlider = new ProductSlider('.product_slider')
    productSlider.initSlider()

})