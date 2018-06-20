// Fetches page contents from the 'pages' directory
function fetchPage(pageObj) {
  // lookup relative to the home page the page whose name matches the pageObj id
  return fetch(`pages/${pageObj.id}.html`)
    .then(res => res.text()) // process it as text
    .then(innerHTML => ({ innerHTML, id: pageObj.id })); // return as an object to be processed by updateRoute
}

// Hafcaf configurations to support bootstrap
hafcaf.config.linkClass = "nav-link";
hafcaf.config.linkTagClass = "navbar-item";

const pages = [
  { id: "resume", linkLabel: "My Resumé" },
  { id: "games", linkLabel: "Games" },
  { id: "case-studies", linkLabel: "Case Studies" },
  { id: "talks", linkLabel: "Talks" },
  { id: "art", linkLabel: "Art" }
];

pages.forEach(page => {
  hafcaf.addRoute(page);
  fetchPage(page).then(page => hafcaf.updateRoute(page));
});
