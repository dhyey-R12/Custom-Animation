document.addEventListener("DOMContentLoaded", (event) => {
    // gsap.registerPlugin(ScrollTrigger)
    // gsap code here!
    console.log("test");

    createSlide(80);

    let sliderWidth = document.getElementById('slider');
    document.body.style.height = `${sliderWidth.scrollHeight}px`;
});

function createSlide(sliderNumber) {
    const slider = document.getElementById('slider');

    for (let i = 0; i < sliderNumber; i++) {
        const newSlide = document.createElement('div');
        const newSlideImage = document.createElement('img');
        newSlideImage.setAttribute("src", `images/image_${randomIntFromInterval(1, 4)}.jpg`);
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


const handleScroll = () => {
    const scrollPos = window.scrollY;
    const slider = document.querySelector(".slider");
    const initialTransform = `translate3d(-50%, -50%, 0) rotateX(0deg) rotateY(-25deg) rotateZ(-120deg)`;
    const zOffset = scrollPos * 0.5;
    slider.style.transform = `${initialTransform} translateY(${zOffset}px)`;
}

window.addEventListener("scroll", handleScroll);