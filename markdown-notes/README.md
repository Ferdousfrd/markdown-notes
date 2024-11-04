# App Notes

### history :
Doing Scrimba React course for free. Came accross this notes project. It was half built with bugs. So working on them to fix the bugs and implement some new features.

### Bugs and New Features :

1. First of all, had a hard time running it in my local machine. Dependencies did not match since i have react 18v and all the packages it has are for 17. So had to downgrade to 17 first. Then install all the packages like mde ,splt, showdown, etc.

2. Then the App was not in sync with local storage. On refresh all data was gone. So synced it in with local storage. Also had to add lazy state so it doesn't call local storage every rendering. Later we will use firebase. 

3. Added functionality to bump up the last edited note on top of the list for better UX.

4. Added a delete button to delete notes.


# Notes to myself (developer)

Go thorough the codes again and add comments for better understanding. Understand the logics. Ymmaarraa!!!!!"
= Done twice :3

### Update 
Went through the code. changed currentNote function to variable since its easier. React 18 update doesn't work with ild reactMd. So either use react 17 with old md library or 18 where i have to create the heading o reditor. Going with the v17.


## Notes on updates or new features made : 
...
1. Bug fixing :
At first the project main bug was on refresh it didnt save or store any data. So added localstorage to save data. Added lazy state initialization so app doessnt call localstorage every key stroke or every single state change.

2. New features :
Deleting note and bump the recent updated note on top by sorted.
Added deleteNote function with noteId parameter. Filtered out the notes that doesnt match the id. Also used event.stopPropagation() so the prevent from parent enevt handler to occur.

3. Firebase cloud storage : to replace localstorage
Created an app in firebase website and a db instance. Copied the configuration and did the setup.

- used onSnapshot to sync the firebase and our app ui. we dont want 2 kinds of truth. onSnapshot gets trigered when something changes and under the hood it send signal to our db in firebase and if successful the changes things if not that means nothing change n db so it will prevent any changes in local UI.

- addDoc to create and push new note to or db. deleteDoc to delete the note with the given id in parameter. sertDoc to update a note.

- sorted the notes from recent updated ro old ones by adding created at and update at time.s

4. Debouching :
Since we are sending requests to firebase every single stroke, its a lot. To control it we can try Debouncing method to delay the request for specified amount of time. For example, it will delay 500 mili second when we send request to firebase. in these 500 ms if another req happens then it will stop that and reset the 500 ms. This until we stop typing and 500ms passes without any signal, the request will go trough.



### new features i wanna work on
- download the  note file to my local system or email it somewhere
- make it an extension for chrome
- try to put it in google store

# implementing download the  note file to my local system or email it somewhere
1. first added the button in Editor component. Depending on the showDownoadOption stat, the button will toggle between Download btn and .txt or .pdf options btns.
2. 