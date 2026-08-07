
(async()=>{
 const id=new URLSearchParams(location.search).get('id');
 const p=await fetch('../data/productos.json').then(r=>r.json());
 const x=p.find(e=>String(e.id)===id)||p[0];
 document.getElementById('producto').innerHTML=`<h1>${x.nombre}</h1><img src='../${x.imagen}'><p>${x.descripcion}</p><p>Categoría: ${x.categoria}</p>`;
})();
