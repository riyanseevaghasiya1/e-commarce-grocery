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

function getDefaultTimeline(orderDate) {
	const baseTimestamp = orderDate ? new Date(orderDate).toISOString() : new Date().toISOString();
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
	estimatedDeliveryEl.textContent = order.estimatedDelivery || 'To be updated';

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
                            <p class="font-medium mt-2 text-primary">${formatCurrency(item.total ?? item.price ?? 0)}</p>
                        </div>
                    </div>
                `).join('');
	}

	summarySubtotalEl.textContent = formatCurrency(order.subtotal || 0);
	summaryDiscountEl.textContent = `-${formatCurrency(order.discountAmount || 0).replace('$', '')}`;
	summaryShippingEl.textContent = formatCurrency(order.shippingCharge || 0);
	summaryPaymentEl.textContent = order.paymentMethod || '—';
	summaryTotalEl.textContent = formatCurrency(order.total || 0);

	const timeline = order.timeline && order.timeline.length ? order.timeline : getDefaultTimeline(order.orderDate);
	renderTimeline(timeline);
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