# ADR: Use Plain HTML, CSS, and JavaScript for Frontend Development

## Context
We need to choose the frontend technology stack for our new application. Several options exist, ranging from modern JavaScript frameworks like React, Vue, and Angular to simpler approaches involving plain HTML, CSS, and JavaScript.

## Decision

We will use plain HTML, CSS, and JavaScript for our frontend development.

## Reason

Several factors lead us to choose plain HTML, CSS, and JavaScript:

1. **Simplicity:** Using plain HTML, CSS, and JavaScript avoids the complexity introduced by modern JavaScript frameworks. This can make the code easier to understand and maintain.

2. **Browser compatibility:** HTML, CSS, and JavaScript are universally supported by all modern web browsers. This ensures maximum compatibility without having to worry about the framework-specific issues.

3. **Performance:** Without the overhead of a JavaScript framework, our application may be faster and more responsive.

4. **Learning Curve:** Given that our team is proficient in plain HTML, CSS, and JavaScript, we can leverage our existing skills and avoid the learning curve associated with a new framework.

## Status

Accepted

## Consequences

- Our team will need to manually handle some tasks that would be automated in a JavaScript framework, such as DOM manipulation and state management.
- We will need to write more boilerplate code than we would with a JavaScript framework.
- Without a pre-defined structure that a framework would provide, we will need to be more careful about organizing our code in a clear and maintainable way.
- On the positive side, we expect our application to load and run faster due to the lack of framework overhead.
