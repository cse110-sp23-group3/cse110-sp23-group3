# ADR: Use GitHub Pages for Hosting

## Context
We need a solution for hosting our website. Several options are available, including traditional web hosting services, cloud services like AWS S3, and developer-centric solutions like GitHub Pages and Netlify.

## Decision

We will use GitHub Pages as our hosting service.

## Reason

The following factors lead us to choose GitHub Pages:

1. **Cost:** GitHub Pages provides free hosting for public repositories, which will help us save on hosting costs.

2. **Integration with GitHub:** As we are already using GitHub for version control, using GitHub Pages for hosting will keep our workflow streamlined and simple.

3. **Automatic Deployment:** GitHub Pages automatically deploys changes made to the `gh-pages` branch of our repository, simplifying our deployment process.

## Status

Accepted

## Consequences

- Our team will need to learn how to use GitHub Pages, which includes understanding its limitations (like the lack of server-side scripting).
- We will need to setup our repository correctly to deploy with GitHub Pages.
- Since GitHub Pages is designed for static sites, we cannot use it if we decide to add server-side functionality to our site in the future.
- We may need to consider a different hosting solution if our traffic significantly exceeds the usage limits of GitHub Pages.
