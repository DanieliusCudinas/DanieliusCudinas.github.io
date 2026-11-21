const forma = document.getElementById("contact-form");
const siustiMygtuka = document.getElementById("submit-button");
const rezultatas = document.getElementById("form-result");
const isvalytiMygtuka = document.getElementById("clear-button");

const vardasLaukas = document.getElementById("vardas");
const pavardeLaukas = document.getElementById("pavarde");
const emailLaukas = document.getElementById("email");
const adresasLaukas = document.getElementById("adresas");
const telefonasLaukas = document.getElementById("telefonas");

const klausimas1Laukas = document.getElementById("klausimas1");
const klausimas2Laukas = document.getElementById("klausimas2");
const klausimas3Laukas = document.getElementById("klausimas3");

const vardasError = document.getElementById("vardas-error");
const pavardeError = document.getElementById("pavarde-error");
const emailError = document.getElementById("email-error");
const adresasError = document.getElementById("adresas-error");

const klausimas1Error = document.getElementById("klausimas1-error");
const klausimas2Error = document.getElementById("klausimas2-error");
const klausimas3Error = document.getElementById("klausimas3-error");




function tikrintiForma() {
  const raides = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/;

  const vardasGerai =
    vardasLaukas.value.trim() !== "" &&
    raides.test(vardasLaukas.value.trim());

  const pavardeGerai =
    pavardeLaukas.value.trim() !== "" &&
    raides.test(pavardeLaukas.value.trim());

  const emailGerai =
    emailLaukas.value.trim() !== "" &&
    emailLaukas.checkValidity();

  const adresasGerai =
    adresasLaukas.value.trim() !== "";

  const telefonasGerai =
    /^\+370 6\d{2} \d{5}$/.test(telefonasLaukas.value);

  const klausimas1Gerai =
    klausimas1Laukas.value !== "" &&
    Number(klausimas1Laukas.value) >= 1 &&
    Number(klausimas1Laukas.value) <= 10;

  const klausimas2Gerai =
    klausimas2Laukas.value !== "" &&
    Number(klausimas2Laukas.value) >= 1 &&
    Number(klausimas2Laukas.value) <= 10;

  const klausimas3Gerai =
    klausimas3Laukas.value !== "" &&
    Number(klausimas3Laukas.value) >= 1 &&
    Number(klausimas3Laukas.value) <= 10;

console.log({
  vardasGerai,
  pavardeGerai,
  emailGerai,
  telefonasGerai,
  adresasGerai,
  klausimas1Gerai,
  klausimas2Gerai,
  klausimas3Gerai
});

siustiMygtuka.disabled = !(
  vardasGerai &&
  pavardeGerai &&
  emailGerai &&
  telefonasGerai &&
  adresasGerai &&
  klausimas1Gerai &&
  klausimas2Gerai &&
  klausimas3Gerai &&
  forma.checkValidity()
);
}

forma.addEventListener("input", tikrintiForma);

tikrintiForma();




forma.addEventListener("submit", function(event) {
  event.preventDefault();

  const vardasTeisingas = tikrintiVarda();
  const pavardeTeisinga = tikrintiPavarde();
  const emailTeisingas = tikrintiEmail();
  const adresasTeisingas = tikrintiAdresa();

  const klausimas1Teisingas =
    tikrintiVertinima(klausimas1Laukas, klausimas1Error);

  const klausimas2Teisingas =
    tikrintiVertinima(klausimas2Laukas, klausimas2Error);

  const klausimas3Teisingas =
    tikrintiVertinima(klausimas3Laukas, klausimas3Error);

  if (
    !vardasTeisingas ||
    !pavardeTeisinga ||
    !emailTeisingas ||
    !adresasTeisingas ||
    !klausimas1Teisingas ||
    !klausimas2Teisingas ||
    !klausimas3Teisingas
  ) {
    return;
  }

  const vardas = document.getElementById("vardas").value;
  const pavarde = document.getElementById("pavarde").value;
  const email = document.getElementById("email").value;
  const telefonas = document.getElementById("telefonas").value;
  const adresas = document.getElementById("adresas").value;

  const ivertinimas1 =
    Number(document.getElementById("klausimas1").value);

  const ivertinimas2 =
    Number(document.getElementById("klausimas2").value);

  const ivertinimas3 =
    Number(document.getElementById("klausimas3").value);

  const duomenys = {
    vardas: vardas,
    pavarde: pavarde,
    email: email,
    telefonas: telefonas,
    adresas: adresas,
    ivertinimas1: ivertinimas1,
    ivertinimas2: ivertinimas2,
    ivertinimas3: ivertinimas3
  };

  const vidurkis =
    (ivertinimas1 + ivertinimas2 + ivertinimas3) / 3;

  console.log(duomenys);

  rezultatas.innerHTML = `
    <p><strong>Vardas:</strong> ${duomenys.vardas}</p>
    <p><strong>Pavardė:</strong> ${duomenys.pavarde}</p>
    <p><strong>El. paštas:</strong> ${duomenys.email}</p>
    <p><strong>Telefono numeris:</strong> ${duomenys.telefonas}</p>
    <p><strong>Adresas:</strong> ${duomenys.adresas}</p>
    <p><strong>1 įvertinimas:</strong> ${duomenys.ivertinimas1}</p>
    <p><strong>2 įvertinimas:</strong> ${duomenys.ivertinimas2}</p>
    <p><strong>3 įvertinimas:</strong> ${duomenys.ivertinimas3}</p>
    <p><strong>${duomenys.vardas} ${duomenys.pavarde}:</strong>${vidurkis.toFixed(2)}</p>
  `;
});




