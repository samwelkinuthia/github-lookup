var apiKey = require('./../.env').apiKey;

GitHubSearch.prototype.userLookup = function(username, displayResults) {

  $.get('https://api.github.com/users/' + username + '?access_token=' + apiKey).then(function(response) {
    displayResults(username, response.html_url, response.public_repos);
  })
};

GitHubSearch.prototype.reposLookup = function(username, displayRepos) {

  $.get('https://api.github.com/users/' + username + '/repos?access_token=' + apiKey).then(function(response) {
    console.log(response);
    displayRepos(response);
  }).fail(function(error) {});
};
exports.gitHubModule = GitHubSearch;
