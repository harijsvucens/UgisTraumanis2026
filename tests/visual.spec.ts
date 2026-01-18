import { expect, test } from '@playwright/test';

test('visual verification of homepage', async ({ page }) => {
	await page.goto('/');

	// Wait for the page to load
	await expect(page).toHaveTitle(/Uģis Traumanis/);

	// Wait for images to be loaded
	await page.waitForLoadState('networkidle');

	// Verify main elements exist
	await expect(page.locator('main')).toBeVisible();

	// Debug: Log all images found
	const allImages = page.locator('img');
	const allCount = await allImages.count();
	console.log(`\nDEBUG: Found ${allCount} total images on the page.`);

	for (let i = 0; i < allCount; i++) {
		const src = await allImages.nth(i).getAttribute('src');
		console.log(`Image ${i + 1} src: ${src}`);
	}

	// Verify Cloudinary images are present and loading
	// We expect at least one image if projects are loaded
	const images = page.locator('img[src*="res.cloudinary.com"]');

	// Check if we have any Cloudinary images
	const count = await images.count();
	console.log(`Found ${count} Cloudinary images matching selector.`);

	if (count > 0) {
		const firstImage = images.first();
		await expect(firstImage).toBeVisible();
		// Verify expected cloud name in URL
		await expect(firstImage).toHaveAttribute('src', /dowxhswap/);
	}

	// Take a screenshot
	await page.screenshot({ path: 'test-results/homepage.png', fullPage: true });
});
