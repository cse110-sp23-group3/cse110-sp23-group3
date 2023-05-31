# Milestone 1 

**Team:** 3 (Powell's Pride Tech)

**Type of Meeting:** Showcase, reflective

**Time/Place:** Zoom, 12:45PM - 1:27 PM May 27, 2023
[Zoom Recording: (Passcode: Y9x7rf.s)](https://ucsd.zoom.us/rec/share/km2sdmVbo2c7p19iIJilznpfPPd8WVnLkohOKyIK3lgFRzgLkk9aym31jNZSK70T.OvyvQrlMtLShAhyR)

## Attendance

* Henry
* Faith
* Nick
* Anh
* Chaeyeon
* Chris
* Dylan
* Jiaen
* Michael
* Mico


## Agenda

New Business
* Mini demo of progress! (mimic tuesday checkin video)
* Celebrate highlights of milestone
* Review and close milestone issues (Tuesday demo issues)

## Notes:
* Highlights of milestone
What went well? Cool things you liked. Highlight ppl :D

* Review and close milestone issues
Tuesday we need to have a prototype, so some things may need to be added over the weekend. List below

## Meeting Notes:

What we have so far for Milestone 1:
* Anh/Dylan will pull up live site and explain what is going on:
  * app prompts you for which line to read
  * asks you some questions about how to describe it
  * you click the responses to the questions
  * once you answer all the questions, it gives you the option to either enter more lines or print your fortune
  * Right now, it does not save your palm reading; you just see it once
* The functionality works well; we should focus more on design
* There is a flowchart on the Miro board for how the fortune is read
* We need to work on the CRUD functionality before Tuesday
* Build path was also good

**Action:** put Miro and Figma links on home README.md

Milestone 1 Issues that can be closed:
* Website layout/wireframe:
  * Do we still need it for Milestone 1?
  * We can close issues 11 and 12 and keep this one open for Milestone 2
  * we can put the Figma/Miro links on this issue
  * 11 and 12 were closed
* Testing code: (#19)
  * move to Milestone 2
  * can turn into ADR once we decide something so we can close it
* Create ADRs (#18)
  * need to expand documentation one
  * for release notes generator, can generate an ADR although it could be a summary
  * definition of done:
    * for Milestone 1, we are going through it in the meeting
    * maybe we should have reviews of issues to make sure issues are done instead of closing issues during spring meeting
      * random reviews are probably better than closing issues during sprint
  * we will keep ADRs open until Henry finishes some more ADRs and then Henry will close it
* Chatbox/CRUD functioanlity (#17)
  * will be moved to Milestone 2
  * should perhaps break it into task list
    * we will create a local storage session
    * we will save the chat session to local storage somehow
    * we will store the whole conversation in Local Storage
    * we will allow the user to rename saved sessions
    * user can also delete session
    * user can pull up conversation on screen
  * we may edit the tasks later - see comment on #17
  * this will be **due Tuesday**
* Palm reading script (#16)
  * we have a basic script
  * we need to probably improve it
  * we will keep this issue open for now
  * we could save choices made in session and then regenerate the conversation vs. saving the actual conversation
  * we should perhaps just save the answers the user put
  * currently, when you press yes, it pushes a value from an object to a different array that holds corresponding fortunes
  * when you say "yes" it appends a "yes" or "no" to an array
  * we can save this array to local storage
  * Dylans goes through the lines well, but the wording does not sound conversational. We need to fix the wording to make it fit the theme and provide a better user experience
  * We should make it more conversational
  * We should make a new issue for whatever we need to change about the script
  * this issue will be closed
* chatbox implementation (#15)
  * will be closed; make new issue if need to improve
* Can make new feature: if user misclicked, can go back
* Build path (#14)
  * will be closed
* Documentation (#13)
  * will leave open
  * **Action:** read through release notes generator
  * **Action:** decide if want to include names in the release notes
* UI Chatbox and Message (#20)
  * we are closing this issue
* What we are left with:
  * CRUD functionality is most important for the video Tues
  * we should make a mini-milestone for CRUD functionality
  * **Action:** need to get this done before Tuesday
    * does not need to be perfect, but want to show something for the video
