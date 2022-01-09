        // dates 
        var d = new Date();
        var today = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+(d.getDate()-1);
        const monthD = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];
        const monthE = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        var todayFormattedD = (d.getDate()-1)+' '+monthD[d.getMonth()]+' '+d.getFullYear();
        var todayFormattedE = (d.getDate()-1)+' '+monthE[d.getMonth()]+' '+d.getFullYear();
              
    // covid cases DE
    fetch('https://public.flourish.studio/visualisation/8213413/visualisation.json')
            .then(response => response.json())
            .then(config => {
                // Add my API key to the configuration
                config.api_key = "NCDegg6ooUOYhj732gNWwxnB9_CLyxt3GQFUdJSRmhcHaFVIjMO-fW2Y8b7mK9-m";

                // Add 'container' selector where I want chart added in the HTML
                config.container = "#chartCoronaFaelle";

                // Replace the example visualization's data & bindings with my own (but keep all the same settings)
                d3.csv("https://raw.githubusercontent.com/vfillis/automated-covid/main/data/cases-DE.csv").then(function (raw_data) {
                
                // Update data
                config.data.data = raw_data;

                // Update bindings
                config.bindings.data = {
                    label: 'Meldedatum',
                    value: ['Laufender Tagesdurchschnitt der vergangenen 7 Tage',
                        'gemeldete Fallzahl des Tages'],
                };

                // Update x-axis max (set as today)
                config.state.x.datetime_max = today;
            
                // Get today's date & update footer
                config.state.layout.footer_note = "Zuletzt aktualisiert: " + todayFormattedD;
                
                // Create my visualization with the API
                var flourish_visualization = new Flourish.Live(config);
                
                // update chart when button is clicked 
                const latestMonth = document.getElementById("latest-month-cases")
                const last3months = document.getElementById("last-3-months-cases")
                const last6months = document.getElementById("last-6-months-cases")
                const last12months = document.getElementById("last-year-cases")
                const all = document.getElementById("full-data-cases")

                latestMonth.addEventListener('click', function () {
                    var todayMinusOneMonth = d.getFullYear()+'-'+(d.getMonth())+'-'+(d.getDate()-1);
                    updateAxis(todayMinusOneMonth);
                });

                last3months.addEventListener('click', function () {
                    var todayMinusThreeMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+10)+'-'+(d.getDate()-1);
                    updateAxis(todayMinusThreeMonths);
                });

                last6months.addEventListener('click', function () {
                    var todayMinusSixMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+7)+'-'+(d.getDate()-1);
                    updateAxis(todayMinusSixMonths);
                });

                last12months.addEventListener('click', function () {
                    var todayMinusTwelveMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+1)+'-'+(d.getDate()-1);
                    updateAxis(todayMinusTwelveMonths);
                });

                all.addEventListener('click', function () {
                    var startData = "2020-02-17";
                    updateAxis(startData);
                });
                
                // funtion that updates axis with date from button onClick function
                function updateAxis(date) {
                    flourish_visualization.update({
                        state: {
                                x: {
                                    datetime_min: date
                                },
                                color: {
                                    categorical_palette: ["#585885", "#c9cae0",],
                                }
                            },
                    })
                };
            });
    })
    
    // Faelle in den Landkreisen
    fetch('https://public.flourish.studio/visualisation/8202306/visualisation.json')
            .then(response => response.json())
            .then(data => {
                // Add my API key to the configuration
                data.api_key = "FGCFFotq1s0aECvKcS6rilvdJBCgAHgG-jRUsR9uFznEbEodBBws9Niphbd3z93b",

                // Add 'container' selector where I want chart added in the HTML
                data.container = "#chartCoronaFaelleLK";

                // update footer
                data.state.layout.footer_note = "Zuletzt aktualisiert: " + todayFormattedD;

                // update max on x-axis
                data.state.x.datetime_max = today;

                // Create my visualization with the API
                var flourish_visualization = new Flourish.Live(data);
    });
      
    // Faelle auf map 
    fetch('https://public.flourish.studio/visualisation/8193340/visualisation.json')
            .then(response => response.json())
            .then(data => {
                // Add my API key to the configuration
                data.api_key = "FGCFFotq1s0aECvKcS6rilvdJBCgAHgG-jRUsR9uFznEbEodBBws9Niphbd3z93b",

                // Add 'container' selector where I want chart added in the HTML
                data.container = "#chartCoronaFaelleMap";

                // update footer
                data.state.layout.footer_note = "Zuletzt aktualisiert: " + todayFormattedD;

                // Create my visualization with the API
                var flourish_visualization = new Flourish.Live(data);
    });

    // covid cases
    fetch('https://public.flourish.studio/visualisation/7636694/visualisation.json')
    .then(response => response.json())
    .then(config => {
        // Add my API key to the configuration
        config.api_key = "NCDegg6ooUOYhj732gNWwxnB9_CLyxt3GQFUdJSRmhcHaFVIjMO-fW2Y8b7mK9-m";

        // Add 'container' selector where I want chart added in the HTML
        config.container = "#chartCovidCases";

        // Replace the example visualization's data & bindings with my own (but keep all the same settings)
        d3.csv("https://raw.githubusercontent.com/vfillis/automated-covid/main/data/cases-England.csv").then(function (raw_data) {
        
        // Update data
        config.data.data = raw_data;

        // Update bindings
        config.bindings.data = {
            label: 'date',
            value: ['Seven-day average', 'Daily cases by date reported'],
            // metadata: ['Seven-day average', 'Daily cases by date reported', 'date']
        }

        // Update x-axis max (set as today)
        config.state.x.datetime_max = today;
    
        // Get today's date & update footer
        config.state.layout.footer_note = "Last updated: " + todayFormattedE;
        
        // Create my visualization with the API
        var flourish_visualization = new Flourish.Live(config);
        
        // update chart when button is clicked 
        const latestMonth = document.getElementById("latest-month-cases")
        const last3months = document.getElementById("last-3-months-cases")
        const last6months = document.getElementById("last-6-months-cases")
        const last12months = document.getElementById("last-year-cases")
        const all = document.getElementById("full-data-cases")

        latestMonth.addEventListener('click', function () {
            var todayMinusOneMonth = d.getFullYear()+'-'+(d.getMonth())+'-'+(d.getDate()-1);
            updateAxis(todayMinusOneMonth);
        });

        last3months.addEventListener('click', function () {
            var todayMinusThreeMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+10)+'-'+(d.getDate()-1);
            updateAxis(todayMinusThreeMonths);
        });

        last6months.addEventListener('click', function () {
            var todayMinusSixMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+7)+'-'+(d.getDate()-1);
            updateAxis(todayMinusSixMonths);
        });

        last12months.addEventListener('click', function () {
            var todayMinusTwelveMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+1)+'-'+(d.getDate()-1);
            updateAxis(todayMinusTwelveMonths);
        });

        all.addEventListener('click', function () {
            var startData = "2020-02-17";
            updateAxis(startData);
        });
        
        // funtion that updates axis with date from button onClick function
        function updateAxis(date) {
            flourish_visualization.update({
                state: {
                        x: {
                            datetime_min: date
                        },
                        color: {
                            categorical_palette: ["#585885", "#c9cae0",],
                        }
                    },
            })
        };
    });
})


