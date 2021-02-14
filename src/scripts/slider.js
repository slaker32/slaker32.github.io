window.addEventListener('DOMContentLoaded',()=> {
    class SliderElement {
        constructor(nav,sliderImages){
            this.nav = nav;
            this.sliderImages = sliderImages
            this.dotsArray = nav.querySelectorAll('.line')
        }
        showImg(id){
            this.sliderImages.forEach((elem)=>{
                elem.classList.add('elem_img_hide')
                this.sliderImages[id].classList.remove('elem_img_hide')
            })
        }
        showCurrentDot(id=0){
            this.dotsArray.forEach((elem) => {
                elem.classList.remove('line_active')
                this.dotsArray[id].classList.add('line_active')
            })
        }
        manageSlide(){
            this.nav.addEventListener('click',(e)=>{
                const target = e.target;
                if(target.classList.contains('line')) {
                    this.dotsArray.forEach((elem,index)=>{
                        if(target === elem) {
                            this.showCurrentDot(index)
                            this.showImg(index)
                        }
                    })
                }
                
            })
        }
    }
    class Slider {
        constructor(sliderWrapper,slides,sliderWrapperInner,nav,showSlides){
            this.sliderWrapper = document.querySelector(sliderWrapper);
            this.slides = document.querySelectorAll(slides);
            this.sliderWrapperInner = document.querySelector(sliderWrapperInner)
            this.nav = document.querySelector(nav);
            this.showSlides = showSlides
            this.state = {
                elemWidth: 0,
                position: 0,
                showSlides: 3,
            }
        }
        hideImg(id=0){
            this.slides.forEach((elem)=>{
                const dataImg = elem.querySelectorAll('img')
                dataImg.forEach((elem)=>{
                    elem.classList.add('elem_img_hide')
                    dataImg[id].classList.remove('elem_img_hide')
                })
            })
        }

        initSlide(){
            if(this.sliderWrapper && this.slides) {
                this.slides.forEach((elem)=>{
                    const sliderElementInit = new SliderElement(elem.querySelector('.elem_slide_dots'),elem.querySelectorAll('.elem_img img'))
                    sliderElementInit.manageSlide()
                    sliderElementInit.showCurrentDot()
                })
            }
        }

        init(bool){
            if(bool === true) {
                this.hideImg()
                this.initSlide()
            }
        }
        listenResize(){
            const elemWidth = this.sliderWrapper.offsetWidth / this.state.showSlides
            this.state.elemWidth = Math.ceil(elemWidth)
            this.slides.forEach((elem) => {
                elem.style.width = `${this.state.elemWidth}px`
            })
        }
        nextCarouselItem(){
            if(this.sliderWrapper != null) {
                if(this.showSlides) {
                    this.state.showSlides = this.showSlides
                    this.listenResize()
                    window.addEventListener('resize',() => {
                        this.listenResize()
                        this.state.position = 0
                        this.sliderWrapperInner.style.left = `${this.state.position}px`
                    })
                } else {
                if (this.sliderWrapper.offsetWidth < 768) {
                        this.state.showSlides = 2
                    } else {
                        this.state.showSlides = 3
                    }
                    this.listenResize()
                    window.addEventListener('resize',() => {
                        if (this.sliderWrapper.offsetWidth < 768) {
                            this.state.showSlides = 2
                        } else {
                            this.state.showSlides = 3
                        }
                        this.listenResize()
                        this.state.position = 0
                        this.sliderWrapperInner.style.left = `${this.state.position}px`
                    })
                }

                this.nav.addEventListener('click',(e)=> {
                    const target = e.target
                    const sliderWrapper = this.sliderWrapperInner
                    console.log(this.state)
                    if (target.classList.contains('next')|| target == this.nav.querySelector('.next i')) {
                        if(this.state.position > -((this.slides.length * this.state.elemWidth) - (this.state.showSlides * this.state.elemWidth))) {
                            this.state.position = this.state.position - this.state.elemWidth
                            sliderWrapper.style.left = `${this.state.position}px`
                            
                        } else {
                            return null
                        }
                        
                        
                    }
                    if(target.classList.contains('prev')||target == this.nav.querySelector('.prev i')){
                        if(this.state.position < 0) {
                            this.state.position = this.state.position + this.state.elemWidth
                            sliderWrapper.style.left = `${this.state.position}px`
                            console.log(this.state.position)
                            
                        } else {
                            return null
                        }
                    }
                    
                    
                })



            }




            
        }
    }


    const moduleProductSlider = new Slider('.modules_wrapper','.modules_elem');
    moduleProductSlider.init(true);

    const catalogSlider = new Slider('.content_items','.content_items_elem');
    catalogSlider.init(true);

    const indexItemsSlider = new Slider('.new_items_block','.new_items_elem');
    indexItemsSlider.init(true);

    const resentItemsSlider = new Slider('.recent_reviews_wrapper','.recent_reviews_elem','.reviews_wrapper_inner','.recent_reviews .slider_nav');
    resentItemsSlider.init(true);
    resentItemsSlider.nextCarouselItem()

    const reviewsSlider = new Slider('.reviews_items','.review_item','.reviews_items_wrapper','.reviews_wrapper .slider_nav',1)
    reviewsSlider.nextCarouselItem()

})