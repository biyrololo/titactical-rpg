const characters = [
    "Evil Wizard",
    "Evil Wizard 2",
    "Flying Eye",
    "Goblin",
    "Girl 1",
    "Hero",
    "Medieval King",
    "Mushroom",
    "Skeleton",
    "Warrior",
    "Warrior2"
];

const color_appereance = [
    'blue', 'green', 'purple', 'red', 'yellow'
]
  
const SOURCES = [
    '/src/img/bgmenu.png',
    '/src/img/bgParams.png',
    '/src/img/CaveSnow.png',
    '/src/img/CaveSnow1.png',
    '/src/img/CaveSnow2.png',
    '/src/img/CaveSnow3.png',
    '/src/img/CaveSnow4.png',
    '/src/img/cemeteryMiddle.png',
    '/src/img/circle.png',
    '/src/img/custleBegin.png',
    '/src/img/grass1.png',
    '/src/img/grassBegin.png',
    '/src/img/grassEnd.png',
    '/src/img/healthBarBg.png',
    '/src/img/healthBarBossBg.png',
    '/src/img/healthBarBossColour.png',
    '/src/img/healthBarBossYellow.png',
    '/src/img/healthBarColour.png',
    '/src/img/healthBarYellow.png',
    '/src/img/heart.png',
    '/src/img/magmaBegin.png',
    '/src/img/magmaEnd.png',
    '/src/img/magmaMiddle.png',
    '/src/img/money.png',
    '/src/img/mountainPeakMiddle.png',
    '/src/img/pointer.png',
    '/src/img/streenMiddle.png',
    '/src/img/sword.png',
]

characters.forEach(character => {
    SOURCES.push(...[
        `/src/img/${character}/Attack.png`,
        `/src/img/${character}/AttackLeft.png`,
        `/src/img/${character}/Attack1.png`,
        `/src/img/${character}/Attack1Left.png`,
        `/src/img/${character}/Attack2.png`,
        `/src/img/${character}/Attack2Left.png`,
        `/src/img/${character}/Attack3.png`,
        `/src/img/${character}/Attack3Left.png`,
        `/src/img/${character}/Attack2.png`,
        `/src/img/${character}/Attack2Left.png`,
        `/src/img/${character}/Death.png`,
        `/src/img/${character}/DeathLeft.png`,
        `/src/img/${character}/Idle.png`,
        `/src/img/${character}/IdleLeft.png`,
        `/src/img/${character}/Move.png`,
        `/src/img/${character}/MoveLeft.png`,
        `/src/img/${character}/Take Hit.png`,
        `/src/img/${character}/Take HitLeft.png`,
        `/src/img/${character}/icon.png`
    ])
});

color_appereance.forEach(color => {
    SOURCES.push(...[
        `/src/img/appearance/${color}-back.png`,
        `/src/img/appearance/${color}-front.png`,
    ])
})