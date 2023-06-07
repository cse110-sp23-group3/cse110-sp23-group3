# ADR: Adopt Button-based User Input for Palm Description

## Context
For our palm reading application, we need a reliable and effective way for users to describe features of their palms. Two primary options are considered: free form text inputs and button-based inputs.

## Decision
We will implement a button-based user input system for describing palm features in our application.

## Reason
Choosing a button-based input system is based on the following considerations:

1. **Usability:** Buttons are easy to use and understand, even for users with minimal technical knowledge.
2. **Consistency:** Button-based inputs ensure that user responses are consistent and predictable, simplifying the data processing and analysis.
3. **Guidance:** Buttons can guide users through the process, helping them understand what information is necessary.
4. **Avoidance of Ambiguity:** Unlike free form input, button-based inputs prevent ambiguous or unclear responses, ensuring the accuracy of palm readings.

## Status
Accepted

## Consequences
- The user interface design will need to accommodate a variety of buttons representing different palm features.
- We need to carefully consider and design the options provided to users to cover all possible features and variations.
- Users may initially require guidance on how to properly use the button-based system, necessitating clear instructions or tutorials.
- This decision should result in more reliable user input, better user experience, and more accurate palm readings.
