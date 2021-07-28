module.exports = (form, secret) => {

  function addRecaptcha(callback) {
    const recapture_div = document.createElement('div');
    recapture_div.classList.add("g-recaptcha");
    form.appendChild(recapture_div)

    const recaptchaId = grecaptcha.render(recapture_div,{
      'sitekey': secret,
      'size': 'invisible',
      'badge' : 'bottomright',
      'callback' : callback
    });
    return recaptchaId;
  }


  return {
    addRecaptcha: addRecaptcha
  }

}