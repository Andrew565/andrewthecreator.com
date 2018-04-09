// Fetches page contents from the 'pages' directory
function fetchPage(pageObj) {
  return fetch(`pages/${pageObj.id}.html`)
    .then(res => res.text())
    .then(innerHTML => {
      return {
        innerHTML,
        id: pageObj.id
      };
    });
}

// Hafcaf configurations to support bootstrap
hafcaf.config.linkClass = "navbar-link";
hafcaf.config.linkTagClass = "navbar-item";

const pages = [
  { id: "resume", linkLabel: "My Resumé" },
  { id: "games", linkLabel: "Games" }
];

pages.forEach(page => {
  hafcaf.addRoute(page.id, page);
  fetchPage(page).then(page => hafcaf.updateRoute(page.id, page));
});
