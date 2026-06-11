import asyncio
from playwright import async_api
from playwright.async_api import expect


async def run_test():
    pw = None
    browser = None
    context = None

    try:
        # Start a Playwright session in asynchronous mode
        pw = await async_api.async_playwright().start()

        # Launch a Chromium browser in headless mode with custom arguments
        browser = await pw.chromium.launch(
            headless=True,
            args=[
                "--window-size=1280,720",  # Set the browser window size
                "--disable-dev-shm-usage",  # Avoid using /dev/shm which can cause issues in containers
                "--ipc=host",  # Use host-level IPC for better stability
                "--single-process",  # Run the browser in a single process mode
            ],
        )

        # Create a new browser context (like an incognito window)
        context = await browser.new_context()
        context.set_default_timeout(5000)

        # Open a new page in the browser context
        page = await context.new_page()

        # Navigate to home then to /search
        await page.goto("http://localhost:3000", wait_until="commit", timeout=10000)
        await page.goto("http://localhost:3000/search", wait_until="commit", timeout=10000)

        # Focus the navbar search input
        frame = context.pages[-1]
        elem = frame.locator("xpath=/html/body/nav/div[2]/div[2]/form/input").nth(0)
        await page.wait_for_timeout(3000)
        await elem.click(timeout=5000)

        # Ensure the input is empty and submit with Enter
        await page.wait_for_timeout(1000)
        await elem.fill("")
        await page.wait_for_timeout(1000)
        await elem.press("Enter")

        # Assertions: page remains usable and does not show a no-results error for an empty query
        frame = context.pages[-1]
        await expect(
            frame.locator("xpath=/html/body/nav/div[2]/div[2]/form/input").first
        ).to_be_visible(timeout=3000)
        await expect(
            frame.locator("text=There are no products that match").first
        ).not_to_be_visible(timeout=3000)

        await asyncio.sleep(5)

    finally:
        if context:
            await context.close()
        if browser:
            await browser.close()
        if pw:
            await pw.stop()


asyncio.run(run_test())

