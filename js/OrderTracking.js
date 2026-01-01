const PRIMARY_COLOR_CLASS = 'text-primary';



function formatCurrency(amount) {
	const numeric = Number(amount);
	if (Number.isNaN(numeric)) return '$0.00';
	return `$${numeric.toFixed(2)}`;
}

function formatTimestamp(timestamp) {
	if (!timestamp) return 'Pending';
	const date = new Date(timestamp);
	if (Number.isNaN(date.getTime())) return timestamp;
	return date.toLocaleString('en-US', {
		month: 'short',
		day: 'numeric',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit'
	});
}

function renderDeliveryAddress(address) {
	const addressBox = document.getElementById('deliveryAddressBox');

	if (!address) {
		addressBox.innerHTML = `<p class="text-gray-500">Address not available</p>`;
		return;
	}

	addressBox.innerHTML = `
		<p class="font-medium text-gray-800">${address.name || ''}</p>
		<p>${address.phone || ''}</p>
		<p>${address.line1 || ''}</p>
		${address.line2 ? `<p>${address.line2}</p>` : ''}
		<p>${address.city || ''}, ${address.state || ''} ${address.zip || address.pincode || ''}</p>
		<p>${address.country || ''}</p>
	`;
}

function getDefaultTimeline(orderTime) {
	const baseTimestamp = orderTime ? new Date(orderTime).toISOString() : null;

	return [
		{ label: 'Order Placed', state: 'completed', timestamp: baseTimestamp },
		{ label: 'Processing', state: 'current', timestamp: baseTimestamp },
		{ label: 'Out for Delivery', state: 'pending', timestamp: null },
		{ label: 'Delivered', state: 'pending', timestamp: null }
	];
}


function descriptionForStep(label) {
	const lower = (label || '').toLowerCase();
	if (lower.includes('placed')) return 'Your order has been successfully placed';
	if (lower.includes('processing')) return 'Your order is being prepared';
	if (lower.includes('delivery')) return 'Your package is on the way';
	if (lower.includes('delivered')) return 'Awaiting delivery confirmation';
	return '';
}

function buildCircle(state) {
	if (state === 'completed') {
		return `<div class="w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-primary text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>`;
	}
	if (state === 'current') {
		return `<div class="w-12 h-12 rounded-full flex items-center justify-center mb-2 border-4 border-primary bg-white">
                    <div class="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                </div>`;
	}
	return `<div class="w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-gray-300 text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>`;
}

function buildMobileCircle(state) {
	if (state === 'completed') {
		return `<div class="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>`;
	}
	if (state === 'current') {
		return `<div class="w-10 h-10 rounded-full flex items-center justify-center border-4 border-primary bg-white">
                    <div class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
                </div>`;
	}
	return `<div class="w-10 h-10 rounded-full flex items-center justify-center bg-gray-300 text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
            </div>`;
}

