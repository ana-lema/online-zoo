/* Navigation */
document.addEventListener('DOMContentLoaded', function(event) {
  menuToggle.addEventListener('click', {
    handleEvent(event) {
      document.body.classList.toggle('nav-active');
    }
  });

  overlay.addEventListener('click', {
    handleEvent(event) {
      document.body.classList.remove('nav-active');
    }
  });

  let headerLinks = document.querySelectorAll('.header a');
  for (let link of headerLinks) {
    link.addEventListener('click', {
      handleEvent(event) {
        document.body.classList.remove('nav-active');
      }
    });
  }
});

/* Modal */
document.addEventListener('DOMContentLoaded', function(event) {
  let modalElement = document.querySelector('.modal');
  modalElement.addEventListener('click', {
    handleEvent(event) {
      event.stopPropagation();

      let modalButton = document.querySelector('.modal__close-button');
      if (event.target == modalButton) {
        document.body.classList.remove('modal-active');
      }
    }
  });

  modal.addEventListener('click', {
    handleEvent(event) {
      document.body.classList.remove('modal-active');
    }
  });
});

/* Animals carousel */
document.addEventListener('DOMContentLoaded', function(event) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'animals.json');
  xhr.responseType = 'json';
  xhr.send();

  xhr.onload = function() {
    let petsObj = xhr.response;
    let carouselBody = document.querySelector('#pets .carousel__body');
    let randomNumArr = [];

    while (randomNumArr.length < petsObj.length) {
      let randomNum = Math.floor(Math.random() * petsObj.length);

      if (randomNumArr.indexOf(randomNum) === -1) {
        randomNumArr.push(randomNum);
      }
    }

    // Build carousel
    let petCardHTML = '<div class="carousel__slide">';
    for (let i = 0; i < 6; i++) {
      let num = randomNumArr[i];
      petCardHTML += '<div class="carousel__item"><div class="pets-card" data-card-num="' + num + '"><div class="pets-card__img"><img src="' + petsObj[num].img + '" alt="" /></div><div class="pets-card__txt"><div class="pets-card__txt-holder"><img src="' + petsObj[num].icon + '" height="37" alt="" /><h5>' + petsObj[num].name + '</h5><p class="small">' + petsObj[num].description + '</p></div></div></div></div>';
    }
    petCardHTML += '</div>';
    carouselBody.innerHTML = petCardHTML;

    // Carousel navigation
    let carouselButtons = document.querySelectorAll('.carousel__button');
    for (let button of carouselButtons) {
      button.addEventListener('click', {
        handleEvent(event) {
          let carouselOldItems = document.querySelector('.carousel__slide');
          carouselBody.style.position = 'absolute';
          carouselBody.style.top = 0;
          carouselBody.style.transition = '.5s ease all';

          if (event.target.classList.contains('carousel__button_next')) {
            button.setAttribute('disabled', 'disabled');
            let newPetCardsHTML = rebuildCarousel();
            carouselBody.insertAdjacentHTML('beforeend', newPetCardsHTML);
            carouselBody.style.transform = 'translateX(-50%)';
            setTimeout(() => {
              carouselBody.style.transition = 'none';
              carouselBody.style.transform = 'translateX(0%)';
              carouselOldItems.remove();
              button.removeAttribute('disabled', 'disabled');
            }, 400);
          }
          else if (event.target.classList.contains('carousel__button_prev')) {
            button.setAttribute('disabled', 'disabled');
            let newPetCardsHTML = rebuildCarousel();
            carouselBody.style.right = 0;
            carouselBody.insertAdjacentHTML('afterbegin', newPetCardsHTML);
            carouselBody.style.transform = 'translateX(50%)';
            setTimeout(() => {
              carouselBody.style.transition = 'none';
              carouselBody.style.right = 'auto';
              carouselBody.style.transform = 'translateX(0%)';
              carouselOldItems.remove();
              button.removeAttribute('disabled', 'disabled');
            }, 400);
          }
        }
      });
    }

    // Rebuild carousel
    function rebuildCarousel() {
      let carouselCards = document.querySelectorAll('.pets-card');

      let currentCardsNumArr = [];
      for (let card of carouselCards) {
        let cardNum = Number(card.getAttribute('data-card-num'));

        currentCardsNumArr.push(cardNum);
      }

      let nextCardsNumArr = currentCardsNumArr.sort(function () {
        return Math.random() - 0.5;
      });

      let newPetCardsHTML = '<div class="carousel__slide">';
      for (let i = 0; i < 6; i++) {
        let num = nextCardsNumArr[i];
        newPetCardsHTML += '<div class="carousel__item"><div class="pets-card" data-card-num="' + num + '"><div class="pets-card__img"><img src="' + petsObj[num].img + '" alt="" /></div><div class="pets-card__txt"><div class="pets-card__txt-holder"><img src="' + petsObj[num].icon + '" height="37" alt="" /><h5>' + petsObj[num].name + '</h5><p class="small">' + petsObj[num].description + '</p></div></div></div></div>';
      }

      newPetCardsHTML += '</div>';
      return newPetCardsHTML;
    }
  };
});

