const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});


function firstPageAnim(){
    var tl= gsap.timeline();

    tl.from("#nav", {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
        .to(".bounding_elem", {
            y: 0,
            duration: 2,
            delay: -1,
            ease: Expo.easeInOut,
            stagger: 0.2,
        })
        .from("#herofooter", {
            y: -10,
            opacity: 0,
            duration: 1.5,
            delay: -1,
            ease: Expo.easeInOut,
        });
}


// jab mouse move ho to hum log skew kar paaye aur maximum skew and minimum skew define kar paaye, jab mousemove ho to wo skew ki value badhe, aur jab mouse move krna band ho jayega to skew bhi hat jaega.

var timeout;

function circleSkewing(){
    // defining default scale value
    var xscale = 1;
    var yscale = 1;

    var xprevs = 0;
    var yprevs = 0;

    window.addEventListener("mousemove", function (dets){
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(0.8, 1.2, dets.clientX - xprevs);
        yscale = gsap.utils.clamp(0.8, 1.2, dets.clientY - yprevs);

        xprevs = dets.clientX;
        yprevs = dets.clientY;

        circleMouseFollower(xscale, yscale);

        timeout = setTimeout(function(){
            document.querySelector("#mini_circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        },100);

    });
}


function circleMouseFollower(xscale,yscale){
    window.addEventListener("mousemove", function(dets){
        document.querySelector("#mini_circle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

circleSkewing();
circleMouseFollower();
firstPageAnim();


document.querySelectorAll(".elem").forEach(function (elem) {
    var rotate= 0;
    var diffrotate = 0;

    elem.addEventListener("mouseleave", function (dets){
        gsap.to(elem.querySelector("img"), {
            opacity: 0,
            ease: Power3,
            duration : 0.5,
        });
    });

    elem.addEventListener("mousemove" , function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;
        diffrotate = dets.clientX - rotate;
        rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity : 1,
            ease : Power3,
            top : diff,
            left : dets.clientX,
            rotate : gsap.utils.clamp(-20,20, diffrotate * 0.8),
        });
    });
});