var GitHubSearch = require('./../js/githubapp.js').gitHubModule;

var displayResults = function(username, publicRepos) {

  $("#results").show();


  $("#name").text(username);
  $("#public-repos").text(publicRepos);

};

function calculateTime(created_at) {

  var months = moment().diff(created_at, 'months');
  var years = moment().diff(created_at, 'years');

  if (months === 1) {
    return months + " month ago.";
  } else if (months >= 12) {
    return years + "years ago.";
  } else {
    return months + " months ago.";
  }

}

function displayDescription(description) {

  if (description === null) {
    return "<i>no description availabe</i>";
  } else {
    return description;
  }

}

function getRepos(repos, length) {
  for (var i = 0; i < length; i++) {
    showReposDetails(repos[i]);
  }
}

function showReposDetails(repo) {

  $("#repos").append('<dt><a class="link" target="_blank" href="' + repo.html_url + '">' + repo.name + '</a></dt><dd class="repos-description"><p id="display-description">' + displayDescription(repo.description) + '</p><p>Created ' + calculateTime(repo.created_at) + '</p><p>' + repo.language + '</p></dd>');
}

var displayRepos = function(repos) {

  $("#repos").append('<dl>');

  if (repos.length < 100) {
    getRepos(repos, repos.length);
  } else {
    getRepos(repos, 100);
    $("#show-all-repos").append('<a class="btn btn-link" target="_blank" href=' + repos[0].owner.html_url);
  }

  $("#repos").append('</dl>');
};

$(document).ready(function() {

  var input_username;
  var currentGitHubSearch;

  $("#github-search").submit(function(event) {

    event.preventDefault();

    $("#error").hide();
    $(".restart").empty();

    input_username = $("#username").val();

    currentGitHubSearch = new GitHubSearch();

    currentGitHubSearch.userLookup(input_username, displayResults);
    currentGitHubSearch.reposLookup(input_username, displayRepos);

  });
});
