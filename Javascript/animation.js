const animationManager = {
animateText: function() {
      let delay = 50,
          delay_start = 0,
          contents,
          letters;
    
      document.querySelectorAll(".animate-text").forEach(function (elem) {
        contents = elem.textContent.trim();
        elem.textContent = "";
        letters = contents.split("");
        elem.style.visibility = 'visible';
    
        letters.forEach(function (letter, index_1) {
          setTimeout(function () {
            elem.textContent += letter;
          }, delay_start + delay * index_1);
        });    
        delay_start += delay * letters.length;
      });

},
animateTextWeaponEasy: function() {
    let delay = 50,
        delay_start = 0,
        contents,
        letters;
  
    document.querySelectorAll(".animate-text-easy").forEach(function (elem) {
      contents = elem.textContent.trim();
      elem.textContent = "";
      letters = contents.split("");
      elem.style.visibility = 'visible';
  
      letters.forEach(function (letter, index_1) {
        setTimeout(function () {
          elem.textContent += letter;
        }, delay_start + delay * index_1);
      });    
      delay_start += delay * letters.length;
    });

},
animateTextWeaponMedium: function() {
    let delay = 50,
        delay_start = 0,
        contents,
        letters;
  
    document.querySelectorAll(".animate-text-medium").forEach(function (elem) {
      contents = elem.textContent.trim();
      elem.textContent = "";
      letters = contents.split("");
      elem.style.visibility = 'visible';
  
      letters.forEach(function (letter, index_1) {
        setTimeout(function () {
          elem.textContent += letter;
        }, delay_start + delay * index_1);
      });    
      delay_start += delay * letters.length;
    });

},
animateTextWeaponHard: function() {
    let delay = 50,
        delay_start = 0,
        contents,
        letters;
  
    document.querySelectorAll(".animate-text-hard").forEach(function (elem) {
      contents = elem.textContent.trim();
      elem.textContent = "";
      letters = contents.split("");
      elem.style.visibility = 'visible';
  
      letters.forEach(function (letter, index_1) {
        setTimeout(function () {
          elem.textContent += letter;
        }, delay_start + delay * index_1);
      });    
      delay_start += delay * letters.length;
    });

},
animateTextSkillEasy: function() {
    let delay = 50,
        delay_start = 0,
        contents,
        letters;
  
    document.querySelectorAll(".animate-text-skill-easy").forEach(function (elem) {
      contents = elem.textContent.trim();
      elem.textContent = "";
      letters = contents.split("");
      elem.style.visibility = 'visible';
  
      letters.forEach(function (letter, index_1) {
        setTimeout(function () {
          elem.textContent += letter;
        }, delay_start + delay * index_1);
      });    
      delay_start += delay * letters.length;
    });

},
animateTextSkillMedium: function() {
    let delay = 50,
        delay_start = 0,
        contents,
        letters;
  
    document.querySelectorAll(".animate-text-skill-medium").forEach(function (elem) {
      contents = elem.textContent.trim();
      elem.textContent = "";
      letters = contents.split("");
      elem.style.visibility = 'visible';
  
      letters.forEach(function (letter, index_1) {
        setTimeout(function () {
          elem.textContent += letter;
        }, delay_start + delay * index_1);
      });    
      delay_start += delay * letters.length;
    });

},
animateTextSkillHard: function() {
    let delay = 50,
        delay_start = 0,
        contents,
        letters;
  
    document.querySelectorAll(".animate-text-skill-hard").forEach(function (elem) {
      contents = elem.textContent.trim();
      elem.textContent = "";
      letters = contents.split("");
      elem.style.visibility = 'visible';
  
      letters.forEach(function (letter, index_1) {
        setTimeout(function () {
          elem.textContent += letter;
        }, delay_start + delay * index_1);
      });    
      delay_start += delay * letters.length;
    });

},

}
    


