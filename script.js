var margin = { top: 30, right: 30, bottom: 70, left: 60 },
	width = 750 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

const ICE_CITY = [20.6, 24.2, 22.7, 17.0];
const ICE_HIGHWAY = [28.0, 31.9, 28.0, 21.5];
const ICE_COMBINED = [23.4, 27.1, 24.8, 18.7];

const BEV_CITY = [83.1, 106.8, 104.8, 75.2];
const BEV_HIGHWAY = [83.0, 99.3, 91.6, 65.2];
const BEV_COMBINED = [83.1, 103.1, 98.4, 68.5];

var y = d3.scaleLinear().domain([0, 35]).range([height, 0]);

async function loadScene1() {
	var svg = d3
		.select("#my_dataviz")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	data = await d3.csv("data.csv").then(function (data) {
		var x = d3
			.scaleBand()
			.range([0, width])
			.domain(
				data.map(function (d) {
					return d.Class;
				})
			)
			.padding(0.2);
		svg
			.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x))
			.selectAll("text")
			.attr("transform", "translate(-10,0)rotate(-45)")
			.style("text-anchor", "end");

		svg
			.append("text")
			.attr("x", -140)
			.attr("y", -30)
			.attr("transform", "rotate(-90)")
			.attr("text-anchor", "middle")
			.text("ICE MPG");

		// Add Y axis
		var y = d3.scaleLinear().domain([0, 35]).range([height, 0]);
		svg.append("g").call(d3.axisLeft(y));

		// Bars
		svg
			.selectAll("mybar")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function (d) {
				return x(d.Class);
			})
			.attr("y", function (d) {
				return y(d.ICE_CITY);
			})
			.attr("width", x.bandwidth())
			.attr("height", function (d) {
				return height - y(d.ICE_CITY);
			})
			.attr("fill", "#a32231")
			.on("mouseover", function (event, data) {
				tooltip.transition().duration(200).style("opacity", 0.9);
				tooltip
					.html("Combined MPG: " + data.ICE_COMBINED)
					.style("left", event.pageX + "px")
					.style("top", event.pageY - 28 + "px");
			})
			.on("mouseout", function (d) {
				tooltip.transition().duration(500).style("opacity", 0);
			});
	});

	var tooltip = d3
		.select("#my_dataviz")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0)
		.style("background-color", "black")
		.style("border-radius", "5px")
		.style("padding", "1px")
		.style("color", "white")
		.style("position", "absolute");
}

async function loadScene2() {
	var y = d3.scaleLinear().domain([0, 110]).range([height, 0]);

	var svg = d3
		.select("#my_dataviz")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	data = await d3.csv("data.csv").then(function (data) {
		var x = d3
			.scaleBand()
			.range([0, width])
			.domain(
				data.map(function (d) {
					return d.Class;
				})
			)
			.padding(0.2);
		svg
			.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x))
			.selectAll("text")
			.attr("transform", "translate(-10,0)rotate(-45)")
			.style("text-anchor", "end");

		svg
			.append("text")
			.attr("x", -140)
			.attr("y", -30)
			.attr("transform", "rotate(-90)")
			.attr("text-anchor", "middle")
			.text("MPGe");

		svg.append("g").call(d3.axisLeft(y));

		svg
			.selectAll("mybar")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function (d) {
				return x(d.Class);
			})
			.attr("y", function (d) {
				return y(d.BEV_CITY);
			})
			.attr("width", x.bandwidth())
			.attr("height", function (d) {
				return height - y(d.BEV_CITY);
			})
			.attr("fill", "#a32231")
			.on("mouseover", function (event, data) {
				tooltip.transition().duration(200).style("opacity", 0.9);
				tooltip
					.html("Combined MPGe: " + data.BEV_COMBINED)
					.style("left", event.pageX + "px")
					.style("top", event.pageY - 28 + "px");
			})
			.on("mouseout", function (d) {
				tooltip.transition().duration(500).style("opacity", 0);
			});
	});

	var tooltip = d3
		.select("#my_dataviz")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0)
		.style("background-color", "black")
		.style("border-radius", "5px")
		.style("padding", "1px")
		.style("color", "white")
		.style("position", "absolute");

	const annotations = [
		{
			note: {
				label: "Notice for BEVs peak efficiency happens in city driving",

				wrap: 170,
				align: "left",
			},
			connector: {
				end: "arrow",
			},
			x: 300,
			y: 42,
			dy: 0,
			dx: 300,
		},
	].map(function (d) {
		d.color = "#000000";
		return d;
	});

	const makeAnnotations = d3
		.annotation()
		.type(d3.annotationLabel)
		.annotations(annotations);

	d3.select("svg")
		.append("g")
		.attr("class", "annotation-group")
		.attr("id", "annot")
		.call(makeAnnotations);
}

