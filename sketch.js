var ne //broj elektrona
var nivoi = [] //niz labela svih nivoa
var nivoi_obj = [] //niz opisa svih nivoa
var podnivo = [] // niz podnivoa; indeks elementa odgovara orbitalnom broju (l)
var w,h,mrg,s

function en_nivo(labela) {
  return labela.charAt(0);
}
function orb_broj(labela) {
  let pn = labela.charAt(1)
  return podnivo.indexOf(pn)
}
function mag_broj(labela) {
  let l = orb_broj(labela)
  if(l==0){
    return [0]
  } else {
    let ml = []
    for(let i = -l;i<l+1;i++){
      ml.push(i)
    }
    return ml    
  }
}
function kolona(labela) {
  let i = nivoi.indexOf(labela)
  let k = 0;
  for(let j = 0;j<i;j++){
    k += nivoi_obj[j].ml.length
  }
  return k
}
function kockica(x,y,e){
  fill(255)
  beginShape()
  vertex(x, y)
  vertex(x,y-s)
  vertex(x+s,y-s)
  vertex(x+s,y)
  endShape(CLOSE)
  fill(0)
  if(e==0){
    line(x+s/3,y-s/4,x+s/3,y-3*s/4)
    beginShape()
    vertex(x+s/3,y-3*s/4)
    vertex(x+s/3+s/10,y-3*s/4+s/6)
    vertex(x+s/3-s/10,y-3*s/4+s/6)
    endShape(CLOSE)
  }
  if(e==1){
    line(x+s/3,y-s/4,x+s/3,y-3*s/4)
    beginShape()
    vertex(x+s/3,y-3*s/4)
    vertex(x+s/3+s/10,y-3*s/4+s/6)
    vertex(x+s/3-s/10,y-3*s/4+s/6)
    endShape(CLOSE)
    line(x+2*s/3,y-s/4,x+2*s/3,y-3*s/4)
    beginShape()
    vertex(x+2*s/3,y-s/4)
    vertex(x+2*s/3+s/10,y-s/4-s/6)
    vertex(x+2*s/3-s/10,y-s/4-s/6)
    endShape(CLOSE)
  }
}
function setup() {
  ne = 67
  nivoi = ["1s","2s","2p","3s","3p","4s","3d","4p","5s","4d","5p","6s","4f","5d","6p","7s","5f","6d","7p"]
  podnivo = ["s","p","d","f"]
  for(let i=0; i<nivoi.length;i++) {
    let opis_nivoa = {
      lab: nivoi[i],
      n: en_nivo(nivoi[i]),
      l: orb_broj(nivoi[i]),
      ml: mag_broj(nivoi[i]),
      r: i,
      k: kolona(nivoi[i])
    }
    nivoi_obj.push(opis_nivoa)
  }
  for(let i=0; i<nivoi_obj.length;i++) {
    console.log(nivoi_obj[i])
  }
  noLoop()
  w = 1600
  h = 800
  mrg = 50 //margine
  let r_max = 20
  let k_max = kolona("7p")+3
  let dy = (h-2*mrg)/(r_max-1)
  let dx = (w-2*mrg)/(k_max-1)
  s = min(dx,dy)
  
  createCanvas(w, h);
}

function draw() {
 let i = 0;
 background(220);
 while(ne>0){
  push()
  translate(mrg,h-mrg)
  line(0,0,0,-h+2*mrg)
  line(0,0,w-2*mrg,0)
  for(let o = 0;o<nivoi_obj[i].ml.length;o++){
    kockica(s*(o+nivoi_obj[i].k),-s*nivoi_obj[i].r,2)
  }
  for(let spin=0;spin<2;spin++){
    for(let o = 0;o<nivoi_obj[i].ml.length;o++){
      if(ne>0){
        kockica(s*(o+nivoi_obj[i].k),-s*nivoi_obj[i].r,spin)
        ne--
      }
    }
  }
  pop()
  i++
 }
}