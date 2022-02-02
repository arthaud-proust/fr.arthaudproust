window.mobileAndTabletCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

function fallbackCopyTextToClipboard(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
    var successful = document.execCommand('copy');
    var msg = successful ? 'successful' : 'unsuccessful';
    console.log('Fallback: Copying text command was ' + msg);
    } catch (err) {
    console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
    if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
    }
    navigator.clipboard.writeText(text).then(function() {
    console.log('Async: Copying to clipboard was successful!');
    }, function(err) {
    console.error('Async: Could not copy text: ', err);
    });
}

window.addEventListener('DOMContentLoaded', function() {
    const mainSlideStepper = document.getElementById('mainSlideStepper');
    const mainSlideName = document.getElementById('mainSlideName');
    const links = document.getElementById('links').querySelectorAll('a');
    const sections = Array.from(document.querySelectorAll('#main > div > section'));
    const sectionEl = document.querySelector('.section-swiper');
    var sectionSwiper;
    const pageArrows = {
        left: document.querySelector('.pageArrow.left'),
        right: document.querySelector('.pageArrow.right')
    };


    const mainSwiper = new Swiper('.main-swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,
        speed: window.mobileAndTabletCheck()?150:1500,
        mousewheel: {
            forceToAxis: false,
            eventsTarget: '.main-swiper'
        },
        parallax: true,
        // freeMode: {
        //     enabled: false,
        //     sticky: true,
        //     momentum: true,
        //     momentumRatio: 0.7,
        //     momentumVelocityRatio: 0.8,
        //     minimumVelocity: 0.5
        // },
        // sticky: true,
        // If we need pagination
        pagination: {
            el: '.swiper-pagination',
        },

        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        // hashNavigation: true,
        // centeredSlidesBounds: true,
        grabCursor: true,
        // resistance: false,
        shortSwipes: true,
        resistanceRatio: 1.2,
        longSwipesRatio: 0.1,
        threshold: 10,
        // And if we need scrollbar
        scrollbar: {
            el: '.swiper-scrollbar',
        },
    });

    try {
        sectionSwiper = new Swiper(sectionEl, {
            // Optional parameters
            direction: 'vertical',
            grabCursor: true,
            loop: false,
            freeMode: false,
            // autoHeight: true,
            // resistance: false,
            mousewheel: {
                forceToAxis: true,
                eventsTarget: sectionEl.closest('.swiper-slide')
            },
            resistanceRatio: 0.9,
        });
        sectionSwiper.on("reachBeginning", function(e) {
            if(mainSwiper.slides.length>0 && !mainSwiper.isBeginning) mainSwiper.slidePrev();
        });
        sectionSwiper.on("reachEnd", function(e) {
            if(mainSwiper.slides.length>0 && !mainSwiper.isEnd) mainSwiper.slideNext();
        });
        
        sectionSwiper.on("slideChange", function(e) {
            // if(Object.keys(sectionSwiper.slides[sectionSwiper.activeIndex].dataset).includes('skipNext')) {
            //     sectionSwiper.slideNext();
            // }
            if(Object.keys(sectionSwiper.slides[sectionSwiper.activeIndex].dataset).includes('skipPrev')) {
                sectionSwiper.slidePrev();
            }
            // e.activeIndex
            // try {
            //     const section = e.el.closest('section');
            //     const imageCover = document.getElementById('section-image-cover');
            //     if(!imageCover) return;
            //     const card = e.el.querySelectorAll('.swiper-slide')[e.activeIndex+1];
            //     const img = card.dataset.cover;
            //     if(!img) return;
            //     imageCover.src = img;
            // } catch(e) {}
            try {
                const imageCoverContainer = document.getElementById('section-image-cover-container');

                const imgs = Array.from(imageCoverContainer.children);
                imgs.forEach(img=>img.classList.add('d-none'));

                const newI = window.screen.width>576?e.activeIndex+1:e.activeIndex;

                const card = e.el.querySelectorAll('.swiper-slide')[newI];
                if(!card) throw new Error();
                const imgName = card.dataset.cover;
                if(!imgName) throw new Error();
                const img = imageCoverContainer.querySelector(`#sic-${imgName}`);
                img.classList.remove('d-none');
            } catch(e) {
                try {
                    document.getElementById('section-image-cover-container').querySelector(`#sic-preview`).classList.remove('d-none');
                }catch(e){}
            }
        })
    } catch(e){}


    
    

    const updateMainScroll = function (e) {
        refreshPageArrows();

        // return 
        if(mainSwiper.slides.length > 0) {

            // update le lien actuel
            Array.from(links).forEach(link=>{
                link.classList.toggle('active', link.dataset.to===mainSwiper.slides[mainSwiper.activeIndex].dataset.hash);
            })
            // mainSlideName.innerText = `${mainSwiper.slides[mainSwiper.activeIndex].getAttribute('aria-title')}`;
            // mainSlideStepper.innerText = `${mainSwiper.slides[mainSwiper.activeIndex].getAttribute('aria-label')} -`;
            refreshAnimations(mainSwiper.slides[mainSwiper.activeIndex]);
            if(
                mainSwiper.slides[mainSwiper.activeIndex].contains(sectionSwiper.el)
            ){
                if(sectionSwiper.isBeginning) {
                    // try{sectionSwiper.slideNext();}catch(e){}
                } 
                if(sectionSwiper.isEnd) {
                    try{sectionSwiper.slidePrev();}catch(e){}
                } 
                mainSwiper.mousewheel.disable();
            }else {
                mainSwiper.mousewheel.enable();
            }
        } else {
            Array.from(links).forEach(link=>{
                link.classList.remove('active');
            })
            // mainSlideName.innerText = `${document.querySelector('.swiper-slide[aria-title]').getAttribute('aria-title')}`;
            // mainSlideStepper.innerText = ``;
        }
    };

    updateMainScroll();

    mainSwiper.on("slideChange", updateMainScroll);
    
    refreshPageArrows();

    function slideToHash(to, instant=true) {
        if(to==="") return; 

        mainSwiper.slideTo(sections.indexOf(document.querySelector(`section[data-hash="${to}"]`)), instant?0:800);
    }

    slideToHash(window.location.hash.replace('#',''));

    mainSwiper.on('sliderMove', function () {
        mainSwiper.el.classList.add('grabbing');
        superCursor.setHidden(true);
    });

    mainSwiper.on('touchEnd', function () {
        mainSwiper.el.classList.remove('grabbing');
        superCursor.setHidden(false);
    });

    pageArrows.left.addEventListener('click', function() {
        mainSwiper.slidePrev(1500);
    });
    pageArrows.right.addEventListener('click', function() {
        mainSwiper.slideNext(1500);
    });



    function refreshAnimations(el) {
        setTimeout(()=>{
            el.querySelectorAll('.toAnimate').forEach(function(element) {
                element.classList.add('animate');
            })
        }, mobileAndTabletCheck()?50:500);
    }

    function refreshPageArrows() {
        pageArrows.left.classList.toggle('hidden', mainSwiper.isBeginning);
        pageArrows.right.classList.toggle('hidden', mainSwiper.isEnd || (mainSwiper.isBeginning && mainSwiper.slides.length===0));
    }


    function toggleMenu() {
        const open = document.body.dataset.menuOpen==="true";
        setMenu(!open);
    }

    function setMenu(closed) {
        document.body.dataset.menuOpen = closed;
        document.getElementById('menu-toggle').src= `/assets/${closed?'close':'menu'}.svg`;
    }

    links.forEach(link=>link.addEventListener('click', function() {
        setMenu(false)
        slideToHash(link.dataset.to, false)
    }));




    document.getElementById('menu-toggle').addEventListener('click', toggleMenu)

    document.querySelectorAll('.list-subitem, .lessMore').forEach(el=>{
        el.addEventListener('click', function(e) {
            if(e.target.tagName=="A" || e.target.parentElement.tagName=="A") {
                return;
            }
            const keepClosed = el.dataset.open==="true";
            document.querySelectorAll('.list-subitem, .lessMore').forEach(el=>{
                el.dataset.open = false;
            })

            el.dataset.open = keepClosed?"false":"true";
        })
    })


    document.querySelectorAll('.toCopy').forEach(element => {
        element.addEventListener('click', function() {
            element.dataset.text = this.innerText;
            element.innerText = `${element.dataset.text} (copié!)`;
            copyTextToClipboard(element.dataset.text);
            setTimeout(function() {
                element.innerText = element.dataset.text;
            }, 4000);
        })
    });
});