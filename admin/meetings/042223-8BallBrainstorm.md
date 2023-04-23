# 4/22/2023 Meeting Notes (8-Ball Project Brainstorming)

**Team:** 3 (Powell’s Pride Tech)

**Type of meeting:** brainstorming

## Attendance (name listed if present):
* Mico
* Nick
* Jiaen
* Chaeyeon
* Anh
* Chris
* Michael
* Faith
* Dylan

**When/Where:** Zoom 4:30 PM - 5:56 PM on 4/22/2023

## Agenda:
* Go over project requirements on Canvas
* Discuss what direction we want to take the project and assign initial roles

## Meeting Notes:
* Ideas for how to proceed:
    * should start by establishing what we will research and basic aspects of the 8-ball app
        * need to figure out what features we want to put into it
* Should we buy ChatGPT plus?
    * it is $20
    * we are not expected to spend money
    * Jiaen is subscribed to ChatGPT plus
        * can generate code and then we can try to improve it
        * the point of this is to explore how we use the AI tools
* Have anyone tried other AI tools?
    * Bard
* Can use AI to generate images for website
* May be easiest to figure out how an 8-ball works and then translate it to how we will build it on a website
* Faith will make Google Slides so we can jot notes and paste pictures
* Mico pasted code from ChatGPT3 into chat - we can work with that
* **Brainstorming slides:** [https://docs.google.com/presentation/d/1d1kxv6KMosrcdN_mtuxBd-KzHd8hcqui-LANHAJvJoE/edit#slide=id.p](https://docs.google.com/presentation/d/1d1kxv6KMosrcdN_mtuxBd-KzHd8hcqui-LANHAJvJoE/edit#slide=id.p) 
* Faith is creating thread specific to this assignment: [https://cse-110-team-3-hq.slack.com/archives/C0533FNLZ5J/p1682207092021969](https://cse-110-team-3-hq.slack.com/archives/C0533FNLZ5J/p1682207092021969)
* We put ideas of what an 8 ball does in the slides
    * gives answer to arbitrary questions
    * answers are yes/no/maybe
* Will make new repository for 8-ball project (done)
* Dropping in examples into the slide show of 8-ball sites
* Looking at examples of generative AIs
    * Midjourney (25 free, then paid)
    * Bing (unlimited images)
* We generated a few apps in ChatGPT and played around with them
* Thinking about what requirements we need for the 8-ball
    * probably will not have audio unless we have time to do it
* How we are using ChatGPT to write code:
    * should we have a text box?
    * we will probably just ignore the user input
    * it does give an interactive component
* could make it so if you don’t change the question in the box, it gives an error (that says “ask something else”)
* could have delay/magic effects
* Need to create issues on GitHub for what features we want
* Need to figure out how to do testing and documentation first, before we add other features
* We will probably just use the one Jiaen generated using ChatGPT (already on GitHub) as baseline
* Unit tests:
    * need to test for valid input/error if blank
    * need to make sure it has a limit to the number of answers it can generate
* How to actually do unit tests:
    * For unit tests, usually use framework
        * but for this, we can’t use frameworks!
    * To Be Determined: how to do unit tests
* Issues:
    * we can use them to develop what we need to do for this
* We will have a text box
* We just need to test whether the button and the text box do what we want them to do
* For unit tests, we need a way to automate all the functionality of the site
* Will have text box
* need to add theme
* Features will be put on GitHub issues
    * will have Enhancement label
* E.g. Theme for website
    * lists possible themes
        * traditional 8-ball
        * brand theme (lions)
        * Powell fortune teller
    * Documentation:
        * function headers
        * comments in code
        * file headers

**Meeting Recording:** [https://drive.google.com/file/d/15V5d1H7RmmQEwmci2VfRsFWoTdqjmArA/view?usp=sharing](https://drive.google.com/file/d/15V5d1H7RmmQEwmci2VfRsFWoTdqjmArA/view?usp=sharing)

## Next Steps/Action Items:
* **Action:** We will brainstorm features we want to add, how we will implement unit testing, and templates for/how we will do documentation
  * We will post our ideas as issues in the issues section of the [8-Ball repository](https://github.com/cse110-sp23-group3/8-ball) (**not** the cse110-sp23-group3 repository). Please keep your conversations about these issues there.
  * everyone must contribute something to the issues section **by tonight**
  * feel free to put whatever you want - we will narrow things down and close out issues later
* tomorrow, we will: 
  * (in the morning) narrow down what we want to do (what features to do, finalize decisions on unit tests and documentation, etc.) and close any GitHub issues that are not needed
  * (in the morning) delegate work to people (over Slack)
  * (throughout the day) Have people do their assigned tasks. Tasks are due by the start of the day Monday
* Monday:
  * we will finalze the app and make the presentation and demo video
