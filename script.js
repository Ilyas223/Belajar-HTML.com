document.getElementById("run-code").addEventListener("click", function () {
  const code = document.getElementById("code-editor").value;
  const iframe = document.getElementById("live-preview");

  // Update the iframe content with the user's code
  iframe.srcdoc = code;
});
