$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global) {

  var dc = {};

  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var categoriesTitleHtml = "snippets/categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";
  var menuItemsUrl =
    "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
  var menuItemsTitleHtml = "snippets/menu-items-title.html";
  var menuItemHtml = "snippets/menu-item.html";

  // Convenience function for inserting innerHTML for 'select'
  var insertHtml = function (selector, html) {
    var targetElem = document.querySelector(selector);
    targetElem.innerHTML = html;
  };

  // Show loading icon inside element identified by 'selector'.
  var showLoading = function (selector) {
    var html = "<div class='text-center'>";
    html += "<img src='images/ajax-loader.gif'></div>";
    insertHtml(selector, html);
  };

  // Return substitute of '{{propName}}'
  // with propValue in given 'string'
  var insertProperty = function (string, propName, propValue) {
    var propToReplace = "{{" + propName + "}}";
    string = string.replace(new RegExp(propToReplace, "g"), propValue);
    return string;
  };

  // Remove the class 'active' from home and switch to Menu button
  var switchMenuToActive = function () {
    // Remove 'active' from home button
    var classes = document.querySelector("#navHomeButton").className;
    classes = classes.replace(new RegExp("active", "g"), "");
    document.querySelector("#navHomeButton").className = classes;

    // Add 'active' to menu button if not already there
    classes = document.querySelector("#navMenuButton").className;
    if (classes.indexOf("active") === -1) {
      classes += " active";
      document.querySelector("#navMenuButton").className = classes;
    }
  };

  // On page load (before images or CSS)
  document.addEventListener("DOMContentLoaded", function (event) {

    // TODO: STEP 0: Look over the code from
    // *** start ***
    // to
    // *** finish ***
    // below.
    // We changed this code to retrieve all categories from the server instead of
    // simply requesting home HTML snippet. We now also have another function
    // called buildAndShowHomeHTML that will receive all the categories from the server
    // and process them: choose random category, retrieve home HTML snippet, insert that
    // random category into the home HTML snippet, and then insert that snippet into our
    // main page (index.html).
    //
    // TODO: STEP 1: Substitute buildAndShowHomeHTML below with the value of the function
    // that will be called when server responds with the categories data.
  
    // *** start ***
    // On first load, show home view
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      allCategoriesUrl,
      buildAndShowHomeHTML, // TODO: STEP 1: Substitute buildAndShowHomeHTML with the correct function name
      true); // Explicitly setting the flag to get JSON from server processed into an object literal
    // *** finish ***
  });

  // Builds HTML for the home page based on categories array
  // returned from the server.
  function buildAndShowHomeHTML(categories) {

    // Load home snippet page
    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (homeHtml) {

        // TODO: STEP 2: Here, call chooseRandomCategory, passing it retrieved 'categories'
        // Pay attention to what type of data that function returns vs what the chosenCategoryShortName
        // variable's name implies it expects.
        var chosenCategory = chooseRandomCategory(categories);
  
        // TODO: STEP 3: Substitute {{randomCategoryShortName}} in the home html snippet with the
        // chosen category from STEP 2. Use existing insertProperty function for that purpose.
        var homeHtmlToInsertIntoMainPage = insertProperty(homeHtml, "randomCategoryShortName", chosenCategory.short_name);
  
        // TODO: STEP 4: Insert the produced HTML in STEP 3 into the main page
        insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
      },
      false); // False here because we are getting just regular HTML from the server, so no need to process JSON.
  }

  // Given array of category objects, returns a random category object.
  function chooseRandomCategory(categories) {
    // Choose a random index into the array (from 0 inclusively until array length (exclusively))
    var randomArrayIndex = Math.floor(Math.random() * categories.length);
  
    // return category object with that randomArrayIndex
    return categories[randomArrayIndex];
  }

  // Rest of the code...

  global.$dc = dc;

})(window);
