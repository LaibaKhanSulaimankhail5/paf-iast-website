AOS.init({ duration: 1000, once: true });

document.querySelector(".nav-toggle").addEventListener("click", () => {
  document.querySelector(".nav-menu").classList.toggle("active");
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-menu").classList.remove("active");
  });
});

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
  let current = "";
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

emailjs.init("7Xljzl_Q2utJc7-NJ");

const serviceID = "service_d68enkq";
const templateID = "template_q3t74tl";

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const feedback = document.getElementById("formFeedback");
  const btn = document.getElementById("submitBtn");

  let errors = [];
  if (!name) errors.push("Name required");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.push("Valid email required");
  if (!subject) errors.push("Subject required");
  if (!message || message.length < 10)
    errors.push("Message too short (min 10 chars)");

  if (errors.length) {
    feedback.className = "form-feedback error";
    feedback.innerHTML = errors.join("<br>");
    return;
  }

  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  const templateParams = {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_email: "laibakhansulaimankhail@gmail.com, info@paf-iast.edu.pk",
  };

  emailjs
    .send(serviceID, templateID, templateParams)
    .then(() => {
      feedback.className = "form-feedback success";
      feedback.innerHTML =
        "✓ Message sent to laibakhansulaimankhail@gmail.com and your university";
      this.reset();
    })
    .catch((err) => {
      feedback.className = "form-feedback error";
      feedback.innerHTML = "✗ Failed: " + (err.text || "Try again");
    })
    .finally(() => {
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.disabled = false;
      setTimeout(() => (feedback.style.display = "none"), 5000);
    });
});
