var apiKey = require('./../.env').apiKey;

function GitHubSearch() {

};


GitHubSearch.prototype.userLookup = function(username, displayResults, displayErrorMessage){

  $.get('https://api.github.com/users/' + username + '?access_token=' + apiKey).then(function(response){
  displayResults(username, response.followers, response.following, response.avatar_url, response.location, response.html_url, response.public_repos, response.bio, response.blog, response.company, response.email);
  }).fail(function(error){
  displayErrorMessage(username);
  });
};

GitHubSearch.prototype.reposLookup = function(username, displayRepos){

  $.get('https://api.github.com/users/' + username + '/repos?access_token=' + apiKey).then(function(response){
    console.log(response);
  displayRepos(response);
  }).fail(function(error){
  });
};

GitHubSearch.prototype.reposbyLanguage = function(username, getReposByLanguage, language){

  $.get('https://api.github.com/users/' + username + '/repos?access_token=' + apiKey).then(function(response){
  getReposByLanguage(response, language);
  }).fail(function(error){
  });
};

exports.gitHubModule = GitHubSearch;