// covid deaths 
fetch('https://public.flourish.studio/visualisation/8297444/visualisation.json')
    .then(response => response.json())
    .then(config => {
        // Add my API key to the configuration
        config.api_key = "NCDegg6ooUOYhj732gNWwxnB9_CLyxt3GQFUdJSRmhcHaFVIjMO-fW2Y8b7mK9-m";

        // Add 'container' selector where I want chart added in the HTML
        config.container = "#chartCovidDeaths";

        // Replace the example visualization's data & bindings with my own (but keep all the same settings)
        d3.csv("https://raw.githubusercontent.com/vfillis/automated-covid/main/data/deaths-England.csv").then(function (raw_data) {
        
        // Update data
        config.data.data = raw_data;

        // Update bindings
        config.bindings.data = {
            label: 'date',
            value: ['Seven-day average', 'Daily deaths by date reported'],
        }

        // Update x-axis max (set as today)
        config.state.x.datetime_max = today;
    
        // Get today's date & update footer
        config.state.layout.footer_note = "Last updated: " + todayFormattedE;
        
        // Create my visualization with the API
        var flourish_visualization = new Flourish.Live(config);
        
        // update chart when button is clicked 
        const latestMonth = document.getElementById("latest-month-deaths")
        const last3months = document.getElementById("last-3-months-deaths")
        const last6months = document.getElementById("last-6-months-deaths")
        const last12months = document.getElementById("last-year-deaths")
        const all = document.getElementById("full-data-deaths")

        latestMonth.addEventListener('click', function () {
            var todayMinusOneMonth = d.getFullYear()+'-'+(d.getMonth())+'-'+(d.getDate()-1);
            updateAxis(todayMinusOneMonth);
            var yMax = 400;
            updateYAxis(yMax);
        });

        last3months.addEventListener('click', function () {
            var todayMinusThreeMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+10)+'-'+(d.getDate()-1);
            updateAxis(todayMinusThreeMonths);
            var yMax = 400;
            updateYAxis(yMax);
        });

        last6months.addEventListener('click', function () {
            var todayMinusSixMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+7)+'-'+(d.getDate()-1);
            updateAxis(todayMinusSixMonths);
            var yMax = 400;
            updateYAxis(yMax);
        });

        last12months.addEventListener('click', function () {
            var todayMinusTwelveMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+1)+'-'+(d.getDate()-1);
            updateAxis(todayMinusTwelveMonths);
            var yMax = 1700;
            updateYAxis(yMax);
        });

        all.addEventListener('click', function () {
            var startData = "2020-02-17";
            updateAxis(startData);
            var yMax = 1700;
            updateYAxis(yMax);
        });
        
        // funtion that updates axis with date from button onClick function
        function updateAxis(date) {
            flourish_visualization.update({
                state: {
                        x: {
                            datetime_min: date
                        },
                        color: {
                            categorical_palette: ["#585885", "#c9cae0",],
                        }
                    },
            })
        };

        function updateYAxis(yMax) {
            flourish_visualization.update({
                state: {
                        y: {
                            linear_max: yMax
                        },
                        color: {
                            categorical_palette: ["#585885", "#c9cae0",],
                        }
                    },
            })
        };
    });
  })

