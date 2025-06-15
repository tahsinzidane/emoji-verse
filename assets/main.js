import { emojis, categoryIcons } from './emojis.js'

const sidebar = document.getElementById('sidebar')
const emojiContainer = document.getElementById('emojiContainer')
const searchInput = document.getElementById('searchInput')
const toast = document.getElementById('toast')

let selectedCategory = 'Home'

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

    // Home view = show all categories with filtered results
    if (selectedCategory === 'Home') {
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
    navigator.clipboard.writeText(char).then(() => {
        toast.style.display = 'block'
        setTimeout(() => toast.style.display = 'none', 1500)
    })
}

searchInput.addEventListener('input', renderEmojis)

renderSidebar()
renderEmojis()
