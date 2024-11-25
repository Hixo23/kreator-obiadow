# Kreator obiadów

Kreator obiadów is a modern website that offers a rich collection of recipes for delicious and healthy dinners. Our platform is perfect for both beginner cooks and experienced chefs. With advanced filtering features, you can quickly find the perfect recipe to suit your needs and preferences.

## Technologies

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
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

- Push schema do database

```bash
pnpm run db:push
```

- And run project

```bash
pnpm run dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `AUTH_SECRET`
- `AUTH_DISCORD_ID`
- `AUTH_DISCORD_SECRET`

- `DATABASE_URL`
- `UPLOADTHING_TOKEN`

## Roadmap

- Add comments and rating

- Add more auth providers

- Add generating meals by ai

- Add advanced filtering

## License

[MIT](https://choosealicense.com/licenses/mit/)
