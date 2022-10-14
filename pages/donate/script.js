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

/* Donation widget */
document.addEventListener('DOMContentLoaded', function(event) {
  let bullets = document.querySelectorAll('.bullet');
  let amounts = document.querySelectorAll('.donation-widget__bullet');

  let amountsArr = [];
  for (let amount of amounts) {
    let num = Number(amount.getAttribute('data-amount'));
    amountsArr.push(num);
  }

  customAmount.addEventListener('input', {
    handleEvent(event) {
      customAmount.value = customAmount.value.slice(0, customAmount.maxLength);

      for (let bullet of bullets) {
        bullet.classList.remove('active');
      }

      let newValue = Number(customAmount.value);
      if (amountsArr.indexOf(newValue) != -1) {
        let index = amountsArr.indexOf(newValue);
        document.querySelectorAll('.donation-widget__bullet .bullet')[index].classList.add('active');
      }
    }
  });

  for (let bullet of bullets) {
    bullet.addEventListener('click', {
      handleEvent(event) {
        for (let bullet of bullets) {
          bullet.classList.remove('active');
        }
        bullet.classList.add('active');
        
        let bulletAmout = bullet.parentElement.querySelector('.amount').textContent;
        customAmount.value = bulletAmout;
      }
    });
  }
});
