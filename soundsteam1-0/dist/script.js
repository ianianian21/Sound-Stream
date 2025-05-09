document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements - Login
  const loginContainer = document.getElementById('login-container');
  const loginForm = document.getElementById('login-form');
  const loginBtn = document.getElementById('login-btn');
  const buttonText = loginBtn.querySelector('.button-text');
  const spinner = loginBtn.querySelector('.spinner');
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  
  // DOM Elements - App
  const appContainer = document.getElementById('app');
  const userDisplay = document.getElementById('user-display');
  const navItems = document.querySelectorAll('.nav-item');
  const pages = document.querySelectorAll('.page');
  const logoutBtn = document.getElementById('logout-btn');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const playButtons = document.querySelectorAll('.play-button');
  const playPauseBtn = document.querySelector('.play-pause');
  const progressBar = document.querySelector('.progress-bar');
  const progressFill = document.querySelector('.progress-fill');
  const progressHandle = document.querySelector('.progress-handle');
  const volumeSlider = document.querySelector('.volume-slider');
  const volumeFill = document.querySelector('.volume-fill');
  const volumeHandle = document.querySelector('.volume-handle');
  
  // Add animation classes to form groups with delay
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach((group, index) => {
    group.style.animationDelay = `${0.5 + (index * 0.1)}s`;
  });
  
  // Login Form Submission
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Show loading state
    buttonText.classList.add('hidden');
    spinner.classList.remove('hidden');
    
    // Simulate login process
    setTimeout(() => {
      // Hide loading state
      buttonText.classList.remove('hidden');
      spinner.classList.add('hidden');
      
      // Set username in the app
      userDisplay.textContent = usernameInput.value || 'User';
      
      // Switch to app view
      loginContainer.classList.add('hidden');
      appContainer.classList.remove('hidden');
      
      // Log login attempt
      console.log('Login successful with:', {
        username: usernameInput.value,
        password: passwordInput.value
      });
    }, 1500);
  });
  
  // Navigation between pages
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Update active nav item
      navItems.forEach(nav => nav.classList.remove('active'));
      this.classList.add('active');
      
      // Show corresponding page
      const pageId = this.getAttribute('data-page');
      pages.forEach(page => page.classList.remove('active'));
      document.getElementById(`${pageId}-page`).classList.add('active');
      
      // Close mobile menu if open
      if (window.innerWidth < 768) {
        sidebar.classList.remove('active');
      }
    });
  });
  
  // Logout button
  logoutBtn.addEventListener('click', function() {
    // Switch back to login view
    appContainer.classList.add('hidden');
    loginContainer.classList.remove('hidden');
    
    // Reset form
    loginForm.reset();
  });
  
  // Mobile menu toggle
  mobileMenuToggle.addEventListener('click', function() {
    sidebar.classList.toggle('active');
  });
  
  // Play buttons hover effect
  playButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
  
  // Play/Pause toggle
  let isPlaying = false;
  playPauseBtn.addEventListener('click', function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
      this.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
      this.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
  });
  
  // Progress bar interaction
  progressBar.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    progressFill.style.width = `${percent * 100}%`;
    progressHandle.style.left = `${percent * 100}%`;
    
    // Update time display (just for demo)
    const totalSeconds = 225; // 3:45 in seconds
    const currentSeconds = Math.floor(percent * totalSeconds);
    const minutes = Math.floor(currentSeconds / 60);
    const seconds = currentSeconds % 60;
    document.querySelector('.time-elapsed').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  });
  
  // Volume slider interaction
  volumeSlider.addEventListener('click', function(e) {
    const rect = this.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    volumeFill.style.width = `${percent * 100}%`;
    volumeHandle.style.left = `${percent * 100}%`;
  });
  
  // Track cards hover effect
  const trackCards = document.querySelectorAll('.track-card, .playlist-card');
  trackCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
  
  // Like button functionality
  const likeButton = document.querySelector('.like-button');
  likeButton.addEventListener('click', function() {
    this.innerHTML = this.innerHTML.includes('regular') ? 
      '<i class="fa-solid fa-heart" style="color: #ff4d4d;"></i>' : 
      '<i class="fa-regular fa-heart"></i>';
  });
  
  // Filter buttons in library
  const filterButtons = document.querySelectorAll('.filter-button');
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });
  
  // Prevent default on all buttons to avoid form submission
  document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function(e) {
      if (this.type !== 'submit') {
        e.preventDefault();
      }
    });
  });
});
// Modal functionality
const signupLinks = document.querySelectorAll('a[href="#sign-up"]');
const forgotLinks = document.querySelectorAll('a[href="#forgot-password"]');
const signupModal = document.getElementById('signup-modal');
const forgotModal = document.getElementById('forgot-modal');
const closeButtons = document.querySelectorAll('.close-modal');
const signupForm = document.getElementById('signup-form');
const forgotForm = document.getElementById('forgot-form');
const resetConfirmation = document.getElementById('reset-confirmation');

