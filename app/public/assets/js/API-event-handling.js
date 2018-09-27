// Code here handles queries for specific city census data in the database
// In this case, the user submits a city name. That city name is passed as a
// URL parameter in our AJAX GET call. Our server then performs the search to grab that city from the Database.

// when user hits the city-search-btn
$("#search-btn").on("click", function () {
  event.preventDefault();
  
  // Saves the search value from the city-search bar into a variable.
  let searchedCity = $("#city-search")
    .val()
    .trim();

  // Using a RegEx Pattern to remove any spaces from searchedCity
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  searchedCity = searchedCity.replace(/\s+/g, "").toLowerCase();

  // Splits search variable at the comma, seporating city and state into an array of two seperate strings.
  searchedCity = searchedCity.split(",");


  // Re-defines search variable as single string, joining each string with a wildcard character '&' in between (because we cannot pass a comma into the AJAX URL for our API).

  searchedCity = searchedCity[0] + "&" + searchedCity[1];

  // run an AJAX GET-request for our servers api,
  // including the user's search criterion in the url
  $.get("/api/" + searchedCity, function (data) {
    // log the data to our console
    console.log(data);
    // empty to test-data-dump section bexfore adding new content
    $("#test-data-dump").empty();
    // if the data is not found in the DB, then return the following error message on the page:
    if (!data) {
      $("#test-data-dump").append("<h2> Hmmm... No data was returned from database. Try another city. </h2>");
    } else {
      // otherwise, append the search result data to the test-data-dump div at the bottom of the page:
      // $("#test-data-dump").append("<h2>" + data.Areaname + "</h2>");
      // // Example Data Set #1
      // $("#test-data-dump").append("<h3>Data Set #1: " + data.STCOU + "</h3>");
      // // Example Data Set #2
      // //$("#test-data-dump").append("<h3>Data Set #2: " + data.PST100209D + "</h3>");
      // // otherwise
      // // append the character name
      // $("#test-data-dump").append("<h2> City Name:"+ data.areaname + "</h2>");
      // // the role
      // $("#test-data-dump").append("<h3>State and County #: " + data.stateCounty + "</h3>");
      // // the age
      // $("#test-data-dump").append("<h3>Total Population: " + data.totalPopulation + "</h3>");
      // $("#test-data-dump").append("<h3>Data Set #2: " + data.PST100209D + "</h3>");
      

      // General side bar graph (blue) clearing then appending new data
      $(".bar-fill").remove();
      // Removing all custom stats
      $(".removeCustomStat").remove();

      // General Population Statistics
      // We need to calculate the percentage of pop under 18, so we'll divide total amount of ppl under 18 by the total population
      const mathPercentPopulationUnder18 = Math.round(data.populationUnder18 / data.totalPopulation);
      $("#textPercentPopulationUnder18").append(`<h4 class="removeCustomStat">${mathPercentPopulationUnder18}%</h4>`);
      $("#graphPercentPopulationUnder18").append(`<span class="bar-fill" style="width:${mathPercentPopulationUnder18}%;"></span>`);

      $("#textPercentPopulationOver65").append(`<h4 class="removeCustomStat">${data.populationOver65}%</h4>`);
      $("#graphPercentPopulationOver65").append(`<span class="bar-fill" style="width:${data.populationOver65}%;"></span>`);

      // Calculate a city's percentage of families below poverty level
      const mathFamiliesBelowPovertyLevel = Math.round(data.familiesBelowPovertyLevel / data.totalPopulation);
      $("#textFamiliesBelowPovertyLevel").append(`<h4 class="removeCustomStat">${mathFamiliesBelowPovertyLevel}%</h4>`);
      $("#graphFamiliesBelowPovertyLevel").append(`<span class="bar-fill" style="width:${mathFamiliesBelowPovertyLevel}%;"></span>`);
      
      // Creating a container for displaying the mean and median incomes into their bar graph
      const mathMeanFamilyIncome = (Math.round(data.meanFamilyIncome / 1000));
      $("#textMeanFamilyIncome").append(`<h4 class="removeCustomStat">$${mathMeanFamilyIncome}K</h4>`);
      
      // Doing the same for the median income and unemployment
      const mathMedianFamilyIncome = (Math.round(data.medianFamilyIncome / 1000));
      $("#textMedianFamilyIncome").append(`<h4 class="removeCustomStat">$${mathMedianFamilyIncome}K</h4>`);
      $("#textUnemploymentRate2010").append(`<h4 class="removeCustomStat">$${data.unemploymentRate2010}%</h4>`);
      $("#graphUnemploymentRate2010").append(`<span class="bar-fill" style="width:${data.unemploymentRate2010}%;"></span>`);

      //Clear the previous content
      $(".bar").remove();
      // Amending political party vote data to their IDs in index.html
      $("#repVote1992").append(`<div class="bar bar-1 stat-1" style="height:${data.percentageRep1992}%;"></div>`);
      $("#demVote1992").append(`<div class="bar bar-3 stat-3" style="height:${data.percentageDem1992}%;"></div>`);
      $("#repVote1996").append(`<div class="bar bar-4 stat-1" style="height:${data.percentageRep1996}%;"></div>`);
      $("#demVote1996").append(`<div class="bar bar-6 stat-3" style="height:${data.percentageDem1996}%;"></div>`);
      $("#repVote2000").append(`<div class="bar bar-7 stat-1" style="height:${data.percentageRep2000}%;"></div>`);
      $("#demVote2000").append(`<div class="bar bar-9 stat-3" style="height:${data.percentageDem2000}%;"></div>`);
      $("#repVote2004").append(`<div class="bar bar-10 stat-1" style="height:${data.percentageRep2004}%;"></div>`);
      $("#demVote2004").append(`<div class="bar bar-12 stat-3" style="height:${data.percentageDem2004}%;"></div>`);
      $("#repVote2008").append(`<div class="bar bar-13 stat-1" style="height:${data.percentageRep2008}%;"></div>`);
      $("#demVote2008").append(`<div class="bar bar-15 stat-3" style="height:${data.percentageDem2008}%;"></div>`);

      // Custom pie chart statistis based on searched content
      // To get each race's portion of the pie we'll create a fraction between a race's total population and the general total population
      const totalPopulationRaceChart = data.whitePopulation + data.blackPopulation + data.americanIndianAndAlaskanNativePopulation + data.asianPopulation + data.nativeHawaiianAndPacificIslanderPopulation + data.twoOrMoreRacesPopulation + data.hispanicOrLatinoPopulation;
      const graphWhitePopulation = Math.round((data.whitePopulation / totalPopulationRaceChart) * 100);
      const graphBlackPopulation = Math.round((data.blackPopulation / totalPopulationRaceChart) * 100);
      const graphAmericanIndianAndAlaskanNativePopulation = Math.round((data.americanIndianAndAlaskanNativePopulation / totalPopulationRaceChart) * 100);
      const graphAsianPopulation = Math.round((data.asianPopulation / totalPopulationRaceChart) * 100);
      const graphNativeHawaiianAndPacificIslanderPopulation = Math.round((data.nativeHawaiianAndPacificIslanderPopulation / totalPopulationRaceChart) * 100);
      const graphTwoOrMoreRacesPopulation = Math.round((data.twoOrMoreRacesPopulation / totalPopulationRaceChart) * 100);
      const graphHispanicOrLatinoPopulation = Math.round((data.hispanicOrLatinoPopulation / totalPopulationRaceChart) * 100);

      // Appending the above calculated amounts to the page
      $("#graphWhitePopulation").append(`<h5 class="removeCustomStat">${graphWhitePopulation}%</h5>`);
      $("#graphBlackPopulation").append(`<h5 class="removeCustomStat">${graphBlackPopulation}%</h5>`);
      $("#graphAmericanIndianAndAlaskanNativePopulation").append(`<h5 class="removeCustomStat">${graphAmericanIndianAndAlaskanNativePopulation}%</h5>`);
      $("#graphAsianPopulation").append(`<h5 class="removeCustomStat">${graphAsianPopulation}%</h5>`);
      $("#graphNativeHawaiianAndPacificIslanderPopulation").append(`<h5 class="removeCustomStat">${graphNativeHawaiianAndPacificIslanderPopulation}%</h5>`);
      $("#graphTwoOrMoreRacesPopulation").append(`<h5 class="removeCustomStat">${graphTwoOrMoreRacesPopulation}%</h5>`);
      $("#graphHispanicOrLatinoPopulation").append(`<h5 class="removeCustomStat">${graphHispanicOrLatinoPopulation}%</h5>`);
      
      // The below 250 lines are for the Racial Demographics pie chart
      $("#pieChart").remove();
      $("#pieChartCustom").remove();
      $(".customPieChart").append(`<div id="pieChartCustom" class="chart"></div>`);

      $(document).ready(function(){
        $('.icon').click(function(){
            $('.search').toggleClass('active');
        });
      });

      $(function(){


        $("#pieChartCustom").drawPieChart([
          { title: "White alone",   value: graphWhitePopulation, color: "#EB0D42" },
          { title: "Black alone", value:  graphBlackPopulation, color: "#CFD3D6" },
          { title: "Asian alone", value:  graphAsianPopulation, color: "#04374E" },
          { title: "Hispanic or Latino alone", value: graphHispanicOrLatinoPopulation, color: "#02B3E7" },
          { title: "American Indian and Alaskan Native alone", value: graphAmericanIndianAndAlaskanNativePopulation, color: "#736D79" },
          { title: "Hawaiian and Pacific Islander alone", value: graphNativeHawaiianAndPacificIslanderPopulation, color: "#776068" },
          { title: "Two or more races", value: graphTwoOrMoreRacesPopulation, color: "#FFEC62" }
        ]);
      });

      /*!
      * jquery.drawPieChart.js
      * Version: 0.3(Beta)
      * Inspired by Chart.js(http://www.chartjs.org/)
      *
      * Copyright 2013 hiro
      * https://github.com/githiro/drawPieChart
      * Released under the MIT license.
      */
      ;(function($, undefined) {
        $.fn.drawPieChart = function(data, options) {
          var $this = this,
            W = $this.width(),
            H = $this.height(),
            centerX = W/2,
            centerY = H/2,
            cos = Math.cos,
            sin = Math.sin,
            PI = Math.PI,
            settings = $.extend({
              segmentShowStroke : true,
              segmentStrokeColor : "#fff",
              segmentStrokeWidth : 1,
              baseColor: "#fff",
              baseOffset: 15,
              edgeOffset: 30,//offset from edge of $this
              pieSegmentGroupClass: "pieSegmentGroup",
              pieSegmentClass: "pieSegment",
              lightPiesOffset: 12,//lighten pie's width
              lightPiesOpacity: .3,//lighten pie's default opacity
              lightPieClass: "lightPie",
              animation : true,
              animationSteps : 90,
              animationEasing : "easeInOutExpo",
              tipOffsetX: -15,
              tipOffsetY: -45,
              tipClass: "pieTip",
              beforeDraw: function(){  },
              afterDrawed : function(){  },
              onPieMouseenter : function(e,data){  },
              onPieMouseleave : function(e,data){  },
              onPieClick : function(e,data){  }
            }, options),
            animationOptions = {
              linear : function (t){
                return t;
              },
              easeInOutExpo: function (t) {
                var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
                return (v>1) ? 1 : v;
              }
            },
            requestAnimFrame = function(){
              return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                  window.setTimeout(callback, 1000 / 60);
                };
            }();

          var $wrapper = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this);
          var $groups = [],
              $pies = [],
              $lightPies = [],
              easingFunction = animationOptions[settings.animationEasing],
              pieRadius = Min([H/2,W/2]) - settings.edgeOffset,
              segmentTotal = 0;

          //Draw base circle
          var drawBasePie = function(){
            var base = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            var $base = $(base).appendTo($wrapper);
            base.setAttribute("cx", centerX);
            base.setAttribute("cy", centerY);
            base.setAttribute("r", pieRadius+settings.baseOffset);
            base.setAttribute("fill", settings.baseColor);
          }();

          //Set up pie segments wrapper
          var pathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
          var $pathGroup = $(pathGroup).appendTo($wrapper);
          $pathGroup[0].setAttribute("opacity",0);

          //Set up tooltip
          var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
            tipW = $tip.width(),
            tipH = $tip.height();

          for (var i = 0, len = data.length; i < len; i++){
            segmentTotal += data[i].value;
            var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            g.setAttribute("data-order", i);
            g.setAttribute("class", settings.pieSegmentGroupClass);
            $groups[i] = $(g).appendTo($pathGroup);
            $groups[i]
              .on("mouseenter", pathMouseEnter)
              .on("mouseleave", pathMouseLeave)
              .on("mousemove", pathMouseMove)
              .on("click", pathClick);

            var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            p.setAttribute("stroke-width", settings.segmentStrokeWidth);
            p.setAttribute("stroke", settings.segmentStrokeColor);
            p.setAttribute("stroke-miterlimit", 2);
            p.setAttribute("fill", data[i].color);
            p.setAttribute("class", settings.pieSegmentClass);
            $pies[i] = $(p).appendTo($groups[i]);

            var lp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            lp.setAttribute("stroke-width", settings.segmentStrokeWidth);
            lp.setAttribute("stroke", settings.segmentStrokeColor);
            lp.setAttribute("stroke-miterlimit", 2);
            lp.setAttribute("fill", data[i].color);
            lp.setAttribute("opacity", settings.lightPiesOpacity);
            lp.setAttribute("class", settings.lightPieClass);
            $lightPies[i] = $(lp).appendTo($groups[i]);
          }

          settings.beforeDraw.call($this);
          //Animation start
          triggerAnimation();

          function pathMouseEnter(e){
            var index = $(this).data().order;
            $tip.text(data[index].title + ": " + data[index].value).fadeIn(200);
            if ($groups[index][0].getAttribute("data-active") !== "active"){
              $lightPies[index].animate({opacity: .8}, 180);
            }
            settings.onPieMouseenter.apply($(this),[e,data]);
          }
          function pathMouseLeave(e){
            var index = $(this).data().order;
            $tip.hide();
            if ($groups[index][0].getAttribute("data-active") !== "active"){
              $lightPies[index].animate({opacity: settings.lightPiesOpacity}, 100);
            }
            settings.onPieMouseleave.apply($(this),[e,data]);
          }
          function pathMouseMove(e){
            $tip.css({
              top: e.pageY + settings.tipOffsetY,
              left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
            });
          }
          function pathClick(e){
            var index = $(this).data().order;
            var targetGroup = $groups[index][0];
            for (var i = 0, len = data.length; i < len; i++){
              if (i === index) continue;
              $groups[i][0].setAttribute("data-active","");
              $lightPies[i].css({opacity: settings.lightPiesOpacity});
            }
            if (targetGroup.getAttribute("data-active") === "active"){
              targetGroup.setAttribute("data-active","");
              $lightPies[index].css({opacity: .8});
            } else {
              targetGroup.setAttribute("data-active","active");
              $lightPies[index].css({opacity: 1});
            }
            settings.onPieClick.apply($(this),[e,data]);
          }
          function drawPieSegments (animationDecimal){
            var startRadius = -PI/2,//-90 degree
                rotateAnimation = 1;
            if (settings.animation) {
              rotateAnimation = animationDecimal;//count up between0~1
            }

            $pathGroup[0].setAttribute("opacity",animationDecimal);

            //draw each path
            for (var i = 0, len = data.length; i < len; i++){
              var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (PI*2)),//start radian
                  endRadius = startRadius + segmentAngle,
                  largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
                  startX = centerX + cos(startRadius) * pieRadius,
                  startY = centerY + sin(startRadius) * pieRadius,
                  endX = centerX + cos(endRadius) * pieRadius,
                  endY = centerY + sin(endRadius) * pieRadius,
                  startX2 = centerX + cos(startRadius) * (pieRadius + settings.lightPiesOffset),
                  startY2 = centerY + sin(startRadius) * (pieRadius + settings.lightPiesOffset),
                  endX2 = centerX + cos(endRadius) * (pieRadius + settings.lightPiesOffset),
                  endY2 = centerY + sin(endRadius) * (pieRadius + settings.lightPiesOffset);
              var cmd = [
                'M', startX, startY,//Move pointer
                'A', pieRadius, pieRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
                'L', centerX, centerY,//Draw line to the center.
                'Z'//Cloth path
              ];
              var cmd2 = [
                'M', startX2, startY2,
                'A', pieRadius + settings.lightPiesOffset, pieRadius + settings.lightPiesOffset, 0, largeArc, 1, endX2, endY2,//Draw outer arc path
                'L', centerX, centerY,
                'Z'
              ];
              $pies[i][0].setAttribute("d",cmd.join(' '));
              $lightPies[i][0].setAttribute("d", cmd2.join(' '));
              startRadius += segmentAngle;
            }
          }

          var animFrameAmount = (settings.animation)? 1/settings.animationSteps : 1,//if settings.animationSteps is 10, animFrameAmount is 0.1
              animCount =(settings.animation)? 0 : 1;
          function triggerAnimation(){
            if (settings.animation) {
              requestAnimFrame(animationLoop);
            } else {
              drawPieSegments(1);
            }
          }
          function animationLoop(){
            animCount += animFrameAmount;//animCount start from 0, after "settings.animationSteps"-times executed, animCount reaches 1.
            drawPieSegments(easingFunction(animCount));
            if (animCount < 1){
              requestAnimFrame(arguments.callee);
            } else {
              settings.afterDrawed.call($this);
            }
          }
          function Max(arr){
            return Math.max.apply(null, arr);
          }
          function Min(arr){
            return Math.min.apply(null, arr);
          }
          return $this;
        };
      })(jQuery);
      // End Pie Chart


      // Remove Default Graph 4 and replace with custom graph 4
      $("#myChart").remove()

      $.ajax(censusDataObject).done(function (response) {
        console.log(response);
      });
      
      
      var ctx = document.getElementById("myChartCustom").getContext('2d');
      var myChartCustom = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Less Than $10K", "$10K - $15K", "$15K - $20K", "$20K - $25K", "$30K - $35K", "$35K - $40K", "$40K - $45K", "$45K - $50K", "$50K - $60K", "$60K - $75K", "$75K - $100K", "$100K - $125K", "$125K - $150K", "$150K - $200K", "$200K+"],
            datasets: [{
                label: 'Total Number of Families in Income Category',
                data: [data.incomeLessThan10K, data.incomeBtw10And15K, data.incomeBtw15And20K, data.incomeBtw20And25K, data.incomeBtw25And30K, data.incomeBtw30And35K, data.incomeBtw35And40K, data.incomeBtw40And45K, data.incomeBtw45And50K, data.incomeBtw50And60K, data.incomeBtw60And75K, data.incomeBtw75And100K, data.incomeBtw100And125K, data.incomeBtw125And150K, data.incomeBtw150And200K, data.income200Plus],
                backgroundColor: [
                    'hsl(120, 100%, 50%)',
                    'hsl(120, 94%, 50%)',
                    'hsl(120, 88%, 50%)',
                    'hsl(120, 82%, 50%)',
                    'hsl(120, 76%, 50%)',
                    'hsl(120, 70%, 50%)',
                    'hsl(120, 64%, 50%)',
                    'hsl(120, 58%, 50%)',
                    'hsl(120, 52%, 50%)',
                    'hsl(120, 46%, 50%)',
                    'hsl(120, 40%, 50%)',
                    'hsl(120, 34%, 50%)',
                    'hsl(120, 28%, 50%)',
                    'hsl(120, 22%, 50%)',
                    'hsl(120, 16%, 50%)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
      });
      
    }
  });
});




