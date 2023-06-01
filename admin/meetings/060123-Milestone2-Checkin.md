# Milestone 2 Midway Check In

**Team 3:** Powell's Pride Tech

**Type of Meeting:** check-ins

**Time/Place:** Zoom, June 1, 2023 4:00 PM - 4:30 PM

## Attendance:

* Nick
* Chris
* Dylan
* Michael
* Anh
* Chaeyeon
* Faith
* Henry
* Jiaen
* Mico

## Agenda:

* Have everyone share...
  * what parts of Milestone 2 are you working on?
  * what is your progress?
  * what do you hope to have done by Saturday?
* ...regarding the four parts of Milestone 1 (CRUD functionality, UI, CI/CD, documentation)

Notes:
* Faith:
    * set up milestone
    * worked on UI (talked about fonts)
    * suggestion: change one of the fonts for the UI and possibly the color theme
        * right now it does not look quite lion king themed
        * we are also catering towards adults -> we may want to make it look a bit more adult-like
        * should have new fonts/colors for theme by tonight
    * By Sat: will keep track of issues and focus on UI/prep for final milestone
* Mico:
    * has not made any progress since has project due tonight
    * will look over issues
    * will send message by tomorrow 1pm saying what he is working on
* Jiaen:
    * has a final project due this weekend and a presentation next Tuesday; has spent lot of time on that
    * towards weekend, should be able to help with UI
    * not sure what parts we need to focus on; may talk with Faith about it after this meeting
* Henry:
    * looked over new changes for CRUD functionality and found bugs with chat (e.g. sending stuff when you are not prompted to send anything causes 405 error)
        * will fix this bug, but also has other class HW
    * also working on CRUD functionality
        * right now, we only have 3 histories
        * goal is to get that to work at end of milestone
    * Go back functionality:
        * maybe we can let users edit their last response, but would have to change a lot of stuff
        * e.g. would have to store overall fortune in an array as opposed to a string since you can’t rewrite it
    * will try to get these things done by end of milestone
    * should feel free to delegate as well
* Nick:
    * working on about us page
        * will hold off until we get theme stuff settled to avoid merge conflicts
        * Faith will put notes on fonts into the UI discussion issue; keep an eye on that tonight
    * add disclaimer as message after the bugs are fixed in the script
    * made documentation updates; pull request needs approval and then can be merged
* Michael:
    * will do some of the UI to make it look better
    * will we replace background?
        * we probably should - Faith will make post on that when sends new colors
        * we can add that as an issue
* If people have suggestions, put them in tonight so we can have the changes ready by tomorrow (put in issue 46)
* Anh
    * working on kind of everything at the moment
    * made slack post about what we are working on - if you have any thoughts or comments, put them on the issues so people know what we are working on
    * By Saturday: wants to merge all conflicts and pull requests and make tasks for UI stuff; people should consider what we will do today/tomorrow
    * also talked about design system - can we have a design system for the Figma and for CSS? (to make everything consistent)
        * posted in the UI part
    * might be good to make that, but not sure how long it would take
    * if it helps us make changes easier, would be good
    * we are doing this for the CSS part, but we need to keep it consistent for the whole component
    * Action: If you are working on UI, look at what Anh posted about this and leave an opinion
* Dylan:
    * history functionality
    * turned previous branch back into using keys as dates and made it dynamically create buttons (can have unlimited chats in history)
    * only problem: if you are in the middle of one chat and switch to a past one, it messes up the chat (keeps following the previous chat you were on)
        * Henry will work on fixing this
    * rebuilding chat to see past one works fine
* Chaeyeon:
    * Working on UI part (issues, updating our code)
    * added Simba picture
    * also has been updating Figma in terms of design changes
    * will add theme for body by Saturday
    * hold off on implementing it until we get approvals from people
* Chris:
    * working on issue 24 (chat reversibility)
    * may start over because of new version; asking about if still need this functionality
    * Henry and Chris will communicate so he does not need to start over

## Action Items:

* Try to leave comments/opinions (takes like 15 minutes) about issues on GitHub at the very least (if you are busy with other stuff)
* try not to work in silence; if you make changes or have opinions, put them on the GitHub
    * and mention in Slack that you left a message on GitHub as well
* Submit a blurb for About Us page to issue [#31](https://github.com/cse110-sp23-group3/cse110-sp23-group3/issues/31)
* Look at Faith's new theme ideas (to be posted tonight) and submit any comments on it
* Try to add any new suggestions for theme to issue [#46](https://github.com/cse110-sp23-group3/cse110-sp23-group3/issues/46) by tonight
* If you are working on UI, look at what Anh said about the [design system](https://github.com/cse110-sp23-group3/cse110-sp23-group3/issues/46#issue-1735613222) and leave your comments about it
