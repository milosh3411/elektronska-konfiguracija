var ne //broj elektrona
var nivoi = [] //niz labela svih nivoa
var nivoi_obj = [] //niz opisa svih nivoa
var podnivo = [] // niz podnivoa; indeks elementa odgovara orbitalnom broju (l)
var w,h,mrg,s
var button, inp,slider
var elements = []

function broj_elektrona() {
ne = slider.value()
redraw()
}
function myInputEvent() {
console.log('you are typing: ', this.value());
ne = this.value()
}
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
  elements = [
    ["Hydrogen","H",1],
    ["Helium","He",2],
    ["Lithium","Li",3],
    ["Beryllium","Be",4],
    ["Boron","B",5],
    ["Carbon","C",6],
    ["Nitrogen","N",7],
    ["Oxygen","O",8],
    ["Fluorine","F",9],
    ["Neon","Ne",10],
    ["Sodium","Na",11],
    ["Magnesium","Mg",12],
    ["Aluminium","Al",13],
    ["Silicon","Si",14],
    ["Phosphorus","P",15],
    ["Sulfur","S",16],
    ["Chlorine","Cl",17],
    ["Argon","Ar",18],
    ["Potassium","K",19],
    ["Calcium","Ca",20],
    ["Scandium","Sc",21],
    ["Titanium","Ti",22],
    ["Vanadium","V",23],
    ["Chromium","Cr",24],
    ["Manganese","Mn",25],
    ["Iron","Fe",26],
    ["Cobalt","Co",27],
    ["Nickel","Ni",28],
    ["Copper","Cu",29],
    ["Zinc","Zn",30],
    ["Gallium","Ga",31],
    ["Germanium","Ge",32],
    ["Arsenic","As",33],
    ["Selenium","Se",34],
    ["Bromine","Br",35],
    ["Krypton","Kr",36],
    ["Rubidium","Rb",37],
    ["Strontium","Sr",38],
    ["Yttrium","Y",39],
    ["Zirconium","Zr",40],
    ["Niobium","Nb",41],
    ["Molybdenum","Mo",42],
    ["Technetium","Tc",43],
    ["Ruthenium","Ru",44],
    ["Rhodium","Rh",45],
    ["Palladium","Pd",46],
    ["Silver","Ag",47],
    ["Cadmium","Cd",48],
    ["Indium","In",49],
    ["Tin","Sn",50],
    ["Antimony","Sb",51],
    ["Tellurium","Te",52],
    ["Iodine","I",53],
    ["Xenon","Xe",54],
    ["Cesium","Cs",55],
    ["Barium","Ba",56],
    ["Lanthanum","La",57],
    ["Cerium","Ce",58],
    ["Praseodymium","Pr",59],
    ["Neodymium","Nd",60],
    ["Promethium","Pm",61],
    ["Samarium","Sm",62],
    ["Europium","Eu",63],
    ["Gadolinium","Gd",64],
    ["Terbium","Tb",65],
    ["Dysprosium","Dy",66],
    ["Holmium","Ho",67],
    ["Erbium","Er",68],
    ["Thulium","Tm",69],
    ["Ytterbium","Yb",70],
    ["Lutetium","Lu",71],
    ["Hafnium","Hf",72],
    ["Tantalum","Ta",73],
    ["Tungsten","W",74],
    ["Rhenium","Re",75],
    ["Osmium","Os",76],
    ["Iridium","Ir",77],
    ["Platinum","Pt",78],
    ["Gold","Au",79],
    ["Mercury","Hg",80],
    ["Thallium","Tl",81],
    ["Lead","Pb",82],
    ["Bismuth","Bi",83],
    ["Polonium","Po",84],
    ["Astatine","At",85],
    ["Radon","Rn",86],
    ["Francium","Fr",87],
    ["Radium","Ra",88],
    ["Actinium","Ac",89],
    ["Thorium","Th",90],
    ["Protactinium","Pa",91],
    ["Uranium","U",92],
    ["Neptunium","Np",93],
    ["Plutonium","Pu",94],
    ["Americium","Am",95],
    ["Curium","Cm",96],
    ["Berkelium","Bk",97],
    ["Californium","Cf",98],
    ["Einsteinium","Es",99],
    ["Fermium","Fm",100],
    ["Mendelevium","Md",101],
    ["Nobelium","No",102],
    ["Lawrencium","Lr",103],
    ["Rutherfordium","Rf",104],
    ["Dubnium","Db",105],
    ["Seaborgium","Sg",106],
    ["Bohrium","Bh",107],
    ["Hassium","Hs",108],
    ["Meitnerium","Mt",109],
    ["Darmstadtium","Ds",110],
    ["Roentgenium","Rg",111],
    ["Copernicium","Cn",112],
    ["Nihonium","Nh",113],
    ["Flerovium","Fl",114],
    ["Moscovium","Mc",115],
    ["Livermorium","Lv",116],
    ["Tennessine","Ts",117],
    ["Oganesson","Og",118]    
  ]

  /*button = createButton('OK');
  button.position(110, 0);
  button.mousePressed(broj_elektrona);  
  inp = createInput('');
  inp.position(0, 0);
  inp.size(100);
  inp.input(myInputEvent);  */
  ne = 10
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
  slider = createSlider(1, 118, 10,1);
  slider.position(mrg+10, mrg);
  slider.style('width', '80%');
  slider.mouseMoved(broj_elektrona);   
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
    textAlign(LEFT,BOTTOM);
    textSize(.9*s)
    text(nivoi[i],10+s*(nivoi_obj[i].ml.length+nivoi_obj[i].k),-s*nivoi_obj[i].r)
  }
  let j = 0
  for(let spin=0;spin<2;spin++){
    for(let o = 0;o<nivoi_obj[i].ml.length;o++){
      if(ne>0){
        kockica(s*(o+nivoi_obj[i].k),-s*nivoi_obj[i].r,spin)
        textSize(.5*s)
        textAlign(LEFT,TOP)
        fill(220)
        noStroke()
        rect(1.4*s+s*(nivoi_obj[i].ml.length+nivoi_obj[i].k),-s*(nivoi_obj[i].r+1), .6*s,.5*s)
        fill(10)
        stroke(10)
        text(j+1,1.4*s+s*(nivoi_obj[i].ml.length+nivoi_obj[i].k),-s*(nivoi_obj[i].r+1))
        ne--
        j++
      }
    }
  }
  pop()
  i++
 }
 textSize(s)
 text("Broj elektrona: "+slider.value(),mrg+10,2*mrg)
 text("Element: "+elements[slider.value()-1][0],mrg+10,3*mrg)
 text("Simbol: "+elements[slider.value()-1][1],mrg+10,4*mrg)
}