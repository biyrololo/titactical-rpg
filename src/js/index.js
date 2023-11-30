const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); 
const DRAWN_SIZE_RATIO = isMobile ? 0.8 : 1;

class Entity{
    constructor(name, size, anims,pos={x:0,y:0}, enemy=false, isBoss=false){
        this.secondAttack=false;
        this.extraDamage=0;
        this.isBoss=isBoss;
        this.name=name;
        this.size=size;
        this.enemy=enemy;
        this.anims=anims;
        this.critChance=anims.critChance/100;
        this.initImages();
        this.maxHp=anims.maxHp;
        this.current={
            img: this.idle, health: this.maxHp, anim: this.anims.idle, animX: 0
        }
        this.freq={v: 0, time: freq[this.name]}
        this.chosen=false;
        this.pos=pos
        this.attacked={to: false, from: false, anim: false, pos: {x: 0, y: 0}, is: false, fromPos: {x: 0,y:0}}
        this.time={max: 60, cur: 0};
        this.animTimeAttack={max: this.anims.attack*this.freq.time, cur: 0};
        this.damage=anims.damage;
        this.dieTimer=(this.anims.death-1)*this.freq.time;
        this.die=false;
        this.damaged=0;
        this.showDamaged={cur: 0, max: 60, pos:{x:0,y:0}};
        this.drawnSize=sizes[this.name] * DRAWN_SIZE_RATIO;
        this.takenDamage={last: this.maxHp, cur: this.maxHp, delta: 0};
        this.cost=anims.cost;
        this.shiftCircle=0;
        this.crit=false;
        this.appereance={cur: 75, max: 75, type: anims.typeAppereance, anim: 0, timer: 6, time: 0};
        this.deltaTime=0;
    }
    doAttack(){
        if(this.attacked.to){
            this.pos.x+=this.speed.x;
            this.pos.y+=this.speed.y;
            this.time.cur--;
            if(this.time.cur==0){
                this.attacked.to=false;
                this.chosenAttack = Math.floor(Math.random()*this.attacks.length);
                this.current.img=this.attacks[this.chosenAttack];
                if(attacks[this.name]){
                    if(attacks[this.name][this.chosenAttack+1]){
                         this.shiftCircle=attacks[this.name][this.chosenAttack+1];}
                }
                this.current.anim=this.anims.attack;
                this.current.animX=0;
                this.attacked.anim=true;
                this.animTimeAttack.cur=this.animTimeAttack.max;
                this.damaged=0;
                if(this.isBoss){
                    setTimeout(()=>{canvas.classList='trias';}, 50); //Shaking
                setTimeout(()=>{canvas.classList='';}, 350);
                }
            }
        }
        if(this.attacked.anim){
            if(this.enemy){
                if (this.chosenEnemy>= heroes.length) this.chosenEnemy=heroes.length-1;
            }
            let enemHp;
            this.animTimeAttack.cur--;
            if(this.animTimeAttack.cur<(this.anims.attack-1.5)*this.freq.time)
            {if(this.enemy){
                heroes[this.chosenEnemy].current.health-=this.damage;
                enemHp = heroes[this.chosenEnemy].current.health;
                heroes[this.chosenEnemy].current.img=heroes[this.chosenEnemy].hit;
                heroes[this.chosenEnemy].current.anim=heroes[this.chosenEnemy].anims.hit;
            }
            else{
                enemies[this.chosenEnemy].current.health-=this.damage;
                enemHp = enemies[this.chosenEnemy].current.health;
                enemies[this.chosenEnemy].current.img=enemies[this.chosenEnemy].hit;
                enemies[this.chosenEnemy].current.anim=enemies[this.chosenEnemy].anims.hit;
            }
            this.damaged+=this.damage;}
            if(this.animTimeAttack.cur==0 || enemHp<=0){
                if(Math.random()<=this.critChance){
                    (this.enemy?heroes:enemies)[this.chosenEnemy].extraDamage=this.damaged>enemHp?enemHp:this.damaged;
                // this.damaged+=enemHp>=this.damaged?this.damaged:enemHp;
                    this.crit=true;
                    if(this.enemy)
                    waiting=true;
            }
                this.showDamaged.cur=this.showDamaged.max;
                this.attacked.anim=false;
                this.current.img=this.moveBack;
                this.current.anim=this.anims.move;
                this.current.animX=0;
                this.attacked.from=true;
                this.time.cur=this.time.max;
                this.shiftCircle=0;
                if(this.enemy){
                    heroes[this.chosenEnemy].takenDamage.cur=heroes[this.chosenEnemy].current.health;
                    heroes[this.chosenEnemy].takenDamage.delta=heroes[this.chosenEnemy].takenDamage.last-heroes[this.chosenEnemy].takenDamage.cur;
                    heroes[this.chosenEnemy].current.img=heroes[this.chosenEnemy].idle;
                    heroes[this.chosenEnemy].current.anim=heroes[this.chosenEnemy].anims.idle;
                    this.showDamaged.pos.x=heroes[this.chosenEnemy].pos.x+(heroes[this.chosenEnemy].drawnSize-100)/2+shiftsHealth[heroes[this.chosenEnemy].name].x+105;
                    this.showDamaged.pos.y=heroes[this.chosenEnemy].pos.y+borders[heroes[this.chosenEnemy].name].bottom*heroes[this.chosenEnemy].drawnSize/heroes[this.chosenEnemy].size+20;
                    if(enemHp<=0) heroes[this.chosenEnemy].current.animX=0;
                }
                else{
                    enemies[this.chosenEnemy].takenDamage.cur=enemies[this.chosenEnemy].current.health;
                    enemies[this.chosenEnemy].takenDamage.delta=enemies[this.chosenEnemy].takenDamage.last-enemies[this.chosenEnemy].takenDamage.cur;
                    enemies[this.chosenEnemy].current.img=enemies[this.chosenEnemy].idle;
                    enemies[this.chosenEnemy].current.anim=enemies[this.chosenEnemy].anims.idle;
                    this.showDamaged.pos.x=enemies[this.chosenEnemy].pos.x+(enemies[this.chosenEnemy].drawnSize-100)/2+shiftsHealth[enemies[this.chosenEnemy].name].x+105;
                    this.showDamaged.pos.y=enemies[this.chosenEnemy].pos.y+borders[enemies[this.chosenEnemy].name].bottom*enemies[this.chosenEnemy].drawnSize/enemies[this.chosenEnemy].size+20;
                    if(enemies[this.chosenEnemy].isBoss){
                        this.showDamaged.pos.x=canvas.width*0.81;
                        this.showDamaged.pos.y=canvas.height*0.9;
                    }
                    if(enemHp<=0) {
                        enemies[this.chosenEnemy].current.animX=0; 
                        // playerMoney+=enemies[this.chosenEnemy].cost; 
                        // changeMoney(enemies[this.chosenEnemy].cost, true);
                    }
                }
            }
        }
        if(this.attacked.from){
            this.pos.x-=this.speed.x;
            this.pos.y-=this.speed.y;
            this.time.cur--;
            if(this.time.cur==0){
                this.attacked.from=false;
                this.attacked.is=false;
                this.pos=this.attacked.fromPos;
                if(enemies.length==0) {if(curLevel<levels.length-1)moveAtEnd(true);else endGame();}//loadLevel(curLevel+1);
                else if(heroes.length==0) endGame();
                else if(this.isBoss && !this.secondAttack) {
                    this.current.img=moveAtEndParams.active?this.move:this.idle;
                    this.current.anim=moveAtEndParams.active?this.anims.move:this.anims.idle;
                    this.current.animX=0;setTimeout(()=>{this.attackHero();this.secondAttack=true;}, waiting?2000:0);}
                else {if(chosen==(this.enemy?enemies.length-1:heroes.length-1) && !moveAtEndParams.active){
                    chosen=0;
                    playerMove=!playerMove;
                    if(this.isBoss) this.secondAttack=false;
                    if(!playerMove) enemies[0].attackHero();
                }
                else if(!moveAtEndParams.active){
                    chosen++;
                    if(!playerMove)
                        {   
                                setTimeout(()=>
                                {enemies[chosen].attackHero();
                                if(this.isBoss) this.secondAttack=false;}, waiting?2000:0);
                            waiting=false;
                    }
                }
                this.chosen=false;
                this.current.img=moveAtEndParams.active?this.move:this.idle;
                this.current.anim=moveAtEndParams.active?this.anims.move:this.anims.idle;
                this.current.animX=0;}
            }
        }
    }
    Die(){
        this.dieTimer-=2;
        if(this.dieTimer<=0){
            this.die=true;
        }
    }
    isHover(){
        return ((mouse.x >= this.pos.x +borders[this.name].left/this.size*this.drawnSize && mouse.x <= this.pos.x+borders[this.name].right/this.size*this.drawnSize) && (mouse.y >= this.pos.y +0.25*this.drawnSize && mouse.y <= this.pos.y-0.25*this.drawnSize+this.drawnSize));
    }
    hover(){
        document.body.style.cursor='pointer';
    }
    draw(shift=0, dt){
        this.deltaTime = dt*60;
        if(this.isHover()) this.hover();
        if(this.current.health<=0){ 
            this.current.img=this.death;
            this.current.anim=this.anims.death;
            this.Die();
        }
        if(this.attacked.is) this.doAttack();
        this.freq.v+=this.deltaTime;
        if(this.freq.v >= this.freq.time){
            this.current.animX=(this.current.animX+1)%this.current.anim;
            this.freq.v = 0;
        }
        if(this.name==='girl 1'){
            if(this.enemy&&!this.attacked.from || !this.enemy&&this.attacked.from) this.shiftCircle=-24;
            else this.shiftCircle=0;
    }
        c.drawImage(circle,0,0,circle.width,circle.height,shift+this.pos.x+(((this.enemy&&!this.attacked.from)||(!this.enemy&&this.attacked.from))?(this.size-borders[this.name].right+this.shiftCircle):(borders[this.name].left-this.shiftCircle))*(this.drawnSize/this.size),this.pos.y+borders[this.name].bottom*(this.drawnSize/this.size)-this.drawnSize/50,(borders[this.name].right-borders[this.name].left)*(this.drawnSize/this.size),this.drawnSize/15)
        if(this.appereance.cur > 0){
            c.drawImage(Appereances[this.appereance.type].back, this.appereance.anim%4*Appereances.sizes.width, Math.floor(this.appereance.anim/4)*Appereances.sizes.height, Appereances.sizes.width, Appereances.sizes.height, this.pos.x, this.pos.y, this.drawnSize, borders[this.name].bottom*(this.drawnSize/this.size)*(400/263));
        }
        if(this.appereance.cur < this.appereance.max * 0.6)
        c.drawImage(this.current.img, (this.enemy?(this.current.anim-this.current.animX-1):(this.current.animX))*this.size,0,this.size, this.size, this.pos.x+shift, this.pos.y, this.drawnSize,this.drawnSize);
        if(this.chosen){
            c.drawImage(pointer, 0, 0, pointer.width, pointer.height, this.pos.x+(this.enemy?(this.size-borders[this.name].left-(borders[this.name].right-borders[this.name].left)):(borders[this.name].left))*(this.drawnSize/this.size), this.pos.y-30+(borders[this.name].up)*(this.drawnSize/this.size),(borders[this.name].right-borders[this.name].left)*(this.drawnSize/this.size), 20);
            // c.fillStyle="#66c961";
            // c.fillRect(this.pos.x+(this.drawnSize-100)/2+shiftsHealth[this.name].x, this.pos.y+1/4*this.drawnSize,100,15)
        }
        if(this.appereance.cur > 0){
            c.drawImage(Appereances[this.appereance.type].front, this.appereance.anim%4*Appereances.sizes.width, Math.floor(this.appereance.anim/4)*Appereances.sizes.height, Appereances.sizes.width, Appereances.sizes.height, this.pos.x, this.pos.y, this.drawnSize, borders[this.name].bottom*(this.drawnSize/this.size)*(400/263));
            
            this.appereance.time++;
            if(this.appereance.time % this.appereance.timer == 0) this.appereance.anim++;
            if(this.appereance.anim >= 8) this.appereance.anim=0;
            this.appereance.cur--;
        }
        if(!this.isBoss && this.appereance.cur <= 0) {this.drawHealth(shift);}
        if(this.showDamaged.cur>0)
            {c.font='30px pixel';
            // c.fillStyle='black';
            c.fillStyle=this.crit?'red':'white';
            c.strokeStyle='black';
            c.textAlign='left';
            c.textBaseline='middle';
            c.fillText(`${-this.damaged} ${this.crit?'CRIT':''}`, this.showDamaged.pos.x, this.showDamaged.pos.y);
            c.strokeText(`${-this.damaged} ${this.crit?'CRIT':''}`, this.showDamaged.pos.x, this.showDamaged.pos.y);
            this.showDamaged.cur--;}
        else this.crit=false;
    }
    drawHealth(shift=0){
        c.fillStyle='rgb(186,0,0)';
        // c.fillRect(shift+this.pos.x+(this.drawnSize-100)/2+shiftsHealth[this.name].x,this.pos.y+this.drawnSize-shiftsHealth[this.name].y,100,10);
        c.drawImage(healthBar.bg,0,0,healthBar.bg.width,healthBar.bg.height, shift+this.pos.x+(this.drawnSize-100)/2+shiftsHealth[this.name].x, this.pos.y+borders[this.name].bottom*this.drawnSize/this.size+20, 100,10) //this.drawnSize-shiftsHealth[this.name].y
        c.fillStyle='#f5ea84';
        if(this.takenDamage.last>this.takenDamage.cur) {
            this.takenDamage.last--; 
            if(this.takenDamage.last-this.takenDamage.cur>this.takenDamage.delta*0.3&&this.takenDamage.last-this.takenDamage.cur<this.takenDamage.delta*0.85)this.takenDamage.last--;
            if(this.takenDamage.last-this.takenDamage.cur>this.takenDamage.delta*0.5&&this.takenDamage.last-this.takenDamage.cur<this.takenDamage.delta*0.85)this.takenDamage.last--;

        }
        else if(this.extraDamage!=0){
            this.takenDamage.cur-=this.extraDamage;
            this.current.health-=this.extraDamage;
            this.extraDamage=0;
            if(this.current.health<=0){
                    this.current.animX=0;
                    // if(this.enemy){
                    //     playerMoney+=enemies[this.chosenEnemy]?.cost || 0; changeMoney(enemies[this.chosenEnemy]?.cost || 0, true);
                    // }
            }
        }
        //c.fillRect(shift+this.pos.x+(this.drawnSize-100)/2+shiftsHealth[this.name].x,this.pos.y+this.drawnSize-shiftsHealth[this.name].y,this.takenDamage.last/this.maxHp*100,10);
        c.drawImage(healthBar.yellow,0,0,healthBar.yellow.width*(this.takenDamage.last/this.maxHp),healthBar.yellow.height,shift+this.pos.x+(this.drawnSize-100)/2+shiftsHealth[this.name].x,this.pos.y+borders[this.name].bottom*this.drawnSize/this.size+20,this.takenDamage.last/this.maxHp*100,10)
        c.fillStyle='red';
        if(this.current.health>=0){
            // c.fillRect(shift+this.pos.x+(this.drawnSize-100)/2+shiftsHealth[this.name].x,this.pos.y+this.drawnSize-shiftsHealth[this.name].y,this.current.health/this.maxHp*100,10);   
            c.drawImage(healthBar.colour,0,0,healthBar.colour.width*(this.current.health/this.maxHp),healthBar.colour.height, shift+this.pos.x+(this.drawnSize-100)/2+shiftsHealth[this.name].x,this.pos.y+borders[this.name].bottom*this.drawnSize/this.size+20,this.current.health/this.maxHp*100,10)}
    }
    drawHealthForBoss(shift=0){
        c.fillStyle='rgb(186,0,0)';
        // c.fillRect(canvas.width*0.2,canvas.height*0.9,wdithHealthBoss,heightHealthBoss);
        c.drawImage(healthBarBoss.bg,0,0,healthBarBoss.bg.width,healthBar.bg.height, canvas.width*0.2,canvas.height*0.9,wdithHealthBoss,heightHealthBoss)
        c.fillStyle='#f5ea84';
        if(this.takenDamage.last>this.takenDamage.cur) {
            this.takenDamage.last--; 
            if(this.takenDamage.last-this.takenDamage.cur>this.takenDamage.delta*0.3&&this.takenDamage.last-this.takenDamage.cur<this.takenDamage.delta*0.85)this.takenDamage.last--;
            if(this.takenDamage.last-this.takenDamage.cur>this.takenDamage.delta*0.5&&this.takenDamage.last-this.takenDamage.cur<this.takenDamage.delta*0.85)this.takenDamage.last--;
        }
        else if(this.extraDamage!=0){
            this.takenDamage.cur-=this.extraDamage;
            this.current.health-=this.extraDamage;
            this.extraDamage=0;
        }
        // c.fillRect(canvas.width*0.2,canvas.height*0.9,this.takenDamage.last/this.maxHp*wdithHealthBoss,heightHealthBoss);
        c.drawImage(healthBarBoss.yellow,0,0,healthBarBoss.yellow.width*(this.takenDamage.last/this.maxHp),healthBar.yellow.height,canvas.width*0.2,canvas.height*0.9,this.takenDamage.last/this.maxHp*wdithHealthBoss,heightHealthBoss)
        c.fillStyle='red';
        if(this.current.health>=0)
            // c.fillRect(canvas.width*0.2,canvas.height*0.9,this.current.health/this.maxHp*wdithHealthBoss,heightHealthBoss);   
            c.drawImage(healthBarBoss.colour,0,0,healthBarBoss.colour.width*(this.current.health/this.maxHp),healthBar.colour.height, canvas.width*0.2,canvas.height*0.9,this.current.health/this.maxHp*wdithHealthBoss,heightHealthBoss)
        }

