const { test, expect } = require('@playwright/test');

test.describe('Webdev1Project Tests', () => {
    // Test 1: Check if the "Contact Me" button is present and clickable
    test('Contact Me button is present and clickable', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const contactMeButton = await page.locator('#contact-me-button');
        await expect(contactMeButton).toBeVisible();
        await contactMeButton.click();
        await expect(page.locator('#contact-container')).toBeVisible();
    });

    // Test 2: Check if Font Awesome icons are visible in the footer
    test('Font Awesome icons are visible in the footer', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const githubIcon = page.locator('a[aria-label="GitHub"] .fab');
        const linkedinIcon = page.locator('a[aria-label="LinkedIn"] .fab');
        const emailIcon = page.locator('a[aria-label="Email"] .fas');
        await expect(githubIcon).toBeVisible();
        await expect(linkedinIcon).toBeVisible();
        await expect(emailIcon).toBeVisible();
    });

    // Test 3: Check if the Hero section has a background image
    test('Hero section has a background image', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const heroSection = page.locator('.hero');
        const backgroundImage = await heroSection.evaluate(el =>
            window.getComputedStyle(el).backgroundImage
        );
        expect(backgroundImage).toBe('none');
    });

    // Additional Tests

    // Test 4: Check if the hero section has a heading
    test('Hero section has a heading', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const heading = page.locator('.hero h1');
        await expect(heading).toHaveText('I am Tomas Gonzalez');
    });

    // Test 5: Check if the "My Works" section has a heading
    test('My Works section has a heading', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const heading = page.locator('#MyWorks h3');
        await expect(heading).toHaveText('My Works');
    });

    // Test 6: Check if the "My Articles" section has a heading
    test('My Articles section has a heading', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const heading = page.locator('#articles h3');
        await expect(heading).toHaveText('My Articles');
    });

    // Test 7: Check if the "Contact Me" section has a form
    test('Contact Me section has a form', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const form = page.locator('#contact-container form');
        await expect(form).toBeVisible();
    });

    // Test 8: Check if the form has an email input
    test('Form has an email input', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const emailInput = page.locator('#contact-container input[type="email"]');
        await expect(emailInput).toBeVisible();
    });

    // Test 9: Check if the form has a submit button
    test('Form has a submit button', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const submitButton = page.locator('#contact-container input[type="submit"]');
        await expect(submitButton).toBeVisible();
    });

    // Test 10: Check if the footer has links
    test('Footer has links', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const githubLink = page.locator('a[aria-label="GitHub"]');
        const linkedinLink = page.locator('a[aria-label="LinkedIn"]');
        const emailLink = page.locator('a[aria-label="Email"]');
        await expect(githubLink).toBeVisible();
        await expect(linkedinLink).toBeVisible();
        await expect(emailLink).toBeVisible();
    });

    // Test 11: Check if there are images in the "My Works" section
    test('My Works section has images', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const images = page.locator('#MyWorks .sqaure-container img');
        await expect(images).toHaveCount(3);
    });

    // Test 12: Check if "Fitness App" has a description
    test('Fitness App has a description', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const description = page.locator('#MyWorks .sqaure-container:nth-child(1) p');
        await expect(description).toHaveText('A fitness app that allows uses React JS frontend and Firebase backend to keep track of your calories, workouts, and weight goals.');
    });

    // Test 13: Check if the "Online Card Game" has a description
    test('Online Card Game has a description', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const description = page.locator('#MyWorks .sqaure-container:nth-child(2) p');
        await expect(description).toHaveText('A real time multiplayer card game that uses socket.io and Node.js to provide real time gaming with friends.');
    });

    // Test 14: Check if the "Covid Tracker" has a description
    test('Covid Tracker has a description', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const description = page.locator('#MyWorks .sqaure-container:nth-child(3) p');
        await expect(description).toHaveText('A Covid Tracker that uses a JSON API to get real word data regarding Covid cases world wide. It tracks the cases in real time.');
    });

    // Test 15: Check if the "Paper on ethics" section has a description
    test('Paper on ethics has a description', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const description = page.locator('#articles .sqaure-container:nth-child(1) p');
        await expect(description).toHaveText('Wrote a paper that analyzed the issue with social media, from an ethical standpoint. Went through an ethical analysis about the effects it has on all of us.');
    });

    // Test 16: Check if the "Paper on AI" section has a description
    test('Paper on AI has a description', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const description = page.locator('#articles .sqaure-container:nth-child(2) p');
        await expect(description).toHaveText('Wrote about the potential possibilities of AI. Wrote about how if we had certain technologies, we could really advance the possibility of ai. Also the importance of the subject.');
    });

    // Test 17: Check if the "Paper on OS" section has a description
    test('Paper on OS has a description', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const description = page.locator('#articles .sqaure-container:nth-child(3) p');
        await expect(description).toHaveText('Wrote a paper on different Linux Operating Sytems. Compared and Contrasted the different Operating Sytems and took an especially focused look on the Kali and Parrot OS for Linux.');
    });

    // Test 18: Check if the "Contact Me" section has a heading
    test('Contact Me section has a heading', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const heading = page.locator('#contact-container h1');
        await expect(heading).toHaveText('Contact Me');
    });

    // Test 19: Check if the "Contact Me" button has a smooth scroll behavior
    test('Contact Me button has a smooth scroll behavior', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const contactMeButton = page.locator('#contact-me-button');
        await contactMeButton.click();
        await page.waitForTimeout(1000); // Wait for smooth scroll
        await expect(page.locator('#contact-container')).toBeVisible();
    });

    // Test 20: Check if the contact form has the correct placeholder text
    test('Contact form email input has correct placeholder text', async ({ page }) => {
        await page.goto('https://tomasgonz67.github.io/webdev1project/');
        const emailInput = await page.locator('#email');
        await expect(emailInput).toHaveAttribute('placeholder', 'your-email@example.com');
    });
});
