let igudziai = [
  {
    pavadinimas: "JavaScript ciklai",
    busena: "Planuojama",
    xp: 60
  },
  {
    pavadinimas: "ML",
    busena: "Planuojama",
    xp: 40
  },
  {
    pavadinimas: "HTML pagrindai",
    busena: "Mokomasi",
    xp: 60
  },
  {
    pavadinimas: "CSS stilizavimas",
    busena: "Mokomasi",
    xp: 50
  },
  {
    pavadinimas: "Brėžinių ir schemų skaitymas",
    busena: "Mokomasi",
    xp: 60
  },
  {
    pavadinimas: "Litavimas",
    busena: "Atlikta",
    xp: 30
  },
  {
    pavadinimas: "OOP principai",
    busena: "Atlikta",
    xp: 30
  }
];




function issaugotiDuomenis() {
  localStorage.setItem("igudziai", JSON.stringify(igudziai));
}




function ikeltiDuomenis() {

  const issaugotiDuomenys = localStorage.getItem("igudziai");

  if (issaugotiDuomenys !== null) {
    igudziai = JSON.parse(issaugotiDuomenys);
  }

}




function generuotiKorteles() {

  const planuojama = document.getElementById("planned-skills");
  const mokomasi = document.getElementById("learning-skills");
  const atlikta = document.getElementById("completed-skills");

  planuojama.innerHTML = "";
  mokomasi.innerHTML = "";
  atlikta.innerHTML = "";

  igudziai.forEach(function(igudis) {

    const kortele = document.createElement("div");

    kortele.classList.add("skill-card");

    kortele.innerHTML = `
      <h4>${igudis.pavadinimas}</h4>

      <label>Būsena:</label>

      <select class="busenos-pasirinkimas">
        <option value="Planuojama">Planuojama</option>
        <option value="Mokomasi">Mokomasi</option>
        <option value="Atlikta">Atlikta</option>
      </select>

      <p>XP: ${igudis.xp}</p>
    `;

    const busenosPasirinkimas =
      kortele.querySelector(".busenos-pasirinkimas");

    busenosPasirinkimas.value = igudis.busena;

    busenosPasirinkimas.addEventListener("change", function() {

      igudis.busena = busenosPasirinkimas.value;

      issaugotiDuomenis();
      generuotiKorteles();
      atnaujintiXP();
      atnaujintiStatistika();

    });

    if (igudis.busena === "Planuojama") {
      planuojama.appendChild(kortele);
    }
    else if (igudis.busena === "Mokomasi") {
      mokomasi.appendChild(kortele);
    }
    else if (igudis.busena === "Atlikta") {
      atlikta.appendChild(kortele);
    }

  });

}




function atnaujintiXP() {

  let bendrasXP = 0;

  igudziai.forEach(function(igudis) {

    if (igudis.busena === "Atlikta") {
      bendrasXP = bendrasXP + igudis.xp;
    }

  });

  document.getElementById("total-xp").textContent = bendrasXP + " XP";


  let lygis;
  let rangas;

  if (bendrasXP < 50) {
    lygis = 1;
    rangas = "Pradedantysis";
  }
  else if (bendrasXP < 150) {
    lygis = 2;
    rangas = "Praktikantas";
  }
  else if (bendrasXP < 300) {
    lygis = 3;
    rangas = "Specialistas";
  }
  else {
    lygis = 4;
    rangas = "Profesionalas";
  }


  document.getElementById("current-level").textContent = lygis;
  document.getElementById("current-rank").textContent = rangas;
  atnaujintiProgresa(bendrasXP, lygis);

}




function atnaujintiProgresa(bendrasXP, lygis) {

  let lygioPradzia;
  let kitasLygis;

  if (lygis === 1) {
    lygioPradzia = 0;
    kitasLygis = 50;
  }
  else if (lygis === 2) {
    lygioPradzia = 50;
    kitasLygis = 150;
  }
  else if (lygis === 3) {
    lygioPradzia = 150;
    kitasLygis = 300;
  }
  else {
    document.getElementById("level-progress-fill").style.width = "100%";
    document.getElementById("level-progress-text").textContent =
      "Maksimalus lygis";

    return;
  }

  const progresas =
    ((bendrasXP - lygioPradzia) /
    (kitasLygis - lygioPradzia)) * 100;

  document.getElementById("level-progress-fill").style.width =
    progresas + "%";

  document.getElementById("level-progress-text").textContent =
    Math.round(progresas) + "%";
}




function atnaujintiStatistika() {

  const bendrasKiekis = igudziai.length;

  let mokomasiKiekis = 0;
  let atliktaKiekis = 0;

  igudziai.forEach(function(igudis) {

    if (igudis.busena === "Mokomasi") {
      mokomasiKiekis++;
    }

    if (igudis.busena === "Atlikta") {
      atliktaKiekis++;
    }

  });

  const atliktaProcentais =
    (atliktaKiekis / bendrasKiekis) * 100;

  document.getElementById("skills-count").textContent =
    bendrasKiekis;

  document.getElementById("learning-count").textContent =
    mokomasiKiekis;

  document.getElementById("completed-count").textContent =
    atliktaKiekis;

  document.getElementById("completed-percent").textContent =
    Math.round(atliktaProcentais) + "%";
}




ikeltiDuomenis();
generuotiKorteles();
atnaujintiXP();
atnaujintiStatistika();