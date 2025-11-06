
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


document.getElementById('netbankingOption').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('bankList').classList.remove('hidden');
    }
});


document.getElementById('upiOption').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('upiField').classList.remove('hidden');
    }
});


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
document.addEventListener("DOMContentLoaded", function () {
    const dropdownBtn = document.getElementById("bankDropdownBtn");
    const dropdownMenu = document.getElementById("bankDropdownMenu");
    const selectedText = document.getElementById("selectedCountry2");

    if (dropdownBtn && dropdownMenu) {
        dropdownBtn.addEventListener("click", () => {
            dropdownMenu.classList.toggle("hidden");
        });

        dropdownMenu.querySelectorAll("li").forEach((item) => {
            item.addEventListener("click", () => {
                selectedText.textContent = item.textContent;
                dropdownMenu.classList.add("hidden");
            });
        });

        document.addEventListener("click", (event) => {
            if (!dropdownBtn.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.add("hidden");
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const placeOrderBtn = document.getElementById("placeOrderBtn");
    const checkoutSection = document.getElementById("checkoutSection");
    const confirmationSection = document.getElementById("confirmationSection");
    const checkoutContainer = document.querySelector(".bg-gray-50.p-6.rounded");

    if (!checkoutContainer) return;

    const checkoutCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    console.log("checkoutCart>>>>", checkoutCart);

    const buyNowProduct = JSON.parse(localStorage.getItem("buyNowProduct"));
    let products = [];

    if (checkoutCart.length > 0) products = [...checkoutCart];
    if (buyNowProduct) products.push(buyNowProduct);


    if (products.length === 0) {
        checkoutContainer.innerHTML = `<p class="text-center text-gray-500 py-10">No products found in checkout.</p>`;
        return;
    }


    function createProductHTML(item) {
        const cleanPrice = parseFloat(String(item.price).replace('$', '').trim()) || 0;
        return `
      <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dynamic-product">
        <div class="flex items-center gap-3">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover">
          <div>
            <h4 class="font-medium text-gray-800">${item.name}</h4>
            <p class="text-sm text-gray-500">Weight: ${item.weight || "—"}</p>
            <p class="text-sm text-gray-500">Qty: ${item.quantity || 1}</p>
          </div>
        </div>
        <span class="text-sm font-semibold">$${cleanPrice.toFixed(2)}</span>
      </div> 
    `;
    }
    checkoutContainer.querySelectorAll(".dynamic-product").forEach(e => e.remove());
    const subtotalRow = checkoutContainer.querySelector(".border-b.border-gray-300.mb-3");
    const allProductsHTML = products.map(p => createProductHTML(p)).join("");
    if (subtotalRow) {
        subtotalRow.insertAdjacentHTML("beforebegin", allProductsHTML);
    } else {
        checkoutContainer.insertAdjacentHTML("afterbegin", allProductsHTML);
    }

    let subtotal = 0;
    products.forEach(p => {
        const price = parseFloat(String(p.price).replace('$', '').trim()) || 0;
        const qty = parseInt(p.quantity) || 1;
        subtotal += price * qty;
    });

    const subtotalEl = checkoutContainer.querySelector(
        ".flex.justify-between.pb-3.mb-3.border-b.border-gray-300 span.text-sm:last-child"
    );
    const totalEl = checkoutContainer.querySelector(
        ".flex.justify-between.pb-4.mb-6 span.text-lg.font-semibold:last-child"
    );

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${subtotal.toFixed(2)}`;

    placeOrderBtn?.addEventListener("click", function (e) {
        e.preventDefault();

        const firstName = document.getElementById('firstName')?.value.trim();
        const lastName = document.getElementById('lastName')?.value.trim();
        const address = document.getElementById('address1')?.value.trim();
        const city = document.getElementById('city')?.value.trim();
        const zipcode = document.getElementById('zipcode')?.value.trim();
        const phone = document.getElementById('phone')?.value.trim();
        const email = document.getElementById('email')?.value.trim();
        const selectedPayment = document.querySelector('input[name="payment"]:checked');
        if (!firstName || !lastName || !address || !city || !zipcode || !phone || !email) {
            alert('❌ Please fill in all required fields!');
            return; 
        }

        if (!selectedPayment) {
            alert('❌ Please select a payment method!');
            return; 
        }

       
        
        const orderNote = document.getElementById('orderNotes')?.value.trim() || "";
       
        const paymentMethod = selectedPayment.nextElementSibling.querySelector("span")?.textContent.trim() || "Cash on delivery";

        let paymentInfo = 'Pay with cash upon delivery.';
        if (selectedPayment.value === 'bank') {
            paymentInfo = 'Make your payment directly into our bank account. Your order will be shipped once funds are cleared.';
        } else if (selectedPayment.value === 'netbanking') {
            paymentInfo = 'Pay securely through your preferred bank using Internet Banking.';
        } else if (selectedPayment.value === 'upi') {
            paymentInfo = 'Complete your payment using UPI apps like Google Pay, PhonePe, or Paytm.';
        }

        const orderNumber = Math.floor(1000 + Math.random() * 9000);
        const today = new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });

        document.getElementById("displayOrderNumber").textContent = orderNumber;
        document.getElementById("displayOrderDate").textContent = today;
        document.getElementById("displayPaymentMethod").textContent = paymentMethod;
        document.getElementById("displayPaymentMethod2").textContent = paymentMethod;
        if (document.getElementById("paymentInfo")) {
            document.getElementById("paymentInfo").textContent = paymentInfo;
        }

        if (orderNote) {
            const noteRow = document.getElementById('noteRow');
            if (noteRow) {
                noteRow.classList.remove('hidden');
                document.getElementById('displayOrderNote').textContent = orderNote;
            }
        } else {
            const noteRow = document.getElementById('noteRow');
            if (noteRow) {
                noteRow.classList.add('hidden');
            }
        }

        const tbody = confirmationSection.querySelector("tbody");
        if (tbody) {
            tbody.innerHTML = "";

            products.forEach((p) => {
                const cleanPrice = parseFloat(String(p.price).replace('$', '').trim()) || 0;
                const qty = parseInt(p.quantity) || 1;
                const total = (cleanPrice * qty).toFixed(2);

                tbody.insertAdjacentHTML(
                    "beforeend",
                    `
            <tr class="border-b border-gray-100">
              <td class="px-6 py-4 flex items-center gap-3">
                <img src="${p.image}" alt="${p.name}" class="w-12 h-12 rounded-lg object-cover border" />
                <div>
                  <span class="text-sm">${p.name}</span>
                  <span class="text-sm text-gray-600 ml-1">× ${qty}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-right text-sm font-medium">$${total}</td>
            </tr>
            `
                );
            });

            tbody.insertAdjacentHTML(
                "beforeend",
                `
          <tr>
            <td class="px-6 py-4 text-sm font-semibold uppercase">Subtotal:</td>
            <td class="px-6 py-4 text-right text-sm">$${subtotal.toFixed(2)}</td>
          </tr>
          <tr>
            <td class="px-6 py-4 text-sm font-semibold uppercase">Shipping:</td>
            <td class="px-6 py-4 text-right text-sm">
              <span>Flat rate: <span class="line-through text-red-500">$22.00</span></span>
            </td>
          </tr>
          <tr>
            <td class="px-6 py-4 text-sm font-semibold uppercase">Payment Method:</td>
            <td class="px-6 py-4 text-right text-sm">${paymentMethod}</td>
          </tr>
          <tr>
            <td class="px-6 py-4 text-sm font-semibold uppercase">Total:</td>
            <td class="px-6 py-4 text-right text-sm font-semibold">$${subtotal.toFixed(2)}</td>
          </tr>
          `
            );

            if (orderNote) {
                tbody.insertAdjacentHTML(
                    "beforeend",
                    `
            <tr>
              <td class="px-6 py-4 text-sm font-semibold uppercase">Note:</td>
              <td class="px-6 py-4 text-right text-sm">${orderNote}</td>
            </tr>
            `
                );
            }
        }
        checkoutSection.classList.add("hidden");
        confirmationSection.classList.remove("hidden");

        window.scrollTo({ top: 0, behavior: "smooth" });

        localStorage.removeItem("checkoutCart");
        localStorage.removeItem("buyNowProduct");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const downloadBtn = document.getElementById("downloadInvoiceBtn");

    downloadBtn?.addEventListener("click", async function () {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        const orderNumber = document.getElementById("displayOrderNumber")?.textContent.trim() || "-";
        const orderDate = document.getElementById("displayOrderDate")?.textContent.trim() || "-";
        const paymentMethod = document.getElementById("displayPaymentMethod")?.textContent.trim() || "-";
        const note = document.getElementById("displayOrderNote")?.textContent.trim() || "";

        const table = document.querySelector("#confirmationSection table tbody");
        const rows = [...table.querySelectorAll("tr")];

        let y = 20;


        doc.setFontSize(18);
        doc.text("Order Invoice", 14, y);
        y += 10;

        doc.setFontSize(12);
        doc.text(`Order Number: ${orderNumber}`, 14, y);
        y += 6;
        doc.text(`Order Date: ${orderDate}`, 14, y);
        y += 6;
        doc.text(`Payment Method: ${paymentMethod}`, 14, y);
        y += 10;

        doc.setFontSize(14);
        doc.text("Products", 14, y);
        y += 6;
        doc.setFontSize(11);
        doc.text("--------------------------------------------------------------", 14, y);
        y += 6;


        rows.forEach((row) => {
            const cells = row.querySelectorAll("td");
            if (cells.length === 2) {
                const item = cells[0].innerText.trim().replace(/\s+/g, " ");
                const total = cells[1].innerText.trim();
                doc.text(`${item}`, 14, y);
                doc.text(`${total}`, 160, y, { align: "right" });
                y += 6;
            }
        });

        doc.text("--------------------------------------------------------------", 14, y);
        y += 8;

        // Add Note if present
        if (note) {
            doc.text("Order Note:", 14, y);
            y += 6;
            doc.text(note, 14, y);
            y += 8;
        }

        // Thank You Message
        doc.setFontSize(12);
        doc.text("Thank you for shopping with us!", 14, y + 6);

        // Save PDF
        doc.save(`invoice_${orderNumber}.pdf`);
    });
});