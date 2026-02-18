// ============================================================
// GALLERY IMAGES — just add new entries here to add photos!
// To add a new image:
//   1. Drop your .webp file in the images/ folder
//   2. Name it starting with "gallery-" (e.g. gallery-my-new-treat.webp)
//   3. Add a new line below with the filename, title, and description
// ============================================================
var galleryImages = [
  // Strawberries
  { src: 'images/gallery-white-chocolate-strawberries.webp', title: 'White Chocolate Strawberries', desc: 'Elegant white chocolate-dipped strawberries with gold bow accents' },
  { src: 'images/gallery-pink-chocolate-strawberries.webp', title: 'Pink Chocolate Strawberries', desc: 'Beautiful pink chocolate-dipped strawberries with gold shimmer' },
  { src: 'images/gallery-classic-dipped-strawberries.webp', title: 'Classic Dipped Strawberries', desc: 'Classic chocolate and white chocolate dipped strawberries' },
  { src: 'images/gallery-pink-gold-birthday-strawberries.webp', title: 'Pink & Gold Birthday Strawberries', desc: 'Pink and gold birthday strawberries with bow accents and number toppers' },
  { src: 'images/gallery-wedding-bride-groom-strawberries.webp', title: 'Wedding Bride & Groom Strawberries', desc: 'Elegant tuxedo and wedding dress chocolate-dipped strawberries' },
  { src: 'images/gallery-pink-chocolate-drizzle-strawberries.webp', title: 'Pink Chocolate Drizzle Strawberries', desc: 'Pink chocolate-dipped strawberries with drizzle accents' },
  { src: 'images/gallery-classic-chocolate-strawberries.webp', title: 'Classic Chocolate Strawberries', desc: 'Timeless chocolate and white chocolate dipped strawberries' },
  { src: 'images/gallery-pink-chocolate-mixed-strawberries.webp', title: 'Pink Chocolate Mixed Strawberries', desc: 'Assorted pink and chocolate dipped strawberries' },
  { src: 'images/gallery-white-pink-rose-strawberries.webp', title: 'White & Pink Rose Strawberries', desc: 'Delicate white and pink rose-themed chocolate strawberries' },
  { src: 'images/gallery-simple-pink-strawberries.webp', title: 'Simple Pink Strawberries', desc: 'Elegant light pink chocolate-dipped strawberries' },
  { src: 'images/gallery-blue-marble-strawberries.webp', title: 'Blue Marble Strawberries', desc: 'Stunning blue marble chocolate-dipped strawberries' },
  { src: 'images/gallery-pink-shimmer-gold-strawberries.webp', title: 'Pink Shimmer & Gold Strawberries', desc: 'Pink shimmer strawberries with gold fleck accents' },
  { src: 'images/gallery-white-gold-bow-strawberries.webp', title: 'White & Gold Bow Strawberries', desc: 'White chocolate strawberries with gold bow decorations' },
  { src: 'images/gallery-chocolate-white-drizzle-strawberries.webp', title: 'Chocolate & White Drizzle', desc: 'Rich chocolate strawberries with white chocolate drizzle' },
  { src: 'images/gallery-purple-peach-birthday-strawberries.webp', title: 'Purple & Peach Birthday Strawberries', desc: 'Purple and peach birthday strawberries with number toppers' },
  { src: 'images/gallery-dia-de-muertos-strawberries.webp', title: 'Dia de Muertos Strawberries', desc: 'Sugar skull themed strawberries for Day of the Dead celebrations' },
  { src: 'images/gallery-easter-chick-strawberries.webp', title: 'Easter Chick Strawberries', desc: 'Adorable Easter chick-themed chocolate strawberries' },
  { src: 'images/gallery-stitch-strawberries.webp', title: 'Stitch Strawberries', desc: 'Lilo & Stitch themed chocolate-dipped strawberries' },

  // Valentine's
  { src: 'images/gallery-valentines-strawberries.webp', title: "Valentine's Strawberries", desc: 'Chocolate and pink strawberries beautifully decorated with hearts' },
  { src: 'images/gallery-valentines-heart-chocolate-strawberries.webp', title: "Valentine's Heart Strawberries", desc: 'Heart-decorated chocolate strawberries for Valentine\'s Day' },
  { src: 'images/gallery-valentines-red-pink-strawberries.webp', title: "Valentine's Red & Pink Strawberries", desc: 'Red and pink chocolate strawberries with Valentine\'s decorations' },
  { src: 'images/gallery-valentines-red-pink-swirl-strawberries.webp', title: "Valentine's Swirl Strawberries", desc: 'Red and pink swirl-decorated Valentine\'s strawberries' },
  { src: 'images/gallery-valentines-red-white-heart-strawberries.webp', title: "Valentine's Red & White Hearts", desc: 'Red and white heart-decorated Valentine\'s strawberries' },
  { src: 'images/gallery-valentines-heart-strawberries.webp', title: "Valentine's Heart Collection", desc: 'Assorted heart-themed Valentine\'s strawberries' },
  { src: 'images/gallery-valentines-love-marble-strawberries.webp', title: "Valentine's Love Marble Strawberries", desc: 'Pink marble strawberries with love-themed decorations' },
  { src: 'images/gallery-valentines-mixed-strawberries.webp', title: "Valentine's Mixed Strawberries", desc: 'Assorted Valentine\'s strawberries with bow accents' },
  { src: 'images/gallery-valentines-cakesicles.webp', title: "Valentine's Cakesicles", desc: 'XOXO and heart-themed cakesicles for Valentine\'s Day' },
  { src: 'images/gallery-valentines-cakesicles-tictactoe.webp', title: "Valentine's Tic-Tac-Toe Cakesicles", desc: 'Valentine\'s cakesicles with tic-tac-toe heart designs' },
  { src: 'images/gallery-valentines-spiderman-cakesicles.webp', title: "Valentine's Spiderman Cakesicles", desc: 'Pink Spiderman-themed Valentine\'s cakesicles with web hearts' },
  { src: 'images/gallery-valentines-heart-tin.webp', title: "Valentine's Heart Tin", desc: 'Heart-shaped tin filled with strawberries and pretzels' },
  { src: 'images/gallery-valentines-heart-tin-pretzels.webp', title: "Valentine's Heart Tin with Pretzels", desc: 'Pink strawberries and chocolate pretzels in a heart tin' },
  { src: 'images/gallery-valentines-heart-tin-ribbon.webp', title: "Valentine's Heart Tin Gift", desc: 'Red-striped strawberries in a heart tin with Valentine\'s ribbon' },
  { src: 'images/gallery-valentines-strawberry-tin.webp', title: "Valentine's Strawberry Tin", desc: 'Beautiful Valentine\'s Day strawberry gift tin' },
  { src: 'images/gallery-pokemon-valentines-box.webp', title: "Pokemon Valentine's Box", desc: 'Pokeball strawberries with \"I Choose You\" Valentine\'s theme' },

  // Treat Boxes & Party Boxes
  { src: 'images/gallery-themed-treat-box.webp', title: 'Themed Treat Boxes', desc: 'Themed strawberry boxes with cakesicles for any fandom or occasion' },
  { src: 'images/gallery-pink-gold-party-box.webp', title: 'Pink & Gold Party Box', desc: 'Pink and gold birthday party treat box with cakesicles and oreos' },
  { src: 'images/gallery-pink-gold-birthday-treat-box.webp', title: 'Pink & Gold Birthday Treat Box', desc: 'Birthday treat box with cakesicles, cake pops, and oreos' },
  { src: 'images/gallery-pink-ribbon-gift-box.webp', title: 'Pink Ribbon Gift Box', desc: 'Pink ribbon gift box with strawberries and chocolate treats' },
  { src: 'images/gallery-pink-rose-treat-box.webp', title: 'Pink Rose Treat Box', desc: 'Rose-themed treat box with rice krispies, cakesicles, and pretzels' },
  { src: 'images/gallery-stitch-treat-box.webp', title: 'Stitch Treat Box', desc: 'Lilo & Stitch themed treat box in pink and blue' },
  { src: 'images/gallery-sweet-16-leopard-treat-box.webp', title: 'Sweet 16 Leopard Treat Box', desc: 'Leopard print Sweet 16 party treat box' },
  { src: 'images/gallery-fall-treat-box.webp', title: 'Fall Treat Box', desc: 'Autumn treat box with pumpkin cake pops, daisies, and pretzel rods' },
  { src: 'images/gallery-pastel-rainbow-treat-box.webp', title: 'Pastel Rainbow Treat Box', desc: 'Personalized pastel rainbow treat box with cakesicles and oreos' },
  { src: 'images/gallery-racing-theme-treat-box.webp', title: 'Racing Theme Treat Box', desc: 'Checkered flag racing themed treat box with number toppers' },
  { src: 'images/gallery-cars-theme-treat-box.webp', title: 'Cars Theme Treat Box', desc: 'Lightning McQueen Cars themed treat box' },
  { src: 'images/gallery-winter-onederland-treat-box.webp', title: 'Winter ONEderland Treat Box', desc: 'Blue snowflake Winter ONEderland first birthday treat box' },
  { src: 'images/gallery-corporate-branded-treats.webp', title: 'Corporate Branded Treats', desc: 'Custom branded corporate treat boxes for events and promotions' },

  // Holiday & Seasonal
  { src: 'images/gallery-christmas-gift-box.webp', title: 'Christmas Gift Box', desc: 'Christmas corporate gift box with ribbon' },
  { src: 'images/gallery-christmas-treat-box.webp', title: 'Christmas Treat Box', desc: 'Christmas treat box with trees, mittens, gingerbread, and Santa suits' },
  { src: 'images/gallery-christmas-nutcracker-treat-box.webp', title: 'Christmas Nutcracker Treat Box', desc: 'Nutcracker themed Christmas treat box with snowflakes and Santa strawberries' },
  { src: 'images/gallery-christmas-joy-treats-closeup.webp', title: 'Christmas JOY Treats', desc: 'Christmas JOY themed treat sampler close-up' },
  { src: 'images/gallery-winter-snowflake-strawberries.webp', title: 'Winter Snowflake Strawberries', desc: 'Blue and white snowflake decorated strawberries' },
  { src: 'images/gallery-halloween-oreos.webp', title: 'Halloween Oreos', desc: 'Spooky Halloween themed chocolate covered oreos' },
  { src: 'images/gallery-halloween-hot-cocoa-bombs.webp', title: 'Halloween Hot Cocoa Bombs', desc: 'Pink Halloween hot cocoa bombs with pumpkin, BOO, mummy, and spider designs' },

  // Pretzels, Oreos & Other Treats
  { src: 'images/gallery-pink-gold-pretzel-rods.webp', title: 'Pink & Gold Pretzel Rods', desc: 'Pink and gold chocolate pretzel rods with bow accents' },
  { src: 'images/gallery-pink-white-chocolate-pretzels.webp', title: 'Pink & White Chocolate Pretzels', desc: 'Pink and white rose-themed chocolate pretzels with gold leaf' },
  { src: 'images/gallery-chocolate-drizzle-pretzels.webp', title: 'Chocolate Drizzle Pretzels', desc: 'Classic chocolate drizzle pretzel rods' },
  { src: 'images/gallery-sweet-16-leopard-oreos.webp', title: 'Sweet 16 Leopard Oreos', desc: 'Leopard print Sweet 16 chocolate covered oreos' },
  { src: 'images/gallery-pink-zebra-oreos.webp', title: 'Pink Zebra Oreos', desc: 'Pink zebra print chocolate covered oreos with pretzel rods' },
  { src: 'images/gallery-pink-gold-cakesicles.webp', title: 'Pink & Gold Cakesicles', desc: 'Pink and gold cakesicles with pretzel rods' },
  { src: 'images/gallery-pastel-rainbow-cakesicles.webp', title: 'Pastel Rainbow Cakesicles', desc: 'Pastel rainbow cakesicles and oreos with gold frame accents' },
  { src: 'images/gallery-stitch-pretzel-rods.webp', title: 'Stitch Pretzel Rods', desc: 'Lilo & Stitch themed chocolate pretzel rods' },
  { src: 'images/gallery-purple-peach-birthday-pretzels.webp', title: 'Purple & Peach Birthday Pretzels', desc: 'Purple and peach birthday pretzel rods with number toppers' },

  // Cakes
  { src: 'images/gallery-custom-theme-cake.webp', title: 'Custom Theme Cakes', desc: 'Custom-themed cakes for birthdays, parties, and special celebrations' },
  { src: 'images/gallery-cars-theme-cake.webp', title: 'Cars Theme Cake', desc: 'Lightning McQueen and Mater Cars themed birthday cake' },
];