// Open modals
signupLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    signupModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
  });
});

forgotLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    forgotModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  });
});

// Close modals
closeButtons.forEach(button => {
  button.addEventListener('click', function() {
    signupModal.style.display = 'none';
    forgotModal.style.display = 'none';
    resetConfirmation.classList.add('hidden');
    document.body.style.overflow = '';
  });
});

// Close modal when clicking outside
window.addEventListener('click', function(e) {
  if (e.target === signupModal) {
    signupModal.style.display = 'none';
    document.body.style.overflow = '';
  }
  if (e.target === forgotModal) {
    forgotModal.style.display = 'none';
    resetConfirmation.classList.add('hidden');
    document.body.style.overflow = '';
  }
});

// Handle signup form submission
signupForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  
  // Simple validation
  if (password !== confirm) {
    alert('Passwords do not match!');
    return;
  }
  
  // Simulate signup process
  console.log('Sign up with:', { username, email, password });
  
  // Auto login after signup
  userDisplay.textContent = username;
  loginContainer.classList.add('hidden');
  appContainer.classList.remove('hidden');
  signupModal.style.display = 'none';
  document.body.style.overflow = '';
});

// Handle forgot password form
forgotForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('forgot-email').value;
  
  // Simulate password reset process
  console.log('Password reset requested for:', email);
  
  // Show confirmation
  forgotForm.style.display = 'none';
  resetConfirmation.classList.remove('hidden');
  
  // Reset form for next time
  setTimeout(() => {
    forgotForm.reset();
  }, 500);
});

// Favorites functionality
let favorites = [];

// Update all like buttons to be functional
document.querySelectorAll('.like-button, .track-card, .playlist-card').forEach(item => {
  // For the main player like button
  if (item.classList.contains('like-button')) {
    item.addEventListener('click', function() {
      const nowPlaying = document.querySelector('.now-playing .track-info h4').textContent;
      const artistName = document.querySelector('.now-playing .track-info p').textContent;
      const thumbnail = document.querySelector('.track-thumbnail img').src;
      
      toggleFavorite(this, nowPlaying, artistName, thumbnail);
    });
  } 
  // For track and playlist cards
  else {
    const likeBtn = document.createElement('button');
    likeBtn.className = 'card-like-button';
    likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    likeBtn.style.position = 'absolute';
    likeBtn.style.top = '8px';
    likeBtn.style.right = '8px';
    likeBtn.style.background = 'rgba(0, 0, 0, 0.5)';
    likeBtn.style.border = 'none';
    likeBtn.style.borderRadius = '50%';
    likeBtn.style.width = '30px';
    likeBtn.style.height = '30px';
    likeBtn.style.display = 'flex';
    likeBtn.style.alignItems = 'center';
    likeBtn.style.justifyContent = 'center';
    likeBtn.style.color = 'white';
    likeBtn.style.cursor = 'pointer';
    likeBtn.style.opacity = '0';
    likeBtn.style.transition = 'opacity 0.2s';
    
    const imageContainer = item.querySelector('.track-image, .playlist-image');
    if (imageContainer) {
      imageContainer.style.position = 'relative';
      imageContainer.appendChild(likeBtn);
      
      // Show like button on hover
      item.addEventListener('mouseenter', function() {
        likeBtn.style.opacity = '1';
      });
      
      item.addEventListener('mouseleave', function() {
        likeBtn.style.opacity = '0';
      });
      
      // Handle like button click
      likeBtn.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering parent card click
        
        const title = item.querySelector('h3').textContent;
        const subtitle = item.querySelector('p').textContent;
        const thumbnail = item.querySelector('img').src;
        
        toggleFavorite(this, title, subtitle, thumbnail);
      });
    }
  }
});

