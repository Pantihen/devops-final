const request = require('supertest');
const app = require('../src/app');

describe('Application routes', () => {
  test('GET / returns "DevOps Final Project"', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('DevOps Final Project');
  });

  test('GET /health returns { status: "ok" }', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/application\/json/);
    expect(res.body).toEqual({ status: 'ok' });
  });
});

describe('Prometheus metrics', () => {
  test('GET /metrics exposes default metrics in Prometheus format', async () => {
    const res = await request(app).get('/metrics');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/text\/plain/);
    expect(res.text).toContain('# TYPE process_cpu_user_seconds_total counter');
    expect(res.text).toContain('nodejs_heap_size_total_bytes');
  });

  test('http_requests_total counts requests by route and status', async () => {
    await request(app).get('/health');
    await request(app).get('/health');
    const res = await request(app).get('/metrics');
    expect(res.text).toContain('# TYPE http_requests_total counter');
    const line = res.text
      .split('\n')
      .find((l) => l.startsWith('http_requests_total{') && l.includes('route="/health"'));
    expect(line).toBeDefined();
    expect(Number(line.split(' ').pop())).toBeGreaterThanOrEqual(3);
  });
});