    initImages(){
        //const evilWizard1={idle: 8, hit: 4, attack: 8, move: 8, death: 5, damage: 2, maxHp: 200, cost: 20,
        //countAttack: 1},
        this.attack=new Image();
        this.death=allImages[this.name][this.enemy?'left':'right'].death;
        this.idle = allImages[this.name][this.enemy?'left':'right'].idle;
        this.move = allImages[this.name][this.enemy?'left':'right'].move;
        this.hit = allImages[this.name][this.enemy?'left':'right'].takeHit;
        this.moveBack = allImages[this.name][!this.enemy?'left':'right'].move;
        this.attacks=[];
        if(this.anims.countAttack>1) {
            for(let i = 1; i <= this.anims.countAttack;i++){
                let img = allImages[this.name][this.enemy?'left':'right'][`attack${i}`];
                this.anims.attack=Math.floor(img.width/this.size); 
                this.attacks.push(img);
            }
        }
        else{
            this.attack= allImages[this.name][this.enemy?'left':'right'].attack;
            this.anims.attack= Math.floor(this.attack.width/this.size); 
            this.attacks.push(this.attack);
        }
        // this.death.src=`${dirImages}/${this.name}/Death${this.enemy?'Left':''}.png`;
        this.anims.death= this.death.width/this.size;
        // this.idle.src=`${dirImages}/${this.name}/Idle${this.enemy?'Left':''}.png`;
        this.anims.idle= this.idle.width/this.size;
        // this.move.src=`${dirImages}/${this.name}/Move${this.enemy?'Left':''}.png`;
        this.anims.move= this.move.width/this.size;
        // this.moveBack.src=`${dirImages}/${this.name}/Move${this.enemy?'':'Left'}.png`;
        // this.hit.src=`${dirImages}/${this.name}/Take Hit${this.enemy?'Left':''}.png`;
        this.anims.hit= this.hit.width/this.size;
    }
    attackEnemy(toPos, chosenEnemy){
        this.attacked.to=true;
        this.attacked.is=true;
        this.chosenEnemy=chosenEnemy;
        this.attacked.pos=toPos;
        this.speed={x: (toPos.x+(borders[enemies[chosenEnemy].name].left*(enemies[chosenEnemy].drawnSize/enemies[chosenEnemy].size))-(this.pos.x+borders[this.name].right*(this.drawnSize/this.size)))/this.time.max, y: (toPos.y-this.pos.y+(enemies[this.chosenEnemy].drawnSize-this.drawnSize)/2)/this.time.max}
        this.time.cur=this.time.max;
        this.attacked.fromPos=this.pos;
        this.current.img=this.move;
        this.current.anim=this.anims.move;
    }
    attackHero(){
        this.attacked.to=true;
        this.attacked.is=true;
        this.chosenEnemy=Math.floor(heroes.length*Math.random());
        this.attacked.pos=heroes[this.chosenEnemy].pos;
        this.speed={x: (heroes[this.chosenEnemy].pos.x+(borders[heroes[this.chosenEnemy].name].right*(heroes[this.chosenEnemy].drawnSize/heroes[this.chosenEnemy].size))-(this.pos.x+borders[this.name].left*(this.drawnSize/this.size)))/this.time.max, y: (heroes[this.chosenEnemy].pos.y-this.pos.y+(heroes[this.chosenEnemy].drawnSize-this.drawnSize)/2)/this.time.max}
        //(heroes[this.chosenEnemy].pos.x-this.pos.x+paddings[heroes[this.chosenEnemy].name])/this.time.max
        this.time.cur=this.time.max;
        this.attacked.fromPos=this.pos;
        this.current.img=this.move;
        this.current.anim=this.anims.move;
    }
}
class EntityMenu extends Entity{
    constructor(cost,onpush, ...params){
        super(...params);
        this.pos.x-=this.drawnSize/2;
        this.pos.y-=this.drawnSize/2;
        this.onpush=onpush;
        this.cost=cost;
        this.icon = new Image();
        this.icon.src=`${dirImages}/${this.name}/icon.png`;
        this.showParams=false;
    }
    isHover(){
        return super.isHover()&&gameState===0;
    }
    hover(){
        super.hover();
        this.showParameters();
        if(mouse.click) this.onclick();
    }
    draw(dt){
        this.freq.v+=dt*60;
        if(this.freq.v >= this.freq.time){
            this.current.animX=(this.current.animX+1)%this.current.anim;
            this.freq.v=0;
        }
        c.drawImage(circle,0,0,circle.width,circle.height,this.pos.x+(this.enemy?this.size-borders[this.name].right:borders[this.name].left)*(this.drawnSize/this.size),this.pos.y+borders[this.name].bottom*(this.drawnSize/this.size)-this.drawnSize/50,(borders[this.name].right-borders[this.name].left)*(this.drawnSize/this.size),this.drawnSize/15);
        c.drawImage(this.current.img, this.current.animX*this.size,0,this.size, this.size, this.pos.x, this.pos.y, this.drawnSize,this.drawnSize);
    }
    showParameters(){ 
        c.fillStyle="#66c961";
        c.drawImage(pointer, 0, 0, pointer.width, pointer.height, this.pos.x+(this.enemy?(this.size-borders[this.name].left-(borders[this.name].right-borders[this.name].left)):(borders[this.name].left))*(this.drawnSize/this.size), this.pos.y-30+(borders[this.name].up)*(this.drawnSize/this.size),(borders[this.name].right-borders[this.name].left)*(this.drawnSize/this.size), 20);
        c.font='30px pixel';
        c.drawImage(bgParams, this.pos.x+(this.enemy?-150+1/4*this.drawnSize:3/4*this.drawnSize), this.pos.y+this.drawnSize/3-8);
        c.fillStyle=playerMoney>=this.cost?'black':'red';
        c.fillText(this.cost,this.pos.x+(this.enemy?-150+1/4*this.drawnSize:3/4*this.drawnSize)+60, this.pos.y+this.drawnSize/3+140);
        c.drawImage(money, 0, 0, 102, 118, this.pos.x+(this.enemy?-150+1/4*this.drawnSize:3/4*this.drawnSize)+10, this.pos.y+this.drawnSize/3+130, 30, 30);
        c.font='30px pixel';
        c.fillStyle='black';
        c.textAlign='left';
        c.textBaseline='top';
        c.drawImage(sword, 0, 0, 260, 260, this.pos.x+(this.enemy?-150+1/4*this.drawnSize:3/4*this.drawnSize), this.pos.y+this.drawnSize/3, 50, 50)
        c.fillText(this.damage*(this.anims.attack-1.5)*this.freq.time, this.pos.x+(this.enemy?-150+1/4*this.drawnSize:3/4*this.drawnSize)+50, this.pos.y+this.drawnSize/3);
        c.drawImage(heart, 0, 0, 249, 249, this.pos.x+(this.enemy?-150+1/4*this.drawnSize:3/4*this.drawnSize), this.pos.y+this.drawnSize/3+60, 50, 50);
        c.fillText(this.maxHp, this.pos.x+(this.enemy?-150+1/4*this.drawnSize:3/4*this.drawnSize)+50, this.pos.y+this.drawnSize/3+60);
    }
    onclick(){
        if(playerMoney>=this.cost && curHeroes.length<5 && gameState===0){
            if(this.cost>0)
                changeMoney(-this.cost,1);
            playerMoney-=this.cost;
            curHeroes.push(generateHero(this.onpush, heroesPos[curHeroes.length+1]));
            opacity.push(1);
        }
    }
}
class Btn{
    constructor(pos, size, text, color,font, onclick){
        this.pos=pos;
        this.size=size;
        this.text=text;
        this.color=color;
        this.onclick=onclick;
        this.font=font;
        this.drawn={color: color.bg};
        this.shift=0;
        this.hoverParams={value: 0, max: 5, state: 0, lastState: 0, back: false};
    }
    isHover(){
        return (mouse.x>this.pos.x && mouse.x<this.pos.x+this.size.width && mouse.y>this.pos.y && mouse.y  < this.pos.y+this.size.height);
    }
    hover(){
        if(this.hoverParams.back) this.hoverParams.back=false;
        document.body.style.cursor='pointer';
        this.drawn.color=this.color.hover;
        if(this.hoverParams.state===0) {
            if(this.hoverParams.value<this.hoverParams.max)
            this.hoverParams.value++;
        }
        this.shift=this.size.height*0.1*this.hoverParams.value/this.hoverParams.max;
        if(mouse.click) this.onclick();
    }
    endHover(){
        if(this.hoverParams.value>0)
        {    this.hoverParams.value--;
            this.shift=this.size.height*0.1*this.hoverParams.value/this.hoverParams.max;}
        else{
            this.hoverParams.back=false;
        }
    }
    draw(){
        this.shift=0;
        this.drawn.color=this.color.bg;
        this.hoverParams.lastState=this.hoverParams.state;
        if(this.isHover()) this.hover();
        else {if(this.hoverParams.lastState===1 || this.hoverParams.value > 0) this.hoverParams.back=true;
            this.hoverParams.state=0;}
        if(this.hoverParams.back) this.endHover();
        c.fillStyle=this.drawn.color;
        c.fillRect(this.pos.x,this.pos.y,this.size.width,this.size.height*0.8+this.shift);
        c.fillStyle=this.color.bottom;
        c.fillRect(this.pos.x,this.pos.y+this.size.height*0.8+this.shift,this.size.width,this.size.height*0.2-this.shift);
        c.fillStyle=this.color.text;
        c.font=`${this.font.size}px ${this.font.name}`;
        c.textAlign='center';
        c.textBaseline='middle';
        c.fillText(this.text,this.pos.x+this.size.width/2,this.pos.y+this.size.height*0.5+this.shift, this.size.width);
    }
}
const dirImages='src/img';
const allImages={
    'Goblin':generate('Goblin', 2),
    'Mushroom':generate('Mushroom', 2),
    'girl 1':generate('girl 1'),
    'evil wizard':generate('evil wizard'),
    'evil wizard 2': generate('evil wizard 2', 2),
    'medieval king':generate('medieval king', 2),
    'Flying eye': generate('Flying eye', 2),
    'Skeleton': generate('Skeleton', 2),
    'warrior':generate('warrior', 3),
    'archer':generate('archer'),
    'warrior2':generate('warrior2', 3),
    'hero':generate('hero', 2)
};
const Appereances={
    yellow:{
        back: generateImage("appearance", "yellow-back"),
        front: generateImage("appearance", "yellow-front")
    },
    blue:{
        back: generateImage("appearance", "blue-back"),
        front: generateImage("appearance", "blue-front")
    },
    purple:{
        back: generateImage("appearance", "purple-back"),
        front: generateImage("appearance", "purple-front")
    },
    sizes:{
        width: 400,
        height: 400
    }
};
var waiting = false;
const canvas = document.querySelector("canvas"),
c = canvas.getContext("2d");
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
var wdithHealthBoss = canvas.width*0.6, 
heightHealthBoss = wdithHealthBoss*11/(332);
var playerMoney=99, gameState = 0, opacity=[];
const attacks={'Goblin':{
    2:15
},'Mushroom':{1:5},'medieval king':{2:15}, 'girl 1':{1:5}
};

function openFullscreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Для Firefox
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Для Chrome, Safari и Opera
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // Для Internet Explorer и Edge
      element.msRequestFullscreen();
    }
}

canvas.addEventListener('click', ()=>{
    openFullscreen(canvas);
})  

window.addEventListener('resize', ()=>{
    canvas.width=window.innerWidth;
    canvas.height=window.innerHeight;
    wdithHealthBoss = canvas.width*0.6, 
    heightHealthBoss = wdithHealthBoss*11/(332);
})
const money = new Image(), sword = new Image(), heart = new Image(), bgParams = new Image(),
bgMenu = new Image(), circle = new Image(), caveSnowBegin = new Image(), grassMiddle = new Image(), caveSnowEnd = new Image(), caveSnowMiddle = new Image(),
grassBegin = new Image(), grassEnd = new Image(), magmaMiddle = new Image(), healthBar={bg:new Image(), colour: new Image(), yellow: new Image()},
pointer = new Image(), custleEnd = new Image(),
healthBarBoss={bg:new Image(), colour: new Image(), yellow: new Image()},


sizes={'girl 1': 250, 'evil wizard': 350, 'evil wizard 2': 400,'medieval king':350,'Flying eye':300,'Skeleton':250,'Goblin':300,'Mushroom':300,
'Striker': 300, 'warrior':400, 'archer':300, 'warrior2':330, 'hero': 420},
shiftsHealth={'girl 1': {y:40, x:-40}, 'evil wizard': {y:90,x:0}, 'evil wizard 2': {y:90,x:0},'medieval king':{y:100,x:0},'Flying eye':{x:0,y:100},
'Skeleton':{x:0,y:70},'Goblin':{x:0,y:70},'Mushroom':{x:0,y:70},'Striker':{x:0,y:0}, 'warrior':{x:0,y:0}, 'archer':{x:0,y:0}, 'warrior2':{x:0,y:0}, 'hero':{x:0,y:0}},
paddings={'girl 1':10, 'evil wizard':150, 'evil wizard 2': 150,'medieval king':100,'Flying eye':20,
'Skeleton': 100,'Goblin':80,'Mushroom':50, 'Striker': 50,'warrior': 60, 'archer':0, 'warrior2':0, 'hero':0},
freq={'girl 1':2, 'evil wizard':6, 'evil wizard 2': 6,'medieval king':8,'Flying eye':4,
'Skeleton':4, 'Goblin':4,'Mushroom':4, 'Striker': 6,'warrior':6, 'archer':6, 'warrior2':6, 'hero':6},padd = 60,
borders={'Flying eye':{right: 88, left: 71, bottom: 95, up: 60}, 'girl 1':{left: 20,right: 37, bottom: 58, up: 8},
'evil wizard':{right: 90, left: 61, bottom: 100, up: 44},'evil wizard 2':{right: 144, left: 106, bottom: 166, up: 114},
'Goblin':{left: 57, right: 91, bottom: 101, up: 64},'medieval king':{left: 70, right: 95, bottom: 105, up: 50},'Mushroom':{left: 64, right: 86, bottom: 100, up: 63},'Skeleton':{left: 59, right: 95, bottom: 100, up: 50},
'warrior':{left: 65, right: 94, bottom: 100, up: 56},
'archer':{left: 50, right: 74, bottom: 75, up: 37},
'warrior2':{left: 54, right: 79, bottom: 85, up: 48},
'hero':{left: 81, right: 112, up: 79, bottom: 121}},


