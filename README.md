# Github app

#### Epicodus JavaScript Independent Project, 10/13/2016

#### By **Marta Sánchez**

[Github repository](https://github.com/mrtsanchez/Github-User-Lookup)

## Description

This is a website where users may enter a GitHub username into a form, submit it, and see names and descriptions of that person's public repositories.

![app-screenshot](https://github.com/mrtsanchez/Github-User-Lookup/blob/master/img/github_vieron.png)


## Setup/Installation Requirements

To run app locally: In terminal, navigate to your desktop and execute:

To run app locally: In terminal, navigate to your desktop and execute:
  * `$ git clone https://github.com/mrtsanchez/Github-User-Lookup`
  * `$ npm install`
  * `$ bower install`

Create a new file and place your API Key there:

  * exports.apiKey = "YOUR-API-KEY";

**Github API limits and setup:**

This app uses the GitHub API to retrieve the data. This API allows 5,000 requests per hour with an API key, but only 60 requests per hour without one. Everyone is therefore required to use their own unique key. GitHub refers to these keys as "Personal Access Tokens".

*Creating Personal Access Tokens*

Visit the Settings area of your GitHub account, select Personal Access Tokens from the sidebar, and hit Generate New Token. GitHub will offer a list of options. Do not select any. These grant read/write permissions and access to personal data. Finally, select Generate Token.


## Known Bugs

There are no known bugs.

## Technologies Used

HTML, Javascript, CSS

## Specs

| Behaviour  | Input | Output |
| ------------- | ------------- | ------------- |
|The app should return an error message if the user does not exist | #$%  | Oh Snap! We couldn’t find any users matching #$% |
| The app should return the profile of a given user (name, avatar location and github url)  | vieron  | Javier Sánchez-Marin, Barcelona, Spain, http://github.com/vieron  |
| The app should return the number of public repos for the user  | vieron | 79  |
| The app should return the first six public repos of the user  | vieron  | repo name, description, language and creation date  |
| The app should allow to filter the repos by language   | javascript | Display only repos where language is Javascript  |
| The app should allow to display expanded data to complete the users profile (bio, company, email, blog, followers, following)  | vieron  | new relic, 122, 187... |


### License

Published under MIT License.

Copyright (c) 2016 **_Marta Sánchez_**
