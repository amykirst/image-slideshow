/*  LIMITATIONS:
  
  - Only 1 slideshow per page, as we use an ID for slideshow
  - Because JS hides images, flash of content on page load

*/

// Get array with photos
var photos = document.getElementsByTagName("figure");
var numPhotos = photos.length;
var shownPhotoIndex;

// Hide all photos except first by giving class of "hide" (if JS is not enabled, all photos will show)
function hidePhotos() {
  for (var i = 1; i < numPhotos; i++) {
    photos[i].className += " hide";
  } 
} // end hidePhotos

function positionButtons() {
  var getImage = photos[0].children[0];
  // IE 8 does not support photos[0].firstElementChild;
  var imageHeight = (getImage.height);
  var imageWidth = (getImage.width);
  var paddingTop = (imageHeight / imageWidth) * 100;
  paddingTop = +paddingTop.toFixed(2);
  var percent = paddingTop + "%";
  document.getElementById("previous").style.paddingBottom = percent;
  document.getElementById("next").style.paddingBottom = percent;
}

// Add controls (if JS is not enabled; controls will not be present)
function addControls() {
  var slideshow = document.getElementById("slideshow");
  // Create buttons
  var spanNext = document.createElement("span");
  var spanPrevious = document.createElement("span");
  // Give buttons IDs
  spanNext.setAttribute("id", "next");
  spanPrevious.setAttribute("id", "previous");
  // Add buttons to slideshow div
  slideshow.appendChild(spanNext);
  slideshow.appendChild(spanPrevious);
  // Add content to buttons
  document.getElementById("next").innerHTML = "<p>>></p>";
  document.getElementById("previous").innerHTML = "<p><<</p>";
  // Calculate position of buttons
  positionButtons();
} // end addControls

function findShownPhoto() {
  for (var i = 0; i < numPhotos; i++) {
    // if the image does not contain a class of "hide"
    if (photos[i].className.indexOf("hide") == -1) {
      shownPhotoIndex = i;
    } // end if statement  
  } // end for statement
} // end findShownPhoto

function progressSlides() {
  var next = document.getElementById("next");
  // When the next button is clicked, show next photo
  next.onclick = function() {
    var nextPhoto;
    findShownPhoto();
    // If current photo is last photo, go to first photo
    if (shownPhotoIndex === (numPhotos - 1)) {
      nextPhoto = photos[0];
    } else {
      nextPhoto = photos[shownPhotoIndex + 1];
    }
    // Add the "hide" class to the list of existing classes
    photos[shownPhotoIndex].className += " hide";
    // Show next photo by removing "hide" class
    var newClass = nextPhoto.className.replace("hide", "");
    nextPhoto.className = newClass;
    }; // end next click
  var previous = document.getElementById("previous");
  previous.onclick = function() {
    var prevPhoto;
    findShownPhoto();
      // If current photo is first photo, go to last photo
      if (shownPhotoIndex === 0) {
        prevPhoto = photos[numPhotos - 1];
      } else {
        prevPhoto = photos[shownPhotoIndex - 1];
      }
      // Hide current photo
      photos[shownPhotoIndex].className += " hide";
      // Show previous photo
      var newClass = prevPhoto.className.replace("hide", "");
      prevPhoto.className = newClass;
  }; // end previous click
} // end progressSlides

hidePhotos();

// Run JS after images have downloaded  
window.onload = function() {
  addControls();
  progressSlides();
};