mouse={x:0,y:0, click: false},
icons={}, names=['girl 1', 'evil wizard 2','evil wizard','medieval king','Flying eye','Skeleton','Goblin','Mushroom', 'archer', 'warrior2'];
names.forEach((n)=>{
    let image = new Image();
    image.src=`${dirImages}/${n}/icon.png`;
    icons[n]=image;
})

money.src=`${dirImages}/money.png`;sword.src=`${dirImages}/sword.png`;heart.src=`${dirImages}/heart.png`;bgParams.src=`${dirImages}/bgParams.png`;bgMenu.src=`${dirImages}/bgmenu.png`;
circle.src=`${dirImages}/circle.png`;caveSnowBegin.src=`${dirImages}/CaveSnow2.png`;grassMiddle.src=`${dirImages}/grass1.png`;
grassEnd.src=`${dirImages}/grassEnd.png`;grassBegin.src=`${dirImages}/grassBegin.png`; //CaveSnow3
caveSnowMiddle.src=`${dirImages}/CaveSnow4.png`;caveSnowEnd.src=`${dirImages}/CaveSnow3.png`;
custleEnd.src=`${dirImages}/custleBegin.png`
magmaMiddle.src=`${dirImages}/magmaMiddle.png`;
healthBar.bg.src=`${dirImages}/healthBarBg.png`;
healthBar.colour.src=`${dirImages}/healthBarColour.png`;
healthBar.yellow.src=`${dirImages}/healthBarYellow.png`;
healthBarBoss.bg.src=`${dirImages}/healthBarBossBg.png`;
healthBarBoss.colour.src=`${dirImages}/healthBarBossColour.png`;
healthBarBoss.yellow.src=`${dirImages}/healthBarBossYellow.png`;
pointer.src=`${dirImages}/pointer.png`;
const transitionParams={active: false, to: false, time: 0, maxTime: 30,onMiddle: ()=>{}},
changeMoneyParams={time: 0, maxTime: 120, delta: 0, color:0, opacity:1, active: false},
moveAtEndParams={active:false,time:0,maxTime:100,maxDist:canvas.width*0.8,dist:0},
start = new Btn({x:canvas.width*0.8, y:0},{width: canvas.width*0.2, height: canvas.height*0.2},'старт',{bg:'red',text:'black', bottom: 'rgb(200,0,0)',hover:'rgb(220,0,0)'},{name:'pixel',size: canvas.height*0.1}, startGame),
firstLevels= new Btn({x:canvas.width*0.1,y:canvas.height*0.1},{width: canvas.width*0.1,height:canvas.height*0.2/DRAWN_SIZE_RATIO},'Лес',{bg:'#3870d1',text:'white', bottom: '#0b409c',hover:'#104db5'},{name: 'pixel', size: canvas.width*0.05},()=>{if(!transitionParams.active)transition(true, ()=>{
    changeMoneyParams.time=0;
    changeMoney();
    levels=firstLevel;
    gameState=1;
    gameClrLevel="#45FF1C";
    gameBgLevel="#1A600A";
    loadFirst();
    
});}),
secondLevels = new Btn({x:canvas.width*0.3,y:canvas.height*0.1},{width: canvas.width*0.15,height:canvas.height*0.2/DRAWN_SIZE_RATIO},'Зимний лес',{bg:'#3870d1',text:'white', bottom: '#0b409c',hover:'#104db5'},{name: 'pixel', size: canvas.width*0.05},()=>{if(!transitionParams.active)transition(true, ()=>{
    changeMoneyParams.time=0;
    changeMoney();
    levels=secondLevel;
    gameState=1;
    gameClrLevel="#0CBEFF";
    gameBgLevel="#065F7F";
    loadFirst();
});}),
thirdLevels = new Btn({x:canvas.width*0.25,y:canvas.height*0.4},{width: canvas.width*0.25,height:canvas.height*0.2/DRAWN_SIZE_RATIO},'Подножие вуклана',{bg:'#E41719',text:'white', bottom: '#8C212C',hover:'#9E1E22'},{name: 'pixel', size: canvas.width*0.05},()=>{if(!transitionParams.active)transition(true, ()=>{
    changeMoneyParams.time=0;
    changeMoney();
    levels=thirdLevel;
    gameState=1;
    gameClrLevel="#E41719";
    gameBgLevel="#8C212C";
    colorUI="white";
    loadFirst();
});}),
fourthLevels = new Btn({x:canvas.width*0.75,y:canvas.height*0.4},{width: canvas.width*0.15,height:canvas.height*0.2/DRAWN_SIZE_RATIO},'Вулкан',{bg:'#7C7C7C',text:'white', bottom: '#4A4A4A',hover:'#5B5B5B'},{name: 'pixel', size: canvas.width*0.05},()=>{if(!transitionParams.active)transition(true, ()=>{
    changeMoneyParams.time=0;
    changeMoney();
    levels=fourthLevel;
    gameState=1;
    gameClrLevel="#7C7C7C";
    gameBgLevel="#4A4A4A";
    colorUI="white";
    loadFirst();
});}),

