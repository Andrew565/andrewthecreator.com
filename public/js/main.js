// @ts-nocheck
// Fetches page contents from the 'pages' directory
function fetchPage(pageObj) {
  // lookup relative to the home page the page whose name matches the pageObj id
  return fetch(`pages/${pageObj.id}.html`)
    .then(res => res.text()) // process it as text
    .then(innerHTML => ({ innerHTML, id: pageObj.id })); // return as an object to be processed by updateRoute
}

// Hafcaf configurations to support bootstrap
hafcaf.config.linkClass = "";
hafcaf.config.linkTagClass = "tile";
hafcaf.config.navID = "menu";

const pages = [
  { id: "about-me", linkLabel: "<i class='fas fa-address-card'></i>About Me" },
  { id: "resume", linkLabel: "<i class='far fa-file-alt'></i>My Resumé" },
  { id: "code", linkLabel: "<i class='fas fa-code'></i>Code" },
  { id: "case-studies", linkLabel: "<i class='fas fa-glasses'></i>Case Studies" },
  { id: "articles", linkLabel: "<i class='fas fa-file-invoice'></i>Articles" },
  { id: "talks", linkLabel: "<i class='fas fa-microphone-alt'></i>Talks" },
  { id: "games", linkLabel: "<i class='fas fa-dice'></i>Games" },
  { id: "art", linkLabel: "<i class='fas fa-palette'></i>Art" }
];

pages.forEach(page => {
  hafcaf.addRoute(page);
  fetchPage(page).then(page => hafcaf.updateRoute(page));
});
