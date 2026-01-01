// FULLY CORRECTED CHECKOUT SCRIPT - Minimum purchase requirements enforced + Shipping Address in Invoice

(() => {
  // ----- Utility & constants -----
  const SHIPPING_CHARGE = 22;
  const LS_KEYS = {
    couponCode: "appliedCouponCode",
    couponDiscount: "appliedCouponDiscount",
    discountAmount: "discountAmountValue",
    finalTotal: "finalDiscountedTotal",
  };

  // ----- Dropdowns / small UI bits -----
  const setupDropdown = (btnId, menuId, selectedId) => {
    const btn = document.getElementById(btnId);
    const menu = document.getElementById(menuId);
    const selected = document.getElementById(selectedId);
    if (!btn || !menu) return;
    btn.addEventListener("click", () => menu.classList.toggle("hidden"));
    menu.querySelectorAll("li").forEach((item) => {
      item.addEventListener("click", () => {
        if (selected) selected.textContent = item.textContent;
        menu.classList.add("hidden");
      });
    });
  };
  setupDropdown("countryBtn", "countryMenu", "selectedCountry");
  setupDropdown("countryBtn1", "countryMenu1", "selectedCountry1");

  // Bank dropdown
  document.addEventListener("DOMContentLoaded", () => {
    const dropdownBtn = document.getElementById("bankDropdownBtn");
    const dropdownMenu = document.getElementById("bankDropdownMenu");
    const selectedText = document.getElementById("selectedCountry2");
    if (dropdownBtn && dropdownMenu) {
      dropdownBtn.addEventListener("click", () => dropdownMenu.classList.toggle("hidden"));
      dropdownMenu.querySelectorAll("li").forEach((item) => {
        item.addEventListener("click", () => {
          if (selectedText) selectedText.textContent = item.textContent;
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

  // Payment show/hide
  const netbankingInput = document.getElementById("netbankingOption");
  const upiInput = document.getElementById("upiOption");
  netbankingInput?.addEventListener("change", function () {
    if (this.checked) document.getElementById("bankList")?.classList.remove("hidden");
  });
  upiInput?.addEventListener("change", function () {
    if (this.checked) document.getElementById("upiField")?.classList.remove("hidden");
  });
  document.querySelectorAll('input[name="payment"]').forEach((radio) => {
    radio.addEventListener("change", function () {
      if (this.value !== "netbanking") document.getElementById("bankList")?.classList.add("hidden");
      if (this.value !== "upi") document.getElementById("upiField")?.classList.add("hidden");
    });
  });

  // ----- Checkout rendering & calculations -----
  document.addEventListener("DOMContentLoaded", function () {
    const placeOrderBtn = document.getElementById("placeOrderBtn");
    const checkoutSection = document.getElementById("checkoutSection");
    const confirmationSection = document.getElementById("confirmationSection");
    const checkoutContainer = document.querySelector(".bg-gray-50.p-6.rounded");

    if (!checkoutContainer) return;

    // Load products
    const checkoutCart = JSON.parse(localStorage.getItem("checkoutCart")) || [];
    const buyNowProduct = JSON.parse(localStorage.getItem("buyNowProduct"));
    let products = [];
    if (checkoutCart.length > 0) products = [...checkoutCart];
    if (buyNowProduct) products.push(buyNowProduct);

    if (products.length === 0) {
      checkoutContainer.innerHTML = `<p class="text-center text-gray-500 py-10">No products found in checkout.</p>`;
      return;
    }

    const createProductHTML = (item) => {
      const cleanPrice = parseFloat(String(item.price).replace("$", "").trim()) || 0;
      const qty = parseInt(item.quantity) || 1;
      return `
        <div class="flex justify-between pb-4 mb-4 border-b border-gray-200 dynamic-product">
          <div class="flex items-center gap-3">
            <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover">
            <div>
              <h4 class="font-medium text-gray-800">${item.name}</h4>
              <p class="text-sm text-gray-500">Qty: ${qty}</p>
            </div>
          </div>
          <span class="text-sm font-semibold">$${(cleanPrice * qty).toFixed(2)}</span>
        </div>`;
    };

    // Render products
    checkoutContainer.querySelectorAll(".dynamic-product").forEach((e) => e.remove());
    const subtotalRow = checkoutContainer.querySelector(".border-b.border-gray-300.mb-3");
    const allProductsHTML = products.map((p) => createProductHTML(p)).join("");
    if (subtotalRow) {
      subtotalRow.insertAdjacentHTML("beforebegin", allProductsHTML);
    } else {
      checkoutContainer.insertAdjacentHTML("afterbegin", allProductsHTML);
    }

    // Compute subtotal from products
    let subtotal = 0;
    products.forEach((p) => {
      const price = parseFloat(String(p.price).replace("$", "").trim()) || 0;
      const qty = parseInt(p.quantity) || 1;
      subtotal += price * qty;
    });

    // Show subtotal
    const subtotalEl = checkoutContainer.querySelector(
      ".flex.justify-between.pb-3.mb-3.border-b.border-gray-300 span.text-sm:last-child"
    );
    const totalEl = checkoutContainer.querySelector(
      ".flex.justify-between.pb-4.mb-6 span.text-lg.font-semibold:last-child"
    );

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;

    // Add shipping row if missing
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

    // ===== DISCOUNT VALIDATION: Check if subtotal meets minimum requirement =====
    const storedDiscountPercent = parseFloat(localStorage.getItem(LS_KEYS.couponDiscount)) || 0;
    const storedCouponCode = localStorage.getItem(LS_KEYS.couponCode) || "";

    // Coupon requirements
    const validCoupons = {
      SAVE10: { discount: 10, minAmount: 10 },
      WELCOME15: { discount: 15, minAmount: 35 },
      SUPER20: { discount: 20, minAmount: 50 },
    };

    let finalDiscount = 0;
    let finalTotal = subtotal + SHIPPING_CHARGE;

    // Check if stored coupon is valid AND meets minimum amount requirement
    if (storedDiscountPercent > 0 && storedCouponCode && validCoupons[storedCouponCode]) {
      const minRequired = validCoupons[storedCouponCode].minAmount;

      if (subtotal >= minRequired) {
        // ✅ Subtotal meets minimum - apply discount
        finalDiscount = subtotal * (storedDiscountPercent / 100);
        finalTotal = subtotal - finalDiscount + SHIPPING_CHARGE;

        localStorage.setItem(LS_KEYS.discountAmount, finalDiscount.toFixed(2));
        localStorage.setItem(LS_KEYS.finalTotal, finalTotal.toFixed(2));

        console.log(`✅ Discount applied: ${storedDiscountPercent}% of $${subtotal.toFixed(2)} = $${finalDiscount.toFixed(2)}`);
      } else {
        // ❌ Subtotal doesn't meet minimum - remove discount
        console.log(`⚠️ Subtotal $${subtotal.toFixed(2)} is below minimum $${minRequired} for ${storedCouponCode}. Discount removed.`);
        localStorage.removeItem(LS_KEYS.couponCode);
        localStorage.removeItem(LS_KEYS.couponDiscount);
        localStorage.removeItem(LS_KEYS.discountAmount);
        localStorage.removeItem(LS_KEYS.finalTotal);
      }
    } else {
      // No valid coupon - clear any old discount data
      localStorage.removeItem(LS_KEYS.discountAmount);
      localStorage.removeItem(LS_KEYS.finalTotal);
    }

    if (totalEl) totalEl.textContent = `$${finalTotal.toFixed(2)}`;

    // ----- Place order handler -----
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

      // Save address
      const addressData = {
        firstName: document.getElementById("firstName").value.trim(),
        lastName: document.getElementById("lastName").value.trim(),
        company: document.querySelector('input[placeholder="Apartment, suite, unit, etc. (optional)"]')?.value.trim() || "",
        address1: document.getElementById("address1").value.trim(),
        city: document.getElementById("city").value.trim(),
        zipcode: document.getElementById("zipcode").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        email: document.getElementById("email").value.trim(),
        notes: document.getElementById("orderNotes")?.value.trim() || "",
      };
      localStorage.setItem("userAddress", JSON.stringify(addressData));

      // Payment method
      const selectedPayment = document.querySelector('input[name="payment"]:checked');
      if (!selectedPayment) {
        alert("❌ Please select a payment method!");
        return;
      }
      const paymentMethod =
        selectedPayment.nextElementSibling?.querySelector("span")?.textContent?.trim() || "Cash on delivery";

      // Order metadata
      const orderNumber = Math.floor(1000 + Math.random() * 9000);
      const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
      document.getElementById("displayOrderNumber").textContent = orderNumber;
      document.getElementById("displayOrderDate").textContent = today;
      document.getElementById("displayPaymentMethod").textContent = paymentMethod;
      document.getElementById("displayPaymentMethod2").textContent = paymentMethod;
      const fullAddress = `
  ${addressData.firstName} ${addressData.lastName},
  ${addressData.address1},
  ${addressData.city} - ${addressData.zipcode},
  ${document.getElementById("selectedCountry1")?.textContent?.trim() || ""},
  ${document.getElementById("selectedCountry")?.textContent?.trim() || ""}
`.replace(/\s+/g, " ").trim();
      document.getElementById("displayAddress").textContent = fullAddress;
      document.getElementById("displayOrderNote").textContent = addressData.notes || "N/A";


      // Build confirmation table
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

        // Use recalculated values
        const discountPercent = parseFloat(localStorage.getItem(LS_KEYS.couponDiscount)) || 0;
        const discountAmount = parseFloat(localStorage.getItem(LS_KEYS.discountAmount)) || 0;
        const finalTotalValue = parseFloat(localStorage.getItem(LS_KEYS.finalTotal)) || (subtotal + SHIPPING_CHARGE);

        let summaryHTML = `<tr><td class="px-6 py-4 text-sm font-semibold uppercase">Subtotal:</td><td class="px-6 py-4 text-right text-sm">$${subtotal.toFixed(2)}</td></tr>`;

        if (discountPercent > 0 && discountAmount > 0) {
          const code = localStorage.getItem(LS_KEYS.couponCode) || "";
          summaryHTML += `<tr><td class="px-6 py-4 text-sm font-semibold uppercase text-green-600">Discount (${discountPercent}% ${code ? "- " + code : ""}):</td><td class="px-6 py-4 text-right text-sm text-green-600">- $${discountAmount.toFixed(2)}</td></tr>`;
        }

        summaryHTML += `<tr><td class="px-6 py-4 text-sm font-semibold uppercase">Shipping Charge:</td><td class="px-6 py-4 text-right text-sm">$${SHIPPING_CHARGE.toFixed(2)}</td></tr>`;
        summaryHTML += `<tr><td class="px-6 py-4 text-sm font-semibold uppercase">Payment Method:</td><td class="px-6 py-4 text-right text-sm">${paymentMethod}</td></tr>`;
        summaryHTML += `<tr><td class="px-6 py-4 text-sm font-semibold uppercase">Total:</td><td class="px-6 py-4 text-right text-sm font-semibold">$${finalTotalValue.toFixed(2)}</td></tr>`;

        tbody.insertAdjacentHTML("beforeend", summaryHTML);
      }

      // Persist order
      const firstName = document.getElementById("firstName")?.value.trim() || "";
      const lastName = document.getElementById("lastName")?.value.trim() || "";
      const customerName = `${firstName} ${lastName}`.trim() || "Guest User";
      const emailValue = document.getElementById("email")?.value.trim() || "";
      const phoneValue = document.getElementById("phone")?.value.trim() || "";
      const addressLine = document.getElementById("address1")?.value.trim() || "";
      const cityValue = document.getElementById("city")?.value.trim() || "";
      const stateValue = document.getElementById("selectedCountry1")?.textContent?.trim() || "";
      const countryValue = document.getElementById("selectedCountry")?.textContent?.trim() || "";
      const zipValue = document.getElementById("zipcode")?.value.trim() || "";
      const orderNoteValue = document.getElementById("orderNotes")?.value.trim() || "";

      const orderItems = products.map((p) => {
        const price = parseFloat(String(p.price).replace("$", "").trim()) || 0;
        const qty = parseInt(p.quantity) || 1;
        return {
          name: p.name,
          quantity: qty,
          price: price,
          image: p.image || "",
          total: parseFloat((price * qty).toFixed(2)),
        };
      });

      const estimatedDeliveryDate = (() => {
        const estDate = new Date();
        estDate.setDate(estDate.getDate() + 3);
        return estDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
      })();

      const discountPercentForRecord = parseFloat(localStorage.getItem(LS_KEYS.couponDiscount)) || 0;
      const discountAmountForRecord = parseFloat(localStorage.getItem(LS_KEYS.discountAmount)) || 0;
      const finalTotalForRecord = parseFloat(localStorage.getItem(LS_KEYS.finalTotal)) || (subtotal + SHIPPING_CHARGE);

      const orderRecord = {
        orderId: orderNumber.toString(),
        orderDate: today,
        paymentMethod,
        status: "Processing",
        statusIndex: 1,
        orderTime: new Date().toISOString(), 
        deliveryMinutes: 60,
        subtotal: parseFloat(subtotal.toFixed(2)),
        discountPercent: discountPercentForRecord,
        discountAmount: parseFloat(discountAmountForRecord.toFixed(2)),
        shippingCharge: SHIPPING_CHARGE,
        total: parseFloat(finalTotalForRecord.toFixed(2)),
        notes: orderNoteValue,
        customer: {
          name: customerName,
          email: emailValue,
          phone: phoneValue,
          address: {
            line1: addressLine,
            city: cityValue,
            state: stateValue,
            country: countryValue,
            zip: zipValue,
          },
        },
        estimatedDelivery: estimatedDeliveryDate,
        items: orderItems,
        timeline: [
          { label: "Order Placed", timestamp: new Date().toISOString(), state: "completed" },
          { label: "Processing", timestamp: new Date().toISOString(), state: "current" },
          { label: "Out for Delivery", timestamp: null, state: "pending" },
          { label: "Delivered", timestamp: null, state: "pending" },
        ],
      };

      try {
        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        const updatedOrders = [orderRecord, ...existingOrders];
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
        localStorage.setItem("selectedOrderId", orderRecord.orderId);
      } catch (storageError) {
        console.error("Failed to persist order", storageError);
      }

      // Show confirmation
      checkoutSection?.classList.add("hidden");
      confirmationSection?.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Clear checkout cart
      localStorage.removeItem("checkoutCart");
      localStorage.removeItem("buyNowProduct");
      localStorage.removeItem("cart");
    });

    // ----- Coupon system -----
    const couponInput = document.getElementById("couponInput");
    const applyBtn = document.getElementById("applyCouponBtn");
    const message = document.getElementById("couponMessage");
    const couponButtons = document.querySelectorAll(".coupon-btn");

    // Coupon button clicks
    couponButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const code =
          btn.getAttribute("data-code") ||
          btn.getAttribute("data-coupon") ||
          btn.dataset.code ||
          btn.dataset.coupon;
        if (couponInput) {
          couponInput.value = code || "";
          if (message) {
            message.textContent = `✨ Click "Apply" to use "${code}" coupon.`;
            message.className = "text-xs mt-2 text-gray-600";
          }
        }
      });
    });

    // Apply coupon - STRICT MINIMUM AMOUNT CHECK
    applyBtn?.addEventListener("click", () => {
      const enteredCode = (couponInput?.value || "").trim().toUpperCase();

      if (validCoupons[enteredCode]) {
        const { discount, minAmount } = validCoupons[enteredCode];

        // ✅ ONLY apply discount if subtotal meets minimum requirement
        if (subtotal >= minAmount) {
          const discountAmountLocal = subtotal * (discount / 100);
          const newTotal = subtotal - discountAmountLocal + SHIPPING_CHARGE;

          if (message) {
            message.textContent = `✅ Coupon "${enteredCode}" applied! ${discount}% OFF = -$${discountAmountLocal.toFixed(2)}`;
            message.className = "text-xs mt-2 text-green-600";
          }
          if (totalEl) totalEl.textContent = `$${newTotal.toFixed(2)}`;

          localStorage.setItem(LS_KEYS.couponCode, enteredCode);
          localStorage.setItem(LS_KEYS.couponDiscount, discount.toString());
          localStorage.setItem(LS_KEYS.discountAmount, discountAmountLocal.toFixed(2));
          localStorage.setItem(LS_KEYS.finalTotal, newTotal.toFixed(2));
        } else {
          // ❌ Subtotal is below minimum - DO NOT apply discount
          if (message) {
            message.textContent = `⚠️ Minimum purchase of $${minAmount} required for "${enteredCode}". Add more items to qualify!`;
            message.className = "text-xs mt-2 text-orange-500";
          }
          // Clear any previously applied discount
          if (totalEl) totalEl.textContent = `$${(subtotal + SHIPPING_CHARGE).toFixed(2)}`;
          localStorage.removeItem(LS_KEYS.couponCode);
          localStorage.removeItem(LS_KEYS.couponDiscount);
          localStorage.removeItem(LS_KEYS.discountAmount);
          localStorage.removeItem(LS_KEYS.finalTotal);
        }
      } else {
        // Invalid coupon code
        if (message) {
          message.textContent = "❌ Invalid coupon code.";
          message.className = "text-xs mt-2 text-red-500";
        }
        if (totalEl) totalEl.textContent = `$${(subtotal + SHIPPING_CHARGE).toFixed(2)}`;
        localStorage.removeItem(LS_KEYS.couponCode);
        localStorage.removeItem(LS_KEYS.couponDiscount);
        localStorage.removeItem(LS_KEYS.discountAmount);
        localStorage.removeItem(LS_KEYS.finalTotal);
      }
    });

    // ----- Invoice Download with SHIPPING ADDRESS -----
    const downloadBtn = document.getElementById("downloadInvoiceBtn");
    downloadBtn?.addEventListener("click", async function () {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // Existing Variables
      const orderNumber = document.getElementById("displayOrderNumber")?.textContent.trim() || "-";
      const orderDate = document.getElementById("displayOrderDate")?.textContent.trim() || "-";
      const paymentMethod = document.getElementById("displayPaymentMethod")?.textContent.trim() || "-";
      const note = document.getElementById("displayOrderNote")?.textContent.trim() || "";

      const appliedCoupon = localStorage.getItem(LS_KEYS.couponCode) || "No Coupon";
      const discountPercent = parseFloat(localStorage.getItem(LS_KEYS.couponDiscount)) || 0;
      const discountAmountValue = parseFloat(localStorage.getItem(LS_KEYS.discountAmount)) || 0;
      const finalDiscountedTotal = parseFloat(localStorage.getItem(LS_KEYS.finalTotal)) || (subtotal + SHIPPING_CHARGE);

      // 📦 GET SHIPPING ADDRESS FROM LOCALSTORAGE
      const userAddress = JSON.parse(localStorage.getItem("userAddress")) || {};
      const firstName = userAddress.firstName || "";
      const lastName = userAddress.lastName || "";
      const address1 = userAddress.address1 || "";
      const city = userAddress.city || "";
      const zipcode = userAddress.zipcode || "";
      const phone = userAddress.phone || "";
      const email = userAddress.email || "";

      // Get state and country from dropdowns
      const state = document.getElementById("selectedCountry1")?.textContent?.trim() || "";
      const country = document.getElementById("selectedCountry")?.textContent?.trim() || "";

      let y = 20;

      // -------- HEADER --------
      doc.setFontSize(22);
      doc.text("INVOICE", 14, y);
      y += 10;

      doc.setFontSize(12);
      doc.text(`Order Number: ${orderNumber}`, 14, y);
      doc.text(`Order Date: ${orderDate}`, 140, y);
      y += 7;
      doc.text(`Payment Method: ${paymentMethod}`, 14, y);
      y += 12;

      // -------- 📦 SHIPPING ADDRESS BOX --------
      doc.setFontSize(13);
      doc.setFont(undefined, "bold");
      doc.text("Shipping Address", 14, y);
      doc.setFont(undefined, "normal");
      y += 8;

      // Draw address box
      doc.rect(14, y, 180, 35); // x, y, width, height

      let ay = y + 8;
      doc.setFontSize(11);
      doc.text(`${firstName} ${lastName}`, 20, ay);
      ay += 6;
      doc.text(address1, 20, ay);
      ay += 6;
      doc.text(`${city}, ${state} ${zipcode}`, 20, ay);
      ay += 6;
      doc.text(`${country}`, 20, ay);
      ay += 6;
      doc.text(`Phone: ${phone} | Email: ${email}`, 20, ay);

      y += 45;

      // -------- PRODUCT TABLE HEADER --------
      doc.setFontSize(13);
      doc.setFont(undefined, "bold");
      doc.text("Product", 14, y);
      doc.text("Qty", 120, y);
      doc.text("Price", 160, y);
      doc.setFont(undefined, "normal");
      y += 6;

      doc.line(14, y, 195, y); // table separator
      y += 6;

      // -------- PRODUCT LIST --------
      doc.setFontSize(11);

      products.forEach((p) => {
        const price = parseFloat(String(p.price).replace("$", "").trim()) || 0;
        const qty = parseInt(p.quantity) || 1;

        doc.text(p.name, 14, y);
        doc.text(`x${qty}`, 122, y);
        doc.text(`$${(price * qty).toFixed(2)}`, 160, y);

        y += 7;
      });

      y += 4;
      doc.line(14, y, 195, y);
      y += 10;

      // -------- SUMMARY BOX --------
      doc.setFontSize(13);
      doc.setFont(undefined, "bold");
      doc.text("Order Summary", 14, y);
      doc.setFont(undefined, "normal");
      y += 8;

      // Draw summary box
      doc.rect(14, y, 180, 45); // x, y, width, height

      let sx = y + 8;

      doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 20, sx);
      sx += 7;

      if (discountPercent > 0) {
        doc.text(`Discount (${discountPercent}% - ${appliedCoupon}): -$${discountAmountValue.toFixed(2)}`, 20, sx);
        sx += 7;
      }

      doc.text(`Shipping Charge: $${SHIPPING_CHARGE.toFixed(2)}`, 20, sx);
      sx += 7;

      doc.setFont(undefined, "bold");
      doc.text(`TOTAL: $${finalDiscountedTotal.toFixed(2)}`, 20, sx);
      doc.setFont(undefined, "normal");

      y += 55;

      // -------- ORDER NOTE --------
      if (note) {
        doc.setFontSize(12);
        doc.setFont(undefined, "bold");
        doc.text("Order Note:", 14, y);
        doc.setFont(undefined, "normal");
        y += 6;

        doc.text(note, 14, y);
        y += 10;
      }

      // -------- FOOTER --------
      doc.setFontSize(12);
      doc.text("Thank you for shopping with us!", 14, y);

      // SAVE PDF
      doc.save(`invoice_${orderNumber}.pdf`);
    });

  });
})();