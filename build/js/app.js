(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "a023561f97560764404d96ace6a1895ede653bbf";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

function GitHubSearch() {

}
GitHubSearch.prototype.userLookup = function(username, displayResults) {

  $.get('https://api.github.com/users/' + username + '?access_token=' + apiKey).then(function(response) {
    displayResults(username, response.html_url, response.public_repos);
  });
};

GitHubSearch.prototype.reposLookup = function(username, displayRepos) {

  $.get('https://api.github.com/users/' + username + '/repos?access_token=' + apiKey).then(function(response) {
    // console.log(response);
    displayRepos(response);
  });
};
exports.gitHubModule = GitHubSearch;

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../js/githubapp.js":2}]},{},[3]);
