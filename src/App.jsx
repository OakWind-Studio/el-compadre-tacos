import { useState, useEffect } from 'react'
import {
  MapPin, Phone, Clock, Star, ExternalLink, ChevronDown,
  Flame, Drumstick, UtensilsCrossed, Sun, Sandwich,
  Facebook, Menu, X, Heart,
  ShoppingBag, Truck, Users, Award, Sparkles
} from 'lucide-react'

/* ─── Data ─────────────────────────────────────────────── */
const MENU_CATEGORIES = [
  {
    id: 'wings',
    label: 'Wings & Fries',
    items: [
      { name: 'Mango Habanero Wings', desc: 'Sweet meets heat. Our most-talked-about item — crispy wings tossed in house mango habanero sauce. Served with fries, ranch, celery, and carrots.', popular: true },
      { name: 'Classic Wings', desc: 'Crispy fried wings with your choice of sauce. Served with fries and ranch.' },
      { name: 'Asada Loaded Fries', desc: 'The legend. Seasoned fries piled with steak, Monterey Jack, chorizo, beans, guacamole, and pico.', popular: true },
      { name: 'Crispy Fries', desc: 'Golden, seasoned fries. Perfect on their own.' },
    ]
  },
  {
    id: 'tacos',
    label: 'Tacos',
    items: [
      { name: 'Carne Asada', desc: 'Tender, seasoned chopped steak on freshly made flour tortillas. The reason regulars come back every single day.', popular: true },
      { name: 'Carnitas', desc: 'Slow-cooked, crispy-edged pork carnitas with salsa verde and fresh cilantro.' },
      { name: 'Al Pastor', desc: 'Marinated pork with pineapple, achiote, and our house pastor salsa.' },
      { name: 'Chicken', desc: 'Seasoned grilled chicken, soft and flavorful.' },
      { name: 'Tripas', desc: 'Crispy beef tripe — authentic, beloved by regulars from the border.' },
      { name: 'Chicharrón', desc: 'Pork rind braised in red salsa. Comforting and rich.' },
      { name: 'Barbacoa', desc: 'Slow-cooked, tender beef cheek — weekend special.' },
      { name: 'Cabeza', desc: 'Beef head meat — melt-in-your-mouth and deeply flavorful.' },
      { name: 'Shrimp', desc: 'Sautéed shrimp with garlic, butter, and a touch of lime.' },
      { name: 'Fish', desc: 'Lightly seasoned fried fish with crema and cabbage slaw.' },
      { name: 'Salmon', desc: 'Grilled salmon taco — elevated, delicate, and fresh.' },
      { name: 'Lobster', desc: 'Premium. A true taco upgrade — ask about availability.' },
    ]
  },
  {
    id: 'breakfast',
    label: 'Breakfast',
    items: [
      { name: 'Chipaquiles Rojos', desc: 'Crispy tortillas bathed in our house red salsa, topped with cheese, crema, and your choice of protein.' },
      { name: 'Chipaquiles Verdes', desc: 'Same crispy base, bright tomatillo green salsa, fresh crema, and melted cheese.' },
      { name: 'Chipaquiles Mixtos', desc: 'Half red, half green — the best of both worlds. Our most-recommended breakfast.', popular: true },
      { name: 'VIP Breakfast', desc: "Some of the fluffiest pancakes you've ever tasted, served with eggs and your choice of sides." },
      { name: 'Breakfast Tacos', desc: 'Fluffy scrambled eggs, cheese, and your choice of protein on a warm flour tortilla.' },
      { name: 'Platillos de Huevos', desc: 'Classic egg plates — rancheros, a la mexicana, scrambled — served with rice and beans.' },
      { name: 'Café de Olla', desc: 'Traditional Mexican coffee brewed with molasses, cinnamon, and anise. A cozy ritual.' },
    ]
  },
  {
    id: 'plates',
    label: 'Plates & Entrees',
    items: [
      { name: 'Asada Loaded Fries', desc: 'Our most-ordered item. Seasoned fries topped with chopped steak, Monterey Jack, chorizo, refried beans, salsa Colorado, sour cream, guacamole, and pico de gallo.', popular: true },
      { name: 'Milanesa', desc: 'Breaded steak served with crispy fries and homemade guacamole.' },
      { name: 'Chile Rellenos', desc: 'Pasilla peppers stuffed with Monterey Jack cheese, bathed in salsa ranchera.' },
      { name: 'Enchiladas', desc: 'Rolled tortillas filled with chicken, beef, or cheese — your choice of red or green salsa.' },
      { name: 'Taquitos', desc: 'Crispy rolled tacos topped with shredded cheese, sour cream, and guacamole.' },
      { name: 'Chimichangas', desc: 'Deep-fried burrito with your choice of filling, served with rice and beans.' },
      { name: 'Tamales', desc: 'Handmade masa filled with chicken, beef, or rajas con queso. Made the traditional way.' },
      { name: 'Fajitas', desc: 'Sizzling steak or chicken with peppers, onions, and all the fixings.' },
      { name: 'Carne Guisada', desc: 'Tender steak simmered in a rich vegetable-tomato sauce.' },
      { name: 'Chile Verde', desc: 'Pork slow-cooked in tomatillo green chile sauce.' },
      { name: 'Chile Colorado', desc: 'Pork simmered in dried red chile — deep, smoky, and satisfying.' },
      { name: 'Carnitas Plate', desc: 'Full plate of slow-cooked carnitas with rice, beans, and tortillas.' },
      { name: 'Bistec Ranchero', desc: 'NY strip steak in a vibrant Spanish salsa with peppers and tomatoes.' },
      { name: 'Lengua en Salsa', desc: 'Beef tongue braised to tenderness in house salsa. A traditional favorite.' },
      { name: 'Mole de Pollo', desc: 'Chicken served in our special mole sauce — complex, rich, and worth every bite.' },
    ]
  },
  {
    id: 'burritos',
    label: 'Burritos',
    items: [
      { name: 'Carne Asada Burrito', desc: 'Tender asada, rice, beans, and salsa wrapped in a warm flour tortilla.' },
      { name: 'Shrimp & Rice Burrito', desc: 'Sautéed shrimp, rice, beans, and crema — a crowd favorite.' },
      { name: 'Carnitas Burrito', desc: 'Slow-cooked pork carnitas with all the fixings.' },
      { name: 'Al Pastor Burrito', desc: 'Marinated pastor with pineapple, rice, and beans.' },
      { name: 'Bean & Cheese Burrito', desc: 'Simple, satisfying, and classic. Refried beans and melted cheese.' },
      { name: 'Veggie Burrito', desc: 'Roasted vegetables, rice, beans, guacamole, and salsa.' },
    ]
  },
  {
    id: 'burgers',
    label: 'Burgers & Sandwiches',
    items: [
      { name: 'Cheeseburger', desc: 'Classic smash-style cheeseburger on a toasted bun, with fries.' },
      { name: 'Double Meat Burger', desc: 'Double the beef, double the satisfaction. Fully loaded.' },
      { name: 'Hamburger', desc: 'Simple, classic, done right.' },
      { name: 'BLT', desc: 'Bacon, lettuce, tomato on toasted bread — with fries.' },
      { name: 'Turkey Club', desc: 'Triple-decker turkey club with the works.' },
      { name: 'Grilled Cheese', desc: 'Buttery, melty, perfect comfort food.' },
    ]
  },
  {
    id: 'sides',
    label: 'Sides',
    items: [
      { name: 'Mexican Rice', desc: 'Fluffy tomato rice with herbs — the perfect companion.' },
      { name: 'Refried Beans', desc: 'Creamy house-made refried beans or whole beans.' },
      { name: 'Elote', desc: 'Mexican street corn with crema, cotija, and chili powder.' },
      { name: 'Homemade Guacamole', desc: 'Fresh, chunky, made in-house. The real deal.' },
      { name: 'Queso', desc: 'Warm, melted cheese dip with house salsa.' },
      { name: 'Gorditas de Chicharrón', desc: "Handmade masa pockets stuffed with crispy chicharrón. Homemade, just like abuela's.", popular: true },
    ]
  },
  {
    id: 'drinks',
    label: 'Drinks & Desserts',
    items: [
      { name: 'Horchata', desc: 'House-made cinnamon rice milk. Cool, creamy, and refreshing.' },
      { name: 'Jamaica', desc: 'Hibiscus flower agua fresca — sweet, tart, and vibrant.' },
      { name: 'Tamarindo', desc: 'Tangy tamarind agua fresca — uniquely satisfying.' },
      { name: 'Café de Olla', desc: 'Traditional Mexican coffee with molasses, cinnamon, and anise.' },
      { name: 'Shakes', desc: "Ask your server for today's flavors." },
      { name: 'Tres Leches Cake', desc: 'Light sponge cake soaked in three milks — rich, sweet, and worth saving room for.' },
    ]
  },
  {
    id: 'kids',
    label: 'Kids Menu',
    items: [
      { name: "Kid's Taco", desc: 'One taco on a flour tortilla with mild toppings. For 12 and under.' },
      { name: "Kid's Quesadilla", desc: 'Cheese quesadilla, crispy and simple. Kids love it.' },
      { name: 'Bean & Cheese Burrito', desc: 'A classic mild burrito — perfectly sized for little ones.' },
      { name: 'Cheese Enchilada', desc: 'Mild red sauce, melted cheese, and a happy kid.' },
    ]
  },
]