/* Testimonials carousel */
document.addEventListener('DOMContentLoaded', function(event) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', 'testimonials.json');
  xhr.responseType = 'json';
  xhr.send();

  xhr.onload = function() {
    let testiObj = xhr.response;
    let testiCarouselBody = document.querySelector('.testimonials__body');

    // Build carousel
    let testiCardHTML = '';
    for (let i = 0; i < 11; i++) {
      testiCardHTML += '<div class="testimonials__grid-item"><div class="testimonial" data-testi-num="' + i + '"><div class="testimonial__head"><img class="testimonial__avatar" src="' + testiObj[i].avatar + '" width="37" height="37" alt="" /><p class="testimonial__author"><strong>' + testiObj[i].name + '</strong>' + testiObj[i].location + ' <i>•</i> ' + testiObj[i].date + '</p></div><div class="testimonial__body"><p class="small">' + testiObj[i].text + '</p></div></div></div>';
    }
    testiCarouselBody.innerHTML = testiCardHTML;

    // Carousel navigation
    let rangePane;
    if ((window.innerWidth > 999) && (window.innerWidth < 1600)) {
      rangePane = document.querySelector('.testimonials__range-pane_md');
    }
    else {
      rangePane = document.querySelector('.testimonials__range-pane_lg');
    }

    let rangeValue = function() {
      let newValue = rangePane.value;
      let step = document.querySelector('.testimonial').offsetWidth + 33;
      let target = document.querySelector('.testimonials__body');
      target.style.left = '-' + (step * newValue) + 'px';
    }
    rangePane.addEventListener('input', rangeValue);

    // Build modal
    if (window.innerWidth < 1000) {
      buildModal();
    }
    function buildModal() {
      let testimonials = document.querySelectorAll('.testimonial');

      for (let testimonial of testimonials) {
        testimonial.addEventListener('click', {
          handleEvent(event) {
            document.body.classList.add('modal-active');

            let targetElement = event.currentTarget;
            let num = Number(targetElement.getAttribute('data-testi-num'));

            let modalHTML = '<div class="testimonial"><div class="testimonial__head"><img class="testimonial__avatar" src="' + testiObj[num].avatar + '" width="37" height="37" alt="" /><p class="testimonial__author"><strong>' + testiObj[num].name + '</strong>' + testiObj[num].location + ' <i>•</i> ' + testiObj[num].date + '</p></div><div class="testimonial__body"><p class="small">' + testiObj[num].text + '</p></div></div>';

            let modalBody = document.querySelector('.modal__body');
            modalBody.innerHTML = modalHTML;
          }
        });
      }
    }
  };
});
