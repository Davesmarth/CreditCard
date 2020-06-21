const card = document.querySelector("#card"),
      form = document.querySelector("#form-card"),
      btnOpen = document.querySelector('#btn-open'),
      cardFrontedNumber = document.querySelector("#numberCredit .numberCredit"),
      cardName = document.querySelector('#name'),
      cardSignature = document.querySelector('#signature'),
      cardccv = document.querySelector('#ccv'),
      cardmonth = document.querySelector('#cardMonth'),
      cardYear = document.querySelector('#cardYear'),
      cardLogo = document.querySelector('.card-fronted-logos');


//Fecha obtenida por el sistema
let currentyear = new Date().getFullYear();

for(let i = 1; i < 13; i++){
    let months = document.createElement('option');
    months.value = i;
    months.innerText = i;
    form.month.appendChild(months);
}

for(let i = currentyear; i < currentyear + 8; i++){
    let years = document.createElement('option');
    years.value = i;
    years.innerText = i;
    form.year.appendChild(years);
}

//Mostrar las caras de la tarejeta de forma dinamica
const showFaces = () => {
    if(card.classList.contains('active')) return card.classList.remove('active')
}

//evenrtos de la logica de la tarjeta
card.addEventListener('click', ()=>{
    card.classList.toggle("active") //Evento que rota la cara de la tarjeta
})

btnOpen.addEventListener('click', () => {
    btnOpen.classList.toggle('active');
    form.classList.toggle('active');
})

//Rellena los numeros de la tarjeta de credito o debito
form.inputNumber.addEventListener('keyup', (e) => {
    let valInput = e.target.value;

    form.inputNumber.value = valInput
    // Eliminamos espacios en blanco
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
    .trim();
    
    cardFrontedNumber.textContent = valInput; //Asigna los numeros del input a la tarjeta en tiempo real
    const imgLogo = document.createElement('img');
    //Resteamos los logos y numeros y asgnamos los logos en dependencia del primer numero
    if(valInput == ''){
        cardFrontedNumber.textContent = '#### #### #### ####';
        cardLogo.innerHTML = '<img src=\"img/Mebyte.svg\" alt=\"\" class=\"card-fronted-logo-bank\" width=\"90\">';
    }

    switch (valInput[0]) {
        case '4':
            cardLogo.innerHTML = '<img src=\"img/Mebyte.svg\" alt=\"\" class=\"card-fronted-logo-bank\" width=\"90\">';
            imgLogo.src = 'img/Credit-logo/visa.png';
            cardLogo.appendChild(imgLogo);
            break;
        case '5':
            cardLogo.innerHTML = '<img src=\"img/Mebyte.svg\" alt=\"\" class=\"card-fronted-logo-bank\" width=\"90\">';
            imgLogo.src = 'img/Credit-logo/mastercard.png';
            cardLogo.appendChild(imgLogo);
            break;
    }

    showFaces();
})

form.inputName.addEventListener('keyup', (e) => {
    //Generamos la entrada del nombre y asignamos a la cara de la tarjeta de credito, mostrar la cara adecuada
    let valInput = e.target.value;

    form.inputName.value = valInput
        .replace(/([0-9])/g, '');

    cardName.textContent = valInput;
    cardSignature.textContent = valInput;
    //Resetea el campo del nombre
    if(valInput == '') return cardName.textContent = 'Jhon Doe';


    showFaces();
})

form.inputCcv.addEventListener('keyup', (e) => {
    //Asignamos los valores al campo CCV
    let valInput = e.target.value;

    form.inputCcv.value = valInput
        //Elimina los espcios en blancos
        .replace(/\s/g, '')
        //Elimina las letras
        .replace(/\D/g, '');

    cardccv.textContent = valInput;

    if(valInput = '') return cardccv.textContent = '';    
    if(!card.classList.contains('active')) return card.classList.toggle('active')
})

//Asignamos año y mes a los campos correpondientes

form.month.addEventListener('change', (e) => {
    cardmonth.textContent = e.target.value;
    showFaces();
})

form.year.addEventListener('change', (e) => {
    cardYear.textContent = e.target.value;
    showFaces;
})

