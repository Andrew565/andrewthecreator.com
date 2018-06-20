// Fetches page contents from the 'pages' directory
function fetchPage(pageObj) {
  // lookup relative to the home page the page whose name matches the pageObj id
  return fetch(`pages/${pageObj.id}.html`)
    .then(res => res.text()) // process it as text
    .then(innerHTML => ({ innerHTML, id: pageObj.id })); // return as an object to be processed by updateRoute
}

// Hafcaf configurations to support bootstrap
// @ts-ignore
hafcaf.config.linkClass = "nav-link";
// @ts-ignore
hafcaf.config.linkTagClass = "navbar-item";

const pages = [
  { id: "resume", linkLabel: "My Resumé" },
  { id: "games", linkLabel: "Games" },
  { id: "case-studies", linkLabel: "Case Studies" },
  { id: "talks", linkLabel: "Talks" },
  { id: "art", linkLabel: "Art" }
];

pages.forEach(page => {
  // @ts-ignore
  hafcaf.addRoute(page);
  // @ts-ignore
  fetchPage(page).then(page => hafcaf.updateRoute(page));
});

// Event listener for nav click events
document.getElementById("nav-list").addEventListener("click", () => {
  document.getElementById("navListContainer").classList.remove("show");
});
