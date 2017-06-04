var GitHubSearch = require('./../js/githubapp.js').gitHubModule;

var displayResults = function(username, githubUrl, publicRepos) {

  $("#results").show();
  $("#name").text(username);
  $("#button-link").append('<a class="btn btn-primary" target="_blank" href=' + githubUrl + ' role="button">Go to Github Profile</a>');
  $("#public-repos").text(publicRepos);

};

function displayDescription(description) {

  if (description === null) {
    return "none available";
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

    currentGitHubSearch.lookUpUser(input_username, displayResults, displayErrorMessage);
    currentGitHubSearch.lookUpRepos(input_username, displayRepos);

  });
});
