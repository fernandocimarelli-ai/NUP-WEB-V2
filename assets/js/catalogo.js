
async function init(){
 const [p,c]=await Promise.all([fetch('../data/productos.json').then(r=>r.json()),fetch('../data/categorias.json').then(r=>r.json())]);
 const sel=document.getElementById('categoria'); sel.innerHTML=c.map(x=>`<option value="${x.id}">${x.nombre}</option>`).join('');
 const grid=document.getElementById('grid'); const q=document.getElementById('buscar');
 function render(){let f=p.filter(x=>(sel.value==='all'||x.categoria===sel.value)&&x.nombre.toLowerCase().includes(q.value.toLowerCase()));
 grid.innerHTML=f.map(x=>`<div class='card'><img src='../${x.imagen}'><h3>${x.nombre}</h3><p>${x.descripcion}</p><a href='producto.html?id=${x.id}'>Ver</a></div>`).join('');}
 sel.onchange=render;q.oninput=render;render();
} init();
