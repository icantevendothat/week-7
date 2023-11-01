window.addEventListener('load',()=>{
    document.getElementById('cryButton').addEventListener('click', ()=>{
        let minCried = document.getElementById("minutes-cried").value;
        console.log(minCried);
        let currentDate = new Date();
        let obj = {"number": minCried,
                    "date": currentDate
            };
        let jsonData = JSON.stringify(obj);

        fetch('/minCried', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body:jsonData
        })
        .then(response => response.json())
        .then(data => {console.log(data)});
    })

    document.getElementById('get-tracker').addEventListener('click',() => {
        //get info on all the minutes i've cried so far
        fetch('/getMinutes')
        .then(resp=> resp.json())
        .then(data => {
            document.getElementById('crying-info').innerHTML = "";
            console.log(data.data);
            for(let i=0; i<data.data.length; i++){
                let string = data.data[i].date + " : " + data.data[i].cries;
                let elt = document.createElement('p');
                elt.innerHTML = string;
                document.getElementById('crying-info').appendChild(elt);
            }
        })
    })

})

