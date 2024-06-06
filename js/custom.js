let sliderWidth = document.querySelector(".slider");
document.body.style.height = `${sliderWidth.scrollHeight}px`;
console.log("body", document.body.style.height);
console.log("sliderWidth",sliderWidth.scrollHeight);

const handleScroll = () => {
    const scrollPos = window.scrollY;
    const slider = document.querySelector(".slider");
    const initialTransform = `translate3d(-50%, -50%, 0) rotateX(0deg) rotateY(-25deg) rotateZ(-120deg)`;
    const zOffset = scrollPos * 0.5;
    slider.style.transform = `${initialTransform} translateY(${zOffset}px)`;
}
window.addEventListener("scroll", handleScroll);
let element = document.getElementsByClassName("card");
for (let i = 0; i < element.length; i++) {
    element[i].addEventListener("mouseover",  function () {
        this.style.left = "15%";
    });

    element[i].addEventListener("mouseout",function() {
        this.style.left = "0%";
    });
}
