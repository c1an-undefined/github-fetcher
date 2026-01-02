const fetchBtn = document.getElementById("fetch-profile-btn")
const usernameInput = document.getElementById("username-input")

async function fetchUser(username) {
    const url = `https://api.github.com/users/${username}`
    try {
        const response = await fetch(url)
        const result = await response.json()
        console.log(result)
    }
    catch (error) {
        console.error(error.message)
    }
}

fetchBtn.addEventListener("click", ()=> {
    fetchUser(usernameInput.value)
})
