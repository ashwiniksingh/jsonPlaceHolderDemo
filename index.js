//https://jsonplaceholder.typicode.com/posts

const loader = document.querySelector('.noLoader')

function displayLoading() {
  loader.classList.add('loading');
}

function stopLoading() {
  loader.classList.remove('loading');
}


const wait = ms => new Promise(
  (resolve, reject) => setTimeout(resolve, ms)
);


let posts = async () => {
  displayLoading();
  await wait(3000);
    let data = await fetch('https://jsonplaceholder.typicode.com/posts');
    let posts = await data.json();
    stopLoading();
    console.log(posts);
    // get the reference for the body
    var body = document.getElementsByTagName("body")[0];

    // creates a <table> element and a <tbody> element
    var tbl = document.getElementById('tbl')
    var tblBody = document.createElement("tbody");

    // creating all cells
    for (var i = 0; i < posts.length; i++) {
        // creates a table row
        var row = document.createElement("tr");
        var th = document.createElement("th")


        // Create a <td> element and a text node, make the text
        // node the contents of the <td>, and put the <td> at
        // the end of the table row
        var cell = document.createElement("td");
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var cellText1 = document.createTextNode(posts[i].userId);
        var cellText = document.createTextNode(posts[i].title);
        var cellText2 = document.createTextNode(posts[i].body);
        var cellText3 = document.createTextNode(posts[i].id);
        cell1.appendChild(cellText1);
        cell3.appendChild(cellText3);
        cell.appendChild(cellText);
        cell2.appendChild(cellText2);

        row.appendChild(cell1);
        row.appendChild(cell3);
        row.appendChild(cell);
        row.appendChild(cell2);


        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    tbl.setAttribute("border", "2");
}
posts()

async function New() {
    var userid = document.getElementById("new_userId").value;
    var new_title = document.getElementById("new_title").value;
    var new_body = document.getElementById("new_body").value;

    console.log("Input Data: " + userid + " " + new_title + " " + new_body);

    // loading for post call
    displayLoading();
    await wait(2000);
    stopLoading();

    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: new_title,
          body: new_body,
          userId: userid
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      })
      .then(response => response.json())
      .then(jsonData => {
        console.log('response: ' + JSON.stringify(jsonData));
        insertData(jsonData)
        return jsonData;
      })
  }

  function insertData(data){
    console.log('here is ' + JSON.stringify(data));

    var table = document.getElementById("tbl");
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = data.userId;
  cell2.innerHTML = data.id;
  cell3.innerHTML = data.title;
  cell4.innerHTML = data.body;
  }

/*let writeData = (data) => {
    let table = document.getElementById('postTable');
    let id = document.getElementById('id');
    let title = document.getElementById('title');
    posts();
    posts.forEach(e, {
        table.setAttribute('')
    })
}*/
