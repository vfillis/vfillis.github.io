function buildFirstControls(sel, data) {
    const dropdown = sel.append('div').attr('class', 'dropdown').attr('id', 'year-of-birth');
    const trigger = dropdown.append('div').attr('class', 'select__trigger');
    trigger.append('span').html('Select your year of birth');
    trigger.append('span').attr('class', 'symbol')
    .append('div').style('border-width', '5px').style('border-style', 'solid').style('border-left-color','transparent').style('border-right-color', 'transparent').style('border-bottom-color','transparent').style('top', '50%').style('position','absolute').style('margin-top','-2.5px;');
    // sel.append('button').attr('class', 'first-button').html('Select country');
    const list = dropdown.append('div').attr('class', 'list-options');
    const sectionButtons = list
      .selectAll('chart-button')
      .data(data)
      .join('div')
      .attr('class', 'list-option')
      .html(d => d.label);
      
    for (const option of document.querySelectorAll(".list-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.list-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.dropdown').querySelector('.select__trigger span').textContent = this.textContent;
            }
        })
    }

    window.addEventListener('click', function(e) {
        const firstSelect = document.querySelector('.dropdown')
        if (!firstSelect.contains(e.target)) {
            firstSelect.classList.remove('open');
        }
    });
  
    sectionButtons.filter(function (d, i) {
        return d3.select(this).classed('selected', !i);
    });
  
    sectionButtons.on('click', function () {
        // Update the chart
        const info = d3.select(this).datum();
        console.log(info.year);
        // use the year to update the chart with the year
        updateChartFirst(info.year, info.life_expectancy, info.life_expectancy_end, info.label);
    });
    
}

function buildSecondControls(sel, data) {

    const dropdown = sel.append('div').attr('class', 'dropdown').attr('id', 'kids-year-of-birth');
    const trigger = dropdown.append('div').attr('class', 'select__trigger');
    trigger.append('span').html('Select your kids year of birth');
    trigger.append('span').attr('class', 'symbol')
    .append('div').style('border-width', '5px').style('border-style', 'solid').style('border-left-color','transparent').style('border-right-color', 'transparent').style('border-bottom-color','transparent').style('top', '50%').style('position','absolute').style('margin-top','-2.5px;');
      // sel.append('button').attr('class', 'first-button').html('Select country');
      const list = dropdown.append('div').attr('class', 'list-options');
      const sectionButtons = list
        .selectAll('chart-button')
        .data(data)
        .join('div')
        .attr('class', 'list-option')
        .html(d => d.label);
      
    for (const option of document.querySelectorAll(".list-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.list-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.dropdown').querySelector('.select__trigger span').textContent = this.textContent;
            }
        })
    }

    window.addEventListener('click', function(e) {
        const secondSelect = document.querySelector('.dropdown')
        if (!secondSelect.contains(e.target)) {
            secondSelect.classList.remove('open');
        }
    });

    sectionButtons.filter(function (d, i) {
        return d3.select(this).classed('selected', !i);
    });

    sectionButtons.on('click', function () {
        // Update the chart
        const info = d3.select(this).datum();
        // console.log(info.year);
        // use the year to update the chart
        updateChartSecond(info.year, info.life_expectancy, info.life_expectancy_end, info.label);
    });
}

function buildThirdControls(sel, data) {

    const dropdown = sel.append('div').attr('class', 'dropdown').attr('id', 'grandkids-year-of-birth');
    const trigger = dropdown.append('div').attr('class', 'select__trigger');
    trigger.append('span').html('Select your grandkids year of birth');
    trigger.append('span').attr('class', 'symbol')
    .append('div').style('border-width', '5px').style('border-style', 'solid').style('border-left-color','transparent').style('border-right-color', 'transparent').style('border-bottom-color','transparent').style('top', '50%').style('position','absolute').style('margin-top','-2.5px;');
      // sel.append('button').attr('class', 'first-button').html('Select country');
      const list = dropdown.append('div').attr('class', 'list-options');
      const sectionButtons = list
        .selectAll('chart-button')
        .data(data)
        .join('div')
        .attr('class', 'list-option')
        .html(d => d.label);
      
    for (const option of document.querySelectorAll(".list-option")) {
        option.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.parentNode.querySelector('.list-option.selected').classList.remove('selected');
                this.classList.add('selected');
                this.closest('.dropdown').querySelector('.select__trigger span').textContent = this.textContent;
            }
        })
    }

    window.addEventListener('click', function(e) {
        const secondSelect = document.querySelector('.dropdown')
        if (!secondSelect.contains(e.target)) {
            secondSelect.classList.remove('open');
        }
    });

    sectionButtons.filter(function (d, i) {
        return d3.select(this).classed('selected', !i);
    });

    sectionButtons.on('click', function () {
        // Update the chart
        const info = d3.select(this).datum();
        // console.log(info.year);
        // use the year to update the chart
        updateChartThird(info.year, info.life_expectancy, info.life_expectancy_end, info.label);
    });
}

