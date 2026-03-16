# Job Portal

Rails 7.1 job platform with public job search, recruiter workspace, and admin operations.

## Frontend stack

- `turbo-rails` for page navigation and form handling
- `stimulus-rails` for client-side interactions
- `tailwindcss-rails` for styling via the Rails build pipeline
- `importmap-rails` for JavaScript module loading

## Frontend workflow

Use the development procfile so Rails and the Tailwind watcher run together:

```bash
bin/dev
```

That starts:

- `bin/rails server`
- `bin/rails tailwindcss:watch`

If you only need a one-off CSS build:

```bash
bin/rails tailwindcss:build
```

## Notes

- Layouts now load the Rails-built `tailwind.css` instead of the Tailwind CDN.
- Stimulus controllers live in `app/javascript/controllers`.
- Shared design styles live in `app/assets/stylesheets/application.css`.
