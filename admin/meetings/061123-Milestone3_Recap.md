# Milestone 3 Recap

**Team:** 3 (Powell's Pride Tech)

**Type of Meeting:** Showcase, reflective

**Time/Place:** Zoom, 2:30PM - 3:54 PM June 4, 2023
[Recording: Passcode -> &3DggbZ](https://ucsd.zoom.us/rec/share/P6PLNM_O7oZ8i6MLLS9mMUfFMiW-SAYwsHewMm0OIBe6PgBXuwzvSZG9y4lRszMb.HhN94JjHJ1Mg2XTi)

## Attendance

* Faith
* Nick
* Henry
* Mico
* Chaeyeon
* Michael
* Chris
* Jiaen
* Anh
* Dylan

## Agenda

Old Business
* Quick message from Malcolm (from Faith's interview)

New Business
* Mini demo of progress! (mimic tuesday checkin video)
* Celebrate highlights of milestone
* Review and close milestone issues; discuss what needs to be done BY TONIGHT (code freeze)
* Review and delegate Milestone 4

## Meeting Notes:

Interview with Malcom:
* He said we were his strongest team in terms of organizing and developing a solid product!!!

What we have so far for Milestone 3: 
* Version in `main` branch:
  * can go through chat and get fortune
  * there is no typing box; you click buttons instead
  * if you lose connection, there should be no issue with ChatGPT
  * also has dark theme implemented (but switch does not work in dark mode - this is fixed in v2.0.1 branch)
  * can see About Us page
  * can rename chats
  * can switch chats in side bar and create new chats
* Version in `v2.0.1` branch:
  * toggle is working
  * need to remove settings
  * there is a random bubble in the chat that is empty - need to make sure it is gone

What we implemented from Powell Feedback:


TODOS before code freeze:
* Any other ADR's? Powell had mentioned making some in our last meeting 
  * Henry will add some (e.g. why we did light/dark theme)
* Function headers (issue 88) - some of the function headers are inaccurate (e.g. header has parameters that are not in function, parameter data types in documentation don't match what function seems to expect) (will do in v2.0.1 branch)
  * Delegation: 
    * Faith
    * Dylan
    * Chay
  * Henry used ChatGPT to generate these docs, so we should use it to generate the docs today
    * ChatGPT sometimes makes random stuff, so we need someone to check it
  * Henry will fix it using ChatGPT and once he finishes, others can check (will be in `v2.0.1`)
* remember to remove settings button from v2.0.1 when merging to main! - fixed in meeting
* Fix the random empty bubble that appears in the chat - fixed in meeting
* Testing
  * end to end - need to fix bugs where stuff doesn't load
  * need to make sure tests work on CI/CD build pipeline (right now tests fail on it)
  * we should not do unit tests for ReadPalm() (and other things that do a lot with the DOM)
    * we take care of these with a puppeteer script
  * The ones that are tested, we can keep
    * if they don't pass, we try to fix them for 30 minutes and then delete them
  * Henry will do E2E script
  * Michael has a final - may hold back
  * Dylan can also help
  * Don't work on for more than an hour
  * I will delete (or comment out) any failing tests, then I will let people know
* ui-v2-dark - can delete that branch (deleted in meeting)
* issue 72:
  * Henry has been trying to fix it, but hasn't been successful
  * we will add it to 'known issues' in the README
  * normal people will probably not have to deal with it since it is not a very common use case
* If you go from normal palm reading to About Us, it switches from dark to light instead of keeping the theme
  * Anh will check it
* Create alert to tell user when leaving chat
  * only do this if we have time and it will be fast
  * will make it an issue though
  * Chris will try to fix it

Milestone 4
* [Milestone message in slack](https://cse-110-team-3-hq.slack.com/archives/C05BYF69L3U/p1686469360389369)
* Faith created Milestone 4 channel: https://cse-110-team-3-hq.slack.com/archives/C05BYF69L3U/p1686469360389369
  * **read this if you haven not**
* We are the first group to go Thurs!
* Faith will do the video, but she may need help editing (Mico will help with that)
* Final videos are due Wed, but Faith made earlier deadlines to leave time for editing
* For both videos, we need multiple people talking
* Tasks:
  * introduce team
  * do demo - Henry
  * do retrospective (#93) (2 people) - Chris, Michael, Faith
  * advice for next students (#94) (3 people) - Mico, Nick, Jiaen
* 93-94 - leave message in there about what you plan to share; due Mon 11:59 PM
* Private Video (#99): - contributions due Tues 5pm (preferred deadline) or by Tu midnight at the very latest
  * Each person must do a 30 second (max) intro in landscape
  * Repo tour (#95) - Henry
  * Agile Practices (#96) - (1-2 people) - Faith, Michael, Anh?
  * Next Steps (#97) - Mico, Dylan, Henry (quick quip on build path), Chay
* for all issues with multiple people, talk about what people will say before recording so there is no duplication
