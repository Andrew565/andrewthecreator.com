(function() {
  var hafcaf = {
    routes: {},
    config: {
      linkClass: null, // Class(es) to add to link 'a' tags
      linkTag: "li", // Which tag to use for link containers
      linkTagClass: null, // Class(es) to add to linkTag tags
      loadingHTML: "<p>Loading...</p>", // Default content while a page is loading
      mainID: "main-container", // Where pages should be added
      navID: "nav-list", // Where link tags should be added
      pageClass: null, // Class(es) to add to page containers
      pageTag: "div" // Which tag to use for page containers
    },
    addRoute: function(id, options) {
      // Check if a route already exists with the given ID
      if (this.routes[id] !== undefined) {
        console.error('A route with the ID "' + id + '" already exists.');
        return false;
      }

      // Add the route and it's options to the collection of routes
      this.routes[id] = options;

      // Add the route to the navigation menu if linkText provided
      if (options.linkLabel) {
        var newEl = document.createElement(this.config.linkTag);

        if (options.linkTagClass || this.config.linkTagClass) {
          newEl.classList.add(options.linkTagClass || this.config.linkTagClass);
        }

        var newLink = document.createElement("a");
        newLink.href = "#" + id;
        newLink.innerHTML = options.linkLabel;

        // Add classes to the link, if present
        if (options.linkClass || this.config.linkClass) {
          newLink.classList.add(options.linkClass || this.config.linkClass);
        }

        newEl.appendChild(newLink);
        document.getElementById(this.config.navID).appendChild(newEl);
      }

      // Create a new page
      var newEl = document.createElement(this.config.pageTag);
      newEl.id = id;

      // Add classes to the page, if present
      if (options.pageClass || this.config.pageClass) {
        newEl.classList.add(options.pageClass || this.config.pageClass);
      }

      // If this new route provides html, add it to the DOM, else use the loadingHTML
      newEl.innerHTML = options.innerHTML || this.config.loadingHTML;

      // Add page to the DOM
      document.getElementById(this.config.mainID).appendChild(newEl);
    },
    default: "home",
    updateRoute: function(id, options) {
      const route = this.routes[id];

      if (!route) {
        console.error(
          'A route with the ID "' + id + '" does not exist, cannot update it.'
        );
        return false;
      }

      if (options.linkHTML) {
        // First, find the link's 'a' tag by looking up the link's href
        const linkEl = document.querySelector("a[href='#" + id + "']");

        // Then, update the link's innerHTML with the new content
        linkEl.innerHTML = options.linkHTML;
      }

      if (options.innerHTML) {
        // First, find the page via its id
        const pageEl = document.getElementById(id);

        // Then, update the page's innerHTML with the new content
        pageEl.innerHTML = options.innerHTML;
      }

      if (options.onRender) route.onRender = options.onRender;

      // If this route has an onRender function, call it
      if (route.onRender) route.onRender();
    },
    routeChange: function() {
      // Get the new hash, which is the route to be rendered
      const routeID = location.hash.slice(1);

      // From the routes known to hafcaf, pick out the matching one
      const route = this.routes[routeID];

      // If the route was found and the route has a "onRender" callback, call it
      if (route && route.onRender) route.onRender();
    },
    init: function(config) {
      if (config) this.config = config;

      // Add a global listener for 'hashchange', since this framework relies on hash-based routing
      window.addEventListener("hashchange", function() {
        hafcaf.routeChange();
      });

      // Set hash to default if no hash
      if (!window.location.hash) {
        window.location.hash = this.default;
      } else {
        this.routeChange();
      }
    }
  };

  // Add hafcaf to the window object so it becomes globally accessible
  window.hafcaf = hafcaf;
})();

// Once the script has instantiated hafcaf, initialize it
hafcaf.init();
