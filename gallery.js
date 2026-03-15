// ============================================================
// GALLERY IMAGES — just add new entries here to add photos!
// To add a new image:
//   1. Drop your .webp file in the images/ folder
//   2. Name it starting with "gallery-" (e.g. gallery-my-new-treat.webp)
//   3. Add a new line below with the filename, title, description, and section
// Sections: 'party-packages' | 'treats-dozen' | 'seasonal'
// ============================================================
var galleryImages = [
  // === Featured 6 (shown on homepage) — first 6 items in this list ===
  { src: 'images/gallery-white-gold-bow-box.webp',            title: 'White & Gold Strawberries',               desc: 'Elegant white hand dipped strawberries with gold bow decorations',               section: 'treats-dozen' },
  { src: 'images/gallery-pokemon-box.webp',                   title: 'Pokemon',                                 desc: 'Pokeball themed hand dipped strawberry box',                                     section: 'seasonal' },
  { src: 'images/gallery-sweet-16-pink-gold.webp',            title: 'Pink, White & Gold Sweet 16',             desc: 'Pink, white and gold Sweet 16 cakesicles and pretzel party box',                  section: 'party-packages' },
  { src: 'images/gallery-blue-marble-box.webp',               title: 'Blue Marble Strawberries',                desc: 'Stunning blue marble hand dipped strawberries',                                  section: 'treats-dozen' },
  { src: 'images/gallery-race-car-birthday-box.webp',         title: 'Race Car "2" Birthday Box',               desc: 'Blue, black, white and red number 2 race car themed treat box',                  section: 'party-packages' },
  { src: 'images/gallery-pink-white-gold-pretzel-hearts.webp', title: 'Pink, White & Gold Pretzel Box',         desc: 'Pink and white heart pretzels with gold rose accents',                           section: 'treats-dozen' },

  // === Party Packages ===
  // KPOP Demon Hunters Set
  { src: 'images/gallery-kpop-demon-hunters.webp',            title: 'KPOP Demon Hunters Set',                  desc: 'KPOP Demon Hunters themed strawberries and pretzel set',                         section: 'party-packages' },

  // White, Pink & Gold Sweet 16 (continued from featured)
  { src: 'images/gallery-sweet-16-leopard-treat-box.webp',    title: 'Pink, White & Gold Sweet 16 Treat Box',   desc: 'Pink, white and gold Sweet 16 party treat box',                                  section: 'party-packages' },
  { src: 'images/gallery-sweet-16-leopard-oreos.webp',        title: 'Pink Animal Print Sweet 16 Oreos',        desc: 'Leopard print Sweet 16 hand dipped oreos',                                       section: 'party-packages' },

  // Stitch & Angel
  { src: 'images/gallery-stitch-treat-box.webp',              title: 'Stitch & Angel Treat Box',                desc: 'Lilo & Stitch themed treat box in pink and blue',                                section: 'party-packages' },
  { src: 'images/gallery-stitch-strawberries.webp',           title: 'Stitch & Angel Strawberries',             desc: 'Lilo & Stitch themed hand dipped strawberries',                                  section: 'party-packages' },
  { src: 'images/gallery-stitch-pretzel-rods.webp',           title: 'Stitch & Angel Pretzel Rods',             desc: 'Lilo & Stitch themed hand dipped pretzel rods',                                  section: 'party-packages' },
  { src: 'images/gallery-stitch-rice-krispies-pretzels.webp', title: 'Stitch & Angel Rice Krispies',            desc: 'Lilo & Stitch themed rice krispies and pretzels',                                section: 'party-packages' },

  // Blue, Black, Red & White Race Car (continued from featured)
  { src: 'images/gallery-racing-theme-treat-box.webp',        title: 'Race Car Treat Box',                      desc: 'Blue, black, white and red race car themed treat box',                           section: 'party-packages' },

  // Blue & White Winter ONEderland
  { src: 'images/gallery-winter-onederland-treat-box.webp',   title: 'Winter ONEderland Set',                   desc: 'Blue and white snowflake Winter ONEderland first birthday treat box',              section: 'party-packages' },

  // NOTE: Orange and Purple ZURI set — add image as gallery-zuri-set.webp and uncomment:
  // { src: 'images/gallery-zuri-set.webp', title: 'Orange & Purple ZURI Set', desc: 'Orange and purple ZURI themed party treat set', section: 'party-packages' },

  // Rainbow & White STELLA
  { src: 'images/gallery-pastel-rainbow-treat-box.webp',      title: 'Rainbow & White STELLA Set',              desc: 'Personalized pastel rainbow treat box with cakesicles and oreos',                section: 'party-packages' },

  // Lightning McQueen CARS Set
  { src: 'images/gallery-cars-theme-treat-box.webp',          title: 'Lightning McQueen CARS Set',              desc: 'Lightning McQueen Cars themed treat box',                                        section: 'party-packages' },
  { src: 'images/gallery-cars-theme-treat-box-2.webp',        title: 'Lightning McQueen CARS Set — Detail',     desc: 'Lightning McQueen Cars themed treat box detail',                                 section: 'party-packages' },
  { src: 'images/gallery-cars-theme-cake.webp',               title: 'Lightning McQueen CARS Cake',             desc: 'Lightning McQueen Cars themed cake',                                             section: 'party-packages' },

  // NOTE: Orange and White Einstein Moving Company set — add image as gallery-einstein-set.webp and uncomment:
  // { src: 'images/gallery-einstein-set.webp', title: 'Einstein Moving Company Set', desc: 'Orange and white Einstein Moving Company themed party treat set', section: 'party-packages' },

  // === Treats by the Dozen ===
  // Tuxedo Wedding Berries (new image)
  { src: 'images/gallery-tuxedo-wedding-berries.webp',        title: 'Tuxedo Wedding Berries',                  desc: 'Elegant tuxedo and bride themed wedding strawberries',                           section: 'treats-dozen' },

  // Blue Marble (continued from featured)
  { src: 'images/gallery-blue-marble-strawberries.webp',      title: 'Blue Marble Strawberries',                desc: 'Stunning blue marble hand dipped strawberries',                                  section: 'treats-dozen' },
  { src: 'images/gallery-blue-marble-strawberries-2.webp',    title: 'Blue Marble Strawberries — Box',          desc: 'Stunning blue marble hand dipped strawberries in a box',                         section: 'treats-dozen' },

  // Milk & Classic Chocolate
  { src: 'images/gallery-milk-chocolate-strawberries.webp',   title: 'Milk Chocolate Strawberries',             desc: 'Classic milk chocolate hand dipped strawberries',                                section: 'treats-dozen' },
  { src: 'images/gallery-chocolate-strawberries-dozen.webp',  title: 'Chocolate Strawberries Dozen',            desc: 'Full dozen classic hand dipped chocolate strawberries',                          section: 'treats-dozen' },

  // Pink & Gold varieties
  { src: 'images/gallery-pink-gold-birthday-strawberries.webp', title: 'Pink & Gold Strawberries',              desc: 'Pink and gold birthday hand dipped strawberries',                                section: 'treats-dozen' },

  // Classic strawberries
  { src: 'images/gallery-pink-chocolate-strawberries.webp',   title: 'Pink Chocolate Strawberries',             desc: 'Beautiful pink hand dipped strawberries with gold shimmer',                      section: 'treats-dozen' },
  { src: 'images/gallery-pink-chocolate-drizzle-strawberries.webp', title: 'Pink Chocolate Drizzle Strawberries', desc: 'Pink hand dipped strawberries with drizzle accents',                       section: 'treats-dozen' },
  { src: 'images/gallery-white-pink-rose-strawberries.webp',  title: 'White & Pink Rose Strawberries',          desc: 'Delicate white and pink rose-themed hand dipped strawberries',                   section: 'treats-dozen' },
  { src: 'images/gallery-simple-pink-strawberries.webp',      title: 'Simple Pink Strawberries',                desc: 'Elegant light pink hand dipped strawberries',                                    section: 'treats-dozen' },
  { src: 'images/gallery-purple-peach-birthday-strawberries.webp', title: 'Purple & Peach Birthday Strawberries', desc: 'Purple and peach birthday strawberries with number toppers',                section: 'treats-dozen' },
  { src: 'images/gallery-corporate-branded-treats.webp',      title: 'Corporate Branded Treats',                desc: 'Custom branded hand dipped treats for corporate events',                          section: 'treats-dozen' },
  { src: 'images/gallery-wedding-bride-groom-strawberries-3.webp', title: 'Wedding Strawberries',               desc: 'Elegant bride and groom themed wedding strawberries',                            section: 'treats-dozen' },
  { src: 'images/gallery-wedding-strawberries-closeup.webp',  title: 'Wedding Strawberries — Closeup',          desc: 'Closeup of elegantly decorated wedding strawberries',                            section: 'treats-dozen' },

  // Pretzels
  { src: 'images/gallery-pink-gold-pretzel-rods.webp',        title: 'Pink & Gold Pretzel Rods',                desc: 'Pink and gold hand dipped pretzel rods with bow accents',                        section: 'treats-dozen' },
  { src: 'images/gallery-chocolate-drizzle-pretzels.webp',    title: 'Chocolate Drizzle Pretzels',              desc: 'Classic hand dipped drizzle pretzel rods',                                       section: 'treats-dozen' },
  { src: 'images/gallery-purple-peach-birthday-pretzels.webp', title: 'Purple & Peach Birthday Pretzels',       desc: 'Purple and peach birthday pretzel rods with number toppers',                    section: 'treats-dozen' },

  // Cakesicles
  { src: 'images/gallery-pink-gold-cakesicles.webp',          title: 'Pink & Gold Cakesicles',                  desc: 'Pink and gold cakesicles with pretzel rods',                                     section: 'treats-dozen' },
  { src: 'images/gallery-pastel-rainbow-cakesicles.webp',     title: 'Pastel Rainbow Cakesicles',               desc: 'Pastel rainbow cakesicles and oreos with gold frame accents',                    section: 'treats-dozen' },

  // Oreos
  { src: 'images/gallery-pink-zebra-oreos.webp',              title: 'Pink Zebra Oreos',                        desc: 'Pink zebra print hand dipped oreos with pretzel rods',                           section: 'treats-dozen' },

  // Other treat boxes
  { src: 'images/gallery-pink-rose-treat-box.webp',           title: 'Pink Rose Treat Box',                     desc: 'Rose-themed treat box with rice krispies, cakesicles, and pretzels',              section: 'treats-dozen' },
  { src: 'images/gallery-pink-ribbon-gift-box.webp',          title: 'Pink Ribbon Gift Box',                    desc: 'Elegant pink ribbon gift box with hand dipped treats',                           section: 'treats-dozen' },

  // === Seasonal Treats ===
  // Easter (first — next upcoming holiday)
  { src: 'images/gallery-easter-chick-strawberries.webp',     title: 'Easter Duck Strawberries',                desc: 'Adorable Easter chick themed hand dipped strawberries',                          section: 'seasonal' },

  // Pokemon (continued from featured)
  { src: 'images/gallery-pokemon-valentines-box.webp',        title: 'Pokemon Valentine\'s Box',                desc: 'Pokeball strawberries with "I Choose You" Valentine\'s theme',                   section: 'seasonal' },
  { src: 'images/gallery-pokemon-valentines-strawberries.webp', title: 'Pokemon Strawberries',                  desc: 'Pokeball themed hand dipped strawberries',                                       section: 'seasonal' },

  // Valentine's Day
  { src: 'images/gallery-valentines-love-marble-strawberries.webp', title: "Valentine's Love Marble Strawberries", desc: 'Pink marble strawberries with love-themed decorations',                   section: 'seasonal' },
  { src: 'images/gallery-valentines-red-pink-strawberries.webp', title: "Valentine's Red & Pink Strawberries",  desc: "Red and pink hand dipped strawberries with Valentine's decorations",             section: 'seasonal' },
  { src: 'images/gallery-valentines-red-white-heart-strawberries.webp', title: "Valentine's Red & White Hearts", desc: "Red and white heart-decorated Valentine's strawberries",                      section: 'seasonal' },
  { src: 'images/gallery-valentines-heart-chocolate-strawberries.webp', title: "Valentine's Heart Strawberries", desc: "Heart-decorated Valentine's chocolate strawberries",                           section: 'seasonal' },
  { src: 'images/gallery-valentines-red-pink-swirl-strawberries.webp', title: "Valentine's Red & Pink Swirl",   desc: "Red and pink swirl Valentine's strawberries",                                    section: 'seasonal' },
  { src: 'images/gallery-valentines-mixed-strawberries.webp',  title: "Valentine's Mixed Strawberries",         desc: "Assorted Valentine's strawberries with bow accents",                             section: 'seasonal' },
  { src: 'images/gallery-valentines-cakesicles.webp',          title: "Valentine's Cakesicles",                 desc: "XOXO and heart-themed cakesicles for Valentine's Day",                           section: 'seasonal' },
  { src: 'images/gallery-valentines-cakesicles-2.webp',        title: "Valentine's Cakesicles — Set",           desc: "Valentine's cakesicle set",                                                      section: 'seasonal' },
  { src: 'images/gallery-valentines-cakesicles-heart-closeup.webp', title: "Valentine's Cakesicles — Closeup",  desc: "Heart-themed Valentine's cakesicles closeup",                                    section: 'seasonal' },
  { src: 'images/gallery-valentines-cakesicles-pink-sprinkles.webp', title: "Valentine's Cakesicles — Sprinkles", desc: "Valentine's cakesicles with pink sprinkles",                                 section: 'seasonal' },
  { src: 'images/gallery-valentines-cakesicles-sixpack.webp',  title: "Valentine's Cakesicles — Six Pack",      desc: "Six pack of Valentine's themed cakesicles",                                      section: 'seasonal' },
  { src: 'images/gallery-valentines-cakesicles-tictactoe.webp', title: "Valentine's Tic-Tac-Toe Cakesicles",    desc: "Valentine's cakesicles with tic-tac-toe heart designs",                          section: 'seasonal' },
  { src: 'images/gallery-valentines-cakesicles-xoxo.webp',     title: "Valentine's XOXO Cakesicles",            desc: "XOXO themed Valentine's cakesicles",                                             section: 'seasonal' },
  { src: 'images/gallery-valentines-spiderman-cakesicles.webp', title: "Valentine's Spiderman Cakesicles",      desc: "Pink Spiderman-themed Valentine's cakesicles with web hearts",                   section: 'seasonal' },
  { src: 'images/gallery-valentines-heart-tin-pretzels.webp',  title: "Valentine's Heart Tin with Pretzels",    desc: 'Pink strawberries and hand dipped pretzels in a heart tin',                      section: 'seasonal' },
  { src: 'images/gallery-valentines-heart-tin.webp',           title: "Valentine's Heart Tin",                  desc: "Valentine's strawberries in a heart tin",                                        section: 'seasonal' },

  // Christmas
  { src: 'images/gallery-christmas-treat-box.webp',            title: 'Christmas Treat Box',                    desc: 'Christmas treat box with trees, mittens, gingerbread, and Santa suits',          section: 'seasonal' },
  { src: 'images/gallery-christmas-nutcracker-treat-box.webp', title: 'Christmas Nutcracker Treat Box',         desc: 'Nutcracker themed Christmas treat box with snowflakes and Santa strawberries',    section: 'seasonal' },
  { src: 'images/gallery-christmas-joy-treats-closeup.webp',   title: 'Christmas JOY Treats',                   desc: 'Christmas JOY themed treat sampler close-up',                                    section: 'seasonal' },
  { src: 'images/gallery-christmas-joy-treat-boxes-bulk.webp', title: 'Christmas JOY Treat Boxes',              desc: 'Christmas JOY themed treat boxes in bulk',                                       section: 'seasonal' },
  { src: 'images/gallery-christmas-gift-box.webp',             title: 'Christmas Gift Box',                     desc: 'Festive Christmas gift box with hand dipped treats',                             section: 'seasonal' },
  { src: 'images/gallery-winter-snowflake-strawberries.webp',  title: 'Winter Snowflake Strawberries',          desc: 'Blue and white snowflake decorated strawberries',                                section: 'seasonal' },

  // Thanksgiving / Fall
  { src: 'images/gallery-fall-treat-box.webp',                 title: 'Fall Treat Box',                         desc: 'Autumn treat box with pumpkin cake pops, daisies, and pretzel rods',              section: 'seasonal' },
  { src: 'images/gallery-fall-treat-box-2.webp',               title: 'Fall Treat Box — Detail',                desc: 'Autumn themed treat box detail',                                                 section: 'seasonal' },

  // Halloween
  { src: 'images/gallery-halloween-hot-cocoa-bombs.webp',      title: 'Halloween Hot Cocoa Bombs',              desc: 'Pink Halloween hot cocoa bombs with pumpkin, BOO, mummy, and spider designs',    section: 'seasonal' },
  { src: 'images/gallery-dia-de-muertos-strawberries.webp',    title: 'Dia de Muertos Strawberries',            desc: 'Sugar skull themed strawberries for Day of the Dead celebrations',               section: 'seasonal' },
  { src: 'images/gallery-dia-de-muertos-strawberries-2.webp', title: 'Dia de Muertos Strawberries — Set',      desc: 'Sugar skull themed strawberry set for Day of the Dead',                          section: 'seasonal' },
];

// ============================================================
// GALLERY UI — only runs when galleryGrid element is present (index.html)
// ============================================================
if (document.getElementById('galleryGrid')) {

var galleryGrid = document.getElementById('galleryGrid');

// Render the first 6 images as a static grid
galleryImages.slice(0, 6).forEach(function(item, i) {
  var card = document.createElement('div');
  card.className = 'treat-card';

  var imgEl = document.createElement('img');
  imgEl.src = item.src;
  imgEl.alt = item.title;
  imgEl.loading = 'lazy';

  var wrapper = document.createElement('div');
  wrapper.className = 'img-wrapper';
  wrapper.appendChild(imgEl);

  var overlay = document.createElement('div');
  overlay.className = 'card-overlay';
  overlay.innerHTML = '<h3>' + item.title + '</h3><p>' + item.desc + '</p>';

  card.appendChild(wrapper);
  card.appendChild(overlay);
  card.dataset.index = i;
  card.addEventListener('click', function() {
    openLightbox(parseInt(this.dataset.index));
  });
  galleryGrid.appendChild(card);
});

requestAnimationFrame(function() {
  galleryGrid.classList.add('loaded');
});

} // end galleryGrid guard