const REVIEWS = [
  {
    text: "I'm from the south border of Texas so I'm very picky with Mexican food, but I think this is a WINNER. Gorditas de chicharrón, tacos de tripa and tacos de asada — we've visited 3 times, and all 3 times the food, customer service and atmosphere has been amazing.",
    author: "Marco R.",
    source: "Google",
    stars: 5,
    highlight: false,
  },
  {
    text: "I ordered the chilaquiles mixtos and the asada loaded fries. My server was GiGi and she was so polite and friendly, she recommended the mixtos for me and it didn't disappoint. The star of the show were the asada loaded fries. They were a perfect 10.",
    author: "Ashley K.",
    source: "Google",
    stars: 5,
    highlight: true,
  },
  {
    text: "This place has incredible food and the friendliest staff. I randomly tried it while working in the area one day and returned everyday for lunch because it was so good. Carne asada tacos on flour tortillas and mango habanero wings are my go to items.",
    author: "James T.",
    source: "Google",
    stars: 5,
    highlight: false,
  },
  {
    text: "Visited this place today for the first time after seeing it on a reels video and it was soooo good! Everything was absolutely fantastic, and everyone was super friendly. Even the owner stopped by our table to say hi and see how we liked everything!",
    author: "Priya M.",
    source: "Google",
    stars: 5,
    highlight: false,
  },
  {
    text: "Loved their café de olla, chipaquiles, the tacos al pastor and the menudo. Bonus points for the fantastic customer service and making you feel at home. We will have to return.",
    author: "Rosa & David L.",
    source: "Google",
    stars: 5,
    highlight: false,
  },
  {
    text: "Chicken and Steak quesadilla made in less than 10 minutes. Absolutely thick and amazing. So polite these women were. Will be back!",
    author: "Kevin W.",
    source: "Restaurantji",
    stars: 5,
    highlight: false,
  },
]

const HOURS_28TH = [
  { day: 'Monday', hours: '8:00 AM – 3:00 PM' },
  { day: 'Tuesday', hours: '8:00 AM – 9:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 9:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 9:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 9:00 PM' },
  { day: 'Saturday', hours: '8:00 AM – 9:00 PM' },
  { day: 'Sunday', hours: '8:00 AM – 9:00 PM' },
]

const HOURS_WHITE = [
  { day: 'Monday', hours: '8:00 AM – 2:00 PM' },
  { day: 'Tuesday', hours: '8:00 AM – 9:00 PM' },
  { day: 'Wednesday', hours: '8:00 AM – 9:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 9:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 9:00 PM' },
  { day: 'Saturday', hours: '8:00 AM – 9:00 PM' },
  { day: 'Sunday', hours: '8:00 AM – 9:00 PM' },
]

/* ─── Hooks ─────────────────────────────────────────────── */
function useScrollFade() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )
    const refresh = () => document.querySelectorAll('.observe-fade').forEach(el => observer.observe(el))
    refresh()
    const t1 = setInterval(refresh, 600)
    setTimeout(() => clearInterval(t1), 6000)
    return () => observer.disconnect()
  }, [])
}

// Improvement #1: Real-time "Open Now" hook
function useIsOpen() {
  const [status, setStatus] = useState({ open: false, closeTime: '', opensAt: '' })

  useEffect(() => {
    const check = () => {
      const now = new Date()
      const day = now.getDay() // 0=Sun, 1=Mon
      const t = now.getHours() * 60 + now.getMinutes()
      const openMin = 8 * 60 // 8:00 AM

      let closeMin, closeLabel
      if (day === 1) {
        closeMin = 15 * 60 // Mon 3pm (NE 28th)
        closeLabel = '3:00 PM'
      } else {
        closeMin = 21 * 60 // 9pm
        closeLabel = '9:00 PM'
      }

      if (t >= openMin && t < closeMin) {
        setStatus({ open: true, closeTime: closeLabel, opensAt: '' })
      } else {
        const nextOpenLabel = '8:00 AM'
        setStatus({ open: false, closeTime: '', opensAt: nextOpenLabel })
      }
    }
    check()
    const interval = setInterval(check, 60000)
    return () => clearInterval(interval)
  }, [])

  return status
}

/* ─── Utilities ──────────────────────────────────────────── */
function Stars({ count = 5, size = 16 }) {
  return (
    <div style={{ display: 'flex', gap: '2px', color: 'var(--gold)' }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={size} fill="currentColor" />
      ))}
    </div>
  )
}

function WaveDown({ fill = '#FBF7F0', bg = 'transparent' }) {
  return (
    <div style={{ background: bg, lineHeight: 0, display: 'block', overflow: 'hidden' }}>
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '56px' }}>
        <path d="M0,36 C240,72 480,0 720,36 C960,72 1200,0 1440,36 L1440,72 L0,72 Z" fill={fill} />
      </svg>
    </div>
  )
}

