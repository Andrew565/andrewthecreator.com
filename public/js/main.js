// Fetches page contents from the 'pages' directory
function fetchPage(pageObj) {
  // lookup relative to the home page the page whose name matches the pageObj id
  return fetch(`pages/${pageObj.id}.html`)
    .then(res => res.text()) // process it as text
    .then(innerHTML => ({ innerHTML, id: pageObj.id })); // return as an object to be processed by updateRoute
}

// Check which page/route we're on as to whether or not the menu should be open
function checkHash() {
  if (window.location.hash.indexOf("home") === -1) {
    document.body.classList.remove("menu-open");
  } else {
    document.body.classList.add("menu-open");
  }
}

// Listener for the page load event, checks which page was loaded
document.addEventListener("DOMContentLoaded", checkHash);

// Listener for hashchange, aka page/route change
window.addEventListener("hashchange", () => {
  // Check which page/route we're on as to whether or not the menu should be open
  checkHash();

  // Since we just changed pages, reset the window to the top of the page
  window.scrollTo(0, 0);
});

// Hafcaf configurations to support bootstrap
hafcaf.config.linkClass = "";
hafcaf.config.linkTagClass = "tile";
hafcaf.config.navID = "menu";

// Array of page objects to be fetched and processed by hafcaf
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
