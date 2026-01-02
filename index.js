const fetchBtn = document.getElementById("fetch-profile-btn")
const usernameInput = document.getElementById("username-input")

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

function setDisplay(id, text) {
    const el = document.getElementById(id)
    if (!el) return
    el.textContent = text || ""
}

fetchBtn.addEventListener("click", async () => {
    const userData = await fetchUser(usernameInput.value.trim())
    if (!userData || userData.message === "Not Found") {
        alert("User not found")
        return
    }

    const elMaps = [
        { id: 'name-display', prop: 'name' },
        { id: 'username-display', prop: 'login' },
        { id: 'bio-display', prop: 'bio' },
        { id: 'location-display', prop: 'location' },
        { id: 'company-display', prop: 'company' }
    ]

    elMaps.forEach(({ id, prop }) => setDisplay(id, userData[prop]))

    const profImg = document.getElementById('profimg-display')
    if (profImg) profImg.src = userData.avatar_url || ''

    setDisplay('created-display', userData.created_at ? `Date Created: ${new Date(userData.created_at).toDateString()}` : '')
    setDisplay('last-updated-display', userData.updated_at ? `Last Updated: ${new Date(userData.updated_at).toDateString()}` : '')
    setDisplay('followers-display', userData.followers != null ? `Followers: ${userData.followers}` : '')
    setDisplay('following-display', userData.following != null ? `Following: ${userData.following}` : '')
    setDisplay('public-repos-display', userData.public_repos != null ? `Public Repositories: ${userData.public_repos}` : '')

    const emailEl = document.getElementById('email-display')
    if (emailEl) {
        if (userData.email) {
            emailEl.innerHTML = `Email: <a href="mailto:${userData.email}">${userData.email}</a>`
        } else {
            emailEl.textContent = ''
        }
    }

    const blogEl = document.getElementById('blog-display')
    if (blogEl) {
        if (userData.blog) {
            const url = userData.blog.startsWith('http') ? userData.blog : `https://${userData.blog}`
            blogEl.innerHTML = `Blog: <a href="${url}" target="_blank" rel="noopener noreferrer">${userData.blog}</a>`
        } else {
            blogEl.textContent = ''
        }
    }
})
