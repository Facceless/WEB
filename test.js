function Triangle(a, b, c) {
	this.a = a == undefined ? 0.0 : a;
	this.b = b == undefined ? 0.0 : b;
	this.c = c == undefined ? 0.0 : c;

	this.perimeter = function() {
		return this.a + this.b + this.c;
	};
}

function TriangleView(a, b, c) {
	Triangle.call(this, a, b, c);

	this.createOperationView = function(rowIndex) {
		var view = document.createDocumentFragment();
		
		var deleteButton = document.createElement("button");
		deleteButton.appendChild(document.createTextNode("Delete"));
		deleteButton.addEventListener("click", function() {
			data.deleteTriangle(rowIndex);
		});
		view.appendChild(deleteButton);

		return view;
	}

	this.createRow = function(rowIndex) {
	    var tr = document.createElement('tr');
	    tr.id = "row_" + rowIndex;

	    var td1 = document.createElement('td');
	    td1.appendChild(document.createTextNode('#' + rowIndex));
		tr.appendChild(td1);

	    var td2 = document.createElement('td');
	    td2.appendChild(document.createTextNode(this.a));
	    tr.appendChild(td2);
	    
	    var td3 = document.createElement('td');
	    td3.appendChild(document.createTextNode(this.b));
		tr.appendChild(td3);

		var td4 = document.createElement('td');
	    td4.appendChild(document.createTextNode(this.c));
		tr.appendChild(td4);

		var td5 = document.createElement('td');
	    td5.appendChild(document.createTextNode(this.perimeter()));
		tr.appendChild(td5);

		var td6 = document.createElement('td');
	    td6.appendChild(this.createOperationView(rowIndex));
		tr.appendChild(td6);

		return tr;
	}

}

function getRandom() {
	return Math.round(Math.random()*100)+1;
}

var data = {
	triangles : [
		new TriangleView(1,2,3),
		new TriangleView(3,4,5),
		new TriangleView(10,10,10)
	],
	
	refreshTable : function() {
		var tableBody = document.getElementById('triangles');
		tableBody.innerHTML = '';
		for(var i = 0; i < this.triangles.length; ++i) {
			tableBody.appendChild(this.triangles.createRow(i));
		}
	},

	add : function(a, b, c) {
		this.triangles.push(new TriangleView(a, b, c));
		this.refreshTable();
	},

	addRandom : function() {
		this.add(getRandom(), getRandom(), getRandom());
	},

	deleteTriangle : function(index) {
		this.triangles.splice(index, 1);
		this.refreshTable();
	},

	clear : function() {
		this.triangles = [];
		this.refreshTable();
	}
}