function prepChartInfo(data) {
    return data.map(d => ({
      ...d,
      label: d.label ? d.label.replace(/\s/g, '').split(',') : d.label,
      year: d.year ? d.year.replace(/\s/g, '').split(',') : d.year,
      life_expectancy: d.life_expectancy ? d.life_expectancy.replace(/\s/g, '').split(',') : d.life_expectancy,
      life_expectancy_end: d.life_expectancy_end ? d.life_expectancy_end.replace(/\s/g, '').split(',') : d.life_expectancy_end,
    }));
  };

async function loadInfoData(){
    const info_data = await d3.csv("info.csv");

    const preppedData = prepChartInfo(info_data);
    console.log(preppedData);

    const sectionContainer = d3.select(container).append('div').attr('class', 'df-viz');
    sectionContainer.append('div').attr('class', 'first-dropdown-wrapper').call(buildFirstControls, preppedData);
    sectionContainer.append('div').attr('class', 'second-dropdown-wrapper').call(buildSecondControls, preppedData);
    sectionContainer.append('div').attr('class', 'third-dropdown-wrapper').call(buildThirdControls, preppedData);
    document.querySelector('.first-dropdown-wrapper').addEventListener('click', function() {
        this.querySelector('.dropdown').classList.toggle('open');
    })

    document.querySelector('.second-dropdown-wrapper').addEventListener('click', function() {
        this.querySelector('.dropdown').classList.toggle('open');
    })

    document.querySelector('.third-dropdown-wrapper').addEventListener('click', function() {
        this.querySelector('.dropdown').classList.toggle('open');
    })
}

loadInfoData();

var vis

async function loadVisualization(){
    const raw_data = await d3.csv("data-new.csv");

    //Get the information (the structure of the template)
    const response = await fetch("https://public.flourish.studio/visualisation/9338537/visualisation.json");
    
    //Convert that into json/object (format it)
    const json = await response.json(); // What is this doing, we don't know
    
    // Contains the bindings, the data, the state, etc.
    const options = {
        template: json.template,
        version: json.version,
        container: "#container",
        height: "calc(100% - 2rem)",
        api_key: "NCDegg6ooUOYhj732gNWwxnB9_CLyxt3GQFUdJSRmhcHaFVIjMO-fW2Y8b7mK9-m",
        data: {
            data: raw_data
        },
        bindings: {
            data: {
                label: "Year",
                value: ['GST_5', 'Global surface temperature', 'GST_95', 'SSP1-2.6_5', 'SSP1-2.6', 'SSP1-2.6_95', 'SSP3-7.0_5', 'SSP3-7.0', 'SSP3-7.0_95']
            }
        },
        state: json.state,
        // state: {
        //     ...json.state,
        //     // layout: {
        //     //     title: "Select your year of birth",
        //     // }
        // }
    }
    
    vis = new Flourish.Live(options);

};

loadVisualization();

