import { useMemo, useState } from 'react'

const collection = [
  { id: 1, name: 'The Form Coat', detail: 'Recycled wool / Stone', price: 420, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=900&q=85', description: 'A softly tailored coat with a generous silhouette and a considered, everyday weight.' },
  { id: 2, name: 'Everyday Knit', detail: 'Organic cotton / Ink', price: 180, category: 'Knitwear', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=85', description: 'A relaxed essential in breathable organic cotton, finished for a comfortable drape.' },
  { id: 3, name: 'Soft Structure Trouser', detail: 'Tencel twill / Clay', price: 240, category: 'Trousers', image: 'https://images.unsplash.com/photo-1506629905607-d9c297d4e5f2?auto=format&fit=crop&w=900&q=85', description: 'A fluid trouser with a clean line, made to move easily through the day.' },
  { id: 4, name: 'Studio Shirt', detail: 'Linen blend / Chalk', price: 155, category: 'Shirts', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=900&q=85', description: 'A light, unstructured shirt with subtle volume and a calm, versatile palette.' },
  { id: 5, name: 'Ritual Overshirt', detail: 'Organic cotton / Moss', price: 210, category: 'Outerwear', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=900&q=85', description: 'A substantial overshirt designed to layer over the pieces you already live in.' },
  { id: 6, name: 'No. 01 T-Shirt', detail: 'Heavyweight jersey / Ecru', price: 85, category: 'Essentials', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85', description: 'A dependable, heavyweight jersey tee with a softly structured fit.' },
]

const money = (amount) => `$${amount.toLocaleString()}`

function ArrowIcon() { return <span aria-hidden="true">↗</span> }

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [cart, setCart] = useState([])
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [checkoutStarted, setCheckoutStarted] = useState(false)

  const categories = ['All', ...new Set(collection.map((item) => item.category))]
  const filteredCollection = useMemo(() => collection.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category
    const matchesQuery = `${item.name} ${item.detail}`.toLowerCase().includes(query.toLowerCase())
    return matchesCategory && matchesQuery
  }), [category, query])
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addToCart = (product) => {
    setCart((items) => {
      const existing = items.find((item) => item.id === product.id)
      if (existing) return items.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      return [...items, { ...product, quantity: 1 }]
    })
    setSelectedProduct(null)
    setCartOpen(true)
  }
  const updateQuantity = (id, change) => setCart((items) => items.flatMap((item) => item.id === id ? (item.quantity + change > 0 ? [{ ...item, quantity: item.quantity + change }] : []) : [item]))
  const handleSubmit = (event) => { event.preventDefault(); if (email.trim()) setSubmitted(true) }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Balvadoh Apparel home">BALVADOH<small>APPAREL</small></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span>{menuOpen ? 'Close' : 'Menu'}</span><i /></button>
        <nav id="main-navigation" className={menuOpen ? 'main-nav is-open' : 'main-nav'}>
          <a href="#new" onClick={() => setMenuOpen(false)}>New arrivals</a><a href="#collection" onClick={() => setMenuOpen(false)}>Collection</a><a href="#journal" onClick={() => setMenuOpen(false)}>Journal</a><a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
        <div className="header-actions"><button type="button" onClick={() => setSearchOpen(!searchOpen)}>Search</button><button type="button" onClick={() => setCartOpen(true)}>Bag ({cartCount})</button></div>
      </header>

      {searchOpen && <div className="search-bar"><label htmlFor="site-search">Search the collection</label><input id="site-search" autoFocus value={query} onChange={(event) => { setQuery(event.target.value); document.querySelector('#collection')?.scrollIntoView({ behavior: 'smooth' }) }} placeholder="Try coat, knit, or shirt" /><button type="button" onClick={() => { setQuery(''); setSearchOpen(false) }}>Close</button></div>}
      <main id="top">
        <section className="hero" id="new"><img src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1800&q=90" alt="Model wearing the Balvadoh new season collection" /><div className="hero-overlay" /><div className="hero-copy"><p className="eyebrow light">Chapter 01 — 2025</p><h1>The new<br /><em>ritual.</em></h1><a className="button button-light" href="#collection">Explore the collection <ArrowIcon /></a></div><p className="hero-note">Clothing for a life<br />well considered.</p></section>
        <section className="intro section-pad" id="about"><p className="eyebrow">Balvadoh apparel</p><div className="intro-layout"><h2>Made for the<br /><em>in-between.</em></h2><div className="intro-body"><p>We make quiet, lasting pieces for the spaces between plans. Thoughtful clothes with a point of view, designed in our studio and made to become part of your everyday.</p><a className="text-link" href="#journal">Read our story <ArrowIcon /></a></div></div></section>
        <section className="collection section-pad" id="collection"><div className="section-heading"><div><p className="eyebrow">The essentials</p><h2>Objects to <em>live in.</em></h2></div><a className="text-link" href="#collection">View all pieces <ArrowIcon /></a></div><div className="catalog-toolbar"><div className="category-list">{categories.map((item) => <button className={category === item ? 'active' : ''} type="button" key={item} onClick={() => setCategory(item)}>{item}</button>)}</div><span>{filteredCollection.length} pieces</span></div><div className="product-grid">{filteredCollection.map((item) => <article className="product-card" key={item.id}><button className="product-hit-area" type="button" onClick={() => setSelectedProduct(item)}><div className="product-image"><img src={item.image} alt={item.name} /></div><div className="product-info"><div><h3>{item.name}</h3><p>{item.detail}</p></div><strong>{money(item.price)}</strong></div></button><button className="quick-add" type="button" onClick={() => addToCart(item)}>Add to bag <ArrowIcon /></button></article>)}</div>{filteredCollection.length === 0 && <p className="empty-state">No pieces match your search.</p>}</section>
        <section className="feature" id="journal"><div className="feature-image"><img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=85" alt="Details from the Balvadoh studio" /></div><div className="feature-copy"><p className="eyebrow">The Balvadoh journal</p><h2>In praise of<br /><em>slowness.</em></h2><p>Good design asks us to pause. A closer look at the materials, hands, and small decisions behind Chapter 01.</p><a className="button button-dark" href="#journal">Read the journal <ArrowIcon /></a></div></section>
        <section className="newsletter section-pad"><p className="eyebrow">Stay in the know</p><h2>Letters from<br /><em>the studio.</em></h2>{submitted ? <p className="success-message">Thank you — you’re on the list.</p> : <form className="signup-form" onSubmit={handleSubmit}><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="Your email address" value={email} onChange={(event) => setEmail(event.target.value)} required /><button type="submit" aria-label="Subscribe"><ArrowIcon /></button></form>}</section>
      </main>
      <footer className="site-footer"><div className="footer-brand"><a className="wordmark" href="#top">BALVADOH<small>APPAREL</small></a><p>Clothing for a life<br />well considered.</p></div><div className="footer-column"><p className="eyebrow">Explore</p><a href="#new">New arrivals</a><a href="#collection">Collection</a><a href="#journal">Journal</a></div><div className="footer-column"><p className="eyebrow">Connect</p><a href="#top">Instagram</a><a href="#top">Pinterest</a><a href="mailto:hello@balvadoh.com">Contact</a></div><div className="footer-bottom"><span>© 2025 Balvadoh Apparel</span><span>Designed with intention</span></div></footer>

      {selectedProduct && <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProduct(null)}><div className="product-modal" role="dialog" aria-modal="true" aria-label={selectedProduct.name} onClick={(event) => event.stopPropagation()}><button className="close-button" type="button" onClick={() => setSelectedProduct(null)}>×</button><img src={selectedProduct.image} alt={selectedProduct.name} /><div className="modal-copy"><p className="eyebrow">{selectedProduct.category}</p><h2>{selectedProduct.name}</h2><p className="modal-detail">{selectedProduct.detail}</p><p>{selectedProduct.description}</p><strong>{money(selectedProduct.price)}</strong><button className="button button-dark" type="button" onClick={() => addToCart(selectedProduct)}>Add to bag <ArrowIcon /></button></div></div></div>}
      <aside className={cartOpen ? 'cart-drawer is-open' : 'cart-drawer'} aria-label="Shopping bag"><div className="cart-header"><h2>Your bag <small>({cartCount})</small></h2><button type="button" onClick={() => setCartOpen(false)}>Close ×</button></div>{checkoutStarted ? <div className="checkout-message"><p className="eyebrow">Almost there</p><h2>Checkout is ready.</h2><p>This demo is ready to connect to your payment provider.</p><button className="button button-dark" type="button" onClick={() => setCheckoutStarted(false)}>Back to bag</button></div> : cart.length === 0 ? <div className="empty-cart"><p>Your bag is currently empty.</p><a className="text-link" href="#collection" onClick={() => setCartOpen(false)}>Explore the collection <ArrowIcon /></a></div> : <><div className="cart-items">{cart.map((item) => <div className="cart-item" key={item.id}><img src={item.image} alt="" /><div><h3>{item.name}</h3><p>{money(item.price)}</p><div className="quantity"><button type="button" onClick={() => updateQuantity(item.id, -1)}>−</button><span>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.id, 1)}>+</button></div></div></div>)}</div><div className="cart-total"><span>Subtotal</span><strong>{money(cartTotal)}</strong></div><button className="checkout-button" type="button" onClick={() => setCheckoutStarted(true)}>Continue to checkout <ArrowIcon /></button></>}</aside>{cartOpen && <button className="drawer-overlay" aria-label="Close shopping bag" type="button" onClick={() => setCartOpen(false)} />}
    </div>
  )
}

export default App