// The below 250 lines are for the Racial Demographics pie chart
$(document).ready(function(){
  $('.icon').click(function(){
      $('.search').toggleClass('active');
  });
});

$(function(){


  $("#pieChart").drawPieChart([
    { title: "Tokyo",         value : 180,  color: "#02B3E7" },
    { title: "San Francisco", value:  60,   color: "#CFD3D6" },
    { title: "London",        value : 50,   color: "#736D79" },
    { title: "New York",      value:  30,   color: "#776068" },
    { title: "Sydney",        value : 20,   color: "#EB0D42" },
    { title: "Berlin",        value : 20,   color: "#FFEC62" },
    { title: "Osaka",         value : 7,    color: "#04374E" }
  ]);
});

/*!
 * jquery.drawPieChart.js
 * Version: 0.3(Beta)
 * Inspired by Chart.js(http://www.chartjs.org/)
 *
 * Copyright 2013 hiro
 * https://github.com/githiro/drawPieChart
 * Released under the MIT license.
 */
;(function($, undefined) {
  $.fn.drawPieChart = function(data, options) {
    var $this = this,
      W = $this.width(),
      H = $this.height(),
      centerX = W/2,
      centerY = H/2,
      cos = Math.cos,
      sin = Math.sin,
      PI = Math.PI,
      settings = $.extend({
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 1,
        baseColor: "#fff",
        baseOffset: 15,
        edgeOffset: 30,//offset from edge of $this
        pieSegmentGroupClass: "pieSegmentGroup",
        pieSegmentClass: "pieSegment",
        lightPiesOffset: 12,//lighten pie's width
        lightPiesOpacity: .3,//lighten pie's default opacity
        lightPieClass: "lightPie",
        animation : true,
        animationSteps : 90,
        animationEasing : "easeInOutExpo",
        tipOffsetX: -15,
        tipOffsetY: -45,
        tipClass: "pieTip",
        beforeDraw: function(){  },
        afterDrawed : function(){  },
        onPieMouseenter : function(e,data){  },
        onPieMouseleave : function(e,data){  },
        onPieClick : function(e,data){  }
      }, options),
      animationOptions = {
        linear : function (t){
          return t;
        },
        easeInOutExpo: function (t) {
          var v = t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t;
          return (v>1) ? 1 : v;
        }
      },
      requestAnimFrame = function(){
        return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            window.setTimeout(callback, 1000 / 60);
          };
      }();

    var $wrapper = $('<svg width="' + W + '" height="' + H + '" viewBox="0 0 ' + W + ' ' + H + '" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"></svg>').appendTo($this);
    var $groups = [],
        $pies = [],
        $lightPies = [],
        easingFunction = animationOptions[settings.animationEasing],
        pieRadius = Min([H/2,W/2]) - settings.edgeOffset,
        segmentTotal = 0;

    //Draw base circle
    var drawBasePie = function(){
      var base = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      var $base = $(base).appendTo($wrapper);
      base.setAttribute("cx", centerX);
      base.setAttribute("cy", centerY);
      base.setAttribute("r", pieRadius+settings.baseOffset);
      base.setAttribute("fill", settings.baseColor);
    }();

    //Set up pie segments wrapper
    var pathGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    var $pathGroup = $(pathGroup).appendTo($wrapper);
    $pathGroup[0].setAttribute("opacity",0);

    //Set up tooltip
    var $tip = $('<div class="' + settings.tipClass + '" />').appendTo('body').hide(),
      tipW = $tip.width(),
      tipH = $tip.height();

    for (var i = 0, len = data.length; i < len; i++){
      segmentTotal += data[i].value;
      var g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.setAttribute("data-order", i);
      g.setAttribute("class", settings.pieSegmentGroupClass);
      $groups[i] = $(g).appendTo($pathGroup);
      $groups[i]
        .on("mouseenter", pathMouseEnter)
        .on("mouseleave", pathMouseLeave)
        .on("mousemove", pathMouseMove)
        .on("click", pathClick);

      var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute("stroke-width", settings.segmentStrokeWidth);
      p.setAttribute("stroke", settings.segmentStrokeColor);
      p.setAttribute("stroke-miterlimit", 2);
      p.setAttribute("fill", data[i].color);
      p.setAttribute("class", settings.pieSegmentClass);
      $pies[i] = $(p).appendTo($groups[i]);

      var lp = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      lp.setAttribute("stroke-width", settings.segmentStrokeWidth);
      lp.setAttribute("stroke", settings.segmentStrokeColor);
      lp.setAttribute("stroke-miterlimit", 2);
      lp.setAttribute("fill", data[i].color);
      lp.setAttribute("opacity", settings.lightPiesOpacity);
      lp.setAttribute("class", settings.lightPieClass);
      $lightPies[i] = $(lp).appendTo($groups[i]);
    }

    settings.beforeDraw.call($this);
    //Animation start
    triggerAnimation();

    function pathMouseEnter(e){
      var index = $(this).data().order;
      $tip.text(data[index].title + ": " + data[index].value).fadeIn(200);
      if ($groups[index][0].getAttribute("data-active") !== "active"){
        $lightPies[index].animate({opacity: .8}, 180);
      }
      settings.onPieMouseenter.apply($(this),[e,data]);
    }
    function pathMouseLeave(e){
      var index = $(this).data().order;
      $tip.hide();
      if ($groups[index][0].getAttribute("data-active") !== "active"){
        $lightPies[index].animate({opacity: settings.lightPiesOpacity}, 100);
      }
      settings.onPieMouseleave.apply($(this),[e,data]);
    }
    function pathMouseMove(e){
      $tip.css({
        top: e.pageY + settings.tipOffsetY,
        left: e.pageX - $tip.width() / 2 + settings.tipOffsetX
      });
    }
    function pathClick(e){
      var index = $(this).data().order;
      var targetGroup = $groups[index][0];
      for (var i = 0, len = data.length; i < len; i++){
        if (i === index) continue;
        $groups[i][0].setAttribute("data-active","");
        $lightPies[i].css({opacity: settings.lightPiesOpacity});
      }
      if (targetGroup.getAttribute("data-active") === "active"){
        targetGroup.setAttribute("data-active","");
        $lightPies[index].css({opacity: .8});
      } else {
        targetGroup.setAttribute("data-active","active");
        $lightPies[index].css({opacity: 1});
      }
      settings.onPieClick.apply($(this),[e,data]);
    }
    function drawPieSegments (animationDecimal){
      var startRadius = -PI/2,//-90 degree
          rotateAnimation = 1;
      if (settings.animation) {
        rotateAnimation = animationDecimal;//count up between0~1
      }

      $pathGroup[0].setAttribute("opacity",animationDecimal);

      //draw each path
      for (var i = 0, len = data.length; i < len; i++){
        var segmentAngle = rotateAnimation * ((data[i].value/segmentTotal) * (PI*2)),//start radian
            endRadius = startRadius + segmentAngle,
            largeArc = ((endRadius - startRadius) % (PI * 2)) > PI ? 1 : 0,
            startX = centerX + cos(startRadius) * pieRadius,
            startY = centerY + sin(startRadius) * pieRadius,
            endX = centerX + cos(endRadius) * pieRadius,
            endY = centerY + sin(endRadius) * pieRadius,
            startX2 = centerX + cos(startRadius) * (pieRadius + settings.lightPiesOffset),
            startY2 = centerY + sin(startRadius) * (pieRadius + settings.lightPiesOffset),
            endX2 = centerX + cos(endRadius) * (pieRadius + settings.lightPiesOffset),
            endY2 = centerY + sin(endRadius) * (pieRadius + settings.lightPiesOffset);
        var cmd = [
          'M', startX, startY,//Move pointer
          'A', pieRadius, pieRadius, 0, largeArc, 1, endX, endY,//Draw outer arc path
          'L', centerX, centerY,//Draw line to the center.
          'Z'//Cloth path
        ];
        var cmd2 = [
          'M', startX2, startY2,
          'A', pieRadius + settings.lightPiesOffset, pieRadius + settings.lightPiesOffset, 0, largeArc, 1, endX2, endY2,//Draw outer arc path
          'L', centerX, centerY,
          'Z'
        ];
        $pies[i][0].setAttribute("d",cmd.join(' '));
        $lightPies[i][0].setAttribute("d", cmd2.join(' '));
        startRadius += segmentAngle;
      }
    }

    var animFrameAmount = (settings.animation)? 1/settings.animationSteps : 1,//if settings.animationSteps is 10, animFrameAmount is 0.1
        animCount =(settings.animation)? 0 : 1;
    function triggerAnimation(){
      if (settings.animation) {
        requestAnimFrame(animationLoop);
      } else {
        drawPieSegments(1);
      }
    }
    function animationLoop(){
      animCount += animFrameAmount;//animCount start from 0, after "settings.animationSteps"-times executed, animCount reaches 1.
      drawPieSegments(easingFunction(animCount));
      if (animCount < 1){
        requestAnimFrame(arguments.callee);
      } else {
        settings.afterDrawed.call($this);
      }
    }
    function Max(arr){
      return Math.max.apply(null, arr);
    }
    function Min(arr){
      return Math.min.apply(null, arr);
    }
    return $this;
  };
})(jQuery);
// End Pie Chart


// Begin Income Distribution Chart.js (Default Graph Four)
const censusDataObject = {
  "async": true,
  "crossDomain": true,
  "url": "https://api.census.gov/data/",
  "method": "GET"
}

$.ajax(censusDataObject).done(function (response) {
  console.log(response);
});

// First Chart.js chart

var ctx = document.getElementById("myChart").getContext('2d');
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [{
          label: '# of Votes',
          data: [12, 18, 3, 5, 2, 3],
          backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero:true
              }
          }]
      }
  }
});
