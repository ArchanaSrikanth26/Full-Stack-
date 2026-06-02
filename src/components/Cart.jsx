import { currency } from '../data/storeData'

function Cart({
  cart,
  cartSubtotal,
  shipping,
  tax,
  grandTotal,
  onUpdateQuantity,
  onRemove,
  onGoToCheckout,
  onBackToShop,
}) {
  return (
    <div className="panel-stack">
      {cart.length === 0 ? (
        <div className="empty-state">
          <h4>Your cart is empty.</h4>
          <p>Add any product to begin checkout.</p>
          <button type="button" className="primary-button" onClick={onBackToShop}>
            Browse products
          </button>
        </div>
      ) : (
        <>
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="cart-item-copy">
                <div>
                  <h4>{item.name}</h4>
                  <p>{currency.format(item.price)} each</p>
                </div>
                <div className="quantity-row">
                  <button type="button" onClick={() => onUpdateQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button type="button" onClick={() => onUpdateQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </div>
              <button type="button" className="remove-button" onClick={() => onRemove(item.id)}>
                Remove
              </button>
            </article>
          ))}

          <div className="summary-card">
            <div>
              <span>Subtotal</span>
              <strong>{currency.format(cartSubtotal)}</strong>
            </div>
            <div>
              <span>Shipping</span>
              <strong>{currency.format(shipping)}</strong>
            </div>
            <div>
              <span>Tax</span>
              <strong>{currency.format(tax)}</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{currency.format(grandTotal)}</strong>
            </div>
            <button type="button" className="primary-button" onClick={onGoToCheckout}>
              Go to checkout
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