// Toggle favorite status
function toggleFavorite(button, title, subtitle, thumbnail) {
  const icon = button.querySelector('i');
  const isLiked = icon.classList.contains('fa-solid');
  
  if (isLiked) {
    // Remove from favorites
    icon.classList.remove('fa-solid', 'heart-active');
    icon.classList.add('fa-regular');
    
    // Remove from favorites array
    favorites = favorites.filter(item => item.title !== title);
  } else {
    // Add to favorites
    icon.classList.remove('fa-regular');
    icon.classList.add('fa-solid', 'heart-active');
    
    // Add to favorites array
    favorites.push({ title, subtitle, thumbnail });
  }
  
  // Update favorites page
  updateFavoritesPage();
}

// Update the favorites page with current favorites
function updateFavoritesPage() {
  const favoritesPage = document.getElementById('liked-page');
  
  // Create the page if it doesn't exist
  if (!favoritesPage) {
    createFavoritesPage();
    return;
  }
  
  const contentSection = favoritesPage.querySelector('.content-section');
  
  // Clear current content
  contentSection.innerHTML = '';
  
  // Add header
  const header = document.createElement('h2');
  header.textContent = 'Liked Songs';
  contentSection.appendChild(header);
  
  // Display favorites or empty message
  if (favorites.length === 0) {
    const emptyMessage = document.createElement('div');
    emptyMessage.className = 'favorites-empty';
    emptyMessage.innerHTML = `
      <i class="fa-solid fa-heart-crack"></i>
      <p>You haven't liked any songs yet.</p>
      <p>Click the heart icon on songs you love.</p>
    `;
    contentSection.appendChild(emptyMessage);
  } else {
    // Create list of favorites
    const libraryList = document.createElement('div');
    libraryList.className = 'library-list';
    
    favorites.forEach(fav => {
      const item = document.createElement('div');
      item.className = 'library-item';
      item.innerHTML = `
        <div class="item-image">
          <img src="${fav.thumbnail}" alt="${fav.title}">
        </div>
        <div class="item-info">
          <h3>${fav.title}</h3>
          <p>${fav.subtitle}</p>
        </div>
        <div class="item-actions">
          <button class="action-button remove-favorite">
            <i class="fa-solid fa-heart"></i>
          </button>
          <button class="action-button">
            <i class="fa-solid fa-play"></i>
          </button>
        </div>
      `;
      
      // Add remove functionality
      const removeBtn = item.querySelector('.remove-favorite');
      removeBtn.addEventListener('click', function() {
        favorites = favorites.filter(f => f.title !== fav.title);
        updateFavoritesPage();
        
        // Also update the heart icons elsewhere
        document.querySelectorAll('.like-button, .card-like-button').forEach(btn => {
          const nearbyTitle = btn.closest('.track-card, .playlist-card, .now-playing')?.querySelector('h3, h4')?.textContent;
          if (nearbyTitle === fav.title) {
            const icon = btn.querySelector('i');
            icon.className = 'fa-regular fa-heart';
          }
        });
      });
      
      libraryList.appendChild(item);
    });
    
    contentSection.appendChild(libraryList);
  }
}

