const fetchBtn = document.getElementById("fetch-profile-btn")
const usernameInput = document.getElementById("username-input")
const card = document.querySelector('.display-card')

function clearCard() {
    const ids = [
        'name-display','username-display','bio-display','location-display','company-display',
        'created-display','last-updated-display','followers-display','following-display','public-repos-display',
        'email-display','blog-display'
    ]
    ids.forEach(id => {
        const el = document.getElementById(id)
        if (!el) return
        if (id === 'blog-display' || id === 'email-display') el.innerHTML = ''
        else el.textContent = ''
    })
    const profImg = document.getElementById('profimg-display')
    if (profImg) profImg.src = ''
    if (card) card.classList.remove('loaded')
}

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
    if (id == "username-display") {
        el.textContent = `// ${text}` || ""
    }
    else el.textContent = text || ""
}

async function loadProfile(username) {
    if (!username) return
    const userData = await fetchUser(username)
    if (!userData || userData.message === "Not Found") {
        alert("User not found")
        clearCard()
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

    if (card) card.classList.add('loaded')
    usernameInput.value = ''
}

fetchBtn.addEventListener('click', () => loadProfile(usernameInput.value.trim()))

usernameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        loadProfile(usernameInput.value.trim())
    }
})

// ensure card starts cleared
clearCard()