async function loadScene3() {
	formValidation();
	var y = d3.scaleLinear().domain([0, 4000]).range([height, 0]);
	var svg = d3
		.select("#my_dataviz")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	data = await d3.csv("data.csv").then(function (data) {
		var x = d3
			.scaleBand()
			.range([0, width])
			.domain(
				data.map(function (d) {
					return d.Class;
				})
			)
			.padding(0.2);
		svg
			.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x))
			.selectAll("text")
			.attr("transform", "translate(-10,0)rotate(-45)")
			.style("text-anchor", "end");

		svg
			.append("text")
			.attr("x", -130)
			.attr("y", -40)
			.attr("transform", "rotate(-90)")
			.attr("text-anchor", "middle")
			.text("$USD");

		svg.append("g").call(d3.axisLeft(y));

		svg
			.selectAll("mybar")
			.data(data)
			.enter()
			.append("rect")
			.attr("x", function (d) {
				return x(d.Class);
			})
			.attr("y", function (d) {
				return y(
					fuelsavings(
						d.ICE_COMBINED,
						d.BEV_COMBINED,
						document.getElementById("quantity").value
					)
				);
			})
			.attr("width", x.bandwidth())
			.attr("height", function (d) {
				return (
					height -
					y(
						fuelsavings(
							d.ICE_COMBINED,
							d.BEV_COMBINED,
							document.getElementById("quantity").value
						)
					)
				);
			})
			.attr("fill", "#42f548")
			.on("mouseover", function (event, data) {
				tooltip.transition().duration(200).style("opacity", 0.9);
				tooltip
					.html(
						"Annual Fuel Savings: $" +
							parseInt(
								fuelsavings(
									data.ICE_COMBINED,
									data.BEV_COMBINED,
									document.getElementById("quantity").value
								)
							)
					)
					.style("left", event.pageX + "px")
					.style("top", event.pageY - 28 + "px");
			})
			.on("mouseout", function (d) {
				tooltip.transition().duration(500).style("opacity", 0);
			});
	});

	var tooltip = d3
		.select("#my_dataviz")
		.append("div")
		.attr("class", "tooltip")
		.style("opacity", 0)
		.style("background-color", "black")
		.style("border-radius", "5px")
		.style("padding", "1px")
		.style("color", "white")
		.style("position", "absolute");
}

function updateMpgChartIce(setting) {
	if (setting === "city") {
		d3.select("#my_dataviz")
			.selectAll("rect")
			.transition()
			.duration(2000)
			.attr("fill", "#a32231")
			.attr("y", function (d, i) {
				return y(ICE_CITY[i]);
			})
			.attr("height", function (d, i) {
				return height - y(ICE_CITY[i]);
			});
	} else {
		d3.select("#my_dataviz")
			.selectAll("rect")
			.transition()
			.duration(2000)
			.attr("fill", "#1A3AFA")
			.attr("y", function (d, i) {
				return y(ICE_HIGHWAY[i]);
			})
			.attr("height", function (d, i) {
				return height - y(ICE_HIGHWAY[i]);
			});
	}
}

function updateMpgChartBev(setting) {
	var y = d3.scaleLinear().domain([0, 110]).range([height, 0]);
	let annotation = document.getElementById("annot");

	if (setting === "city") {
		d3.select("#my_dataviz")
			.selectAll("rect")
			.transition()
			.duration(2000)
			.attr("fill", "#a32231")
			.attr("y", function (d, i) {
				return y(BEV_CITY[i]);
			})
			.attr("height", function (d, i) {
				return height - y(BEV_CITY[i]);
			});
		annotation.style.display = "inline";
	} else {
		d3.select("#my_dataviz")
			.selectAll("rect")
			.transition()
			.duration(2000)
			.attr("fill", "#1A3AFA")
			.attr("y", function (d, i) {
				return y(BEV_HIGHWAY[i]);
			})
			.attr("height", function (d, i) {
				return height - y(BEV_HIGHWAY[i]);
			});

		annotation.style.display = "none";
	}
}

function fuelsavings(iceMpg, bevMpg, annualMilesDriven = 14000) {
	const nationalAverageGasPrice = 4.25;
	const nationalAverageCentsPerKwh = 0.15;
	iceCost = (annualMilesDriven / iceMpg) * nationalAverageGasPrice;
	bevCost =
		(annualMilesDriven / (bevMpg / 33.705)) * nationalAverageCentsPerKwh;
	return iceCost - bevMpg;
}

function updateFuelSavignsChart(mileage) {
	mileage = Number.parseInt(mileage);

	var y = d3.scaleLinear().domain([0, 4000]).range([height, 0]);

	d3.select("#my_dataviz")
		.selectAll("rect")
		.transition()
		.duration(2000)
		.attr("fill", "#42f548")
		.attr("y", function (d, i) {
			return y(fuelsavings(d.ICE_COMBINED, d.BEV_COMBINED, mileage));
		})
		.attr("height", function (d, i) {
			return height - y(fuelsavings(d.ICE_COMBINED, d.BEV_COMBINED, mileage));
		});
}

function formValidation(obj) {
	let mileage = obj;

	if (mileage < 1 || mileage > 30000) {
		document.getElementById("button").disabled = true;
	} else {
		document.getElementById("button").disabled = false;
	}
}
