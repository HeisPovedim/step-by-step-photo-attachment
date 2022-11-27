window.addEventListener('load', function() {
  let allowedExtensions = /(.png|.jpg|.jpeg)$/i; // @: валидация
  let data = new FormData()

  // ?: ФУНКЦИЯ ПЕРЕКУЛЮЧЕНИЯ ПРЕЛООДЕРА
  function changePreloader (bol) {
    let preloader = document.querySelector('.photo-preloader-ring');
    if (bol == true) {
      preloader.classList.remove('hidden');
    } else {
      preloader.classList.add('hidden');
    }
  }

  // ?: ВЫБОР ПРЕДЗАГРУЖАЕМОГО ШАГА
  function changeStep (step) {
    let stepAll = document.querySelectorAll('.wrapper_content .step-upload');
    stepAll.forEach((el) => {
      let dataStep = el.getAttribute('data-step_id');
      if(dataStep == step) {
        el.classList.remove('hidden');
      } else {
        el.classList.add('hidden');
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
  let uploadPhoto = document.querySelectorAll('.upload-photo'); 

  // ?: ЗАГРУЗКА ФОТО
  uploadPhoto.forEach(item => {
    item.addEventListener('change', function() {
      let main = item.closest('.step-upload');
      let img = main.querySelector('.upload_file_img');

      console.log(document.querySelector('.wrapper_content_passport_error_window_info__img').querySelector('img'))

      changePreloader(true);
      setTimeout(() => {
        if (this.files && this.files[0]) {
          let filePath = item.value;
          if (!allowedExtensions.exec(filePath)) {
            alert('Недопустимый тип файла');
            fileInput.value = '';
            return false;
          } else {
            img.onload = () => URL.revokeObjectURL(img.src);
            img.src = URL.createObjectURL(this.files[0]);
            document.querySelector('.wrapper_content_passport_error_window_info__img').querySelector('img').src = img.src; // @: загрузка изображения в окно ошибки
            document.querySelector('.wrapper_content_passport_error_window_info__img-fullscrean').querySelector('img').src = img.src; // @: загрузка изображения в полноразмерное окно ошибки
            fetch('', { // @: ваш POST
              method: 'POST',
              headers: {
                "Content-Type": "First passport file"
              },
              body: img.src // @: наш файл
            }).then (
              response => response.json() // @: если ответ является объектом JSON
            ).then (
              success => console.log(success) // @: обработка объекта ответа на успешный процесс
            ).catch (
              error => console.log(error) // @: обработка объекта ответа на ошибку
            );

            let stepId = item.closest('.step-upload').getAttribute('data-step_id');
            changeStep(parseInt(stepId) + 1);
          };
        };
        changePreloader(false);
        document.querySelector('.wrapper_content_passport_error_window').classList.remove('hidden')
      }, "3000")
    });
  });
});

document.querySelector('.wrapper_content_passport_error_window__btn').addEventListener('click', () => { document.querySelector('.wrapper_content_passport_error_window').classList.add('hidden') })

// ?: ИЗОБРАЖЕНИЕ НА ВЕСЬ ЭКРАН
document.querySelector('.wrapper_content_passport_error_window_info__img').addEventListener('click', () => {
  document.querySelector('.wrapper_content_passport_error_window_info__img-fullscrean').classList.toggle('hidden');
})
document.querySelector('.wrapper_content_passport_error_window_info__img-fullscrean').addEventListener('click', () => {
  document.querySelector('.wrapper_content_passport_error_window_info__img-fullscrean').classList.toggle('hidden');
})
