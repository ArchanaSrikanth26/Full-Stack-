import { useEffect, useMemo, useState } from 'react'
import './App.css'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Header from './components/Header'
import OrderHistory from './components/OrderHistory'
import Products from './components/Products'
import {
  categories,
  categoryTitles,
  currency,
  initialCustomer,
  products,
} from './data/storeData'

function safeRead(key, fallback) {
  try {
    const storedValue = localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState('flowers')
  const [activeView, setActiveView] = useState('shop')
  const [cart, setCart] = useState(() => safeRead('ecomerce-cart', []))
  const [orders, setOrders] = useState(() => safeRead('ecomerce-orders', []))
  const [customer, setCustomer] = useState(initialCustomer)
  const [lastOrder, setLastOrder] = useState(null)
  const [toastMessage, setToastMessage] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  useEffect(() => {
    localStorage.setItem('ecomerce-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('ecomerce-orders', JSON.stringify(orders))
  }, [orders])

  const selectedProducts = useMemo(
    () => products.filter((product) => product.category === selectedCategory),
    [selectedCategory],
  )
  const cartItemsById = useMemo(
    () => Object.fromEntries(cart.map((item) => [item.id, item.quantity])),
    [cart],
  )

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = cartSubtotal > 0 && cartSubtotal < 2500 ? 149 : 0
  const tax = Math.round(cartSubtotal * 0.05)
  const grandTotal = cartSubtotal + shipping + tax
  const checkoutReady =
    customer.name.trim() &&
    customer.email.trim() &&
    customer.phone.trim() &&
    customer.address.trim() &&
    customer.city.trim() &&
    customer.pinCode.trim() &&
    cart.length > 0

  function openCategory(category) {
    setSelectedCategory(category)
    setActiveView('shop')
  }

  function showToast(message) {
    setToastMessage(message)
    setToastVisible(true)
  }

  function addToCart(product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id)

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...currentCart, { ...product, quantity: 1 }]
    })
    showToast('Product added in cart')
  }

  function updateQuantity(productId, direction) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + direction } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function removeFromCart(productId) {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
  }

  function handleCheckoutSubmit(event) {
    event.preventDefault()
    if (!checkoutReady) return
    setActiveView('payment')
  }

  function confirmPayment() {
    if (!checkoutReady) return

    const orderNumber = orders.length + 1
    const order = {
      id: `ORD-${String(orderNumber).padStart(4, '0')}`,
      createdAt: new Date().toISOString(),
      customer,
      items: cart,
      subtotal: cartSubtotal,
      shipping,
      tax,
      total: grandTotal,
      paymentMethod: customer.paymentMethod,
      status: 'Confirmed',
    }

    setOrders((currentOrders) => [order, ...currentOrders])
    setLastOrder(order)
    setCart([])
    setCustomer(initialCustomer)
    setActiveView('confirmation')
  }

  useEffect(() => {
    if (!toastVisible) return undefined

    const timer = window.setTimeout(() => {
      setToastVisible(false)
      setToastMessage('')
    }, 1800)

    return () => window.clearTimeout(timer)
  }, [toastVisible])

  return (
    <div className="app-shell">
      {toastVisible && <div className="toast-message">{toastMessage}</div>}

      <Header
        categories={categories}
        categoryTitles={categoryTitles}
        selectedCategory={selectedCategory}
        onSelectCategory={openCategory}
        cartCount={cartCount}
        onOpenOrders={() => setActiveView('orders')}
        onOpenCart={() => setActiveView('cart')}
      />

      <main className="storefront">
        {activeView === 'shop' && (
          <Products
            selectedCategory={selectedCategory}
            selectedProducts={selectedProducts}
            productCount={products.length}
            orderCount={orders.length}
            cartItemsById={cartItemsById}
            onAddToCart={addToCart}
            onSetCategory={openCategory}
            onUpdateQuantity={updateQuantity}
          />
        )}

        {activeView === 'cart' && (
          <section className="full-page-panel">
            <div className="page-heading">
              <div>
                <p className="eyebrow">Cart</p>
                <h2>Your shopping cart</h2>
              </div>
              <button type="button" className="secondary-button" onClick={() => setActiveView('shop')}>
                Continue shopping
              </button>
            </div>
            <Cart
              cart={cart}
              cartSubtotal={cartSubtotal}
              shipping={shipping}
              tax={tax}
              grandTotal={grandTotal}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
              onGoToCheckout={() => setActiveView('checkout')}
              onBackToShop={() => setActiveView('shop')}
            />
          </section>
        )}

        {activeView === 'checkout' && (
          <section className="full-page-panel">
            <div className="page-heading">
              <div>
                <p className="eyebrow">Checkout</p>
                <h2>Enter delivery details</h2>
              </div>
              <button type="button" className="secondary-button" onClick={() => setActiveView('cart')}>
                Back to cart
              </button>
            </div>
            <Checkout
              view="checkout"
              customer={customer}
              setCustomer={setCustomer}
              cartCount={cartCount}
              grandTotal={grandTotal}
              checkoutReady={checkoutReady}
              onSubmit={handleCheckoutSubmit}
              onConfirmPayment={confirmPayment}
            />
          </section>
        )}

        {activeView === 'payment' && (
          <section className="full-page-panel">
            <div className="page-heading">
              <div>
                <p className="eyebrow">Payment</p>
                <h2>Confirm your payment</h2>
              </div>
              <button type="button" className="secondary-button" onClick={() => setActiveView('checkout')}>
                Back to checkout
              </button>
            </div>
            <Checkout
              view="payment"
              customer={customer}
              setCustomer={setCustomer}
              cartCount={cartCount}
              grandTotal={grandTotal}
              checkoutReady={checkoutReady}
              onSubmit={handleCheckoutSubmit}
              onConfirmPayment={confirmPayment}
            />
          </section>
        )}

        {activeView === 'orders' && (
          <section className="full-page-panel">
            <div className="page-heading">
              <div>
                <p className="eyebrow">Order history</p>
                <h2>All confirmed orders</h2>
              </div>
              <button type="button" className="secondary-button" onClick={() => setActiveView('shop')}>
                Back to shop
              </button>
            </div>
            <OrderHistory orders={orders} />
          </section>
        )}

        {activeView === 'confirmation' && lastOrder && (
          <section className="full-page-panel">
            <div className="confirmation-card">
              <p className="eyebrow">Payment confirmed</p>
              <h3>Thank you, {lastOrder.customer.name}.</h3>
              <p>Your order {lastOrder.id} has been saved to order history.</p>
              <div className="confirmation-grid">
                <div>
                  <span>Total</span>
                  <strong>{currency.format(lastOrder.total)}</strong>
                </div>
                <div>
                  <span>Method</span>
                  <strong>{lastOrder.paymentMethod}</strong>
                </div>
                <div>
                  <span>Items</span>
                  <strong>{lastOrder.items.length}</strong>
                </div>
              </div>
              <button type="button" className="primary-button" onClick={() => setActiveView('orders')}>
                View order history
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
