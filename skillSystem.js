function SkillComponent(type){
return {
type:type,
cooldown:0
};
}

function updateSkills(){
ecs.getEntitiesWith("skill").forEach(e=>{
let skill=e.get("skill");
if(skill.cooldown>0){
skill.cooldown--;
}
});
}

function activateSkill(entity){
let skill=entity.get("skill");
if(skill.cooldown>0) return;

if(skill.type==="dash"){
entity.get("movement").speed+=5;
setTimeout(()=>{
entity.get("movement").speed-=5;
},2000);
}

if(skill.type==="clear"){
enemies=[];
}

skill.cooldown=300;
}
