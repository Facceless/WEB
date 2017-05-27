function Triangle(A, B) {
    this.A = A == undefined ? 0.0 : A;
    this.B = B == undefined ? 0.0 : B;


    this.perimeter = function () {
       return this.A*2 + this.B*2;
    };

    this.diagonal = function () {
        return Math.sqrt(this.A * this.A + this.B * this.B).toFixed(3);
    };

    this.square = function () {
        return this.A * this.B;
    }
}


function TriangleView(A, B) {
    Triangle.call(this, A, B);

    this.createOperationView = function (rowIndex) {
        var view = document.createDocumentFragment();

        var deleteButton = document.createElement("button");
        deleteButton.appendChild(document.createTextNode("Delete"));
        deleteButton.addEventListener("click", function () {
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
        td2.appendChild(document.createTextNode(this.A));
        tr.appendChild(td2);

        var td3 = document.createElement('td');
        td3.appendChild(document.createTextNode(this.B));
        tr.appendChild(td3);

        var td4 = document.createElement('td');
        td4.appendChild(document.createTextNode(this.diagonal()));
        tr.appendChild(td4);

        var td5 = document.createElement('td');
        td5.appendChild(document.createTextNode(this.perimeter()));
        tr.appendChild(td5);

        var td6 = document.createElement('td');
        td6.appendChild(document.createTextNode(this.square()));
        tr.appendChild(td6);

        var td7 = document.createElement('td');
        td7.appendChild(this.createOperationView(rowIndex));
        tr.appendChild(td7);

        return tr;
    }

}



function getRandom() {
    return Math.round(Math.random() * 100) + 1;
}

var data = {
    triangles: [
		new TriangleView(document.getElementById('A').value, document.getElementById('B').value)
    ],

    refreshTable: function () {
        var tableBody = document.getElementById('triangles');
        tableBody.innerHTML = ' ';
        for (var i = 0; i < this.triangles.length; ++i) {
            tableBody.appendChild(this.triangles[i].createRow(i));
        }
    },
    ChangeA : function (A,a) {
        
        return ((a*0.01)* A + A);
    },

    ChangeB : function (B,b) {
        return ((b*0.01) * B + B);
    },
    
    add: function (A, B) {
        this.triangles.push(new TriangleView(A, B));
        this.refreshTable();
    },
    change: function ()
    {
        this.add(this.ChangeA(+document.getElementById('A').value, +document.getElementById('a').value), this.ChangeB(+document.getElementById('B').value,+document.getElementById('a').value ));
        document.getElementById('A').value = this.ChangeA(+document.getElementById('A').value,+ document.getElementById('a').value);
        document.getElementById('B').value = this.ChangeB(+document.getElementById('B').value, +document.getElementById('a').value);
    },
    addRandom: function () {
        this.add(getRandom(), getRandom(), getRandom(), getRandom());
    },

    deleteTriangle: function (index) {
        this.triangles.splice(index, 1);
        this.refreshTable();
    },

    clear: function () {
        this.triangles = [];
        this.refreshTable();
    }
}

 

