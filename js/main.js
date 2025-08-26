var productName = document.getElementById("ProductName");
var productPrice=document.getElementById("productPrice");
var productQuantity=document.getElementById("productQuantity");
var productCategory=document.getElementById("ProductCategory");
var productDescription=document.getElementById("Productdesc");
var productImage=document.getElementById("Productimage");
var dataRows=document.getElementById("DataRow");
var addButton=document.getElementById("addBttn");
var updateButton=document.getElementById("updateBttn");
var searchInput=document.getElementById("SearchInput");
var currentIndex;
var productList;

if(JSON.parse(localStorage.getItem("Products"))!==null)
    { 
        productList=JSON.parse(localStorage.getItem("Products"));
       displayProduct(productList)
    }
    else{
        productList=[];
    }
function addPrpduct(){
var product={
    name:productName.value,
    price:productPrice.value,
    description:productDescription.value,
   category:productCategory.value,
   quantity:productQuantity.value,
    image:"imges/"+productImage.files[0]?.name
}
productList.push(product);
localStorage.setItem("Products",JSON.stringify(productList))
console.log(productList);
displayProduct(productList);
clear();  
}
function clear(){
    productName.value="";
    productPrice.value='';
    productDescription.value="";
    productCategory.value="";
    productQuantity.value="";
    productImage.value=""
}
function displayProduct(arr){
   
    
    if(arr.length==0){
        dataRows.innerHTML=`<h2 class="text-center text-muted">Product List is empty </h2>`
        
    }
    else{

        var container='';
        for(var i=0;i<arr.length;i++){
            container+=`
             <div class="col-lg-3 col-md-6">
                        
                            <div class="card shadow-lg" >
                                <img src=${arr[i].image} class="card-img-top w-100" alt="...">
                                <div class="card-body">
                                    <h4 class="card-title">${arr[i].name}</h4>
                                    <p class="card-text">${arr[i].description}</p>
                                        <h5>Price: <span>${arr[i].price}</span></h5>
                                        <h5>Category: <span>${arr[i].category}</span></h5>
                                        <h5>Quantity: <span>${arr[i].quantity}</span></h5>
                                   <div class="d-flex justify-content-around  pt-2">
                                       <button class="btn  text-white upd px-3"  onclick="helpUpdate(${i})"><a href="#home">Update</a></button>
                                    <button class="btn delet text-white px-3" onclick="deleteProduct(${i})">Delete</button>
                                   </div>
                                </div>
                            
                        </div>
                    </div>
            `
        }
        dataRows.innerHTML=container;
    }


}
function deleteProduct(index){
productList.splice(index,1);
displayProduct(productList);
localStorage.setItem("Products",JSON.stringify(productList))
}
function helpUpdate(index) {
    currentIndex=index;
    productName.value=productList[currentIndex].name;
    productPrice.value=productList[currentIndex].price;
    productCategory.value=productList[currentIndex].category;
    productQuantity.value=productList[currentIndex].quantity;
    productDescription.value=productList[currentIndex].description;
    productImage.src="imges/"+productList[currentIndex].image;
     productImage.value = "";
    addButton.classList.add("d-none");
    addButton.classList.remove("d-block");
    updateButton.classList.add("d-block");
    updateButton.classList.remove("d-none")
    
}
function updateProduct(){
    productList[currentIndex].name=productName.value;
    productList[currentIndex].price=productPrice.value;
    productList[currentIndex].description=productDescription.value;
    productList[currentIndex].quantity=productQuantity.value;
    productList[currentIndex].image="imges/"+productImage.files[0]?.name;
    productList[currentIndex].category=productCategory.value;
    clear();
    addButton.classList.replace("d-none","d-block");
    updateButton.classList.replace("d-block","d-none");
    displayProduct(productList);
    localStorage.setItem("Products",JSON.stringify(productList))
}

function search(){
  var searchValue=searchInput.value;
   var searchList=[];
  for(var i=0;i<productList.length;i++){
    if(productList[i].name.toUpperCase().includes(searchValue.toUpperCase())){
      console.log(productList[i])
      searchList.push(productList[i]);
    }

  }
  displayProduct(searchList)
}