function renderTimeline(timeline) {
	const desktopTimeline = document.getElementById('desktopTimeline');
	const mobileTimeline = document.getElementById('mobileTimeline');

	desktopTimeline.innerHTML = '';
	mobileTimeline.innerHTML = '';

	if (!timeline || !timeline.length) {
		desktopTimeline.innerHTML = '<p class="text-gray-500">Timeline unavailable.</p>';
		mobileTimeline.innerHTML = '<p class="text-gray-500">Timeline unavailable.</p>';
		return;
	}

	let desktopHTML = '';
	timeline.forEach((step, idx) => {
		const state = step.state || 'pending';
		const isCurrent = state === 'current';
		const labelClass = isCurrent ? 'text-sm font-medium text-primary text-center' : 'text-sm font-medium text-gray-800 text-center';
		desktopHTML += `
                    <div class="flex flex-col items-center flex-1">
                        ${buildCircle(state)}
                        <p class="${labelClass}">${step.label}</p>
                        <p class="text-xs text-gray-500 mt-1 text-center">${formatTimestamp(step.timestamp)}</p>
                    </div>
                `;
		if (idx < timeline.length - 1) {
			const connectorClass = (state === 'completed' || state === 'current') ? 'bg-primary' : 'bg-gray-300';
			desktopHTML += `<div class="flex-1 h-1 mx-4 ${connectorClass} hidden md:block"></div>`;
		}
	});
	desktopTimeline.innerHTML = desktopHTML;

	let mobileHTML = '';
	timeline.forEach((step, idx) => {
		const state = step.state || 'pending';
		const isCurrent = state === 'current';
		const labelClass = isCurrent ? 'font-medium text-primary' : 'font-medium text-gray-800';
		const connectorClass = (state === 'completed' || state === 'current') ? 'bg-primary' : 'bg-gray-300';
		const hasConnector = idx < timeline.length - 1;

		mobileHTML += `
                    <div class="flex gap-4 ${hasConnector ? 'pb-8' : ''} relative">
                        <div class="flex flex-col items-center relative">
                            ${buildMobileCircle(state)}
                            ${hasConnector ? `<div class="w-0.5 flex-1 absolute top-10 ${connectorClass}" style="height: calc(100% - 40px);"></div>` : ''}
                        </div>
                        <div class="flex-1 pb-4">
                            <p class="${labelClass}">${step.label}</p>
                            <p class="text-sm text-gray-500 mt-1">${formatTimestamp(step.timestamp)}</p>
                            <p class="text-sm text-gray-600 mt-2">${step.description || descriptionForStep(step.label)}</p>
                        </div>
                    </div>
                `;
	});
	mobileTimeline.innerHTML = mobileHTML;
}