// covid vaccinations total 
fetch('https://public.flourish.studio/visualisation/7747873/visualisation.json')
    .then(response => response.json())
    .then(config => {
        // Add my API key to the configuration
        config.api_key = "NCDegg6ooUOYhj732gNWwxnB9_CLyxt3GQFUdJSRmhcHaFVIjMO-fW2Y8b7mK9-m";

        // Add 'container' selector where I want chart added in the HTML
        config.container = "#chartCovidVaccinations";

        // Replace the example visualization's data & bindings with my own (but keep all the same settings)
        d3.csv("https://raw.githubusercontent.com/vfillis/automated-covid/main/data/vaccinations-England.csv").then(function (raw_data) {
        
        // Update data
        config.data.data = raw_data;

        // Update bindings
        config.bindings.data = {
            label: 'date',
            value: ['First dose', 'Second dose', 'Third dose'],
            // metadata: ['Seven-day average', 'Daily cases by date reported', 'date']
        }

        // Update x-axis max (set as today)
        config.state.x.datetime_max = today;
    
        // Get today's date & update footer
        config.state.layout.footer_note = "Last updated: " + todayFormattedE;
        
        // Create my visualization with the API
        var flourish_visualization = new Flourish.Live(config);
        
        // update chart when button is clicked 
        const latestMonth = document.getElementById("latest-month-vaccinations")
        const last3months = document.getElementById("last-3-months-vaccinations")
        const last6months = document.getElementById("last-6-months-vaccinations")
        const last12months = document.getElementById("last-year-vaccinations")
        const all = document.getElementById("full-data-vaccinations")

        latestMonth.addEventListener('click', function () {
            var todayMinusOneMonth = d.getFullYear()+'-'+(d.getMonth())+'-'+(d.getDate()-1);
            updateAxis(todayMinusOneMonth);
        });

        last3months.addEventListener('click', function () {
            var todayMinusThreeMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+10)+'-'+(d.getDate()-1);
            updateAxis(todayMinusThreeMonths);
        });

        last6months.addEventListener('click', function () {
            var todayMinusSixMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+7)+'-'+(d.getDate()-1);
            updateAxis(todayMinusSixMonths);
        });

        last12months.addEventListener('click', function () {
            var todayMinusTwelveMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+1)+'-'+(d.getDate()-1);
            updateAxis(todayMinusTwelveMonths);
        });

        all.addEventListener('click', function () {
            var startData = "2021-01-11";
            updateAxis(startData);
        });
        
        // funtion that updates axis with date from button onClick function
        function updateAxis(date) {
            flourish_visualization.update({
                state: {
                        x: {
                            datetime_min: date
                        },
                        color: {
                            categorical_palette: ["#c9cae0", "#9c9ccc", "#585885",],
                        }
                    },
            })
        };
    });
})

