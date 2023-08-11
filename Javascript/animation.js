const animationManager = {
  animateTextModel: function (className) {
    let delay = 50,
      delay_start = 0,
      contents,
      letters;

    document.querySelectorAll(className).forEach(function (elem) {
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
  animateText: function () {
    this.animateTextModel(".animate-text")
  },
  animateTextWeaponEasy: function () {
    this.animateTextModel(".animate-text-easy");
  },
  animateTextWeaponMedium: function () {
    this.animateTextModel(".animate-text-medium");
  },
  animateTextWeaponHard: function () {
    this.animateTextModel(".animate-text-hard");
  },
  animateTextSkillEasy: function () {
    this.animateTextModel(".animate-text-skill-easy");
  },
  animateTextSkillMedium: function () {
    this.animateTextModel(".animate-text-skill-medium");
  },
  animateTextSkillHard: function () {
    this.animateTextModel(".animate-text-skill-hard");
  },
};


