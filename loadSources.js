const SOURCES = [
    'src/img/bgmenu.png', 
    'src/img/bgParams.png', 
    'src/img/CaveSnow.png', 
    'src/img/CaveSnow1.png', 
    'src/img/CaveSnow2.png', 
    'src/img/CaveSnow3.png', 
    'src/img/CaveSnow4.png', 
    'src/img/cemeteryMiddle.png', 
    'src/img/circle.png',
    'src/img/custleBegin.png',
    'src/img/grass1.png',
    'src/img/grassBegin.png',
    'src/img/grassEnd.png',
    'src/img/healthBarBg.png',
    'src/img/healthBarBossBg.png',
    'src/img/healthBarBossColour.png',
    'src/img/healthBarBossYellow.png',
    'src/img/healthBarColour.png',
    'src/img/healthBarYellow.png',
    'src/img/heart.png',
    'src/img/magmaBegin.png',
    'src/img/magmaEnd.png',
    'src/img/magmaMiddle.png',
    'src/img/money.png',
    'src/img/mountainPeakMiddle.png',
    'src/img/pointer.png',
    'src/img/streenMiddle.png',
    'src/img/sword.png',
    'src/img/appearance/blue-back.png',
    'src/img/appearance/blue-front.png',
    'src/img/appearance/green-back.png',
    'src/img/appearance/green-front.png',
    'src/img/appearance/purple-back.png',
    'src/img/appearance/purple-front.png',
    'src/img/appearance/red-back.png',
    'src/img/appearance/red-front.png',
    'src/img/appearance/yellow-back.png',
    'src/img/appearance/yellow-front.png',
    'src/img/archer/Attack.png',
    'src/img/archer/AttackLeft.png',
    'src/img/archer/Death.png',
    'src/img/archer/DeathLeft.png',
    'src/img/archer/icon.png',
    'src/img/archer/Idle.png',
    'src/img/archer/IdleLeft.png',
    'src/img/archer/Move.png',
    'src/img/archer/MoveLeft.png',
    'src/img/archer/Take Hit.png',
    'src/img/archer/Take HitLeft.png',
    'src/img/evil wizard/Attack.png',
    'src/img/evil wizard/AttackLeft.png',
    'src/img/evil wizard/Death.png',
    'src/img/evil wizard/DeathLeft.png',
    'src/img/evil wizard/icon.png',
    'src/img/evil wizard/Idle.png',
    'src/img/evil wizard/IdleLeft.png',
    'src/img/evil wizard/Move.png',
    'src/img/evil wizard/MoveLeft.png',
    'src/img/evil wizard/Take Hit.png',
    'src/img/evil wizard/Take HitLeft.png',
    'src/img/evil wizard 2/Attack1.png',
    'src/img/evil wizard 2/Attack1Left.png',
    'src/img/evil wizard 2/Attack2.png',
    'src/img/evil wizard 2/Attack2Left.png',
    'src/img/evil wizard 2/Death.png',
    'src/img/evil wizard 2/DeathLeft.png',
    'src/img/evil wizard 2/Fall.png',
    'src/img/evil wizard 2/icon.png',
    'src/img/evil wizard 2/Idle.png',
    'src/img/evil wizard 2/IdleLeft.png',
    'src/img/evil wizard 2/Jump.png',
    'src/img/evil wizard 2/Move.png',
    'src/img/evil wizard 2/MoveLeft.png',
    'src/img/evil wizard 2/Take Hit.png',
    'src/img/evil wizard 2/Take HitLeft.png',
    'src/img/Flying eye/Attack1.png',
    'src/img/Flying eye/Attack1Left.png',
    'src/img/Flying eye/Attack2.png',
    'src/img/Flying eye/Attack2Left.png',
    'src/img/Flying eye/Death.png',
    'src/img/Flying eye/DeathLeft.png',
    'src/img/Flying eye/icon.png',
    'src/img/Flying eye/Idle.png',
    'src/img/Flying eye/IdleLeft.png',
    'src/img/Flying eye/Move.png',
    'src/img/Flying eye/MoveLeft.png',
    'src/img/Flying eye/Take Hit.png',
    'src/img/Flying eye/Take HitLeft.png',
    'src/img/girl 1/Attack.png',
    'src/img/girl 1/AttackLeft.png',
    'src/img/girl 1/Death.png',
    'src/img/girl 1/DeathLeft.png',
    'src/img/girl 1/icon.png',
    'src/img/girl 1/Idle.png',
    'src/img/girl 1/IdleLeft.png',
    'src/img/girl 1/Move.png',
    'src/img/girl 1/MoveLeft.png',
    'src/img/girl 1/Take Hit.png',
    'src/img/girl 1/Take HitLeft.png',
    'src/img/Goblin/Attack1.png',
    'src/img/Goblin/Attack1Left.png',
    'src/img/Goblin/Attack2.png',
    'src/img/Goblin/Attack2Left.png',
    'src/img/Goblin/Death.png',
    'src/img/Goblin/DeathLeft.png',
    'src/img/Goblin/icon.png',
    'src/img/Goblin/Idle.png',
    'src/img/Goblin/IdleLeft.png',
    'src/img/Goblin/Move.png',
    'src/img/Goblin/MoveLeft.png',
    'src/img/Goblin/Take Hit.png',
    'src/img/Goblin/Take HitLeft.png',
    'src/img/hero/Attack1.png',
    'src/img/hero/Attack1Left.png',
    'src/img/hero/Attack2.png',
    'src/img/hero/Attack2Left.png',
    'src/img/hero/Death.png',
    'src/img/hero/DeathLeft.png',
    'src/img/hero/icon.png',
    'src/img/hero/Idle.png',
    'src/img/hero/IdleLeft.png',
    'src/img/hero/Move.png',
    'src/img/hero/MoveLeft.png',
    'src/img/hero/Take Hit.png',
    'src/img/hero/Take HitLeft.png',
    'src/img/medieval king/Attack1.png',
    'src/img/medieval king/Attack1Left.png',
    'src/img/medieval king/Attack2.png',
    'src/img/medieval king/Attack2Left.png',
    'src/img/medieval king/Attack3.png',
    'src/img/medieval king/Attack3Left.png',
    'src/img/medieval king/Death.png',
    'src/img/medieval king/DeathLeft.png',
    'src/img/medieval king/Fall.png',
    'src/img/medieval king/icon.png',
    'src/img/medieval king/Idle.png',
    'src/img/medieval king/IdleLeft.png',
    'src/img/medieval king/Jump.png',
    'src/img/medieval king/Move.png',
    'src/img/medieval king/MoveLeft.png',
    'src/img/medieval king/Take Hit - white silhouette.png',
    'src/img/medieval king/Take Hit.png',
    'src/img/medieval king/Take HitLeft.png',
    'src/img/Mushroom/Attack1.png',
    'src/img/Mushroom/Attack1Left.png',
    'src/img/Mushroom/Attack2.png',
    'src/img/Mushroom/Attack2Left.png',
    'src/img/Mushroom/Death.png',
    'src/img/Mushroom/DeathLeft.png',
    'src/img/Mushroom/icon.png',
    'src/img/Mushroom/Idle.png',
    'src/img/Mushroom/IdleLeft.png',
    'src/img/Mushroom/Move.png',
    'src/img/Mushroom/MoveLeft.png',
    'src/img/Mushroom/Take Hit.png',
    'src/img/Mushroom/Take HitLeft.png',
    'src/img/Skeleton/Attack1.png',
    'src/img/Skeleton/Attack1Left.png',
    'src/img/Skeleton/Attack2.png',
    'src/img/Skeleton/Attack2Left.png',
    'src/img/Skeleton/Death.png',
    'src/img/Skeleton/DeathLeft.png',
    'src/img/Skeleton/icon.png',
    'src/img/Skeleton/Idle.png',
    'src/img/Skeleton/IdleLeft.png',
    'src/img/Skeleton/Move.png',
    'src/img/Skeleton/MoveLeft.png',
    'src/img/Skeleton/Shield.png',
    'src/img/Skeleton/Take Hit.png',
    'src/img/Skeleton/Take HitLeft.png',
    'src/img/warrior/Attack1.png',
    'src/img/warrior/Attack1Left.png',
    'src/img/warrior/Attack2.png',
    'src/img/warrior/Attack2Left.png',
    'src/img/warrior/Attack3.png',
    'src/img/warrior/Attack3Left.png',
    'src/img/warrior/Death.png',
    'src/img/warrior/DeathLeft.png',
    'src/img/warrior/Idle.png',
    'src/img/warrior/IdleLeft.png',
    'src/img/warrior/Move.png',
    'src/img/warrior/MoveLeft.png',
    'src/img/warrior/Take Hit.png',
    'src/img/warrior/Take HitLeft.png',
    'src/img/warrior2/Attack1.png',
    'src/img/warrior2/Attack1Left.png',
    'src/img/warrior2/Attack2.png',
    'src/img/warrior2/Attack2Left.png',
    'src/img/warrior2/Attack3.png',
    'src/img/warrior2/Attack3Left.png',
    'src/img/warrior2/Death.png',
    'src/img/warrior2/DeathLeft.png',
    'src/img/warrior2/icon.png',
    'src/img/warrior2/Idle.png',
    'src/img/warrior2/IdleLeft.png',
    'src/img/warrior2/Move.png',
    'src/img/warrior2/MoveLeft.png',
    'src/img/warrior2/Take Hit.png',
    'src/img/warrior2/Take HitLeft.png'
]

const startBtn = document.getElementById('start');
const continueBtn = document.getElementById('continue');

var isLoadedDataNeeded = false;

startBtn.addEventListener('click', () => {
    const imagePromises = SOURCES.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
        });
      });
      
    Promise.all(imagePromises)
    .then(
        ()=>{
            addGameScript();
            document.querySelector('div').style.display = 'none';
        }
    )
    .catch(error => {
        // Произошла ошибка при загрузке изображений
        console.error('Ошибка загрузки изображений:', error);
    })
})

continueBtn.addEventListener('click', () => {
    let images_loaded = 0;
    const imagePromises = SOURCES.map(src => {
        let img = new Image();
        img.onload = () => {
            images_loaded++;
            if(images_loaded === SOURCES.length){
                addGameScript();
                isLoadedDataNeeded = true;
                document.querySelector('div').style.display = 'none';
            }
        };
        img.src = src;
      });
    
})

/**
 * Adds a game script to the HTML document.
 *
 */
function addGameScript(){
    const script = document.createElement('script');
    script.src = 'src/js/index.js';
    document.body.appendChild(script);
    console.log('Изображения загружены');
}