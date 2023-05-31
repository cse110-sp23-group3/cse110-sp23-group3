# ADR: Adopt 2-Space Indentation Standard

## Context
In order to maintain a clean and easily readable codebase, it is essential to agree on an indentation standard. The two main choices for indentation in most coding communities are 2 spaces or 4 spaces/tabs.

## Decision
We will use a 2-space indentation standard for our codebase.

## Reason
The following reasons lead us to choose 2-space indentation:

1. **Readability:** 2-space indentation keeps the code more compact without sacrificing readability, which is beneficial when dealing with deeply nested code.

2. **Consistency:** Enforcing an indentation standard ensures that all developers are writing code in the same way, which makes it easier for anyone to understand and maintain the code.

3. **Conformance:** Many popular style guides, including those from Google and Airbnb, recommend 2-space indentation.

## Status
Accepted

## Consequences
- Developers will need to configure their text editors or IDEs to conform to the 2-space indentation standard.
- Existing code will need to be reformatted to meet this standard.
- The readability of the codebase should improve, making maintenance and collaboration easier.
- There may be initial resistance from developers who are accustomed to a different indentation style.
