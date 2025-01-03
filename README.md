# Kreator obiadów

Kreator obiadów is a modern website that offers a rich collection of recipes for delicious and healthy dinners. Our platform is perfect for both beginner cooks and experienced chefs. With advanced filtering features, you can quickly find the perfect recipe to suit your needs and preferences.

## Technologies

- [Next.js](https://nextjs.org)
- [Clerk](https://clerk.dev)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)

## Run Locally

- Clone repository

```bash
  git clone https://github.com/Hixo23/kreator-obiadow.git
```

- Go to project directory

```bash
cd kreator-obiadow
```

- Install dependencies

```bash
pnpm install my-project
```

- Push schema to database

```bash
pnpm run db:push
```

- And run project

```bash
pnpm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `DATABASE_URL`
- `UPLOADTHING_TOKEN`

## Roadmap

- Add comments and rating

- Add more auth providers

- Add generating meals by ai

- Add advanced filtering

## License

[MIT](https://choosealicense.com/licenses/mit/)
