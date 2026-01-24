# Apartments in Havana - Modern Website

A modern, responsive remake of the apartments-in-havana.com website with tropical Cuban theme and multi-language support.

## Features

✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
✅ **Multi-Language Support** - English, German, Spanish, and Russian translations
✅ **Photo Gallery** - Lightbox image viewing for apartment photos
✅ **Contact Form** - Easy inquiry form with email integration
✅ **Tropical Theme** - Warm colors, palm leaf patterns, Caribbean feel
✅ **Fast Loading** - Pure HTML/CSS/JS - no heavy frameworks needed
✅ **SEO Optimized** - Clean HTML structure and meta tags
✅ **Smooth Animations** - Fade-in effects and smooth scrolling

## File Structure

```
/
├── index.html          # Main HTML file
├── css/
│   └── style.css      # All styles and responsive design
├── js/
│   └── app.js         # JavaScript for interactivity
└── README.md          # This file
```

## Languages Supported

- 🇬🇧 English (EN)
- 🇩🇪 German (DE)
- 🇪🇸 Spanish (ES)
- 🇷🇺 Russian (RU)

## How to Use

### Option 1: Direct File Opening
Simply open `index.html` in any web browser.

### Option 2: Local Server (Recommended)
For the best experience, use a local server:

**Using Python 3:**
```bash
cd /path/to/agent3
python -m http.server 8000
```
Then visit: http://localhost:8000

**Using Node.js:**
```bash
cd /path/to/agent3
npx serve
```

**Using VS Code Live Server:**
1. Install Live Server extension
2. Right-click on index.html
3. Select "Open with Live Server"

### Option 3: Deploy to Web Hosting
Upload all files to any web hosting provider:
- Netlify (drag and drop folder)
- Vercel
- GitHub Pages
- Traditional web host (FTP/SFTP)

## Apartment Information

### Centro Havana - Large Colonial
- **Location:** Centro Havana, 130m from Malecón
- **Size:** 180m²
- **Style:** Colonial
- **Features:** High ceilings, up to 8 guests, near Malecón, air conditioning
- **Highlight:** Wonderful high ceilings, just 130 meters from famous Malecón waterfront promenade
- **Pricing:** €85/day (entire) or €22/day (per room)

### Centro Havana - Majestic
- **Location:** Centro Havana, 140m from Malecón
- **Size:** Spacious rooftop terrace
- **Style:** Colonial
- **Features:** Up to 7 guests, rooftop terrace, near Malecón and Old Havana, air conditioning
- **Highlight:** Magnificent sunsets from rooftop terrace, 140 meters from Malecón
- **Pricing:** From €75/day

### Miramar - 1 Room
- **Location:** Embassy District, 250m from Sea
- **Size:** 45m²
- **Style:** Modern
- **Features:** 2 guests, 1 bathroom, air conditioning, rooftop access via spiral staircase
- **Highlight:** Flat roof with ocean views, 250 meters from the sea
- **Pricing:** From €30/day

## Pricing Overview

| Duration | Centro - Large | Centro - Majestic | Centro (Room) | Miramar 1-Room |
|-----------|----------------|------------------|----------------|-----------------|
| 1 Day     | €85            | €75              | €22            | €30             |
| 1 Week    | €560           | €490             | €140           | €160            |
| 2 Weeks   | €950           | €840             | €238           | €280            |
| 1 Month   | €1,880         | €1,640           | €470           | €500            |
| 3 Months  | €1,800         | €1,580           | €450           | €480            |
| 6 Months  | €1,700         | €1,520           | -              | €430            |
| 12 Months | €1,600         | €1,440           | -              | €430            |

## Additional Services

📚 **Spanish Lessons** - Individual lessons with experienced teachers
💃 **Salsa Lessons** - Learn to dance with professional instructors
🏙️ **City Tours** - Guided tours of Havana and beaches
🍽️ **Food Recommendations** - Best places to eat and drink
💆️ **Massages** - Corporal massages and facial treatments
🧺 **Laundry Service** - Available at reasonable prices

## Contact Information

**Email:** christoclemens@web.de
**Phone:** +49 157 73254214
**Address:** Petersstraße 1, 60313 Frankfurt, Germany

## Browser Compatibility

✅ Chrome (latest)
✅ Firefox (latest)
✅ Safari (latest)
✅ Edge (latest)
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Customization

### Changing Colors
Edit CSS variables in `css/style.css`:
```css
:root {
  --primary-color: #E86A17;    /* Sunset orange */
  --secondary-color: #2E8B57;  /* Tropical green */
  --accent-color: #FFD700;       /* Golden yellow */
}
```

### Adding Images
Replace image URLs in `index.html` with your own:
- Apartment images (apartment__image backgrounds)
- Gallery images (gallery section)
- Hero background (hero section)

### Modifying Translations
Add or modify translations in `js/app.js` in the `translations` object:
```javascript
const translations = {
  en: { /* English translations */ },
  de: { /* German translations */ },
  es: { /* Spanish translations */ },
  ru: { /* Russian translations */ }
};
```

## Features Coming From Original Site

✅ Multi-language support (4 languages)
✅ All apartment information preserved
✅ All pricing information included
✅ All services listed
✅ Contact information preserved
✅ Photo gallery functionality

## Improvements Over Original

🚀 **Modern Design** - Updated from 2000s style to 2024
🚀 **Mobile Responsive** - Works on all devices (original was not)
🚀 **Faster Loading** - Optimized code and images
🚀 **Better UX** - Smooth scrolling, animations, interactive elements
🚀 **SEO Friendly** - Clean HTML structure
🚀 **Easier Maintenance** - Organized code structure
🚀 **Accessibility** - Better keyboard navigation and screen reader support

## License

This is a modern remake created for the owners of apartments-in-havana.com

## Support

For questions or issues, contact: christoclemens@web.de
