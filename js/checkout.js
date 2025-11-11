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

document.getElementById("netbankingOption").addEventListener("change", function () {
  if (this.checked) {
    document.getElementById("bankList").classList.remove("hidden");
  }
});

document.getElementById("upiOption").addEventListener("change", function () {
  if (this.checked) {
    document.getElementById("upiField").classList.remove("hidden");
  }
});

document.querySelectorAll('input[name="payment"]').forEach((radio) => {
  radio.addEventListener("change", function () {
    if (this.value !== "netbanking") {
      document.getElementById("bankList").classList.add("hidden");
    }
    if (this.value !== "upi") {
      document.getElementById("upiField").classList.add("hidden");
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
  const buyNowProduct = JSON.parse(localStorage.getItem("buyNowProduct"));
  console.log("buyNowProduct>>>>>", buyNowProduct);

  let products = [];

  if (checkoutCart.length > 0) products = [...checkoutCart];
  if (buyNowProduct) products.push(buyNowProduct);

  if (products.length === 0) {
    checkoutContainer.innerHTML = `<p class="text-center text-gray-500 py-10">No products found in checkout.</p>`;
    return;
  }

  function createProductHTML(item) {
    const cleanPrice = parseFloat(String(item.price).replace("$", "").trim()) || 0;
    return `
      <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dynamic-product">
        <div class="flex items-center gap-3">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover">
          <div>
            <h4 class="font-medium text-gray-800">${item.name}</h4>
            <p class="text-sm text-gray-500">Qty: ${item.quantity || 1}</p>
          </div>
        </div>
        <span class="text-sm font-semibold">$${cleanPrice.toFixed(2)}</span>
      </div>`;
  }

  checkoutContainer.querySelectorAll(".dynamic-product").forEach((e) => e.remove());
  const subtotalRow = checkoutContainer.querySelector(".border-b.border-gray-300.mb-3");
  const allProductsHTML = products.map((p) => createProductHTML(p)).join("");
  if (subtotalRow) {
    subtotalRow.insertAdjacentHTML("beforebegin", allProductsHTML);
  } else {
    checkoutContainer.insertAdjacentHTML("afterbegin", allProductsHTML);
  }

  let subtotal = 0;
  products.forEach((p) => {
    const price = parseFloat(String(p.price).replace("$", "").trim()) || 0;
    const qty = parseInt(p.quantity) || 1;
    subtotal += price * qty;
  });

  const SHIPPING_CHARGE = 22;

  const subtotalEl = checkoutContainer.querySelector(
    ".flex.justify-between.pb-3.mb-3.border-b.border-gray-300 span.text-sm:last-child"
  );
  const totalEl = checkoutContainer.querySelector(
    ".flex.justify-between.pb-4.mb-6 span.text-lg.font-semibold:last-child"
  );

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

  const shippingRow = checkoutContainer.querySelector(".shipping-charge-row");
  if (!shippingRow && subtotalRow) {
    subtotalRow.insertAdjacentHTML(
      "afterend",
      `<div class="flex justify-between pb-3 mb-3 shipping-charge-row">
        <span class="text-sm text-gray-600">Shipping Charge:</span>
        <span class="text-sm font-medium">$${SHIPPING_CHARGE.toFixed(2)}</span>
      </div>`
    );
  }

  if (totalEl) totalEl.textContent = `$${(subtotal + SHIPPING_CHARGE).toFixed(2)}`;


  placeOrderBtn?.addEventListener("click", function (e) {
    e.preventDefault();
    const requiredFields = ["firstName", "lastName", "address1", "city", "zipcode", "phone", "email"];
    for (const id of requiredFields) {
      const value = document.getElementById(id)?.value.trim();
      if (!value) {
        alert("❌ Please fill in all required fields!");
        return;
      }
    }

  
    const addressData = {
      firstName: document.getElementById("firstName").value.trim(),
      lastName: document.getElementById("lastName").value.trim(),
      company: document.querySelector('input[placeholder="Apartment, suite, unit, etc. (optional)"]').value.trim(),
      // country: document.getElementById("selectedCountry").textContent.trim(),
      address1: document.getElementById("address1").value.trim(),
      city: document.getElementById("city").value.trim(),
      // state: document.getElementById("selectedCountry1").textContent.trim(),
      zipcode: document.getElementById("zipcode").value.trim(),
      phone: document.getElementById("phone").value.trim(),
      email: document.getElementById("email").value.trim(),
      notes: document.getElementById("orderNotes").value.trim(),
    };

    localStorage.setItem("userAddress", JSON.stringify(addressData));
    console.log("Address saved to localStorage ", addressData);

    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
      alert("❌ Please select a payment method!");
      return;
    }

    const paymentMethod =
      selectedPayment.nextElementSibling.querySelector("span")?.textContent.trim() || "Cash on delivery";
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    document.getElementById("displayOrderNumber").textContent = orderNumber;
    document.getElementById("displayOrderDate").textContent = today;
    document.getElementById("displayPaymentMethod").textContent = paymentMethod;
    document.getElementById("displayPaymentMethod2").textContent = paymentMethod;

    const tbody = confirmationSection.querySelector("tbody");
    if (tbody) {
      tbody.innerHTML = "";
      products.forEach((p) => {
        const price = parseFloat(String(p.price).replace("$", "").trim()) || 0;
        const qty = parseInt(p.quantity) || 1;
        const total = (price * qty).toFixed(2);
        tbody.insertAdjacentHTML(
          "beforeend",
          `<tr class="border-b border-gray-100">
            <td class="px-6 py-4 flex items-center gap-3">
              <img src="${p.image}" alt="${p.name}" class="w-12 h-12 rounded-lg object-cover border" />
              <div><span class="text-sm">${p.name}</span><span class="text-sm text-gray-600 ml-1">× ${qty}</span></div>
            </td>
            <td class="px-6 py-4 text-right text-sm font-medium">$${total}</td>
          </tr>`
        );
      });

      // ✅ Get discount and final total correctly
      const discountPercent = parseFloat(localStorage.getItem("appliedCouponDiscount")) || 0;
      const discountAmount = parseFloat(localStorage.getItem("discountAmountValue")) || 0;
      const storedFinalTotal = parseFloat(localStorage.getItem("finalDiscountedTotal"));
      const finalTotalFallback = subtotal - (subtotal * discountPercent) / 100 + SHIPPING_CHARGE;
      const finalTotal = !isNaN(storedFinalTotal) ? storedFinalTotal : finalTotalFallback;

      let summaryHTML = `<tr><td class="px-6 py-4 text-sm font-semibold uppercase">Subtotal:</td><td class="px-6 py-4 text-right text-sm">${subtotal.toFixed(2)}</td></tr>`;

      if (discountPercent > 0 || discountAmount > 0) {
        summaryHTML += `<tr><td class="px-6 py-4 text-sm font-semibold uppercase text-green-600">Discount (${discountPercent}%):</td><td class="px-6 py-4 text-right text-sm text-green-600">- ${discountAmount.toFixed(2)}</td></tr>`;
      }

      summaryHTML += `<tr><td class="px-6 py-4 text-sm font-semibold uppercase">Shipping Charge:</td><td class="px-6 py-4 text-right text-sm">${SHIPPING_CHARGE.toFixed(2)}</td></tr>`;
      summaryHTML += `<tr><td class="px-6 py-4 text-sm font-semibold uppercase">Payment Method:</td><td class="px-6 py-4 text-right text-sm">${paymentMethod}</td></tr>`;
      summaryHTML += `<tr><td class="px-6 py-4 text-sm font-semibold uppercase">Total:</td><td class="px-6 py-4 text-right text-sm font-semibold">${finalTotal.toFixed(2)}</td></tr>`;

      tbody.insertAdjacentHTML("beforeend", summaryHTML);
    }

    checkoutSection.classList.add("hidden");
    confirmationSection.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });

    localStorage.removeItem("checkoutCart");
    localStorage.removeItem("buyNowProduct");
    localStorage.removeItem("cart");
  });
});

