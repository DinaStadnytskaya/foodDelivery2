const cartFunction = () => {
   const cartPage = document.getElementById('cartPage');
   const cartBody = document.getElementById('cartBody')
   const buttonSend = document.querySelector('#buttonSend')
   const priceTag = document.querySelector('.cartPricetag')

   //2
   const commonSum = (array) => {
      let sum = 0;
      for (let i = 0; i < array.length; i += 1) {
         let productSum = array[i].price * array[i].count;
         sum += productSum;
      }
      priceTag.innerText = `${sum} грн.`;
   }
   //3
   const resetCart = () => {
      cartBody.innerHTML = '';
      localStorage.removeItem('cart');
      priceTag.innerText = '0 грн.';
   }
   //4
   const plus = (id) => {
      const cartArray = JSON.parse(localStorage.getItem('cart'))
      cartArray.map((item) => {
         if (item.id === id) {
            item.count += 1;
         }
         return item
      })
      localStorage.setItem('cart', JSON.stringify(cartArray))
      renderCart(cartArray)
      commonSum(cartArray)
   }

   //5
   const minus = (id) => {
      const cartArray = JSON.parse(localStorage.getItem('cart'))
      cartArray.map((item) => {
         if (item.id === id) {
            item.count = item.count > 0 ? item.count - 1 : 0
         }
         return item
      })
      localStorage.setItem('cart', JSON.stringify(cartArray))
      renderCart(cartArray)
      commonSum(cartArray)
   }
   //6
   const renderCart = (data) => {
      cartBody.innerHTML = '';
      data.forEach(({ name, price, id, count }) => {
         sum = price * count;
         const cartProd = document.createElement('div');
         cartProd.classList.add('food-row');
         cartProd.innerHTML = `
                     <div class="food-name">${name}</div>
                     <div class="food-price">${price}</div>
                     <div class="food-counter">
                        <button class="counter-button minus" data-index="${id}">-</button>
                        <span class="counter">${count}</span>
                        <button class="counter-button plus" data-index="${id}">+</button>
                     </div>
                     <!--/food-counter -->
                     <div class="food-sum">${price * count}</div>
                     <div class="icon-close" data-index="${id}"></div>
                         `
         cartBody.append(cartProd);
      })
   }
   //7
   const removeFromCart = (id) => {
      const cartArray = JSON.parse(localStorage.getItem('cart'))
      let result = cartArray.filter(item => item.id !== id);
      localStorage.setItem('cart', JSON.stringify(result));
      renderCart(result)
      commonSum(result)
   }
   //8
   const emptyCart = (array) => {     
      const messageError2 = document.getElementById('messageError2');
      if (!array) {
         messageError2.innerHTML = 'Вкорзине не товаров!'
      }
    }
   //9
   cartBody.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('icon-close')) {
         e.target.closest('.food-row').innerText = '';
         removeFromCart(e.target.dataset.index);
      }
   })
   //https://jsonplaceholder.typicode.com/posts
   cartBody.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.target.classList.contains('plus')) {
         plus(e.target.dataset.index);
      } else if (e.target.classList.contains('minus')) {
         minus(e.target.dataset.index);
      }
   })
   //10
   buttonSend.addEventListener('click', () => {
      const cartArray = JSON.parse(localStorage.getItem('cart'))
      emptyCart(cartArray)
      const array = cartArray.map((item) => {
         const container = {};
         container.id = item.id;
         container.count = item.count;
         container.price = item.price;
         return container
      })
      const messageInfo = document.getElementById('messageInfo');
      const messageError = document.getElementById('messageError');
      const userName = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('icon_telephone').value;
      const address = document.getElementById('address').value;
      const form = document.getElementById('submitPageForm');
      if (!userName || !email || !phone || !address) {
         messageError.innerHTML = 'Проверьте правильность ввода данных!'
         return false;
      } else {
         messageError.innerHTML = '';
      }
      const object = {
         "name": userName,
         "email": email,
         "telephone": phone,
         "address": address,
         "order": array
      }
      localStorage.setItem('object', JSON.stringify(object));
      const objectToSend = localStorage.getItem('object')
      fetch('https://jsonplaceholder.typicode.com/posts', {
         method: 'POST',
         body: objectToSend
      })
         .then(response => {
            if (response.ok) {
               resetCart();
               form.reset();
               messageInfo.innerHTML = 'Спасибо за заказ!';
               priceTag.style.display = 'none';

            }
         }).catch(e => {
            console.error(e);
         })


   })
   if (localStorage.getItem('cart')) {
      const cartArray = JSON.parse(localStorage.getItem('cart'));
      renderCart(cartArray);
      commonSum(cartArray);
   }  
}

cartFunction();
