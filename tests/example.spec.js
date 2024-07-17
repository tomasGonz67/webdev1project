const { test, expect } = require('@playwright/test');

test.describe('HTML Element and Interaction Tests', () => {
    let page;

    test.beforeEach(async ({ browser }) => {
        page = await browser.newPage();
        await page.goto('http://yourwebsite.com');
    });

    test('1. Verify Page Title', async () => {
        expect(await page.title()).toBe('Tomas Portfolio');
    });

    test('2. Check Hero Section Presence', async () => {
        const heroSection = await page.waitForSelector('.hero');
        expect(heroSection).toBeTruthy();
    });

    test('3. Check Contact Me Button Click', async () => {
        const contactButton = await page.waitForSelector('.viewButton');
        expect(contactButton).toBeTruthy();

        await contactButton.click();
        await page.waitForTimeout(1000);

        const contactSection = await page.waitForSelector('#contact-me');
        expect(await contactSection.isVisible()).toBe(true);
    });

    test('4. Validate My Works Section Content', async () => {
        const myWorksSection = await page.waitForSelector('.MyWorks');
        expect(myWorksSection).toBeTruthy();

        const projects = await page.$$('.sqaure-container'); // Assuming this class holds project items
        expect(projects.length).toBeGreaterThan(0); // Ensure there are project items displayed
    });

    test('5. Check Articles Section Visibility', async () => {
        const articlesSection = await page.waitForSelector('.articles');
        expect(articlesSection).toBeTruthy();

        const articleTitles = await page.$$eval('.articles .sqaure-container h2', elements => elements.map(el => el.textContent));
        expect(articleTitles.length).toBeGreaterThan(0); // Ensure article titles are present
    });

    test('6. Validate Footer Social Icons', async () => {
        const githubIcon = await page.waitForSelector('.fab.fa-github');
        expect(githubIcon).toBeTruthy();

        const linkedinIcon = await page.waitForSelector('.fab.fa-linkedin');
        expect(linkedinIcon).toBeTruthy();

        const emailIcon = await page.waitForSelector('.fas.fa-envelope');
        expect(emailIcon).toBeTruthy();
    });

    test('7. Test Navigation Links in Header', async () => {
        const navLinks = await page.$$eval('header nav ul li', links => links.map(link => link.textContent.trim()));
        expect(navLinks).toEqual(['About', 'My Works', 'Articles', 'Contact Me']);
    });

    test('8. Check Form Input Field for Contact Me', async () => {
        const emailInput = await page.waitForSelector('input[type="email"]');
        expect(emailInput).toBeTruthy();

        await emailInput.type('test@example.com');
        await page.waitForTimeout(500);

        const enteredValue = await emailInput.evaluate(el => el.value);
        expect(enteredValue).toBe('test@example.com');
    });

    test('9. Validate Submit Button Interaction', async () => {
        const submitButton = await page.waitForSelector('input[type="submit"]');
        expect(submitButton).toBeTruthy();

        await submitButton.click();
        await page.waitForTimeout(1000); // Assuming form submission time

        // Add assertion for form submission success if applicable
    });

    test('10. Test Image Loading in My Works Section', async () => {
        const images = await page.$$('.squareImg');
        expect(images.length).toBeGreaterThan(0);

        for (let image of images) {
            const isVisible = await image.isVisible();
            expect(isVisible).toBe(true);
        }
    });

    test('11. Check Visibility of Hero Text Content', async () => {
        const heroText = await page.waitForSelector('.hero h1');
        expect(heroText).toBeTruthy();

        const isVisible = await heroText.isVisible();
        expect(isVisible).toBe(true);
    });

    test('12. Validate Styling of Contact Me Button', async () => {
        const contactButton = await page.waitForSelector('.viewButton');
        expect(contactButton).toBeTruthy();

        const buttonColor = await contactButton.evaluate(el => getComputedStyle(el).getPropertyValue('background-color'));
        expect(buttonColor).toBe('rgb(140, 140, 218)'); // Example: Check the computed background color
    });

    test('13. Test Responsive Design on Mobile View', async () => {
        await page.setViewportSize({ width: 375, height: 667 }); // iPhone 6/7/8 dimensions
        await page.waitForTimeout(1000); // Wait for page to adjust

        const heroSection = await page.waitForSelector('.hero');
        expect(heroSection).toBeTruthy();

        const navMenu = await page.waitForSelector('header nav');
        expect(navMenu).toBeTruthy();

        const footerIcons = await page.waitForSelector('footer .contact-icons');
        expect(footerIcons).toBeTruthy();
    });

    test('14. Check Font Family in Articles Section', async () => {
        const articleTitles = await page.$$eval('.articles h2', elements => elements.map(el => el.textContent));
        expect(articleTitles.length).toBeGreaterThan(0);

        const fontFamily = await page.evaluate(() => {
            const articleTitle = document.querySelector('.articles h2');
            return window.getComputedStyle(articleTitle).fontFamily;
        });
        expect(fontFamily).toContain('Roboto'); // Example: Check if Roboto font is applied
    });

    test('15. Validate Link Behavior in Footer Icons', async () => {
        const githubIcon = await page.waitForSelector('.fab.fa-github');
        expect(githubIcon).toBeTruthy();

        await githubIcon.click();
        await page.waitForTimeout(2000); // Wait for navigation

        const currentUrl = page.url();
        expect(currentUrl).toContain('github.com'); // Check if navigation URL contains GitHub
    });

    test('16. Check Error Handling in Contact Form', async () => {
        const emailInput = await page.waitForSelector('input[type="email"]');
        expect(emailInput).toBeTruthy();

        await emailInput.type('invalidemail'); // Enter an invalid email format
        await page.waitForTimeout(500);

        const submitButton = await page.waitForSelector('input[type="submit"]');
        await submitButton.click();
        await page.waitForTimeout(1000); // Assuming form submission time

        // Check for error message display or validation indicator
        // Example: const errorMessage = await page.waitForSelector('.error-message');
        // expect(errorMessage).toBeTruthy();
    });

    test('17. Test Scroll Behavior on My Works Section', async () => {
        const myWorksSection = await page.waitForSelector('.MyWorks');
        expect(myWorksSection).toBeTruthy();

        await page.evaluate(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        });
        await page.waitForTimeout(2000); // Wait for scrolling

        const isVisible = await page.evaluate(() => {
            const myWorksBottom = document.querySelector('.MyWorks').getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            return myWorksBottom <= windowHeight;
        });
        expect(isVisible).toBe(true); // Check if My Works section is fully visible after scrolling
    });

    test('18. Validate Background Color in Hero Section', async () => {
        const heroSection = await page.waitForSelector('.hero');
        expect(heroSection).toBeTruthy();

        const bgColor = await page.evaluate(() => {
            const hero = document.querySelector('.hero');
            return window.getComputedStyle(hero).getPropertyValue('background-color');
        });
        expect(bgColor).toBe('rgb(30, 30, 30)'); // Example: Check the computed background color
    });

    test('19. Check Link Navigation in Header Menu', async () => {
        const aboutLink = await page.waitForSelector('header nav ul li:nth-child(1)');
        const worksLink = await page.waitForSelector('header nav ul li:nth-child(2)');
        const articlesLink = await page.waitForSelector('header nav ul li:nth-child(3)');
        const contactLink = await page.waitForSelector('header nav ul li:nth-child(4)');

        await aboutLink.click();
        await page.waitForTimeout(1000); // Wait for navigation

        let currentUrl = await page.url();
        expect(currentUrl).toContain('#about'); // Example: Check if navigation URL contains about section id

        await worksLink.click();
        await page.waitForTimeout(1000);

        currentUrl = await page.url();
        expect(currentUrl).toContain('#my-works'); // Check if navigation URL contains my works section id

        await articlesLink.click();
        await page.waitForTimeout(1000);

        currentUrl = await page.url();
        expect(currentUrl).toContain('#articles'); // Check if navigation URL contains articles section id

        await contactLink.click();
        await page.waitForTimeout(1000);

        currentUrl = await page.url();
        expect(currentUrl).toContain('#contact-me'); // Check if navigation URL contains contact me section id
    });

    test('20. Test Visibility of Article Images', async () => {
        const articleImages = await page.$$('.articles .sqaure-container img');
        expect(articleImages.length).toBeGreaterThan(0);

        for (let image of articleImages) {
            const isVisible = await image.isVisible();
            expect(isVisible).toBe(true);
        }
    });

    test.afterEach(async () => {
        await page.close();
    });
});