// Create the favorites page if it doesn't exist
function createFavoritesPage() {
  // Check if the page already exists
  if (document.getElementById('liked-page')) return;
  
  const page = document.createElement('div');
  page.id = 'liked-page';
  page.className = 'page';
  
  page.innerHTML = `
    <div class="page-header">
      <h1>Liked Songs</h1>
      <div class="header-actions">
        <button class="action-button">
          <i class="fa-solid fa-play"></i>
        </button>
        <button class="action-button">
          <i class="fa-solid fa-ellipsis"></i>
        </button>
      </div>
    </div>
    <div class="content-section"></div>
  `;
  
  // Add to main content
  document.querySelector('.main-content').appendChild(page);
  
  // Update with current favorites
  updateFavoritesPage();
}

// Playlist functionality
function createPlaylistsPage() {
  // Check if the page already exists
  if (document.getElementById('playlists-page')) return;
  
  const page = document.createElement('div');
  page.id = 'playlists-page';
  page.className = 'page';
  
  page.innerHTML = `
    <div class="page-header">
      <h1>Your Playlists</h1>
      <div class="header-actions">
        <button class="create-playlist" id="create-playlist-btn">
          <i class="fa-solid fa-plus"></i>
          <span>Create Playlist</span>
        </button>
      </div>
    </div>
    <div class="content-section">
      <div class="playlist-header">
        <h2>Your Playlists</h2>
        <input type="file" id="playlist-image-upload" class="playlist-upload" accept="image/*">
      </div>
      <div class="playlist-grid">
        <!-- Default playlists -->
        <div class="playlist-card" data-playlist-id="favorites">
          <div class="playlist-image">
            <img src="https://via.placeholder.com/200/3b82f6/ffffff?text=Favorites" alt="Playlist Cover">
            <button class="play-button">
              <i class="fa-solid fa-play"></i>
            </button>
          </div>
          <div class="playlist-info">
            <h3>Liked Songs</h3>
            <p>Your favorite tracks</p>
          </div>
        </div>
      </div>
    </div>
  `;
  
  // Add to main content
  document.querySelector('.main-content').appendChild(page);
  
  // Setup create playlist functionality
  const createBtn = page.querySelector('#create-playlist-btn');
  const imageUpload = page.querySelector('#playlist-image-upload');
  
  createBtn.addEventListener('click', function() {
    createNewPlaylist();
  });
  
  imageUpload.addEventListener('change', function(e) {
    if (!e.target.files.length) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const imageUrl = event.target.result;
      const playlistName = localStorage.getItem("temp_playlist_name") || "My Playlist";
      localStorage.removeItem("temp_playlist_name");
      
      // Create new playlist with the image
      createPlaylist(playlistName, "Your custom playlist", imageUrl);
    };
    
    reader.readAsDataURL(file);
  });
}

