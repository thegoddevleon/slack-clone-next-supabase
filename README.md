## Getting Started

To get started, follow these steps to deploy the application locally using Docker:

### Build the Docker Image:
```
docker build -t next-slack-supabase .
```

### Run the Docker Container:
```
docker run -p 3000:3000 next-slack-supabase
```

## Handling HTTP and HTTPS Issues on Localhost

When running the app and logging in with OAuth, you may encounter a production error. Social authentication providers like Google and GitHub require HTTPS for redirecting, but since our localhost only supports HTTP, you will need to manually change the URL from `https://localhost:3000` to `http://localhost:3000` to successfully authenticate.

Here’s a demo:

<img src="https://s10.gifyu.com/images/So4ot.gif" />

## How It Works, Like Slack

- Create workspaces.
- Each workspace contains channels.
- Users can invite others to their workspace.
- Users can interact and communicate in real-time within channels.

Here’s a demo:

<img src="https://s10.gifyu.com/images/So41z.gif" />

## Running Tests

To run the tests, execute the following command:

```
pnpm run test
```

Due to limited time (as it’s not the weekend), I’ve added Jest and created unit tests for some of the UI components.

## Learning and Reading Documentation

All the resources I used for learning can be found in the `supabase.md` file:
- Summary of Supabase and Learning Resources
- Supabase Authentication
- Generating TypeScript Types with Supabase

## Technologies Used in This Project
- <img className="inline-block mr-1" src="https://zod.dev/logo.svg" width="18" height="18"/> [Zod](https://zod.dev/) for validation.
- <img className="inline-block mr-1" src="https://www.typescriptlang.org/favicon-32x32.png" width="18" height="18"/> [TypeScript](https://www.typescriptlang.org/) for static typing.
- <img className="inline-block mr-1" src="https://reactjs.org/favicon.ico" width="18" height="18"/> [React](https://reactjs.org/) for building user interfaces.
- <img className="inline-block mr-1" src="data:image/png;base64,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" width="18" height="18"/> [Tanstack Query (React Query)](https://tanstack.com/query/latest/docs/framework/react/overview) for data fetching and state management.
- <img className="inline-block mr-1" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAC8UlEQVR4Ae2XNZTbQBCG5TBzUl4VZj6+cH8pw0xNqHN10L8w9MVVgSoce+2kCUMVxjbUJSLTb/uXNH4rHYRJ731vRyt5Z3ZIa+OPu/5fNUkrBNMbf5BSVaEwBnqDPhLOxaRh33wtVJ91xQnIJMwrmiHqKw2pSZmacsojQTNoAydJK1jJZwboRWiE/bWxpvKEGatRJQPi4CPIgxxHKX8C7Xh3YM01h97wjeDG7Iq1I2Ju+i80Xc4a1crsA/k0lWSBRVxBhs/y4D6oAsIIjRjo1dXuvR8f5MIZjgT3uiccym/ABP6+L4gJxX2qy5scFmpAbdKUyqu5YAfjvBhsAOkwI4jL8S2Y5OfF2bwhDBkH2iI9IJLoKFgt58Qi8QgjpLfeg/XIiyELrlvYnNUP903gBdjfVQgGgRmUg3qnzPk9gUItRFniGfIQvOT9zWJiB25ns6lN2sDfJWE4EloS9aW8SyiVCZmj7IRUy3QQ0uW4y8akazSAOpRNvXIMsXO63yS+J1aAN1KRRMw9BnO8JJfKe8kOVlteeEQJBVnRA7IjKq1ahoCt4Dxd/YG85NwmMKgahlNfkHClslClmG+KWoCLD/GVKptG2KIFl+egJNgAveSFVnZJaf0cuqcrF76hu8vuLxqRdrUQzscuF4Dqq7axEGghJJ4wnYkhFTmivLKUXWHQLq3JgOoUvUKPBNBT9IRsu8UXb3LRlyyV93oZAb3c9nRRojPAIMqRH539bApNoF8t3Mk4rxeGZLRwBHNx4X7ZrFaziXEu2oA2MM5f5G5eLjKJ7ZT1HWlEmu15Mdt1B+ervYRFf4k0YBjLopwgCa3JTBD17VCxbgQR9weDaokOgVb/AlkhVfzE5mVCCizi5cvp4iccn/IgNMqMMEAqv2pyzqw0IvGlOA4E7SHVIuWPIA4vYtfM/q86H+pGyCPWSMa5FZwkbaCZz/RzYcr8ynNhIuxcaPO+e4dSHGy/038BRbo6lquvOJZ/TWg4avxx1/+rAHVbhJLs9OHAAAAAAElFTkSuQmCC" width="18" height="18"/> [Tailwind CSS](https://tailwindcss.com/) for utility-first styling.
- <img className="inline-block mr-1" src="https://react-hook-form.com/images/logo/react-hook-form-logo-only.svg" width="18" height="18"/> [React Hook Form](https://react-hook-form.com/) for form handling.
- <img className="inline-block mr-1" src="https://axios-http.com/assets/favicon.ico" width="18" height="18"/> [Axios](https://axios-http.com/) for making HTTP requests.
- <img className="inline-block mr-1" src="https://nextjs.org/static/favicon/favicon.ico" width="18" height="18"/> [Next.js](https://nextjs.org/) as the React framework.


## Manual Deployment Setup

1. **Create a Supabase Project**  
   Begin by setting up a new project in [Supabase](https://supabase.io/).

2. **Initialize the Database**  
   Open the SQL editor in the Supabase dashboard, paste the contents of `data/sql.sql`, and click `Run Query` to initialize your database schema.

3. **Set Up Environment Variables**  
   Copy the `.env.example` file to `.env.local` (or `.env`), and update the necessary environment variables.

4. **Install Dependencies**  
   Run `pnpm install` to install all project dependencies.

5. **Start the Development Server**  
   Finally, run `pnpm dev` to start the development server.