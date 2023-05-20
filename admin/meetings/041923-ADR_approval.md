# ADR Approval Meeting

**Team:** 3 (Powell's Pride Tech)

**Type of Meeting:** check-ins

**Time/Place:** Zoom, 4:30pm - 5:08 PM May 19, 2023

## Attendance

* Henry
* Nick
* Jiaen
* Chris
* Dylan
* Faith
* Mico
* Anh

## Agenda

New Business
* Discuss the ADRs that Henry wrote up
* Faith will give update for team leads meeting

## Notes:

* ADRs:
  * Linter - makes sure code is in right format (e.g. convert all strings to double quotes, tells you if you have unused variables)
  * We will use StandardJS
  * Documentation:
    * will use JSDoc for functions
      * can generate/host JS documentation
      * it is important to learn
* For the app, if we want to store sessions:
  * we were thinking local storage so we don't need a database
  * can also use something like Dexie (an in-browser database)
    * a more database-like version of local storage
    * useful if we need more than key-value
    * a wrapper around indexdb
  * still need to decide what we will use
  * will probably start with local storage and expand to another tool if we outgrow it
* All these tools are free
* We approved these
* Where we will host the website:
  * will use GitHub pages probably
  * considered other options (e.g. railway)
  * **decision:** GitHub pages (unless we outgrow it, in which case we will expand)
* CI/CD build path:
  * need to decide what to do after you submit code (checking, running actions, etc.)
  * Use GitHub actions for linting, compilation, documentation, JSDocs, unit tests
  * Nick made Miro board
    * can discuss it on there
  * Need to decide actions for build path and make an ADR for it
    * **Action:** take a look at the CI/CD pipeline on the Miro board and add any tools if you have any ideas **due tomorrow**
      * will assign tasks to build it later
  * Can use ESLint, Prettier, etc.
    * can set up so that happens whenever there is a push
  * If you are working on an issue, use a different branch
    * can do production, dev, stage branches
      * staging = keeps you from deploying every single commit to prod
        * make sure all changes you make work as intended before deploying to production
        * a site with a different domain that you can visit to test things before merging to prod
    * when you are done, make pull request - that is when we do code reviews
    * can assign people to approve it
    * **People to do Code Reviews** (for Milestone 1):
      * Nick
      * Dylan
* Faith's update:
  * Our issues look really good (Malcom was showing other groups as an example)
  * We need to develop the build path
    * try to decide by tomorrow what tools to use
    * need to set up linter, something to do documentation
    * Miro board should be good for diagram
    * Faith will message Malcom about CI/CD demos
  * Sprint 1 Progress:
    * **Action:** see message in Standups so we can see where everyone is at (it is okay if you haven't done stuff since you've been busy with midterms) **(due by end of today)**
    * **sprint due next Wed**
    * let everyone know what is going on with your project in standups
  * **Action:** Please watch the issues (we are requiring this now)

## Action items Summary:
* Respond to Faith's message in Standups by **tonight**
* Watch the GitHub issues so you recieve email notifications
* Post ideas/tools we can use for the CI/CD pipeline on Miro board **by tonight**
* **Faith:** message Malcom about CI/CD demo