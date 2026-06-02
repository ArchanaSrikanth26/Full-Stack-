import { categoryTitles, currency } from '../data/storeData'

function Products({
  selectedCategory,
  selectedProducts,
  cartItemsById,
  onAddToCart,
  onUpdateQuantity,
}) {
  return (
    <section className="page-content">
      

      <section className="catalog-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Catalog</p>
            <h3>{categoryTitles[selectedCategory]}</h3>
          </div>
          <p>{selectedProducts.length} items from your asset folder</p>
        </div>

        <div className="product-grid">
          {selectedProducts.map((product) => {
            const quantity = cartItemsById[product.id] ?? 0

            return (
              <article
                className="product-card"
                key={product.id}
                role="button"
                tabIndex={0}
                onClick={() => onAddToCart(product)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onAddToCart(product)
                  }
                }}
              >
                <div className="product-image-wrap">
                  <img src={product.image} alt={product.name} />
                  <span className="product-badge">{product.badge}</span>
                </div>

                <div className="product-info">
                  <p className="product-category">{product.categoryLabel}</p>
                  <h4>{product.name}</h4>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <strong>{currency.format(product.price)}</strong>
                    {quantity === 0 ? (
                      <button
                        type="button"
                        className="primary-button compact"
                        onClick={(event) => {
                          event.stopPropagation()
                          onAddToCart(product)
                        }}
                      >
                        Add to cart
                      </button>
                    ) : (
                      <div
                        className="quantity-inline"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <button type="button" onClick={() => onUpdateQuantity(product.id, -1)}>
                          -1
                        </button>
                        <span>{quantity}</span>
                        <button type="button" onClick={() => onUpdateQuantity(product.id, 1)}>
                          +1
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </section>
  )
}

export default Products
