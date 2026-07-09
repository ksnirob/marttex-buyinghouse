# Garment Gemini Backend

Express + Prisma + MariaDB backend for managing website content:

- products and product images
- product categories
- contact information
- editable page text and content blocks
- contact form enquiries

## Local setup

```bash
cd backend
npm install
npm run db:generate
npm run db:push
npm run seed
npm run dev
```

The API runs on `http://localhost:4000` by default.

Set the MariaDB connection in `.env` first:

```env
DATABASE_URL=mysql://DATABASE_USER:DATABASE_PASSWORD@127.0.0.1:3306/DATABASE_NAME
```

To view and edit database records in a browser:

```bash
npm run db:studio
```

## Hosting setup

1. Create a MariaDB/MySQL database and user from the hosting panel.
2. Upload this `backend` folder.
3. Grant the database user full privileges for that database.
4. In the Node.js app settings, set startup file to `src/server.js`.
5. Add `DATABASE_URL` and the other `.env` values in the hosting environment manager.
6. Run `npm install`, `npm run db:generate`, `npm run db:push`, and `npm run seed`.
7. Point the frontend to this backend URL with `VITE_API_URL`.

## Main endpoints

Public:

- `GET /api/health`
- `GET /api/categories`
- `GET /api/products`
- `GET /api/products/:slug`
- `GET /api/site-settings`
- `GET /api/content`
- `GET /api/content/:key`
- `POST /api/enquiries`

Admin:

- `POST /api/auth/login`
- `GET /api/auth/me`
- `POST /api/categories`
- `PATCH /api/categories/:id`
- `DELETE /api/categories/:id`
- `POST /api/products`
- `PATCH /api/products/:id`
- `DELETE /api/products/:id`
- `POST /api/uploads/image`
- `PATCH /api/site-settings`
- `PUT /api/content/:key`
- `GET /api/enquiries`
- `PATCH /api/enquiries/:id`
- `DELETE /api/enquiries/:id`

For admin endpoints, send:

```http
Authorization: Bearer YOUR_LOGIN_TOKEN
```
