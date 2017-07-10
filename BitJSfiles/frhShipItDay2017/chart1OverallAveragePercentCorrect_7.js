define(['jquery_hc','hchart'], function ($, Highcharts) {

   return function (instanceData) { 

    var overallAvgPC = instanceData.series[0][0].overallAveragePercentCorrect;

function addSlideOut(){
      var mySlideOutContent = '<!-- Slide out window with assessment info --><head> <link rel="stylesheet" type="text/css" href="https://dl.dropbox.com/s/3dpwb9jqkrnhqvi/slideout%20window%20styling.css?dl=0"></head><div id="mySideNav" class="mySideNav"> <span class="closeSideNav sideNavDiv">&times;</span>  <div class="heading sideNavDiv"><br>   Assessment View Details </div>      <div id="avDetails" class="details sideNavDiv">    <!--Assessment View Details Go Here.--> </div>    <!--Individual Assessment Details Go Here.--> <div>   <div class="heading sideNavDiv">Assessment Details</div>     <div id= "aDetails" class="details sideNavDiv"><br><!--Assessment Details Go Here --></div>  </div></div>'
    var mySlideOut = document.createElement("div");
    var mySlideOutText = mySlideOut.insertAdjacentHTML('afterbegin', mySlideOutContent);
    Highcharts.charts[0].container.parentNode.parentNode.parentNode.parentNode.appendChild(mySlideOut);
    const avTitle = instanceData.series[0][0].av_title;
    const avAuthor = instanceData.series[0][0].av_author;
    const avAY = instanceData.series[0][0].av_ay;
    const avScopes = instanceData.series[0][0].av_scopes.split(",");
    const avSubjs = instanceData.series[0][0].av_subjs.split(",");
    const avDescription = instanceData.series[0][0].av_desc.split(",");
    const avGls = instanceData.series[0][0].a_gls.split(",");
    const theAs = instanceData.series[0][0].a_titles.split(",");
    const aAuthors = instanceData.series[0][0].a_authors.split(",");
    const aDescriptions = instanceData.series[0][0].a_descs.split(",")
    const countTested = [];
    function init(){
      document.getElementById('avDetails').innerHTML = `<div class="sideNavDiv"><br>Assessment View Title: <p class="sideNavDiv"><b class="sideNavDiv">${avTitle}</p></b>Assessment View Author: <p class="sideNavDiv"><b class="sideNavDiv">${avAuthor}</b></p>Academic Year: <p class="sideNavDiv"><b class="sideNavDiv">${avAY}</b></p>Scopes: <p class="sideNavDiv"><b class="sideNavDiv">${avScopes}</b></p>Subject Areas: <p class="sideNavDiv"><b class="sideNavDiv">${avSubjs}</b></p>Grade Levels: <p class="sideNavDiv"><b class="sideNavDiv">${avGls}</b></p><br></div>`;

      for (var i=0; i<theAs.length; i++){

        document.getElementById('aDetails').insertAdjacentHTML('beforeend', `<hr><br>${i+1}. &nbsp; Assessment Title: <b class="sideNavDiv">${theAs[i]}</b><br><p class="sideNavDiv">Author: <b class="sideNavDiv">${aAuthors[i]}</b></p><p class="sideNavDiv">Description: <b class="sideNavDiv">${aDescriptions[i]}</b></p><p class="sideNavDiv">Students Tested: <b class="sideNavDiv">${countTested[i]}</b></p>`);
    } 
  }

  init();
}


// Create the chart
  var config = {
    

    chart: {
        type: 'bar',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        width: instanceData.width,
        height: instanceData.height,
        renderTo: instanceData.id,
        events: {
          load: function(){
            addSlideOut();
            var closeSlideOut = document.getElementsByClassName("closeSideNav")[0];
            var sidenav = document.getElementById("mySideNav");
            var sideNavDivs = document.getElementsByClassName("sideNavDiv");            
            document.onclick = function(event) {
                              if ([].slice.call(sideNavDivs).includes(event.target)===false && sidenav.classList.contains('showMySideNav')) {
                                 sidenav.classList.toggle('showMySideNav');
                                }
                              }
                              
            closeSlideOut.onclick = function() {
                              sidenav.classList.toggle('showMySideNav');
                           }
                        
            }
          
        }
      
    },

    credits: {
      enabled: false
    },

    title: {
        text: '',
        enabled: false
    },

    // the value axis
    yAxis: {
        min: 0,
        max: 100,
        labels: {
        },
        title: {
            text: '%',
            style: {
              "fontSize": "12px"
            }
        },
        
    },

    xAxis: {
      type: 'category',
      labels: {
        style: {
          fontSize:16
        }
      }
    },

    plotOptions: {
      bar: {
        stacking: 'normal'
      },
      scatter: {
        marker: {
          symbol: 'url(https://dl.dropbox.com/s/ug39nkcsj5d2l7e/Triangle_Black_for_Scatter_Plot.png?dl=0)'
        },
        dataLabels: {
          enabled: true,
          y: -58,
          format: '{y} %',
          style: {
            "fontSize": "20px"
          }
        }
      }
    },

    legend: {
      enabled: false
    },

    series: [{
        type: 'bar',
        stacking: "normal",
        colorByPoint: true,
        colors: ['#F67D7D','#E2C727','#99D66A','#72B6ED'],

        data: [
          ['Avg % Correct',50],
          ['Avg % Correct',20],
          ['Avg % Correct',20],
          ['Avg % Correct',10]
        ]
      },
      {
        type: 'scatter',
        data: [overallAvgPC]
      }]

  };

//Render Chart
new Highcharts.Chart(config);
        
  }; //closes return function
        
});  //closes top function

