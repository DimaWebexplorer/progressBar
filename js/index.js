class Progress { //It's a class that stores the state of the progressbar and works with an abstract ProgressBar, which has a set of standard methods
    constructor(progressBar, value) {
        this._progress = (value) ? ((value > 100) ? 100 : value) : 0;
        this._isHidden = false;
        this._isAnimated = false;
        this._progressBar = progressBar;
        this._progressBar.setProgress(this._progress);
        this._progressBar.setHidden(this._isHidden);
        this._progressBar.setAnimated(this._isAnimated);
    }

    set progress(value) {
        this._progress = value > 100 ? 100 : value;
        this._progressBar.setProgress(this._progress);
    }

    get progress() {
        return this._progress;
    }

    set isHidden(value) {
        this._isHidden = value;
        this._progressBar.setHidden(this._isHidden);
    }

    set isAnimated(value) {
        this._isAnimated = value;
        this._progressBar.setAnimated(this._isAnimated);
    }
}

class ProgressBar {
    constructor() {
        this._progressBar = document.querySelector('.progress-bar');
        this._progressCicle = document.querySelector('.circle__progress');
        this._circleLenght = Math.PI * this._progressCicle.r.animVal.value * 2;
        this._progressCicle.style.strokeDasharray = this._circleLenght;
        this._progressCicle.style.strokeDashoffset = this._circleLenght;
        this._progressCicle.style.transition = 'stroke-dashoffset 1s linear';
    }

    setProgress(value) {
        this._progressCicle.style.strokeDashoffset = ((100 - value) / 100) * this._circleLenght;
    }

    setHidden(value) {
        this._progressBar.style.opacity = value ?  '0' : '1';
    }

    setAnimated(value) {
        this._progressBar.style.webkitAnimationPlayState = value ? 'running' : 'paused';
    }
}

const progress = new Progress(new ProgressBar(), document.querySelector('.progress-nav__input').value);

// Event listeners for inputs and toggles
const progressInput = document.querySelector('.progress-nav__input');
const isAnimated = document.querySelector('.progress-nav__checkbox-input_animated');
const isHidden = document.querySelector('.progress-nav__checkbox-input_hidden');

progressInput.addEventListener('input', (event) => {
    progress.progress = event.currentTarget.value;
    event.currentTarget.value = progress.progress;
});

isAnimated.addEventListener('change', (event) => {
    progress.isAnimated = event.currentTarget.checked;
});

isHidden.addEventListener('change', (event) => {    
    progress.isHidden = event.currentTarget.checked;
});