enemiesPos={
    1:{x:canvas.width*0.57,y:canvas.height*0.2}, 
    2:{x:canvas.width*0.9,y:canvas.height*0.15}, 
    3:{x:canvas.width*0.73,y:canvas.height*0.5},
    4:{x:canvas.width*.55,y:canvas.height*0.8},
    5:{x:canvas.width*.9,y:canvas.height*0.8}},
heroesPos={
    1:{x:canvas.width*0.1,y:canvas.height*0.2}, 
    2:{x: canvas.width*0.1,y:canvas.height*0.65},
    3:{x:canvas.width*0.27, y: canvas.height*0.15},
    4:{x:canvas.width*0.32,y:canvas.height*0.47}, 
    5:{x:canvas.width*0.24, y:canvas.height*0.8}},
menuPoses=[
    {x:canvas.width*0.2,y:canvas.height*0.5},
    {x:canvas.width*0.3,y:canvas.height*0.15}, 
    {x:canvas.width*0.9,y:canvas.height*0.4}, 
    {x:canvas.width*0.1,y:canvas.height*0.6},
    {x:canvas.width*0.9,y:canvas.height*0.8},
    {x:canvas.width*0.5,y:canvas.height*0.2},
    {x:canvas.width*0.7,y:canvas.height*0.2},
    {x:canvas.width*0.3,y:canvas.height*0.5},
    {x:canvas.width*0.5,y:canvas.height*0.5}],


