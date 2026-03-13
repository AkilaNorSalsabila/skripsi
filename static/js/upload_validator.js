// Validator untuk upload gambar 
(function() {
  const VALID_EXTENSIONS = ['jpg', 'jpeg', 'png'];

  function getExtension(filename) {
    if (!filename) return '';
    const parts = filename.split('.');
    return parts.length > 1 ? parts.pop().toLowerCase() : '';
  }

  function isValidImage(filename) {
    return VALID_EXTENSIONS.includes(getExtension(filename));
  }

  function showNotification(message) {
    const existing = document.getElementById('upload-notification');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'upload-notification';
    overlay.className = 'upload-notif-overlay';

    const box = document.createElement('div');
    box.className = 'upload-notif-box';

    const text = document.createElement('h2');
    text.textContent = message;

    const btnContainer = document.createElement('div');
    btnContainer.className = 'upload-notif-actions';

    const btnOk = document.createElement('button');
    btnOk.className = 'upload-notif-btn';
    btnOk.textContent = 'OK';
    btnOk.addEventListener('click', () => overlay.remove());

    btnContainer.appendChild(btnOk);
    box.appendChild(text);
    box.appendChild(btnContainer);
    overlay.appendChild(box);
    document.body.appendChild(overlay);
  }

  function validateFile(event) {
    const input = event.target;
    const file = input.files && input.files[0];
    
    if (!file) return;

    if (!isValidImage(file.name)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      
      showNotification('Format file tidak didukung. Gunakan JPG / JPEG / PNG.');
      
      setTimeout(() => {
        input.value = '';
      }, 100);
    }
  }

  function init(selector) {
    const inputs = document.querySelectorAll(selector);
    inputs.forEach(input => {
      input.addEventListener('change', validateFile, true);
    });
  }

  window.uploadValidator = {
    init: init,
    isValidImage: isValidImage
  };
})();
