var GitHubSearch = require('./../js/githubapp.js').gitHubModule;

var displayResults = function(username, githubUrl, publicRepos) {

  $("#results").show();
  $("#name").text(username);
  $("#button-link").append('<a class="btn btn-primary" target="_blank" href=' + githubUrl + ' role="button">View on Github</a>');
  $("#public-repos").text(publicRepos);

};

function displayDescription(description) {

  if (description === null) {
    return "no description available";
  } else {
    return description;
  }

}
$(document).ready(function() {

  var input_username;
  var currentGitHubSearch;

  $("#github-search").submit(function(event) {

    event.preventDefault();

    $("#error").hide();
    $(".restart").empty();

    input_username = $("#username").val();

    currentGitHubSearch = new GitHubSearch();


    currentGitHubSearch.userLookup(input_username, displayResults, displayErrorMessage);
    currentGitHubSearch.reposLookup(input_username, displayRepos);

  });
});
