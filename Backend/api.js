document.addEventListener('DOMContentLoaded', function () {
    const uploadBtn = document.getElementById('uploadBtn');
    const fileModal = document.getElementById('fileModal');
    const closeModal = document.getElementById('closeModal');
    const fileInput = document.getElementById('fileInput');
    const uploadFileBtn = document.getElementById('uploadFileBtn');

    // Google API client ID and API key
    const CLIENT_ID = 'ID';
    const API_KEY = 'Api_key';
    const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    const SCOPES = 'https://www.googleapis.com/auth/drive.file';

    let gapiInited = false;
    let gisInited = false;

    function gapiLoaded() {
        gapi.load('client', initializeGapiClient);
    }

    async function initializeGapiClient() {
        await gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES,
        });
        gapiInited = true;
    }

    function gisLoaded() {
        gisInited = true;
    }

    uploadBtn.addEventListener('click', function () {
        fileModal.style.display = "block";
    });

    closeModal.addEventListener('click', function () {
        fileModal.style.display = "none";
    });

    window.onclick = function (event) {
        if (event.target == fileModal) {
            fileModal.style.display = "none";
        }
    }

    uploadFileBtn.addEventListener('click', function () {
        const file = fileInput.files[0];
        if (file) {
            uploadFile(file);
        }
    });

    function uploadFile(file) {
        const metadata = {
            'name': file.name,
            'mimeType': file.type
        };

        const accessToken = gapi.auth.getToken().access_token;
        const form = new FormData();
        form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
        form.append('file', file);

        fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + accessToken }),
            body: form,
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert('File uploaded successfully');
                fileModal.style.display = "none";
            }).catch((error) => {
                console.error(error);
                alert('File upload failed');
            });
    }

    // Load the API and make an API call.  Display the results on the screen.
    function handleClientLoad() {
        gapi.load('client:auth2', initClient);
    }

    function initClient() {
        gapi.client.init({
            apiKey: API_KEY,
            clientId: CLIENT_ID,
            discoveryDocs: DISCOVERY_DOCS,
            scope: SCOPES
        }).then(function () {
            gapi.auth2.getAuthInstance().signIn();
        });
    }

    handleClientLoad();
});