// ✅ Coupon System
document.addEventListener("DOMContentLoaded", function () {
  const couponInput = document.getElementById("couponInput");
  const applyBtn = document.getElementById("applyCouponBtn");
  const message = document.getElementById("couponMessage");
  const couponButtons = document.querySelectorAll(".coupon-btn");

  const totalEl2 = document.querySelector(
    ".flex.justify-between.pb-4.mb-6 span.text-lg.font-semibold:last-child"
  );
  const subtotalEl2 = document.querySelector(
    ".flex.justify-between.pb-3.mb-3.border-b.border-gray-300 span.text-sm:last-child"
  );

  let appliedCoupon2 = null;
  let discount2 = 0;
  const SHIPPING_CHARGE_LOCAL = 22;

  const validCoupons2 = {
    SAVE10: { discount: 10, minAmount: 20 },
    WELCOME15: { discount: 15, minAmount: 35 },
    SUPER20: { discount: 20, minAmount: 50 },
  };

  // Coupon Button Click
  couponButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const code =
        btn.getAttribute("data-code") ||
        btn.getAttribute("data-coupon") ||
        btn.dataset.code ||
        btn.dataset.coupon;

      if (couponInput) {
        couponInput.value = code;
        message.textContent = ` Click "Apply" to use "${code}" coupon.`;
        message.className = "text-xs mt-2 text-gray-600";
      }
    });
  });

  // Apply Coupon
  applyBtn?.addEventListener("click", () => {
    const enteredCode = (couponInput.value || "").trim().toUpperCase();
    const subtotalLocal = parseFloat((subtotalEl2?.textContent || "").replace("$", "")) || 0;

    if (validCoupons2[enteredCode]) {
      const { discount, minAmount } = validCoupons2[enteredCode];
      if (subtotalLocal >= minAmount) {
        appliedCoupon2 = enteredCode;
        discount2 = discount;

        message.textContent = ` Coupon "${enteredCode}" applied successfully (${discount2}% OFF).`;
        message.className = "text-xs mt-2 text-green-600";

        const discountAmountLocal = subtotalLocal * (discount2 / 100);
        const newTotal = subtotalLocal - discountAmountLocal + SHIPPING_CHARGE_LOCAL;

        if (totalEl2) totalEl2.textContent = `$${newTotal.toFixed(2)}`;

        // ✅ Save to localStorage for confirmation page
        try {
          localStorage.setItem("appliedCouponCode", appliedCoupon2);
          localStorage.setItem("appliedCouponDiscount", discount2.toString());
          localStorage.setItem("discountAmountValue", discountAmountLocal.toFixed(2));
          localStorage.setItem("finalDiscountedTotal", newTotal.toFixed(2));
        } catch (err) {
          console.error("localStorage set error:", err);
        }
      } else {
        message.textContent = ` Minimum purchase of $${minAmount} required for "${enteredCode}" coupon.`;
        message.className = "text-xs mt-2 text-orange-500";
      }
    } else {
      message.textContent = " Invalid coupon code.";
      message.className = "text-xs mt-2 text-red-500";
      appliedCoupon2 = null;
      discount2 = 0;

      if (totalEl2)
        totalEl2.textContent = `$${(subtotalLocal + SHIPPING_CHARGE_LOCAL).toFixed(2)}`;

      try {
        localStorage.removeItem("appliedCouponCode");
        localStorage.removeItem("appliedCouponDiscount");
        localStorage.removeItem("discountAmountValue");
        localStorage.removeItem("finalDiscountedTotal");
      } catch (err) {
        console.error("localStorage remove error:", err);
      }
    }
  });
});

