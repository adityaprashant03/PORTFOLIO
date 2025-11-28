// INITIAL SETUP
function valueSetters() {
    gsap.set("#nav a", { y: "-100%", opacity: 0 });
    gsap.set("#home span .child", { y: "100%" });
    gsap.set("#home #row img", { opacity: 0 });
}
valueSetters();

// REVEAL TEXT → SPLIT INTO SPAN
function revealToSpan() {
    document.querySelectorAll(".reveal").forEach(elem => {
        let spanParent = document.createElement("span");
        let spanChild = document.createElement("span");

        spanParent.classList.add("parent");
        spanChild.classList.add("child");

        spanChild.innerHTML = elem.innerHTML;
        spanParent.appendChild(spanChild);

        elem.innerHTML = "";
        elem.appendChild(spanParent);
    });
}
revealToSpan();

// LOADER + GSAP TIMELINE
function loaderAnimation() {
    let t1 = gsap.timeline();

    t1.from(".child span", {
        x: 100,
        stagger: 0.2,
        duration: 1.4,
        delay: 1,
        ease: "power3.inOut"
    })
    .to(".parent .child", {
        y: "-100%",
        duration: 1,
        ease: "circ.inOut"
    })
    .to("#loader", {
        height: 0,
        duration: .4,
        ease: "circ.inOut"
    })
    .to("#green", {
        top: 0,
        height: "100%",
        duration: .5,
        ease: "circ.inOut"
    })
    .to("#green", {
        height: "0%",
        duration: 1,
        ease: "circ.inOut",
        onComplete: function() {
            animateHomepage();

            // IMPORTANT – Locomotive starts AFTER animations
            setTimeout(() => {
                locoInitialize();
            }, 500);
        }
    });
}
loaderAnimation();

// HOMEPAGE ANIMATIONS
function animateHomepage() {
    let tl = gsap.timeline();

    tl.to("#nav a", {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        ease: "expo.inOut"
    })
    .to("#home .parent .child", {
        y: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "expo.inOut"
    })
    .to("#home #row img", {
        opacity: 1,
        duration: 1,
        ease: "expo.inOut",
        onComplete: function() {
            h3Animation();
        }
    })
    .to("home #row .reveal-text",{
        opacity:1,
        duration:1, 
        ease:"expo.inOut"
    })
}

// LETTER ANIMATION
function h3Animation() {
    let h3 = document.querySelector(".reveal-text");
    let text = h3.textContent;
    let final = "";

    text.split("").forEach(char => {
        final += `<span class="letter">${char}</span>`;
    });

    h3.innerHTML = final;

    gsap.from(".letter", {
        opacity: 0,
        y: 40,
        duration: 1.5,
        stagger: 0.05,
        ease: "power.out"
    });
}

// LOCOMOTIVE INITIALIZATION
function locoInitialize() {

    const scrollContainer = document.querySelector("#main");

    const scroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
        smartphone: { smooth: true },
        tablet: { smooth: true }
    });

    // Force update after images load
    setTimeout(() => scroll.update(), 1000);
}


// MOBILE NAV CLICK DROPDOWNS
function mobileNavDropdowns() {
    if (window.innerWidth > 600) return; // desktop → ignore

    const navItems = document.querySelectorAll(".resume, .social, .skills, .contact");

    navItems.forEach(item => {
        const link = item.querySelector("a");

        link.addEventListener("click", (e) => {
            e.preventDefault(); // stop anchor from jumping

            // Close all others
            navItems.forEach(i => {
                if (i !== item) i.classList.remove("active");
            });

            // Toggle current
            item.classList.toggle("active");
        });
    });

    // Close dropdown if clicking anywhere else
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".resume, .social, .skills, .contact")) {
            navItems.forEach(item => item.classList.remove("active"));
        }
    });
}

mobileNavDropdowns();

