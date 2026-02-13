class Entity{
constructor(){
this.components={};
}
addComponent(name,data){
this.components[name]=data;
}
get(name){
return this.components[name];
}
}

class ECS{
constructor(){
this.entities=[];
}
addEntity(e){
this.entities.push(e);
}
getEntitiesWith(component){
return this.entities.filter(e=>e.components[component]);
}
}

const ecs = new ECS();