function updateChartFirst(year, life_expectancy, life_expectancy_end, label){

    // experiment here -- 
    // if (typeof state1 !== 'undefined' && typeof state2 !== 'undefined') {
    //     axesHighlight = state2.axes_highlights.x_lines;
    //     axesRange = state2.axes_highlights.x_areas;
    //   } else if (typeof state1 !== 'undefined') {
    //     axesHighlight = state1.axes_highlights.x_lines;
    //     axesRange = state1.axes_highlights.x_areas;
    // } else {
    //     axesHighlight = null;
    //     axesRange = null;
    // }

    function cloneVis() {
        if (label == "None") {
            const options = {
                ...vis.state,
                state: {
                    axes_highlights: {
                        x_lines: null,
                        x_areas: null,
                    },
                    // layout: {
                    //     title: "Select a year from the dropdown.",
                    // }
                },
            }
            window.state1 = _.cloneDeep(options.state);
            console.log(state1);
        } else {
            const options = {
                ...vis.state,
                state: {
                    axes_highlights: {
                        x_lines: "you ::" + year + ":: #00c4cc",
                        x_areas: ":: " + year + " >> " + life_expectancy_end + " :: #00c4cc ",
                    },
                    // layout: {
                    //     title: "Being born in " + year + " meant your global life expectancy was " + life_expectancy + " years.",
                    // }
                },
            }
            window.state1 = _.cloneDeep(options.state);
            console.log(state1);
        }

    }

    cloneVis()

    if (label == "None") {
        vis.update({
            state: {
                axes_highlights: {
                    x_lines: null,
                    x_areas: null,
                },
                // layout: {
                //     title: "Select a year from the dropdown.",
                // }
            },
        })
    } else {
        vis.update({
            state: {
                axes_highlights: {
                    x_lines:  " you ::" + year + ":: #00c4cc",
                    x_areas:  " :: " + year + " >> " + life_expectancy_end + " :: #00c4cc ",
                },
                // layout: {
                //     title: "Being born in " + year + " meant your global life expectancy was " + life_expectancy + " years.",
                // }
            },
        })
    }

}

function updateChartSecond(year, life_expectancy, life_expectancy_end, label){

    if (typeof state1 == 'undefined') {
        axesHighlight = null;
        axesRange = null;
      } else {
        axesHighlight = state1.axes_highlights.x_lines;
        axesRange = state1.axes_highlights.x_areas;
    }

    function cloneVis() {
        if (label == "None") {
            const options = {
                ...vis.state,
                state: {
                    axes_highlights: {
                        x_lines: axesHighlight,
                        x_areas: axesRange,
                    },
                    // layout: {
                    //     title: "Being born in " + year + " meant your global life expectancy was " + life_expectancy + " years.",
                    // }
                },
            }
            window.state2 = _.cloneDeep(options.state);
            console.log(state2);

        } else {
            const options = {
                ...vis.state,
                state: {
                    axes_highlights: {
                        x_lines: axesHighlight + "\n your kid ::" + year + ":: #7d2ae8",
                        x_areas: axesRange + "\n :: " + year + " >> " + life_expectancy_end + " :: #7d2ae8",
                    },
                    // layout: {
                    //     title: "Being born in " + year + " meant your global life expectancy was " + life_expectancy + " years.",
                    // }
                },
            }
            window.state2 = _.cloneDeep(options.state);
            console.log(state2);
        }
    }

    cloneVis()
    
    if (label == "None") {
        vis.update({
            state: {
                ...vis.state,
                axes_highlights: {
                    x_lines: axesHighlight,
                    x_areas: axesRange,
                },
                // layout: {
                //     title: "Being born in " + year + " meant the global life expectancy was " + life_expectancy + " years."
                // }
            },
        })
    } else {
        vis.update({
            state: {
                ...vis.state,
                axes_highlights: {
                    x_lines: axesHighlight + "\n your kid ::" + year + ":: #7d2ae8",
                    x_areas: axesRange + "\n :: " + year + " >> " + life_expectancy_end + " :: #7d2ae8",
                },
                // layout: {
                //     title: "Being born in " + year + " meant the global life expectancy was " + life_expectancy + " years."
                // }
            },
        })
    }
    
}

function updateChartThird(year, life_expectancy, life_expectancy_end, label){

    if (typeof state1 == 'undefined' && typeof state2 == 'undefined') {
        axesHighlight = null;
        axesRange = null;
      } else if (typeof state2 == 'undefined') {
        axesHighlight = state1.axes_highlights.x_lines;
        axesRange = state1.axes_highlights.x_areas;
    } else {
        axesHighlight = state2.axes_highlights.x_lines;
        axesRange = state2.axes_highlights.x_areas;
    }
    
    if (label == "None") {
        vis.update({
            state: {
                ...vis.state,
                axes_highlights: {
                    x_lines: axesHighlight,
                    x_areas: axesRange,
                },
            },
        })
    } else {
        vis.update({
            state: {
                ...vis.state,
                axes_highlights: {
                    x_lines: axesHighlight + "\n your grandkid ::" + year + ":: #f84856",
                    x_areas: axesRange + "\n :: " + year + " >> " + life_expectancy_end + " :: #f84856",
                },
            },
        })
    }
}