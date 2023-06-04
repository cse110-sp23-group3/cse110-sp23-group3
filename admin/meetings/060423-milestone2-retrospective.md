# Milestone 2 Retrospective

**Team:** 3 (Powell's Pride Tech)

**Type of Meeting:** retrospective

**Time/Place:** Zoom, 3:40PM - 4:08 PM June 4, 2023

## Attendance

* Nick
* Michael
* Mico
* Chaeyeon
* Henry
* Jiaen
* Dylan
* Chris
* Anh

## Agenda
* Have people take turns saying what they felt was good and bad about our process

## Notes

Good:
* we got a lot more done and are communicating better
* the app is coming along nicely
* the new idea will be easier to implement
* We made a lot of progress compared to last milestone
* Good people were keeping track of bug issues
* We participated more in Milestone 2 compared to Milestone 1, so we did great!
* We did a lot more this milestone
* All good, better communication

Work on:
* need to work on communicating about what branches are for and who is working on them
  * solution: ping @channel each time you make a new branch, explaining what it is
* We need to do testing in our process
* we should do as much as we can today and meet tomorrow or day after tomorrow since schedule is pretty tight
* add more detail on issues
* it was not clear what new chat button was for until we got to UI branch
* Need more improved organization
* need to keep branches more organized
* History function was vague and we did not have a clear idea of how we wanted it to work
* I also believe that we have created many branches, which can make it quite confusing to work on each issue. Therefore, when we merge a branch, it is better to delete that branch.
* We need to work on consolidating our branches
  * we have two different UI's; all the CRUD stuff is on other branches
  * we need to start merging branches so we have a clearer idea of what we need to work on
* Lots of people were confused about branching
* In Milestone 2, we have already completed most of the functionality of the project; in the future we should focus on the hardcoding part and the UI things
* we have some different themes and the mobile app UI; should have different setting options
* Test, and clear out the branches, whenever it is done. (Could be attached to the issue) 
* It could be attached. Make the PRs clear. 
* Do not make a PR to main rn until we clear out the bugs
  * make PR to v2.0.0, not main

Additional Discussion Notes:
* if user leaves a site or goes to a different chat, we can save the history when we detect this
* when they click on a different history, it will save what they have so far before it shows history 3
* when user loads onto page, grab local storage items and only update that variable
* we only load from/save to local storage when user enters/leaves page; while user is on page, store what they do in a state variable
  * do not constantly update local storage to keep it in sync with what the user is doing
* if we can't get it to work, we can keep saving to local storage since it is a negligible performance impact
* Are we moving forward with idea that you can't edit previous chat sessions?
  * yes
  * update we can do for settings (click settings, click dark theme, click save - saves to local storage)
