import {Component, OnInit} from '@angular/core';
import {WeatherService} from './weather.service';
import {Subject} from 'rxjs/Rx';
import {Weather} from './weather';
import {close} from 'fs';


@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})
export class WeatherSearchComponent implements OnInit {
    errorMessage: string;
    weatherForecastData: any[];
    disabledForecastButton: boolean = true;
    cityName:string;

    constructor(private _weatherService: WeatherService) {
    }

    ngOnInit() {

    }

    onSubmit(cityName: string) {
        console.log(cityName);
        /*    if (this.cityName == null){*/
        this._weatherService.getWeatherForecast(cityName)
            .subscribe(data => {this.weatherForecastData = data},
                error =>  this.errorMessage = <any>error,
            );
    }
    //}


    onSearchLocation(cityName:string) {
        this.disabledForecastButton = false;
        console.log(cityName);
    }

    onSubmitDatabinding() {

        console.log("inside the two way:"+ this.cityName);
        this._weatherService.getWeatherForecast(this.cityName)
            .subscribe(data => {this.weatherForecastData = data},
                error =>  this.errorMessage = <any>error,
            );
        this.onResetControls();

    }

    onSearchLocationWithEvent(event:Event) {
        //console.log("Complete event data value: "+ event);
        console.log("Control value: "+ (<HTMLInputElement>event.target).value);
        this.cityName = (<HTMLInputElement>event.target).value;
        this.disabledForecastButton = false;
    }

    onResetControls(){
        this.cityName = '';
        this.disabledForecastButton= true;

    }


}
