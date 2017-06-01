var GitHubSearch = require('./../js/githubapp.js').gitHubModule;

var displayResults = function (username, followers, following, avatarUrl, location, githubUrl, publicRepos, bio, blog, company, email){

  $("#results").show();

  var profilePicture = $("<img/>", {
    "class": "img-responsive",
    "src": avatarUrl
  });

  $("#name").text(username);
  $("#location").text(location);
  $("#profile_picture").append(profilePicture);
  $("#button-link").append('<a class="btn btn-primary" target="_blank" href='+ githubUrl +' role="button">Go to Github Profile</a>');
  $("#followers").text(followers);
  $("#following").text(following);
  $("#bio").text(bio);
  $("#company").text(company);
  $("#blog").text(blog);
  $("#email").text(email);
  $("#public-repos").text(publicRepos);

};

var displayErrorMessage = function (username) {

  $("#error").show().text("Oh Snap! We couldn’t find any users matching "+"'"+ username +"'");
  // $("#username").val(""); If I add this, I will get an undefined in the next search

};

function calculateTime(created_at){

  var months = moment().diff(created_at, 'months');
  var years = moment().diff(created_at, 'years');

  if (months === 1){
    return months + " month ago.";
  } else if (months >= 12){
    return years + "years ago.";
  } else {
    return months + " months ago.";
  }

}

function displayDescription(description){

  if(description === null){
    return " ";
  } else {
    return description;
  }

}

function getRepos(repos, length){
  for (var i = 0; i < length; i++) {
    showReposDetails(repos[i]);
  }
}

function getLanguages(repos){

  var languages=[];

  for (var i = 0; i < repos.length; i++) {
    if (repos[i].language != null){
    languages.push(repos[i].language);
    }
  }

  var uniqLanguages = languages.reduce(function(a,b){
    if (a.indexOf(b) < 0 ) a.push(b);
    return a;
  },[]);

  for (var j = 0; j < uniqLanguages.length; j++) {
    $("#used-languages").append('<option>'+uniqLanguages[j]+'</option>');
  }

}

var getReposByLanguage = function(repos, language){
  $("#repos").empty();
  for (var i = 0; i < repos.length; i++) {
    if(repos[i].language === language){
      showReposDetails(repos[i]);
    }
  }
};

function showReposDetails(repo){

  $("#repos").append('<dt><a class="link" target="_blank" href="'+ repo.html_url +'">'+ repo.name +'</a></dt><dd class="repos-description"><p id="display-description">'+ displayDescription(repo.description) +'</p><p>Created '+ calculateTime(repo.created_at)+'</p><p>'+repo.language+'</p></dd>');
}

var displayRepos = function(repos){

  $("#repos").append('<dl>');

  if (repos.length < 6){
    getRepos(repos, repos.length);
    } else {
    getRepos(repos, 6);
    $("#show-all-repos").append('<a class="btn btn-link" target="_blank" href='+ repos[0].owner.html_url +'?tab=repositories role="button">All Repos</a>');
  }

  $("#repos").append('</dl>');

  getLanguages(repos);

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

    currentGitHubSearch.userLookup(input_username, displayResults, displayErrorMessage);
    currentGitHubSearch.reposLookup(input_username, displayRepos);

  });

  $("#filter-by").submit(function(event){

    event.preventDefault();

    var language = $("#used-languages").val();

    currentGitHubSearch.reposbyLanguage(input_username, getReposByLanguage, language);
  });


});
