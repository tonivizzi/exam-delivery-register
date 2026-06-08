# Exam Delivery Register

Webapp per la gestione e registrazione della consegna di referti medici con supporto a:
- 📱 Scansione documento
- ✍️ Firma digitale via smartphone
- 📋 Registro consegne
- 🔍 Ricerca veloce
- 💾 Archiviazione locale (JSON)

## Tecnologie
- **Backend**: PHP 7.4+
- **Frontend**: HTML5, Bootstrap 5, JavaScript
- **Storage**: File system (JSON locale)
- **Mobile**: Web app responsive

## Requisiti
- XAMPP (Apache + PHP)
- Browser moderno con supporto WebRTC (scansione)
- Smartphone per la firma digitale

## Installazione
1. Clona il repository in `htdocs/exam-delivery-register`
2. Accedi via `http://localhost/exam-delivery-register`
3. Le consegne vengono salvate in `data/deliveries.json`

## Struttura
```
exam-delivery-register/
├── index.php              # Home page
├── scan.php              # Gestione scansione
├── sign.php              # Gestione firma
├── register.php          # Visualizzazione registro
├── api/
│   ├── save-delivery.php # Salva consegna
│   ├── get-deliveries.php # Recupera consegne
│   └── search.php        # Ricerca
├── data/
│   └── deliveries.json   # Archivio consegne (autogenerato)
├── assets/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── scanner.js
│   │   ├── signature.js
│   │   └── app.js
│   └── images/
└── uploads/
    └── [document scans]
```
