'use strict'

function showCategories(categories) {
    const categoriesContainer = document.querySelector('.categories');

    categories.forEach(category => {
        const categoryRow = document.createElement('div');
        categoryRow.textContent = category.name;
        categoryRow.setAttribute('data-category-name', category.key);
        categoryRow.addEventListener('click', catchSelectedCategory);
        categoriesContainer.append(categoryRow);
    })
}

function catchSelectedCategory(event) {
    const categoryName = event.target.getAttribute('data-category-name');
    showProductsByCategory(categoryName);
}

function showProductsByCategory(categoryName) {
    const productsContainer = document.querySelector('.products');
    productsContainer.innerHTML = '';
    const selectedCategoryArr = productsData[categoryName];

    for (let i = 0; i < selectedCategoryArr.length; i++) {
        const productsRow = document.createElement('div');
        productsRow.textContent = selectedCategoryArr[i].name;
        productsRow.setAttribute('data-product-category', categoryName);
        productsRow.setAttribute('data-product-id', selectedCategoryArr[i].id);
        productsRow.addEventListener('click', catchSelectedProduct);
        productsContainer.append(productsRow);
    }  
}

function catchSelectedCategory(event) {
    const categoryName = event.target.getAttribute('data-category-name');
    showProductsByCategory(categoryName);
}

function catchSelectedProduct(event) {
    const productCategory = event.target.getAttribute('data-product-category');
    const productId = event.target.getAttribute('data-product-id');
    const selectedCategory = productsData[productCategory];
    
    for (let i = 0; i < selectedCategory.length; i++) {
        if (selectedCategory[i].id == productId) {
            const selectedProduct = selectedCategory[i];
            selectedProductPrice = selectedProduct.price;
            showProductByProducts(selectedProduct);
        }
    }
}

function showProductByProducts(selectedProduct) {
    const productInfoContainer = document.querySelector('.product');
    productInfoContainer.innerHTML = '';
    const productName = document.createElement('div');
    productName.textContent = 'Name of product: ' + selectedProduct.name;
    productInfoContainer.append(productName);

    const productPrice = document.createElement('div');
    productPrice.textContent = 'Price: ' + selectedProduct.price + '$';
    productInfoContainer.append(productPrice);

    const productDescription = document.createElement('div');
    productDescription.textContent = 'Description: ' + selectedProduct.description;
    productInfoContainer.append(productDescription);

    const buyBtn = document.createElement('button');
    buyBtn.setAttribute('class', 'buy-btn');
    buyBtn.textContent = 'BUY ME';
    buyBtn.addEventListener('click', showUserForm);
    productInfoContainer.append(buyBtn);
}

function showUserForm() {
    const userForm = document.forms[0];
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.addEventListener('click', handleUserInfo);
    userForm.classList.remove('hide');
}

function handleUserInfo(event) { 
    event.preventDefault(); 
    const userForm = document.forms[0];

    for (let i = 0; i < userForm.length; i++) {
        if (userForm[i].type === 'number' && userForm[i].value < 1) {
            return showErrorMessage(userForm);
        }

        if (!userForm[i].value && userForm[i].hasAttribute('required')) {
            return showErrorMessage(userForm);
        }
        console.log(!userForm[i].value)
        console.log(userForm[i].hasAttribute('required'))
        console.log(userForm[i])
    }
    return showUserInfo();
}

function showErrorMessage(userForm) {
    const errorMessage = document.createElement('div');
    errorMessage.textContent = 'Please, fill correctly all requirement inputs';
    userForm.append(errorMessage);
}

function showUserInfo() {
    const userForm = document.forms[0];
    userForm.classList.add('hide');
    const productsBlock = document.querySelector('.wrapper');
    productsBlock.classList.add('hide');
    const infoContainer = document.querySelector('.user-info');

    const userName = document.createElement('div');
    userName.textContent = 'Your name: ' + userForm[0].value;
    infoContainer.append(userName);

    const userCity = document.createElement('div');
    userCity.textContent = 'Your city: ' + userForm[1].value;
    infoContainer.append(userCity);

    const payMethod = document.createElement('div');
    payMethod.textContent = 'Pay method: ' + userForm[2].value;
    infoContainer.append(payMethod);

    const amountOfProducts = document.createElement('div');
    amountOfProducts.textContent = 'Amount of products: ' + userForm[3].value;
    infoContainer.append(amountOfProducts);

    const totalPrice = document.createElement('div');
    totalPrice.textContent = 'Total price: ' + userForm[3].value * selectedProductPrice + '$';
    console.log(userForm[3].value)
    infoContainer.append(totalPrice);
}




