// Product Data - Shared across all pages
const allProducts = [
	{
		name: "Organic Spring Mix", price: "$35.00", oldPrice: "", rating: "★★★★☆", img: "https://images-cdn.ubuy.co.in/66e977cdf3858528d36b3a4c-organic-spring-mix-lettuce-5oz-good.jpg", badge: "Sale 50%", category: "Greens", sku: "OSM-001", description: "Fresh and organic spring mix salad greens delivered right to your doorstep. Our products are carefully selected to ensure the highest quality and freshness. Perfect for healthy meals and snacks.",
		images: [
			"https://images-cdn.ubuy.co.in/66e977cdf3858528d36b3a4c-organic-spring-mix-lettuce-5oz-good.jpg",
			"https://www.melissas.com/cdn/shop/products/image-of-organic-spring-mix-organics-14763692359724_400x400.jpg?v=1616834674",
			"https://gardenary-data.s3.amazonaws.com/section-image/scm3QHvzfuqkfHrUsZuxqxrYt4E8uKQz41yWVthO.jpg"
		]
	},
	{
		name: "Chocolate Sponge Cake", price: "$12.00", oldPrice: "", rating: "★★★★★", img: "https://www.labonelfinebaking.shop/wp-content/uploads/2021/02/TRIPLE-CHOCOLATE-CAKE.jpg", badge: "Save 30%", category: "Bakery", sku: "PCSC-002", description: "Delicious chocolate sponge cake from Pepperidge Farm. Moist and rich with premium chocolate flavor. Perfect for celebrations and everyday indulgence.",
		images: [
			"https://www.spatuladesserts.com/wp-content/uploads/2025/02/Chocolate-sponge-1.jpg",
			"https://www.labonelfinebaking.shop/wp-content/uploads/2021/02/TRIPLE-CHOCOLATE-CAKE.jpg",
			"https://recipesblob.oetker.co.uk/assets/be18e2a07b7748b6b004e346366cd914/1440x580/choc-victoria-sandwich-cake.webp"
		]
	},
	{
		name: "Chocolate Chips Cookies", price: "$18.00", oldPrice: "$26.00", rating: "★★★★★", img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800", badge: "", category: "Bakery", sku: "PBC-003", description: "Premium chocolate chips cookies from Patna Baked Shop. Made with real chocolate chips and finest ingredients. Crispy on the outside, soft on the inside.",
		images: [
			"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800",
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoY7zFqNrI_kC73HUZBbmlaOe9YnbNVl4N-w&s",
			"https://dancearoundthekitchen.com/wp-content/uploads/2025/01/DSC_0755-1.jpg"
		]
	},
	{
		name: "Fresh Organic Apple", price: "$10.00", oldPrice: "$15.00", rating: "★★★★☆", img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800", badge: "New", category: "Fruits", sku: "FA-004", description: "Get farm-fresh organic apples directly sourced from certified orchards. Perfectly crisp, juicy, and full of natural flavor — a healthy snack for everyone!",
		images: [
			"https://www.shutterstock.com/image-photo/red-apple-cut-half-water-600nw-2532255795.jpg",
			"https://assets.clevelandclinic.org/m/5846d1f42f48ff09/webimage-Apples-184940975-770x533-1_jpg.png",
			"https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=800"
		]
	},
	{
		name: "Green Broccoli Bunch", price: "$8.50", oldPrice: "", rating: "★★★★★", img: "https://t4.ftcdn.net/jpg/14/42/26/37/360_F_1442263733_76JmOGACga2UsSUyumrVLhUArpTSUBzP.jpg", badge: "", category: "Vegetables", sku: "GB-005", description: "Fresh green broccoli bunches, rich in vitamins and minerals. Perfect for steaming, roasting, or adding to your favorite dishes.",
		images: [
			"https://t4.ftcdn.net/jpg/14/42/26/37/360_F_1442263733_76JmOGACga2UsSUyumrVLhUArpTSUBzP.jpg",
			"https://media.istockphoto.com/id/579165978/photo/broccoli.jpg?s=612x612&w=0&k=20&c=n7JyR5LPZFig5Q8hH_10t3NsO0h_ceDdWo3djc1LlpI=",
			"https://www.meadowsfarms.com/great-big-greenhouse-gardening-blog/wp-content/uploads/sites/2/2022/07/bonnie-blog-broccoli.jpg.webp"
		]
	},
	{
		name: "Farm Fresh Milk", price: "$5.00", oldPrice: "$6.50", rating: "★★★★☆", img: "https://i.pinimg.com/736x/7f/c1/c5/7fc1c5db95a9a9285dad77699f8eae7b.jpg", badge: "Sale", category: "Dairy", sku: "FFM-006", description: "Fresh farm milk, pasteurized and packed with essential nutrients. Perfect for daily consumption and cooking needs.",
		images: [
			"https://i.pinimg.com/736x/7f/c1/c5/7fc1c5db95a9a9285dad77699f8eae7b.jpg",
			"https://www.urbangroc.com/wp-content/uploads/2022/03/Farm-Milk.jpg",
			"https://4.imimg.com/data4/BQ/JK/ANDROID-18518198/product-500x500.jpeg"
		]
	},
	{
		name: "Fresh Cheese (500g)", price: "$7.00", oldPrice: "$8.50", rating: "★★★★★", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG-d5ddXQF5GIsEk0h2wzNQ9S3YnIT5PnmnTpWz3yhxRSsc1MqvKWFouJS3E7wL4lEPQI&usqp=CAU", badge: "Hot", category: "Dairy", sku: "OBE-007", description: "Premium fresh cheese, creamy and flavorful. Perfect for sandwiches, salads, and cooking. Made from high-quality dairy.",
		images: [
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRG-d5ddXQF5GIsEk0h2wzNQ9S3YnIT5PnmnTpWz3yhxRSsc1MqvKWFouJS3E7wL4lEPQI&usqp=CAU",
			"https://tiimg.tistatic.com/fp/1/008/009/fresh-pure-delicious-healthful-original-flavor-yellow-cheese-slice-pack-of-1-kg-359.jpg",
			"https://www.dairyglobal.net/app/uploads/2021/09/001_748_IMG_DAG_16_WEBAlgaeinfeedforhealthymilkandcheese_creditDrea-scaled.jpg"
		]
	},
	{
		name: "Premium Basmati Rice (5kg)", price: "$25.00", oldPrice: "$30.00", rating: "★★★★★", img: "https://cpimg.tistatic.com/9505822/b/4/1121-basmati-rice.jpg", badge: "Save 20%", category: "Grains", sku: "PBR-008", description: "Premium quality basmati rice with long grains and aromatic flavor. Perfect for biryanis, pulao, and everyday meals.",
		images: [
			"https://cpimg.tistatic.com/9505822/b/4/1121-basmati-rice.jpg",
			"https://tiimg.tistatic.com/fp/1/009/371/premium-basmati-rice-160.jpg",
			"https://5.imimg.com/data5/SELLER/Default/2024/5/422559601/RS/SX/TG/180580710/long-basmati-rice-500x500.jpg"
		]
	},
	{
		name: "Whole Wheat Bread", price: "$3.00", oldPrice: "$4.00", rating: "★★★★☆", img: "https://i.pinimg.com/736x/9f/69/54/9f69540b19c0052b6fb8c5eeb9af5f5d.jpg", badge: "Fresh", category: "Bakery", sku: "WWB-009", description: "Freshly baked whole wheat bread, rich in fiber and nutrients. Perfect for sandwiches and toast. Made daily with natural ingredients.",
		images: [
			"https://i.pinimg.com/736x/9f/69/54/9f69540b19c0052b6fb8c5eeb9af5f5d.jpg",
			"https://www.earthytales.in/uploads/products/wholewheat-bread_(1).jpg",
			"https://www.spendwithpennies.com/wp-content/uploads/2024/10/Whole-Wheat-Bread-SpendWithPennies-16.jpg"
		]
	},
	{
		name: "Natural Peanut Butter", price: "$9.00", oldPrice: "$12.00", rating: "★★★★★", img: "https://cpimg.tistatic.com/05627777/b/4/500g-Natural-Peanut-Butter.jpg", badge: "", category: "Pantry", sku: "NPB-010", description: "100% natural peanut butter with no added sugar or preservatives. Creamy and delicious, perfect for breakfast and snacks.",
		images: [
			"https://cpimg.tistatic.com/05627777/b/4/500g-Natural-Peanut-Butter.jpg",
			"https://www.shutterstock.com/image-photo/tasty-peanut-butter-bowl-among-260nw-2494448771.jpg",
			"https://blog.myfitness.in/wp-content/uploads/2023/10/image-edited.jpeg"
		]
	},
	{
		name: "Organic Carrots (1kg)", price: "$6.00", oldPrice: "$7.50", rating: "★★★★☆", img: "https://i.pinimg.com/736x/03/78/b2/0378b2f99b9e2eb84900b58c51a9f6dc.jpg", badge: "", category: "Vegetables", sku: "OC-011", description: "Fresh organic carrots, crunchy and sweet. Rich in beta-carotene and vitamins. Perfect for salads, juicing, and cooking.",
		images: [
			"https://i.pinimg.com/736x/03/78/b2/0378b2f99b9e2eb84900b58c51a9f6dc.jpg",
			"https://www.chagrinvalleysoapandsalve.com/cdn/shop/collections/organic_carrots_1080.jpg?v=1667837205",
			"https://goodeggs4.imgix.net/39912d45-e9d7-4a62-ab47-4290ebd45614.jpg?w=840&h=525&fm=jpg&q=80&fit=crop"
		]
	},
	{
		name: "Fresh Bananas (Dozen)", price: "$4.50", oldPrice: "$5.00", rating: "★★★★★", img: "https://i.pinimg.com/1200x/d0/bf/38/d0bf380e33dd4f4482073028f86e2c6a.jpg", badge: "New", category: "Fruits", sku: "FB-012", description: "Fresh, ripe bananas packed with potassium and natural energy. Perfect for breakfast, snacks, and smoothies.",
		images: [
			"https://i.pinimg.com/1200x/d0/bf/38/d0bf380e33dd4f4482073028f86e2c6a.jpg",
			"https://www.somewhatsimple.com/wp-content/uploads/2018/04/How-to-keep-bananas-fresh.jpg",
			"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUk1PaXsgfg07LOsmmSSLgaK8QgEdrF15GoQ&s"
		]
	},
	{
		name: "Organic Honey Jar (500ml)", price: "$15.00", oldPrice: "$18.00", rating: "★★★★★", img: "https://i.pinimg.com/736x/7f/4d/50/7f4d503f0ddf73a895a18e51e8e538ed.jpg", badge: "Hot", category: "Pantry", sku: "OHJ-013", description: "Pure organic honey, naturally sweet and full of health benefits. Great for tea, cooking, and as a natural sweetener.",
		images: [
			"https://i.pinimg.com/736x/7f/4d/50/7f4d503f0ddf73a895a18e51e8e538ed.jpg",
			"https://t3.ftcdn.net/jpg/01/79/73/74/360_F_179737469_rUHDLTOr69PGV1Drer6vV222ZUL19f5q.jpg",
			"https://astorapiaries.com/cdn/shop/articles/AA_How_to_tell_teh_difference_between_good_and_bad_honey_1080x.png?v=1686662686"
		]
	},
	{
		name: "Almond Milk (1L)", price: "$6.50", oldPrice: "", rating: "★★★★☆", img: "https://i.pinimg.com/736x/48/c7/cf/48c7cf1e0337ddf5c4ba8450f6c26456.jpg", badge: "Vegan", category: "Dairy Alternatives", sku: "AM-014", description: "Creamy almond milk, plant-based and nutritious. Perfect for lactose-intolerant individuals and vegans. Rich in vitamins and minerals.",
		images: [
			"https://i.pinimg.com/736x/48/c7/cf/48c7cf1e0337ddf5c4ba8450f6c26456.jpg",
			"https://www.elizabethrider.com/wp-content/uploads/2024/02/homemade-almond-milk-2.jpg",
			"https://www.alphafoodie.com/wp-content/uploads/2025/01/Fresh-Almond-Milk-square.jpeg"
		]
	},
	{
		name: "Fresh Tomatoes (1kg)", price: "$5.00", oldPrice: "", rating: "★★★★☆", img: "https://i.pinimg.com/736x/ca/5f/89/ca5f89e67adf90b462dc4989268c5e32.jpg", badge: "", category: "Vegetables", sku: "FT-015", description: "Fresh, juicy tomatoes perfect for salads, cooking, and sauces. Rich in lycopene and vitamin C. Farm-fresh quality.",
		images: [
			"https://i.pinimg.com/736x/ca/5f/89/ca5f89e67adf90b462dc4989268c5e32.jpg",
			"https://findfresh.in/attachments/shop_images/MeatTomatoper0.5kg.webp",
			"https://t4.ftcdn.net/jpg/00/69/28/27/360_F_69282769_nnGX7SidAFQs8SwUgmZFx5Zlz6sXRkl4.jpg"
		]
	},
	{
		name: "Olive Oil Extra Virgin (1L)", price: "$20.00", oldPrice: "$25.00", rating: "★★★★★", img: "https://i.pinimg.com/736x/5f/20/54/5f2054d87e1730e1e49adf27d4071ee7.jpg", badge: "Save 15%", category: "Pantry", sku: "OO-016", description: "Premium extra virgin olive oil, cold-pressed and rich in flavor. Perfect for cooking, salads, and dressings. High quality and healthy.",
		images: [
			"https://i.pinimg.com/736x/5f/20/54/5f2054d87e1730e1e49adf27d4071ee7.jpg",
			"https://www.health.com/thmb/5gtz5WeOgiC_k6PTVMZXMBDlIBQ=/2120x0/filters:no_upscale():max_bytes(150000):strip_icc()/evoo-7c819bcdd0c343a7bae114cbc9baea2f.jpg",
			"https://dropinblog.net/cdn-cgi/image/fit=scale-down,width=700/34257837/files/featured/1.jpg"
		]
	},
	{
		name: "Potato Chips (Salted)", price: "$3.50", oldPrice: "$4.00", rating: "★★★★☆", img: "https://www.shutterstock.com/image-photo/spicy-potato-chips-seasoning-600nw-2059162091.jpg", badge: "", category: "Snacks", sku: "PC-017", description: "Crispy salted potato chips, perfectly seasoned. Great for snacking and parties. Made from premium potatoes.",
		images: [
			"https://www.shutterstock.com/image-photo/spicy-potato-chips-seasoning-600nw-2059162091.jpg",
			"https://snackattack.in/images/products/6bd3e9f8-c680-4eff-a6d0-e18d7946c94ethumb.jpg",
			"https://www.shearers.com/wp-content/uploads/traditional-potato-chips.jpg"
		]
	},
	{
		name: "Fresh Spinach (Bundle)", price: "$4.00", oldPrice: "", rating: "★★★★★", img: "https://cdn.britannica.com/30/82530-050-79911DD4/Spinach-leaves-vitamins-source-person.jpg", badge: "Fresh", category: "Greens", sku: "FS-018", description: "Fresh spinach leaves, rich in iron and vitamins. Perfect for salads, smoothies, and cooking. Organic and pesticide-free.",
		images: [
			"https://cdn.britannica.com/30/82530-050-79911DD4/Spinach-leaves-vitamins-source-person.jpg",
			"https://adelaidefresh.com.au/cdn/shop/files/spinach_1024x.webp?v=1713158555",
			"https://cdn.dotpe.in/longtail/store-items/3606255/REPH1Cak.jpeg"
		]
	},
	{
		name: "Organic Brown Sugar (1kg)", price: "$9.00", oldPrice: "$11.00", rating: "★★★★☆", img: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2023/15/turbinado-sugar-on-table.jpg.rend.hgtvcom.1280.1280.85.suffix/1708115391075.webp", badge: "", category: "Pantry", sku: "OBS-019", description: "Organic brown sugar with natural molasses flavor. Perfect for baking and sweetening. Natural and unrefined.",
		images: [
			"https://food.fnr.sndimg.com/content/dam/images/food/fullset/2023/15/turbinado-sugar-on-table.jpg.rend.hgtvcom.1280.1280.85.suffix/1708115391075.webp",
			"https://nuttyyogi.com/cdn/shop/products/LightBrownSugar.png?v=1680766479",
			"https://www.pachaa.in/image/cache/catalog/saltSweet/sweet/buy-Brown-Sugar-600x600.jpg"
		]
	},
	{
		name: "Coconut Oil (500ml)", price: "$14.00", oldPrice: "$16.50", rating: "★★★★★", img: "https://i.pinimg.com/736x/4d/ae/9d/4dae9de3f44d4ca5d0aefd8f6ee845ab.jpg", badge: "New", category: "Pantry", sku: "CPCO-020", description: "Cold-pressed coconut oil, pure and unrefined. Great for cooking, skincare, and hair care. Rich in healthy fats and nutrients.",
		images: [
			"https://i.pinimg.com/736x/4d/ae/9d/4dae9de3f44d4ca5d0aefd8f6ee845ab.jpg",
			"https://5.imimg.com/data5/SELLER/Default/2022/10/AT/HU/CD/22015143/cold-pressed-coconut-oil-500x500.jpg",
			"https://content.jdmagicbox.com/quickquotes/images_main/coconut-oil-2025957390-3btzy8p1.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit"
		]
	}
];

// Function to navigate to ProductDetails page with product index
function viewProductDetails(productIndex) {
	if (productIndex >= 0 && productIndex < allProducts.length) {
		const product = allProducts[productIndex];
		// Store product data directly in sessionStorage (same as home.html approach)
		sessionStorage.setItem('selectedProductData', JSON.stringify(product));
		// Also store product index for backward compatibility
		sessionStorage.setItem('selectedProductIndex', productIndex);
		// Navigate to ProductDetails page
		window.location.href = './ProductDetails.html';
	} else {
		console.error('Invalid product index:', productIndex);
	}
}

// Function to get product by index
function getProductByIndex(index) {
	if (index >= 0 && index < allProducts.length) {
		return allProducts[index];
	}
	return null;
}

// Function to get product by SKU
function getProductBySKU(sku) {
	return allProducts.find(p => p.sku === sku);
}

