import { currency, formatDate } from '../data/storeData'

function OrderHistory({ orders }) {
  return (
    <div className="panel-stack">
      {orders.length === 0 ? (
        <div className="empty-state">
          <h4>No orders yet.</h4>
          <p>After you confirm a payment, it will appear here.</p>
        </div>
      ) : (
        orders.map((order) => (
          <article className="order-card" key={order.id}>
            <div className="order-row">
              <div>
                <p className="eyebrow">{order.id}</p>
                <h4>{order.customer.name}</h4>
              </div>
              <span className="status-pill">{order.status}</span>
            </div>

            <p className="order-date">{formatDate(order.createdAt)}</p>
            <p>{order.items.length} products | {order.paymentMethod}</p>
            <strong>{currency.format(order.total)}</strong>
          </article>
        ))
      )}
    </div>
  )
}

export default OrderHistory