// Add a new playlist card
function addPlaylistCard(title, description, imageUrl) {
  const playlistGrid = document.querySelector('#playlists-page .playlist-grid');
  
  const card = document.createElement('div');
  card.className = 'playlist-card';
  
  card.innerHTML = `
    <div class="playlist-image">
      <img src="${imageUrl || 'https://via.placeholder.com/200/22d3ee/ffffff?text=Playlist'}" alt="${title}">
      <button class="play-button">
        <i class="fa-solid fa-play"></i>
      </button>
    </div>
    <div class="playlist-info">
      <h3>${title}</h3>
      <p>${description}</p>
    </div>
  `;
  
  // Add like button
  const likeBtn = document.createElement('button');
  likeBtn.className = 'card-like-button';
  likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
  likeBtn.style.position = 'absolute';
  likeBtn.style.top = '8px';
  likeBtn.style.right = '8px';
  likeBtn.style.background = 'rgba(0, 0, 0, 0.5)';
  likeBtn.style.border = 'none';
  likeBtn.style.borderRadius = '50%';
  likeBtn.style.width = '30px';
  likeBtn.style.height = '30px';
  likeBtn.style.display = 'flex';
  likeBtn.style.alignItems = 'center';
  likeBtn.style.justifyContent = 'center';
  likeBtn.style.color = 'white';
  likeBtn.style.cursor = 'pointer';
  likeBtn.style.opacity = '0';
  likeBtn.style.transition = 'opacity 0.2s';
  
  const imageContainer = card.querySelector('.playlist-image');
  imageContainer.style.position = 'relative';
  imageContainer.appendChild(likeBtn);
  
  // Show like button on hover
  card.addEventListener('mouseenter', function() {
    likeBtn.style.opacity = '1';
  });
  
  card.addEventListener('mouseleave', function() {
    likeBtn.style.opacity = '0';
  });
  
  // Handle like button click
  likeBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    
    const title = card.querySelector('h3').textContent;
    const subtitle = card.querySelector('p').textContent;
    const thumbnail = card.querySelector('img').src;
    
    toggleFavorite(this, title, subtitle, thumbnail);
  });
  
  playlistGrid.appendChild(card);
}

// Initialize pages
createFavoritesPage();
createPlaylistsPage();

// Update the signup link in the original page
document.querySelector('.signup-section a').href = '#sign-up';

// Update the forgot password link
document.querySelector('.forgot-password a').href = '#forgot-password';
// Update the signup form submission handler
signupForm.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;
  
  // Simple validation
  if (password !== confirm) {
    alert('Passwords do not match!');
    return;
  }
  
  // Show loading state
  const submitButton = this.querySelector('button[type="submit"]');
  submitButton.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Creating Account...';
  submitButton.disabled = true;
  
  // Simulate account creation (2 second delay)
  setTimeout(() => {
    // Hide the form and show confirmation
    signupForm.style.display = 'none';
    document.getElementById('signup-confirmation').classList.remove('hidden');
    
    // Store the username for later use
    localStorage.setItem('soundstream_username', username);
    
    // Reset form for next time
    submitButton.innerHTML = 'Sign Up';
    submitButton.disabled = false;
  }, 2000);
});

