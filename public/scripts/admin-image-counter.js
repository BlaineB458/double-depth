const hiddenInputElement = document.getElementById('images');

const imageCounterElement = document.getElementById('file-counter-tag');

function updateImageCounter(){
    imageCounterElement.textContent = `(${this.files.length}/10) Images uploaded`;
}

hiddenInputElement.addEventListener('change', updateImageCounter);