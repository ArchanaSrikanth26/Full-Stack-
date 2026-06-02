function Header({
  categories,
  categoryTitles,
  selectedCategory,
  onSelectCategory,
  cartCount,
  onOpenOrders,
  onOpenCart,
}) {
  return (
    <header className="topbar">
      <div className="brand-mark">
        <span className="brand-badge">EC</span>
        <div>
          <p className="eyebrow">Premium gift store</p>
          <h1>Elegant Ecommerce</h1>
        </div>
      </div>

      <nav className="category-nav" aria-label="Shop categories">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`category-pill ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            {categoryTitles[category]}
          </button>
        ))}
      </nav>

      <div className="header-actions">
        <button type="button" className="ghost-button" onClick={onOpenOrders}>
          Order history
        </button>
        <button type="button" className="cart-button" onClick={onOpenCart}>
          Cart <span>{cartCount}</span>
        </button>
      </div>
    </header>
  )
}

export default Header
