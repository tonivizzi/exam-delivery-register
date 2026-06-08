// App principale - gestione webcam, firma, salvataggio
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

let canvas, ctx;
let isDrawing = false;
let lastX = 0;
let lastY = 0;
let currentDocument = null;
let currentSignature = null;

function initializeApp() {
    // Inizializza canvas firma
    const signatureCanvas = document.getElementById('signaturePad');
    if (signatureCanvas) {
        canvas = signatureCanvas;
        ctx = canvas.getContext('2d');
        setupSignaturePad();
    }

    // Event listeners webcam
    const btnStartCamera = document.getElementById('btnStartCamera');
    const btnCapture = document.getElementById('btnCapture');
    const btnStopCamera = document.getElementById('btnStopCamera');
    const btnClearSignature = document.getElementById('btnClearSignature');
    const btnSignQR = document.getElementById('btnSignQR');
    const documentUpload = document.getElementById('documentUpload');
    const btnClearDocument = document.getElementById('btnClearDocument');
    const deliveryForm = document.getElementById('deliveryForm');

    if (btnStartCamera) btnStartCamera.addEventListener('click', startCamera);
    if (btnCapture) btnCapture.addEventListener('click', capturePhoto);
    if (btnStopCamera) btnStopCamera.addEventListener('click', stopCamera);
    if (btnClearSignature) btnClearSignature.addEventListener('click', clearSignature);
    if (btnSignQR) btnSignQR.addEventListener('click', generateQRCode);
    if (documentUpload) documentUpload.addEventListener('change', handleFileUpload);
    if (btnClearDocument) btnClearDocument.addEventListener('click', clearDocument);
    if (deliveryForm) deliveryForm.addEventListener('submit', handleFormSubmit);
}

// Firma digitale - Setup canvas
function setupSignaturePad() {
    canvas.addEventListener('mousedown', startSignature);
    canvas.addEventListener('mousemove', drawSignature);
    canvas.addEventListener('mouseup', endSignature);
    canvas.addEventListener('mouseout', endSignature);

    // Touch support
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', endSignature);
}

function startSignature(e) {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
}

function drawSignature(e) {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    lastX = x;
    lastY = y;
}

function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 'mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

function endSignature() {
    isDrawing = false;
    // Salva la firma in base64
    currentSignature = canvas.toDataURL('image/png');
}

function clearSignature() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    currentSignature = null;
}

// Webcam
let stream = null;

function startCamera() {
    const video = document.getElementById('cameraStream');
    const controls = document.getElementById('cameraControls');

    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(s) {
            stream = s;
            video.srcObject = stream;
            video.style.display = 'block';
            controls.style.display = 'block';
        })
        .catch(function(err) {
            alert('Errore accesso webcam: ' + err.message);
        });
}

function capturePhoto() {
    const video = document.getElementById('cameraStream');
    const photoCanvas = document.getElementById('photoCanvas');
    const context = photoCanvas.getContext('2d');

    photoCanvas.width = video.videoWidth;
    photoCanvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);

    currentDocument = photoCanvas.toDataURL('image/jpeg');
    showDocumentPreview(currentDocument);
    stopCamera();
}

function stopCamera() {
    const video = document.getElementById('cameraStream');
    const controls = document.getElementById('cameraControls');

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
    }
    video.style.display = 'none';
    controls.style.display = 'none';
}

// Upload file
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        currentDocument = event.target.result;
        showDocumentPreview(currentDocument);
    };
    reader.readAsDataURL(file);
}

function showDocumentPreview(dataUrl) {
    const preview = document.getElementById('documentPreview');
    const container = document.getElementById('previewContainer');
    
    preview.src = dataUrl;
    container.style.display = 'block';
}

function clearDocument() {
    currentDocument = null;
    document.getElementById('documentUpload').value = '';
    document.getElementById('previewContainer').style.display = 'none';
}

// QR Code
function generateQRCode() {
    // Genera un token temporaneo per la firma
    const token = generateToken();
    const signUrl = window.location.origin + '/exam-delivery-register/sign-mobile.php?token=' + token;
    
    document.getElementById('qrContainer').innerHTML = '';
    new QRCode(document.getElementById('qrContainer'), {
        text: signUrl,
        width: 200,
        height: 200
    });

    const qrModal = new bootstrap.Modal(document.getElementById('qrSignModal'));
    qrModal.show();
}

function generateToken() {
    return 'sign_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
}

// Form submission
function handleFormSubmit(e) {
    e.preventDefault();

    // Validazione
    if (!currentDocument) {
        alert('Seleziona o scansiona un documento');
        return;
    }

    if (!currentSignature) {
        alert('Firma il documento');
        return;
    }

    // Raccogli dati
    const formData = {
        patientName: document.getElementById('patientName').value,
        patientSurname: document.getElementById('patientSurname').value,
        patientId: document.getElementById('patientId').value,
        examType: document.getElementById('examType').value,
        notes: document.getElementById('notes').value || '',
        document: currentDocument,
        signature: currentSignature,
        timestamp: new Date().toISOString()
    };

    // Salva nel localStorage (per versione locale)
    saveDelivery(formData);
}

function saveDelivery(data) {
    try {
        // Recupera consegne esistenti
        let deliveries = JSON.parse(localStorage.getItem('deliveries')) || [];
        
        // Aggiungi nuova consegna con ID unico
        const newDelivery = {
            id: 'DEL_' + Date.now(),
            ...data
        };
        
        deliveries.push(newDelivery);
        localStorage.setItem('deliveries', JSON.stringify(deliveries));

        // Mostra messaggio successo
        alert('✅ Consegna salvata con successo!\nID: ' + newDelivery.id);
        
        // Reset form
        document.getElementById('deliveryForm').reset();
        currentDocument = null;
        currentSignature = null;
        clearSignature();
        document.getElementById('previewContainer').style.display = 'none';

        // Reindirizza dopo 2 secondi
        setTimeout(() => {
            window.location.href = 'register.php';
        }, 2000);

    } catch (error) {
        alert('❌ Errore nel salvataggio: ' + error.message);
    }
}

// Utilities
function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('it-IT', options);
}

function getExamTypeLabel(type) {
    const labels = {
        blood: 'Esame Sangue',
        urine: 'Esame Urine',
        xray: 'Radiografia',
        ecography: 'Ecografia',
        other: 'Altro'
    };
    return labels[type] || type;
}
