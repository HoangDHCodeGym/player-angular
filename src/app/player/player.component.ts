import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  audio: HTMLAudioElement;
  interval;

  static timeConverter(time: number): string{
    const seconds = Math.floor(time % 60);
    const minutes = Math.floor( time / 60);
    return minutes + ':' + seconds;
  }

  constructor() { }

  ngOnInit() {
    this.audio = new Audio('http://www.tegos.ru/new/mp3_full/Adele_-_Rolling_In_The_Deep.mp3');
    }

  clickPlayBtn(): void {
    const playBtn = $('#playBtn');
      if (playBtn.hasClass('fa-play')) {
        this.audio.play();
        playBtn.addClass('fa-pause')
        playBtn.removeClass('fa-play');
        $('#song_duration').text(PlayerComponent.timeConverter(this.audio.duration));
        this.setCounter();
      } else {
        this.audio.pause();
        playBtn.addClass('fa-play')
        playBtn.removeClass('fa-pause');
      }
  }

  setCounter(): void {
    const audio = this.audio;
    const self = this;
    this.interval = setInterval(function() {
      $('#running_time').text(PlayerComponent.timeConverter(audio.currentTime));
      $('#timeLine').val(Math.floor(audio.currentTime / audio.duration * 100));
      if (audio.currentTime === audio.duration) {
        clearInterval(self.interval);
        self.clickPlayBtn();
      }
    }, 1000);
  }

  skipTo(timeLineValue: number): void {
    console.log(timeLineValue);
    this.audio.pause();
    this.audio.currentTime = Math.floor(this.audio.duration * timeLineValue / 100);
    console.log(this.audio.currentTime);
    clearInterval(this.interval);
    this.setCounter();
    this.audio.play();
  }
}
