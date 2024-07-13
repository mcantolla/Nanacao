const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    // Requerimiento 1
  it('GET /cafes debe devolver un status code 200 y un arreglo con al menos 1 objeto', async () => {
    const response = await request(server).get('/cafes');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Requerimiento 2
  it('DELETE /cafes/:id debe devolver un código 404 si el id no existe', async () => {
    const nonExistentId = 999;
    const response = await request(server).delete(`/cafes/${nonExistentId}`);
    expect(response.status).toBe(404);
  });
  

  // Requerimiento 3
  it('POST /cafes debe agregar un nuevo café y devolver un código 201', async () => {
    const newCafe = { id: 10, nombre: "Cafe de prueba" };
    const response = await request(server).post('/cafes').send(newCafe);
    expect(response.status).toBe(201);
    expect(response.body.id).toBe(newCafe.id);
    expect(response.body.nombre).toBe(newCafe.nombre);
  });

  // Requerimiento 4
  it('PUT /cafes/:id debe devolver un status code 400 si los ids no coinciden', async () => {
    const cafeToUpdate = { id: 1, nombre: 'Café actualizado', descripcion: 'Descripción actualizada' };
    const mismatchedId = 2;
    const response = await request(server).put(`/cafes/${mismatchedId}`).send(cafeToUpdate);
    expect(response.status).toBe(400);
  });
});
