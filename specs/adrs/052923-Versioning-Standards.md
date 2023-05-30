# ADR: Adopt SemVer and Commit Message Formatting for Versioning and Release Notes

## Context
As our project grows and matures, we need to standardize our versioning process and automate the generation of release notes. This ensures consistent communication about changes, features, and bug fixes to all stakeholders.

## Decision
1. **Versioning:** Versions will be tagged with the format vX.Y.Z where X, Y, and Z are integers greater than or equal to zero. We will follow SemVer rules (https://semver.org/).
2. **Git Tags:** Upon completion of a new version, we will create a Git tag with the correct version number (e.g., v1.3.2) and push it to the repo. The subsequent GitHub action will automatically generate the release notes.
3. **Commit Messages:** To appear in the release notes, commit messages must follow a specific format. They should start with feat:, fix:, or doc:, followed by a brief description. Non-conforming commits will not be included in the release notes.
4. **Release Notes:** Commits will be presented in the release notes with the following labels: Feature: (for feat:), Bug Fix: (for fix:), and Documentation: (for doc:).

## Reason
Implementing this process allows us to:

1. **Standardize versioning:** Adopting SemVer rules provides a clear and universal understanding of our versioning process.
2. **Automate release notes:** Using commit message conventions in combination with Git tags facilitates the automatic generation of detailed release notes.
3. **Improve communication:** This process ensures that all team members and stakeholders are informed of changes, new features, and bug fixes.

## Status
Accepted

## Consequences
- Team members must learn and adhere to the new commit message conventions.
- We will need to integrate the GitHub action into the main repo for automated generation of release notes.
- Stakeholders will have a clearer understanding of changes in each version through the standardised release notes.
- Ensuring correct commit messages may require additional oversight and may slow down initial development speed.
