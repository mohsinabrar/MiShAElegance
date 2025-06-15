// DOM Elements
const navbar = document.getElementById("navbar")
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const navLinks = document.querySelectorAll(".nav-link")
const tabBtns = document.querySelectorAll(".tab-btn")
const productCards = document.querySelectorAll(".product-card")
const contactForm = document.getElementById("contact-form")
const cartCount = document.querySelector(".cart-count")

// Cart functionality
const cart = []

// Navbar scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled")
  } else {
    navbar.classList.remove("scrolled")
  }
})

// Mobile menu toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href")
    const targetSection = document.querySelector(targetId)

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }

    // Update active link
    navLinks.forEach((l) => l.classList.remove("active"))
    link.classList.add("active")

    // Close mobile menu
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Product category filtering
tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.getAttribute("data-category")

    // Update active tab
    tabBtns.forEach((b) => b.classList.remove("active"))
    btn.classList.add("active")

    // Filter products with animation
    productCards.forEach((card, index) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(30px)"

      setTimeout(() => {
        if (category === "all" || card.getAttribute("data-category") === category) {
          card.style.display = "block"
          setTimeout(() => {
            card.style.opacity = "1"
            card.style.transform = "translateY(0)"
          }, 50)
        } else {
          card.style.display = "none"
        }
      }, index * 100)
    })
  })
})

// Add to cart functionality
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add-cart")) {
    const productCard = e.target.closest(".product-card")
    const productName = productCard.querySelector("h3").textContent
    const productPrice = productCard.querySelector(".product-price").textContent

    // Add to cart array
    cart.push({
      name: productName,
      price: productPrice,
    })

    // Update cart count
    cartCount.textContent = cart.length

    // Add animation to cart icon
    const cartIcon = document.querySelector(".fa-shopping-bag")
    cartIcon.style.transform = "scale(1.2)"
    setTimeout(() => {
      cartIcon.style.transform = "scale(1)"
    }, 200)

    // Show success message
    showNotification(`${productName} added to cart!`)
  }
})

// Quick view functionality
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-quick-view")) {
    const productCard = e.target.closest(".product-card")
    const productName = productCard.querySelector("h3").textContent
    showNotification(`Quick view for ${productName} - Feature coming soon!`)
  }
})

// Contact form submission
contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  const formData = new FormData(contactForm)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simulate form submission
  showNotification("Thank you for your message! We'll get back to you soon.")
  contactForm.reset()
})

// Notification system
function showNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--primary-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: var(--shadow);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `

  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.opacity = "1"
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.opacity = "0"
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animated")
    }
  })
}, observerOptions)

// Observe elements for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".product-card, .about-text, .about-image, .contact-info, .contact-form",
  )
  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll")
    observer.observe(el)
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallaxElements = document.querySelectorAll(".floating-card")

  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + index * 0.1
    element.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Search functionality (placeholder)
document.querySelector(".fa-search").addEventListener("click", () => {
  showNotification("Search feature coming soon!")
})

// Shopping bag click
document.querySelector(".fa-shopping-bag").addEventListener("click", () => {
  if (cart.length === 0) {
    showNotification("Your cart is empty")
  } else {
    showNotification(`You have ${cart.length} items in your cart`)
  }
})

// Hero buttons functionality
document.addEventListener("click", (e) => {
  if (e.target.textContent === "Shop Suits") {
    document.querySelector('[data-category="suits"]').click()
    document.querySelector("#products").scrollIntoView({ behavior: "smooth" })
  } else if (e.target.textContent === "View Jewelry") {
    document.querySelector('[data-category="jewelry"]').click()
    document.querySelector("#products").scrollIntoView({ behavior: "smooth" })
  }
})

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")
})

// Add CSS for loading state
const loadingCSS = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--white);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'Loading...';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 1.5rem;
        color: var(--primary-color);
        z-index: 10001;
    }
`

const style = document.createElement("style")
style.textContent = loadingCSS
document.head.appendChild(style)
