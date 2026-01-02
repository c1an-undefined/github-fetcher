const fetchBtn = document.getElementById("fetch-profile-btn")
const usernameInput = document.getElementById("username-input")

const nameDisplay = document.getElementById("name-display")
const usernameDisplay = document.getElementById("username-display")
const profImgDisplay = document.getElementById("profimg-display")
const bioDisplay = document.getElementById("bio-display")
const dateCreatedDisplay = document.getElementById("created-display")
const dateUpdatedDisplay = document.getElementById("last-updated-display")
const followersDisplay = document.getElementById("followers-display")
const followingDisplay = document.getElementById("following-display")
const reposDisplay = document.getElementById("public-repos-display")
const emailDisplay = document.getElementById("email-display")
const locationDisplay = document.getElementById("location-display")
const companyDisplay = document.getElementById("company-display")
const blogDisplay = document.getElementById("blog-display")

async function fetchUser(username) {
    const url = `https://api.github.com/users/${username}`
    try {
        const response = await fetch(url)
        const result = await response.json()
        return result
    }
    catch (error) {
        console.error(error.message)
    }
}

fetchBtn.addEventListener("click", async ()=> {
    const userData = await fetchUser(usernameInput.value)

    nameDisplay.textContent = userData.name
    usernameDisplay.textContent = userData.login
    profImgDisplay.src = userData.avatar_url
    bioDisplay.textContent = userData.bio 
    dateCreatedDisplay.textContent = `Date Created: ${new Date(userData.created_at).toDateString()}`
    dateUpdatedDisplay.textContent = `Last Updated: ${new Date(userData.updated_at).toDateString()}`
    followersDisplay.textContent = `Followers: ${userData.followers}`
    followingDisplay.textContent = `Following: ${userData.following}`
    reposDisplay.textContent = `Public Repositories: ${userData.public_repos}`
    emailDisplay.innerHTML = userData.email ? `Email: <a href="${userData.email}">` : ""
    locationDisplay.textContent = userData.location
    companyDisplay.textContent = userData.company
    blogDisplay.textContent = userData.blog ? `Blog: ${userData.blog}` : ""
})
