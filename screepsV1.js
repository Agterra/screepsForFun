module.exports.loop = function () {
    
    var harvestersSpawnersArray  = Array();
    
    var minersSpawnersArray     = Array();
        
    var minersArray             = Array();
    
    var harvestersArray          = Array();
    
    updateSpawnersArrays(harvestersSpawnersArray, minersSpawnersArray);
    
    updateCreepsArrays(minersArray, harvestersArray);
    
    if (minersArray.length == 0) {
        
        Game.spawns['spawner1'].createCreep([WORK, CARRY, MOVE], 'miners'+minersArray.length, {role : "miner"});
        
        console.log(Game.creeps['miners'+minersArray.length]);
        
        minersArray.fill(Game.creeps['miners'+minersArray.length]);
        
    }
    
    if (harvestersArray.length == 0) {
        
        Game.spawns['spawner1'].createCreep([WORK, CARRY, MOVE], 'harvester'+harvestersArray.length, {role : "havester"});
        
        console.log(Game.creeps['harvester'+harvestersArray.length]);
        
        harvestersArray.fill(Game.creeps['harvester'+harvestersArray.length]);
        
    }
    
    //console.log ("Miners Array Count: "+minersArray.length + "\nHavester Array Count: "+harvestersArray.length);
    
    minersHandling(minersArray);
    
}

function updateSpawnersArrays(harvestersSpawnersArray, minersSpawnersArray) {
    
    for (var id in Game.spawns){
        
        var spawner = Game.spawns[id];
        
        if (spawner.name.search("harvester") != -1) {
            
            harvestersSpawnersArray.fill(spawner);
            
        }else if (spawner.name.search("miners") != -1) {
            
            minersSpawnersArray.fill(spawner);
            
        }
        
    }
    
}

function updateCreepsArrays(minersArray, harvestersArray) {
    
    for (var id in Game.creeps){
        
        var creep = Game.creeps[id];
        
        if (creep.name.search("harvester") != -1) {
            
            harvestersArray.fill(creep);
            
        }else if (creep.name.search("miners") != -1) {
            
            minersArray.fill(creep);
        
        }
        
    }
    
    console.log ("\nMiners Array Count: "+minersArray.length + "\nHavester Array Count: "+harvestersArray.length);
    
}

function minersHandling(minersArray)
{
    for(var id in minersArray){
        
        var creep = Game.creeps[id];
        
        if (creep.getActiveBodyparts(WORK) == 0) {
            
            creep.pos.findClosestByPath(FIND_SOURCES);
            
        }else{
            
            creep.harvest(creep.pos.findClosestByPath(FIND_SOURCES));
            
        }
        
    }
    
}

function harverstersHandling(harvesterArray)
{
    
    for(var id in harvesterArray){
        
        var creep = Game.creeps[id];
        
        if (creep.getActiveBodyparts(WORK) == 0) {
            
            creep.pos.findClosestByPath(FIND_SOURCES);
            
        }else{
            
            creep.harvest(creep.pos.findClosestByPath(FIND_SOURCES));
            
        }
        
    }
    
}