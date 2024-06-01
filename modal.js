// Функция для открытия модального окна
function openModal(productName, imageUrl, description, currentPrice, oldPrice) {
  var modal = document.getElementById("modal");
  var modalProductName = document.getElementById("modal-product-name");
  var modalImage = document.getElementById("modal-image");
  var modalDescription = document.getElementById("modal-description");
  var modalPrice = document.getElementById("modal-price");
  var modalOldPrice = document.getElementById("modal-old-price");

  modalProductName.textContent = productName;
  modalImage.src = imageUrl;
  modalDescription.textContent = description;
  modalPrice.textContent = currentPrice;
  modalOldPrice.textContent = oldPrice;
  modal.style.display = "block";
}

// Функция для закрытия модального окна
function closeModal() {
  var modal = document.getElementById("modal");
  modal.style.display = "none";
}

// Обработчик события нажатия на кнопку "Закрыть"
var closeBtn = document.querySelector(".close");
closeBtn.onclick = closeModal;

// Обработчик события нажатия на кнопку товара
var productButtons = document.querySelectorAll(".button-group button");
productButtons.forEach(function (button) {
  button.onclick = function () {
    var productName =
      this.parentNode.parentNode.querySelector(".product-name").textContent;
    var imageUrl =
      this.parentNode.parentNode.parentNode.querySelector(".image img").src;
    var description =
      this.parentNode.parentNode.querySelector(".description").textContent;
    var currentPrice = this.parentNode.parentNode.querySelector(
      ".price span:first-child"
    ).textContent;
    var oldPriceElement =
      this.parentNode.parentNode.querySelector(".price .price-old");
    var oldPrice = oldPriceElement ? oldPriceElement.textContent : ""; // Проверка на наличие старой цены
    openModal(productName, imageUrl, description, currentPrice, oldPrice);
  };
});

// Обработчик события нажатия на кнопку "Сохранить"
var saveButton = document.getElementById("buy-button");
saveButton.onclick = function () {
  var nameInput = document.getElementById("name-input");
  var phoneInput = document.getElementById("phone-input");
  var productName = document.getElementById("modal-product-name").textContent;
  let err = false;
  // Проверяем поля ввода на ошибки
  if (!validateName(nameInput.value)) {
    showError(nameInput, "Заполните имя");
    err = true;
  } else {
    hideError(nameInput);
  }

  if (!validatePhoneNumber(phoneInput.value)) {
    showError(phoneInput, "Введите корректный номер телефона");
    err = true;
  } else {
    hideError(phoneInput);
  }

  if (err) return; // Если были ошибки, прерываем выполнение функции

  // Поля заполнены корректно, выполняем запись в localStorage и закрываем окно
  var data = {
    name: nameInput.value,
    phone: phoneInput.value,
  };
  localStorage.setItem(productName, JSON.stringify(data));
  closeModal();
};

// Функция для проверки имени
function validateName(name) {
  return name.trim().length > 0; // Простая проверка наличия имени (длина > 0)
}

// Функция для проверки номера телефона
function validatePhoneNumber(phone) {
  var phoneNumber = phone.replace(/\D/g, ""); // Удаление всех символов, кроме цифр
  return phoneNumber.length === 11; // Простая проверка длины номера телефона (11 символов, считая только цифры)
}

// Функция для отображения сообщения об ошибке
function showError(inputElement, message) {
  var errorMessage = inputElement.nextElementSibling;
  errorMessage.textContent = message;
  errorMessage.style.visibility = "visible";
}

// Функция для скрытия сообщения об ошибке
function hideError(inputElement) {
  var errorMessage = inputElement.nextElementSibling;
  errorMessage.textContent = "";
  errorMessage.style.visibility = "hidden";
}
