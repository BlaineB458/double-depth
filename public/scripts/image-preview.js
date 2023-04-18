const imagePickerElement = document.querySelector('#image-upload-container input');;
const imagePreviewParentElement = document.querySelector('.image-gallery ul');
const imagePreviewContainer = document.querySelector('.image-gallery-container');

function imagePreview(){
    const files = imagePickerElement.files;

    if(!files || files.length === 0){
        imagePreviewParentElement.style.display = 'none';
        return;
    }
    
    imagePreviewContainer.style.display = 'flex';
    for(const file of files){
        const temp = URL.createObjectURL(file);
        imagePreviewParentElement.innerHTML += `<li>
            <img src="${temp}" >
        </li>
        `;
    }
}



imagePickerElement.addEventListener('change', imagePreview);