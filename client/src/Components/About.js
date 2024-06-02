import React, { useState } from "react";
import "./About.css";

const About = () => {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="about-container">
      <h1>Rreth Federatës së Futbollit të Kosovës</h1>

      <div>
        <h2
          className={activeSection === "historia" ? "active" : ""}
          onClick={() => toggleSection("historia")}
        >
          Historia
        </h2>
        <p>
          Federata e Futbollit e Kosovës (FFK) u themelua në vitin 1946 dhe ka
          kaluar nëpër periudha të ndryshme të zhvillimit dhe sfidave. Pas
          shpalljes së pavarësisë së Kosovës në vitin 2008, FFK filloi të
          angazhohej për pranimin në organizatat ndërkombëtare të futbollit. Në
          vitin 2016, FFK u pranua zyrtarisht në UEFA dhe FIFA, duke hapur
          rrugën për pjesëmarrjen e Kosovës në garat ndërkombëtare. Që nga
          atëherë, FFK ka bërë përparime të mëdha në zhvillimin e futbollit në
          vend, duke organizuar kampionate kombëtare dhe duke përmirësuar
          infrastrukturën sportive.
        </p>
      </div>

      <div>
        <h2
          className={activeSection === "misioni" ? "active" : ""}
          onClick={() => toggleSection("misioni")}
        >
          Misioni
        </h2>
        <p>
          Misioni i Federatës së Futbollit të Kosovës (FFK) është të promovojë
          dhe të zhvillojë futbollin në të gjitha nivelet, duke përfshirë
          futbollin amator dhe atë profesional. FFK synon të krijojë një mjedis
          të barabartë dhe të drejtë për të gjithë lojtarët, trajnerët, dhe
          tifozët, duke përmirësuar vazhdimisht standardet e lojës dhe duke
          ofruar mundësi për zhvillim dhe përparim në këtë sport. Përmes
          projekteve të ndryshme dhe bashkëpunimeve me organizata kombëtare dhe
          ndërkombëtare, FFK synon të rrisë ndërgjegjësimin për futbollin dhe të
          inkurajojë pjesëmarrjen aktive në këtë sport në të gjithë Kosovën.
        </p>
      </div>

      <div>
        <h2
          className={activeSection === "synimet" ? "active" : ""}
          onClick={() => toggleSection("synimet")}
        >
          Synimet
        </h2>
        <p>
          Synimi i Federatës së Futbollit të Kosovës është të bëhemi një nga
          federatat më të respektuara dhe të suksesshme në rajon dhe më gjerë.
          Ne synojmë të arrijmë këtë duke investuar në zhvillimin e talenteve të
          rinj, përmirësimin e infrastrukturës sportive, dhe ofrimin e
          programeve të trajnimit për trajnerët dhe lojtarët. Synimi ynë është
          të krijojmë një ekip kombëtar konkurrues që mund të marrë pjesë me
          sukses në garat ndërkombëtare, duke përfaqësuar me krenari Kosovën në
          arenën globale të futbollit. Përmes përkushtimit dhe bashkëpunimit, ne
          synojmë të ndërtojmë një kulturë të qëndrueshme sportive që do të
          frymëzojë brezat e ardhshëm.
        </p>
      </div>

      <div>
        <h2
          className={activeSection === "aktivitetet" ? "active" : ""}
          onClick={() => toggleSection("aktivitetet")}
        >
          Aktivitetet
        </h2>
        <ul>
          <li>
            Organizimi i Kampionateve Kombëtare:
            <p>
              FFK organizon kampionatet kombëtare për kategoritë e ndryshme të
              moshave, duke përfshirë Superligën, Ligën e Parë dhe të Dytë për
              ekipet e meshkujve dhe femrave.
            </p>
          </li>
          <li>
            Kombëtarja e Kosovës:
            <p>
              Menaxhimi dhe mbështetja e ekipeve kombëtare të Kosovës në
              futbollin e meshkujve dhe femrave, si dhe ekipet e moshave të
              reja. Kjo përfshin përgatitjet për ndeshjet kualifikuese për
              turnetë ndërkombëtare si Kampionati Evropian dhe Botëror.
            </p>
          </li>
          <li>
            Trajnime dhe Licencime:
            <p>
              Organizimi i trajnimeve dhe kurseve për trajnerët dhe zyrtarët e
              ndeshjeve për të siguruar kualifikimin dhe licencimin e tyre sipas
              standardeve ndërkombëtare.
            </p>
          </li>
          <li>
            Promovimi i Futbollit të Femrave:
            <p>
              Nxitja dhe mbështetja e futbollit të femrave përmes kampionateve,
              turneve dhe projekteve të veçanta për të rritur pjesëmarrjen dhe
              cilësinë e futbollit të femrave.
            </p>
          </li>
          <li>
            Infrastruktura Sportive:
            <p>
              Përmirësimi dhe zhvillimi i infrastrukturës sportive, duke
              ndihmuar në ndërtimin dhe renovimin e stadiumeve dhe terreneve të
              trajnimit nëpër qytete të ndryshme të Kosovës.
            </p>
          </li>
        </ul>
      </div>

      <div>
        <h2
          className={activeSection === "arritjet" ? "active" : ""}
          onClick={() => toggleSection("arritjet")}
        >
          Arritjet
        </h2>
        <ul>
          <li>
            Anëtarësimi në FIFA dhe UEFA:
            <p>
              FFK u bë anëtare e FIFA-s dhe UEFA-s në vitin 2016, duke i
              mundësuar Kosovës të marrë pjesë në garat ndërkombëtare dhe të
              zhvillojë futbollin sipas standardeve ndërkombëtare.
            </p>
          </li>
          <li>
            Pjesëmarrja në Kualifikimet për Kampionatet Ndërkombëtare:
            <p>
              Kombëtarja e Kosovës ka marrë pjesë në kualifikimet për
              Kampionatin Botëror dhe Kampionatin Evropian, duke arritur
              rezultate mbresëlënëse si fitoret kundër Çekisë dhe Bullgarisë.
            </p>
          </li>
          <li>
            Zhvillimi i Futbollit të Femrave:
            <p>
              FFK ka punuar intensivisht për të zhvilluar futbollin e femrave,
              duke përmirësuar ekipet kombëtare dhe klubet dhe duke marrë pjesë
              në garat ndërkombëtare.
            </p>
          </li>
          <li>
            Zhvillimi i Infrastrukturës:
            <p>
              FFK ka përmirësuar infrastrukturën futbollistike në Kosovë duke
              ndërtuar dhe renovuar stadiume dhe fusha trajnimi në të gjithë
              vendin.
            </p>
          </li>
          <li>
            Trajnimi dhe Licencimi i Trajnerëve:
            <p>
              FFK ka investuar në programe të trajnimit dhe licencimit për
              trajnerët, duke rritur nivelin e ekspertizës dhe profesionalizmit
              në futbollin kosovar.
            </p>
          </li>
        </ul>
      </div>

      <div>
        <h2
          className={activeSection === "partneret" ? "active" : ""}
          onClick={() => toggleSection("partneret")}
        >
          Partnerët e FFK-së
        </h2>
        <ul>
          <li>
            FIFA:
            <p>
              FIFA është organi më i lartë drejtues i futbollit në botë dhe një
              partner kryesor i FFK-së, duke mbështetur zhvillimin e futbollit
              në Kosovë përmes financimit dhe projekteve të ndryshme.
            </p>
          </li>
          <li>
            UEFA:
            <p>
              UEFA është organi drejtues i futbollit evropian dhe një tjetër
              partner kryesor i FFK-së, duke ofruar mbështetje financiare dhe
              organizative për zhvillimin e futbollit kosovar.
            </p>
          </li>
          <li>
            Qeveria e Kosovës:
            <p>
              Qeveria e Kosovës mbështet FFK-në përmes financimit dhe ndihmës
              institucionale për zhvillimin e sportit dhe infrastrukturës
              sportive në vend.
            </p>
          </li>
          <li>
            Komiteti Olimpik i Kosovës (KOK):
            <p>
              KOK bashkëpunon me FFK-në në promovimin dhe zhvillimin e sporteve
              në Kosovë, duke përfshirë futbollin në programet e tyre sportive
              dhe edukative.
            </p>
          </li>
          <li>
            Sponsorë të Ndryshëm:
            <p>
              FFK ka disa sponsorë lokalë dhe ndërkombëtarë që mbështesin
              aktivitetet e saj përmes financimit dhe marrëveshjeve të
              marketingut, duke ndihmuar në zhvillimin dhe promovimin e
              futbollit në Kosovë.
            </p>
          </li>
          <li>
            Klube Futbolli:
            <p>
              Klubet e futbollit në Kosovë janë partnerë të rëndësishëm të
              FFK-së, duke bashkëpunuar për organizimin e kampionateve dhe
              zhvillimin e lojtarëve të rinj.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
