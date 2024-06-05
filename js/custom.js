
const handleScroll = () => {
    const scrollPos = window.scrollY;
    const slider = document.querySelector(".slider");
    const initialTransform = `translate3d(-50%, -50%, 0) rotateX(0deg) rotateY(-25deg) rotateZ(-120deg)`;
    const zOffset = scrollPos * 0.5;
    slider.style.transform = `${initialTransform} translateY(${zOffset}px)`;
}

const handleMouseOver = (e) => {
    e.currentTarget.style.left = "15%";
}

const handleMouseOut = (e) => {
    e.currentTarget.style.left = "0%";
}



window.addEventListener("scroll", handleScroll);
// return () => window.removeEventListener("scroll", handleScroll);


// element = document.querySelector(".card");
// console.log("element", element);
// element.addEventListener("mouseover",function(){
//     this.style.left = "15%";
// });
// element.addEventListener("mouseout",function(){
//     this.style.left = "0%";
// });