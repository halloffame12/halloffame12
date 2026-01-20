<!-- 3D Space-Themed Header with Animated Stars -->

<div align="center">
  
<!-- Custom 3D SVG Header with Depth and Parallax Effect -->
<svg width="100%" height="300" xmlns="http://www.w3.org/2000/svg" style="background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #0a0e27 100%);">
  <defs>
    <!-- 3D Glow Effect -->
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Enhanced Multi-Layer 3D Shadow Effect with Depth -->
    <filter id="shadow3d" x="-50%" y="-50%" width="200%" height="200%">
      <!-- Far shadow layer for depth -->
      <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur1"/>
      <feOffset in="blur1" dx="8" dy="8" result="offsetBlur1"/>
      <feComponentTransfer in="offsetBlur1" result="shadow1">
        <feFuncA type="linear" slope="0.2"/>
      </feComponentTransfer>
      
      <!-- Mid shadow layer -->
      <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur2"/>
      <feOffset in="blur2" dx="5" dy="5" result="offsetBlur2"/>
      <feComponentTransfer in="offsetBlur2" result="shadow2">
        <feFuncA type="linear" slope="0.4"/>
      </feComponentTransfer>
      
      <!-- Close shadow layer for definition -->
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur3"/>
      <feOffset in="blur3" dx="3" dy="3" result="offsetBlur3"/>
      <feComponentTransfer in="offsetBlur3" result="shadow3">
        <feFuncA type="linear" slope="0.6"/>
      </feComponentTransfer>
      
      <!-- Merge all shadow layers -->
      <feMerge>
        <feMergeNode in="shadow1"/>
        <feMergeNode in="shadow2"/>
        <feMergeNode in="shadow3"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- 3D Emboss Effect with Light Source -->
    <filter id="emboss3d" x="-50%" y="-50%" width="200%" height="200%">
      <!-- Specular highlight (light from top-left) -->
      <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
      <feOffset in="blur" dx="-2" dy="-2" result="highlight"/>
      <feFlood flood-color="#ffffff" flood-opacity="0.4" result="lightColor"/>
      <feComposite in="lightColor" in2="highlight" operator="in" result="topHighlight"/>
      
      <!-- Shadow (from bottom-right) -->
      <feOffset in="blur" dx="2" dy="2" result="shadow"/>
      <feFlood flood-color="#000000" flood-opacity="0.5" result="shadowColor"/>
      <feComposite in="shadowColor" in2="shadow" operator="in" result="bottomShadow"/>
      
      <feMerge>
        <feMergeNode in="bottomShadow"/>
        <feMergeNode in="SourceGraphic"/>
        <feMergeNode in="topHighlight"/>
      </feMerge>
    </filter>
    
    <!-- Perspective Depth Filter -->
    <filter id="perspectiveDepth">
      <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur"/>
      <feOffset in="blur" dx="6" dy="6" result="offsetBlur"/>
      <feComponentTransfer in="offsetBlur">
        <feFuncA type="linear" slope="0.35"/>
      </feComponentTransfer>
      <feColorMatrix type="matrix" values="0 0 0 0 0.1
                                           0 0 0 0 0.2
                                           0 0 0 0 0.4
                                           0 0 0 1 0"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Enhanced Animated Stars with Parallax Depth -->
    <style>
      @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
      }
      @keyframes twinkleDeep {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.5; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      @keyframes floatDeep {
        0%, 100% { transform: translateY(0px) scale(0.8); }
        50% { transform: translateY(-5px) scale(0.8); }
      }
      @keyframes parallaxFloat {
        0% { transform: translate(0, 0); }
        25% { transform: translate(2px, -3px); }
        50% { transform: translate(0, -5px); }
        75% { transform: translate(-2px, -3px); }
        100% { transform: translate(0, 0); }
      }
      @keyframes orbit {
        from { transform: rotate(0deg) translateX(50px) rotate(0deg); }
        to { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
      }
      @keyframes pulse3d {
        0%, 100% { transform: scale(1); filter: brightness(1); }
        50% { transform: scale(1.05); filter: brightness(1.2); }
      }
      @keyframes slideIn3d {
        from { transform: perspective(500px) rotateX(20deg) translateY(-50px); opacity: 0; }
        to { transform: perspective(500px) rotateX(0deg) translateY(0); opacity: 1; }
      }
      .star { animation: twinkle 3s infinite; }
      .star:nth-child(2n) { animation: twinkleDeep 4s infinite; animation-delay: 1s; }
      .star:nth-child(3n) { animation: twinkle 5s infinite; animation-delay: 2s; }
      .starDeep { animation: twinkleDeep 6s infinite; opacity: 0.2; }
      .floatingText { animation: float 3s ease-in-out infinite; }
      .parallaxLayer { animation: parallaxFloat 8s ease-in-out infinite; }
      .pulseGlow { animation: pulse3d 3s ease-in-out infinite; }
    </style>
  </defs>
  
  <!-- Multi-Layered Background Space Particles for Depth -->
  <!-- Far Background Layer (Deep Space) -->
  <g opacity="0.3">
    <circle class="starDeep" cx="8%" cy="10%" r="1" fill="#00C4FF"/>
    <circle class="starDeep" cx="25%" cy="55%" r="0.8" fill="#B967FF"/>
    <circle class="starDeep" cx="42%" cy="30%" r="1.2" fill="#00FFF0"/>
    <circle class="starDeep" cx="58%" cy="75%" r="0.9" fill="#FF00FF"/>
    <circle class="starDeep" cx="72%" cy="40%" r="0.7" fill="#00C4FF"/>
    <circle class="starDeep" cx="88%" cy="65%" r="1.1" fill="#B967FF"/>
    <circle class="starDeep" cx="15%" cy="85%" r="0.8" fill="#00FFF0"/>
    <circle class="starDeep" cx="48%" cy="52%" r="0.9" fill="#FF00FF"/>
  </g>
  
  <!-- Mid Layer (Background Particles - Layer 1) -->
  <g opacity="0.5">
    <circle class="star" cx="10%" cy="15%" r="1.5" fill="#00C4FF" opacity="0.3"/>
    <circle class="star" cx="20%" cy="45%" r="1" fill="#B967FF" opacity="0.3"/>
    <circle class="star" cx="35%" cy="25%" r="2" fill="#00FFF0" opacity="0.3"/>
    <circle class="star" cx="50%" cy="70%" r="1.5" fill="#FF00FF" opacity="0.3"/>
    <circle class="star" cx="65%" cy="35%" r="1" fill="#00C4FF" opacity="0.3"/>
    <circle class="star" cx="80%" cy="60%" r="2" fill="#B967FF" opacity="0.3"/>
    <circle class="star" cx="90%" cy="20%" r="1.5" fill="#00FFF0" opacity="0.3"/>
    <circle class="star" cx="15%" cy="80%" r="1" fill="#FF00FF" opacity="0.3"/>
    <circle class="star" cx="45%" cy="50%" r="1.5" fill="#00C4FF" opacity="0.3"/>
    <circle class="star" cx="75%" cy="85%" r="1" fill="#B967FF" opacity="0.3"/>
  </g>
  
  <!-- Foreground Layer (Bright Stars with Parallax) -->
  <g class="parallaxLayer">
    <circle cx="5%" cy="40%" r="2.5" fill="#00C4FF" opacity="0.6" filter="url(#glow)">
      <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="95%" cy="50%" r="2" fill="#B967FF" opacity="0.6" filter="url(#glow)">
      <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4s" repeatCount="indefinite"/>
    </circle>
    <circle cx="30%" cy="12%" r="2.2" fill="#00FFF0" opacity="0.6" filter="url(#glow)">
      <animate attributeName="opacity" values="0.4;0.7;0.4" dur="3.5s" repeatCount="indefinite"/>
    </circle>
  </g>
  
  <!-- Gradient for 3D Text with Depth and Lighting -->
  <defs>
    <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.9" />
      <stop offset="15%" style="stop-color:#00FFF0;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="85%" style="stop-color:#7B5FFF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4B3088;stop-opacity:0.8" />
    </linearGradient>
    
    <!-- Specular highlight for glossy 3D effect -->
    <radialGradient id="highlight1" cx="40%" cy="30%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.6" />
      <stop offset="50%" style="stop-color:#00FFF0;stop-opacity:0.2" />
      <stop offset="100%" style="stop-color:#00C4FF;stop-opacity:0" />
    </radialGradient>
  </defs>
  
  <!-- Enhanced 3D Title with Multi-Layer Depth (Layer 2) -->
  <!-- Deep shadow layer -->
  <text x="50%" y="45%" text-anchor="middle" 
        font-family="'Segoe UI', Arial, sans-serif" font-size="48" font-weight="bold" 
        fill="#000000" opacity="0.15" filter="url(#glow)">
    <tspan dx="10" dy="10">Welcome to My Universe</tspan>
    <animate attributeName="opacity" values="0.1;0.2;0.1" dur="4s" repeatCount="indefinite"/>
  </text>
  
  <!-- Mid shadow layer -->
  <text x="50%" y="45%" text-anchor="middle" 
        font-family="'Segoe UI', Arial, sans-serif" font-size="48" font-weight="bold" 
        fill="#000000" opacity="0.25">
    <tspan dx="6" dy="6">Welcome to My Universe</tspan>
  </text>
  
  <!-- Main text with gradient -->
  <text x="50%" y="45%" text-anchor="middle" 
        font-family="'Segoe UI', Arial, sans-serif" font-size="48" font-weight="bold" 
        fill="url(#gradient1)" class="pulseGlow">
    Welcome to My Universe
    <animate attributeName="opacity" values="0;1" dur="2s" fill="freeze"/>
  </text>
  
  <!-- Specular highlight overlay for glossy effect -->
  <text x="50%" y="45%" text-anchor="middle" 
        font-family="'Segoe UI', Arial, sans-serif" font-size="48" font-weight="bold" 
        fill="url(#highlight1)" opacity="0.5">
    Welcome to My Universe
    <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite"/>
  </text>
  
  <!-- Subtitle with glow (Layer 3) -->
  <text x="50%" y="60%" text-anchor="middle" filter="url(#glow)"
        font-family="'Segoe UI', Arial, sans-serif" font-size="20" 
        fill="#00C4FF" opacity="1">
    Crafting Digital Experiences in the Cosmos 🌌
    <animate attributeName="opacity" values="0;1" dur="3s" fill="freeze"/>
  </text>
  
  <!-- Enhanced Floating Planet/Sphere with 3D Depth -->
  <defs>
    <radialGradient id="planetGradient" cx="35%" cy="35%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.4" />
      <stop offset="20%" style="stop-color:#E0A0FF;stop-opacity:1" />
      <stop offset="60%" style="stop-color:#B967FF;stop-opacity:1" />
      <stop offset="85%" style="stop-color:#7B2FFF;stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:#4A1888;stop-opacity:0.5" />
    </radialGradient>
    
    <!-- Shadow for the planet -->
    <radialGradient id="planetShadow" cx="50%" cy="50%">
      <stop offset="0%" style="stop-color:#000000;stop-opacity:0" />
      <stop offset="70%" style="stop-color:#000000;stop-opacity:0" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:0.6" />
    </radialGradient>
  </defs>
  
  <!-- Planet shadow (cast on background) -->
  <ellipse cx="87%" cy="23%" rx="18" ry="6" fill="#000000" opacity="0.2" filter="url(#glow)">
    <animate attributeName="cy" values="23%;28%;23%" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.2;0.15;0.2" dur="4s" repeatCount="indefinite"/>
  </ellipse>
  
  <!-- Main planet body with depth -->
  <circle cx="85%" cy="20%" r="15" fill="url(#planetGradient)" filter="url(#perspectiveDepth)" opacity="0.8" class="pulseGlow">
    <animate attributeName="cy" values="20%;25%;20%" dur="4s" repeatCount="indefinite"/>
  </circle>
  
  <!-- Specular highlight on planet -->
  <circle cx="82%" cy="17%" r="6" fill="url(#highlight1)" opacity="0.7">
    <animate attributeName="cy" values="17%;22%;17%" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite"/>
  </circle>
  
  <!-- Atmospheric glow around planet -->
  <circle cx="85%" cy="20%" r="17" fill="none" stroke="#B967FF" stroke-width="0.5" opacity="0.3" filter="url(#glow)">
    <animate attributeName="cy" values="20%;25%;20%" dur="4s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite"/>
  </circle>
</svg>

</div>

<!-- Hero: Animated Typing Effect with 3D Styling -->
<p align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=700&size=32&duration=3000&pause=1000&color=00C4FF&center=true&vCenter=true&multiline=true&repeat=true&width=950&height=150&lines=%F0%9F%9A%80+Hi%2C+I'm+Sumit+Chauhan;%F0%9F%92%BB+Full-Stack+%7C+Mobile+Developer+%7C+%F0%9F%A4%96+AI%2FML+Engineer;%F0%9F%93%B1+Flutter+%7C+React+Native+%7C+Cross-Platform+Expert;%F0%9F%8E%93+IIT+Patna+%7C+%F0%9F%87%AE%F0%9F%87%B3+India+%7C+Building+ForgeStack+OS" alt="Typing SVG" />
  </a>
</p>

<!-- 3D Floating Badges with Hover Effects -->
<p align="center">
  <img src="https://komarev.com/ghpvc/?username=halloffame12&label=Profile%20Views&color=00C4FF&style=for-the-badge&labelColor=0a0e27" alt="Profile views" />
  <a href="https://twitter.com/sumit_7678">
    <img src="https://img.shields.io/twitter/follow/sumit_7678?logo=twitter&style=for-the-badge&color=00acee&labelColor=0a0e27" />
  </a>
  <a href="https://github.com/halloffame12?tab=followers">
    <img src="https://img.shields.io/github/followers/halloffame12?label=Followers&style=for-the-badge&color=B967FF&labelColor=0a0e27" />
  </a>
  <img src="https://img.shields.io/github/stars/halloffame12?label=Stars&style=for-the-badge&color=ffd43b&labelColor=0a0e27" />
</p>

<p align="center">
  <a href="https://github.com/halloffame12">
    <img src="https://img.shields.io/badge/🔓_Open_Source-Contributor-00FFF0?style=for-the-badge&labelColor=0a0e27" />
  </a>
  <img src="https://img.shields.io/badge/⚡_Status-Active_Coding-00FF87?style=for-the-badge&labelColor=0a0e27" />
  <img src="https://img.shields.io/badge/🎯_Focus-Mobile_&_AI-FF00FF?style=for-the-badge&labelColor=0a0e27" />
  <img src="https://img.shields.io/badge/🚀_Building-ForgeStack_OS-00C4FF?style=for-the-badge&labelColor=0a0e27" />
</p>

<!-- 3D Animated Divider with Depth -->
<div align="center">
  
<!-- Custom 3D Divider SVG -->
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="dividerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0a0e27;stop-opacity:0" />
      <stop offset="20%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#B967FF;stop-opacity:1" />
      <stop offset="80%" style="stop-color:#00FFF0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:0" />
    </linearGradient>
    <filter id="dividerGlow">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <line x1="0" y1="25" x2="100%" y2="25" stroke="url(#dividerGradient)" stroke-width="2" filter="url(#dividerGlow)">
    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
  </line>
</svg>

</div>

<!-- 3D About Me Card with Glow and Depth -->
<div align="center">

<!-- Custom 3D Info Card SVG -->
<svg width="95%" height="450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 3D Card Shadow -->
    <filter id="cardShadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="8"/>
      <feOffset dx="6" dy="6" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Glow Effect for Card -->
    <filter id="cardGlow">
      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    
    <!-- Card Gradient Background -->
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f1729;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#1a1f3a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f1729;stop-opacity:1" />
    </linearGradient>
    
    <!-- Border Gradient -->
    <linearGradient id="cardBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#B967FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00FFF0;stop-opacity:1" />
    </linearGradient>
    
    <!-- Enhanced Floating Animation with Perspective -->
    <style>
      @keyframes cardFloat {
        0% { transform: perspective(1000px) translateY(0px) rotateX(0deg); }
        25% { transform: perspective(1000px) translateY(-4px) rotateX(1deg); }
        50% { transform: perspective(1000px) translateY(-8px) rotateX(0deg); }
        75% { transform: perspective(1000px) translateY(-4px) rotateX(-1deg); }
        100% { transform: perspective(1000px) translateY(0px) rotateX(0deg); }
      }
      @keyframes cardGlowPulse {
        0%, 100% { filter: brightness(1) drop-shadow(0 0 10px rgba(185, 103, 255, 0.3)); }
        50% { filter: brightness(1.1) drop-shadow(0 0 20px rgba(185, 103, 255, 0.5)); }
      }
      .floatingCard {
        animation: cardFloat 4s ease-in-out infinite;
        transform-origin: center center;
      }
    </style>
  </defs>
  
  <!-- Multi-Layer Shadow for Enhanced Depth -->
  <!-- Far shadow (diffuse) -->
  <rect x="5%" y="8%" width="94%" height="90%" rx="15" fill="#000" opacity="0.15" filter="url(#cardShadow)">
    <animate attributeName="opacity" values="0.12;0.18;0.12" dur="4s" repeatCount="indefinite"/>
  </rect>
  
  <!-- Mid shadow -->
  <rect x="3.5%" y="6%" width="94%" height="90%" rx="15" fill="#000" opacity="0.2" filter="url(#cardShadow)"/>
  
  <!-- Close shadow (sharp) -->
  <rect x="3%" y="5%" width="94%" height="90%" rx="15" fill="#000" opacity="0.25"/>
  
  <!-- Main Card with Enhanced Border and Inner Glow -->
  <!-- Inner shadow for depth -->
  <rect x="2%" y="2%" width="96%" height="96%" rx="15" fill="#000" opacity="0.3"/>
  
  <!-- Card body with gradient -->
  <rect class="floatingCard" x="2%" y="2%" width="96%" height="96%" rx="15" fill="url(#cardBg)" stroke="url(#cardBorder)" stroke-width="2" filter="url(#cardGlow)"/>
  
  <!-- Inner highlight for beveled edge effect -->
  <rect x="2.5%" y="2.5%" width="95%" height="1%" rx="15" fill="url(#cardBorder)" opacity="0.3"/>
  <rect x="2.5%" y="2.5%" width="1%" height="95%" rx="15" fill="url(#cardBorder)" opacity="0.2"/>
  
  <!-- Title -->
  <text x="50%" y="15%" text-anchor="middle" font-family="'Fira Code', monospace" font-size="26" font-weight="bold" fill="#00C4FF">
    <tspan>💫 About Me 💫</tspan>
    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
  </text>
  
  <!-- Content Lines with Icon -->
  <text x="8%" y="28%" font-family="'Courier New', monospace" font-size="16" fill="#00FFF0">
    <tspan x="8%">👤 Name:</tspan>
    <tspan x="25%" fill="#fff">Sumit Chauhan</tspan>
  </text>
  
  <text x="8%" y="38%" font-family="'Courier New', monospace" font-size="16" fill="#00FFF0">
    <tspan x="8%">📍 Location:</tspan>
    <tspan x="25%" fill="#fff">India 🇮🇳</tspan>
  </text>
  
  <text x="8%" y="48%" font-family="'Courier New', monospace" font-size="16" fill="#00FFF0">
    <tspan x="8%">🎓 Education:</tspan>
    <tspan x="25%" fill="#fff">BS in Computer Science</tspan>
  </text>
  
  <text x="8%" y="55%" font-family="'Courier New', monospace" font-size="14" fill="#B967FF">
    <tspan x="25%">IIT Patna (2024-2028)</tspan>
  </text>
  
  <text x="8%" y="65%" font-family="'Courier New', monospace" font-size="16" fill="#00FFF0">
    <tspan x="8%">🚀 Current Focus:</tspan>
  </text>
  
  <text x="25%" y="72%" font-family="'Courier New', monospace" font-size="14" fill="#fff">
    <tspan x="25%">• Building ForgeStack OS</tspan>
  </text>
  <text x="25%" y="78%" font-family="'Courier New', monospace" font-size="14" fill="#fff">
    <tspan x="25%">• Learning ML, DL & NLP</tspan>
  </text>
  <text x="25%" y="84%" font-family="'Courier New', monospace" font-size="14" fill="#fff">
    <tspan x="25%">• Mastering Flutter & Mobile Dev</tspan>
  </text>
  <text x="25%" y="90%" font-family="'Courier New', monospace" font-size="14" fill="#fff">
    <tspan x="25%">• Exploring Cloud & DevOps</tspan>
  </text>
  
  <!-- Bottom Section -->
  <line x1="8%" y1="85%" x2="92%" y2="85%" stroke="#00C4FF" stroke-width="1" opacity="0.5"/>
  
  <text x="50%" y="91%" text-anchor="middle" font-family="'Courier New', monospace" font-size="14" fill="#B967FF" font-style="italic">
    <tspan>🌌 Dream: Exploring black holes & space 🌌</tspan>
    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
  </text>
  
  <text x="50%" y="97%" text-anchor="middle" font-family="'Courier New', monospace" font-size="13" fill="#00FFF0" font-style="italic">
    <tspan>🚀 Fun fact: I code by day, dream of cosmos by night</tspan>
  </text>
</svg>

</div>

<!-- 3D Animated Divider -->
<div align="center">
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="divider2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0a0e27;stop-opacity:0" />
      <stop offset="25%" style="stop-color:#B967FF;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="75%" style="stop-color:#B967FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:0" />
    </linearGradient>
  </defs>
  <line x1="0" y1="25" x2="100%" y2="25" stroke="url(#divider2)" stroke-width="2">
    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
  </line>
</svg>
</div>

<!-- 3D Connect Section with Social Buttons -->
<div align="center">

<!-- Title SVG with 3D Effect -->
<svg width="400" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="textShadow">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="3" dy="3" result="offsetblur"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="textGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#B967FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00FFF0;stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="'Fira Code', monospace" font-size="32" font-weight="bold" 
        fill="url(#textGrad)" filter="url(#textShadow)">
    🔗 Let's Connect! 🔗
    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
  </text>
</svg>

</div>

<!-- 3D Social Buttons with Hover Effects -->
<p align="center">
  <a href="https://twitter.com/sumit_7678" target="_blank">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white&labelColor=0a0e27" alt="Twitter"/>
  </a>
  <a href="https://www.linkedin.com/in/sumit-chauhan-a4ba98325/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&labelColor=0a0e27" alt="LinkedIn"/>
  </a>
  <a href="https://instagram.com/sumitxdev" target="_blank">
    <img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white&labelColor=0a0e27" alt="Instagram"/>
  </a>
  <a href="mailto:sumitchauhan10062004@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white&labelColor=0a0e27" alt="Gmail"/>
  </a>
  <a href="https://sumitchauhandev.netlify.app/" target="_blank">
    <img src="https://img.shields.io/badge/Portfolio-FF5722?style=for-the-badge&logo=google-chrome&logoColor=white&labelColor=0a0e27" alt="Portfolio"/>
  </a>
  <a href="https://github.com/halloffame12" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white&labelColor=0a0e27" alt="GitHub"/>
  </a>
</p>

<!-- 3D Animated Divider -->
<div align="center">
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="divider3" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0a0e27;stop-opacity:0" />
      <stop offset="30%" style="stop-color:#00FFF0;stop-opacity:1" />
      <stop offset="70%" style="stop-color:#FF00FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:0" />
    </linearGradient>
  </defs>
  <line x1="0" y1="25" x2="100%" y2="25" stroke="url(#divider3)" stroke-width="2">
    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
  </line>
</svg>
</div>

<!-- 3D Tech Arsenal with Orbital Animation -->
<div align="center">

<!-- Tech Arsenal Title -->
<svg width="450" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="techGlow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="techGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FF00FF;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00FFF0;stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="'Fira Code', monospace" font-size="32" font-weight="bold" 
        fill="url(#techGrad)" filter="url(#techGlow)">
    ⚡ Tech Arsenal ⚡
  </text>
</svg>

</div>

<!-- 3D Tech Stack Clusters with Animated Badges -->
<div align="center">

### 📱 Mobile Development
<p>
<img src="https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/iOS-000000?style=for-the-badge&logo=ios&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white&labelColor=0a0e27"/>
</p>

### 🎨 Frontend
<p>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=sass&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=redux&logoColor=white&labelColor=0a0e27"/>
</p>

### ⚙️ Backend & Database
<p>
<img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white&labelColor=0a0e27"/>
</p>

### 🤖 AI/ML & Data Science
<p>
<img src="https://img.shields.io/badge/TensorFlow-FF6F00?style=for-the-badge&logo=tensorflow&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Keras-D00000?style=for-the-badge&logo=keras&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/scikit--learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/OpenCV-5C3EE8?style=for-the-badge&logo=opencv&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Jupyter-F37626?style=for-the-badge&logo=jupyter&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Hugging%20Face-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black&labelColor=0a0e27"/>
</p>

### ☁️ Cloud & DevOps
<p>
<img src="https://img.shields.io/badge/AWS-FF9900?style=for-the-badge&logo=amazon-aws&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Microsoft_Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white&labelColor=0a0e27"/>
</p>

### 🛠️ Tools & Platforms
<p>
<img src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Android_Studio-3DDC84?style=for-the-badge&logo=android-studio&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Xcode-147EFB?style=for-the-badge&logo=xcode&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white&labelColor=0a0e27"/>
<img src="https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black&labelColor=0a0e27"/>
</p>

</div>

<!-- 3D Animated Divider -->
<div align="center">
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="divider4" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0a0e27;stop-opacity:0" />
      <stop offset="20%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#B967FF;stop-opacity:1" />
      <stop offset="80%" style="stop-color:#00FFF0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:0" />
    </linearGradient>
  </defs>
  <line x1="0" y1="25" x2="100%" y2="25" stroke="url(#divider4)" stroke-width="2">
    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
  </line>
</svg>
</div>

<!-- 3D Skills Section with Progress Bars -->
<div align="center">

<!-- Skills Title -->
<svg width="500" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="skillGlow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="skillGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00FFF0;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#B967FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FF00FF;stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="'Fira Code', monospace" font-size="32" font-weight="bold" 
        fill="url(#skillGrad)" filter="url(#skillGlow)">
    💪 Skills & Expertise 💪
  </text>
</svg>

<!-- 3D Progress Bars with Depth Effect -->
<svg width="90%" height="400" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Enhanced Gradients with Lighting for 3D Bars -->
    <linearGradient id="prog1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#66D9FF;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0077FF;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="prog1Top" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.3" />
      <stop offset="50%" style="stop-color:#00C4FF;stop-opacity:0" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:0.2" />
    </linearGradient>
    
    <linearGradient id="prog2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#D4A0FF;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#B967FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#7B2FFF;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="prog2Top" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.3" />
      <stop offset="50%" style="stop-color:#B967FF;stop-opacity:0" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:0.2" />
    </linearGradient>
    
    <linearGradient id="prog3" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#66FFF9;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#00FFF0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00C4B0;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="prog3Top" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.3" />
      <stop offset="50%" style="stop-color:#00FFF0;stop-opacity:0" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:0.2" />
    </linearGradient>
    
    <linearGradient id="prog4" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FF66FF;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#FF00FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#CC00CC;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="prog4Top" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.3" />
      <stop offset="50%" style="stop-color:#FF00FF;stop-opacity:0" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:0.2" />
    </linearGradient>
    
    <linearGradient id="prog5" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FFE666;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#FFD700;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFA500;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="prog5Top" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.3" />
      <stop offset="50%" style="stop-color:#FFD700;stop-opacity:0" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:0.2" />
    </linearGradient>
    
    <!-- Glow for progress bars -->
    <filter id="barGlow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Programming Languages - 95% with Enhanced 3D Effect -->
  <text x="5%" y="10%" font-family="'Courier New', monospace" font-size="16" fill="#00C4FF" font-weight="bold">
    💻 Programming Languages
  </text>
  
  <!-- Track shadow (depth) -->
  <rect x="5.5%" y="12.5%" width="85%" height="25" rx="5" fill="#000000" opacity="0.3"/>
  
  <!-- Track background -->
  <rect x="5%" y="12%" width="85%" height="25" rx="5" fill="#0f1729" stroke="#00C4FF" stroke-width="1"/>
  
  <!-- Inner shadow on track -->
  <rect x="5%" y="12%" width="85%" height="3" rx="5" fill="#000000" opacity="0.4"/>
  
  <!-- Progress bar shadow -->
  <rect x="5.3%" y="12.3%" width="80.75%" height="25" rx="5" fill="#000000" opacity="0.2"/>
  
  <!-- Main progress bar -->
  <rect x="5%" y="12%" width="80.75%" height="25" rx="5" fill="url(#prog1)" filter="url(#barGlow)">
    <animate attributeName="width" from="0%" to="80.75%" dur="2s" fill="freeze"/>
  </rect>
  
  <!-- Top highlight for glossy 3D effect -->
  <rect x="5%" y="12%" width="80.75%" height="12" rx="5" fill="url(#prog1Top)" opacity="0.6">
    <animate attributeName="width" from="0%" to="80.75%" dur="2s" fill="freeze"/>
  </rect>
  
  <!-- Specular highlight (gleam) -->
  <rect x="5%" y="13%" width="15%" height="6" rx="3" fill="#ffffff" opacity="0.4">
    <animate attributeName="width" from="0%" to="15%" dur="2s" fill="freeze"/>
    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite"/>
  </rect>
  
  <text x="88%" y="15.5%" font-family="'Courier New', monospace" font-size="14" fill="#fff" filter="url(#glow)">95%</text>
  
  <!-- Mobile Development - 90% with Enhanced 3D Effect -->
  <text x="5%" y="26%" font-family="'Courier New', monospace" font-size="16" fill="#B967FF" font-weight="bold">
    📱 Mobile Development
  </text>
  
  <!-- Track shadow -->
  <rect x="5.5%" y="28.5%" width="85%" height="25" rx="5" fill="#000000" opacity="0.3"/>
  
  <!-- Track background -->
  <rect x="5%" y="28%" width="85%" height="25" rx="5" fill="#0f1729" stroke="#B967FF" stroke-width="1"/>
  
  <!-- Inner shadow on track -->
  <rect x="5%" y="28%" width="85%" height="3" rx="5" fill="#000000" opacity="0.4"/>
  
  <!-- Progress bar shadow -->
  <rect x="5.3%" y="28.3%" width="76.5%" height="25" rx="5" fill="#000000" opacity="0.2"/>
  
  <!-- Main progress bar -->
  <rect x="5%" y="28%" width="76.5%" height="25" rx="5" fill="url(#prog2)" filter="url(#barGlow)">
    <animate attributeName="width" from="0%" to="76.5%" dur="2.2s" fill="freeze"/>
  </rect>
  
  <!-- Top highlight -->
  <rect x="5%" y="28%" width="76.5%" height="12" rx="5" fill="url(#prog2Top)" opacity="0.6">
    <animate attributeName="width" from="0%" to="76.5%" dur="2.2s" fill="freeze"/>
  </rect>
  
  <!-- Specular highlight -->
  <rect x="5%" y="29%" width="14%" height="6" rx="3" fill="#ffffff" opacity="0.4">
    <animate attributeName="width" from="0%" to="14%" dur="2.2s" fill="freeze"/>
    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite"/>
  </rect>
  
  <text x="88%" y="31.5%" font-family="'Courier New', monospace" font-size="14" fill="#fff" filter="url(#glow)">90%</text>
  
  <!-- Web Development - 90% with Enhanced 3D Effect -->
  <text x="5%" y="42%" font-family="'Courier New', monospace" font-size="16" fill="#00FFF0" font-weight="bold">
    🌐 Web Development
  </text>
  
  <!-- Track shadow -->
  <rect x="5.5%" y="44.5%" width="85%" height="25" rx="5" fill="#000000" opacity="0.3"/>
  
  <!-- Track background -->
  <rect x="5%" y="44%" width="85%" height="25" rx="5" fill="#0f1729" stroke="#00FFF0" stroke-width="1"/>
  
  <!-- Inner shadow on track -->
  <rect x="5%" y="44%" width="85%" height="3" rx="5" fill="#000000" opacity="0.4"/>
  
  <!-- Progress bar shadow -->
  <rect x="5.3%" y="44.3%" width="76.5%" height="25" rx="5" fill="#000000" opacity="0.2"/>
  
  <!-- Main progress bar -->
  <rect x="5%" y="44%" width="76.5%" height="25" rx="5" fill="url(#prog3)" filter="url(#barGlow)">
    <animate attributeName="width" from="0%" to="76.5%" dur="2.4s" fill="freeze"/>
  </rect>
  
  <!-- Top highlight -->
  <rect x="5%" y="44%" width="76.5%" height="12" rx="5" fill="url(#prog3Top)" opacity="0.6">
    <animate attributeName="width" from="0%" to="76.5%" dur="2.4s" fill="freeze"/>
  </rect>
  
  <!-- Specular highlight -->
  <rect x="5%" y="45%" width="14%" height="6" rx="3" fill="#ffffff" opacity="0.4">
    <animate attributeName="width" from="0%" to="14%" dur="2.4s" fill="freeze"/>
    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite"/>
  </rect>
  
  <text x="88%" y="47.5%" font-family="'Courier New', monospace" font-size="14" fill="#fff" filter="url(#glow)">90%</text>
  
  <!-- AI & Machine Learning - 80% with Enhanced 3D Effect -->
  <text x="5%" y="58%" font-family="'Courier New', monospace" font-size="16" fill="#FF00FF" font-weight="bold">
    🤖 AI & Machine Learning
  </text>
  
  <!-- Track shadow -->
  <rect x="5.5%" y="60.5%" width="85%" height="25" rx="5" fill="#000000" opacity="0.3"/>
  
  <!-- Track background -->
  <rect x="5%" y="60%" width="85%" height="25" rx="5" fill="#0f1729" stroke="#FF00FF" stroke-width="1"/>
  
  <!-- Inner shadow on track -->
  <rect x="5%" y="60%" width="85%" height="3" rx="5" fill="#000000" opacity="0.4"/>
  
  <!-- Progress bar shadow -->
  <rect x="5.3%" y="60.3%" width="68%" height="25" rx="5" fill="#000000" opacity="0.2"/>
  
  <!-- Main progress bar -->
  <rect x="5%" y="60%" width="68%" height="25" rx="5" fill="url(#prog4)" filter="url(#barGlow)">
    <animate attributeName="width" from="0%" to="68%" dur="2.6s" fill="freeze"/>
  </rect>
  
  <!-- Top highlight -->
  <rect x="5%" y="60%" width="68%" height="12" rx="5" fill="url(#prog4Top)" opacity="0.6">
    <animate attributeName="width" from="0%" to="68%" dur="2.6s" fill="freeze"/>
  </rect>
  
  <!-- Specular highlight -->
  <rect x="5%" y="61%" width="13%" height="6" rx="3" fill="#ffffff" opacity="0.4">
    <animate attributeName="width" from="0%" to="13%" dur="2.6s" fill="freeze"/>
    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite"/>
  </rect>
  
  <text x="88%" y="63.5%" font-family="'Courier New', monospace" font-size="14" fill="#fff" filter="url(#glow)">80%</text>
  
  <!-- Cloud & DevOps - 85% with Enhanced 3D Effect -->
  <text x="5%" y="74%" font-family="'Courier New', monospace" font-size="16" fill="#FFD700" font-weight="bold">
    ☁️ Cloud & DevOps
  </text>
  
  <!-- Track shadow -->
  <rect x="5.5%" y="76.5%" width="85%" height="25" rx="5" fill="#000000" opacity="0.3"/>
  
  <!-- Track background -->
  <rect x="5%" y="76%" width="85%" height="25" rx="5" fill="#0f1729" stroke="#FFD700" stroke-width="1"/>
  
  <!-- Inner shadow on track -->
  <rect x="5%" y="76%" width="85%" height="3" rx="5" fill="#000000" opacity="0.4"/>
  
  <!-- Progress bar shadow -->
  <rect x="5.3%" y="76.3%" width="72.25%" height="25" rx="5" fill="#000000" opacity="0.2"/>
  
  <!-- Main progress bar -->
  <rect x="5%" y="76%" width="72.25%" height="25" rx="5" fill="url(#prog5)" filter="url(#barGlow)">
    <animate attributeName="width" from="0%" to="72.25%" dur="2.8s" fill="freeze"/>
  </rect>
  
  <!-- Top highlight -->
  <rect x="5%" y="76%" width="72.25%" height="12" rx="5" fill="url(#prog5Top)" opacity="0.6">
    <animate attributeName="width" from="0%" to="72.25%" dur="2.8s" fill="freeze"/>
  </rect>
  
  <!-- Specular highlight -->
  <rect x="5%" y="77%" width="13.5%" height="6" rx="3" fill="#ffffff" opacity="0.4">
    <animate attributeName="width" from="0%" to="13.5%" dur="2.8s" fill="freeze"/>
    <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite"/>
  </rect>
  
  <text x="88%" y="79.5%" font-family="'Courier New', monospace" font-size="14" fill="#fff" filter="url(#glow)">85%</text>
</svg>

</div>

<!-- 3D Animated Divider -->
<div align="center">
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="divider5" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0a0e27;stop-opacity:0" />
      <stop offset="30%" style="stop-color:#FF00FF;stop-opacity:1" />
      <stop offset="70%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:0" />
    </linearGradient>
  </defs>
  <line x1="0" y1="25" x2="100%" y2="25" stroke="url(#divider5)" stroke-width="2">
    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
  </line>
</svg>
</div>

<!-- GitHub Analytics Title -->
<div align="center">
<svg width="450" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="analyticsGlow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="analyticsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#B967FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00FFF0;stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="'Fira Code', monospace" font-size="32" font-weight="bold" 
        fill="url(#analyticsGrad)" filter="url(#analyticsGlow)">
    📊 GitHub Analytics 📊
  </text>
</svg>
</div>

<!-- 3D GitHub Stats Cards with Depth -->
<p align="center">
  <a href="https://github.com/halloffame12">
    <img height="180em" src="https://github-readme-stats.vercel.app/api?username=halloffame12&show_icons=true&theme=tokyonight&include_all_commits=true&count_private=true&hide_border=true&bg_color=0a0e27&title_color=00C4FF&icon_color=B967FF&text_color=ffffff&border_radius=10"/>
    <img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=halloffame12&layout=compact&langs_count=8&theme=tokyonight&hide_border=true&bg_color=0a0e27&title_color=00C4FF&text_color=ffffff&border_radius=10"/>
  </a>
</p>

<!-- 3D GitHub Streak with Enhanced Styling -->
<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=halloffame12&theme=tokyonight&hide_border=true&background=0a0e27&stroke=00C4FF&ring=B967FF&fire=FF6B6B&currStreakLabel=00FFF0&sideLabels=ffffff&currStreakNum=ffffff&dates=ffffff&border_radius=10" alt="GitHub Streak"/>
</p>

<!-- 3D Activity Graph -->
<p align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=halloffame12&custom_title=📈%20Contribution%20Graph&bg_color=0a0e27&color=00C4FF&line=B967FF&point=00FFF0&area_color=00C4FF&area=true&hide_border=true&border_radius=10" alt="Activity Graph"/>
</p>

<!-- 3D Animated Divider -->
<div align="center">
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="divider6" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0a0e27;stop-opacity:0" />
      <stop offset="25%" style="stop-color:#00FFF0;stop-opacity:1" />
      <stop offset="75%" style="stop-color:#B967FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:0" />
    </linearGradient>
  </defs>
  <line x1="0" y1="25" x2="100%" y2="25" stroke="url(#divider6)" stroke-width="2">
    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
  </line>
</svg>
</div>

<!-- GitHub Snake Animation Section -->
<div align="center">

<svg width="300" height="60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="snakeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#B967FF;stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="'Fira Code', monospace" font-size="24" font-weight="bold" 
        fill="url(#snakeGrad)">
    🐍 Contribution Snake 🐍
  </text>
</svg>

</div>

<!-- Contribution Snake Animation -->
<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/halloffame12/halloffame12/output/github-contribution-grid-snake-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/halloffame12/halloffame12/output/github-contribution-grid-snake.svg" />
    <img alt="github-snake" src="https://raw.githubusercontent.com/halloffame12/halloffame12/output/github-contribution-grid-snake-dark.svg" />
  </picture>
</p>

<!-- 3D Animated Divider -->
<div align="center">
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="divider7" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0a0e27;stop-opacity:0" />
      <stop offset="35%" style="stop-color:#FFD700;stop-opacity:1" />
      <stop offset="65%" style="stop-color:#FF00FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:0" />
    </linearGradient>
  </defs>
  <line x1="0" y1="25" x2="100%" y2="25" stroke="url(#divider7)" stroke-width="2">
    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
  </line>
</svg>
</div>

<!-- Trophy Cabinet Title -->
<div align="center">
<svg width="400" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="trophyGlow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="trophyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FFD700;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#FF00FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00C4FF;stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="'Fira Code', monospace" font-size="32" font-weight="bold" 
        fill="url(#trophyGrad)" filter="url(#trophyGlow)">
    🏆 Trophy Cabinet 🏆
    <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite"/>
  </text>
</svg>
</div>

<!-- 3D Trophy Display -->
<p align="center">
  <img src="https://github-profile-trophy.vercel.app/?username=halloffame12&theme=tokyonight&no-frame=true&no-bg=false&column=7&margin-w=10&margin-h=10&bg_color=0a0e27&title_color=00C4FF&text_color=ffffff&icon_color=B967FF&border_color=B967FF" alt="GitHub Trophies"/>
</p>

<!-- 3D Animated Divider -->
<div align="center">
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="divider8" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0a0e27;stop-opacity:0" />
      <stop offset="30%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="70%" style="stop-color:#00FFF0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:0" />
    </linearGradient>
  </defs>
  <line x1="0" y1="25" x2="100%" y2="25" stroke="url(#divider8)" stroke-width="2">
    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
  </line>
</svg>
</div>

<!-- Dev Quote Title -->
<div align="center">
<svg width="400" height="70" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="quoteGlow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="'Fira Code', monospace" font-size="28" font-weight="bold" 
        fill="#B967FF" filter="url(#quoteGlow)">
    💭 Random Dev Quote 💭
    <animate attributeName="opacity" values="0.7;1;0.7" dur="4s" repeatCount="indefinite"/>
  </text>
</svg>
</div>

<!-- 3D Quote Card with Fade Animation -->
<p align="center">
  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=tokyonight&bg_color=0a0e27&border_color=B967FF&quote_color=00C4FF&author_color=00FFF0" alt="Random Dev Quote"/>
</p>

<!-- 3D Animated Divider -->
<div align="center">
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="divider9" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0a0e27;stop-opacity:0" />
      <stop offset="20%" style="stop-color:#FF00FF;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="80%" style="stop-color:#00FFF0;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:0" />
    </linearGradient>
  </defs>
  <line x1="0" y1="25" x2="100%" y2="25" stroke="url(#divider9)" stroke-width="2">
    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
  </line>
</svg>
</div>

<!-- Current Projects Title -->
<div align="center">
<svg width="550" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="projectGlow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
    <linearGradient id="projectGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FF00FF;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#FFD700;stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="'Fira Code', monospace" font-size="32" font-weight="bold" 
        fill="url(#projectGrad)" filter="url(#projectGlow)">
    🔥 Current Projects & Focus 🔥
  </text>
</svg>
</div>

<!-- 3D Project Cards -->
<div align="center">
  <table>
    <tr>
      <td align="center" width="50%">
        <a href="https://github.com/halloffame12/ForgeStack-OS">
          <img src="https://github-readme-stats.vercel.app/api/pin/?username=halloffame12&repo=ForgeStack-OS&theme=tokyonight&hide_border=true&bg_color=0a0e27&title_color=00C4FF&icon_color=B967FF&text_color=ffffff&border_radius=10" alt="ForgeStack OS"/>
        </a>
        <br/>
        <sub><b>🚀 ForgeStack OS - Full-stack SaaS Generator</b></sub>
        <br/>
        <sub><i>Open-source platform for rapid application development</i></sub>
      </td>
      <td align="center" width="50%">
        <a href="https://github.com/halloffame12">
          <img src="https://github-readme-stats.vercel.app/api/pin/?username=halloffame12&repo=halloffame12&theme=tokyonight&hide_border=true&bg_color=0a0e27&title_color=00C4FF&icon_color=B967FF&text_color=ffffff&border_radius=10" alt="Profile README"/>
        </a>
        <br/>
        <sub><b>🎨 3D Animated Profile README</b></sub>
        <br/>
        <sub><i>This stunning profile with SVG animations & depth effects</i></sub>
      </td>
    </tr>
  </table>
</div>

<!-- Currently Learning/Exploring -->
<div align="center">
<br/>

<svg width="90%" height="100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="learningBg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#1a1f3a;stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:#0f1729;stop-opacity:0.8" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" rx="10" fill="url(#learningBg)" stroke="#B967FF" stroke-width="2"/>
  <text x="50%" y="30%" text-anchor="middle" font-family="'Fira Code', monospace" font-size="18" font-weight="bold" fill="#00FFF0">
    📚 Currently Learning & Exploring
  </text>
  <text x="50%" y="55%" text-anchor="middle" font-family="'Courier New', monospace" font-size="14" fill="#ffffff">
    🔬 Advanced NLP & LLMs  •  📱 Flutter 3.0 Features  •  ☁️ Cloud Architecture  •  🤖 Generative AI
  </text>
</svg>

</div>

<!-- 3D Animated Divider -->
<div align="center">
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="divider10" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0a0e27;stop-opacity:0" />
      <stop offset="25%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="75%" style="stop-color:#FF00FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:0" />
    </linearGradient>
  </defs>
  <line x1="0" y1="25" x2="100%" y2="25" stroke="url(#divider10)" stroke-width="2">
    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
  </line>
</svg>
</div>

<!-- Support Section Title -->
<div align="center">
<svg width="450" height="70" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="supportGlow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="'Fira Code', monospace" font-size="28" font-weight="bold" 
        fill="#FFD700" filter="url(#supportGlow)">
    ☕ Support My Work ☕
  </text>
</svg>
</div>

<!-- 3D Support Buttons -->
<p align="center">
  <a href="https://buymeacoffee.com/sumit_chauhan">
    <img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black&labelColor=0a0e27" alt="Buy Me A Coffee"/>
  </a>
  <a href="https://github.com/sponsors/halloffame12">
    <img src="https://img.shields.io/badge/Sponsor-EA4AAA?style=for-the-badge&logo=github-sponsors&logoColor=white&labelColor=0a0e27" alt="Sponsor"/>
  </a>
</p>

<p align="center">
  <i>🤝 I'm always looking for exciting projects and opportunities to collaborate!</i>
  <br/>
  <i>Feel free to reach out if you have an interesting idea or project!</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/💡-Open_Source_Projects-00FFF0?style=for-the-badge&labelColor=0a0e27"/>
  <img src="https://img.shields.io/badge/🚀-Startup_Ideas-FF00FF?style=for-the-badge&labelColor=0a0e27"/>
  <img src="https://img.shields.io/badge/📱-Mobile_App_Dev-00C4FF?style=for-the-badge&labelColor=0a0e27"/>
  <img src="https://img.shields.io/badge/🤖-AI/ML_Projects-B967FF?style=for-the-badge&labelColor=0a0e27"/>
</p>

<!-- 3D Animated Divider -->
<div align="center">
<svg width="100%" height="50" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="divider11" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#0a0e27;stop-opacity:0" />
      <stop offset="30%" style="stop-color:#B967FF;stop-opacity:1" />
      <stop offset="70%" style="stop-color:#00C4FF;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:0" />
    </linearGradient>
  </defs>
  <line x1="0" y1="25" x2="100%" y2="25" stroke="url(#divider11)" stroke-width="2">
    <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
  </line>
</svg>
</div>

<!-- Visitor Counter & Star CTA -->
<div align="center">

<!-- 3D CTA Card -->
<svg width="80%" height="150" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="ctaBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1f3a;stop-opacity:0.9" />
      <stop offset="100%" style="stop-color:#0f1729;stop-opacity:0.9" />
    </linearGradient>
    <filter id="ctaGlow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="100%" height="100%" rx="15" fill="url(#ctaBg)" stroke="url(#divider11)" stroke-width="2" filter="url(#ctaGlow)"/>
  
  <text x="50%" y="35%" text-anchor="middle" font-family="'Fira Code', monospace" font-size="24" font-weight="bold" fill="#00C4FF">
    ⭐ If you like my projects, give them a star! ⭐
  </text>
  
  <text x="50%" y="60%" text-anchor="middle" font-family="'Courier New', monospace" font-size="16" fill="#B967FF">
    Your support means the world to me! 🌌
  </text>
</svg>

<br/>

<!-- Visitor Counter -->
<img src="https://profile-counter.glitch.me/halloffame12/count.svg" alt="Visitor Count"/>

</div>

<!-- Hidden Easter Egg Section -->
<details>
<summary>
  
<!-- Easter Egg Title SVG -->
<div align="center">
<svg width="300" height="60" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="easterGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#FF00FF;stop-opacity:1">
        <animate attributeName="stop-color" values="#FF00FF;#00C4FF;#00FFF0;#FF00FF" dur="3s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" style="stop-color:#00C4FF;stop-opacity:1">
        <animate attributeName="stop-color" values="#00C4FF;#00FFF0;#FF00FF;#00C4FF" dur="3s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
    <filter id="easterGlow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle" 
        font-family="'Fira Code', monospace" font-size="22" font-weight="bold" 
        fill="url(#easterGrad)" filter="url(#easterGlow)">
    🎮 Click for a Secret! 🎮
  </text>
</svg>
</div>

</summary>
<br>

<!-- 3D Secret Box -->
<div align="center">
<svg width="90%" height="450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Secret Box Gradient -->
    <linearGradient id="secretBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1a1f3a;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#0f1729;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1f3a;stop-opacity:1" />
    </linearGradient>
    
    <!-- Animated Border -->
    <linearGradient id="secretBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#00C4FF;stop-opacity:1">
        <animate attributeName="stop-color" values="#00C4FF;#B967FF;#00FFF0;#FF00FF;#00C4FF" dur="5s" repeatCount="indefinite"/>
      </stop>
      <stop offset="100%" style="stop-color:#B967FF;stop-opacity:1">
        <animate attributeName="stop-color" values="#B967FF;#00FFF0;#FF00FF;#00C4FF;#B967FF" dur="5s" repeatCount="indefinite"/>
      </stop>
    </linearGradient>
    
    <filter id="secretGlow">
      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  
  <!-- Box Background -->
  <rect width="100%" height="100%" rx="15" fill="url(#secretBg)" stroke="url(#secretBorder)" stroke-width="3" filter="url(#secretGlow)"/>
  
  <!-- Title -->
  <text x="50%" y="8%" text-anchor="middle" font-family="'Fira Code', monospace" font-size="28" font-weight="bold" fill="#00FFF0">
    🚀 Welcome to the Secret Zone! 🚀
  </text>
  
  <!-- Message Lines -->
  <text x="50%" y="18%" text-anchor="middle" font-family="'Courier New', monospace" font-size="16" fill="#ffffff">
    Thanks for scrolling all the way down here!
  </text>
  <text x="50%" y="24%" text-anchor="middle" font-family="'Courier New', monospace" font-size="16" fill="#ffffff">
    You're clearly someone who pays attention to details.
  </text>
  
  <!-- Joke Section -->
  <text x="50%" y="35%" text-anchor="middle" font-family="'Courier New', monospace" font-size="18" font-weight="bold" fill="#B967FF">
    Here's a coding joke for you:
  </text>
  
  <text x="50%" y="45%" text-anchor="middle" font-family="'Courier New', monospace" font-size="16" fill="#00C4FF">
    Why do programmers prefer dark mode?
  </text>
  <text x="50%" y="52%" text-anchor="middle" font-family="'Courier New', monospace" font-size="16" fill="#00FFF0">
    Because light attracts bugs! 🐛
  </text>
  
  <!-- Quotes -->
  <line x1="15%" y1="60%" x2="85%" y2="60%" stroke="#B967FF" stroke-width="1" opacity="0.5"/>
  
  <text x="50%" y="68%" text-anchor="middle" font-family="'Georgia', serif" font-size="15" font-style="italic" fill="#FFD700">
    "The only way to do great work is to love what you do."
  </text>
  <text x="50%" y="74%" text-anchor="middle" font-family="'Georgia', serif" font-size="13" fill="#B967FF">
    - Steve Jobs
  </text>
  
  <line x1="15%" y1="80%" x2="85%" y2="80%" stroke="#B967FF" stroke-width="1" opacity="0.5"/>
  
  <text x="50%" y="88%" text-anchor="middle" font-family="'Georgia', serif" font-size="15" font-style="italic" fill="#FFD700">
    "Talk is cheap. Show me the code."
  </text>
  <text x="50%" y="94%" text-anchor="middle" font-family="'Georgia', serif" font-size="13" fill="#B967FF">
    - Linus Torvalds
  </text>
</svg>
</div>

<p align="center">
  <img src="https://media.giphy.com/media/WUlplcMpOCEmTGBtBW/giphy.gif" width="100"/>
</p>

</details>

<!-- 3D Footer Wave with Depth -->
<div align="center">
<br/>

<!-- Made with Love Badges -->
<p align="center">
  <img src="https://forthebadge.com/images/badges/built-with-love.svg"/>
  <img src="https://forthebadge.com/images/badges/powered-by-coffee.svg"/>
  <img src="https://forthebadge.com/images/badges/makes-people-smile.svg"/>
</p>

<!-- Final Footer SVG with Wave Animation -->
<svg width="100%" height="200" xmlns="http://www.w3.org/2000/svg" style="display: block;">
  <defs>
    <!-- Wave Gradients -->
    <linearGradient id="wave1Grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#B967FF;stop-opacity:0.8" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="wave2Grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#00C4FF;stop-opacity:0.6" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:1" />
    </linearGradient>
    <linearGradient id="wave3Grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#00FFF0;stop-opacity:0.4" />
      <stop offset="100%" style="stop-color:#0a0e27;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background -->
  <rect width="100%" height="100%" fill="#0a0e27"/>
  
  <!-- Animated Wave 1 (Back Layer) -->
  <path fill="url(#wave1Grad)" opacity="0.7">
    <animate attributeName="d" 
             dur="8s" 
             repeatCount="indefinite"
             values="M0,100 C150,120 350,80 500,100 C650,120 850,80 1000,100 L1000,200 L0,200 Z;
                     M0,100 C150,80 350,120 500,100 C650,80 850,120 1000,100 L1000,200 L0,200 Z;
                     M0,100 C150,120 350,80 500,100 C650,120 850,80 1000,100 L1000,200 L0,200 Z"/>
  </path>
  
  <!-- Animated Wave 2 (Middle Layer) -->
  <path fill="url(#wave2Grad)" opacity="0.5">
    <animate attributeName="d" 
             dur="6s" 
             repeatCount="indefinite"
             values="M0,120 C150,100 350,140 500,120 C650,100 850,140 1000,120 L1000,200 L0,200 Z;
                     M0,120 C150,140 350,100 500,120 C650,140 850,100 1000,120 L1000,200 L0,200 Z;
                     M0,120 C150,100 350,140 500,120 C650,100 850,140 1000,120 L1000,200 L0,200 Z"/>
  </path>
  
  <!-- Animated Wave 3 (Front Layer) -->
  <path fill="url(#wave3Grad)" opacity="0.3">
    <animate attributeName="d" 
             dur="10s" 
             repeatCount="indefinite"
             values="M0,140 C150,160 350,120 500,140 C650,160 850,120 1000,140 L1000,200 L0,200 Z;
                     M0,140 C150,120 350,160 500,140 C650,120 850,160 1000,140 L1000,200 L0,200 Z;
                     M0,140 C150,160 350,120 500,140 C650,160 850,120 1000,140 L1000,200 L0,200 Z"/>
  </path>
  
  <!-- Footer Text -->
  <text x="50%" y="90%" text-anchor="middle" font-family="'Courier New', monospace" font-size="14" fill="#B967FF" opacity="1">
    Made with ❤️ by Sumit Chauhan • Thanks for visiting! 🌌
  </text>
</svg>

</div>

---

<p align="center">
  <sub>
    <i>Emphasizing fake 3D depth using layered SVGs, perspective skew, light/shadow gradients,<br/>and slow parallax motion to simulate a 3D scene without WebGL</i>
  </sub>
</p>
