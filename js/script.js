// ==============================
// GSAP
// ==============================

gsap.registerPlugin(ScrollTrigger);

// ==============================
// ELEMENTE
// ==============================

const vinyl = document.getElementById("vinyl");
const button = document.getElementById("startButton");
const music = document.getElementById("backgroundMusic");
const musicToggle = document.getElementById("musicToggle");
console.log(musicToggle);
const vinylSound = document.getElementById("vinylSound");

let isPlaying = false;
let spinAnimation = null;

// ==============================
// START EXPERIENCE
// ==============================


function startExperience() {
    // Sunet ac pe vinil

vinylSound.volume = 0.20;

vinylSound.currentTime = 0;
vinylSound.play();

setTimeout(() => {

    music.volume = 0;

    music.play();

    gsap.to(music, {
        volume: 0.15,
        duration: 3
    });

}, 600);


    
    gsap.to("#tonearm",{

    rotation:18,
    transformOrigin:"0% 50%",

    duration:1.2,
    ease:"power2.out"

});
gsap.to("#tonearm",{

    rotation:22,

    duration:.5,

    delay:1,

    ease:"power1.out"

});

    if (isPlaying) return;
    isPlaying = true;

    // Fade out buton
    gsap.to(button, {
        opacity: 0,
        y: 20,
        duration: 0.5,
        pointerEvents: "none"
    });

    // Zoom cinematic
gsap.to(".album",{

    y:-4,

    rotate:0.15,

    duration:5,

    repeat:-1,

    yoyo:true,

    ease:"sine.inOut"

});


    // Discul iese din copertă
  gsap.to(vinyl, {

    y: 145,
    duration: 1.4,
    ease: "power3.out"

});

setTimeout(() => {

    spinAnimation = gsap.to(vinyl, {

        rotation: "+=360",
        duration: 2,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%"

    });

}, 1400);
if (breathingAnimation) {
    breathingAnimation.kill();
}
    gsap.to(".album-cover", {

    y: -120,
    duration: 1.4,
    ease: "power3.out"

});

    // Scroll către prima secțiune
    const firstTrack = document.querySelector(".track");

    if (firstTrack) {

setTimeout(() => {

    gsap.to(window, {
        duration: 2,
        scrollTo: {
            y: firstTrack,
            offsetY: 70
        },
        ease: "power2.inOut"
    });

}, 1700);

    }

}

button.addEventListener("click", startExperience);

// ==============================
// TRACKS
// ==============================

gsap.utils.toArray(".track").forEach(track => {

    gsap.fromTo(track,

        {
            opacity: 0,
            y: 80
        },

        {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: "power3.out",

            scrollTrigger: {
                trigger: track,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }

        }

    );

});
gsap.utils.toArray(".track").forEach(track => {

    const number = track.querySelector(".track-number");
    const title = track.querySelector("h2");
    const text = track.querySelector("p");

    const tl = gsap.timeline({

        scrollTrigger:{
            trigger:track,
            start:"top 80%"
        }

    });

    tl.from(track,{
        opacity:0,
        y:60,
        duration:.5
    })

    .from(number,{
        opacity:0,
        x:-25,
        duration:.4
    })

    .from(title,{
        opacity:0,
        y:25,
        duration:.5
    },"-=0.2")

    .from(text,{
        opacity:0,
        y:20,
        duration:.6
    },"-=0.15");

});

// ==============================
// BREATHING EFFECT
// ==============================

let breathingAnimation = null;


const isMobile = window.innerWidth <= 768;

const tl = gsap.timeline();

tl.to(".album-cover",{

    y:-110,

    duration:1.3,

    ease:"power3.inOut"

})

.to(vinyl,{

    y:100,

    duration:1.3,

    ease:"power3.inOut"

},"<")

.call(()=>{

    spinAnimation = gsap.to(vinyl,{

        rotation:"+=360",

        duration:2,

        repeat:-1,

        ease:"none",

        transformOrigin:"50% 50%"

    });

});
// ==============================
// LOADER
// ==============================

window.addEventListener("load", () => {

    gsap.to(".loader-vinyl",{

        rotation:360,

        repeat:-1,

        ease:"none",

        duration:5.8,

        transformOrigin:"50% 50%"

    });

    gsap.to("#loader",{

        opacity:0,

        delay:5.5,

        duration:.25,

        ease:"power2.out",

        onComplete(){

            document.getElementById("loader").remove();

        }

    });
    

});
const messages = [

    "Every story has a soundtrack...",

    "This is ours.",

    "Enjoy.",


];

const loaderText = document.getElementById("loaderText");

let index = 0;

const interval = setInterval(() => {

    index++;

    if(index < messages.length){

        gsap.to(loaderText,{

            opacity:0,

            duration:.75,

            onComplete:()=>{

                loaderText.textContent = messages[index];

                gsap.to(loaderText,{
                    opacity:1,
                    duration:.75
                });

            }

        });

    }

},1500);
// ==============================
// SIDE TRANSITION
// ==============================

function animateSection(selector){

    gsap.timeline({
        scrollTrigger:{
            trigger:selector,
            start:"top 70%"
        }
    })

    .from(`${selector} .transition-line`,{
        scaleX:0,
        transformOrigin:"center",
        duration:1
    })

    .from(`${selector} .transition-side`,{
        opacity:0,
        y:20,
        duration:.8
    },"-=0.5")

    .from(`${selector} h2`,{
        opacity:0,
        y:40,
        duration:1
    },"-=0.3")

    .from(`${selector} p`,{
        opacity:0,
        y:20,
        duration:.8
    },"-=0.4");

}

animateSection(".transition-section");
animateSection(".side-b");
// ==============================
// COUNTDOWN
// ==============================

const weddingDate = new Date("2027-10-02T00:00:00").getTime();

function updateCountdown(){

    const now = new Date().getTime();

    const distance = weddingDate - now;

    if(distance <= 0){

        document.querySelector(".countdown").innerHTML =
        "<h2>It's Wedding Time ❤️</h2>";

        return;

    }

    const days = Math.floor(distance / (1000*60*60*24));

    const hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));

    const minutes = Math.floor((distance % (1000*60*60)) / (1000*60));

    const seconds = Math.floor((distance % (1000*60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();

setInterval(updateCountdown,1000);
const transition = document.getElementById("transition");
const sideB = document.getElementById("sideB");
const flipOverlay = document.getElementById("flipOverlay");
let flipped = false;

ScrollTrigger.create({

    trigger: "#transition",

    start: "center center",

    once: true,

    onEnter: () => {

        if(flipped) return;

        flipped = true;

        flipOverlay.classList.add("show");

        setTimeout(() => {

            flipOverlay.classList.remove("show");

            sideB.scrollIntoView({

                behavior: "smooth"

            });

        },2200);

    }

});
musicToggle.addEventListener("click", () => {

    console.log("CLICK");

    if (music.paused) {

        console.log("PLAY");

        music.play();
        musicToggle.textContent = "🔊";

    } else {

        console.log("PAUSE");

        music.pause();
        musicToggle.textContent = "🔇";

    }

});