/* Place everything here that needs to be the very first on scripts */

// used for async-await, else "regeneratorRuntime error is not defined"
// error will manifest
import "regenerator-runtime/runtime";
import "lite-youtube-embed/src/lite-yt-embed.js";

const options = {
    root: null, // default, use viewport
    rootMargin: '0px 0px 0px 0px',
    threshold: 0.75 
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.getElementById('top-nav').classList.remove('active');
            document.getElementById('sub-nav').classList.remove('active');
        } else {
            document.getElementById('top-nav').classList.add('active');
            document.getElementById('sub-nav').classList.add('active');
        }
    })
  }, options);
  
observer.observe(document.querySelector('body'));