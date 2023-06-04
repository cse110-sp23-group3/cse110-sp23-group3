# Milestone 2 

**Team:** 3 (Powell's Pride Tech)

**Type of Meeting:** Showcase, reflective

**Time/Place:** Zoom, 3:00PM - 3:40 PM June 4, 2023

## Attendance

* Faith
* Nick
* Michael
* Mico
* Chaeyeon
* Henry
* Jiaen
* Dylan
* Chris
* Prof. Powell
* Anh

## Agenda

New Business
* Mini demo of progress! (mimic tuesday checkin video)
* Get input from Powell
* Celebrate highlights of milestone
* Review and close milestone issues (Tuesday demo issues); discuss what needs to be done from here 

## Notes:
* Highlights of milestone
What went well? Cool things you liked. Highlight ppl :D

* Review and close milestone issues
Tuesday we need to have a prototype, so some things may need to be added over the weekend. List below

## Meeting Notes:

What we have so far for Milestone 2:
* App gives you intro and asks if want to read palm.
* You pick the line (later we will add a picture of the line)
* You describe your palm line and it givesw a response to you.
* At the end, you can choose to either continue or not, and if you don't, it gives you your whole fortune.
* Right now, we are struggling to make the CRUD work. It is harder with dynamic outputs.
* We tried to make it save fortune telling sessions like ChatGPT.

Powell Feedback:
* Our settings could be the CRUD - we don't really have to save the chats.
* It is hard to protect against prompt injection in ChatGPT.
* Some ideas to improve:
  * Need to figure out what the app does when the ChatGPT api is down
  * Need to set a timeout - if you don't get an answer within that time, default with a different message.
* There is a lot to tighten up with what we have (e.g. what to do if we are offline or slow)
* Could also build a simple local if-then statement approach that does minor things but says "I don't feel really strongly about this."
  * e.g. if we know what the heart line means, we don't need to ask ChatGPT - we can have a canned response!
  * could also ask ChatGPT once and then just hard code that response into the app.
* Magicians don't really do magic - they have spent a lot of time thinking about and practicing the illusion so it works.
* We could use ChatGPT to generate enough answers and then save them to a file/array and then just pull from that file.
* It may not be reasonable to go to the API in real time.
* If you do this, though, you may not want to do freform responses.
* If we decide to do freeform, we must document that in the ADR and show that we thought of contingencies for when things go wrong (e.g. API down) and did good engineering practices.
* UI comments:
  * Simba is the character, who is telling the fortune - we have a profile picture
  * Use different color for disclaimer vs. chat text
  * Try to distinguish between what is the character talking
  * Maybe grey out "yes" button to make it more clear that "yes" was picked
  * New chat buttons: they look like buttons
    * better to make them text
    * if it went to that session, it might be better as a link than a button
    * Settings needs a gear icon and should be at bottom
    * new chat button should be bigger with an icon
    * when you do buttons, you want to have multiple affordances for what it does (at least 2)
      * e.g. New Chat text, "+" icon = 2 affordances
  * Chat box is a bit too small - make it bigger and center it so it is only under the chat area (not under sidebar)
  * Extend side bar all the way to bottom of screen
  * Right now, the interface is kind of tight (e.g. Powell's Pride Palm Reading) - add ~0.5em around it
  * Pretend you have low vision (squint) and see if you understand the UI
* New UI:
  * still need chat bar to be below chat
  * The font looks nicer too
  * CRUD - let user choose theme/font in settings (dark theme, light theme, lion king theem, settings, etc.)
* Don't overthink the CRUD requirement - think about what is important to the user
  * The most important part of the course is the process of engineering, not what the CRUD does
  * Think about what is the minimum version where the user is satisfied
* Other feedback:
  * we are one of the few going to ChatGPT - have fallback if it is slow or down
  * If have prompt injection issues, acknowledge it as a know bug, and show you are thinking about it
    * it is fine to have deficiencies in your system, but don't pretend they don't exist
    * think about if using freeform text is worth all the trouble for what it gets us
* We should make our app work offline
  * the network/api is not really under our control (e.g. UCSD wifi)
  * It is possible to make the app so it has limited functionality offline but better functionality online
  * when we monitor, we find the network fails much more than we might think - we need to be honest about when things fail
* Can ask something like "Would you like me to access the internet to give you more info?" (but theme it more like fortune telling)
  * As a dev, we are in charge of the user's involvement with the software, so we need to keep them from hurting ourselves
  * Could also just automatically check the cloud and then do something to keep the illusion up if network is down
* We are doing good by molding our ideas as opposed to just picking an idea and going with it.
* Other advice:
  * there is no right answer for the UI - do what feels right
  * you don't need to do a Zoom for feedback; you can send Prof. Powell a DM
  * talk with friends and have them play with app too - if they can't use it, you did it wrong
  * Ask Malcom for help if need it

What we will do moving forward:
* We should make the app work offline
* Seeing the past histories and changing the chat is a big problem - we should get rid of this
* Once you are done with a chat, you should not be able to update it
* We would not have update for chat part - just create, read, delete
* For settings, user can update
* For offline, we can give user selection of options by default (wavy, long, curvy, etc.) and have a hardcoded thing
  * ask user if want more details and ping endpoint
  * if endpoint gives bad response, say it is not available
* We could also let user rename their past chats (that is update and is way easier)
* We can have a basic settings: dark theme, light theme, advanced vs. basic
  * advanced does basic, but then asks user if they want an advanced reading (via AI), basic just uses hardcoded

Milestone 1 Issues that can be closed:
* Can close set format for documentation (I will close it)
* need someone to start with puppetteer (get it set up)
* we can generate unit tests with ChatGPT
* Website layout/wireframe (#21) - we will close it
* All those bug ones: Henry will close once he gets new functionality working
* About Us: Nick will finish today and then close issue
* User Mistakes - don't let user do this
* GitHub pages - there is not really a way to get it to show index.html as the homepage
  * we will leave this open for now - there may be a way to fix it in the GitHub actions

