# StudyBud

A personal study app: upload notes, get AI study notes, quizzes and spaced-repetition flashcards.

Built with Next.js (App Router, TypeScript) and Tailwind CSS.

## Run it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Database (Supabase)

The SQL files live in `supabase/`. Run them in the Supabase dashboard under **SQL Editor**:

1. `schema.sql` creates the tables. Run it once.
2. `storage.sql` adds the private file bucket for uploads. Run it once.
3. `upload-text.sql` adds the text pulled out of each upload. Run it once.
4. `seed.sql` is optional and loads the sample content for testing.
5. `clear-sample.sql` removes the sample content. Run it before real use.

The app reads the database from the server only, using two environment variables. Never commit them:

- `SUPABASE_URL`: the Project URL (Project Settings → API)
- `SUPABASE_SECRET_KEY`: the secret (service_role) key

To run locally, put both in a `.env.local` file in the project root. Git ignores it.

## Checks

```bash
npm run lint
npm run build
```
