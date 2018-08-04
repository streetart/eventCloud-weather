import { Component, OnInit } from '@angular/core';
import { Animation } from '@angular/animations/browser/src/dsl/animation';

@Component({
  selector: 'app-weekly-graph',
  templateUrl: './weekly-graph.component.html',
  styleUrls: ['./weekly-graph.component.scss']
})
export class WeeklyGraphComponent implements OnInit {
    private currentFrame: any;
    private easing: any;
    private i: number;

  constructor() { }

  ngOnInit() {
      // list all keyframes here
      let key1 = document.querySelector( '.morph-key--1' ).getAttribute('d').match(/[a-zA-Z]+|[+-]?[0-9.]+/g);
      let key2 = document.querySelector( '.morph-key--2' ).getAttribute('d').match(/[a-zA-Z]+|[+-]?[0-9.]+/g);
      let key3 = document.querySelector( '.morph-key--3' ).getAttribute('d').match(/[a-zA-Z]+|[+-]?[0-9.]+/g);

      let playByTime = 'true';
      let loopTimeline = 'true';

//easing:
      let linear = 1;

//define for each keyframe: from, to, time, easing
      let timeline = [
          [key1, key1, 1, linear],
          [key1, key2, 2, linear],
          [key2, key2, 1, linear],
          [key2, key3, 2, linear],
          [key3, key3, 1, linear],
          [key3, key1, 2, linear]
      ];

      let timelineLength = timeline.length;

      let saveTimeline = [];

      for (let i = 0; i < timelineLength; i++) {
          saveTimeline.push([]); //creates an array to later push frames into
          renderAnimation(timeline[i], i);
      }

      let time = 1; //in seconds with 30 fps
      let start = '';
      let end = '';

      function renderAnimation(parameter, timelineNumber) {
          start = parameter[0];
          end = parameter[1];
          time = parameter[2];
          this.easing = parameter[3];

          calculator(timelineNumber);
      }

//CALCULATOR CALCULATOR CALCULATOR CALCULATOR CALCULATOR CALCULATOR CALCULATOR CALCULATOR CALCULATOR
      function calculator(timelineNumber) {
          let letter = '';

          let newPath = []; //passed into applyChange as d

          function applyChange(d){
              saveTimeline[this.i].push( d );
          }

          function calculateDifference(p1, p2, i){
              if (isNaN(p1)) { //is not a number
                  if (p1 === 'z' || p1 === 'Z') { // z Z won't be saved as letter but passed directly
                      return p1;
                  } else { //saving the current letter to be added to next number
                      letter = p1;
                      return 'skip';
                  }
              } else {
                  if (p2 > p1){
                      let addThis = (p2 - p1) / (30 * time) * (this.currentFrame);
                      let addLetter = letter;
                      letter = '';
                      return (addLetter + '' + (Number(addThis) + Number(p1)));
                  } else {
                      let subtractThis = (p1 - p2) / (30 * time) * (this.currentFrame); //if p1 = p2 -> this line = 0
                      let addLetter = letter;
                      letter = '';
                      return (addLetter + '' + (Number(p1) - Number(subtractThis)));
                  }
              }
          }

          function loop(){
              for (let i = 0; i < start.length; i++){
                  let newPoint = calculateDifference(start[i], end[i], i);
                  if (newPoint ! == 'skip') {
                      newPath.push(newPoint);
                  }
                  if (i == (start.length - 1)) {
                      applyChange(newPath);
                      this.currentFrame = (this.currentFrame + 1);
                      newPath = [];
                  }
              };
          }

          let frames = (time * 30);

          for (let counter = 0; counter < frames; counter++) {
              this.currentFrame = counter;
              loop();
          }
      }

//PLAYBACK PLAYBACK PLAYBACK PLAYBACK PLAYBACK PLAYBACK PLAYBACK PLAYBACK PLAYBACK
      let pf = 0;
      let keyCount = 0;

      if (playByTime == 'true') {
          let play = setInterval(function() {
              document.querySelector( '.morph-key--1' ).setAttribute('d', saveTimeline[keyCount][pf].join(' '));
              pf++;
              if (pf == saveTimeline[keyCount].length) {
                  if (keyCount >= (timelineLength - 1)) {
                      if (loopTimeline == 'true') {
                          pf = 0;
                          keyCount = 0;
                      } else {
                          clearInterval(play);
                      };
                  } else {
                      pf = 0;
                      keyCount++;
                  };
              };
          }, 1000 / 30); // 30 times per second -> 30fps
      };

  }

}
