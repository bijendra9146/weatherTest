import { Component, OnInit } from '@angular/core';
import { shardService } from './shardService.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
// declared two global variable to handle the Api Response 
  responseObject;
  responseData;

  constructor(private _shardService: shardService) {

  }

  ngOnInit() {
    //used that instaance to access global variable inside service method.
    var that = this;
// called Api throw service provider using method called getWeeklyWeatherData. 
    this._shardService.getWeeklyWeatherData().subscribe(function (weatherReportObject) { //weatherReportObject is a call back object got response from API
      console.log("Response from service", weatherReportObject)
      
      var uniqueDateObject; // this local variable is used to handle unique Date in object. 
      var arrayData = []; // this local variabel is used to handle Data in array. 
      var weekForcast = []; // In tis you will get acctual data (date and temp)
      var uniqueDate = [];  // In thus you will get unique Dates.

      that.responseObject = weatherReportObject; // responseObject is handling response object
      var weatherReportList = that.responseObject.list; // list contains weekly wise data including every 3 hours of weather report per day 
   
      weatherReportList.map(function (everyDate, index) { // Usd map function itterate all element and remove time and pick date from every index
        arrayData.push({ // inserting data into array using push method 
          date: everyDate.dt_txt.slice(0, 10), // slicing the data and inserting date 
          temp: everyDate.main.temp // inserting temp of every element.
        })
        return arrayData;
      })

      uniqueDateObject = new Set(arrayData.map(everyData => {  //using SET function sortng duplicate Date from arrayData and inerting unique date to uniqueDateObject. 
        return everyData.date;
      }));

      uniqueDateObject.forEach(element => { // here I converting object into uniqueDate Array so I can eassly manipulate data. 
        uniqueDate.push(element)
      });

      for (var i = 0; i < arrayData.length; i++) { // some Loops to manipulate data in the formate I want 
        if (i < uniqueDate.length) {               // i.e [{date:Value, temp:value},{date:Value, temp:value}]   
          for (var j = i; j < uniqueDate.length; j++) { // so i used two loop because I have two different Arrays One for unique Date and one for Temprature
            weekForcast.push({
              date: uniqueDate[j],
              temp: Math.round(arrayData[i].temp)
            })
            i++
          }
        } else {
          console.log("Duplicate Dates ");
        }

      }

      that.responseData = weekForcast;
      console.log("Response of that.responseData", that.responseData);




    })


  }



}
