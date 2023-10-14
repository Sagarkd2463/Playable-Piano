const pianoKeys = document.querySelectorAll(".piano-keys .key"),
      volumeSlider = document.querySelector(".volume-slider input"),
      keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
audio = new Audio(`tunes/a.wav`); // by default audio is set to {a} tune

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`; // audio source wiil now be based on key pressed
    audio.play(); // playing audio 

    const clickedKey = document.querySelector(`[data-key="${key}]`); // getting the clicked element
    clickedKey.classList.add("active"); // adding active class to the clicked key

    setTimeout(() => {
        clickedKey.classList.remove("active"); 
        //removing active class after 150ms from clicked key
    }, 150);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key); // // adding data-key value to the allKeys array
    // calling playTune function with passing data-key value as an argument
    key.addEventListener("click", () => {
        playTune(key.dataset.key);
    });
});

const handleVolume = (e) => { // passing the range slider value as an audio volume
    audio.volume = e.target.value;
}

const showHideKeys = () => { // toggling hide class from each key on the checkbox click
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKeys = (e) => { // if the pressed key is in the allKeys array, only call the playTune function
    if(allKeys.includes(e.key)) {
        playTune(e.key)
    }    
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);

document.addEventListener("keydown", pressedKeys);