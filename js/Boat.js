class Boat {
    constructor(x,y,width,height,boatPosition) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.boatPosition = boatPosition;
        var options = {
            restitution: 0.8,
            friction: 1.0,
            density: 1.0
        }
        this.body = Bodies.rectangle(x,y,width,height,options);
        this.image = loadImage("assets/boat.png");
        World.add(world,this.body);
    }
    display() {
        var pos = this.body.position;
        push();
            translate(pos.x,pos.y);
            imageMode(CENTER);
            image(this.image,0,this.boatPosition,this.width,this.height);
        pop();
    }
    remove(i) {
        setTimeout(()=>{
            Matter.World.remove(world,boats[i].body);
            delete boats[i];
        },2000);
    }
}