// Handle the "Get Started" button click
document.querySelector('.close-confirmation').addEventListener('click', function() {
  // Close the modal
  signupModal.style.display = 'none';
  document.body.style.overflow = '';
  
  // Auto login with the new account
  const username = localStorage.getItem('soundstream_username') || 'New User';
  userDisplay.textContent = username;
  loginContainer.classList.add('hidden');
  appContainer.classList.remove('hidden');
  
  // Reset the modal for next time
  setTimeout(() => {
    signupForm.style.display = 'block';
    document.getElementById('signup-confirmation').classList.add('hidden');
    signupForm.reset();
  }, 500);
});
// Sample songs with actual audio files
const songs = [
  {
    id: 1,
    title: "Sunny Day",
    artist: "Acoustic Dreams",
    duration: 174, // in seconds
    cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Electric Vibes",
    artist: "Synth Wave",
    duration: 213,
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Midnight Jazz",
    artist: "Smooth Quartet",
    duration: 198,
    cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "Chill Beats",
    artist: "Lo-Fi Producer",
    duration: 165,
    cover: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 5,
    title: "Summer Groove",
    artist: "Beach Tunes",
    duration: 187,
    cover: "https://images.unsplash.com/photo-1534329539061-64caeb388c42?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  }
];

// Function to format time (seconds to MM:SS)
function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

// Audio player functionality
let currentSongIndex = 0;
let isPlaying = false;
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.querySelector('.play-pause');
const progressBar = document.querySelector('.progress-bar');
const progressFill = document.querySelector('.progress-fill');
const progressHandle = document.querySelector('.progress-handle');
const timeElapsed = document.querySelector('.time-elapsed');
const timeTotal = document.querySelector('.time-total');
const prevButton = document.querySelector('.player-buttons .fa-backward').parentElement;
const nextButton = document.querySelector('.player-buttons .fa-forward').parentElement;
const shuffleButton = document.querySelector('.player-buttons .fa-shuffle').parentElement;
const repeatButton = document.querySelector('.player-buttons .fa-repeat').parentElement;
const volumeSlider = document.querySelector('.volume-slider');
const volumeFill = document.querySelector('.volume-fill');

// Initialize the player with the first song
function initializePlayer() {
  loadSong(currentSongIndex);
  updateTrackGrid();
}

// Load a song into the player
function loadSong(index) {
  const song = songs[index];
  audioPlayer.src = song.audio;
  audioPlayer.load();
  
  // Update player UI
  document.querySelector('.now-playing .track-info h4').textContent = song.title;
  document.querySelector('.now-playing .track-info p').textContent = song.artist;
  document.querySelector('.track-thumbnail img').src = song.cover;
  
  // Update time display
  timeTotal.textContent = formatTime(song.duration);
  timeElapsed.textContent = "0:00";
  
  // Reset progress bar
  progressFill.style.width = "0%";
  progressHandle.style.left = "0%";
  
  // Update play/pause button
  if (isPlaying) {
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    audioPlayer.play();
  } else {
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  }
}

// Play/Pause toggle
playPauseBtn.addEventListener('click', function() {
  if (isPlaying) {
    audioPlayer.pause();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  } else {
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
  }
  isPlaying = !isPlaying;
});

// Previous song
prevButton.addEventListener('click', function() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audioPlayer.play();
});

// Next song
nextButton.addEventListener('click', function() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  if (isPlaying) audioPlayer.play();
});

// Update progress as song plays
audioPlayer.addEventListener('timeupdate', function() {
  if (audioPlayer.duration) {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressFill.style.width = `${percent}%`;
    progressHandle.style.left = `${percent}%`;
    timeElapsed.textContent = formatTime(audioPlayer.currentTime);
  }
});

// Click on progress bar to seek
progressBar.addEventListener('click', function(e) {
  const rect = this.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audioPlayer.currentTime = percent * audioPlayer.duration;
});

// Volume control
volumeSlider.addEventListener('click', function(e) {
  const rect = this.getBoundingClientRect();
  const percent = (e.clientX - rect.left) / rect.width;
  audioPlayer.volume = percent;
  volumeFill.style.width = `${percent * 100}%`;
  volumeHandle.style.left = `${percent * 100}%`;
});

// When song ends, play next song
audioPlayer.addEventListener('ended', function() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  loadSong(currentSongIndex);
  audioPlayer.play();
});

