const app_id = "62b8e9d0"
const app_key = "a0346239bb6b1dd70086069089a17bc7"

const query = document.querySelector('header.search input')
const search = document.querySelector('header.search button')
const container = document.querySelector('.recipies')
const cards = document.querySelector('section.cards')

const genreateCard = (image,label,mealType,time,link,calories,ingredients) => `



<aside>

    <img src="${image}" alt="Chai Oatmeal" />

    <a href="${link}" class="button"><span class="icon icon-play"></span></a>

</aside>

<article>

    <h2>${label}</h2>
    <h3>${mealType}</h3>

    <ul>
        <li><span class="icon icon-users"></span><span>1</span></li>
        <li><span class="icon icon-clock"></span><span>${time} min</span></li>
        <li><span class="icon icon-level"></span><span>Beginner level</span></li>
        <li><span class="icon icon-calories"></span><span>${calories.toFixed(2)}</span></li>
    </ul>

    <p class="ingredients"><span>Ingredients:&nbsp;</span>
    <ul>${ingredients.map(i=>`<ul>${i.text}</ul>`).join('')}</ul>    
    </p>

</article>


`

const handleSearch = async () => {
    try {

        const endpoint = `https://api.edamam.com/search?q=${query.value}&app_id=${app_id}&app_key=${app_key}`
        const response = await fetch(endpoint)
        const { hits } = await response.json()

        hits.map(({ recipe }) => {
            console.log(recipe)
            const {image, label, url, calories,mealType,totalTime,ingredients} = recipe
            const ele = document.createElement('div')
            ele.classList.add('recipe-card')
            ele.innerHTML = genreateCard (image,label,mealType[0],totalTime,url,calories,ingredients)
            cards.appendChild(ele)
        })
    } catch (error) {
        console.log(error)
    }
}

search.addEventListener('click', handleSearch)