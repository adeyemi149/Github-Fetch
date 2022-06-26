const submitEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const profileEl = document.getElementById("profile");

const APIURL = "https://api.github.com/users/"

getUser("adeyemi149");
//Getting User from Api
async function getUser(user) {
    const resp = await fetch(APIURL + user);
    const respdata = await resp.json();

    console.log(respdata);
    createUserProfile(respdata);
    getRepos(user);
}

//Getting Repository form Api
async function getRepos(user) {
    const resp = await fetch(APIURL + user + "/repos");
    const respdata = await resp.json();
    //console.log(respdata);
    createRepos(respdata);
}

function createUserProfile(user) {
    const card = 
    `
    <img src="${user.avatar_url}" alt="${user.name}" />
    <div class="user__bio">
      <h1>${user.name}</h1>
      <p>Bio: ${checkNull(user.bio)}</p>
      <p class="email">E-mail: ${checkNull(user.email)}</p>
      <ul class="flex">
        <li>${user.followers}<strong>Followers</strong></li>
        <li>${user.following}<strong>Following</strong></li>
        <li>${user.public_repos}<strong>Repos</strong></li>
      </ul>
      <div id="repos" class="repos"></div>
    </div>
    `
    profileEl.innerHTML = card;
}

function createRepos(repos) {
    const reposEl = document.getElementById("repos");

    repos
    .slice(0, 9)
    .forEach(repo => {
        const repos = document.createElement("a");

        repos.classList.add("repo");

        repos.innerText = repo.name;
        repos.href = repo.html_url;
        repos.target = repo._blanks;

        reposEl.appendChild(repos);
    });
}

function checkNull (bio) {
    if (bio === null){
        return "Empty"
    } else {
        return bio;
    }
}

submitEl.addEventListener("submit", (e) => {
    e.preventDefault();

    let inputValue = inputEl.value;

    if(inputValue) {
        getUser(inputValue);

        inputEl.value = " ";
    }
})