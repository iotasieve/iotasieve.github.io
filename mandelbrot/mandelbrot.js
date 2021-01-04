let canv = document.getElementsByTagName("canvas")[0];
let ctx = canv.getContext("2d");
let zoom = 3000;
let stop = false;
let iterMax = 1000;
let resolution = 0.5;
let ox = -1.768779085;
let oy = -0.001738908;
rerender()
/*
setInterval(() => {
    if (resolution < 1)
    {
        resolution *= 2;
        rerender();
    }
}, resolution*1000)
*/
window.onload = () => {
    let zoomer = document.getElementById("zoomer");
    let xoomer = document.getElementById("xoomer");
    let yoomer = document.getElementById("yoomer");
    let iter = document.getElementById("iter");
    let resol = document.getElementById("res");

    resol.addEventListener("change", e => {
        resolution = resol.value
        console.log(zoom, ox, oy, iterMax)
        rerender()
    })

    iter.addEventListener("change", e => {
        iterMax = iter.value
        console.log(zoom, ox, oy, iterMax)
        rerender()
    })

    zoomer.addEventListener("change", e => {
        zoom = zoomer.value
        console.log(zoom, ox, oy, iterMax)
        rerender()
    })

    xoomer.addEventListener("change", e => {
        ox = xoomer.value
        console.log(zoom, ox, oy, iterMax)
        rerender()
    })

    yoomer.addEventListener("change", e => {
        oy = yoomer.value
        console.log(zoom, ox, oy, iterMax)
        rerender()
    })
}
function rerender()
{
let resol = resolution;
for (let i = 0; i < canv.width*resol; i += 1)
{
  for (let j = 0; j < canv.height*resol; j += 1)
  {
    let c = [(i/Math.min(canv.height*resol, canv.width*resol)*2)-1, (j/Math.min(canv.height*resol, canv.width*resol)*2)-1];
    c[0] += ox*(zoom*zoom);
    c[1] += oy*(zoom*zoom);
    c[0] /= zoom*zoom;
    c[1] /= zoom*zoom;

    let z = [0, 0];
    let iter = 0;
    if (stop)
    {
        stop = false;
        return;
    }
    for (let i = 0; i < iterMax; i += 1)
    {
      // z^2 + c
      // z^2
      // (z[0]+z[1]i)(z[0]+z[1]i)
      // z[0]^2 + z[0]*z[1]i + z[0]*z[1]i + z[1]i^2
      // z[0]^2 - z[1]^2 + 2(z[0]*z[1]i)
      
      z = [(z[0]**2-z[1]**2), 2*(z[0]*z[1])];
      z[0] += c[0];
      z[1] += c[1];
      // 2 ** 2 = 4
      if ((z[0]**2+z[1]**2) > 4) break;
      
      iter += 1;   
    }
    let col = iter/iterMax;
    col = 1-col;
    ctx.fillStyle = `hsl(${(col*(col*997))+160}deg, 60%, ${col*100 < 50 ? col*(col*100): 40}%)`;
    ctx.fillRect(i/resol, j/resol, Math.ceil(1/resol), Math.ceil(1/resol));
  }
}


}
