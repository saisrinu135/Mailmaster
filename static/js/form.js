const fileUpload = document.getElementById('file-upload'); // input field
const fileName = document.getElementById('file-name'); // file name div
const uploadBtn = document.getElementById("upload-btn");  //upload button

fileUpload.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        fileName.textContent = e.target.files[0].name;
        uploadBtn.disabled = false;
    } else {
        fileName.textContent = 'No file chosen';
        uploadBtn.disabled = true;
    }
});


function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}



uploadBtn.addEventListener("click", async () => {
    const file = fileUpload.files[0];
    const formData = new FormData();
    formData.append('file', file);


    try {
        const response = await fetch('/get-leads/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },

            body: formData
        });

        if (response.ok) {
            const leads = await response.json();
            sessionStorage.setItem('leads', JSON.stringify(leads));
            window.location.href = '/home/';
        }
        else {
            alert("Error while uploading file");
        }
    }
    catch (error) {
        alert("Error while uploading file");
    }
})