const editor = document.getElementById("editor");
const preview = document.getElementById("preview");
const feedback = document.getElementById("feedback");
const instruction = document.getElementById("instruction");
const example = document.getElementById("example");
const levelDisplay = document.getElementById("level");
const submitButton = document.getElementById("submit");

let level = 1;

// Data level dan instruksi
const levels = [
  {
    instruction: "Buat sebuah judul dengan tag `<h1>` yang berbeda dari contoh ini.",
    example: "<h1>Contoh Judul</h1>\n<p>Ini adalah contoh paragraf.</p>",
    validation: /<h1>(?!Contoh Judul).*<\/h1>/,
  },
  {
    instruction: "Buat paragraf dengan tag `<p>` yang isinya berbeda dari contoh ini.",
    example: "<p>Ini adalah contoh paragraf.</p>",
    validation: /<p>(?!Ini adalah contoh paragraf).*<\/p>/,
  },
  {
    instruction: "Buat daftar dengan tag `<ul>` dan setidaknya 3 item.",
    example: "<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n  <li>Item 3</li>\n</ul>",
    validation: /<ul>.*<li>.*<\/li>.*<\/ul>/s,
  },
];

// Fungsi untuk memuat level
function loadLevel() {
  const currentLevel = levels[level - 1];
  instruction.textContent = currentLevel.instruction;
  example.textContent = currentLevel.example;
  editor.value = "";
  preview.srcdoc = "";
  feedback.textContent = "";
}

// Fungsi untuk memeriksa kode
submitButton.addEventListener("click", () => {
  const userCode = editor.value.trim();
  const currentLevel = levels[level - 1];

  if (currentLevel.validation.test(userCode)) {
    feedback.textContent = "Benar! Anda naik ke level berikutnya.";
    feedback.style.color = "green";
    level++;

    if (level > levels.length) {
      feedback.textContent = "Selamat! Anda telah menyelesaikan semua level.";
      submitButton.disabled = true;
      return;
    }

    levelDisplay.textContent = level;
    setTimeout(loadLevel, 2000); // Pindah ke level berikutnya setelah 2 detik
  } else {
    feedback.textContent = "Kode Anda belum benar. Coba lagi!";
    feedback.style.color = "red";
  }

  // Tampilkan kode pengguna di preview
  preview.srcdoc = userCode;
});

// Muat level awal
loadLevel();
