window.addEventListener('load', function() {
  let allowedExtensions = /(.png|.jpg|.jpeg)$/i; // @: валидация

  // ?: ВЫБОР ПРЕДЗАГРУЖАЕМОГО ШАГА
  function changeStep (step) {
    let stepAll = document.querySelectorAll('.wrapper_content .step-upload');
    stepAll.forEach((el) => {
      let dataStep = el.getAttribute('data-step_id');
      if(dataStep == step) {
        el.classList.remove('hidden');
      }
    });
  }
  let stepActive = document.querySelector('.step-upload-image').value;
  changeStep(stepActive)

  // ?: ОТРИСОВКА КАРТ НОВОГО ОБРАЗЦА
  let checkbox = document.getElementById('check-box-label'); // @: ссылается на чекбокс
  let cardNewSample = document.querySelectorAll('#card-new-sample'); // @: id - ссылается на теги карт нового образца
  checkbox.addEventListener('change' , function() { // @: ебейшая функция по отрисовки карт нового образца
    if (checkbox.classList.contains('active')) {
      checkbox.classList.remove('active');
      cardNewSample.forEach((el) => {
        el.classList.add('hidden');
      })
    } else {
      checkbox.classList.add('active');
      cardNewSample.forEach((el) => {
        el.classList.remove('hidden');
      })
    }
  })

  // !: ПЕРЕМЕННЫЕ БЛОКОВ
  let firstPassportFileInput = document.getElementById('first_passport_input');
  let secondPassportFileInput = document.getElementById('second_passport_input');

  let firstCardFileInput = document.getElementById('first-card-input');
  let secondCardFileInput = document.getElementById('second-card-input');
  let thirdCardFileInput = document.getElementById('third-card-input');


  // ?: ПЕРВАЯ ФОТОГРАФИЯ ПАСПОРТА
  firstPassportFileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      let filePath = firstPassportFileInput.value;
      let img = document.getElementById('first_passport_img');
      if (!allowedExtensions.exec(filePath)) {
        alert('Недопустимый тип файла');
        fileInput.value = '';
        return false;
      } else {
        img.onload = () => URL.revokeObjectURL(img.src);
        img.src = URL.createObjectURL(this.files[0]);
        document.getElementById('passport-step-one').classList.add('hidden');
        document.getElementById('passport-step-two').classList.remove('hidden');
      }
    }
  });

  // ?: ВТОРАЯ ФОТОГРАФИЯ ПАСПОРТА
  secondPassportFileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      let filePath = secondPassportFileInput.value;
      let img = document.getElementById('second_passport_img');
      if (!allowedExtensions.exec(filePath)) {
        alert('Недопустимый тип файла');
        fileInput.value = '';
        return false;
      } else {
        img.onload = () => URL.revokeObjectURL(img.src);
        img.src = URL.createObjectURL(this.files[0]); 
        document.getElementById('passport-step-two').classList.add('hidden');
        document.getElementById('first-card-front').classList.remove('hidden');
      }
    }
  });

  // ?: ПЕРВАЯ ФОТОГРАФИЯ КАРТЫ
  firstCardFileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      let filePath = firstCardFileInput.value;
      let img = document.getElementById('first-card-img');
      if (!allowedExtensions.exec(filePath)) {
        alert('Недопустимый тип файла');
        fileInput.value = '';
        return false;
      } else {
        img.onload = () => URL.revokeObjectURL(img.src);
        img.src = URL.createObjectURL(this.files[0]); 
      }
    }
  });

  // ?: ВТОРАЯ ФОТОГРАФИЯ КАРТЫ
  secondCardFileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      let filePath = secondCardFileInput.value;
      let img = document.getElementById('second-card-img');
      if (!allowedExtensions.exec(filePath)) {
        alert('Недопустимый тип файла');
        fileInput.value = '';
        return false;
      } else {
        img.onload = () => URL.revokeObjectURL(img.src);
        img.src = URL.createObjectURL(this.files[0]); 
      }
    }
  });

  // ?: ВТОРАЯ ФОТОГРАФИЯ КАРТЫ
  thirdCardFileInput.addEventListener('change', function() {
    if (this.files && this.files[0]) {
      let filePath = thirdCardFileInput.value;
      let img = document.getElementById('third-card-img');
      if (!allowedExtensions.exec(filePath)) {
        alert('Недопустимый тип файла');
        fileInput.value = '';
        return false;
      } else {
        img.onload = () => URL.revokeObjectURL(img.src);
        img.src = URL.createObjectURL(this.files[0]); 
      }
    }
  });

});