evilWizard1={damage: 2, maxHp: 200, cost: 20, countAttack: 1, critChance: 10, typeAppereance: 'purple'},
evilWizard2={damage: 2, maxHp: 50, cost: 10, countAttack: 2, critChance: 5, typeAppereance: 'blue'},
girl1={damage: 1, maxHp: 70, cost: 5,countAttack:1, critChance: 15, typeAppereance: 'blue'},
medievalKing={damage: 1, maxHp: 300, cost: 40, countAttack: 2, critChance: 40, typeAppereance: 'yellow'},
eye = {damage: 1, maxHp: 26, cost: 10, countAttack: 2, critChance: 8, typeAppereance: 'blue'},
skeleton = {countAttack: 2, damage: 1, cost: 20, maxHp: 144, critChance: 30, typeAppereance: 'blue'},
goblin = {countAttack:2,damage: 1, cost: 25, maxHp:90, critChance: 5, typeAppereance: 'blue'},
mushroom = {countAttack: 2, damage: 1.5, cost: 30, maxHp: 100, critChance: 5, typeAppereance: 'blue'},
warrior = {countAttack: 3, damage: 2, cost: 0, maxHp: 300, critChance: 60, typeAppereance: 'yellow'},
warrior2 = {countAttack: 3, damage: 2, cost: 0, maxHp: 500, critChance: 60, typeAppereance: 'yellow'},
warrior3 = {countAttack: 3, damage: 3, cost: 0, maxHp: 700, critChance: 60, typeAppereance: 'yellow'},
archer={countAttack: 1, damage: 3, cost: 1, maxHp: 700, critChance: 99, typeAppereance: 'blue'},
warrior21 = {countAttack: 2, damage: 3, cost: 35, maxHp: 100, critChance: 25, typeAppereance: 'blue'},
hero = {countAttack: 2, damage: 3, cost: 35, maxHp: 500, critChance: 100, typeAppereance: 'yellow'},

evilWizard1Obj = new Entity('evil wizard', 150, evilWizard1,enemiesPos[1], true),
evilGirl1Obj=new Entity('girl 1', 80, girl1,enemiesPos[2],true),
evilWizard2Obj = new Entity('evil wizard 2',250,evilWizard2,undefined,true),
kingObj = new Entity('medieval king', 160,medievalKing,undefined,true),
eyeObj = new Entity('Flying eye',150,eye,undefined,true),
skeletonObj = new Entity('Skeleton',150,skeleton,undefined,true),
goblinObj = new Entity('Goblin',150,goblin,undefined,true),
mushroomObj = new Entity('Mushroom',150,mushroom,undefined,true),
girl = new Entity('girl 1', 80, girl1,heroesPos[1]),
warriorObj = new Entity('warrior', 162, warrior,undefined, true, 1),
warrior2Obj = new Entity('warrior', 162, warrior2,undefined, true, 1),
warrior3Obj = new Entity('warrior', 162, warrior3,undefined, true, 1),
warrior21Obj = new Entity('warrior2', 135, warrior21, undefined, true),
heroObj = new Entity('hero', 200, hero, undefined, true, 1),
// archerObj = new Entity('archer', 128, archer, undefined),

girl1Menu = new EntityMenu(5,girl,'girl 1', 80, girl1,menuPoses[0]),
evilWizard1Menu = new EntityMenu(10, new Entity('evil wizard 2', 250, evilWizard2), 'evil wizard 2', 250, evilWizard2, menuPoses[1]),
evilWizard2Menu = new EntityMenu(15, new Entity('evil wizard', 150, evilWizard1),'evil wizard', 150, evilWizard1, menuPoses[2],true),
medievalKingMenu = new EntityMenu(13,new Entity('medieval king', 160,medievalKing) ,'medieval king',160,medievalKing,menuPoses[3]),
eyeMenu = new EntityMenu(0,new Entity('Flying eye',150,eye),'Flying eye',150,eye,menuPoses[4],true),
skeletonMenu = new EntityMenu(6,new Entity('Skeleton',150,skeleton),'Skeleton',150,skeleton,menuPoses[5]),
goblinMenu = new EntityMenu(10,new Entity('Goblin',150,goblin),'Goblin',150,goblin,menuPoses[6],true),
mushroomMenu = new EntityMenu(15, new Entity('Mushroom',150,mushroom),'Mushroom',150,mushroom,menuPoses[7]),
warrior21Menu = new EntityMenu(15, new Entity('warrior2', 135, warrior21),'warrior2', 135, warrior21, menuPoses[8]);
// archerMenu = new EntityMenu(5, new Entity('archer', 128, archer), 'archer', 128, archer, menuPoses[0]);

