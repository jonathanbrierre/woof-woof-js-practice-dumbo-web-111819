const dogBar = document.querySelector('#dog-bar')
const dogInfoDiv = document.querySelector('#dog-info')
const goodDogFilter = document.querySelector('#good-dog-filter')


//PYRAMID OF DOOOOOOOOOOOMMMM
fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(dogs => {
        dogs.forEach(dog =>{
            const dogSpan = document.createElement('span');
            dogSpan.innerText = dog.name
            dogSpan.addEventListener('click', e=>{
                dogInfoDiv.innerHTML = ''
                let dogImg = document.createElement('img');
                    dogImg.src = dog.image
                let dogName = document.createElement('h2');
                    dogName.textContent = dog.name
                let dogButton = document.createElement('button')
                    dogButton.textContent = ( dog.isGoodDog ? 'Good Dog!': 'Bad Dog!')
                    dogButton.addEventListener('click', e => {
                        fetch(`http://localhost:3000/pups/${dog.id}`)
                            .then(resp => resp.json())
                            .then(doggo => {
                                let dogBool = doggo.isGoodDog
                            const configObj = {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json'
                                },
                                body: JSON.stringify({
                                    isGoodDog: !dogBool
                                })
                            }
                            fetch(`http://localhost:3000/pups/${dog.id}`, configObj)
                                .then(resp =>resp.json())
                                .then(json => {
                                    // console.log(json)
                                    dogButton.textContent = ( json.isGoodDog ? 'Good Dog!': 'Bad Dog!')
                                })
                            })
                    })
                dogInfoDiv.append(dogImg, dogName, dogButton)
            })
            dogBar.append(dogSpan)
        })
    })

goodDogFilter.addEventListener('click', e=>{
    const filterToggle = goodDogFilter.querySelector('span')
    if(filterToggle.textContent === 'OFF'){

    } else {
        filterToggle.textContent = 'OFF'
    }
    
})

