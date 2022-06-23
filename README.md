<h1>COUNTING SHEEP: A HERDING TALE</h1>
<h2>USER STORY</h2>
<ul>
<li>User is presented with two options on page load: START and LEADERBOARD</li>
    <img src="./whiteboard/startscreen.png" />
<li>on 'START', selection screen begins</li>
    <img src="./whiteboard/selectscreen.png" />
<li>user presented with opening selection screen to choose their avatar</li>
<li>once selected, button pops up to confirm?</li>
    <img src="./whiteboard/confirmplayerscreen.png" />
<li>on click of confirmation button, gameLoop begins</li>
    <img src="./whiteboard/playscreen.png" />
<li>Reset button shows up at the bottom</li>
<li>If clicked, reset button takes the player back to the START and LEADERBOARD screen</li>
<li>premise of the game is you control a lil corgi dog that has to "collect" sheep</li>
<li>it's a time trial! you're competing against yourself! </li>
<li>final timer marks are saved to a High Score leaderboard?</li>
<li>game is played on Canvas (html)</li>
<li>background of image is going to be a bucolic pixel art background image</li>
<li>player controls their little avatar using WASD keydown</li>
<li>on spacebar keydown, 'bark' soundeffect will trigger. (no purpose to it, just fun!)</li>
<li>0 sheep will be populated on the map (randomly????)</li>
<li>on collision of sheep and corgi, the sheep will BAAA (trigger baa sound effect) and disappear.</li>
<li>once all 10 sheep have been collected: win condition TRUE; 'YOU WON!' message shows up, (player sprite idle animation plays)</li>
<img src="./whiteboard/winscreen.png" />
<li>player score is added to leaderBoard (if within lowest 10 timer #s)</li>
<li>OnScreen will also be displayed two buttons: PLAY AGAIN and VIEW LEADERBOARD</li>
<li>PLAY AGAIN takes player to selection screen, same as start</li>
<li>VIEW LEADERBOARD takes player to leaderboard, which has lowest scores (total leaderboard scores >= 10 scores)</li>
<img src="./whiteboard/leaderboard.png" />
</ul>

<h2>STRETCH GOALS:</h2>
<ul>
<li>Wolf that chases you that you need to avoid!</li>
<ul>
    <li>stretch goal: be able to set difficulty by increasing movement speed for wolf!</li>
    <li>on collision of wolf and corgi, 'snarl' sound effect will trigger and the player's time will have 5 seconds added to it!</li>
    </ul>
<li>PERSISTENT LEADERBOARD (https://blog.logrocket.com/localstorage-javascript-complete-guide/)</li>
<li>animate sprites through movement frames in-game</li>
</ul>

<h2>TECHNOLOGIES USED:</h2>
<ul>
<li>HTML, CSS, JavaScript</li>
</ul>

<h2>APPROACH TAKEN:</h2>
<ul>
<li>Set up gameLoop to handle animation</li>
</ul>

<h1>ATTRIBUTION:</h2>
<ul>
<li>Sheep asset courtesy: https://bobkatt.itch.io/</li>
Background music courtesy: https://soundcloud.com/alexandr-zhelanov (https://opengameart.org/content/casual-game-track)</li>
<li>Corgi sprites courtesy: https://angryelk.itch.io/animated-corgi-sprite</li>
<li>Background image tileset courtesy: https://ojas-sabadra.itch.io/pixelworld </li>
</ul>