function WaveUp({ fill = '#FBF7F0', bg = 'transparent' }) {
  return (
    <div style={{ background: bg, lineHeight: 0, display: 'block', overflow: 'hidden' }}>
      <svg viewBox="0 0 1440 72" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '56px' }}>
        <path d="M0,36 C240,0 480,72 720,36 C960,0 1200,72 1440,36 L1440,0 L0,0 Z" fill={fill} />
      </svg>
    </div>
  )
}

/* ─── Nav ─────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '#menu', label: 'Menu' },
    { href: '#story', label: 'Our Story' },
    { href: '#locations', label: 'Locations' },
    { href: '#reviews', label: 'Reviews' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: scrolled ? 'rgba(44,24,16,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      boxShadow: scrolled ? '0 2px 20px rgba(44,24,16,0.3)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: scrolled ? '60px' : '72px', transition: 'height 0.3s' }}>
          <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%',
              background: 'var(--red)', border: '2px solid var(--gold)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <span style={{ color: 'white', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1rem' }}>EC</span>
            </div>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '1rem' }}>El Compadre</div>
              <div style={{ color: 'var(--gold)', fontFamily: 'var(--font-accent)', fontSize: '0.58rem', letterSpacing: '0.15em' }}>TACOS Y MAS · FORT WORTH</div>
            </div>
          </a>

          <div style={{ display: 'none' }} className="nav-desktop">
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              {links.map(l => (
                <a key={l.href} href={l.href} className="nav-link"
                  style={{ color: 'rgba(255,245,230,0.88)', fontSize: '0.88rem', fontWeight: 500 }}>
                  {l.label}
                </a>
              ))}
              <a href="tel:+18173865820" style={{
                background: 'var(--red)', color: 'white',
                padding: '0.45rem 1.1rem', borderRadius: '9999px',
                fontSize: '0.82rem', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: '0.35rem',
              }}>
                <Phone size={13} /> (817) 386-5820
              </a>
            </div>
          </div>

          <button onClick={() => setOpen(o => !o)} className="nav-mobile-btn"
            style={{ color: 'white', background: 'transparent', padding: '0.5rem', display: 'none' }}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className={`mobile-nav ${open ? 'open' : 'closed'}`}
          style={{ borderTop: open ? '1px solid rgba(255,245,230,0.1)' : 'none' }}>
          <div style={{ padding: '1rem 0', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {links.map(l => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ color: 'rgba(255,245,230,0.88)', fontSize: '1rem', fontWeight: 500 }}>
                {l.label}
              </a>
            ))}
            <a href="tel:+18173865820" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--red)', color: 'white',
              padding: '0.7rem 1.4rem', borderRadius: '9999px',
              fontWeight: 600, alignSelf: 'flex-start', marginTop: '0.5rem',
            }}>
              <Phone size={15} /> Call to Order
            </a>
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 768px) { .nav-desktop { display: flex !important; } .nav-mobile-btn { display: none !important; } }
        @media (max-width: 767px) { .nav-mobile-btn { display: block !important; } }
      `}</style>
    </nav>
  )
}

/* ─── Hero (Improvement #1: Open Now indicator + phone standalone) ─── */
function Hero() {
  const { open, closeTime, opensAt } = useIsOpen()

  return (
    <section id="top" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url('https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=1600&q=85&fit=crop')`,
        backgroundSize: 'cover', backgroundPosition: 'center 45%',
        filter: 'brightness(0.38) saturate(1.3)',
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(150deg, rgba(44,24,16,0.55) 0%, rgba(181,40,30,0.22) 50%, rgba(26,71,49,0.38) 100%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', padding: '7rem 1.5rem 5rem', width: '100%' }}>
        {/* Eyebrow */}
        <div className="hero-animate-1" style={{ marginBottom: '1.25rem', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(232,168,56,0.18)', border: '1px solid rgba(232,168,56,0.45)',
            borderRadius: '9999px', padding: '0.35rem 1rem',
            color: 'var(--gold-light)', fontSize: '0.78rem', fontWeight: 600,
            letterSpacing: '0.08em', backdropFilter: 'blur(8px)', fontFamily: 'var(--font-accent)',
          }}>
            <Flame size={13} style={{ color: 'var(--gold)' }} />
            FAMILY-OWNED · FORT WORTH, TX · TWO LOCATIONS
          </span>

          {/* Open Now badge — Improvement #1 */}
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            background: open ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
            border: `1px solid ${open ? 'rgba(34,197,94,0.45)' : 'rgba(239,68,68,0.45)'}`,
            borderRadius: '9999px', padding: '0.35rem 0.875rem',
            color: open ? '#86efac' : '#fca5a5',
            fontSize: '0.78rem', fontWeight: 600, backdropFilter: 'blur(8px)',
          }}>
            <span className={open ? 'open-dot' : ''} style={{
              width: '7px', height: '7px', borderRadius: '50%',
              background: open ? '#22c55e' : '#ef4444', flexShrink: 0,
            }} />
            {open ? `Open Now · Until ${closeTime}` : `Closed · Opens at ${opensAt}`}
          </span>
        </div>

        <h1 className="hero-animate-2" style={{
          fontFamily: 'var(--font-display)', color: 'white',
          fontSize: 'clamp(2.6rem, 8vw, 5.8rem)', lineHeight: 1.02,
          letterSpacing: '-0.02em', marginBottom: '1.25rem',
        }}>
          Fort Worth's<br />
          <em style={{ color: 'var(--gold)' }}>Favorite Family</em><br />
          Taqueria.
        </h1>

        <p className="hero-animate-3" style={{
          color: 'rgba(255,245,230,0.85)', fontSize: 'clamp(1rem, 2.2vw, 1.18rem)',
          lineHeight: 1.75, maxWidth: '520px', marginBottom: '2.25rem',
        }}>
          Two locations. One family. From carne asada tacos to mango habanero wings —
          everything made with love, <em>sazon</em>, and the freshest ingredients.
          Come hungry, leave happy.
        </p>

        {/* CTAs — Improvement #1: phone shown standalone */}
        <div className="hero-animate-4" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginBottom: '1.25rem' }}>
          <a href="#menu" style={{
            background: 'var(--red)', color: 'white',
            padding: '0.9rem 2rem', borderRadius: '9999px',
            fontWeight: 700, fontSize: '1rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            boxShadow: '0 8px 28px rgba(181,40,30,0.5)', transition: 'all 0.25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-light)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.transform = 'translateY(0)' }}>
            View Our Menu <ChevronDown size={17} />
          </a>
          <a href="tel:+18173865820" style={{
            background: 'rgba(255,245,230,0.1)', border: '2px solid rgba(255,245,230,0.38)',
            color: 'var(--white-warm)', padding: '0.9rem 2rem', borderRadius: '9999px',
            fontWeight: 600, fontSize: '1rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            backdropFilter: 'blur(8px)', transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,245,230,0.2)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,245,230,0.1)'}>
            <Phone size={16} /> Order Pickup
          </a>
        </div>

        {/* Standalone phone — Improvement #1 */}
        <div className="hero-animate-4" style={{ marginBottom: '2.5rem' }}>
          <a href="tel:+18173865820" style={{
            color: 'rgba(255,245,230,0.55)', fontSize: '0.85rem',
            display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
          }}>
            <Phone size={13} />
            Or call us: (817) 386-5820
          </a>
        </div>

        {/* Trust strip */}
        <div className="hero-animate-5" style={{
          display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem',
          paddingTop: '1.5rem', borderTop: '1px solid rgba(255,245,230,0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Stars />
            <span style={{ color: 'var(--gold-light)', fontWeight: 700, fontSize: '0.95rem' }}>4.8</span>
            <span style={{ color: 'rgba(255,245,230,0.55)', fontSize: '0.8rem' }}>· 280+ Reviews</span>
          </div>
          {['2 Fort Worth Locations', 'Family-Owned', '39K+ TikTok Likes', 'DoorDash & Favor'].map(item => (
            <span key={item} style={{ color: 'rgba(255,245,230,0.65)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ color: 'var(--gold)' }}>·</span> {item}
            </span>
          ))}
        </div>
      </div>

      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 3 }}>
        <WaveDown fill="var(--cream)" bg="transparent" />
      </div>
    </section>
  )
}

/* ─── Improvement #2: Social Proof Ticker ────────────────── */
function SocialProofTicker() {
  const items = [
    { icon: Star, text: '4.8 Stars on Google' },
    { icon: Users, text: '280+ Verified Reviews' },
    { icon: Award, text: '278,000 TikTok Views' },
    { icon: Flame, text: 'Featured in Fort Worth Foodies' },
    { icon: MapPin, text: '2 Fort Worth Locations' },
    { icon: Heart, text: 'Family-Owned & Operated' },
    { icon: Truck, text: 'Available on DoorDash & Favor' },
    { icon: Star, text: 'Picky Texan Approved' },
  ]
  const doubled = [...items, ...items]

  return (
    <div style={{
      background: 'var(--red)',
      overflow: 'hidden',
      padding: '0.75rem 0',
      borderTop: '1px solid rgba(255,245,230,0.1)',
      borderBottom: '1px solid rgba(255,245,230,0.1)',
    }}>
      <div className="ticker-track">
        {doubled.map((item, i) => {
          const Icon = item.icon
          return (
            <span key={i} style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: 'rgba(255,245,230,0.92)', fontSize: '0.82rem', fontWeight: 600,
              whiteSpace: 'nowrap', padding: '0 2rem',
              letterSpacing: '0.03em',
            }}>
              <Icon size={13} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              {item.text}
              <span style={{ color: 'rgba(255,245,230,0.25)', paddingLeft: '2rem' }}>✦</span>
            </span>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Signature Dishes (Improvement #3: Featured Loaded Fries) ─── */
function SignatureDishes() {
  const featuredDish = {
    title: 'Asada Loaded Fries',
    desc: 'Our #1 most-ordered item — and the one that started it all. Seasoned fries piled high with chopped carne asada, Monterey Jack cheese, pork chorizo, refried beans, salsa Colorado, sour cream, guacamole, and fresh pico de gallo. Every single review mentions these. Order them. You\'ll understand.',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=900&q=85&fit=crop&crop=center',
    tag: '#1 MOST ORDERED',
  }

  const dishes = [
    {
      title: 'Mango Habanero Wings',
      desc: 'Sweet meets heat. Crispy wings tossed in our house mango habanero sauce, served with crispy fries, ranch, celery and carrots.',
      tag: 'VIRAL ON TIKTOK',
      image: 'https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=600&q=80&fit=crop',
      accent: 'var(--gold-dark)',
    },
    {
      title: 'Carne Asada Tacos',
      desc: 'Tender asada on freshly made flour tortillas. Simple. Perfect. The reason regulars come back every single day.',
      tag: 'DAILY FAVORITE',
      image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&q=80&fit=crop',
      accent: 'var(--green)',
    },
    {
      title: 'Chipaquiles Mixtos',
      desc: 'Our morning specialty — crispy tortillas in red & green salsa, topped with cheese, crema, and your choice of protein.',
      tag: 'BREAKFAST STAR',
      image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=600&q=80&fit=crop',
      accent: 'var(--red-dark)',
    },
    {
      title: 'Gorditas de Chicharrón',
      desc: "Handmade masa stuffed with crispy chicharrón. Made from scratch, just like abuela's.",
      tag: 'HOMEMADE',
      image: 'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=600&q=80&fit=crop',
      accent: 'var(--brown-mid)',
    },
  ]

  return (
    <section style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div className="observe-fade" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontFamily: 'var(--font-accent)', color: 'var(--red)', fontSize: '0.85rem', letterSpacing: '0.2em', marginBottom: '0.6rem' }}>
            WHAT WE'RE KNOWN FOR
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'var(--brown)', lineHeight: 1.1 }}>
            Dishes Worth<br /><em>Coming Back For</em>
          </h2>
        </div>

        {/* Featured Loaded Fries — full-width horizontal card */}
        <div className="observe-fade" style={{
          background: 'white', borderRadius: '1.5rem', overflow: 'hidden',
          boxShadow: '0 8px 40px rgba(44,24,16,0.13)',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          marginBottom: '1.5rem',
          border: '2px solid rgba(232,168,56,0.3)',
        }}>
          {/* Image */}
          <div className="featured-card-img" style={{ height: '320px', overflow: 'hidden', position: 'relative' }}>
            <img src={featuredDish.image} alt={featuredDish.title} loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {/* Gold overlay gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(90deg, transparent 60%, rgba(255,245,230,0.05) 100%)',
            }} />
            {/* Tag */}
            <div style={{
              position: 'absolute', top: '1rem', left: '1rem',
              background: 'var(--gold)', color: 'var(--brown)',
              padding: '0.3rem 0.875rem', borderRadius: '9999px',
              fontFamily: 'var(--font-accent)', fontSize: '0.72rem', letterSpacing: '0.12em',
              fontWeight: 700, boxShadow: '0 4px 12px rgba(232,168,56,0.4)',
            }}>{featuredDish.tag}</div>
          </div>

          {/* Text */}
          <div style={{ padding: '2.5rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-accent)', color: 'var(--gold-dark)', fontSize: '0.72rem',
              letterSpacing: '0.18em', marginBottom: '0.5rem',
            }}>THE LEGEND</div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', color: 'var(--brown)', lineHeight: 1.1, marginBottom: '1rem' }}>
              {featuredDish.title}
            </h3>
            <p style={{ color: 'var(--brown-mid)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
              {featuredDish.desc}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {['Asada', 'Queso', 'Guacamole', 'Pico', 'Chorizo', 'Beans'].map(tag => (
                <span key={tag} style={{
                  background: 'rgba(181,40,30,0.07)', color: 'var(--red)',
                  padding: '0.2rem 0.6rem', borderRadius: '9999px',
                  fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.02em',
                }}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Other 4 cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {dishes.map((d, i) => (
            <div key={d.title}
              className={`observe-fade delay-${i + 1} card-lift`}
              style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 4px 20px rgba(44,24,16,0.08)' }}>
              <div style={{ height: '195px', overflow: 'hidden', position: 'relative' }}>
                <img src={d.image} alt={d.title} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                <div style={{
                  position: 'absolute', top: '0.75rem', left: '0.75rem',
                  background: d.accent, color: 'white',
                  padding: '0.2rem 0.7rem', borderRadius: '9999px',
                  fontFamily: 'var(--font-accent)', fontSize: '0.68rem', letterSpacing: '0.1em',
                }}>{d.tag}</div>
              </div>
              <div style={{ padding: '1.25rem 1.4rem 1.5rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--brown)', marginBottom: '0.4rem' }}>
                  {d.title}
                </h3>
                <p style={{ color: 'var(--brown-mid)', fontSize: '0.85rem', lineHeight: 1.6 }}>{d.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Responsive: stack featured card on mobile */}
        <style>{`
          @media (max-width: 640px) {
            .featured-dish-grid { grid-template-columns: 1fr !important; }
            .featured-dish-grid > div:first-child { height: 240px !important; }
          }
        `}</style>
      </div>
    </section>
  )
}

/* ─── Full Menu (Improvement #4: default tab = 'wings') ─── */
function FullMenu() {
  const [activeTab, setActiveTab] = useState('wings')
  const active = MENU_CATEGORIES.find(c => c.id === activeTab)

  return (
    <section id="menu">
      <WaveUp fill="var(--cream-dark)" bg="var(--cream)" />
      <div style={{ background: 'var(--cream-dark)', padding: '4rem 0 5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="observe-fade" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <p style={{ fontFamily: 'var(--font-accent)', color: 'var(--red)', fontSize: '0.85rem', letterSpacing: '0.2em', marginBottom: '0.6rem' }}>FULL MENU</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'var(--brown)', lineHeight: 1.1 }}>
              Our Menu
            </h2>
            <p style={{ color: 'var(--brown-mid)', marginTop: '0.6rem', fontSize: '0.95rem' }}>
              From sunrise breakfast to late-night tacos — and yes, we do burgers too.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '2rem', scrollbarWidth: 'none' }}>
            {MENU_CATEGORIES.map(cat => (
              <button key={cat.id} className={`menu-tab ${activeTab === cat.id ? 'active' : ''}`}
                onClick={() => setActiveTab(cat.id)}>
                {cat.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '0.875rem' }}>
            {active?.items.map((item, i) => (
              <div key={item.name}
                className={`observe-fade delay-${Math.min(i + 1, 5)}`}
                style={{
                  background: 'white', borderRadius: '0.875rem',
                  padding: '1.2rem 1.4rem',
                  boxShadow: '0 2px 10px rgba(44,24,16,0.055)',
                  borderLeft: item.popular ? '3px solid var(--gold)' : '3px solid transparent',
                  transition: 'box-shadow 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 6px 22px rgba(44,24,16,0.11)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 10px rgba(44,24,16,0.055)'}
              >
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', color: 'var(--brown)', marginBottom: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {item.name}
                  {item.popular && (
                    <span style={{
                      fontFamily: 'var(--font-accent)', fontSize: '0.62rem', letterSpacing: '0.1em',
                      color: 'var(--gold-dark)', background: 'rgba(232,168,56,0.12)',
                      padding: '0.1rem 0.4rem', borderRadius: '4px',
                    }}>POPULAR</span>
                  )}
                </div>
                <p style={{ color: 'var(--brown-mid)', fontSize: '0.82rem', lineHeight: 1.55 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ textAlign: 'center', color: 'var(--brown-mid)', fontSize: '0.78rem', marginTop: '2.5rem', opacity: 0.65 }}>
            Menu items and availability may vary by location. Call ahead for daily specials: (817) 386-5820
          </p>
        </div>
      </div>
      <WaveDown fill="var(--cream)" bg="var(--cream-dark)" />
    </section>
  )
}

/* ─── Story (Improvement #5: warm image added) ─────────── */
function StorySection() {
  return (
    <section id="story">
      <WaveUp fill="var(--green)" bg="var(--cream)" />
      <div className="section-dark" style={{ padding: '5rem 1.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            {/* Text */}
            <div className="observe-fade">
              <p style={{ fontFamily: 'var(--font-accent)', color: 'var(--gold)', fontSize: '0.85rem', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>OUR STORY</p>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.15, marginBottom: '1.75rem' }}>
                More Than a Restaurant —<br /><em style={{ color: 'var(--gold)' }}>We're Family</em>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  'El Compadre started with a simple idea: serve real food with real sazon, and treat every person who walks through the door like family.',
                  "That's not a tagline — it's what happens every single day. When you sit down at El Compadre, the owner stops by your table. Lalo at the counter steers you toward exactly what you're craving. GiGi makes sure your agua fresca stays full.",
                  "We've grown from our original spot on NE 28th Street to a second location on White Settlement Road, but the mission hasn't changed. The gorditas are still handmade. The asada is still seasoned with love. The loaded fries are still piled high enough to share.",
                  "From breakfast chipaquiles to late-night tacos, from birthday celebrations to everyday lunches — El Compadre is Fort Worth's gathering place. And we're just getting started.",
                ].map((p, i) => (
                  <p key={i} style={{ color: 'rgba(255,245,230,0.8)', lineHeight: 1.75, fontSize: '0.93rem' }}>{p}</p>
                ))}
              </div>
            </div>

            {/* Right col — Improvement #5: warm image above stats */}
            <div className="observe-fade delay-2">
              {/* Warm restaurant image */}
              <div style={{
                borderRadius: '1.25rem', overflow: 'hidden',
                height: '220px', marginBottom: '1.5rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                border: '2px solid rgba(232,168,56,0.2)',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80&fit=crop&crop=center"
                  alt="Warm restaurant atmosphere"
                  loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.88) saturate(1.15)' }}
                />
              </div>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem', marginBottom: '2rem' }}>
                {[
                  { icon: Star, val: '4.8★', label: 'Google Rating', sub: '280+ reviews' },
                  { icon: Users, val: '39.5K', label: 'TikTok Likes', sub: '2,900+ followers' },
                  { icon: MapPin, val: '2', label: 'Locations', sub: 'Fort Worth, TX' },
                  { icon: Award, val: '278K', label: 'Top TikTok Video', sub: 'views' },
                ].map(s => {
                  const Icon = s.icon
                  return (
                    <div key={s.label} style={{
                      background: 'rgba(255,245,230,0.06)', border: '1px solid rgba(232,168,56,0.18)',
                      borderRadius: '0.875rem', padding: '1.1rem', textAlign: 'center',
                    }}>
                      <Icon size={18} style={{ color: 'var(--gold)', marginBottom: '0.4rem' }} />
                      <div style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '1.5rem', lineHeight: 1 }}>{s.val}</div>
                      <div style={{ color: 'var(--gold-light)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.04em', marginTop: '0.2rem' }}>{s.label}</div>
                      <div style={{ color: 'rgba(255,245,230,0.45)', fontSize: '0.65rem' }}>{s.sub}</div>
                    </div>
                  )
                })}
              </div>

              {/* Social links */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  {
                    href: 'https://www.tiktok.com/@elcompadretacosfortworth',
                    title: 'Follow on TikTok',
                    sub: '@elcompadretacosfortworth',
                    iconBg: 'black',
                    icon: <svg width="17" height="17" viewBox="0 0 24 24" fill="white"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.21 8.21 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z" /></svg>,
                  },
                  {
                    href: 'https://www.facebook.com/p/El-Compadre-100071811480654/',
                    title: 'Join on Facebook',
                    sub: '1,184 likes · Fort Worth Foodies featured',
                    iconBg: '#1877F2',
                    icon: <Facebook size={18} fill="white" strokeWidth={0} />,
                  },
                ].map(item => (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '0.875rem',
                      background: 'rgba(255,245,230,0.06)', border: '1px solid rgba(255,245,230,0.12)',
                      borderRadius: '0.875rem', padding: '0.875rem 1.25rem',
                      color: 'var(--white-warm)', transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,245,230,0.12)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,245,230,0.06)'}>
                    <div style={{
                      width: '34px', height: '34px', borderRadius: '0.5rem',
                      background: item.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>{item.icon}</div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{item.title}</div>
                      <div style={{ color: 'rgba(255,245,230,0.48)', fontSize: '0.73rem' }}>{item.sub}</div>
                    </div>
                    <ExternalLink size={13} style={{ marginLeft: 'auto', opacity: 0.45 }} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <WaveDown fill="var(--cream)" bg="var(--green)" />
    </section>
  )
}

/* ─── Improvement #6: TikTok Strip ──────────────────────── */
function TikTokStrip() {
  return (
    <section style={{ background: 'var(--brown)', padding: '5rem 1.5rem', overflow: 'hidden', position: 'relative' }}>
      {/* Decorative background number */}
      <div style={{
        position: 'absolute', right: '-2rem', top: '50%', transform: 'translateY(-50%)',
        fontFamily: 'var(--font-accent)', fontSize: 'clamp(10rem, 25vw, 20rem)',
        color: 'rgba(255,245,230,0.025)', lineHeight: 1, letterSpacing: '-0.05em',
        pointerEvents: 'none', userSelect: 'none',
      }}>278K</div>

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div className="observe-fade" style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(232,168,56,0.12)', border: '1px solid rgba(232,168,56,0.3)',
            borderRadius: '9999px', padding: '0.35rem 1rem', marginBottom: '2rem',
            fontFamily: 'var(--font-accent)', color: 'var(--gold)', fontSize: '0.75rem', letterSpacing: '0.2em',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.21 8.21 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z" /></svg>
            AS SEEN ON TIKTOK
          </div>

          <div style={{
            fontFamily: 'var(--font-accent)',
            fontSize: 'clamp(5rem, 16vw, 10rem)',
            color: 'var(--gold)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}>278,000</div>

          <p style={{
            fontFamily: 'var(--font-display)',
            color: 'rgba(255,245,230,0.9)',
            fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
            fontStyle: 'italic',
            lineHeight: 1.4,
            marginBottom: '0.75rem',
          }}>
            people discovered El Compadre on TikTok.
          </p>
          <p style={{ color: 'rgba(255,245,230,0.5)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
            One video. One plate of loaded fries. Fort Worth's best-kept secret isn't so secret anymore.
          </p>

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {[
              { val: '2,938', label: 'Followers' },
              { val: '39.5K', label: 'Total Likes' },
              { val: '278K', label: 'Single Video Views' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '2rem', lineHeight: 1 }}>{s.val}</div>
                <div style={{ color: 'rgba(255,245,230,0.5)', fontSize: '0.78rem', marginTop: '0.25rem', letterSpacing: '0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>

          <a href="https://www.tiktok.com/@elcompadretacosfortworth"
            target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              border: '2px solid rgba(232,168,56,0.45)', color: 'var(--gold-light)',
              padding: '0.8rem 2rem', borderRadius: '9999px',
              fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,168,56,0.12)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(232,168,56,0.45)' }}>
            Follow @elcompadretacosfortworth <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Reviews (Improvement #7: bolder quote marks) ──────── */
function Reviews() {
  return (
    <section id="reviews" style={{ background: 'var(--cream)', padding: '5rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="observe-fade" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontFamily: 'var(--font-accent)', color: 'var(--red)', fontSize: '0.85rem', letterSpacing: '0.2em', marginBottom: '0.6rem' }}>
            WHAT FORT WORTH IS SAYING
          </p>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'var(--brown)', lineHeight: 1.1 }}>
            Real Reviews,<br /><em>Real People</em>
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '0.875rem' }}>
            <Stars />
            <span style={{ fontWeight: 700, color: 'var(--brown)', fontSize: '1rem' }}>4.8</span>
            <span style={{ color: 'var(--brown-mid)', fontSize: '0.85rem' }}>out of 5 · 280+ Google Reviews</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '1.4rem' }}>
          {REVIEWS.map((r, i) => (
            <div key={i}
              className={`observe-fade delay-${Math.min(i + 1, 5)} card-lift`}
              style={{
                background: r.highlight ? 'var(--brown)' : 'white',
                borderRadius: '1.25rem', padding: '1.75rem 1.5rem 1.5rem',
                boxShadow: r.highlight ? '0 8px 32px rgba(44,24,16,0.2)' : '0 4px 18px rgba(44,24,16,0.07)',
                position: 'relative',
                border: r.highlight ? '2px solid rgba(232,168,56,0.3)' : '2px solid transparent',
              }}>
              {/* Improvement #7: quote marks at 0.4 opacity, larger */}
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '6rem', lineHeight: 0.7,
                color: r.highlight ? 'var(--gold)' : 'var(--gold)',
                opacity: r.highlight ? 0.5 : 0.35,
                marginBottom: '-0.5rem',
              }}>"</div>

              <Stars count={r.stars} size={14} />
              <p style={{
                color: r.highlight ? 'rgba(255,245,230,0.9)' : 'var(--brown)',
                lineHeight: 1.72, fontSize: '0.875rem', margin: '0.875rem 0 1.25rem',
                fontStyle: 'italic',
              }}>
                "{r.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: 600, color: r.highlight ? 'var(--gold-light)' : 'var(--brown)', fontSize: '0.82rem' }}>— {r.author}</span>
                <span style={{
                  fontSize: '0.7rem', color: r.highlight ? 'rgba(255,245,230,0.5)' : 'var(--brown-mid)',
                  background: r.highlight ? 'rgba(255,245,230,0.08)' : 'var(--cream-dark)',
                  padding: '0.18rem 0.55rem', borderRadius: '9999px',
                }}>{r.source} Review</span>
              </div>
            </div>
          ))}
        </div>

        <div className="observe-fade" style={{ textAlign: 'center', marginTop: '2.75rem' }}>
          <a href="https://www.google.com/maps/search/El+Compadre+Tacos+Fort+Worth" target="_blank" rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              border: '2px solid var(--red)', color: 'var(--red)',
              padding: '0.75rem 2rem', borderRadius: '9999px',
              fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--red)' }}>
            See All Reviews on Google <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

/* ─── Hours table ────────────────────────────────────────── */
function HoursTable({ hours }) {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const todayName = dayNames[new Date().getDay()]

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
      <tbody>
        {hours.map(({ day, hours: h }) => {
          const isToday = day === todayName
          return (
            <tr key={day} style={{ borderBottom: '1px solid rgba(44,24,16,0.07)' }}>
              <td style={{ padding: '0.45rem 0', fontWeight: isToday ? 700 : 400, color: isToday ? 'var(--red)' : 'var(--brown)' }}>
                {isToday ? `${day} (Today)` : day}
              </td>
              <td style={{ padding: '0.45rem 0', textAlign: 'right', fontWeight: isToday ? 700 : 400, color: isToday ? 'var(--red)' : 'var(--brown-mid)' }}>
                {h}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/* ─── Locations ──────────────────────────────────────────── */
function Locations() {
  const locs = [
    {
      tag: 'ORIGINAL LOCATION', name: 'NE 28th Street',
      address: '2408 NE 28th St', city: 'Fort Worth, TX 76106',
      phone: '(817) 386-5820',
      note: 'Our original home — come see Lalo, Alejandra, Chuy, GiGi, and the whole crew.',
      mapsLink: 'https://www.google.com/maps/search/2408+NE+28th+St+Fort+Worth+TX+76106',
      hours: HOURS_28TH, color: 'var(--red)',
    },
    {
      tag: 'NEW LOCATION', name: 'White Settlement Rd',
      address: '5321 White Settlement Rd', city: 'Fort Worth, TX 76106',
      phone: '(817) 386-5820',
      note: 'Our newest spot — try our expanded new menu items!',
      mapsLink: 'https://www.google.com/maps/search/5321+White+Settlement+Rd+Fort+Worth+TX+76106',
      hours: HOURS_WHITE, color: 'var(--green)',
    },
  ]

  return (
    <section id="locations">
      <WaveUp fill="var(--cream-dark)" bg="var(--cream)" />
      <div style={{ background: 'var(--cream-dark)', padding: '4rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="observe-fade" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'var(--font-accent)', color: 'var(--red)', fontSize: '0.85rem', letterSpacing: '0.2em', marginBottom: '0.6rem' }}>FIND US</p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'var(--brown)', lineHeight: 1.1 }}>
              Two Locations<br /><em>to Serve You</em>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {locs.map((loc, i) => (
              <div key={loc.name} className={`observe-fade delay-${i + 1} card-lift`}
                style={{ background: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 4px 24px rgba(44,24,16,0.09)' }}>
                <div style={{ background: loc.color, padding: '1.5rem' }}>
                  <p style={{ fontFamily: 'var(--font-accent)', color: 'rgba(255,255,255,0.65)', fontSize: '0.65rem', letterSpacing: '0.15em', marginBottom: '0.2rem' }}>{loc.tag}</p>
                  <h3 style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '1.5rem' }}>{loc.name}</h3>
                </div>

                <a href={loc.mapsLink} target="_blank" rel="noopener noreferrer"
                  style={{
                    height: '160px', background: 'var(--cream)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: '0.5rem', color: loc.color, fontWeight: 600, fontSize: '0.875rem',
                    textDecoration: 'none', transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--cream-dark)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'var(--cream)'}
                >
                  <MapPin size={28} style={{ color: loc.color }} />
                  <span>Open in Google Maps</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--brown-mid)', fontWeight: 400 }}>{loc.address}</span>
                </a>

                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginBottom: '1rem' }}>
                    <a href={loc.mapsLink} target="_blank" rel="noopener noreferrer"
                      style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', color: 'var(--brown)', fontSize: '0.85rem' }}>
                      <MapPin size={15} style={{ color: loc.color, flexShrink: 0, marginTop: '2px' }} />
                      <span>{loc.address}<br />{loc.city}</span>
                    </a>
                    <a href="tel:+18173865820"
                      style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', color: 'var(--brown)', fontSize: '0.85rem' }}>
                      <Phone size={15} style={{ color: loc.color, flexShrink: 0 }} />
                      {loc.phone}
                    </a>
                  </div>

                  <p style={{ fontSize: '0.8rem', color: 'var(--brown-mid)', fontStyle: 'italic', lineHeight: 1.5, marginBottom: '1.2rem' }}>{loc.note}</p>

                  <div style={{ background: 'var(--cream)', borderRadius: '0.75rem', padding: '0.875rem 1rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.625rem' }}>
                      <Clock size={13} style={{ color: loc.color }} />
                      <span style={{ fontFamily: 'var(--font-accent)', fontSize: '0.7rem', letterSpacing: '0.1em', color: 'var(--brown-mid)' }}>HOURS</span>
                    </div>
                    <HoursTable hours={loc.hours} />
                  </div>

                  <a href={loc.mapsLink} target="_blank" rel="noopener noreferrer"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                      background: loc.color, color: 'white',
                      padding: '0.7rem', borderRadius: '0.75rem',
                      fontWeight: 600, fontSize: '0.875rem', transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    <MapPin size={14} /> Get Directions
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <WaveDown fill="var(--cream)" bg="var(--cream-dark)" />
    </section>
  )
}

/* ─── Order (Improvement #8: distinct button styles) ────── */
function OrderSection() {
  const btns = [
    {
      label: 'Call to Order', sub: '(817) 386-5820',
      href: 'tel:+18173865820', icon: Phone,
      bg: 'rgba(255,245,230,0.12)', border: 'rgba(255,245,230,0.3)',
      textColor: 'white',
    },
    {
      label: 'Order on DoorDash', sub: 'Fast delivery to your door',
      href: 'https://www.doordash.com/search/store/el%20compadre%20tacos%20fort%20worth/',
      icon: Truck,
      bg: '#FF3008', border: 'transparent',
      textColor: 'white',
    },
    {
      label: 'Order on Favor', sub: 'Local Texas delivery app',
      href: 'https://favordelivery.com/',
      icon: ShoppingBag,
      bg: 'rgba(26,71,49,0.8)', border: 'rgba(255,245,230,0.2)',
      textColor: 'white',
    },
  ]

  return (
    <section id="order">
      <WaveUp fill="var(--red)" bg="var(--cream)" />
      <div className="section-red" style={{ padding: '4rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div className="observe-fade" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ fontFamily: 'var(--font-accent)', color: 'rgba(255,245,230,0.55)', fontSize: '0.85rem', letterSpacing: '0.2em', marginBottom: '0.6rem' }}>LET'S EAT</p>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1 }}>
              Ready to Eat?
            </h2>
          </div>

          <div className="observe-fade delay-2" style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1rem', marginBottom: '2.5rem',
          }}>
            {btns.map(b => {
              const Icon = b.icon
              return (
                <a key={b.label} href={b.href}
                  target={b.href.startsWith('tel') ? '_self' : '_blank'}
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
                    background: b.bg, border: `2px solid ${b.border}`,
                    borderRadius: '1rem', padding: '1.75rem',
                    color: b.textColor, transition: 'transform 0.25s, filter 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.filter = 'brightness(1.1)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.filter = 'brightness(1)' }}>
                  <Icon size={26} />
                  <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{b.label}</span>
                  <span style={{ opacity: 0.7, fontSize: '0.78rem', textAlign: 'center' }}>{b.sub}</span>
                </a>
              )
            })}
          </div>

          {/* Catering */}
          <div className="observe-fade delay-3" style={{
            background: 'rgba(255,245,230,0.08)', border: '2px solid rgba(232,168,56,0.45)',
            borderRadius: '1.25rem', padding: '2rem', textAlign: 'center',
          }}>
            <UtensilsCrossed size={26} style={{ color: 'var(--gold)', marginBottom: '0.75rem' }} />
            <h3 style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              Feeding a Crowd?
            </h3>
            <p style={{ color: 'rgba(255,245,230,0.78)', marginBottom: '1.25rem', lineHeight: 1.65, fontSize: '0.92rem', maxWidth: '500px', margin: '0 auto 1.25rem' }}>
              We do catering! Birthdays, work events, family reunions — El Compadre brings the sazon to you.
            </p>
            <a href="tel:+18173865820" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'var(--gold)', color: 'var(--brown)',
              padding: '0.85rem 2rem', borderRadius: '9999px',
              fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold-light)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <Phone size={15} /> Call (817) 386-5820
            </a>
          </div>
        </div>
      </div>
      <WaveDown fill="var(--brown)" bg="var(--red)" />
    </section>
  )
}

/* ─── Footer ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background: 'var(--brown)', color: 'rgba(255,245,230,0.65)', padding: '3rem 1.5rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.875rem' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%',
                background: 'var(--red)', border: '2px solid var(--gold)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <span style={{ color: 'white', fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '0.95rem' }}>EC</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', color: 'white', fontSize: '1rem' }}>El Compadre</div>
                <div style={{ fontFamily: 'var(--font-accent)', color: 'var(--gold)', fontSize: '0.58rem', letterSpacing: '0.15em' }}>TACOS Y MAS</div>
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.7, maxWidth: '230px', fontStyle: 'italic' }}>
              "El Compadre culture is good food with quality product and service."
            </p>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-accent)', color: 'var(--gold)', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: '0.875rem' }}>NAVIGATE</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
              {[['#menu', 'Full Menu'], ['#story', 'Our Story'], ['#locations', 'Locations & Hours'], ['#reviews', 'Reviews'], ['#order', 'Order Now']].map(([href, label]) => (
                <a key={href} href={href}
                  style={{ color: 'rgba(255,245,230,0.6)', fontSize: '0.85rem', transition: 'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-light)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,245,230,0.6)'}>{label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-accent)', color: 'var(--gold)', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: '0.875rem' }}>CONTACT</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.82rem' }}>
              <a href="tel:+18173865820" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: 'rgba(255,245,230,0.65)' }}>
                <Phone size={13} style={{ color: 'var(--gold)' }} /> (817) 386-5820
              </a>
              {[
                ['https://www.google.com/maps/search/2408+NE+28th+St+Fort+Worth', '2408 NE 28th St\nFort Worth, TX 76106'],
                ['https://www.google.com/maps/search/5321+White+Settlement+Rd+Fort+Worth', '5321 White Settlement Rd\nFort Worth, TX 76106'],
              ].map(([href, addr]) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', color: 'rgba(255,245,230,0.65)' }}>
                  <MapPin size={13} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '2px' }} />
                  <span style={{ whiteSpace: 'pre-line' }}>{addr}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily: 'var(--font-accent)', color: 'var(--gold)', letterSpacing: '0.1em', fontSize: '0.75rem', marginBottom: '0.875rem' }}>FOLLOW US</h4>
            <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1rem' }}>
              <a href="https://www.tiktok.com/@elcompadretacosfortworth" target="_blank" rel="noopener noreferrer"
                style={{ width: '38px', height: '38px', background: 'rgba(255,245,230,0.07)', border: '1px solid rgba(255,245,230,0.15)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,245,230,0.15)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,245,230,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,245,230,0.15)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="rgba(255,245,230,0.8)"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.21 8.21 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z" /></svg>
              </a>
              <a href="https://www.facebook.com/p/El-Compadre-100071811480654/" target="_blank" rel="noopener noreferrer"
                style={{ width: '38px', height: '38px', background: 'rgba(255,245,230,0.07)', border: '1px solid rgba(255,245,230,0.15)', borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,245,230,0.15)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,245,230,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,245,230,0.15)' }}>
                <Facebook size={16} style={{ color: 'rgba(255,245,230,0.8)' }} />
              </a>
            </div>
            <p style={{ fontSize: '0.75rem', lineHeight: 1.65 }}>
              Follow our TikTok for behind-the-scenes content & daily specials.
            </p>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,245,230,0.1)', paddingTop: '1.5rem',
          display: 'flex', flexWrap: 'wrap', gap: '0.5rem',
          justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem',
        }}>
          <span>© 2025 El Compadre Tacos y Mas · Fort Worth, TX · (817) 386-5820</span>
          <span style={{ color: 'rgba(255,245,230,0.35)' }}>
            Website by <span style={{ color: 'var(--gold)', opacity: 0.7 }}>OakWind Studio</span>
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ─── Improvement #9: Mobile Sticky CTA ─────────────────── */
function MobileStickyCTA() {
  return (
    <div className="mobile-sticky-cta" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 400,
      background: 'rgba(44,24,16,0.97)',
      borderTop: '1px solid rgba(232,168,56,0.25)',
      backdropFilter: 'blur(12px)',
      padding: '0.625rem 1rem',
      gap: '0.625rem',
      alignItems: 'stretch',
    }}>
      <a href="tel:+18173865820" style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '0.2rem', background: 'var(--red)', color: 'white',
        borderRadius: '0.625rem', padding: '0.625rem 0.25rem',
        fontWeight: 700, fontSize: '0.75rem', textDecoration: 'none',
      }}>
        <Phone size={17} />
        Call
      </a>
      <a href="https://www.doordash.com/search/store/el%20compadre%20tacos%20fort%20worth/"
        target="_blank" rel="noopener noreferrer"
        style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '0.2rem', background: '#FF3008', color: 'white',
          borderRadius: '0.625rem', padding: '0.625rem 0.25rem',
          fontWeight: 700, fontSize: '0.75rem', textDecoration: 'none',
        }}>
        <Truck size={17} />
        DoorDash
      </a>
      <a href="https://favordelivery.com/" target="_blank" rel="noopener noreferrer"
        style={{
          flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '0.2rem', background: 'var(--green)', color: 'white',
          borderRadius: '0.625rem', padding: '0.625rem 0.25rem',
          fontWeight: 700, fontSize: '0.75rem', textDecoration: 'none',
        }}>
        <ShoppingBag size={17} />
        Favor
      </a>
      <a href="#menu" style={{
        flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '0.2rem', background: 'rgba(255,245,230,0.08)',
        border: '1px solid rgba(255,245,230,0.2)',
        color: 'rgba(255,245,230,0.8)',
        borderRadius: '0.625rem', padding: '0.625rem 0.25rem',
        fontWeight: 700, fontSize: '0.75rem', textDecoration: 'none',
      }}>
        <UtensilsCrossed size={17} />
        Menu
      </a>
    </div>
  )
}

/* ─── App ────────────────────────────────────────────────── */
export default function App() {
  useScrollFade()

  return (
    <div style={{ minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <SocialProofTicker />
      <SignatureDishes />
      <FullMenu />
      <StorySection />
      <TikTokStrip />
      <Reviews />
      <Locations />
      <OrderSection />
      <Footer />
      <MobileStickyCTA />
    </div>
  )
}
