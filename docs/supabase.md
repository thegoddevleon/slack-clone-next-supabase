# Supabase Summary and Resources for Learning

## Authentication

- [For Magic Link by Email Based Authentication](https://supabase.com/docs/guides/auth/auth-email-passwordless#with-magic-link) 

- [For Password Based Authentication](https://supabase.com/docs/guides/auth/passwords?queryGroups=flow&flow=pkce)

- [For Google Social-Login](https://supabase.com/docs/guides/auth/social-login/auth-google)

- [For Github Social-Login](https://supabase.com/docs/guides/auth/social-login/auth-github)


## Generating TypeScript Types

- [How to generate types for API and Supabase libraries](https://supabase.com/docs/guides/api/rest/generating-types)

```
pnpm dlx supabase gen types --lang=typescript --project-id "$PROJECT_REF" --schema public > src/types/supabase.ts
```