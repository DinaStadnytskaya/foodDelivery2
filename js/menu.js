const cardsMenu = document.querySelector('.cards-menu');
const cartArray = localStorage.getItem('cart') ?
   JSON.parse(localStorage.getItem('cart')) : []
const changeTitle = (restaurant) => {
   const restaurantTitle = document.querySelector('.restaurant-title')
   restaurantTitle.textContent = restaurant.name
}

const addToCart = (cartItem) => {
   if (cartArray.some((item) => item.id === cartItem.id)) {
      cartArray.map((item => {
         if (item.id === cartItem.id) {
            item.count += 1
         }
         return item
      }))
   } else {
      cartArray.push(cartItem);
   }
   localStorage.setItem('cart', JSON.stringify(cartArray));
}
const renderProducts = (data) => {
   data.forEach(({ id, name, description, price, image }) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `     
             <div class="card-top">
             <img src="${image}" alt="${name}">
             </div>  <!--/ card-top-->
             <div class="card-text">
               <div class="card-headline">
                  <div class="card-titleanother">${name}</div>
                   <strong class="card-price-bold">${price} грн.</strong>
               </div>
               <!--/ card-headline-->
               <div class="card-addition">
                  <div class="ingredients">${description}
                  </div>
                  <!--/ingredients -->
               </div>
               <!--/ card-addition-->              
              </div>  <!--/card-text-->    
               <div class="card-buttons">               
               <button class="btn green button-add-cart">
                  В корзину                  
               </button>
               </div>
               <!--/card-buttons -->               
      `
      card.querySelector('.button-add-cart').addEventListener('click', () => {
         addToCart({ name, price, id, count: 1 });
      })
      cardsMenu.append(card);
   })
}
fetch('./db/Palki-Skalki.json')
   .then((response) => response.json())
   .then((data) => {
      renderProducts(data)
   })
   .catch((error) => {
      console.log(error);
   })

