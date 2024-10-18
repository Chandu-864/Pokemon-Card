
async function search() {

    try {

        const errorText = document.getElementById('error-message');
        errorText.style.display = 'none';

        const input = document.getElementById("pokemon").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

        if (!response.ok) {
            throw new Error("Pokemon not found")
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;

        const imageDisplay = document.getElementById('imageDisplay');

        imageDisplay.src = pokemonSprite;

        const pokemonName = document.getElementById('pokemonname');
        pokemonName.textContent = data.name.toUpperCase();


        //-----------background-color

        const responseSpecies = await fetch(data.species.url);
        const responseData = await responseSpecies.json();
        const colorCode = responseData.color.name;

        document.body.style.backgroundColor = colorCode;


        //---getting pokemon properties using span tag

        const properties = document.querySelectorAll("span");
        properties[0].textContent = "Ability-1: " + data.abilities[0].ability.name.charAt(0).toUpperCase() + data.abilities[0].ability.name.slice(1);
        properties[1].textContent = "Ability-2: " + data.abilities[1].ability.name.charAt(1).toUpperCase() + data.abilities[1].ability.name.slice(1);

        properties[2].textContent = "Type: " + data.types[0].type.name.charAt(0).toUpperCase() + data.types[0].type.name.slice(1);
        
        properties[3].textContent = "Move: " + data.moves[0].move.name;

        properties[4].textContent = "Height: " + data.height + " dm";
        properties[5].textContent = "Weight: " + data.weight + " hg";

        properties[6].textContent = "Base Experience: " + data.base_experience;


        properties[7].textContent = "Number of Moves: " + data.moves.length;

        // properties[7].textContent = "Held Item: " + (data.held_items[0] ? data.held_items[0].item.name : "None");

        //--------------pokemon audio

        const pokemonAudio = document.getElementById('pokemon-audio');
        pokemonAudio.src = data.cries.latest;
        pokemonAudio.load();

        const result = document.getElementById('result');
        result.style.animation = "none";
        void result.offsetWidth;
        result.style.display = 'flex';
        result.style.animation = 'fade-in 0.6s ease forwards';
    }
    catch(error) {
        const result = document.getElementById('result');
        result.style.display = 'none';
        
        const errorText = document.getElementById('error-message');
        errorText.style.display = 'block';

        document.body.style.backgroundColor = '#FFF5EE';

        const input = document.getElementById("pokemon").value

        errorText.innerHTML = `Sorry, I can't find "${input}" `;
    }

}

const enterOption = document.getElementById('pokemon');

enterOption.addEventListener('keypress', function(e) {
    if (e.key === "Enter") {
        search();
    };
});

async function sample() {
    const sample =await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")

    const data = await sample.json();
    console.log(data);
}

sample();
