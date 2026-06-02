import { currency } from '../data/storeData'

function Checkout({
  view,
  customer,
  setCustomer,
  cartCount,
  grandTotal,
  checkoutReady,
  onSubmit,
  onConfirmPayment,
}) {
  if (view === 'payment') {
    return (
      <div className="panel-stack">
        <div className="payment-card">
          <p className="eyebrow">Mock payment</p>
          <h4>{customer.paymentMethod}</h4>
          <p>This is a frontend-only payment confirmation screen. No backend is connected.</p>
        </div>

        <div className="summary-card">
          <div>
            <span>Name</span>
            <strong>{customer.name}</strong>
          </div>
          <div>
            <span>Delivery to</span>
            <strong>
              {customer.city}, {customer.pinCode}
            </strong>
          </div>
          <div>
            <span>Total to pay</span>
            <strong>{currency.format(grandTotal)}</strong>
          </div>
          <button type="button" className="primary-button" onClick={onConfirmPayment}>
            Confirm payment
          </button>
        </div>
      </div>
    )
  }

  return (
    <form className="checkout-form" onSubmit={onSubmit}>
      <div className="field-grid">
        <label>
          Full name
          <input
            type="text"
            value={customer.name}
            onChange={(event) => setCustomer({ ...customer, name: event.target.value })}
            placeholder="Your name"
          />
        </label>
        <label>
          Email
          <input
            type="email"
            value={customer.email}
            onChange={(event) => setCustomer({ ...customer, email: event.target.value })}
            placeholder="name@example.com"
          />
        </label>
        <label>
          Phone
          <input
            type="tel"
            value={customer.phone}
            onChange={(event) => setCustomer({ ...customer, phone: event.target.value })}
            placeholder="10 digit number"
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={customer.city}
            onChange={(event) => setCustomer({ ...customer, city: event.target.value })}
            placeholder="Your city"
          />
        </label>
        <label className="full-width">
          Address
          <textarea
            rows="3"
            value={customer.address}
            onChange={(event) => setCustomer({ ...customer, address: event.target.value })}
            placeholder="Flat no, street, area"
          />
        </label>
        <label>
          PIN code
          <input
            type="text"
            value={customer.pinCode}
            onChange={(event) => setCustomer({ ...customer, pinCode: event.target.value })}
            placeholder="6 digits"
          />
        </label>
        <label>
          Payment method
          <select
            value={customer.paymentMethod}
            onChange={(event) => setCustomer({ ...customer, paymentMethod: event.target.value })}
          >
            <option>Card</option>
            <option>UPI</option>
            <option>Cash on delivery</option>
          </select>
        </label>
      </div>

      <div className="summary-card">
        <div>
          <span>Items in cart</span>
          <strong>{cartCount}</strong>
        </div>
        <div>
          <span>Order total</span>
          <strong>{currency.format(grandTotal)}</strong>
        </div>
        <button type="submit" className="primary-button" disabled={!checkoutReady}>
          Continue to payment
        </button>
      </div>
    </form>
  )
}

export default Checkout
