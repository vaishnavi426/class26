class CannonBall {
    constructor(x,y){
        this.x=  x;
        this.y = y;
        var options = {
            isStatic : true
        }
        this.r = 25;
        this.body = Bodies.circle(x,y,this.r,options);
        this.image = loadImage("assets/cannonball.png");
        World.add(world,this.body);
        this.tragictory = [];
    }
    display(){
        push()
            imageMode(CENTER);
            image(this.image,this.body.position.x,this.body.position.y,this.r,this.r);
        pop()
        console.log(this.body.position);
        if(this.body.velocity.x>0 && this.body.position.x>250) {
            var position = [this.body.position.x,this.body.position.y];
            this.tragictory.push(position);
        }
        for(var i=0;i<this.tragictory.length;i++){
            //image(this.image,this.tragictory[i][0],this.tragictory[i][1],5,5);
            fill("black");
            ellipse(this.tragictory[i][0],this.tragictory[i][1],3,3);
        }
    }
    shoot(){
        var newAngle = cannon.angle-28;
        newAngle = newAngle*(3.14/180);
        var velocity = p5.Vector.fromAngle(newAngle);
        velocity.mult(0.5);
        Matter.Body.setStatic(this.body,false);
        Matter.Body.setVelocity(this.body,{
            x: velocity.x*(180/3.14),
            y: velocity.y*(180/3.14)
        })
    }
    remove(i) {
        Matter.Body.setVelocity(this.body,{
            x: 0,
            y: 0
        })
        setTimeout(()=>{
            Matter.World.remove(world,this.body);
            delete balls[i];
        },1000);
    }
}