// ✅ Invoice Download Fix (works with or without coupon)
document.addEventListener("DOMContentLoaded", function () {
  const downloadBtn = document.getElementById("downloadInvoiceBtn");

  downloadBtn?.addEventListener("click", async function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const orderNumber = document.getElementById("displayOrderNumber")?.textContent.trim() || "-";
    const orderDate = document.getElementById("displayOrderDate")?.textContent.trim() || "-";
    const paymentMethod = document.getElementById("displayPaymentMethod")?.textContent.trim() || "-";
    const note = document.getElementById("displayOrderNote")?.textContent.trim() || "";

    // ⚡ FIXED: safe default values for coupon fields
    const appliedCoupon = localStorage.getItem("appliedCouponCode") || "No Coupon Applied";
    const discountPercent = parseFloat(localStorage.getItem("appliedCouponDiscount")) || 0;
    const discountAmountValue = parseFloat(localStorage.getItem("discountAmountValue")) || 0;
    const finalDiscountedTotal = parseFloat(localStorage.getItem("finalDiscountedTotal"));

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

    let subtotal = 0;
    rows.forEach((row) => {
      const cells = row.querySelectorAll("td");
      if (cells.length === 2) {
        const label = cells[0].innerText.trim().toUpperCase();
        const value = cells[1].innerText.trim();

        if (label === "SUBTOTAL:") {
          subtotal = parseFloat(value.replace("$", "")) || 0;
        }
      }
    });

    doc.text("--------------------------------------------------------------", 14, y);
    y += 8;

    const SHIPPING_CHARGE = 22;

    // ⚡ FIXED: handle case when no discount applied
    const computedDiscountAmount = (subtotal * (discountPercent || 0)) / 100;
    let finalTotal = !isNaN(finalDiscountedTotal)
      ? finalDiscountedTotal
      : subtotal - computedDiscountAmount + SHIPPING_CHARGE;

    doc.setFontSize(12);
    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 14, y);
    y += 6;

    if (discountPercent > 0) {
      doc.text(
        `Discount (${discountPercent}% - ${appliedCoupon}): -$${discountAmountValue.toFixed(2)}`,
        14,
        y
      );
      y += 6;
    } else {
      doc.text(`Discount: $0.00`, 14, y);
      y += 6;
    }

    doc.text(`Shipping Charge: $${SHIPPING_CHARGE.toFixed(2)}`, 14, y);
    y += 6;
    doc.text(`Total: $${finalTotal.toFixed(2)}`, 14, y);
    y += 10;

    if (note) {
      doc.text("Order Note:", 14, y);
      y += 6;
      doc.text(note, 14, y);
      y += 8;
    }

    doc.setFontSize(12);
    doc.text("Thank you for shopping with us!", 14, y + 6);
    doc.save(`invoice_${orderNumber}.pdf`);

    try {
      localStorage.removeItem("appliedCouponCode");
      localStorage.removeItem("appliedCouponDiscount");
      localStorage.removeItem("finalDiscountedTotal");
      localStorage.removeItem("discountAmountValue");
    } catch (err) {
      console.error("localStorage remove error:", err);
    }
  });
});



