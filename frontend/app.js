const pdfInput     = document.querySelector("#pdf-input");
const uploadStatus = document.querySelector("#upload-status");

  pdfInput.addEventListener("change", handleUpload);

  function handleUpload() {
    
    const file = pdfInput.files[0];
    if (!file) return;
    uploadStatus.textContent = 'Uploading \'' + file.name + '\'...';
    uploadStatus.className = "text-sm text-slate-50";
    const fd = new FormData();
    fd.append("file", file);
  }