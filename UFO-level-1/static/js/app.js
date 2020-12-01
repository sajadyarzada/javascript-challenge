// from data.js
var tableData = data;
var myTableData = data;

// YOUR CODE HERE!
var myTBody = d3.select("tbody");
var myButton = d3.select("#filter-btn");

var inputDateTime = d3.select("#datetime");
var inputMyCity = d3.select("#city");
var resetButton = d3.select("#reset-btn");
var myColumns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

// Populating data using getData

var getData = (dataInput) => {
	dataInput.forEach(ufo_sightings => {
		var row = myTBody.append("tr");
		myColumns.forEach(myColumns => row.append("td").text(ufo_sightings[myColumns])
		)
	});
}

getData(data);

// Using Button to filter data
myButton.on("click", () => {
	d3.event.preventDefault();
	var inputDate = inputDateTime.property("value").trim();
	var inputCity = inputMyCity.property("value").toLowerCase().trim();
    
	var filterMyDate = data.filter(data => data.datetime === inputDate);
	console.log(filterMyDate)
    
	var filterMyCity = data.filter(data => data.city === inputCity);
	console.log(filterMyCity)
    
	var filterMyData = data.filter(data => data.datetime === inputDate && data.city === inputCity);
	console.log(filterMyData)

	myTBody.html("");

	let myReply = {
		filterMyData, filterMyCity, filterMyDate
	}
    
    // get data in case user input conatains both matching date and city
	if (myReply.filterMyData.length !== 0) {
		getData(filterMyData);
	}
		else if (myReply.filterMyData.length === 0 && ((myReply.filterMyCity.length !== 0 || myReply.filterMyDate.length !== 0))){
			getData(filterMyCity) || getData(filterMyDate);
	
		}
		else {
			myTBody.append("tr").append("td").text("No results found!");
		}
})

resetButton.on("click", () => {
	myTBody.html("");
	getData(data)
	console.log("Table reset")
})