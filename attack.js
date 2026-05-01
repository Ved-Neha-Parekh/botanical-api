for(let i = 1; i <= 100; i++) {
    fetch("http://localhost:3000/api/plants/")
    .then((res)=>{
        console.log(res.status)
    })
    .catch((error)=>{
        console.log(error.message);
    })
}