import { chromium } from "playwright";

const BASE = process.env.BASE || "http://localhost:3100";
const SHOTS = process.env.SHOTS;
const problems = [];
const log = (m) => console.log(m);

const browser = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });

async function newPage(ctx) {
  const page = await ctx.newPage();
  page.on("console", (msg) => {
    if (msg.type() === "error") problems.push(`console: ${msg.text().slice(0, 4000)}`);
  });
  page.on("pageerror", (err) => problems.push(`pageerror @ ${page.url()}: ${String(err.stack || err).slice(0, 4000)}`));
  return page;
}

/* ---------------------------------------------------------------- */
/* Desktop: full purchase journey                                    */
/* ---------------------------------------------------------------- */
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await newPage(desktop);

log("→ home");
await page.goto(BASE, { waitUntil: "networkidle" });
await page.screenshot({ path: `${SHOTS}/01-home.png`, fullPage: false });
await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await page.waitForTimeout(1200);
await page.screenshot({ path: `${SHOTS}/02-home-footer.png` });

log("→ shop + filter");
await page.goto(`${BASE}/shop`, { waitUntil: "networkidle" });
const before = await page.locator("article").count();
await page.getByRole("button", { name: "Charcoal", exact: true }).first().click();
await page.waitForTimeout(500);
const after = await page.locator("article").count();
log(`   products ${before} → ${after} after colour filter`);
if (after >= before) problems.push("colour filter did not narrow the grid");
await page.screenshot({ path: `${SHOTS}/03-shop-filtered.png` });

log("→ sort");
await page.selectOption("#sort", "price-desc");
await page.waitForTimeout(400);
const firstSorted = await page.locator("article h3").first().innerText();
log(`   most expensive first: ${firstSorted}`);

log("→ product");
await page.goto(`${BASE}/product/atelier-linen-shirt`, { waitUntil: "networkidle" });
await page.screenshot({ path: `${SHOTS}/04-product.png` });

// Add without a size — should be blocked.
await page.getByRole("button", { name: /Add to bag/ }).click();
await page.waitForTimeout(300);
const guard = await page.getByRole("alert").count();
if (guard === 0) problems.push("size guard did not fire");
else log("   size guard fired");

await page.getByRole("button", { name: "M", exact: true }).click();
await page.getByRole("button", { name: "Sand", exact: true }).click();
await page.getByRole("button", { name: /Add to bag/ }).click();
await page.waitForTimeout(900);
const drawer = await page.getByRole("dialog", { name: /Shopping bag/ }).isVisible();
if (!drawer) problems.push("bag drawer did not open on add");
else log("   drawer opened");
await page.screenshot({ path: `${SHOTS}/05-bag-drawer.png` });

log("→ size guide");
await page.keyboard.press("Escape");
await page.waitForTimeout(500);
await page.getByRole("button", { name: /Size guide/ }).click();
await page.waitForTimeout(700);
await page.screenshot({ path: `${SHOTS}/06-size-guide.png` });
await page.keyboard.press("Escape");
await page.waitForTimeout(400);

log("→ second product + favourite");
await page.goto(`${BASE}/product/north-overshirt-heavy-twill`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "L", exact: true }).click();
await page.getByRole("button", { name: /Add to bag/ }).click();
await page.waitForTimeout(700);
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
await page.getByRole("button", { name: /Save to favourites/ }).click();
await page.waitForTimeout(300);