var gameBgLevel, gameClrLevel, colorUI="black";
var firstLevel=[{enemies: [{obj: mushroomObj, pos: 3}], bg: grassBegin},
{enemies:[{obj: goblinObj, pos: 2}, {obj: mushroomObj, pos: 3}, {obj: goblinObj, pos: 5}], bg: grassMiddle},
{enemies:[{obj: mushroomObj, pos: 2}, {obj: mushroomObj, pos: 3}, {obj: mushroomObj, pos: 4}], bg: grassMiddle},
{enemies:[{obj: mushroomObj, pos: 1}, {obj: mushroomObj, pos: 2}, {obj: goblinObj, pos: 3}, {obj: mushroomObj, pos: 4}, {obj: mushroomObj, pos: 5}], bg: grassMiddle},
{enemies:[{obj: warriorObj, pos: 3}], bg: grassEnd}],
secondLevel=[{enemies: [{obj: warrior21Obj, pos: 3},], bg: caveSnowBegin},
{enemies:[{obj: warrior21Obj, pos: 2}, {obj: kingObj, pos: 3}, {obj: warrior21Obj, pos: 5}], bg: caveSnowMiddle},
{enemies:[{obj: kingObj, pos: 4},{obj: skeletonObj, pos: 5},{obj: skeletonObj, pos: 3},{obj: skeletonObj, pos: 2},{obj: skeletonObj, pos: 1}],bg: caveSnowMiddle},
{enemies:[{obj: kingObj, pos: 5}, {obj: kingObj, pos: 1}, {obj: kingObj, pos: 3}, {obj: skeletonObj, pos: 4}, {obj: skeletonObj, pos: 2}],bg: caveSnowMiddle},
{enemies:[{obj: heroObj, pos: 3}], bg: caveSnowEnd}],
thirdLevel=[{enemies: [{obj: evilWizard2Obj, pos: 1}, {obj: evilWizard2Obj, pos: 4}], bg: magmaMiddle},
{enemies:[{obj: evilWizard2Obj, pos: 1}, {obj: evilWizard2Obj, pos: 4}, {obj: evilWizard2Obj, pos: 3}], bg: magmaMiddle},
{enemies:[{obj: evilWizard2Obj, pos: 1}, {obj: evilWizard1Obj, pos: 2}, {obj: evilWizard2Obj, pos: 4}, {obj: evilWizard1Obj, pos: 5}], bg: magmaMiddle},
{enemies:[{obj: warrior3Obj, pos: 3}], bg: magmaMiddle}],
fourthLevel=[{enemies: [{obj: heroObj, pos: 3},], bg: custleEnd},],
levels = [],

curHeroes = [],curLevel = 0,heroes = [], enemies=[], playerMove=true,chosen = 0,
drawnHeroes = [],


aviableLevels=[firstLevels,secondLevels, thirdLevels, fourthLevels],
aviableHeroes=[evilWizard1Menu, evilWizard2Menu,medievalKingMenu,eyeMenu,skeletonMenu,goblinMenu,mushroomMenu, warrior21Menu];
animate();
window.addEventListener('mousemove', e=>{
        mouse.x=e.clientX;
        mouse.y=e.clientY;
    })
window.addEventListener('click', ()=>{
        mouse.click=true;
    })

var prevTime = 0;

function renderGame(deltaTime){
    c.strokeStyle='black';
    c.fillStyle='#ccc';
    c.fillRect(0,0,canvas.width,canvas.height);
    if(levels[curLevel].bg){
        c.drawImage(levels[curLevel].bg, 0, 0, levels[curLevel].bg.width, levels[curLevel].bg.height, 0, 0, canvas.width,canvas.height);
    }
    c.fillStyle=gameBgLevel;
    c.fillRect(0,0,canvas.width,canvas.height*0.01);
    c.fillStyle=gameClrLevel;
    c.fillRect(0,0,canvas.width*((curLevel+1)/levels.length),canvas.height*0.01);
    enemies.forEach((e,i)=>{
        e.chosen=playerMove && e.isHover();//(mouse.x >= e.pos.x +padd && mouse.x <= e.pos.x+e.drawnSize-padd) && (mouse.y >= e.pos.y +padd && mouse.y <= e.pos.y-padd+e.drawnSize);
        if(e.chosen && mouse.click && !heroes[chosen].attacked.is){
            heroes[chosen].attackEnemy(e.pos, i);
        }
        if(e.die) {
            playerMoney+=enemies[i].cost; 
            changeMoney(enemies[i].cost, true);
            enemies.splice(i,1);
        }
        // else e.draw();
    })
    if(moveAtEndParams.active) moveAtEnd();
    heroes.forEach((h,i)=>{
        h.chosen=(i==chosen)&&playerMove;
        if(h.die) heroes.splice(i,1);
        // else h.draw(moveAtEndParams.dist);
    })
    if(heroes.length==0) endGame();
    drawnHeroes = heroes.concat(enemies);
    drawnHeroes.sort(function(a,b){return a.pos.y+borders[a.name].up*a.drawnSize/a.size - b.pos.y-borders[b.name].up*b.drawnSize/b.size;});
    drawnHeroes.forEach(h=>{h.draw(moveAtEndParams.dist, deltaTime);})
    drawnHeroes.forEach(h=>{if(h.isBoss) h.drawHealthForBoss();})
    c.font='40px pixel';
    c.fillStyle='white';
    c.textBaseline='middle';
    c.textAlign='right';
    c.fillText(curLevel+1, canvas.width-20, 50);
    c.strokeText(curLevel+1, canvas.width-20, 50);
    c.font=`50px pixel`;
    c.textAlign='left';
    c.textBaseline='top';
    c.fillStyle='white';
    c.fillText(playerMoney, 10, canvas.height*0.01);
    c.strokeText(playerMoney, 10, canvas.height*0.01);
    if(changeMoneyParams.active){
        c.fillStyle=`rgba(${changeMoneyParams.color},${changeMoneyParams.opacity})`;
        c.fillText(`${changeMoneyParams.delta>0?'+':''}${changeMoneyParams.delta}`, 10, 50);
        changeMoney();
    }
    c.drawImage(money,0,0,102,118,String(playerMoney).length*25+20, 10+canvas.height*0.01,50,50);
}
function drawHeroes(){
    for(let i = 0; i < 5; i++){
        c.fillStyle='black';
        c.fillRect(i*canvas.width/10+canvas.width/4, canvas.height-canvas.width/10,canvas.width/10,canvas.width/10);
        c.fillStyle='gray';
        c.fillRect(i*canvas.width/10+(canvas.width/10-canvas.width/11)/2+canvas.width/4, canvas.height-canvas.width/10+(canvas.width/10-canvas.width/11)/2,canvas.width/10-(canvas.width/10-canvas.width/11),canvas.width/10-(canvas.width/10-canvas.width/11));
        if(i < curHeroes.length){
            c.drawImage(icons[curHeroes[i].name], 0, 0,icons[curHeroes[i].name].width,icons[curHeroes[i].name].height,i*canvas.width/10+((opacity[i]>0.5?opacity[i]-0.5:0)*canvas.width/10)+(canvas.width/10-canvas.width/11)/2+canvas.width/4, canvas.height-canvas.width/10+(canvas.width/10-canvas.width/11)/2,(1-2*(opacity[i]>0.5?opacity[i]-0.5:0))*(canvas.width/11),canvas.width/10-(canvas.width/10-canvas.width/11));
            if(opacity[i] > 0) {
                opacity[i]-=0.04;
                c.fillStyle=`rgba(255,255,255,${opacity[i]})`;
                c.fillRect(i*canvas.width/10+(canvas.width/10-canvas.width/11)/2+canvas.width/4, canvas.height-canvas.width/10+(canvas.width/10-canvas.width/11)/2,canvas.width/10-(canvas.width/10-canvas.width/11),canvas.width/10-(canvas.width/10-canvas.width/11));}
        }
    }
}
function renderMenu(deltaTime){
    c.fillStyle='#fff';
    c.fillRect(0,0,canvas.width,canvas.height);
    c.drawImage(bgMenu, 0,0,bgMenu.width,bgMenu.height,0,0,canvas.width,canvas.height);
    drawHeroes();
    aviableHeroes.forEach(h=>{h.draw(deltaTime);});
    aviableHeroes.forEach(h=>{if(h.isHover())h.hover();});
    c.font=`50px pixel`;
    c.textAlign='left';
    c.textBaseline='top';
    c.fillStyle='black';
    c.fillText(playerMoney, 10, 0);
    if(changeMoneyParams.active){
        c.fillStyle=`rgba(${changeMoneyParams.color},${changeMoneyParams.opacity})`;
        c.fillText(`${changeMoneyParams.delta>0?'+':''}${changeMoneyParams.delta}`, 10, 50);
        changeMoney();
    }
    c.drawImage(money,0,0,102,118,String(playerMoney).length*25+20, 10,50,50);
    //if(aviableHeroes.some(e=>{return e.anims.attack<=0;})) {c.fillText("Loading...", 0, 0); aviableHeroes.forEach(h=>{h.initImages();h.current.img=h.idle;});}
    start.draw();
}
function renderChoosingLevel(){
    c.fillStyle='#454545';
    c.fillRect(0,0,canvas.width,canvas.height);
    aviableLevels.forEach((l,i)=>{
        c.strokeStyle = 'green';
        c.lineWidth = canvas.height/25;
        // draw line from center of level to center of next
        if(i<aviableLevels.length-1){
            c.beginPath();
            c.moveTo(l.pos.x + l.size.width/2, l.pos.y + l.size.height/2);
            c.lineTo(aviableLevels[i+1].pos.x + aviableLevels[i+1].size.width/2, aviableLevels[i+1].pos.y + aviableLevels[i+1].size.height/2);
            c.stroke();
        }
    })
    c.strokeStyle = '';
    c.lineWidth = 1;
    aviableLevels.forEach(l=>{l.draw()});
    drawHeroes();
}
function animate(){
    requestAnimationFrame(animate);
    const currentTime = performance.now();
    const deltaTime = (currentTime - prevTime)/1000;
    document.body.style.cursor='';
    if(gameState===1)
    renderGame(deltaTime || 0.1);
    if(gameState===0){
        renderMenu(deltaTime || 0.1);
    }
    if(gameState===2) renderChoosingLevel();
    if(transitionParams.active) transition();
    mouse.click=false;
    prevTime = currentTime;
}
function loadLevel(num){
    enemies=[];
    let arr = levels[num].enemies;
    for(let i = 0; i < arr.length;++i){
        enemies.push(generateEnemy(arr[i].obj, arr[i].pos));
    }
    enemies.forEach(h=>{h.current.health=h.maxHp; h.die=false;h.dieTimer=(h.anims.death-1)*h.freq.time;h.current.img=h.idle;h.current.anim=h.anims.idle;h.takenDamage={last: h.maxHp, cur: h.maxHp, delta: 0};});
    enemies.sort(function(a,b){return a.pos.y - b.pos.y;})
    curLevel=num;
    playerMoney+=num*10;
    changeMoney(num*10, true);
    chosen=0;
    playerMove=true;
}
function loadFirst(){
    loadLevel(0);
    heroes = curHeroes.slice();
    heroes.forEach(h=>{h.current.health=h.maxHp; h.die=false;h.dieTimer=(h.anims.death-1)*h.freq.time;h.current.img=h.idle;h.current.anim=h.anims.idle;h.takenDamage={last: h.maxHp, cur: h.maxHp, delta: 0};});
    heroes.sort(function(a,b){return a.pos.y - b.pos.y;})
}
function generateHero(obj, pos){
    let position = {};
    position.x=pos.x-obj.drawnSize/2;
    position.y=pos.y-obj.drawnSize/2;
    return new Entity(obj.name, obj.size, obj.anims, position);
}
function generateEnemy(obj, pos){
    let position = {};
    position.x=enemiesPos[pos].x-obj.drawnSize/2;
    position.y=enemiesPos[pos].y-obj.drawnSize/2;
    return new Entity(obj.name, obj.size, obj.anims, position, true, obj.isBoss);
}
function startGame(){
        if(curHeroes.length>0){
            if(!transitionParams.active)
                transition(true, ()=>{changeMoneyParams.time=0;
                    changeMoney();
                    gameState=2;
                    // loadFirst();
                });
        }
    }
