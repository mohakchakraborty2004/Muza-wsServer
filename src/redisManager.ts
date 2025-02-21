import Redis from "ioredis";


class PubSubManager {
    private pub : Redis;
    private sub : Redis;

    constructor() {
        this.pub = new Redis() // add url 
        this.sub = new Redis()
    }

    public async publish(spaceId : string, message: any) {
        const channel = `space:${spaceId}`;
         await this.pub.publish(channel, message);
         console.log("published")
    }

    public async subscribe(spaceID: string, callback: (message: any) => void) {
          const channel = `space:${spaceID}`;
          await this.sub.subscribe(channel);
   

         this.sub.on("message", (subscribedChannel, message) => {
            if(subscribedChannel == channel){
                callback(message);
            }
        })
    }

}

export default PubSubManager;