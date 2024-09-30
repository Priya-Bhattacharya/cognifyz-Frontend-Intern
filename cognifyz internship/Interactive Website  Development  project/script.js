const colors = ['#b2fab4', '#ffd1b3', '#a3d5ff', '#fff3b0', '#ffcccb'];
let currentColorIndex = 0;

document.getElementById("changeColorBtn").addEventListener("click", function() {
  currentColorIndex = (currentColorIndex + 1) % colors.length;
  document.body.style.backgroundColor = colors[currentColorIndex];
});

// Switch from Page 1 to Page 2
document.getElementById("smartphoneIcon").addEventListener("click", function() {
  document.getElementById("page1").style.display = "none";
  document.getElementById("page2").style.display = "block";
});

// Back to Page 1 from Page 2
document.getElementById("backToPage1").addEventListener("click", function() {
  document.getElementById("page2").style.display = "none";
  document.getElementById("page1").style.display = "block";
});

// Back to Page 2 from Page 3
document.getElementById("backToPage2").addEventListener("click", function() {
  document.getElementById("page3").style.display = "none";
  document.getElementById("page2").style.display = "block";
});

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  const feedback = document.getElementById("formFeedback");

  feedback.textContent = '';

  if (name === "" || email === "" || message === "") {
    feedback.textContent = "Please fill out all fields.";
    return;
  }
  if (!validateEmail(email)) {
    feedback.textContent = "Please enter a valid email address.";
    return;
  }

  // Show success alert 
  Swal.fire({
    title: "Success!",
    text: "Your response was sent successfully!",
    icon: "success",
    confirmButtonText: 'OK'
  }).then(() => {
    document.getElementById('contactForm').reset(); 
    document.getElementById("page2").style.display = "none";
    document.getElementById("page3").style.display = "block";
    fetchPostsWithAnimation(); 
  });
});

function fetchPostsWithAnimation() {
  fetch('https://jsonplaceholder.typicode.com/posts?_limit=5')
    .then(response => response.json())
    .then(data => {
      const postsList = document.getElementById('postsList');
      postsList.innerHTML = '';  
      
      data.forEach((post, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = post.title;

        listItem.style.animationName = index % 2 === 0 ? 'slideInFromLeft' : 'slideInFromRight';

        postsList.appendChild(listItem);
      });
    })
    .catch(error => console.error('Error fetching posts:', error));
}
