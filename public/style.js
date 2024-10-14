function previewImage() {
    var imageUrl = document.getElementById('imageURL').value;
    var imagePreview = document.getElementById('imagePreview');
    imagePreview.src = imageUrl;
}