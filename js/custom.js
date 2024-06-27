const BASE_URL = "https://jsonplaceholder.typicode.com/photos"

document.addEventListener("DOMContentLoaded", async (event) => {
    try {
        isLoading(true);
        const imageList = await getImages();
        isLoading(false);
        createSlide(imageList);
        // let sliderWidth = document.getElementById('slider');
        // document.body.style.height = `${sliderWidth.scrollHeight}px`;
    } catch (error) {
        isLoading(false);
        if (error && error.message) {
            const slider = document.getElementById('slider');
            const responseEl = document.createElement('div');
            responseEl.setAttribute("class", "card error_card");
            slider.appendChild(responseEl);
            responseEl.innerHTML = `<p>${error.message}</p>`;
        }
    }
});

function getImages() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", BASE_URL, true);
        xhr.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject({ message: "Error while getting images!" });
                }
            }
        }
        xhr.send();
    })
}

function createSlide(imageList) {
    const slider = document.getElementById('slider');

    for (let i = 0; i < 11; i++) {
        const newSlide = document.createElement('div');
        const newSlideImage = document.createElement('img');
        newSlideImage.setAttribute("src", `${imageList[i].url}`);
        newSlide.setAttribute("class", "card");
        newSlide.appendChild(newSlideImage);
        newSlide.addEventListener("mouseover", function () {
            this.style.left = "15%";
        });
        newSlide.addEventListener("mouseout", function () {
            this.style.left = "0%";
        });
        slider.appendChild(newSlide);
    }

    // horizontalScroll();
    checkWidth();
}


const handleScroll = () => {
    const scrollPos = window.scrollY;
    const slider = document.querySelector(".slider");
    const initialTransform = ``;
    // const initialTransform = `translate3d(-50%, -50%, 0) rotateX(0deg) rotateY(-25deg) rotateZ(-120deg)`;
    const zOffset = scrollPos * 0.5;
    slider.style.transform = `${initialTransform} translateY(${zOffset}px)`;
}

// window.addEventListener("scroll", handleScroll);



// loader JS
gsap.to(".content-loader-text h1", {
    opacity: 1,
    delay: 0.5,
    y: 0,
    duration: 1.25,
    stagger: { each: 0.05, from: "random" },
    ease: "expo.out"
});
const tll = gsap.timeline({
    paused: true
});
tll.to("#percent, #bar", {
    duration: 0.9,
    opacity: 0,
    zIndex: -1
});

let width = 0;
let bar = document.getElementById("bar");
let id;
let isLoadingFinished = false;

function isLoading(showLoading) {
    if (showLoading) {
        id = setInterval(frame, 100);
    } else {
        console.log("Here loading need to stop");
        isLoadingFinished = true;
        clearInterval(id);
        id = setInterval(frame, 1);
    }
}
function frame() {
    if (width >= 100) {
        console.log("frame called");
        clearInterval(id);
        tll.play();
        gsap.to(".content-loader-text h1", {
            opacity: 0,
            delay: 0.4,
            duration: 1.25,
            stagger: { each: 0.05, from: "random" },
            ease: "expo.out"
        });
        gsap.to(".loader", {
            opacity: 0,
            delay: 1.0,
            duration: 1.25,
            ease: "power1.inOut"
        });
        gsap.to(".container-loader", {
            delay: 2.25,
            duration: 0.3,
            display: "none",
            ease: "power1.inOut"
        });
    } else {
        width++;
        if (width >= 90 && !isLoadingFinished) {
            console.log("Here we need to pause loader");
            tll.pause();
            clearInterval(id);
            document.getElementById("percent").innerHTML = "It will take a longer time..!!";
        } else {
            gsap.to(bar, {
                width: width + "%",
                duration: 2.5,
                ease: "expo.out"
            });
            document.getElementById("percent").innerHTML = "( " + width + "%" + " )";
        }
    }
}


// horizontal scroll JS
gsap.registerPlugin(ScrollTrigger);

// let horizontalSection = document.querySelector('.slider_section .slider');

// console.log(horizontalSection.scrollWidth);

// gsap.to(horizontalSection, {
//   x: () => horizontalSection.scrollWidth * -1,
//   xPercent: 100,
//   scrollTrigger: {
//     trigger: horizontalSection,
//     start: 'top top',
//     end: 'bottom bottom',
//     pin: '.slider_section ',
//     scrub: true,
//     invalidateOnRefresh: true
//   }
// });


// function horizontalScroll() {

//     let sections = gsap.utils.toArray(".card");

//     gsap.to(sections, {
//         xPercent: -100 * (sections.length - 1),
//         ease: "none",
//         scrollTrigger: {
//             trigger: ".slider_section .slider",
//             pin: true,
//             scrub: 1,
//             // snap: 1 / (sections.length - 1),
//             end: () => "+=" + document.querySelector(".slider_section .slider").scrollWidth,
//         }
//     });
// }

// let countS = 0;
// jQuery(".slider_section .slider > *").each(function () {
//     countS += jQuery(this).outerWidth();
//     console.log(jQuery(this).outerWidth());
// })
// console.log(countS);
let countS = 0;
jQuery(".slider_section .slider > *").each(function () {
    countS += jQuery(this).outerWidth();
    console.log(jQuery(this).outerWidth());
})
console.log(countS);

function checkWidth() {
    var windowSize = $(window).width();

    if (windowSize > 768) {
        const process = document.querySelector('.slider_section .slider')
        if ((typeof (process) != 'undefined' && process != null)) {
            let sections = gsap.utils.toArray('.slider_section .slider > *');
            gsap.to(process, 3, {
                x: () => (process.scrollWidth - window.outerWidth + 100) * -1,
                // xPercent: -100,
                // ease: "",
                ease: "power1.ease",
                duration: 0.5,
                scrollTrigger: {
                    markers: false,
                    trigger: process,
                    pin: '.slider_section',
                    start: "top 8%",
                    // end: '2000px',
                    end: sections,
                    // end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });
        }
        console.log("window.innerWidth", window.innerWidth);
        console.log("process.scrollWidth", process.scrollWidth);
        console.log("window.outerWidth - process.scrollWidth", window.outerWidth - process.scrollWidth);
    }
}