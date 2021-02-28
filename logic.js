var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var score = 0;
var MusicControl = 0;

class Slave extends Image {

    constructor() {
        super();
        this.speed = this.makeSpeed(); 
        this.image = new Image();
        this.xbegin = this.makeStartCoordinates()[0];
        this.ybegin = this.makeStartCoordinates()[1];
        this.xcurrent = this.xbegin;
        this.ycurrent = this.ybegin;
        this.xpurpose; 
        this.ypurpose; 
        this.time = 10; 
        this.active = false; 
        this.type = this.makeType(); 
    }

	sound(typeSound, MusicControl){
    	var audio = document.createElement('audio');
    	audio.setAttribute("autoplay","true");
    	if(MusicControl == 0){
    		audio.innerHTML = "<source src=BackSound.mp3>";
    		document.body.appendChild(audio);
    		MusicControl = 1;
    	}    	
    	if(typeSound == 1){
    		audio.innerHTML = "<source src=Spank1.mp3>";
    		document.body.appendChild(audio);
    	}
    	if(typeSound == 2){
    		audio.innerHTML = "<source src=Spank2.mp3>";
    		document.body.appendChild(audio);
    	}
    	if(typeSound == 3){
    		audio.innerHTML = "<source src=Spank3.mp3>";
    		document.body.appendChild(audio);
    	}
	}    

    makeType() {
        var x = Math.random(),
            type;

        if (x > 0.66) {
            type = 3;
        } else if (x < 0.33) {
            type = 1;
        } else {
            type = 2;
        }
        return type;

    }

    makePhoto() {
        var photo;
        if (this.type == 1) {
            photo = "Slave1.png";
        } else if (this.type == 2) {
            photo = "Slave2.png";
        } else {
            photo = "Slave3.png";
        }
        return photo;
    }

    makeStartCoordinates() {
        var xbegin, ybegin;
        if (Math.random() > 0.5) {
            xbegin = Math.floor(Math.random() * 101 - 100);
        } else {
            xbegin = Math.floor(Math.random() * 101 + 500);
        }
        if (Math.random() > 0.5) {
            ybegin = Math.floor(Math.random() * 101 - 100);
        } else {
            ybegin = Math.floor(Math.random() * 101 + 500);
        }
        return [xbegin, ybegin]
    }

    makePurposeCoordinates() {
        this.xpurpose = Math.floor(Math.random() * 501);
        this.ypurpose = Math.floor(Math.random() * 501);
    }

    makeSpeed() {
        var x = Math.random(),
            speed;
        if (x > 0.66) {
            speed = 1.5;
        } else if (x < 0.33) {
            speed = 0.5;
        } else {
            speed = 1;
        }
        return speed;
    }

    becomeActive(xcurrent, ycurrent) {
        if (xcurrent < 500 && xcurrent > 0 && ycurrent < 500 && ycurrent > 0) {
            this.active = true;
        }
    }

    move(xcurrent, ycurrent, xpurpose, ypurpose) {
        if (xpurpose > xcurrent) {
            this.xcurrent += this.speed;
        } else {
            this.xcurrent -= this.speed;
        }
        if (ypurpose > ycurrent) {
            this.ycurrent += this.speed;
        } else {
            this.ycurrent -= this.speed;
        }
    }

    isOver(xcurrent, ycurrent, xpurpose, ypurpose) {
        if (xcurrent > xpurpose - 5 && xcurrent < xpurpose + 5 && ycurrent > ypurpose - 5 && ycurrent < ypurpose + 5) {
            this.makePurposeCoordinates();
        }
    }

    death() {
    	this.sound(this.type,MusicControl)
        this.xcurrent = this.makeStartCoordinates()[0];
        this.ycurrent = this.makeStartCoordinates()[1];
        this.makePurposeCoordinates;
        score += this.type * 10;
        this.type = this.makeType();
        this.src = this.makePhoto();   
    }

}

var bg = new Image();




var slaves = {}
for (var i = 0; i < 10; ++i) {
    slaves[i] = new Slave();
    slaves[i].src = slaves[i].makePhoto();

    slaves[i].makePurposeCoordinates();
}

bg.src = "bg.png";



function draw() {
    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < 10; ++i) {
        slaves[i].move(slaves[i].xcurrent, slaves[i].ycurrent, slaves[i].xpurpose, slaves[i].ypurpose);
        slaves[i].isOver(slaves[i].xcurrent, slaves[i].ycurrent, slaves[i].xpurpose, slaves[i].ypurpose);
        slaves[i].becomeActive(slaves[i].xcurrent, slaves[i].ycurrent);

        ctx.drawImage(slaves[i], slaves[i].xcurrent, slaves[i].ycurrent);
    }

    canvas.onclick = function() {
        for (var i = 0; i < 10; ++i) {
            if (((slaves[i].xcurrent - 5) <= (event.layerX)) && ((event.layerX) <= (slaves[i].xcurrent + 70)) &&
                (slaves[i].ycurrent - 5) <= (event.layerY) && (event.layerY) <= (slaves[i].ycurrent + 70) &&
                slaves[i].type == 1
            ) {
                slaves[i].death();
                break
            }

            if ((slaves[i].xcurrent - 5) <= (event.layerX) && (event.layerX) <= (slaves[i].xcurrent + 65) &&
                (slaves[i].ycurrent - 5) <= (event.layerY) && (event.layerY) <= (slaves[i].ycurrent + 65) &&
                slaves[i].type == 2
            ) {
                slaves[i].death();           
                break
            }

            if ((slaves[i].xcurrent - 5) <= (event.layerX) && (event.layerX) <= (slaves[i].xcurrent + 55) &&
                (slaves[i].ycurrent - 5) <= (event.layerY) && (event.layerY) <= (slaves[i].ycurrent + 55) &&
                slaves[i].type == 3
            ) {
                slaves[i].death();          
                break
            }
        }
    }
    requestAnimationFrame(draw)
}
console.log(score)

bg.onload = draw;
function Music(){

}