vardasLaukas.addEventListener("input", tikrintiVarda);
pavardeLaukas.addEventListener("input", tikrintiPavarde);
emailLaukas.addEventListener("input", tikrintiEmail);
adresasLaukas.addEventListener("input", tikrintiAdresa);
telefonasLaukas.addEventListener("input", formatuotiTelefona);


klausimas1Laukas.addEventListener("input", function() {
  tikrintiVertinima(klausimas1Laukas, klausimas1Error);
});

klausimas2Laukas.addEventListener("input", function() {
  tikrintiVertinima(klausimas2Laukas, klausimas2Error);
});

klausimas3Laukas.addEventListener("input", function() {
  tikrintiVertinima(klausimas3Laukas, klausimas3Error);
});

function tikrintiVarda() {
  const raides = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/;

  if (vardasLaukas.value.trim() === "") {
    vardasError.textContent = "Vardas yra privalomas.";
    vardasLaukas.classList.add("input-error");
    return false;
  }

  if (!raides.test(vardasLaukas.value.trim())) {
    vardasError.textContent = "Vardą gali sudaryti tik raidės.";
    vardasLaukas.classList.add("input-error");
    return false;
  }

  vardasError.textContent = "";
  vardasLaukas.classList.remove("input-error");

  return true;
}

function tikrintiPavarde() {
  const raides = /^[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/;

  if (pavardeLaukas.value.trim() === "") {
    pavardeError.textContent = "Pavardė yra privaloma.";
    pavardeLaukas.classList.add("input-error");
    return false;
  }

  if (!raides.test(pavardeLaukas.value.trim())) {
    pavardeError.textContent = "Pavardę gali sudaryti tik raidės.";
    pavardeLaukas.classList.add("input-error");
    return false;
  }

  pavardeError.textContent = "";
  pavardeLaukas.classList.remove("input-error");

  return true;
}

function tikrintiEmail() {
  if (emailLaukas.value.trim() === "") {
    emailError.textContent = "El. paštas yra privalomas.";
    emailLaukas.classList.add("input-error");
    return false;
  }

  if (!emailLaukas.checkValidity()) {
    emailError.textContent = "Įveskite tinkamą el. pašto adresą.";
    emailLaukas.classList.add("input-error");
    return false;
  }

  emailError.textContent = "";
  emailLaukas.classList.remove("input-error");

  return true;
}

function tikrintiAdresa() {
  if (adresasLaukas.value.trim() === "") {
    adresasError.textContent = "Adresas yra privalomas.";
    adresasLaukas.classList.add("input-error");
    return false;
  }

  adresasError.textContent = "";
  adresasLaukas.classList.remove("input-error");

  return true;
}

function tikrintiVertinima(laukas, errorElementas) {
  const reiksme = Number(laukas.value);

  if (laukas.value === "") {
    errorElementas.textContent = "Įvertinimas yra privalomas.";
    laukas.classList.add("input-error");
    return false;
  }

  if (reiksme < 1 || reiksme > 10) {
    errorElementas.textContent = "Įvertinimas turi būti nuo 1 iki 10.";
    laukas.classList.add("input-error");
    return false;
  }

  errorElementas.textContent = "";
  laukas.classList.remove("input-error");

  return true;
}

function formatuotiTelefona() {
  let skaiciai = telefonasLaukas.value.replace(/\D/g, "");

  if (skaiciai.startsWith("370")) {
    skaiciai = skaiciai.slice(3);
  }

  if (skaiciai.startsWith("8")) {
    skaiciai = skaiciai.slice(1);
  }

  skaiciai = skaiciai.slice(0, 8);

  let suformatuotas = "+370 ";

  if (skaiciai.length > 0) {
    suformatuotas += skaiciai.slice(0, 3);
  }

  if (skaiciai.length > 3) {
    suformatuotas += " " + skaiciai.slice(3, 8);
  }

  telefonasLaukas.value = suformatuotas;

  tikrintiForma();
}




isvalytiMygtuka.addEventListener("click", function() {
  forma.reset();

  rezultatas.innerHTML = "";

  vardasError.textContent = "";
  pavardeError.textContent = "";
  emailError.textContent = "";
  adresasError.textContent = "";

  klausimas1Error.textContent = "";
  klausimas2Error.textContent = "";
  klausimas3Error.textContent = "";

  vardasLaukas.classList.remove("input-error");
  pavardeLaukas.classList.remove("input-error");
  emailLaukas.classList.remove("input-error");
  adresasLaukas.classList.remove("input-error");

  klausimas1Laukas.classList.remove("input-error");
  klausimas2Laukas.classList.remove("input-error");
  klausimas3Laukas.classList.remove("input-error");

  tikrintiForma();
});