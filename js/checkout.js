   // Country dropdown
        const btn = document.getElementById("countryBtn");
        const menu = document.getElementById("countryMenu");
        const selected = document.getElementById("selectedCountry");

        btn.addEventListener("click", () => menu.classList.toggle("hidden"));

        menu.querySelectorAll("li").forEach((item) => {
            item.addEventListener("click", () => {
                selected.textContent = item.textContent;
                menu.classList.add("hidden");
            });
        });

        // State dropdown
        const btn1 = document.getElementById("countryBtn1");
        const menu1 = document.getElementById("countryMenu1");
        const selected1 = document.getElementById("selectedCountry1");
        
        btn1.addEventListener("click", () => menu1.classList.toggle("hidden"));

        menu1.querySelectorAll("li").forEach((item) => {
            item.addEventListener("click", () => {
                selected1.textContent = item.textContent;
                menu1.classList.add("hidden");
            });
        });

        // Show/hide bank list for net banking
        document.getElementById('netbankingOption').addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('bankList').classList.remove('hidden');
            }
        });

        // Show/hide UPI field
        document.getElementById('upiOption').addEventListener('change', function() {
            if (this.checked) {
                document.getElementById('upiField').classList.remove('hidden');
            }
        });

        // Hide bank list and UPI field when other options selected
        document.querySelectorAll('input[name="payment"]').forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value !== 'netbanking') {
                    document.getElementById('bankList').classList.add('hidden');
                }
                if (this.value !== 'upi') {
                    document.getElementById('upiField').classList.add('hidden');
                }
            });
        });

        // Place Order Button
        document.getElementById('placeOrderBtn').addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get form values
            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const address = document.getElementById('address1').value;
            const city = document.getElementById('city').value;
            const zipcode = document.getElementById('zipcode').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const orderNote = document.getElementById('orderNotes').value;
            const selectedPayment = document.querySelector('input[name="payment"]:checked');
            
            // Validation
            if (!firstName || !lastName || !address || !city || !zipcode || !phone || !email) {
                alert('Please fill in all required fields');
                return;
            }
            
            if (!selectedPayment) {
                alert('Please select a payment method');
                return;
            }
            
            // Get payment method text
            let paymentText = 'Cash on delivery';
            let paymentInfo = 'Pay with cash upon delivery.';
            
            if (selectedPayment.value === 'bank') {
                paymentText = 'Direct bank transfer';
                paymentInfo = 'Make your payment directly into our bank account. Your order will be shipped once funds are cleared.';
            } else if (selectedPayment.value === 'netbanking') {
                paymentText = 'Net Banking';
                paymentInfo = 'Pay securely through your preferred bank using Internet Banking.';
            } else if (selectedPayment.value === 'upi') {
                paymentText = 'UPI Payment';
                paymentInfo = 'Complete your payment using UPI apps like Google Pay, PhonePe, or Paytm.';
            }
            
            // Generate random order number
            const orderNumber = Math.floor(1000 + Math.random() * 9000);
            
            // Get current date
            const today = new Date();
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const orderDate = today.toLocaleDateString('en-US', options);
            
            // Update confirmation section
            document.getElementById('displayOrderNumber').textContent = orderNumber;
            document.getElementById('displayOrderDate').textContent = orderDate;
            document.getElementById('displayPaymentMethod').textContent = paymentText;
            document.getElementById('displayPaymentMethod2').textContent = paymentText;
            document.getElementById('paymentInfo').textContent = paymentInfo;
            
            // Show note if exists
            if (orderNote) {
                document.getElementById('noteRow').classList.remove('hidden');
                document.getElementById('displayOrderNote').textContent = orderNote;
            } else {
                document.getElementById('noteRow').classList.add('hidden');
            }
            
            // Hide checkout section and show confirmation
            document.getElementById('checkoutSection').classList.add('hidden');
            document.getElementById('confirmationSection').classList.remove('hidden');
            
            // Scroll to top smoothly
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });