# MSAL-React Demo

[![GitHub Actions Workflow](https://github.com/KotaHusky/msal-react/actions/workflows/deploy-container-to-azure-web-app.yml/badge.svg)](https://github.com/KotaHusky/msal-react/actions/workflows/deploy-container-to-azure-web-app.yml)

## Summary

This is a demo project that shows how to use the Microsoft Authentication Library for React (MSAL-React).

## Tech Stack

- [Azure Web Apps](https://azure.microsoft.com/en-us/services/app-service/web/)
- [Docker Hub](https://hub.docker.com)
- [GitHub Actions](https://github.com/features/actions)
- [MSAL-React](https://www.npmjs.com/package/@azure/msal-react)
- [NextJS](https://nextjs.org)
- [Nx](https://nx.dev)
- [TailwindCSS](https://tailwindcss.com)

## Setup

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