// Create track grid with actual songs
function updateTrackGrid() {
  const trackGrid = document.querySelector('.track-grid');
  if (!trackGrid) return;
  
  // Clear existing tracks
  trackGrid.innerHTML = '';
  
  // Add each song to the grid
  songs.forEach((song, index) => {
    const trackCard = document.createElement('div');
    trackCard.className = 'track-card';
    trackCard.innerHTML = `
      <div class="track-image">
        <img src="${song.cover}" alt="${song.title}">
        <button class="play-button">
          <i class="fa-solid fa-play"></i>
        </button>
      </div>
      <div class="track-info">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      </div>
    `;
    
    // Add like button
    const likeBtn = document.createElement('button');
    likeBtn.className = 'card-like-button';
    likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    likeBtn.style.position = 'absolute';
    likeBtn.style.top = '8px';
    likeBtn.style.right = '8px';
    likeBtn.style.background = 'rgba(0, 0, 0, 0.5)';
    likeBtn.style.border = 'none';
    likeBtn.style.borderRadius = '50%';
    likeBtn.style.width = '30px';
    likeBtn.style.height = '30px';
    likeBtn.style.display = 'flex';
    likeBtn.style.alignItems = 'center';
    likeBtn.style.justifyContent = 'center';
    likeBtn.style.color = 'white';
    likeBtn.style.cursor = 'pointer';
    likeBtn.style.opacity = '0';
    likeBtn.style.transition = 'opacity 0.2s';
    
    const imageContainer = trackCard.querySelector('.track-image');
    imageContainer.style.position = 'relative';
    imageContainer.appendChild(likeBtn);
    
    // Show like button on hover
    trackCard.addEventListener('mouseenter', function() {
      likeBtn.style.opacity = '1';
    });
    
    trackCard.addEventListener('mouseleave', function() {
      likeBtn.style.opacity = '0';
    });
    
    // Play this song when clicked
    trackCard.addEventListener('click', function() {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      isPlaying = true;
      audioPlayer.play();
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    });
    
    // Handle like button click
    likeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleFavorite(this, song.title, song.artist, song.cover);
    });
    
    trackGrid.appendChild(trackCard);
  });
}

// Initialize player when page loads
window.addEventListener('DOMContentLoaded', function() {
  // Initialize player after a short delay to ensure all elements are loaded
  setTimeout(initializePlayer, 500);
});
// Update the home page with our songs
function updateHomePage() {
  const recentlyPlayed = document.querySelector('#home-page .track-grid');
  if (!recentlyPlayed) return;
  
  // Clear existing content
  recentlyPlayed.innerHTML = '';
  
  // Add each song
  songs.forEach((song, index) => {
    const trackCard = document.createElement('div');
    trackCard.className = 'track-card';
    trackCard.innerHTML = `
      <div class="track-image">
        <img src="${song.cover}" alt="${song.title}">
        <button class="play-button">
          <i class="fa-solid fa-play"></i>
        </button>
      </div>
      <div class="track-info">
        <h3>${song.title}</h3>
        <p>${song.artist}</p>
      </div>
    `;
    
    // Add like button
    const likeBtn = document.createElement('button');
    likeBtn.className = 'card-like-button';
    likeBtn.innerHTML = '<i class="fa-regular fa-heart"></i>';
    likeBtn.style.position = 'absolute';
    likeBtn.style.top = '8px';
    likeBtn.style.right = '8px';
    likeBtn.style.background = 'rgba(0, 0, 0, 0.5)';
    likeBtn.style.border = 'none';
    likeBtn.style.borderRadius = '50%';
    likeBtn.style.width = '30px';
    likeBtn.style.height = '30px';
    likeBtn.style.display = 'flex';
    likeBtn.style.alignItems = 'center';
    likeBtn.style.justifyContent = 'center';
    likeBtn.style.color = 'white';
    likeBtn.style.cursor = 'pointer';
    likeBtn.style.opacity = '0';
    likeBtn.style.transition = 'opacity 0.2s';
    
    const imageContainer = trackCard.querySelector('.track-image');
    imageContainer.style.position = 'relative';
    imageContainer.appendChild(likeBtn);
    
    // Show like button on hover
    trackCard.addEventListener('mouseenter', function() {
      likeBtn.style.opacity = '1';
    });
    
    trackCard.addEventListener('mouseleave', function() {
      likeBtn.style.opacity = '0';
    });
    
    // Play this song when clicked
    trackCard.addEventListener('click', function() {
      currentSongIndex = index;
      loadSong(currentSongIndex);
      isPlaying = true;
      audioPlayer.play();
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    });
    
    // Handle like button click
    likeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggleFavorite(this, song.title, song.artist, song.cover);
    });
    
    recentlyPlayed.appendChild(trackCard);
  });
}

// Call this function after the page loads
window.addEventListener('DOMContentLoaded', function() {
  setTimeout(updateHomePage, 500);
});