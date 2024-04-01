# MSAL-React Demo

[![GitHub Actions Workflow](https://github.com/KotaHusky/msal-react/actions/workflows/deploy-container-to-azure-web-app.yml/badge.svg)](https://github.com/KotaHusky/msal-react/actions/workflows/deploy-container-to-azure-web-app.yml)

## Summary

This is a demo project that shows how to use the Microsoft Authentication Library for React (MSAL-React).

## Tech Stack

- [Azure Web Apps](https://azure.microsoft.com/en-us/services/app-service/web/) - Cloud webapp hosting 
- [Azure B2C](https://learn.microsoft.com/en-us/azure/active-directory-b2c/overview) - Identity and access management with local and social identity providers.
- [Docker Hub](https://hub.docker.com) - Docker container registry.
- [GitHub Actions](https://github.com/features/actions) - CI/CD pipeline.
- [GitHub CLI](https://cli.github.com) - Programmatic access to GitHub.
- [MSAL-React](https://www.npmjs.com/package/@azure/msal-react) - Microsoft Authentication Library for React.
- [NextJS](https://nextjs.org) - React framework for server-side rendering and static site generation.
- [Nx](https://nx.dev) - Extensible dev tools for monorepos.
- [TailwindCSS](https://tailwindcss.com) - Utility-first CSS framework for rapid UI development.

## Setup

### GitHub

Setup the GitHub CLI:

```bash
# Homebrew
brew install gh
```

```bash
# Windows
choco install gh
```

Login to GitHub:

```bash
# GitHub CLI
gh auth login
```

Create a new repository using the template:

```bash
# GitHub CLI
gh repo create msal-react --template KotaHusky/msal-react --private
```

Setup the repository secrets and variables using the template files:

```bash
# GitHub CLI
gh secret set --env-file .env.template-gha-secrets
gh variable set --env-file .env.template-gha-variables
```

### Azure Web App

Setup your Azure Web App ...

### Azure Entra ID: Tenant

You will need a tenant in Microsoft Entra ID.

[Quickstart: Create a new tenant in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)

### Azure Entra ID: App Registration

You will need to create a new app registration in Microsoft Entra ID and configure/note the following:

- Redirect URIs
- Client ID
- Tenant ID

[Quickstart: Register an application with the Microsoft identity platform](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)

### Azure Entra ID: Identity Providers

You will need to configure the identity providers in Microsoft Entra ID.

[Identity Provider: Local](https://learn.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-local)
[Identity Provider: Apple](https://learn.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-apple-id)
[Identity Provider: Microsoft](https://learn.microsoft.com/en-us/azure/active-directory-b2c/identity-provider-microsoft-account)

### GitHub Actions

You will need to configure the following secrets:

`AZURE_APPSERVICE_PUBLISHPROFILE` - The publish profile for your Azure Web App. You can download this from Azure Web Apps > Deployment Center.
`DOCKERHUB_USERNAME` - Your DockerHub username (lowercase).
`DOCKERHUB_TOKEN` - Your DockerHub token. Do not use your password.
`DOCKERHUB_REPO` - Your DockerHub repository.

Environment variables are set in the `env` section of the GitHub Actions workflow file, and should be set accordingly for your app.

## Project Structure

This project is an integrated workspace powered by Nx. It contains the following:

- `apps/msal-react-demo` - The NextJS application that uses MSAL-React.
- `libs/lib-msal-react` - A library that wraps MSAL-React and provides a hook to use in the NextJS app.

Separating the MSAL-React logic into a library allows for easier reuse across multiple applications.

## Additional Resources

### Nx

#### Integrate with editors

Enhance your Nx experience by installing [Nx Console](https://nx.dev/nx-console) for your favorite editor. Nx Console
provides an interactive UI to view your projects, run tasks, generate code, and more! Available for VSCode, IntelliJ and
comes with a LSP for Vim users.

#### Start the application

Run `npx nx dev msal-react-demo` to start the development server. Happy coding!

#### Build for production

Run `npx nx build msal-react-demo` to build the application. The build artifacts are stored in the output directory (e.g. `.next`), ready to be deployed.

#### Running tasks

To execute tasks with Nx use the following syntax:

```
npx nx <target> <project> <...options>
```

You can also run multiple targets:

```
npx nx run-many -t <target1> <target2>
```

..or add `-p` to filter specific projects

```
npx nx run-many -t <target1> <target2> -p <proj1> <proj2>
```

Targets can be defined in the `package.json` or `projects.json`. Learn more [in the docs](https://nx.dev/features/run-tasks).

#### Explore the project graph

Run `npx nx graph` to show the graph of the workspace.
It will show tasks that you can run with Nx.

- [Learn more about Exploring the Project Graph](https://nx.dev/core-features/explore-graph)
