const BASE_URL = "https://jsonplaceholder.typicode.com/photos"

document.addEventListener("DOMContentLoaded", async (event) => {

    try {
        const imageList = await getImages();
        createSlide(imageList);
        console.log("imageList : ", imageList);
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

    for (let i = 0; i < imageList.length; i++) {
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