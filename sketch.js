var snow = [], rotation = 0, tick = 0, snowLayer = [];
function setup() {
createCanvas(500,300);
background(0);
angleMode(DEGREES);
for(i=0;i<100;i++){
  snow[i] = new SnowFlake();
  snow[i].generateVisual();
}
  snowLayer.push(createVector(-500,height+10));
for(i=0;i<width;i++){
  snowLayer.push(createVector(i,height-1));
}
  snowLayer.push(createVector(width+500,height+10));
}

function draw() {
background(0);

for(s of snow){
  s.display();
}
stroke(255);
strokeWeight(1);
fill(255);
beginShape();
for(sl of snowLayer){
vertex(sl.x,sl.y);
}
endShape(CLOSE);

stroke(0);
line(0,height,width,height);
rotation+=0.5
tick++;
}

function SnowFlake() {
  this.pos = createVector(floor(random(1) * width),floor(random(1) * height));
  this.r = floor(4 + random(1) * 2);
  this.armsC = 5+floor(random(3));
  this.arms = [];
  this.ringsC = 1+floor(random(2));
  this.rings = [];
  this.dir = (random(1)<0.2) ? 1 : -1;
  this.tick = random(100);
  this.vel = createVector(0 , 1+random(1));


  this.generateVisual = function() {
    // for(a=0;a<this.armsC;a++){
    //   let angle = ((360/this.armsC)* a);
    //   let endposX = this.pos.x + (sin(angle)*this.r);
    //   let endposY = this.pos.y + (cos(angle)*this.r);
    //   this.arms.push(createVector(endposX,endposY));
    // }
    for(r=0;r<this.ringsC;r++){
      this.rings[r] = this.r*(1+random(1))-1;
    }
  }

  this.applyAcc = function() {

  }

  this.update = function() {
    this.pos.add(this.vel);
    this.vel = createVector(cos(this.tick)*0.5,0.5*(1+random(1)));
    if(this.pos.y>height+this.r){
        this.pos = createVector(-50+floor(random(1.5) * width),floor(random(1) * -height));
        this.generateVisual();
    }

      for(sl of snowLayer){
        if((this.pos.x+this.r>=sl.x&&this.pos.x-this.r<=sl.x)&&this.pos.y+this.r>sl.y){
              sl.y-=1/sl.y*this.r;
                  this.vel = createVector(0,1);
              //this.pos = createVector(-50+floor(random(1.5) * width),floor(random(1) * -height));
              //this.generateVisual();
        }
      }

    this.tick += 1;
  }

  this.display = function() {
    push();
    translate(this.pos.x,this.pos.y);
    this.dir = (cos(this.tick)>0) ? 1 : -1;
    rotate(rotation*(this.dir));
    stroke(255);
    strokeWeight(1);
    //for(a of this.arms){
      //line(0,0,this.pos.x-a.x,this.pos.y-a.y);
    //}
    for(a=0;a<this.armsC;a++){
      let angle = ((360/this.armsC)* a);
      let endposX = (sin(angle)*this.r);
      let endposY = (cos(angle)*this.r);
      line(0,0,endposX,endposY);
    }
    for(r=0;r<this.ringsC;r++){
      noFill();
      ellipse(0.5,0.5,this.rings[r],this.rings[r]);
    }
    pop();
    this.update();
  }
}
