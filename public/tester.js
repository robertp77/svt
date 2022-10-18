async function getj(x,y,load){
    const ans=await fetch('http://localhost:5000/api/robots/closest/',{
    headers:{'Accept': 'application/json',
    'Content-Type': 'application/json'},
    method: 'POST',
    body:`{"x": ${x}, "y": ${y}}`
    }
    )
    return ans.json()
}
async function getans(){
    let load=document.getElementById('load');
    let x=parseFloat(document.getElementById('x').value);
    let y=parseFloat(document.getElementById('y').value)
    var ans=await getj(x,y,load)
    let resp=document.getElementById('resp');
    resp.innerHTML=JSON.stringify(ans)
}
async function getj2(jsn){
    const ans=await fetch('http://localhost:5000/api/robots/closest/',{
    headers:{'Accept': 'application/json',
    'Content-Type': 'application/json'},
    method: 'POST',
    body:jsn
    }
    )
    return ans.json()
}
async function getans2(){
    let jsn=document.getElementById('jsn').value;
    var ans=await getj2(jsn);
    let resp=document.getElementById('resp2');
    resp.innerHTML=JSON.stringify(ans);
}