log("→ favourites page");
await page.goto(`${BASE}/favorites`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const favCount = await page.locator("article").count();
log(`   favourites: ${favCount}`);
if (favCount < 1) problems.push("favourite did not persist to /favorites");

log("→ bag page: coupon + CEP");
await page.goto(`${BASE}/bag`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.fill("#coupon-input", "NORTH10");
await page.getByRole("button", { name: "Apply", exact: true }).click();
await page.waitForTimeout(500);
const couponApplied = await page.getByText(/NORTH10/).count();
if (couponApplied === 0) problems.push("coupon did not apply");
else log("   coupon applied");

await page.fill("#cep-input", "60175055");
await page.getByRole("button", { name: "Calculate" }).click();
await page.waitForTimeout(600);
const options = await page.getByRole("button", { name: /Standard|Express|Store Pickup/ }).count();
log(`   shipping options: ${options}`);
if (options < 3) problems.push("shipping quote did not return three options");
await page.screenshot({ path: `${SHOTS}/07-bag-page.png`, fullPage: true });

log("→ bad coupon + bad CEP");
await page.goto(`${BASE}/bag`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
await page.fill("#cep-input", "123");
await page.getByRole("button", { name: "Calculate" }).click();
await page.waitForTimeout(300);
const cepError = await page.getByText(/Enter a CEP as/).count();
if (cepError === 0) problems.push("invalid CEP was accepted");
else log("   invalid CEP rejected");

log("→ checkout");
await page.goto(`${BASE}/checkout`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
await page.getByRole("button", { name: /Continue to delivery/ }).click();
await page.waitForTimeout(400);
const contactErrors = await page.getByRole("alert").count();
if (contactErrors === 0) problems.push("contact validation did not fire");
else log(`   contact validation fired (${contactErrors} errors)`);

await page.fill("#email", "gabriel@example.com");
await page.fill("#firstName", "Gabriel");
await page.fill("#lastName", "Tavares");
await page.fill("#phone", "85997823927");
await page.getByRole("button", { name: /Continue to delivery/ }).click();
await page.waitForTimeout(700);

await page.fill("#cep", "60175055");
await page.waitForTimeout(300);
await page.fill("#number", "1420");
await page.getByRole("button", { name: /Continue to shipping/ }).click();
await page.waitForTimeout(700);

await page.getByRole("button", { name: /Continue to payment/ }).click();
await page.waitForTimeout(300);
const shipGuard = await page.getByText(/Choose a delivery method/).count();
if (shipGuard === 0) problems.push("shipping-method guard did not fire");
else log("   shipping guard fired");

await page.getByRole("button", { name: /Express/ }).click();
await page.waitForTimeout(300);
await page.getByRole("button", { name: /Continue to payment/ }).click();
await page.waitForTimeout(700);
await page.screenshot({ path: `${SHOTS}/08-checkout-payment.png`, fullPage: true });

log("→ demo card");
await page.getByRole("button", { name: /Use demo card/ }).click();
await page.waitForTimeout(400);
const cardValue = await page.inputValue("#cardNumber");
log(`   card prefilled: ${cardValue}`);
if (!cardValue.includes("4000")) problems.push("demo card did not prefill");

await page.getByRole("button", { name: /Place demo order/ }).click();
await page.waitForURL(/\/order\/N85/, { timeout: 15000 });
const orderUrl = page.url();
log(`   → ${orderUrl}`);
await page.waitForTimeout(900);
await page.screenshot({ path: `${SHOTS}/09-order.png`, fullPage: true });

log("→ tracking");
await page.getByRole("button", { name: /Track demo order/ }).click();
await page.waitForTimeout(9000);
const delivered = await page.getByText("Delivered").count();
if (delivered === 0) problems.push("tracking timeline did not render");
else log("   timeline advanced to Delivered");
await page.screenshot({ path: `${SHOTS}/10-tracking.png`, fullPage: true });

log("→ bag emptied after order");
await page.goto(`${BASE}/bag`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const emptied = await page.getByText(/Nothing in the/).count();
if (emptied === 0) problems.push("bag was not cleared after placing the order");
else log("   bag cleared");

log("→ search overlay");
await page.goto(BASE, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Open search" }).click();
await page.waitForTimeout(700);
await page.fill("#search-input", "linen");
await page.waitForTimeout(600);
const hits = await page.locator("[role=dialog] li a").count();
log(`   search hits: ${hits}`);
if (hits === 0) problems.push("search returned nothing for 'linen'");
await page.screenshot({ path: `${SHOTS}/11-search.png` });

log("→ journal + locations");
await page.goto(`${BASE}/journal`, { waitUntil: "networkidle" });
await page.waitForTimeout(700);
await page.screenshot({ path: `${SHOTS}/12-journal.png` });
await page.goto(`${BASE}/locations`, { waitUntil: "networkidle" });
await page.waitForTimeout(700);
await page.screenshot({ path: `${SHOTS}/13-locations.png` });

await desktop.close();

/* ---------------------------------------------------------------- */
/* Mobile                                                            */
/* ---------------------------------------------------------------- */
const mobile = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
const m = await newPage(mobile);

log("→ mobile home");
await m.goto(BASE, { waitUntil: "networkidle" });
await m.waitForTimeout(600);
await m.screenshot({ path: `${SHOTS}/20-m-home.png` });

const overflow = await m.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
);
log(`   horizontal overflow: ${overflow}px`);
if (overflow > 1) problems.push(`home overflows horizontally by ${overflow}px on 390px`);

log("→ mobile nav");
await m.getByRole("button", { name: "Open menu" }).click();
await m.waitForTimeout(700);
await m.screenshot({ path: `${SHOTS}/21-m-nav.png` });
await m.getByRole("button", { name: "Close menu" }).click();
await m.waitForTimeout(400);

log("→ mobile product + sticky CTA");
await m.goto(`${BASE}/product/n85-eau-de-parfum`, { waitUntil: "networkidle" });
await m.waitForTimeout(600);
await m.screenshot({ path: `${SHOTS}/22-m-product.png` });
await m.evaluate(() => window.scrollTo(0, 1600));
await m.waitForTimeout(1000);
const sticky = await m.locator("text=Add to bag").last().isVisible();
log(`   sticky CTA visible: ${sticky}`);
if (!sticky) problems.push("mobile sticky CTA did not appear");
await m.screenshot({ path: `${SHOTS}/23-m-sticky.png` });

log("→ mobile shop overflow");
await m.goto(`${BASE}/shop`, { waitUntil: "networkidle" });
await m.waitForTimeout(600);
const shopOverflow = await m.evaluate(
  () => document.documentElement.scrollWidth - document.documentElement.clientWidth
);
log(`   shop overflow: ${shopOverflow}px`);
if (shopOverflow > 1) problems.push(`/shop overflows by ${shopOverflow}px on 390px`);
await m.screenshot({ path: `${SHOTS}/24-m-shop.png` });

const checkoutOverflow = await (async () => {
  await m.goto(`${BASE}/checkout`, { waitUntil: "networkidle" });
  await m.waitForTimeout(500);
  return m.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
})();
log(`   checkout overflow: ${checkoutOverflow}px`);
if (checkoutOverflow > 1) problems.push(`/checkout overflows by ${checkoutOverflow}px`);

await mobile.close();

/* ---------------------------------------------------------------- */
/* Reduced motion                                                    */
/* ---------------------------------------------------------------- */
const rm = await browser.newContext({
  viewport: { width: 1280, height: 800 },
  reducedMotion: "reduce",
});
const r = await newPage(rm);
log("→ reduced motion");
await r.goto(BASE, { waitUntil: "networkidle" });
await r.waitForTimeout(900);
const headingVisible = await r.locator("h1").first().isVisible();
const heroOpacity = await r.locator("h1").first().evaluate((el) => getComputedStyle(el).opacity);
log(`   h1 visible: ${headingVisible}, opacity: ${heroOpacity}`);
if (!headingVisible || Number(heroOpacity) < 0.99) {
  problems.push("hero heading is not fully visible under reduced motion");
}
await r.screenshot({ path: `${SHOTS}/30-reduced-motion.png` });
await rm.close();

await browser.close();

console.log("\n================ RESULT ================");
if (problems.length === 0) {
  console.log("All checks passed.");
} else {
  console.log(`${problems.length} problem(s):`);
  for (const p of problems) console.log(" ✗ " + p);
}
process.exit(problems.length ? 1 : 0);
