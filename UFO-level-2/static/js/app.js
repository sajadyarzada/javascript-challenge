var dataTable = data;

// Displaying Data
function displayMyTable(ufoSightings) {
  var tableBody = d3.select("tbody");
  ufoSightings.forEach((ufoRecord) => {
    var trow = tableBody.append("tr");
    Object.entries(ufoRecord).forEach(([key, value]) => {
      var cell = trow.append("td");
      cell.html(value);
    });
  });
};

// removing table
//
function deleteTableBody() {
  d3.select("tbody")
    .selectAll("tr").remove()
    .selectAll("td").remove();
};
  
console.log(dataTable);
displayMyTable(dataTable);

// button for filtering table
var button = d3.select("#filter-btn");

// button for filtering database
button.on("click", function(event) {
  
  d3.event.preventDefault();
  deleteTableBody();
  
  var myFilteredData = dataTable;
  var myInput = document.getElementsByClassName("form-control");
  
  for (var i = 0; i < myInput.length; i++) {
	
	var myID = myInput[i].id;
	var getField = d3.select("#" + myID).property("value");
	if (getField.trim() !== "") {
	  var myFilteredData = myFilteredData.filter(ufoSighting =>
		ufoSighting[myID].toUpperCase().trim() ===
		getField.toUpperCase().trim());
	};
  };
 
  if (myFilteredData.length == 0) {
    d3.select("tbody")
      .append("tr")
      .append("td")
        .attr("colspan", 7)
        .html("<h4>No Records Found</h4>");
  };
  
  // display and reset the data
  console.log(myFilteredData);
  displayMyTable(myFilteredData);
});

resetButton.on("click", () => {
  myTBody.html("");
  getData(dataTable)
  console.log("Table reset")
})