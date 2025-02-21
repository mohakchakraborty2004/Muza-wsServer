import WebSocket from "ws";
import PubSubManager from "./redisManager";

// const pubsub = new PubSubManager();

interface message {
    action : string
    spaceId : string 
    content? : any //can use better type but to save time leaving it
}

type SpaceMap = Map<String, Set<WebSocket>>;

class SpaceManager {
    private space : SpaceMap;
    private pubsub: PubSubManager;

    constructor() {
        this.space = new Map();
        this.pubsub = new PubSubManager();
    }

    public handleMesage( message : string | any , ws : WebSocket ) {
        const pm: message = JSON.parse(message.toString());

        if(pm) {
            if (pm.action == "join") {
                this.Join(pm.spaceId, ws);
            } else {
                this.pubsub.publish(pm.spaceId, message);
            }
        }  
    }

    private Join (spaceID : string, ws : WebSocket) {
      if(!this.space.has(spaceID)) {
        this.space.set(spaceID, new Set());
        console.log("grp created");
        this.pubsub.subscribe(spaceID, (message)=> {
            console.log("inside sub block");
            this.Send(message);
        })
      }
    }

    private Send (message : any) {
        const parsedMessage: message = JSON.parse(message.toString())

        if(this.space.has(parsedMessage.spaceId)){
  
            this.space.get(parsedMessage.spaceId)?.forEach((member) => {
                // if (member.readyState === WebSocket.OPEN) {
                //   member.send(JSON.stringify(parsedMessage));
                // }
                member.send(JSON.stringify(parsedMessage));
              });
    }
}

}

export default SpaceManager;