function renderOrderDetails(order) {
	const orderIdEl = document.getElementById('trackingOrderId');
	const orderDateEl = document.getElementById('trackingOrderDate');
	const estimatedDeliveryEl = document.getElementById('trackingEstimatedDelivery');
	const itemsListEl = document.getElementById('orderItemsList');
	const summarySubtotalEl = document.getElementById('summarySubtotal');
	const summaryDiscountEl = document.getElementById('summaryDiscount');
	const summaryShippingEl = document.getElementById('summaryShipping');
	const summaryPaymentEl = document.getElementById('summaryPayment');
	const summaryTotalEl = document.getElementById('summaryTotal');

	if (!order) {
		orderIdEl.textContent = '—';
		orderDateEl.textContent = '—';
		estimatedDeliveryEl.textContent = '—';
		itemsListEl.innerHTML = '<p class="text-gray-500">We could not find any order details. Please return to your orders list.</p>';
		summarySubtotalEl.textContent = '$0.00';
		summaryDiscountEl.textContent = '-$0.00';
		summaryShippingEl.textContent = '$0.00';
		summaryPaymentEl.textContent = '—';
		summaryTotalEl.textContent = '$0.00';
		renderTimeline([]);
		return;
	}

	orderIdEl.textContent = `#${order.orderId}`;
	orderDateEl.textContent = order.orderDate || '—';

	// 🔴 1 HOUR DELIVERY LOGIC
	if (order.orderTime) {
		const date = new Date(order.orderTime);
		date.setMinutes(date.getMinutes() + 60); // +1 hour
		estimatedDeliveryEl.textContent = date.toLocaleTimeString('en-US', {
			hour: 'numeric',
			minute: '2-digit'
		});
	} else {
		estimatedDeliveryEl.textContent = 'To be updated';
	}


	const items = Array.isArray(order.items) ? order.items : [];
	if (!items.length) {
		itemsListEl.innerHTML = '<p class="text-gray-500">No items found in this order.</p>';
	} else {
		itemsListEl.innerHTML = items.map((item, index) => `
                    <div class="flex gap-4 pb-4 border-b border-gray-200 ${index === items.length - 1 ? 'border-b-0' : ''}">
                        <div class="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                            ${item.image
				? `<img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">`
				: `<div class="w-full h-full flex items-center justify-center text-xs text-gray-400 bg-gray-200">No Image</div>`
			}
                        </div>
                        <div class="flex-1">
                            <p class="font-medium text-gray-800">${item.name || 'Unnamed product'}</p>
                            <p class="text-sm text-gray-500 mt-1">Quantity: ${item.quantity ?? 1}</p>
                            <p class="font-medium mt-2 text-primary current-price">${formatCurrency(item.total ?? item.price ?? 0)}</p>
                        </div>
                    </div>
                `).join('');
	}

	summarySubtotalEl.textContent = formatCurrency(order.subtotal || 0);
	summaryDiscountEl.textContent = `-${formatCurrency(order.discountAmount || 0).replace('$', '')}`;
	summaryShippingEl.textContent = formatCurrency(order.shippingCharge || 0);
	summaryPaymentEl.textContent = order.paymentMethod || '—';
	summaryTotalEl.textContent = formatCurrency(order.total || 0);

	// ✅ સૌ પહેલાં ADDRESS RENDER કરો (cancel check પહેલાં!)
	renderDeliveryAddress({
		name: order.customer?.name,
		phone: order.customer?.phone,
		line1: order.customer?.address?.line1,
		city: order.customer?.address?.city,
		state: order.customer?.address?.state,
		zip: order.customer?.address?.zip,
		country: order.customer?.address?.country
	});

	if (order.status === 'Replaced') {
		statusText = 'Replaced';
		statusClass = 'text-orange-600';
	}
	// 🔁 REPLACED ORDER CASE
	if (order.status === 'Replaced') {
		// Treat replaced order like new delivery
		renderTimeline(order.timeline);

		const estimatedDeliveryEl = document.getElementById('trackingEstimatedDelivery');
		if (order.replacedAt) {
			const d = new Date(order.replacedAt);
			d.setMinutes(d.getMinutes() + 60); // 1 hour delivery
			estimatedDeliveryEl.textContent = d.toLocaleTimeString('en-US', {
				hour: 'numeric',
				minute: '2-digit'
			});
		}
	}


	// ❌ Cancel UI ONLY when order is actually canceled
	if (order.status === 'Canceled') {

		const cancelHTML = `
		<div class="flex flex-col items-center justify-center text-center text-red-600 py-10 w-full">
			<i class="fa-solid fa-circle-xmark text-5xl mb-4"></i>
			<h2 class="text-2xl font-semibold mb-2">Order Canceled</h2>
			<p class="text-gray-600">
				This order was canceled and will not be delivered.
			</p>
		</div>
	`;

		document.getElementById('desktopTimeline').innerHTML = cancelHTML;
		document.getElementById('mobileTimeline').innerHTML = cancelHTML;

		return; // ⛔ stop further execution
	}


	// Normal orders માટે timeline render કરો
	const timeline = order.timeline && order.timeline.length ? order.timeline : getDefaultTimeline(order.orderDate);
	renderTimeline(timeline);

	// 🔁 EXCHANGE OPTION (ONLY AFTER DELIVERY + 5 HOURS)
	const exchangeBox = document.getElementById('exchangeBox');

	if (exchangeBox) {
		exchangeBox.innerHTML = ''; // reset
	}

	if (order.status === 'Delivered' && isExchangeAllowed(order)) {
		exchangeBox.innerHTML = `
		<div class="mt-6 p-5 border rounded-lg bg-yellow-50">
			<h3 class="text-lg font-semibold mb-2">Exchange Product</h3>
			<p class="text-sm text-gray-600 mb-3">
				You can exchange this product within 5 hours after delivery.
			</p>

			<select id="exchangeReason" class="w-full border rounded p-2 mb-3">
				<option value="">Select reason</option>
				<option value="Damaged">Damaged Product</option>
				<option value="Wrong Item">Wrong Item Delivered</option>
				<option value="Quality Issue">Quality Issue</option>
			</select>

			<button id="exchangeBtn"
				class="bg-primary text-white px-4 py-2 rounded">
				Request Exchange
			</button>
		</div>
	`;

		bindExchangeEvent(order);
	}
	else if (order.status === 'Delivered' && !isExchangeAllowed(order)) {
		exchangeBox.innerHTML = `
		<div class="mt-6 p-4 border border-red-200 rounded-lg bg-red-50 text-red-600">
			⏱️ Exchange period expired.  
			Exchange was available only for 5 hours after delivery.
		</div>
	`;
	}




	// 🔴 AUTO MARK AS DELIVERED (ORDER / REPLACED)
	const baseTime = order.replacedAt || order.orderTime;

	if (baseTime && order.status !== 'Delivered') {

		const endTime = new Date(baseTime);
		endTime.setMinutes(endTime.getMinutes() + 60); // 1 hour

		if (new Date() >= endTime) {

			order.status = 'Delivered';
			order.deliveredAt = new Date().toISOString();

			if (order.timeline && order.timeline.length >= 4) {
				order.timeline[2].state = 'completed';
				order.timeline[2].timestamp = endTime.toISOString();

				order.timeline[3].state = 'completed';
				order.timeline[3].timestamp = endTime.toISOString();
			}

			let orders = JSON.parse(localStorage.getItem('orders')) || [];
			const idx = orders.findIndex(o => o.orderId === order.orderId);

			if (idx !== -1) {
				orders[idx] = order;
				localStorage.setItem('orders', JSON.stringify(orders));
			}
		}
	}


}

document.addEventListener('DOMContentLoaded', () => {
	let orders = [];
	try {
		orders = JSON.parse(localStorage.getItem('orders')) || [];
	} catch (error) {
		console.error('Unable to read stored orders', error);
	}

	let selectedOrderId = null;
	try {
		selectedOrderId = localStorage.getItem('selectedOrderId');
	} catch (error) {
		console.error('Unable to read selected order id', error);
	}

	let order = null;
	if (selectedOrderId) {
		order = orders.find((o) => o.orderId === selectedOrderId) || null;
	}
	if (!order && orders.length) {
		order = orders[0];
	}

	renderOrderDetails(order);
});


function isExchangeAllowed(order) {
	if (!order.deliveredAt) return false;

	const deliveredTime = new Date(order.deliveredAt);
	const now = new Date();

	const diffMs = now - deliveredTime;
	const diffHours = diffMs / (1000 * 60 * 60);

	return diffHours <= 5; // ✅ only 5 hours allowed
}

function bindExchangeEvent(order) {
	const btn = document.getElementById('exchangeBtn');
	if (!btn) return;

	btn.onclick = () => {
		const reason = document.getElementById('exchangeReason').value;
		if (!reason) {
			alert('Please select exchange reason');
			return;
		}

		if (!isExchangeAllowed(order)) {
			alert('Exchange time expired');
			return;
		}

		let orders = JSON.parse(localStorage.getItem('orders')) || [];
		const idx = orders.findIndex(o => o.orderId === order.orderId);

		if (idx === -1) return;

		if (!orders[idx].exchangeRequests) {
			orders[idx].exchangeRequests = [];
		}

		// 🔴 ADD EXCHANGE REQUEST
		orders[idx].exchangeRequests.push({
			reason,
			requestedAt: new Date().toISOString(),
			status: 'Requested'
		});

		const replaceTime = new Date().toISOString();

		orders[idx].status = 'Replaced';
		orders[idx].replacedAt = replaceTime;

		// 🔁 RESET DELIVERY PROCESS
		orders[idx].timeline = [
			{ label: 'Order Replaced', state: 'completed', timestamp: replaceTime },
			{ label: 'Processing', state: 'current', timestamp: replaceTime },
			{ label: 'Out for Delivery', state: 'pending', timestamp: null },
			{ label: 'Delivered', state: 'pending', timestamp: null }
		];

		// ❌ Old delivered data remove
		delete orders[idx].deliveredAt;


		localStorage.setItem('orders', JSON.stringify(orders));



		localStorage.setItem('orders', JSON.stringify(orders));

		alert('Exchange request submitted successfully ✅');
	};
}
