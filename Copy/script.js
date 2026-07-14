
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

let isPlaying = true;
// Pornim muzica

music.volume = 0;

music.play().catch(error => {
    console.log(error);
});

gsap.to(music, {

    volume: 0.25,

    duration: 3,

    ease: "power2.inOut"

});


// ==============================
// START EXPERIENCE
// ==============================



    // Zoom pe album
    gsap.to(".album", {
        scale: 1.02,
        duration: 1,
        ease: "power2.out"
    });

    // Ridică puțin coperta
    gsap.to(".album-cover", {
        y: -5,
        duration: 1,
        ease: "power2.out"
    });

    // Ascunde butonul
    gsap.to(button, {
        opacity: 0,
        y: 10,
        duration: 0.6,
        ease: "power2.out",
        pointerEvents: "none"
    });

    // Glow pe copertă
    gsap.to(".album-cover", {
        boxShadow: "0 40px 90px rgba(0,0,0,0.6)",
        duration: 1
    });

    // Pornește vinilul
    gsap.to(vinyl, {
        rotation: "+=360",
        duration: 4,
        repeat: -1,
        ease: "none",
        transformOrigin: "50% 50%"
    });

    // Mic efect de pornire
    gsap.fromTo(vinyl,
        {
            scale: 0.97
        },
        {
            scale: 1.02,
            duration: 4,
            ease: "power2.out"
        }
    );



button.addEventListener("click", startExperience);

music.play().then(() => {
    console.log("Muzica a pornit!");
}).catch(err => {
    console.error(err);
});


// ==============================
// TRACKS
// ==============================

const tracks = document.querySelectorAll(".track");

tracks.forEach(track => {

    gsap.from(track, {

        opacity: 0,
        y: 60,

        duration: 1.2,

        ease: "power3.out",

        scrollTrigger: {

            trigger: track,
            start: "top 85%"

        }

    });

});

// ==============================
// MICRO ANIMATIONS
// ==============================

gsap.to(".album", {

    y: -5,

    duration: 4,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});

gsap.to(".vinyl", {

    y: 2,

    duration: 4,

    repeat: -1,

    yoyo: true,

    ease: "sine.inOut"

});
button.addEventListener("click", () => {

    const tl = gsap.timeline();

    // Butonul dispare
    tl.to(button,{
        opacity:0,
        duration:0.3
    });

    // Zoom pe album
    tl.to(".album",{
        scale:1.05,
        duration:0.5
    },"<");

    // Discul iese din copertă
    tl.to("#vinyl",{
        x:180,
        duration:4,
        ease:"power3.out"
    });

    // Începe rotația
    tl.add(() => {

        gsap.to("#vinyl",{
            rotation:"+=360",
            duration:4,
            repeat:1,
            ease:"none",
            transformOrigin:"50% 50%"
        });

    });

});
