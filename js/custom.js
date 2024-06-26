const BASE_URL = "https://jsonplaceholder.typicode.com/photos"

document.addEventListener("DOMContentLoaded", async (event) => {
    try {
        isLoading(true);
        const imageList = await getImages();
        isLoading(false);
        createSlide(imageList);
        let sliderWidth = document.getElementById('slider');
        document.body.style.height = `${sliderWidth.scrollHeight}px`;
    } catch (error) {
        console.error("Error while getting image from API : ", error);
    }
});

function getImages() {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();

        xhr.open("GET", BASE_URL, true);
        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                resolve(JSON.parse(this.responseText));
            }
        }
        xhr.send();
    })
}

function createSlide(imageList) {
    const slider = document.getElementById('slider');

    for (let i = 0; i < (imageList.length / 20); i++) {
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

}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function gsapScroll() {
    let horizontalSection = document.querySelector('.slider');

    console.log(horizontalSection.scrollWidth);

    gsap.to('.slider', {
        x: () => horizontalSection.scrollWidth * -1,
        xPercent: 100,
        scrollTrigger: {
            trigger: '.slider',
            start: 'center center',
            end: '+=2000px',
            pin: '.slider_section',
            scrub: true,
            invalidateOnRefresh: true
        }
    });
}


const handleScroll = () => {
    const scrollPos = window.scrollY;
    const slider = document.querySelector(".slider");
    const initialTransform = `translate3d(-50%, -50%, 0) rotateX(0deg) rotateY(-25deg) rotateZ(-120deg)`;
    const zOffset = scrollPos * 0.5;
    slider.style.transform = `${initialTransform} translateY(${zOffset}px)`;
}

window.addEventListener("scroll", handleScroll);




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
