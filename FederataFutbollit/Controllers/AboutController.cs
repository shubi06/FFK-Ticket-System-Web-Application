using FederataFutbollit.Data;
using FederataFutbollit.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace FederataFutbollit.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AboutController : ControllerBase
    {
        private readonly DataContext _context;

        public AboutController(DataContext context)
        {
            _context = context;

            // Inicializo të dhënat nëse nuk ekzistojnë
            if (!_context.AboutSections.Any())
            {
                _context.AboutSections.AddRange(
                    new AboutSection
                    {
                        Title = "Historia",
                        Content = "Federata e Futbollit e Kosovës (FFK) u themelua në vitin 1946 dhe ka kaluar nëpër periudha të ndryshme të zhvillimit dhe sfidave. Pas shpalljes së pavarësisë së Kosovës në vitin 2008, FFK filloi të angazhohej për pranimin në organizatat ndërkombëtare të futbollit. Në vitin 2016, FFK u pranua zyrtarisht në UEFA dhe FIFA, duke hapur rrugën për pjesëmarrjen e Kosovës në garat ndërkombëtare. Që nga atëherë, FFK ka bërë përparime të mëdha në zhvillimin e futbollit në vend, duke organizuar kampionate kombëtare dhe duke përmirësuar infrastrukturën sportive."
                    },
                    new AboutSection
                    {
                        Title = "Misioni",
                        Content = "Misioni i Federatës së Futbollit të Kosovës (FFK) është të promovojë dhe të zhvillojë futbollin në të gjitha nivelet, duke përfshirë futbollin amator dhe atë profesional. FFK synon të krijojë një mjedis të barabartë dhe të drejtë për të gjithë lojtarët, trajnerët, dhe tifozët, duke përmirësuar vazhdimisht standardet e lojës dhe duke ofruar mundësi për zhvillim dhe përparim në këtë sport. Përmes projekteve të ndryshme dhe bashkëpunimeve me organizata kombëtare dhe ndërkombëtare, FFK synon të rrisë ndërgjegjësimin për futbollin dhe të inkurajojë pjesëmarrjen aktive në këtë sport në të gjithë Kosovën."
                    },
                    new AboutSection
                    {
                        Title = "Synimet",
                        Content = "Synimi i Federatës së Futbollit të Kosovës është të bëhemi një nga federatat më të respektuara dhe të suksesshme në rajon dhe më gjerë. Ne synojmë të arrijmë këtë duke investuar në zhvillimin e talenteve të rinj, përmirësimin e infrastrukturës sportive, dhe ofrimin e programeve të trajnimit për trajnerët dhe lojtarët. Synimi ynë është të krijojmë një ekip kombëtar konkurrues që mund të marrë pjesë me sukses në garat ndërkombëtare, duke përfaqësuar me krenari Kosovën në arenën globale të futbollit. Përmes përkushtimit dhe bashkëpunimit, ne synojmë të ndërtojmë një kulturë të qëndrueshme sportive që do të frymëzojë brezat e ardhshëm."
                    },
                    new AboutSection
                    {
                        Title = "Aktivitetet",
                        Content = "Aktivitetet që FFK organizon përfshijnë: Organizimi i Kampionateve Kombëtare, Kombëtarja e Kosovës, Trajnime dhe Licencime, Promovimi i Futbollit të Femrave, Infrastruktura Sportive."
                    },
                    new AboutSection
                    {
                        Title = "Arritjet",
                        Content = "Arritjet e FFK përfshijnë: Anëtarësimi në FIFA dhe UEFA, Pjesëmarrja në Kualifikimet për Kampionatet Ndërkombëtare, Zhvillimi i Futbollit të Femrave, Zhvillimi i Infrastrukturës, Trajnimi dhe Licencimi i Trajnerëve."
                    },
                    new AboutSection
                    {
                        Title = "Partnerët",
                        Content = "Partnerët kryesorë të FFK-së përfshijnë: FIFA, UEFA, Qeveria e Kosovës, Komiteti Olimpik i Kosovës (KOK), Sponsorë të Ndryshëm, Klube Futbolli."
                    }
                );
                _context.SaveChanges();
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<AboutSection>> Get()
        {
            var sections = _context.AboutSections.ToList();
            return Ok(sections);
        }
    }
}