function endGame(){
        if(!transitionParams.active)
        transition(true,()=>{
        gameState=0;
        curHeroes=[];
        opacity=[];
        colorUI="black";
        });
    }
function transition(start=false,onMiddle){
        if(start){
            transitionParams.active=true;
            transitionParams.time=transitionParams.maxTime;
            transitionParams.onMiddle=onMiddle;
            transitionParams.to=false;
        }
        else{
            c.fillStyle=`rgba(0,0,0,${(((transitionParams.to?transitionParams.time:(transitionParams.maxTime-transitionParams.time))/5))/(transitionParams.maxTime/5)})`;
            c.fillRect(0,0,canvas.width,canvas.height);
            transitionParams.time--;
            if(transitionParams.time===0){
                if(!transitionParams.to) {transitionParams.to=true;
                    transitionParams.time=transitionParams.maxTime;
                    transitionParams.onMiddle();}
                else {
                    transitionParams.active=false;
                }
            }
        }
    }
function changeMoney(delta=0, start=false){
        if(start){
            changeMoneyParams.color=delta>0?'0,255,0':'255,0,0';
            changeMoneyParams.delta+=delta;
            changeMoneyParams.opacity= 1;
            changeMoneyParams.time=changeMoneyParams.maxTime;
            changeMoneyParams.active=true;
        }
        else{
            if(changeMoneyParams.time>0){
                changeMoneyParams.time--;
                changeMoneyParams.opacity=changeMoneyParams.time/changeMoneyParams.maxTime;
                if(changeMoneyParams.time>changeMoneyParams.maxTime*0.1&&changeMoneyParams.time<changeMoneyParams.maxTime*0.5) changeMoneyParams.time--;
            }
            else{
                changeMoneyParams.opacity=1;
                changeMoneyParams.active=false;
                changeMoneyParams.delta=0;
            }
        }
    }
function moveAtEnd(start=false){
    if(start){
        moveAtEndParams.active=true;
        moveAtEndParams.dist=0;
        moveAtEndParams.time=moveAtEndParams.maxTime;
        playerMove=false;
        heroes.forEach(h=>{h.current.img=h.move;h.current.anim=h.anims.move;})
    }
    else{
        if(moveAtEndParams.time==transitionParams.maxTime) transition(true,()=>{loadLevel(curLevel+1)});
        if(moveAtEndParams.time>=0){
            moveAtEndParams.time--;
            moveAtEndParams.dist+=moveAtEndParams.maxDist/moveAtEndParams.maxTime;
        }
        else{
            heroes.forEach(h=>{h.current.img=h.idle;h.current.anim=h.anims.idle;});
            moveAtEndParams.dist=0;
            playerMove=true;
            chosen=0;
            moveAtEndParams.active=false;
        }
    }
}
function generateImage(name="",src=""){
    let img = new Image();
    img.src=`${dirImages}/${name}/${src}.png`;
    return img;
}
function generateCharacterImages(name,countAttack=1, end=''){
    let images={idle: generateImage(name,`Idle${end}`),
     move: generateImage(name,`Move${end}`),
     death: generateImage(name,`Death${end}`),
     takeHit: generateImage(name,`Take Hit${end}`)
    };
    if(countAttack>1){
        for(let i = 1; i <= countAttack;i++){
            images[`attack${i}`]=generateImage(name, `Attack${i}${end}`);
        }
    }
    else{
        images[`attack`]=generateImage(name, `Attack${end}`);
    }
    return images;
}
function generate(name, countAttack=1){
    let character = {right: generateCharacterImages(name, countAttack),
    left: generateCharacterImages(name, countAttack, 'Left')};
    return character;
}