// covid vacctinations percentage in each groups 
fetch('https://public.flourish.studio/visualisation/8305767/visualisation.json')
.then(response => response.json())
.then(config => {
// Add my API key to the configuration
config.api_key = "FGCFFotq1s0aECvKcS6rilvdJBCgAHgG-jRUsR9uFznEbEodBBws9Niphbd3z93b",

// Add 'container' selector where I want chart added in the HTML
config.container = "#chartCovidVaccinationsAges";

// Replace the example visualization's data & bindings with my own (but keep all the same settings)
d3.csv("https://raw.githubusercontent.com/vfillis/automated-covid/main/data/vaccinations-England-ages.csv")
.then(function (raw_data) {        
  // Update data
  config.data.data = raw_data;
  // Update bindings
  config.bindings.data = {
      label: 'age',
      value: ['Three doses', 'Two doses only', 'First dose only', 'No vaccine'],
  }

// update footer
config.state.layout.footer_note = "Last updated: " + todayFormattedE;

// Create my visualization with the API
var flourish_visualization = new Flourish.Live(config);
});
});
 
// hospitalisations 
fetch('https://public.flourish.studio/visualisation/7741739/visualisation.json')
    .then(response => response.json())
    .then(config => {
        // Add my API key to the configuration
        config.api_key = "NCDegg6ooUOYhj732gNWwxnB9_CLyxt3GQFUdJSRmhcHaFVIjMO-fW2Y8b7mK9-m";

        // Add 'container' selector where I want chart added in the HTML
        config.container = "#chartCovidHospitalisations";

        // Replace the example visualization's data & bindings with my own (but keep all the same settings)
        d3.csv("https://raw.githubusercontent.com/vfillis/automated-covid/main/data/healthcare-England.csv").then(function (raw_data) {
        
        // Update data
        config.data.data = raw_data;

        // Update bindings
        config.bindings.data = {
            label: 'date',
            value: ['Seven-day average hospital admissions', 'Seven-day average MV beds', 'Seven-day average hospital cases'],
        }

        // Update x-axis max (set as today)
        config.state.x.datetime_max = today;
    
        // Get today's date & update footer
        config.state.layout.footer_note = "<style>#data-point-labels .series .data-label {display: none;} #data-point-labels .series .data-label:first-child {display: block;}</style> Last updated: " + todayFormattedE;
        
        // Create my visualization with the API
        var flourish_visualization = new Flourish.Live(config);
        
        // update chart when button is clicked 
        const latestMonth = document.getElementById("latest-month-hospital")
        const last3months = document.getElementById("last-3-months-hospital")
        const last6months = document.getElementById("last-6-months-hospital")
        const last12months = document.getElementById("last-year-hospital")
        const all = document.getElementById("full-data-hospital")

        latestMonth.addEventListener('click', function () {
            var todayMinusOneMonth = d.getFullYear()+'-'+(d.getMonth())+'-'+(d.getDate()-1);
            updateAxis(todayMinusOneMonth);
        });

        last3months.addEventListener('click', function () {
            var todayMinusThreeMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+10)+'-'+(d.getDate()-1);
            updateAxis(todayMinusThreeMonths);
        });

        last6months.addEventListener('click', function () {
            var todayMinusSixMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+7)+'-'+(d.getDate()-1);
            updateAxis(todayMinusSixMonths);
        });

        last12months.addEventListener('click', function () {
            var todayMinusTwelveMonths = (d.getFullYear()-1)+'-'+(d.getMonth()+1)+'-'+(d.getDate()-1);
            updateAxis(todayMinusTwelveMonths);
        });

        all.addEventListener('click', function () {
            var startData = "2020-02-17";
            updateAxis(startData);
        });
        
        // funtion that updates axis with date from button onClick function
        function updateAxis(date) {
            flourish_visualization.update({
                state: {
                        x: {
                            datetime_min: date
                        },
                        color: {
                            categorical_palette: ["#eea8a6", "#7a85b7", "#5a4073"],
                        }
                    },
            })
        };
    });
})

