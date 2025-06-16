import { emojis, categoryIcons } from './emojis.js'

const sidebar = document.getElementById('sidebar')
const emojiContainer = document.getElementById('emojiContainer')
const searchInput = document.getElementById('searchInput')
const toast = document.getElementById('toast')

let selectedCategory = 'Home'

const RECENT_KEY = 'recentEmojis'
const MAX_RECENTS = 20

function getRecentEmojis() {
    return JSON.parse(localStorage.getItem(RECENT_KEY)) || []
}

function saveRecentEmoji(char, name) {
    const recents = getRecentEmojis().filter(e => e.char !== char)
    recents.unshift({ char, name })
    localStorage.setItem(RECENT_KEY, JSON.stringify(recents.slice(0, MAX_RECENTS)))
}

// Add Home icon manually
const fullCategoryIcons = { Home: '🏠', ...categoryIcons }

// Render Sidebar with Home
function renderSidebar() {
    sidebar.innerHTML = ''
    Object.entries(fullCategoryIcons).forEach(([category, icon]) => {
        const btn = document.createElement('button')
        btn.innerText = icon
        btn.title = category
        btn.classList.toggle('active', category === selectedCategory)
        btn.onclick = () => {
            selectedCategory = category
            updateSidebar()
            renderEmojis()
        }
        sidebar.appendChild(btn)
    })
}

function updateSidebar() {
    Array.from(sidebar.children).forEach(btn => {
        btn.classList.toggle('active', btn.title === selectedCategory)
    })
}

function renderEmojis() {
    const query = searchInput.value.toLowerCase()
    emojiContainer.innerHTML = ''

    // Home view = show recents + all categories
    if (selectedCategory === 'Home') {
        const recents = getRecentEmojis().filter(e =>
            e.name.toLowerCase().includes(query)
        )

        if (recents.length) {
            const recentDiv = document.createElement('div')
            recentDiv.className = 'emoji-category'

            const header = document.createElement('h3')
            header.innerText = 'Recently Used'
            recentDiv.appendChild(header)

            const grid = document.createElement('div')
            grid.className = 'emoji-grid'

            recents.forEach(emoji => {
                const span = document.createElement('span')
                span.className = 'emoji'
                span.innerText = emoji.char
                span.title = `Click to copy: ${emoji.name}`
                span.onclick = () => copyEmoji(emoji.char)
                grid.appendChild(span)
            })

            recentDiv.appendChild(grid)
            emojiContainer.appendChild(recentDiv)
        }

        Object.entries(emojis).forEach(([category, list]) => {
            const filtered = list.filter(e => e.name.toLowerCase().includes(query))
            if (!filtered.length) return

            const categoryDiv = document.createElement('div')
            categoryDiv.className = 'emoji-category'

            const header = document.createElement('h3')
            header.innerText = category
            categoryDiv.appendChild(header)

            const grid = document.createElement('div')
            grid.className = 'emoji-grid'

            filtered.forEach(emoji => {
                const span = document.createElement('span')
                span.className = 'emoji'
                span.innerText = emoji.char
                span.title = `Click to copy: ${emoji.name}`
                span.onclick = () => copyEmoji(emoji.char)
                grid.appendChild(span)
            })

            categoryDiv.appendChild(grid)
            emojiContainer.appendChild(categoryDiv)
        })
    } else {
        const list = emojis[selectedCategory] || []
        const filtered = list.filter(e => e.name.toLowerCase().includes(query))

        if (!filtered.length) return

        const categoryDiv = document.createElement('div')
        categoryDiv.className = 'emoji-category'

        const header = document.createElement('h3')
        header.innerText = selectedCategory
        categoryDiv.appendChild(header)

        const grid = document.createElement('div')
        grid.className = 'emoji-grid'

        filtered.forEach(emoji => {
            const span = document.createElement('span')
            span.className = 'emoji'
            span.innerText = emoji.char
            span.title = `Click to copy: ${emoji.name}`
            span.onclick = () => copyEmoji(emoji.char)
            grid.appendChild(span)
        })

        categoryDiv.appendChild(grid)
        emojiContainer.appendChild(categoryDiv)
    }
}

function copyEmoji(char) {
    const name = Object.values(emojis).flat().find(e => e.char === char)?.name || 'Unknown'
    saveRecentEmoji(char, name)

    navigator.clipboard.writeText(char).then(() => {
        toast.style.display = 'block'
        setTimeout(() => toast.style.display = 'none', 1500)
        renderEmojis() // re-render to show recent updates
    })
}

searchInput.addEventListener('input', renderEmojis)

renderSidebar()
renderEmojis()
