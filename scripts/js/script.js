const MILLIS_IN_SECOND = 1000;

var indeces = Array()               // index of slideshows with relative index
var slideshowIntervals = Array()    // slideshow intervals
var pauseButtons = Array()          // pause icons of slideshows with relative indeces

$(document).ready(() => {
    slideshows = document.getElementsByClassName("slideshow")                                       // find all slideshows

    for (let i = 0; i < slideshows.length; i++) {
        let children = slideshows[i].querySelectorAll('.slideshow-item')   // get slideshow-item children
        children[0].style.display = "block";      
                                                          // make the first one visible immediately

        setTimeout(() => {                                                                  // delayed starts of slideshows
            pauseButtons.push(slideshows[i].getElementsByClassName("slideshow-pause")[0])   // add slideshow pause icon
            indeces.push(0);                                                                // add index 0 to array of indeces
    
            slideshows[i].onmouseenter = function() {       // mouse entering slideshow pauses and displays corresponding pause icon
                clearInterval(slideshowIntervals[i])        // stop slideshow
                
                let pause = pauseButtons[i]
                
                if (pause != null) 
                    pause.style.display = "block"           // show pause icon
            }
    
            slideshows[i].onmouseleave = function() {       // mouse leaving slideshow restarts slideshows and hides pause icon
                slideshowIntervals[i] = startSlideshow(i)   // start slideshow

                let pause = pauseButtons[i]
                
                if (pause != null) 
                    pause.style.display = "none"            // hide pause icon
            }
    
            slideshowIntervals.push(startSlideshow(i))      // start initial slideshow
                    
        }, .3 * MILLIS_IN_SECOND * i);                      // increasing delayed start for each slideshow (.3 seconds for each child [0, .3, .6, .9, ...])
    }

    let rounded = document.getElementsByClassName("rounded")// find all items that are to be rounded
    
    for (let i = 0; i < rounded.length; i++) {
        let element = rounded[i]

        let maxRadius = Math.max(element.offsetWidth, element.offsetHeight) // find largest dimension

        element.style.borderRadius = '1000px'              	// set border radius to largest dimension to get round item
    }
});

function startSlideshow(index) {
    return setInterval(() => {
        let children = slideshows[index].querySelectorAll('.slideshow-item,.slideshow-item-centered')   // get children of slideshow of index
        
        children[indeces[index]].style.display = "none";            // hide current child

        indeces[index] = (indeces[index] + 1) % children.length     // increase index and modulo to keep index within range                                    

        children[indeces[index]].style.display = "block";           // display current index item

    }, 3.5 * MILLIS_IN_SECOND)
}