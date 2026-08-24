import { test, expect } from "@playwright/test";

/**
 * API-layer tests using Playwright's built-in request context —
 * no browser involved, so they run in milliseconds.
 */
const API_BASE = "https://jsonplaceholder.typicode.com";

test.describe("Users API", () => {
  test("GET /users returns a well-formed collection", async ({ request }) => {
    const response = await request.get(`${API_BASE}/users`);
    expect(response.status()).toBe(200);

    const users: Array<{ id: number; email: string }> = await response.json();
    expect(users.length).toBeGreaterThan(0);
    for (const user of users) {
      expect(user.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    }
  });

  test("POST /posts echoes the created resource", async ({ request }) => {
    const payload = { title: "e2e framework", body: "hello", userId: 1 };
    const response = await request.post(`${API_BASE}/posts`, { data: payload });
    expect(response.status()).toBe(201);
    expect(await response.json()).toMatchObject(payload);
  });

  test("GET unknown resource returns 404", async ({ request }) => {
    const response = await request.get(`${API_BASE}/users/99999`);
    expect(response.status()).toBe(404);
  });
});
