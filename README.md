USER STORIES
- user is presented with two options on page load: START and LEADERBOARD
    <img src="./whiteboard/startscreen.png" />
- on 'START', selection screen begins
    <img src="./whiteboard/selectscreen.png" />
- user presented with opening selection screen to choose their avatar
- once selected, button pops up to confirm? 
    <img src="./whiteboard/confirmplayerscreen.png" />
- on click of confirmation button, gameLoop begins
    <img src="./whiteboard/playscreen.png" />
- Reset button shows up at the bottom
- If clicked, reset button takes the player back to the START and LEADERBOARD screen
- premise of the game is you control a lil corgi dog that has to "collect" sheep
- it's a time trial! you're competing against yourself! 
- final timer marks are saved to a High Score leaderboard?
- game is played on Canvas (html)
- background of image is going to be a bucolic pixel art background image
- player controls their little avatar using WASD keydown
- on spacebar keydown, 'bark' soundeffect will trigger. (no purpose to it, just fun!)
- 10 sheep will be populated on the map (randomly????)
- on collision of sheep and corgi, the sheep will BAAA (trigger baa sound effect), jump up and down(?), and then fade away in 5sec (to return home)
- once all 10 sheep have been collected: win condition TRUE; 'YOU WON!' message shows up, (player sprite idle animation plays)
<img src="winscreen.png" />
- player score is added to leaderBoard (if within lowest 10 timer #s)
- OnScreen will also be displayed two buttons: PLAY AGAIN and VIEW LEADERBOARD
- PLAY AGAIN takes player to selection screen, same as start
- VIEW LEADERBOARD takes player to leaderboard, which has lowest scores (total leaderboard scores >= 10 scores)
<img src="leaderboard.png" />

STRETCH GOALS:
// Wolf that chases you that you need to avoid!
    // stretch goal: be able to set difficulty by increasing movement speed for wolf!
    // on collision of wolf and corgi, 'snarl' sound effect will trigger and the player's time will have 5 seconds added to it!
// PERSISTENT LEADERBOARD (https://blog.logrocket.com/localstorage-javascript-complete-guide/)
// animate sprites through movement frames

TECHNOLOGIES USED:
- HTML, CSS, JavaScript

APPROACH TAKEN:
- Set up gameLoop to handle animation

ATTRIBUTION:
Sheep asset courtesy: https://bobkatt.itch.io/
Background music courtesy: https://soundcloud.com/alexandr-zhelanov (https://opengameart.org/content/casual-game-track)
Corgi sprites courtesy: https://angryelk.itch.io/animated-corgi-sprite
Background image tileset courtesy: https://ojas-sabadra.itch.io/pixelworld 

