let ordersRow = document.getElementById('ordersRow');
let orderForm = document.getElementById('orderInputForm');
let confirmationForm = document.getElementById('deliveryMethod');

let confirmationOrderButton = document.getElementById('orderNowButton');

let name = document.getElementById('nameInput');
let meal = document.getElementById('mealInput');
let side = document.getElementById('sideInput');
let drink = document.getElementById('drinkInput');
let time = document.getElementById('timeSelect');

let backButton = document.getElementById('backButton');
let togoBtn = document.getElementById('togo');
let stay = document.getElementById('stay');

let togo = false;

orderForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let nameValid,
        mealValid,
        sideValid,
        drinkValid = true;

    if (!name.value) {
        nameValid = false;
        name.classList.add('incorrectInput')
    } else {
        nameValid = true;
        name.classList.remove('incorrectInput')
    }

    if (!meal.value) { 
        mealValid = false;
        meal.classList.add('incorrectInput')
    } else {
        mealValid = true;
        meal.classList.remove('incorrectInput')
    }

    if (!side.value){ 
        sideValid = false;
        side.classList.add('incorrectInput')
    } else {
        sideValid = true;
        side.classList.remove('incorrectInput')
    }

    if (drink.value === 'Drink') {
        drinkValid = false;
        drink.classList.add('incorrectInput')
    } else {
        drinkValid = true;
        drink.classList.remove('incorrectInput')
    }

    if (nameValid && mealValid && sideValid && drinkValid) {
        document.getElementById('menuOptions').classList.add('displayNone');
        document.getElementById('orderConfirmation').classList.remove('displayNone');
        togo = false;
    }
});

backButton.addEventListener('click', () => {
    document.getElementById('menuOptions').classList.remove('displayNone');
        document.getElementById('orderConfirmation').classList.add('displayNone');
});

togoBtn.addEventListener('click', () => {
    togo = true;
});

stay.addEventListener('click', () => {
    togo = false;
});

confirmationForm.addEventListener('submit', (event) => {
    event.preventDefault();
});

orderNowButton.addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('menuOptions').classList.remove('displayNone');
    document.getElementById('orderConfirmation').classList.add('displayNone');
    
    let newOrder = new Object();
    newOrder.customerName =`${name.value}`;
    newOrder.orderMeal =`${meal.value}`;
    newOrder.orderSide =`${side.value}`;
    newOrder.orderDrink =`${drink.value}`;
    newOrder.orderTogo =`${togo}`;
    newOrder.orderTime =`${time.value}`;

    console.log(newOrder.customerName);
    console.log(newOrder.orderMeal);
    console.log(newOrder.orderSide);
    console.log(newOrder.orderDrink);
    console.log(newOrder.orderTogo);
    console.log(newOrder.orderTime);

    axios.post('http://localhost:3000/orders', newOrder).then(response => {
        showOders(response.data)
    }).catch(error => console.log(error));

    alert('order added');

    togoBtn.style.backgroundColor = 'white';
    stay.style.backgroundColor = 'white'
    stay.style.color = 'black';
    togoBtn.style.color = 'black';
    name.value = '';
    meal.value = '';
    side.value = '';
    drink.value = 'Drink';
});

togoBtn.addEventListener('click', () => {
    togoBtn.style.backgroundColor = '#04aa6d';
    stay.style.backgroundColor = '#282a35'

    stay.style.color = '#444444';
    togoBtn.style.color = 'white';
});

stay.addEventListener('click', () => {
    stay.style.backgroundColor = '#04aa6d';
    togoBtn.style.backgroundColor = '#282a35'
    
    stay.style.color = 'white';
    togoBtn.style.color = '#444444';
});

let showOders = (orderedOrders) => {

    while (ordersRow.firstChild) {
        ordersRow.removeChild(ordersRow.firstChild);
    }

    for (let i = 0; i < orderedOrders.length; i++) {
        let emptyOrder = document.createElement('div');
        emptyOrder.id = 'emptyOrder';

        let emptyDetails = document.createElement('div');
        emptyDetails.id = 'emptyDetails';
        emptyOrder.appendChild(emptyDetails);

        let name = document.createElement('p');
        name.textContent = orderedOrders[i].customerName;
        emptyDetails.appendChild(name);

        let emptyOrderDetails = document.createElement('div');
        emptyOrderDetails.id = 'emptyOrderDetails';
        emptyDetails.appendChild(emptyOrderDetails);

        let meal = document.createElement('p');
        meal.textContent = orderedOrders[i].orderMeal;
        emptyOrderDetails.appendChild(meal);

        let side = document.createElement('p');
        side.textContent = orderedOrders[i].orderSide;
        emptyOrderDetails.appendChild(side);

        let drink = document.createElement('p');
        drink.textContent = orderedOrders[i].orderDrink;
        emptyOrderDetails.appendChild(drink);

        let emptyOrderTime = document.createElement('div');
        emptyOrderTime.id = 'emptyOrderTime';
        emptyOrder.appendChild(emptyOrderTime);

        let time = document.createElement('p');
        time.textContent = orderedOrders[i].orderTime;
        if (orderedOrders[i].orderTogo === 'true') {
            time.textContent = 'TOGO | ' + orderedOrders[i].orderTime;
        }
        emptyOrderTime.appendChild(time);

        document.getElementById('ordersRow').appendChild(emptyOrder);
    }
}