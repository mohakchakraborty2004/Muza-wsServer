import WebSocket from "ws";
import PubSubManager from "./redisManager";

// const pubsub = new PubSubManager();

interface message {
    action : string 
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
        
    }

    private Join () {

    }

    private Send () {
        
    }
}